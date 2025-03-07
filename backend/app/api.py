from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows frontend to access backend

# Connect to MySQL or PostgreSQL
app.config["SQLALCHEMY_DATABASE_URI"] = ""
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# Define model
class GovernmentProgram(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(500), nullable=False)
    description = db.Column(db.Text, nullable=True)

# API endpoint: Get all programs
@app.route("/api/programs", methods=["GET"])
def get_programs(): # runs this method when a GET request is made to the api/programs
    programs = GovernmentProgram.query.all() # query the database to get all government programs (gets all rows)
    return jsonify([{"id": p.id, "name": p.name, "url": p.url, "description": p.description} for p in programs]) # return queried data as a JSON

if __name__ == "__main__":
    app.run(debug=True)
