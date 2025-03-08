from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import pandas as pd
import time

# Set up Selenium WebDriver
options = webdriver.ChromeOptions()
options.add_argument("--headless")  # Run in background (no UI)
options.add_argument("--disable-gpu")
options.add_argument("--window-size=1920x1080")
options.add_argument("--no-sandbox")

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# Start with the first page
base_url = "https://mybrightwheel.com"
start_url = f"{base_url}/search/austin"
driver.get(start_url)
time.sleep(5)

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

# Function to scrape a single page
def scrape_page(url):
    print(f"Scraping: {url}")
    driver.get(url)
    time.sleep(5)  # Allow time for the page to load

    soup = BeautifulSoup(driver.page_source, "html.parser")
    centers = soup.find_all("div", {"data-cy": "provider-card"})

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

        try:
            # Extract daycare image URL and exclude placeholders
            # TODO: BROKEN!
            image_tag = center.find("img", {"data-testid": "providerCard-Img"})
            if image_tag:
                image_url = image_tag["src"].strip()
                if "global/image-placeholder.svg" in image_url:
                    image_url = "N/A"
                elif image_url.startswith("/search/images"):
                    image_url = f"{base_url}{image_url}"
                elif not image_url.startswith("https://"):
                    image_url = f"https://images.mybrightwheel.com{image_url}"
            else:
                image_url = "N/A"
        except:
            image_url = "N/A"

        data.append({
            "Name": name,
            "Age Range": age_range,
            "Open Time": open_time,
            "Close Time": close_time,
            "Program Type": program_type,
            "Image URL": image_url,
            "Page Link": full_link
        })

# Scrape the first page
scrape_page(start_url)

# Loop through all other pages dynamically
for page_num in range(2, last_page + 1):
    page_url = f"{base_url}/search/austin/page-{page_num}"
    scrape_page(page_url)

# Close the browser
driver.quit()

# Convert to DataFrame and save
df = pd.DataFrame(data)
print(df)  # Display results
df.to_csv("brightwheel_daycares.csv", index=False)  # Save to file
