"""
Defines database models, API endpoints, and serves data from our ProstgreSQL databases.
"""

import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask import request
from sqlalchemy import func

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["https://www.parentaidatx.me", "https://parentaidatx.me", "http://localhost:*"]}})

# Database Configuration
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:QlxiIYKeqZPqCDORvAcjgWoswvsqbrkO@gondola.proxy.rlwy.net:46024/railway")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is missing. Make sure .env is set correctly.")

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define Database Model
class Daycare(db.Model):
    __tablename__ = "daycare"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    age_range = db.Column(db.String(50), nullable=True)
    open_time = db.Column(db.String(50), nullable=True)
    close_time = db.Column(db.String(50), nullable=True)
    program_type = db.Column(db.String(255), nullable=True)
    image_url = db.Column(db.String(500), nullable=True)
    full_link = db.Column(db.String(500), nullable=True)
    description = db.Column(db.Text, nullable=True)
    address = db.Column(db.Text, nullable=True)
    related_housing_id = db.Column(db.Integer, nullable=True)
    related_book_id = db.Column(db.Integer, nullable=True)

class Book(db.Model):
    __tablename__ = "books"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False, unique=True)
    author = db.Column(db.String(255), nullable=False)
    publishDate = db.Column(db.String(50), nullable=True)
    pageCount = db.Column(db.Integer, nullable=True)
    listPrice = db.Column(db.String(50), nullable=True)
    description = db.Column(db.Text, nullable=True)
    cat = db.Column(db.String(100), nullable=True)
    image = db.Column(db.String(500), nullable=True)
    link = db.Column(db.String(500), nullable=True)
    related_housing_id = db.Column(db.Integer, nullable=True)
    related_childcare_id = db.Column(db.Integer, nullable=True)

class Housing(db.Model):
    __tablename__ = "housing"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False, unique=True)  # "Foundation Communities Trails at the Park"
    address = db.Column(db.String(255), nullable=False, unique=True)  # "815 W Slaughter Ln, Austin, TX 78748, USA"
    rating = db.Column(db.Float, nullable=True)  # 4.1
    place_id = db.Column(db.String(255), nullable=False, unique=True)  # "ChIJ1XYMEsJMW4YRnFdi53JJw3Q"
    totalRatings = db.Column(db.Integer, nullable=True)  # 80
    photo =  db.Column(db.String(500), nullable=True)
    google_maps_link = db.Column(db.Text, nullable=True)  # Google Maps link
    phone_number = db.Column(db.String(255), nullable=True, unique=True)  # "(512) 280-5200"
    website = db.Column(db.String(255), nullable=True, unique=True)  # "http://www.foundcom.org/get-housing/austin-communities/trails-at-the-park/"
    opening_hours = db.Column(db.Text, nullable=True)  # JSON string or text field for list storage
    related_book_id = db.Column(db.Integer, nullable=True)  # Optional foreign key
    related_childcare_id = db.Column(db.Integer, nullable=True) 


# Flask API Route to get all daycares
@app.route("/api/childcare", methods=["GET"])
def get_all_daycares():
    with app.app_context():
        daycares = Daycare.query.all()

        # Collect related IDs
        book_ids = [d.related_book_id for d in daycares if d.related_book_id]
        housing_ids = [d.related_housing_id for d in daycares if d.related_housing_id]

        # Batch fetch related resources
        books = Book.query.filter(Book.id.in_(book_ids)).all()
        housings = Housing.query.filter(Housing.id.in_(housing_ids)).all()

        # Create lookup dicts
        book_map = {b.id: b for b in books}
        housing_map = {h.id: h for h in housings}

        result = []
        for daycare in daycares:
            related_book = book_map.get(daycare.related_book_id)
            related_housing = housing_map.get(daycare.related_housing_id)

            result.append({
                "id": daycare.id,
                "name": daycare.name,
                "age_range": daycare.age_range,
                "open_time": daycare.open_time,
                "close_time": daycare.close_time,
                "program_type": daycare.program_type,
                "image_url": daycare.image_url,
                "full_link": daycare.full_link,
                "description": daycare.description,
                "address": daycare.address,
                "related_book": {
                    "id": related_book.id,
                    "title": related_book.title,
                    "author": related_book.author,
                    "publishDate": related_book.publishDate,
                    "pageCount": related_book.pageCount,
                    "listPrice": related_book.listPrice,
                    "description": related_book.description,
                    "cat": related_book.cat,
                    "image": related_book.image,
                    "link": related_book.link
                } if related_book else None,
                "related_housing": {
                    "id": related_housing.id,
                    "name": related_housing.name,
                    "address": related_housing.address,
                    "rating": related_housing.rating,
                    "place_id": related_housing.place_id,
                    "totalRatings": related_housing.totalRatings,
                    "photo":  related_housing.photo,
                    "google_maps_link": related_housing.google_maps_link,
                    "phone_number": related_housing.phone_number,
                    "website": related_housing.website,
                    "opening_hours": related_housing.opening_hours,
                } if related_housing else None
            })

        return jsonify(result)


# Flask API Route to get a single daycare by id
@app.route("/api/childcare/<int:id>", methods=["GET"])
def get_specific_daycare(id):
    with app.app_context():
        daycare = Daycare.query.get(id)
        if not daycare:
            return jsonify({"error": "Daycare not found"}), 404

        related_book = Book.query.get(daycare.related_book_id)
        related_housing = Housing.query.get(daycare.related_housing_id)

        return jsonify({
            "id": daycare.id,
            "name": daycare.name,
            "age_range": daycare.age_range,
            "open_time": daycare.open_time,
            "close_time": daycare.close_time,
            "program_type": daycare.program_type,
            "image_url": daycare.image_url,
            "full_link": daycare.full_link,
            "description": daycare.description,
            "address": daycare.address,
            "related_book": {
                "id": related_book.id,
                "title": related_book.title,
                "author": related_book.author,
                "publishDate": related_book.publishDate,
                "pageCount": related_book.pageCount,
                "listPrice": related_book.listPrice,
                "description": related_book.description,
                "cat": related_book.cat,
                "image": related_book.image,
                "link": related_book.link
            } if related_book else None,
            "related_housing": {
                "id": related_housing.id,
                "name": related_housing.name,
                "address": related_housing.address,
                "rating": related_housing.rating,
                "place_id": related_housing.place_id,
                "totalRatings": related_housing.totalRatings,
                "photo":  related_housing.photo,
                "google_maps_link": related_housing.google_maps_link,
                "phone_number": related_housing.phone_number,
                "website": related_housing.website,
                "opening_hours": related_housing.opening_hours,
            } if related_housing else None
        })

    
@app.route("/api/books", methods=["GET"])
def get_all_books():
    with app.app_context():
        books = Book.query.all()

        housing_ids = [b.related_housing_id for b in books if b.related_housing_id]
        childcare_ids = [b.related_childcare_id for b in books if b.related_childcare_id]

        housings = Housing.query.filter(Housing.id.in_(housing_ids)).all()
        childcares = Daycare.query.filter(Daycare.id.in_(childcare_ids)).all()

        housing_map = {h.id: h for h in housings}
        childcare_map = {c.id: c for c in childcares}

        result = []
        for book in books:
            related_housing = housing_map.get(book.related_housing_id)
            related_childcare = childcare_map.get(book.related_childcare_id)

            result.append({
                "id": book.id,
                "title": book.title,
                "author": book.author,
                "publishDate": book.publishDate,
                "pageCount": book.pageCount,
                "listPrice": book.listPrice,
                "description": book.description,
                "cat": book.cat,
                "image": book.image,
                "link": book.link,
                "related_housing": {
                    "id": related_housing.id,
                    "name": related_housing.name,
                    "address": related_housing.address,
                    "rating": related_housing.rating,
                    "place_id": related_housing.place_id,
                    "totalRatings": related_housing.totalRatings,
                    "photo": related_housing.photo,
                    "google_maps_link": related_housing.google_maps_link,
                    "phone_number": related_housing.phone_number,
                    "website": related_housing.website,
                    "opening_hours": related_housing.opening_hours,
                } if related_housing else None,
                "related_childcare": {
                    "id": related_childcare.id,
                    "name": related_childcare.name,
                    "age_range": related_childcare.age_range,
                    "open_time": related_childcare.open_time,
                    "close_time": related_childcare.close_time,
                    "program_type": related_childcare.program_type,
                    "image_url": related_childcare.image_url,
                    "full_link": related_childcare.full_link,
                    "description": related_childcare.description,
                    "address": related_childcare.address,
                } if related_childcare else None
            })
        return jsonify(result)
    
@app.route("/api/books/<int:id>", methods=["GET"])
def get_specific_book(id):
    with app.app_context():
        book = Book.query.get(id)
        if not book:
            return jsonify({"error": "Book not found"}), 404
        
        related_housing = Housing.query.get(book.related_housing_id) if book.related_housing_id else None
        related_childcare = Daycare.query.get(book.related_childcare_id) if book.related_childcare_id else None

        
        return jsonify({
            "id": book.id,
            "title": book.title,
            "author": book.author,
            "publishDate": book.publishDate,
            "pageCount": book.pageCount,
            "listPrice": book.listPrice,
            "description": book.description,
            "cat": book.cat,
            "image": book.image,
            "link": book.link,
            "related_housing": {
                "id": related_housing.id,
                "name": related_housing.name,
                "address": related_housing.address,
                "rating": related_housing.rating,
                "place_id": related_housing.place_id,
                "totalRatings": related_housing.totalRatings,
                "photo": related_housing.photo,
                "google_maps_link": related_housing.google_maps_link,
                "phone_number": related_housing.phone_number,
                "website": related_housing.website,
                "opening_hours": related_housing.opening_hours,
            } if related_housing else None,
            "related_childcare": {
                "id": related_childcare.id,
                "name": related_childcare.name,
                "age_range": related_childcare.age_range,
                "open_time": related_childcare.open_time,
                "close_time": related_childcare.close_time,
                "program_type": related_childcare.program_type,
                "image_url": related_childcare.image_url,
                "full_link": related_childcare.full_link,
                "description": related_childcare.description,
                "address": related_childcare.address,
            } if related_childcare else None
        })

@app.route("/api/housing", methods=["GET"])
def get_all_housing():
    with app.app_context():
        allHousing = Housing.query.all()

        book_ids = [h.related_book_id for h in allHousing if h.related_book_id]
        childcare_ids = [d.related_childcare_id for d in allHousing if d.related_childcare_id]
        
        books = Book.query.filter(Book.id.in_(book_ids)).all()
        childcares = Daycare.query.filter(Daycare.id.in_(childcare_ids)).all()

        book_map = {b.id: b for b in books}
        childcare_map = {d.id: d for d in childcares}

        result = []
        for house in allHousing: 
            related_book = book_map.get(house.related_book_id)
            related_daycare = childcare_map.get(house.related_childcare_id)

            result.append({
                "id": house.id,
                "name": house.name,
                "address": house.address,
                "rating": house.rating,
                "place_id": house.place_id,
                "totalRatings": house.totalRatings,
                "photo":  house.photo,
                "google_maps_link": house.google_maps_link,
                "phone_number": house.phone_number,
                "website": house.website,
                "opening_hours": house.opening_hours,
                "related_book": {
                    "id": related_book.id,
                    "title": related_book.title,
                    "author": related_book.author,
                    "publishDate": related_book.publishDate,
                    "pageCount": related_book.pageCount,
                    "listPrice": related_book.listPrice,
                    "description": related_book.description,
                    "cat": related_book.cat,
                    "image": related_book.image,
                    "link": related_book.link
                } if related_book else None,
                "related_childcare": {
                    "id": related_daycare.id,
                    "name": related_daycare.name,
                    "age_range": related_daycare.age_range,
                    "open_time": related_daycare.open_time,
                    "close_time": related_daycare.close_time,
                    "program_type": related_daycare.program_type,
                    "image_url": related_daycare.image_url,
                    "full_link": related_daycare.full_link,
                    "description": related_daycare.description,
                    "address": related_daycare.address,
                } if related_daycare else None
            })

        return jsonify(result)
    
@app.route("/api/housing/<int:id>", methods=["GET"])
def get_specific_housing(id):
    with app.app_context():
        housing = Housing.query.get(id)
        if not housing:
            return jsonify({"error": "Housing not found"}), 404

        related_book = Book.query.get(housing.related_book_id)
        related_daycare = Daycare.query.get(housing.related_childcare_id)

        return jsonify({
            "id": housing.id,
            "name": housing.name,
            "address": housing.address,
            "rating": housing.rating,
            "place_id": housing.place_id,
            "totalRatings": housing.totalRatings,
            "photo": housing.photo,
            "google_maps_link": housing.google_maps_link,
            "phone_number": housing.phone_number,
            "website": housing.website,
            "opening_hours": housing.opening_hours,
            "related_book": {
                "id": related_book.id,
                "title": related_book.title,
                "author": related_book.author,
                "publishDate": related_book.publishDate,
                "pageCount": related_book.pageCount,
                "listPrice": related_book.listPrice,
                "description": related_book.description,
                "cat": related_book.cat,
                "image": related_book.image,
                "link": related_book.link
            } if related_book else None,
            "related_childcare": {
                "id": related_daycare.id,
                "name": related_daycare.name,
                "age_range": related_daycare.age_range,
                "open_time": related_daycare.open_time,
                "close_time": related_daycare.close_time,
                "program_type": related_daycare.program_type,
                "image_url": related_daycare.image_url,
                "full_link": related_daycare.full_link,
                "description": related_daycare.description,
                "address": related_daycare.address,
            } if related_daycare else None
        })


# Test endpoints
@app.route("/")
def test_home():
    return "Hello I Am Here at Home!"
@app.route("/<name>")
def test_greet(name):
    return "Hello, {}".format(name)
# End of test endpoints

# Create database tables
with app.app_context():
    db.create_all()
    print("Database tables ensured!")

# Run Flask app
if __name__ == "__main__":
    with app.app_context():
        if not os.getenv("FLASK_TESTING"):  # Prevent db.create_all() in tests
            db.create_all()
            print("Database tables ensured!")
    app.run(debug=True)

