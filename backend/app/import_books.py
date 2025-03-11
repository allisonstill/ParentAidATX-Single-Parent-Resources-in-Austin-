import json
import os
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:QlxiIYKeqZPqCDORvAcjgWoswvsqbrkO@gondola.proxy.rlwy.net:46024/railway"

engine = create_engine(DATABASE_URL)
Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()

class Book(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False, unique=True)
    author = Column(String(255), nullable=False)
    publishDate = Column(String(50), nullable=True)
    pageCount = Column(Integer, nullable=True)
    listPrice = Column(String(50), nullable=True)
    description = Column(Text, nullable=True)
    cat = Column(String(100), nullable=True)
    image = Column(String(500), nullable=True)
    link = Column(String(500), nullable=True)
    related_housing_id = Column(Integer, nullable=True)
    related_childcare_id = Column(Integer, nullable=True)

Base.metadata.create_all(engine)

with open('single_parenting_books.json', 'r', encoding='utf-8') as f:
    books = json.load(f)

count = 0
updated = 0
for book in books:
    image_url = book.get('image') or book.get('image_url')
    curr_book = session.query(Book).filter_by(title=book.get('title')).first()
    if curr_book:
        if curr_book.image is None and image_url:
            curr_book.image = image_url
            updated += 1
            print("Updating the image")
    else :
        new_book = Book (
            title = book.get('title', 'Unknown Title'),
            author = book.get('author', 'Unknown Author'),
            publishDate = book.get('publishDate'),
            pageCount = book.get('pageCount'),
            listPrice = book.get('list_price'),
            description = book.get('description'),
            cat = book.get('cat'),
            image = image_url,
            link = book.get('link'),
            related_housing_id = book.get('related_housing_id'),
            related_childcare_id = book.get('related_childcare_id'),
        )

        session.add(new_book)
        count += 1
        print("added new book!")

session.commit()
print(f"Added {count} books to Rail")
total = session.query(Book).count()
image_count = session.query(Book).filter(Book.image != None).count()
print(f"Total: {total}")
print(f"With Images: {image_count}")

books_without_images = session.query(Book).filter(Book.image == None).all()
books_left = len(books_without_images)
if books_left > 0:
    for book in books_without_images:
        session.delete(book)
    session.commit()

new_total = session.query(Book).count()
new_image_count = session.query(Book).filter(Book.image != None).count()
print(f"Total: {new_total}")
print(f"With Images: {new_image_count}")