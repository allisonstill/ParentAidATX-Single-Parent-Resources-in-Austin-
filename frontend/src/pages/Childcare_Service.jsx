import React, { useState, useEffect } from 'react';
import { MapPin, Users, Star, Building, Link, ArrowLeft} from 'lucide-react';
import './Childcare_Service.css';
import { useParams, Link as RouterLink } from 'react-router-dom';
import HousingCard from '../components/housingCard'
import BookCard from '../components/bookCard';
// for pretty loading page
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ChildcareService = () => {
    const { id } = useParams();
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [daycare, setDaycare] = useState([]); // the api response data will be stored in "daycare"
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [randomBook, setRandomBook] = useState(null); // state for random book
    const [randomHousing, setRandomHousing] = useState(null);
    



    // Fetch data for a single daycare using API
    useEffect(() => {
        const fetchDaycare = async () => {
            try {
                const response = await fetch(`https://api.parentaidatx.me/api/childcare/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched data:", data); // Debugging (F12)
                setDaycare(data);
            } catch (error) {
                console.error("Error fetching daycares:", error);
                setError("Failed to load daycares. Please try again later.");
            } finally {
                setLoading(false)
            }
        };

        fetchDaycare();
    }, [id]);

    // Fetch a random book using API
    const BOOK_CATEGORIES = ["Family & Relationships", "Parenting"]; // Categories most related to childcare
    useEffect(() => {
        const fetchRandomBook = async () => {
            try {
                const response = await fetch("https://api.parentaidatx.me/api/books");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = await response.json();
    
                // Filter books to only include categories "Family & Relationships" or "Parenting"
                const filteredBooks = data.filter(book => BOOK_CATEGORIES.includes(book.cat));
    
                if (filteredBooks.length > 0) {
                    const randomIndex = Math.floor(Math.random() * filteredBooks.length);
                    setRandomBook(filteredBooks[randomIndex]);
                    
                } else {
                    setRandomBook(null); // No matching books available
                }
            } catch (error) {
                console.error("Error fetching books:", error);
                setRandomBook(null);
            }
        };
    
        fetchRandomBook();
        
    }, []);
    const HOUSING_ADDRESS = ["78705"]; // Categories most related to housing near downtown
    useEffect(() => {
        const fetchRandomHousing = async () => {
            try {
                const response = await fetch("https://api.parentaidatx.me/api/housing");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = await response.json();

                const filteredHousing = data.filter(housing => housing.address.includes(HOUSING_ADDRESS));
    
                if (filteredHousing.length > 0) {
                    const randomIndex = Math.floor(Math.random() * filteredHousing.length);
                    setRandomHousing(filteredHousing[randomIndex]);
                } else {
                    setRandomHousing(null);
                }
            } catch (error) {
                console.error("Error fetching housing:", error);
                setRandomHousing(null);
            }
        };
        fetchRandomHousing();
    }, []);

    if(loading){
        return (<p className="loading-message">Loading daycares...</p>);
     }
     if(error){
         return (<p className="error-message">{error}</p>)
     }

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
                    size={20}
                    className={`star ${index < rating ? 'filled' : ''}`}
                />
            ))}
        </div>
    );

    return (
        <div className="childcare-container">
            <div className="childcare-card">
                <div className="back-link">
                    <RouterLink to="/childcare" className="back-button">
                        <ArrowLeft size={16} />
                            See All Childcare Services
                    </RouterLink>
                </div>

                <div className="image-gallery">
                    <img 
                    src={daycare.image_url} 
                    alt="Facility"
                    className="gallery-image"/>
                    {/*<img
                        src={childcare.images[activeImageIndex]}
                        alt="Facility"
                        className="gallery-image"
                    />
                    {childcare.images.length > 1 && (
                        <div className="pagination-dots">
                            {childcare.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImageIndex(index)}
                                    className={`dot ${activeImageIndex === index ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                    )}*/}
                </div>

                <div className="content-section">
                    {/* Header Section */}
                    <div className="header-section">
                        <div>
                            <h1 className="childcare-title">{daycare.name}</h1>
                            <div className="address">
                                <MapPin size={16} />
                                <p>{daycare.address}</p>
                            </div>
                            {/*<div className="quality-rating">
                                <RatingStars rating={childcare["quality-rating"]} />
                                <span>{childcare["quality-rating"]}/5 Quality Rating</span>
                            </div>*/}
                        </div>
                        <div className="price-section">
                            <p className="price-label">Time</p>
                            <p className="price-value">{daycare.open_time} - {daycare.close_time}</p>
                        </div>
                        <div className = "website-link">
                        <a 
                            href={daycare.full_link}
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
                            label="Type"
                            value={daycare.program_type}
                        />
                        <FeatureCard 
                            icon={Users}
                            label="Age Range"
                            value={daycare.age_range}
                        />
                    </div>

                    {daycare && daycare.description ? (
                        <div className="description-section">
                            <h2 className="description-title">About {daycare.name}</h2>
                            <p className="description-body">
                                {isExpanded ? daycare.description : daycare.description.slice(0, 200) + "..."}
                            </p>
                            {daycare.description.length > 200 && (
                                <button 
                                    className="see-more-button"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                >
                                    {isExpanded ? "See Less" : "See More"}
                                </button>
                            )}
                        </div>
                    ) : null}


                    
                    <div className="map-section">
                        <iframe
                            src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(daycare.address)}`}
                            className="map-frame"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    
                </div>
                
                <div className="related-resources-section">
                    <h2 className="section-title">Related Resources</h2>
                    <div className="cards-container" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div style={{ width: '350px' }}>
                        {randomHousing ? (
                            <HousingCard 
                                name={randomHousing.name}
                                address={randomHousing.address}
                                rating={randomHousing.rating}
                                totalRatings={randomHousing.totalRatings}
                                photo={randomHousing.photo}
                                phone_number={randomHousing.phone_number}
                                website={randomHousing.website}
                                id={randomHousing.id}
                            />
                        ) : (
                            <p>Loading housing...</p>  // Optional: Show a loading message
                        )}
                    </div>
                    <div style={{ width: '350px' }}>
                        {randomBook ? (
                            <BookCard
                                image={randomBook.image}
                                title={randomBook.title}
                                author={randomBook.author}
                                publishDate={randomBook.publishDate}
                                pageCount={randomBook.pageCount}
                                listPrice={randomBook.listPrice}
                                cat={randomBook.cat}
                                id={randomBook.id}
                            />
                        ) : (
                            <p>Loading book...</p>  // Optional: Show a loading message
                        )}
                    </div>

                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default ChildcareService;