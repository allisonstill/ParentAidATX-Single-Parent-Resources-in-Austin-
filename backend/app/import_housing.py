import json
import os
from sqlalchemy import create_engine, Column, Integer, String, Text, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:QlxiIYKeqZPqCDORvAcjgWoswvsqbrkO@gondola.proxy.rlwy.net:46024/railway"

engine = create_engine(DATABASE_URL)
Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()

class Housing(Base):
    __tablename__ = "housing"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(Text, nullable=False, unique=True)  # Changed to Text for larger string
    address = Column(Text, nullable=False, unique=True)  # Changed to Text for larger string
    rating = Column(Float, nullable=True)
    place_id = Column(String(255), nullable=False, unique=True)
    totalRatings = Column(Integer, nullable=True)
    photo = Column(Text, nullable=True)  # Storing photo URLs as Text (no length limit)
    google_maps_link = Column(Text, nullable=True)
    phone_number = Column(String(255), nullable=True, unique=False)
    website = Column(Text, nullable=True)
    opening_hours = Column(Text, nullable=True)  # Assuming this is stored as a JSON or long text
    related_book_id = Column(Integer, nullable=True)
    related_childcare_id = Column(Integer, nullable=True)

Base.metadata.create_all(engine)

with open('housing_places.json', 'r', encoding='utf-8') as f:
    housing = json.load(f)

count = 0
updated = 0
with session.no_autoflush:
    for item in housing:
        image_url = item.get('photo') or item.get('formatted_photo_url')
        
        # Check for duplicates based on name, address, and place_id (phone_number is not unique now)
        curr_item = session.query(Housing).filter(
            (Housing.name == item['name']) |
            (Housing.address == item['address']) |
            (Housing.place_id == item['place_id'])
        ).first()

        if curr_item:
            if curr_item.photo is None and image_url:
                curr_item.photo = image_url
                updated += 1
                print("Updating the image")
        else:
            new_item = Housing(
                name=item.get('name'),
                address=item.get('address'),
                rating=item.get('rating'),
                place_id=item.get('place_id'),
                totalRatings=item.get('totalRatings'),
                photo=item.get('photo'),
                google_maps_link=item.get('google_maps_link'),
                phone_number=item.get('phone_number'),  # No longer checking for uniqueness here
                website=item.get('website'),
                opening_hours=item.get('opening_hours'),
                related_book_id=item.get('related_book_id'),
                related_childcare_id=item.get('related_childcare_id'),
            )
            session.add(new_item)
            count += 1
            print("Added new housing!")

session.commit()
print(f"Added {count} housing to Rail")
total = session.query(Housing).count()
image_count = session.query(Housing).filter(Housing.photo != None).count()
print(f"Total: {total}")
print(f"With Images: {image_count}")

housing_without_images = session.query(Housing).filter(Housing.photo == None).all()
housing_left = len(housing_without_images)

if housing_left > 0:
    for item in housing_without_images:
        session.delete(item)
    session.commit()

new_total = session.query(Housing).count()
new_image_count = session.query(Housing).filter(Housing.photo != None).count()
print(f"Total: {new_total}")
print(f"With Images: {new_image_count}")
