"""
Defines database models, API endpoints, and serves data from our ProstgreSQL databases.
"""
import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["https://parentaidatx.me", "http://localhost:5175"]}})


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
    __tablename__ = "daycare" # must match to tosql call
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

# Flask API Route to get all daycares
@app.route("/api/childcare", methods=["GET"])
def get_all_daycares():
    with app.app_context():
        daycares = Daycare.query.all()
        return jsonify([
            {
                "id": daycare.id,
                "name": daycare.name,
                "age_range": daycare.age_range,
                "open_time": daycare.open_time,
                "close_time": daycare.close_time,
                "program_type": daycare.program_type,
                "image_url": daycare.image_url,
                "full_link": daycare.full_link,
                "description": daycare.description,
                "address": daycare.address
            } for daycare in daycares
        ])

# Flask API Route to get a single daycare by id
@app.route("/api/childcare/<int:id>", methods=["GET"])
def get_specific_daycare(id):
    with app.app_context():
        daycare = Daycare.query.get(id)
        if not daycare:
            return jsonify({"error": "Daycare not found"}), 404
        
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
            "address": daycare.address
        })
    
@app.route("/api/books", methods=["GET"])
def get_all_books():
    with app.app_context():
        books = Book.query.all()
        return jsonify([
            {
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
                "related_housing_id": book.related_housing_id,
                "related_childcare_id": book.related_childcare_id
            } for book in books
        ])
    
@app.route("/api/books/<int:id>", methods=["GET"])
def get_specific_book(id):
    with app.app_context():
        book = Book.query.get(id)
        if not book:
            return jsonify({"error": "Book not found"}), 404
        
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
            "related_housing_id": book.related_housing_id,
            "related_childcare_id": book.related_childcare_id
        })


# Just for testing
@app.route("/")
def test_home():
    return "Hello I Am Here at home!"
@app.route("/<name>")
def test_greet(name):
    return "Hello, {}".format(name)
@app.route("/api/add-test-daycare", methods=["GET"])
def add_test_daycare():
    with app.app_context():
        # Create a test entry
        test_entry = Daycare(
            name="Test Daycare",
            age_range="2-5 years",
            open_time="8:00 AM",
            close_time="6:00 PM",
            program_type="Montessori",
            image_url="https://example.com/image.jpg",
            full_link="https://example.com",
            description = "example description",
            address = "example address"
        )
        
        # Add to database and commit
        db.session.add(test_entry)
        db.session.commit()

        return jsonify({"message": "Test daycare added!"})
# End of tests

# Create database tables
with app.app_context():
    db.create_all()
    print("Database tables ensured!")

# Run Flask app
if __name__ == "__main__":
    app.run(debug=True)
