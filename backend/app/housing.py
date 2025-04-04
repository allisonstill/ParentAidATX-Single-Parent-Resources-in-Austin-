import requests
import json
import time
import os
import re
from dotenv import load_dotenv
import random

# Load API key from .env file
load_dotenv()
GOOGLE_PLACES_API_KEY = os.getenv("VITE_GOOGLE_PLACES_API_KEY")

def get_resources(type):
    try:
        print(f"Getting {type}")
        response = requests.get(f"https://api.parentaidatx.me/api/{type}")
        if response.status_code != 200:
            print(f"ERROR getting: {type}")
            return []
        else :
            data = response.json()
            print(f"Got {len(data)} records")
            return data
    except Exception as e:
        print(f"ERROR getting {type}: {e}")
        return []

def get_related_records(housing, books, childcares):
    """
    Finds related book_id and childcare_id for a given housing_id.
    
    - Related book_id: Searches for the housing_id in every book record and finds a match. If no match is found, picks a random book.
    - Related childcare_id: Matches the zip code of the childcare center with the housing zip code. If no match is found, picks a random childcare center.
    
    :param housing_id: The ID of the housing record
    :param books: A list of book records, each containing 'book_id' and 'housing_id'
    :param childcare_centers: A list of childcare records, each containing 'childcare_id' and 'address'
    :return: A tuple (related_book_id, related_childcare_id)
    """
    # Find related book_id
    related_book_id = next((book['id'] for book in books if book.get('related_housing') == housing.get('id')), None)
    if related_book_id is None:
        related_book_id = random.choice(books)['id'] if books else None

    address = housing.get('address')
    # Find related childcare_id by matching zip codes
    def extract_zip(address):
        if not address : 
            return None
        parts = address.split(',')
        if len(parts) >= 3:  # Ensure the address has at least city, state, and zip
            state_zip = parts[-2].strip()  # Extract the "TX 78729" part
            zip_code = state_zip.split()[-1]  # Get the last part, which is the zip code
            return zip_code
        return None 
    
    related_childcare_id = next(
        (daycare['id'] for daycare in childcares if extract_zip(daycare['address']) == extract_zip(address)),
        None
    )
    
    if related_childcare_id is None:
        related_childcare_id = random.choice(childcares)['id'] if childcares else None
    
    return related_book_id, related_childcare_id


def get_image(url):
    if not url:
        return None
    
    if url.startswith('http://'):
        url='https://' + url[7:]

    url = re.sub(r'&edge=curl', '', url)
    
    if 'zoom=' in url:
        url = re.sub(r'zoom=\d', 'zoom=1', url)
    
    if '_SX' in url or '_SY' in url:
        url = re.sub(r'_SX\d+', '_SX1000', url)
        url = re.sub(r'_SY\d+', '_SY1000', url)

    return url

def fetch_places():
    """ Fetches relevant places using Google Places API and saves the results to a JSON file. """

    print("Fetching places from Google Places API...")

    book_list = get_resources("books")
    childcare_list = get_resources("childcare")

    search_terms = [
        "affordable housing Austin, Texas",
        "cheap housing in Austin, Texas",
        "single parent housing Austin, Texas",
        "affordable apartments Austin, Texas",
        "low income housing Austin, Texas",
        "family housing Austin, Texas",
        "affordable rental homes Austin, Texas",
        "housing for single mothers Austin, Texas",
        "single parent apartments Austin, Texas",
        "subsidized housing Austin, Texas",
        "low cost housing Austin, Texas",
        "affordable housing for families Austin, Texas",
        "affordable rental properties Austin, Texas",
        "housing assistance Austin, Texas",
        "affordable homes for rent Austin, Texas",
        "subsidized housing in Austin"
    ]

    all_places = []

    for term in search_terms:
        print(f"Searching: {term}")

        base_url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
        params = {
            "query": term,
            "region": "US",
            "radius": 10000,
            "key": GOOGLE_PLACES_API_KEY
        }

        response = requests.get(base_url, params=params)

        if response.status_code != 200:
            print(f"Error fetching '{term}': {response.status_code}")
            print(f"Response content: {response.text}")  # Debugging
            continue

        data = response.json()

        for item in data.get("results", []):
            place_id = item.get("place_id")

            # Fetch more details using Place Details API
            details_url = "https://maps.googleapis.com/maps/api/place/details/json"
            details_params = {
                "place_id": place_id,
                "fields": "name,formatted_address,rating,user_ratings_total,types,photos,formatted_phone_number,opening_hours,price_level,website",
                "key": GOOGLE_PLACES_API_KEY,
            }

            details_response = requests.get(details_url, params=details_params)

            if details_response.status_code != 200:
                print(f"Error fetching details for {place_id}: {details_response.status_code}")
                continue

            details_data = details_response.json().get("result", {})

            photo_reference = details_data.get("photos", [{}])[0].get("photo_reference", None)
            photo_url = (
                f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference={photo_reference}&key={GOOGLE_PLACES_API_KEY}"
                if photo_reference
                else "https://via.placeholder.com/128x128?text=No+Image"
            )
            formatted_photo_url = get_image(photo_url)
            if len(formatted_photo_url) > 500:
                print(f"Skipping {place_id} because the photo URL is too long: {len(formatted_photo_url)} characters.")
                continue
            

            place_data = {
                "name": details_data.get("name", "Unknown Name"),
                "address": details_data.get("formatted_address", "No Address Available"),
                "rating": details_data.get("rating", "No Rating"),
                "place_id": place_id,
                "totalRatings": details_data.get("user_ratings_total", "No Ratings"),
             #   "types": details_data.get("types", []),
                "photo": formatted_photo_url,
                "google_maps_link": f"https://www.google.com/maps/place/?q=place_id:{place_id}",
                "phone_number": details_data.get("formatted_phone_number", "No Phone Number"),
              #  "price_range": details_data.get("price_level", "No Price Level"),
                "website": details_data.get("website", "No Website"),
                "opening_hours": details_data.get("opening_hours", {}).get("weekday_text", ["No Opening Hours"]),
            }

            if not place_data["photo"]:
                place_data["photo"] = "https://via.placeholder.com/128x128?text=No+Image"
            if place_data["rating"] == "No Rating" :
                continue
            if not any(p["place_id"] == place_data["place_id"] for p in all_places) and not any(p["phone_number"] == place_data["phone_number"] for p in all_places) and not any(p["website"] == place_data["website"] for p in all_places):
                book_id, childcare_id = get_related_records(place_data, book_list, childcare_list)
                place_data["related_book_id"] = book_id
                place_data["related_childcare_id"] = childcare_id
                all_places.append(place_data)

        time.sleep(1.5)  # Avoid hitting API rate limits

    print(f"Found {len(all_places)} places.")

    with open("housing_places.json", "w", encoding="utf-8") as f:
        json.dump(all_places, f, indent=2, ensure_ascii=False)

    print(f"Saved {len(all_places)} places to housing_places.json")

    return all_places


if __name__ == "__main__":
    fetch_places()
