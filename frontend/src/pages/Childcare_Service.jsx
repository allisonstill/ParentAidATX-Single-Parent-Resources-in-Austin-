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
                        {daycare.related_housing ? (
                            <HousingCard 
                                name={daycare.related_housing.name}
                                address={daycare.related_housing.address}
                                rating={daycare.related_housing.rating}
                                totalRatings={daycare.related_housing.totalRatings}
                                photo={daycare.related_housing.photo}
                                phone_number={daycare.related_housing.phone_number}
                                website={daycare.related_housing.website}
                                id={daycare.related_housing.id}
                            />
                        ) : (
                            <p>Loading housing...</p>  // Optional: Show a loading message
                        )}
                    </div>
                    <div style={{ width: '350px' }}>
                        {daycare.related_book_id ? (
                            <BookCard
                                image={daycare.related_book.image}
                                title={daycare.related_book.title}
                                author={daycare.related_book.author}
                                publishDate={daycare.related_book.publishDate}
                                pageCount={daycare.related_book.pageCount}
                                listPrice={daycare.related_book.listPrice}
                                cat={daycare.related_book.cat}
                                id={daycare.related_book.id}
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