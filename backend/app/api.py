"""
Defines database models, API endpoints, and serves data from our ProstgreSQL databases.
"""
import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask app
app = Flask(__name__)

# Database Configuration
DATABASE_URL = os.getenv("DATABASE_URL")
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

# Flask API Route to Fetch Data
@app.route("/api/daycares", methods=["GET"])
def get_daycares():
    with app.app_context():
        daycares = Daycare.query.all()
        return jsonify([
            {
                "id": d.id,
                "name": d.name,
                "age_range": d.age_range,
                "open_time": d.open_time,
                "close_time": d.close_time,
                "program_type": d.program_type,
                "image_url": d.image_url,
                "full_link": d.full_link
            } for d in daycares
        ])

# just for testing
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
            full_link="https://example.com"
        )
        
        # Add to database and commit
        db.session.add(test_entry)
        db.session.commit()

        return jsonify({"message": "Test daycare added!"})


# Create database tables
with app.app_context():
    db.create_all()
    print("Database tables ensured!")

# Run Flask app
if __name__ == "__main__":
    app.run(debug=True)
