import requests
import json
import time
import re
import random

def get_age_range(age_str):
    if not age_str:
        return None, None
    
    age_str = age_str.lower()

    if "infant" in age_str:
        return 0,12
    if "toddler" in age_str:
        return 12, 36
    if "preschool" in age_str:
        return 36,60 #up to 5 years old
    
    #matching regex patterns in ages

    # blank - blank years or blank - blank yrs
    years_pattern = r'(\d+)(?:\s*-\s*|\s+to\s+)(\d+)\s*(?:years|yrs)'
    years_match = re.search(years_pattern, age_str)
    if years_match:
        min_years = int(years_match.group(1))
        max_years = int(years_match.group(2))
        return min_years * 12, max_years * 12 #keep in months to work with above
    
    # in months - years
    mixed_pattern = r'(\d+)\s*(?:months|mos)(?:\s*-\s*|\s+to\s+)(\d+)\s*(?:years|yrs)'
    mixed_match = re.search(mixed_pattern, age_str)
    if mixed_match:
        min_months = int(mixed_match.group(1))
        max_years = int(mixed_match.group(2))
        return min_months, max_years * 12
    
    # in months
    months_pattern = r'(\d+)(?:\s*-\s*|\s+to\s+)(\d+)\s*(?:months|mos)'
    months_match = re.search(months_pattern, age_str)
    if months_match:
        min_months = int(months_match.group(1))
        max_months = int(months_match.group(2))
        return min_months, max_months
    
    # up to a certain amount of years
    up_to_years = r'up\s+to\s+(\d+)\s*(?:years|yrs)'
    up_to_match = re.search(up_to_years, age_str)
    if up_to_match:
        max_years = int(up_to_match.group(1))
        return 0, max_years * 12
    
    # blank years and up
    years_up = r'(\d+)\s*(?:years|yrs)\s+and\s+up'
    years_up_match = re.search(years_up, age_str)
    if years_up_match:
        min_years = int(years_up_match.group(1))
        # assuming maximum would be 18 years old for childcare
        return min_years * 12, 18 * 12 
    
    return None, None

def get_book_ages(book_data):
    title = book_data.get("title", "").lower()
    description = book_data.get("description", "").lower()

    age_dict = {
        "newborn": (0,3),
        "infant": (0,12),
        "infants": (0,12),
        "baby": (0,12),
        "babies": (0,12),
        "toddler": (12,36), #1 to 3 years old
        "preschool": (36,60), #3 to 5 years old
        "kindergarten": (60,72), #5 to 6 years old
        "school-age": (72,144), #6 to 12 years old
        "teen": (144,216), #12 to 18 years old
    }

    age_for_book = []

    for age, (min_months, max_months) in age_dict.items():
        if age in title or age in description:
            age_for_book.append((age, min_months, max_months))

    return age_for_book


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

# type is either "childcare" or "housing"
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
    
def relate_records(books, housing_data, childcares):
    categories = books.get("cat", "").lower()
    title = books.get("title", "").lower()
    description = books.get("description", "").lower()

    housing_words = {
        "housing": 5,
        "apartment": 5,
        "home": 4,
        "living": 2,
        "rent": 4,
        "affordable": 3,
        "shelter": 5,
        "residence": 4,
        "accommodation": 3
    }

    childcare_words = {
        "childcare": 5,
        "daycare": 5,
        "preschool": 4,
        "child care": 5,
        "early education": 4,
        "preschool": 5,
        "babysitting": 3,
        "children": 4
    }

    cost_dict = {
        "affordable": "low",
        "cheap": "low",
        "budget": "low",
        "subsidized": "low",
        "low-cost": "low",
        "expensive": "high",
        "luxury": "high",
        "premium": "high"
    }

    cost_pref = None
    for word, cost_level in cost_dict.items():
        if word in title or word in description:
            cost_pref = cost_level
            break

    book_ages = get_book_ages(books)

    housing_scores = []
    childcare_scores = []

    for house in housing_data:
        score = 0
        house_name = house.get("name", "").lower()
        house_address = house.get("address", "").lower()

        for word, weight in housing_words.items():
            if word in title:
                score += weight * 2 #places more importance on titles
            if word in description:
                score += weight
            if word in categories:
                score += weight * 1.5
        
        if cost_pref:
            housing_cost = house.get("cost", "").lower()

            if cost_pref == "low" and any(term in housing_cost for term in ["affordable", "low", "low-cost", "subsidized", "cheap", "budget"]):
                score += 4
            elif cost_pref == "high" and any(term in housing_cost for term in ["luxury", "expensive", "premium", "high-cost"]):
                score += 4
            
        score += random.uniform(0,1) #some amount of randomness
        housing_scores.append((house.get('id'), score))

    for childcare in childcares:
        score = 0
        childcare_name = childcare.get("name", "").lower()
        childcare_type = childcare.get("program_type", "").lower()
        childcare_description = childcare.get("description", "").lower()
        childcare_age_range = childcare.get("age_range", "").lower()

        for word, weight in childcare_words.items():
            if word in title:
                score += weight * 2
            if word in description:
                score += weight
            if word in categories:
                score += weight * 1.5

        if book_ages and childcare_age_range:
            childcare_min_age, childcare_max_age = get_age_range(childcare_age_range)

            if childcare_min_age is not None and childcare_max_age is not None:
                for age, book_min_age, book_max_age in book_ages:
                    if (childcare_min_age <= book_max_age and book_min_age <= childcare_max_age):
                        # find overlap!
                        age_begin_together = max(childcare_min_age, book_min_age)
                        age_end_together = min(childcare_max_age, book_max_age)
                        total_overlap = age_end_together - age_begin_together

                        if total_overlap > 0:
                            age_match_score = min(5, max(1, total_overlap/12)) # give score up to 5
                            score += age_match_score

                            book_range = book_max_age - book_min_age
                            if book_range > 0 and total_overlap > (book_range * 0.5):
                                score += 2 # giving a higher score if we match over 50% accuracy of the book/childcare

            else :
                for age, _, _, in book_ages:
                    if age in childcare_age_range:
                        score += 3

        if cost_pref:
            childcare_cost = childcare.get("cost", "").lower()

            if cost_pref == "low" and any(term in childcare_cost for term in ["affordable", "low", "low-cost", "subsidized", "cheap", "budget"]):
                score += 4
            elif cost_pref == "high" and any(term in childcare_cost for term in ["luxury", "expensive", "premium", "high-cost"]):
                score += 4

        
        # making adjustments if it says working (ex: books for working parents)
        if "working" in title or "career" in title or "job" in title:
            open_time = childcare.get("open_time", "")
            close_time = childcare.get("close_time", "")

            if open_time and "am" in open_time and int(open_time.split(":")[0]) <= 7:
                score += 3
            if close_time and "pm" in close_time and int(close_time.split(":")[0]) >= 6:
                score += 3

        score += random.uniform(0,1)

        childcare_scores.append((childcare.get("id"), score))

    #find best matches
    housing_scores.sort(key = lambda x: x[1], reverse=True)
    childcare_scores.sort(key = lambda x: x[1], reverse=True)

    related_housing_id = housing_scores[0][0] if housing_scores else 1
    related_childcare_id = childcare_scores[0][0] if childcare_scores else 1

    print(f"Book: {books.get('title')}")
    print(f" Matching Housing: {related_housing_id} (score: {housing_scores[0][1] if housing_scores else 'N/A'})")
    print(f" Matching Childcare: {related_childcare_id} (score: {childcare_scores[0][1] if childcare_scores else 'N/A'})")

    return related_housing_id, related_childcare_id


def fetch_books():
    print("Fetching books from API")

    housing_list = get_resources("housing")
    childcare_list = get_resources("childcare")

    if not housing_list or not childcare_list:
        print("ERROR -- housing and childcare cannot be related to books; will be random?")
    
    searching_topics = [
        "single parenting",
        "single parent guide",
        "single mother parenting",
        "single father parenting",
        "single parent childcare",
        "childcare for single parents",
        "housing for single parents",
        "single parent housing",
        "single parent resources",
        "single parent texas", 
        "childcare for families with single parents",
        "parenting by yourself",
        "single parenting challenges",
        "single mom resources",
        "single dad resources"
    ]
    
    all_books = []
    
    for topic in searching_topics:
        print(f"Search: {topic}")
        
        base_url = "https://www.googleapis.com/books/v1/volumes"
        params = {
            "q": topic,
            "maxResults": 40,
            "printType": "books",
            "langRestrict": "en"
        }
        
        response = requests.get(base_url, params=params)
        
        if response.status_code != 200:
            print(f"Error for '{topic}'")
            continue
        
        data = response.json()
        
        for item in data["items"]:
            if "volumeInfo" not in item:
                continue
                
            info = item["volumeInfo"]
            
            if "title" not in info:
                continue

            image_url=None
            if "imageLinks" in info:
                for img in ["thumbNail", "smallThumbnail", "small", "medium", "large"]:
                    if img in info["imageLinks"]:
                        image_url = get_image(info["imageLinks"][img])
                        if image_url:
                            break

            if not image_url:
                image_url = f"https://via.placeholder.com/128x192?text={info.get('title', 'Book').replace(' ', '+')}"

                
            book_data = {
                "title": info.get("title", "Unknown Title"),
                "author": ", ".join(info.get("authors", ["Unknown Author"])),
                "publishDate": info.get("publishedDate", "Unknown"),
                "pageCount": info.get("pageCount"),
                "description": info.get("description", "No description available."),
                "cat": ", ".join(info.get("categories", ["Parenting"])),
                "image": image_url,
                "link": info.get("previewLink"),
            }
            
            if "saleInfo" in item and "listPrice" in item["saleInfo"]:
                price = item["saleInfo"]["listPrice"]
                book_data["list_price"] = f"${price.get('amount', 0)}"
            else:
                continue
                #book_data["list_price"] = "Price not available"
            
            if not any(b.get("title") == book_data["title"] for b in all_books):
                housing_id, childcare_id = relate_records(book_data, housing_list, childcare_list)
                book_data["related_housing_id"] = housing_id
                book_data["related_childcare_id"] = childcare_id
                
                all_books.append(book_data)
        
        time.sleep(1)
    
    # RANDOM SORTING
   #for book in all_books:
    #    import random
     #   book["related_housing_id"] = random.randint(1, 3)
     #   book["related_childcare_id"] = random.randint(1, 3)
    
    print(f"Found {len(all_books)} books")
    
    with open("single_parenting_books.json", "w", encoding="utf-8") as f:
        json.dump(all_books, f, indent=2, ensure_ascii=False)
    
    print(f"Saved {len(all_books)} books to single_parenting_books.json")
    return all_books

if __name__ == "__main__":
    fetch_books()
