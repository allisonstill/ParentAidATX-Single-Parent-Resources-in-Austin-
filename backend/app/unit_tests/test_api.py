import pytest
import sys
import os
from unittest.mock import patch

# Set an environment variable to prevent db.create_all() from running in tests.
os.environ["FLASK_TESTING"] = "1"

# Add the backend/app folder to Python’s module search path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from api import app  # Import the app but avoid running db.create_all()

@pytest.fixture
def client():
    """Create a test client and ensure the app context is active."""
    app.config["TESTING"] = True
    with app.app_context():  # FIX: Ensure app context is set
        with app.test_client() as client:
            yield client

### Mocking Queries for Each Endpoint ###

@patch("api.Daycare.query.all", return_value=[{"id": 1, "name": "Mock Daycare"}])
def test_get_all_daycares(mock_query, client):
    response = client.get("/api/childcare")
    assert response.status_code == 200
    assert isinstance(response.json, list)

@patch("api.Daycare.query.get", return_value=None)
def test_get_specific_daycare_not_found(mock_query, client):
    response = client.get("/api/childcare/999")
    assert response.status_code == 404
    assert response.json == {"error": "Daycare not found"}

@patch("api.Book.query.all", return_value=[{"id": 1, "title": "Mock Book"}])
def test_get_all_books(mock_query, client):
    response = client.get("/api/books")
    assert response.status_code == 200
    assert isinstance(response.json, list)

@patch("api.Book.query.get", return_value=None)
def test_get_specific_book_not_found(mock_query, client):
    response = client.get("/api/books/999")
    assert response.status_code == 404
    assert response.json == {"error": "Book not found"}

@patch("api.Housing.query.all", return_value=[{"id": 1, "name": "Mock Housing"}])
def test_get_all_housing(mock_query, client):
    response = client.get("/api/housing")
    assert response.status_code == 200
    assert isinstance(response.json, list)

@patch("api.Housing.query.get", return_value=None)
def test_get_specific_housing_not_found(mock_query, client):
    response = client.get("/api/housing/999")
    assert response.status_code == 404
    assert response.json == {"error": "Housing not found"}

def test_homepage(client):
    """Test the homepage / endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    assert response.data == b"Hello I Am Here at Home!"

def test_greet_user(client):
    """Test the /<name> endpoint."""
    response = client.get("/John")
    assert response.status_code == 200
    assert response.data == b"Hello, John"
