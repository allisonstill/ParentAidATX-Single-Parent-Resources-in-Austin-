"""
Defines database models, API endpoints, and serves data from our ProstgreSQL databases.
"""

from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask app
app = Flask(__name__)

# Database Configuration
DB_USERNAME = "your_username"
DB_PASSWORD = "your_password"
DB_HOST = "your-db-instance.us-east-2.rds.amazonaws.com"
DB_NAME = "brightwheel"

app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define Database Model
class Daycare(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    age_range = db.Column(db.String(50), nullable=True)
    open_time = db.Column(db.String(50), nullable=True)
    close_time = db.Column(db.String(50), nullable=True)
    program_type = db.Column(db.String(255), nullable=True)
    image_url = db.Column(db.String(500), nullable=True)
    full_link = db.Column(db.String(500), nullable=True)

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

# Run Flask
if __name__ == "__main__":
    app.run(debug=True)
