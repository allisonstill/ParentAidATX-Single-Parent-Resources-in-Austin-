import React, { useEffect, useState } from 'react';
import { MapPin, Building, Link, ArrowLeft, Landmark, Star} from 'lucide-react';
import './HousingComplex.css';
import { useParams, Link as RouterLink } from 'react-router-dom';
import BookCard from '../components/bookCard';
import ChildCard from '../components/childCard';


const HousingComplex = () => {
    const { id } = useParams();
    const [housing, setHousing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [randomBook, setRandomBook] = useState(null); // state for random book
    const [randomChildCare, setRandomChildCare] = useState(null);

    useEffect(() => {
        const getHousing = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.parentaidatx.me/api/housing/${id}`);
                
                if (!response.ok) {
                    throw new Error("HTTP ERROR!");
                }
                
                const data = await response.json();
                console.log("Fetched data:", data); 
                setHousing(data);
            } catch (error) {
                console.error("Error fetching housing");
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        getHousing();
    }, [id]);
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

    const CHILDCARE_AGE =["5 yrs"]; // Categories most related to housing near downtown
    useEffect(() => {
        const fetchRandomChildCare = async () => {
            try {
                const response = await fetch("https://api.parentaidatx.me/api/childcare");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                const filteredChildcare = data.filter(daycare => daycare.age_range.includes(CHILDCARE_AGE));
    
                if (filteredChildcare.length > 0) {
                    const randomIndex = Math.floor(Math.random() * filteredChildcare.length);
                    setRandomChildCare(filteredChildcare[randomIndex]);
                } else {
                    setRandomChildCare(null);
                }
            } catch (error) {
                console.error("Error fetching childcare:", error);
                setRandomChildCare(null);
            }
        };
        fetchRandomChildCare();
    }, []);

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
    if (loading) {
        return (
            <div className="housingComplex-container">
                <div className="housingComplex-card">
                    <p>Loading Housing</p>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="housingComplex-container">
                <div className="housingComplex-card">
                    <p>Error loading housing</p>
                </div>
            </div>
        );
    }

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

    const formatHours = (hoursString) => {
        if (!hoursString) return "Hours Not Provided";

        if (typeof hoursString != 'string') {
            return hoursString;
        }

        let tempString = hoursString;
        if (tempString.startsWith('{') && tempString.endsWith('}')) {
            tempString = tempString.slice(1, -1);

            const hoursPerDay = tempString.split('","');
            if (hoursPerDay.length > 0) {
                hoursPerDay[0] = hoursPerDay[0].replace('"', '');
                const last = hoursPerDay.length - 1;
                hoursPerDay[last] = hoursPerDay[last].replace('"', '');
            }

            return (
                <div className = "hours-container">
                    {hoursPerDay.map((day, index) => (
                        <div key={index} className = "hours-per-day">
                            {day}
                        </div>
                    ))}
                </div>
            );
        }
        return tempString;

        return hoursString;

    }

    return (
        <div className="housingComplex-container">
            <div className="housingComplex-card">
                <div className="back-link">
                    <RouterLink to="/housing" className="back-button">
                        <ArrowLeft size={16} />
                            See All Housing
                    </RouterLink>
                </div>
                <div className="image-gallery">
                    <img
                        src={housing.photo}
                        alt={housing.name} 
                        className="gallery-image"
                    />
                </div>

                <div className="content-section">
                    {/* Header Section */}
                    <div className="header-section">
                        <div>
                            <h1 className="housingComplex-title">{housing.name}</h1>
                            <div className="address">
                                <MapPin size={16} />
                                <p>{housing.address}</p>
                            </div>
                            <div className="rating">
                                <RatingStars rating={housing["rating"]} />
                                
                            </div>
                        </div>
                        <div className = "website-link">
                        <a 
                            href={housing["website"]} 
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
                            value="Apartments"
                        />
                        <FeatureCard 
                            icon={Landmark}
                            label="Operating Hours"
                            value={formatHours(housing.opening_hours)}
                        />
                    </div>


                    <div className="map-section">
                        <iframe
                            src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(housing.address)}`}
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
                        {randomChildCare ? (
                            <ChildCard 
                                name={randomChildCare.name}
                                image={randomChildCare.image_url}
                                type={randomChildCare.program_type}
                                age_range={randomChildCare.age_range}
                                open_time={randomChildCare.open_time}
                                close_time={randomChildCare.close_time}
                                address={randomChildCare.address}
                                id={randomChildCare.id}
                            />
                        ) : (
                            <p>Loading childcare...</p>  // Optional: Show a loading message
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
                            <p>Loading books...</p>  // Optional: Show a loading message
                        )}
                    </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HousingComplex;