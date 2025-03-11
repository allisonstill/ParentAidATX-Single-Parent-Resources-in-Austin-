import requests
import json
import time
import re


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

def fetch_books():
    print("Fetching books from API")
    
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
                all_books.append(book_data)
        
        time.sleep(1)
    
    # RANDOM SORTING
    for book in all_books:
        import random
        book["related_housing_id"] = random.randint(1, 3)
        book["related_childcare_id"] = random.randint(1, 3)
    
    print(f"Found {len(all_books)} books")
    
    with open("single_parenting_books.json", "w", encoding="utf-8") as f:
        json.dump(all_books, f, indent=2, ensure_ascii=False)
    
    print(f"Saved {len(all_books)} books to single_parenting_books.json")
    return all_books

if __name__ == "__main__":
    fetch_books()
