import os
import time
import chromedriver_autoinstaller
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from sqlalchemy.orm import sessionmaker
from api import app, db, Daycare, Book, Housing  # Import stuff from API
import pandas as pd
import random
from sqlalchemy.sql import func


# Ensure ChromeDriver is installed
chromedriver_autoinstaller.install()

# Get the database URL from Railway
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is missing")

# Create a session to interact with the database inside the Flask app context
with app.app_context():
    Session = sessionmaker(bind=db.engine)
    session = Session()

# Set up Selenium WebDriver
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless=new")  # Use the new headless mode (more stable)
chrome_options.add_argument("--disable-gpu")  # Fixes crashes in some environments
chrome_options.add_argument("--window-size=1920x1080")  # Ensures proper rendering
chrome_options.add_argument("--no-sandbox")  # Prevents crashes due to security issues
chrome_options.add_argument("--disable-dev-shm-usage")  # Reduces memory issues in Railway
chrome_options.add_argument("--disable-extensions")  # Loads only essential features
chrome_options.add_argument("--disable-background-networking")  # Reduces resource usage
chrome_options.add_argument("--disable-software-rasterizer")  # Prevents GPU-related crashes
chrome_options.add_argument("--disable-popup-blocking")  # Ensures page elements load

# Use system-installed ChromeDriver
driver = webdriver.Chrome(options=chrome_options)


# Start scraping
base_url = "https://mybrightwheel.com"
start_url = f"{base_url}/search/austin"
driver.get(start_url)
time.sleep(5)

print("Scraper started successfully!")


# Find the last page from pagination links
soup = BeautifulSoup(driver.page_source, "html.parser")
pagination_links = soup.find_all("a", class_="Pagination_paginationLink__x4_FV")
last_page = 1  # Default in case pagination is missing
for link in pagination_links:
    try:
        page_num = int(link.text.strip())  # Convert text to integer
        if page_num > last_page:
            last_page = page_num
    except ValueError:
        continue  # Skip non-numeric values

print(f"Total Pages Found: {last_page}")

data = []
# Function to scrape and insert data
def scrape_and_insert(url):
    print(f"Scraping: {url}")
    driver.get(url)
    time.sleep(5)

    soup = BeautifulSoup(driver.page_source, "html.parser")
    centers = soup.find_all("div", {"data-cy": "provider-card"})

    with app.app_context():  # Ensure app context before inserting into DB
        for center in centers:
            try:
                name = center.find("h2", {"data-testid": "providerCard-name"}).text.strip()
            except:
                name = "N/A"

            try:
                age_range = center.find("img", {"alt": "provider age range icon"}).find_next("span").text.strip()
            except:
                age_range = "N/A"

            try:
                hours = center.find("img", {"alt": "provider hours icon"}).find_next("span").text.strip()
                open_time, close_time = hours.split(" - ")
            except:
                open_time, close_time = "N/A", "N/A"

            try:
                program_type = center.find("img", {"src": "/search/images/results/provider-program.svg"}).find_next("span").text.strip()
            except:
                program_type = "N/A"

            try:
                relative_link = center.find("a", class_="MPLink_providerCardLink__ijZVA")["href"]
                full_link = f"{base_url}{relative_link}"
            except:
                full_link = "N/A"

            # Attempt to grab primary image
            try:
                image_url = "N/A"
                image_tag = center.find("img", {"data-testid": "providerCard-Img"})
                if image_tag:
                    image_url = image_tag["src"].strip()
                    if "global/image-placeholder.svg" in image_url:
                        image_url = "N/A"
                    elif image_url.startswith("/search/images"):
                        image_url = f"{base_url}{image_url}"
                    elif not image_url.startswith("https://"):
                        image_url = f"https://images.mybrightwheel.com{image_url}"
            except:
                image_url = "N/A"

            # Get description from full_link page
            try:
                description = "N/A"
                if(full_link != "N/A"):
                    driver.get(full_link)  # Visit the provider's page
                    time.sleep(2)  # Allow time for the page to load
                    
                    provider_soup = BeautifulSoup(driver.page_source, "html.parser")

                    desc_tag = provider_soup.find("p", class_="About_text__2fUjQ false css-1x0b0xw", attrs={"data-testid": "app-text"})
                    if desc_tag:
                        description = desc_tag.text.strip()
            except:
                description = "N/A"

            # Look for an image on the full_link page if it wasnt found on the card
            try:
                if(image_url == "N/A" and full_link != "N/A"):
                    driver.get(full_link)  # Visit the provider's page
                    time.sleep(2)  # Allow time for the page to load

                    provider_soup = BeautifulSoup(driver.page_source, "html.parser")
                    
                    image_tag = provider_soup.find("img", {"data-testid": "component-open-modal"})
                    image_url = image_tag["src"]
            except:
                image_url = "N/A"

            # Get daycare address from full_link page
            try:
                address = "N/A"
                if(full_link != "N/A"):
                    driver.get(full_link)
                    time.sleep(2)
                    provider_soup = BeautifulSoup(driver.page_source, "html.parser")
                    address_element = driver.find_element(By.CSS_SELECTOR, "p.ContactInfo_contactInfoLink__v_3u4 a")
                    address = address_element.text.strip()
                    #print(address)
            except:
                address = "N/A"

            try:
                # Insert into PostgreSQL using SQLAlchemy ORM (Non N/A rows only)
                fields = [name, age_range, open_time, close_time, program_type, image_url, full_link, description, address]
                if "N/A" not in fields:
                    # After creating the new daycare row (but before commit), we add it to the session and flush it to get its ID
                    new_daycare = Daycare(
                        name=name,
                        age_range=age_range,
                        open_time=open_time,
                        close_time=close_time,
                        program_type=program_type,
                        image_url=image_url,
                        full_link=full_link,
                        description=description,
                        address=address
                    )

                    session.add(new_daycare)
                    session.flush()  # This assigns an ID to new_daycare without committing yet

                    # === Related Book Logic ===
                    # Try to find a book that already references this daycare's ID
                    existing_related_book = session.query(Book.id).filter_by(related_childcare_id=new_daycare.id).first()

                    # If not found, choose a random book in the correct category
                    if existing_related_book:
                        related_book_id = existing_related_book[0]
                    else:
                        fallback_book = (
                            session.query(Book.id)
                            .filter(Book.cat.in_(["Parenting", "Family & Relationships"]))
                            .order_by(func.random())
                            .first()
                        )
                        related_book_id = fallback_book[0] if fallback_book else None

                    # === Related Housing Logic ===
                    random_housing = session.query(Housing.id).order_by(func.random()).first()
                    related_housing_id = random_housing[0] if random_housing else None

                    # Set the related IDs
                    new_daycare.related_book_id = related_book_id
                    new_daycare.related_housing_id = related_housing_id

                    session.commit()  # Final save with all relations
                    print(f"✅ Inserted: {name} (related_book_id={related_book_id}, related_housing_id={related_housing_id})")

            except Exception as e:
                session.rollback()  # Rollback in case of an error
                print(f"🚨 Insert failed: {e}")

            # for pandas
            data.append({
                "Name": name,
                "Age Range": age_range,
                "Open Time": open_time,
                "Close Time": close_time,
                "Program Type": program_type,
                "Image URL": image_url,
                "Page Link": full_link,
                "Description": description,
                "Address": address
            })


# Scrape and insert data for the first page
scrape_and_insert(start_url)

# Loop through all other pages dynamically
for page_num in range(2, last_page + 1):
    page_url = f"{base_url}/search/austin/page-{page_num}"
    scrape_and_insert(page_url)

# Close the browser
driver.quit()

df = pd.DataFrame(data)
df = df.replace("N/A", pd.NA).dropna()
df.to_csv("brightwheel_daycares.csv", index=False)  # Save to file

print("Data successfully inserted into PostgreSQL")
