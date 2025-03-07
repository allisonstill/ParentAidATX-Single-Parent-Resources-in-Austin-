from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import time

# Set up Selenium browser
options = webdriver.ChromeOptions()
options.add_argument("--headless")  # Run in the background (no UI)
options.add_argument("--disable-gpu")
options.add_argument("--window-size=1920x1080")
options.add_argument("--no-sandbox")

# Initialize WebDriver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# Load the page
URL = "https://www.usa.gov/benefit-finder?t=58-38-39-40-41&pg=1"
driver.get(URL)

# Wait for JavaScript content to load
time.sleep(5)  # Adjust wait time if needed

# Get page source and parse with BeautifulSoup
soup = BeautifulSoup(driver.page_source, "html.parser")

# Find all program containers (div with class="benefits-result-text")
programs = soup.find_all("div", class_="desktop:grid-col-8 benefits-result-text")

# Extract program details
scraped_programs = []
i =  0
for program in programs:
    # Extract program name from <h3> inside the div
    name_tag = program.find("h3").find("a") if program.find("h3") else None
    name = name_tag.text.strip() if name_tag else "No title"

    # Extract program link
    link = "https://www.usa.gov" + name_tag["href"] if name_tag and "href" in name_tag.attrs else "No link"

    # Extract program description from <p>
    desc_tag = program.find("p")
    description = desc_tag.text.strip() if desc_tag else "No description"

    # Append to list
    scraped_programs.append({"name": name, "url": link, "description": description})

    # Print result
    print(f"{i}. Program: {name}")
    print(f"   Link: {link}")
    print(f"   Description: {description}\n")
    i += 1

# Quit browser
driver.quit()

# Print structured data
#print(scraped_programs)

"""
Modify Scraper to Store Data:

from models import db, GovernmentProgram
from app import app  # Import the Flask app

def save_to_database(scraped_programs):
    with app.app_context():
        for program in scraped_programs:
            new_program = GovernmentProgram(
                name=program["name"],
                url=program["url"],
                description=program["description"]
            )
            db.session.add(new_program)
        db.session.commit()
"""

"""
pagination
for page in range(1, 5):  # Adjust range as needed
    url = f"https://www.usa.gov/benefit-finder?t=58-38-39-40-41&pg={page}"
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    # Extract programs (repeat the extraction process)

"""
