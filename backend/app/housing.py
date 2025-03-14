import requests
import json
import time
import os
import re
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()
GOOGLE_PLACES_API_KEY = os.getenv("VITE_GOOGLE_PLACES_API_KEY")

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
                all_places.append(place_data)

        time.sleep(1.5)  # Avoid hitting API rate limits

    print(f"Found {len(all_places)} places.")

    with open("housing_places.json", "w", encoding="utf-8") as f:
        json.dump(all_places, f, indent=2, ensure_ascii=False)

    print(f"Saved {len(all_places)} places to housing_places.json")

    return all_places


if __name__ == "__main__":
    fetch_places()
