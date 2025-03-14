import pytest
import sys
import os

# Add the backend/app folder to Python’s module search path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from api import app, db, Daycare, Book, Housing

@pytest.fixture
def client():
    """Create a test client and setup an in-memory database."""
    app.config["TESTING"] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()

def test_get_all_daycares(client):
    """Test the /api/childcare endpoint."""
    response = client.get("/api/childcare")
    assert response.status_code == 200
    assert isinstance(response.json, list)

def test_get_specific_daycare_not_found(client):
    """Test /api/childcare/<id> when the daycare is not found."""
    response = client.get("/api/childcare/1")
    assert response.status_code == 404
    assert response.json == {"error": "Daycare not found"}

def test_get_all_books(client):
    """Test the /api/books endpoint."""
    response = client.get("/api/books")
    assert response.status_code == 200
    assert isinstance(response.json, list)

def test_get_specific_book_not_found(client):
    """Test /api/books/<id> when the book is not found."""
    response = client.get("/api/books/1")
    assert response.status_code == 404
    assert response.json == {"error": "Book not found"}

def test_get_all_housing(client):
    """Test the /api/housing endpoint."""
    response = client.get("/api/housing")
    assert response.status_code == 200
    assert isinstance(response.json, list)

def test_get_specific_housing_not_found(client):
    """Test /api/housing/<id> when the housing entry is not found."""
    response = client.get("/api/housing/1")
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
