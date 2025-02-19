import React, { useState } from 'react';
import { MapPin, Star, Building, Link, Shield, Clock} from 'lucide-react';
import './HousingComplex.css';
import {useParams} from 'react-router-dom';

const HousingComplex = () => {
    const { id } = useParams();
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const housingComplexes = {
        1: {
            "name": "Kensington Apartments",
	        "cost": "900-1300",
	        "rating": "3.9",
	        "reviews": [
                {
                    name: "Indiana Jones",
                    review: "He really listened to me and I was quickly approved and in my new home",
                    date: "Last Week"
                },
                {
                    name: "Sally David",
                    review: "I hated it here. Don't live here!",
                    date: "Two Years Ago"
                }
            ],
            "housingStyle": "Apartments",
            "address": "2202 W N Loop Blvd, Austin, TX 78756",
            "zipcode": "78756",
            "crime": "High",
            "park": "Ramsey Neighborhood Park",
            "transportation": {
                "Distance": "10",
                "Type": "public"
            },
            "governmentSubsidized": "True",
            "images": [
                "https://rentpath-res.cloudinary.com/t_3x2_fixed_webp_xl/t_unpaid/e2335139f4a9f2257227377307f74af1",
                "https://images1.apartments.com/i2/OPxQY7oifS8B7xNNK_RJBNDJo3BfiQPIs_IMA6j1SGg/117/estates-at-east-riverside-austin-tx-building-photo.jpg?p=1",
                "https://lirp.cdn-website.com/609bac3c/dms3rep/multi/opt/DSC08231-1920w.jpg"
            ],
            "website": "https://www.rainieratx.com/kensington-apartments"
        },
        2: {
            "name": "Salvation Army Social Services Center",
	        "cost": "0",
	        "rating": "3.8",
            "reviews": [
                {
                    name: "Edith J.",
                    review: "Positive and encouraging staff make staying here enjoyable and pleasant. The center itself is generally clean, calm, and feels safe for the family.",
                    date: "Three Months Ago"
                },
                {
                    name: "John Quincy",
                    review: "It was sufficient. The staff was very helpful.",
                    date: "Two Days Ago"
                }
            ],
            "housingStyle": "Shelter",
            "address": "4613 Tannehill Ln Bldg 1, Austin, TX 78721",
            "zipcode": "78721",
            "crime": "Moderate",
            "park": "Springdale Neighborhood Park",
            "transportation": {
                "Distance": "10",
                "Type": "public"
            },
            "governmentSubsidized": "False",
            "images": [
                "https://lh3.googleusercontent.com/p/AF1QipMAAvugxD42xXAw5K-TPQM7RbRkxZRFJpZsfaqs=s1360-w1360-h1020",
                "https://lh3.googleusercontent.com/p/AF1QipM-g_EuyyD7J5ua2Q43GLVjwZPlqkEQImJXOB_X=s1360-w1360-h1020",
                "https://lh3.googleusercontent.com/p/AF1QipOez4dGtPFeqxBtDjEQiE6rswxW_VjBKpCa55lO=s1360-w1360-h1020"
            ],
            "website": "https://salvationarmyaustin.org/"
        },
        3: {
            "name": "Pathways at North Loop Apartments",
	        "cost": "1000-1100",
	        "rating": "3.3",
	        "reviews": [
                {
                    name: "Nancy O.",
                    review: "I have never stayed at a nicer apartment! Community was great!",
                    date: "One Month Ago"
                },
                {
                    name: "William Smith",
                    review: "Had a great stay! Sad to leave :(",
                    date: "Two Weeks Ago"
                }
            ],
            "housingStyle": "Apartments",
            "address": "2300 W N Loop Blvd #101, Austin, TX 78756",
            "zipcode": "78756",
            "crime": "High",
            "park": "Crestmont Park",
            "transportation": {
                "Distance": "10",
                "Type": "public"
            },
            "governmentSubsidized": "True",
            "images": [
                "https://www.hacanet.org/wp-content/uploads/2017/02/NorthLoop-06-1024x683.jpg",
                "https://cdngeneralcf.rentcafe.com/dmslivecafe/2/102511/North%20Loop%20Property%201.jpg?&quality=85&",
                "https://cdngeneralcf.rentcafe.com/dmslivecafe/2/102511/North%20Loop%20Sign.jpg?quality=85&scale=both&"
            ],
            "website": "https://www.pathwaysatnorthloop.org/brochure.aspx"
        }
    };
    const housingComplex = housingComplexes[id];

    // Component for feature cards
    const FeatureCard = ({ icon: Icon, label, value }) => (
        <div className="feature-card">
            <Icon className="feature-icon" size={20} />
            <div className="feature-content">
                <p>{label}</p>
                <p>{value}</p>
            </div>
        </div>
    );

    // Component for rating stars
    const RatingStars = ({ rating }) => (
        <div className="rating-stars">
            {[...Array(5)].map((_, index) => (
                <Star
                    key={index}
                    className={`star ${index < Math.floor(rating) ? 'filled' : 'empty'}`}
                />
            ))}
            <span>({rating})</span>
        </div>
    );

    return (
        <div className="housingComplex-container">
            <div className="housingComplex-card">
            <div className="image-gallery">
                    <img
                        src={housingComplex.images[activeImageIndex]}
                        alt="Housing Complex"
                        className="gallery-image"
                    />
                    {housingComplex.images.length > 1 && (
                        <div className="pagination-dots">
                            {housingComplex.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImageIndex(index)}
                                    className={`dot ${activeImageIndex === index ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="content-section">
                    {/* Header Section */}
                    <div className="header-section">
                        <div>
                            <h1 className="housingComplex-title">{housingComplex.name}</h1>
                            <div className="address">
                                <MapPin size={16} />
                                <p>{housingComplex.address}</p>
                            </div>
                            <div className="rating">
                                <RatingStars rating={housingComplex["rating"]} />
                                
                            </div>
                        </div>
                        <div className="cost-section">
                            <p className="cost-label">Daily Rate</p>
                            <p className="cost-value">${housingComplex.cost}</p>
                        </div>
                        <div className = "website-link">
                        <a 
                            href={housingComplex["website"]} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="website-button"
                        >
                            <Link size={20} />
                            Visit Official Website
                        </a>
                    </div>
                    </div>

                    <div className="features-grid">
                        <FeatureCard 
                            icon={Building}
                            label="Property Type"
                            value={housingComplex.housingStyle}
                        />
                        <FeatureCard 
                            icon={Shield}
                            label="Crime Rate"
                            value={housingComplex.crime}
                        />
                    </div>

                    {/* Reviews Section */}
                    <div className="reviews-section">
                        <div className="reviews-header">
                            <h2 className="section-title">Reviews</h2>
                            <RatingStars rating={housingComplex.rating} />
                        </div>
                        <div className="reviews-list">
                            {housingComplex.reviews.map((review, index) => (
                                <div key={index} className="review-card">
                                    <div className="review-header">
                                        <p className="reviewer-name">{review.name}</p>
                                        <div className="review-date">
                                            <Clock size={16} />
                                            <span>{review.date}</span>
                                        </div>
                                    </div>
                                    <p className="review-text">{review.review}</p>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="map-section">
                        <iframe
                            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(housingComplex.address)}`}
                            className="map-frame"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default HousingComplex;