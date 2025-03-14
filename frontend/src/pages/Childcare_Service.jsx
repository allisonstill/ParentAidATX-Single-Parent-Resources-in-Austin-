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


    // Fetch data for a single daycare using API
    useEffect(() => {
        const fetchDaycare = async () => {
            try {
                const response = await fetch(`https://flask-api-production-730f.up.railway.app/api/childcare/${id}`);
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
                const response = await fetch("https://flask-api-production-730f.up.railway.app/api/books");
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
    

    if(loading){
        return (<p className="loading-message">Loading daycares...</p>);
     }
     if(error){
         return (<p className="error-message">{error}</p>)
     }

    // Basic childcare data
    const childcares = {
        1: {
            "name": "Child Craft Schools",
            "childcare-type": "Daycare",
            "cost": "850-1050",
            "quality-rating": 5.0,
            "ages": "5 months - 5 years old",
            "zipcode": "78705",
            "address": "800 W 30th St, Austin, TX",
            "website": "https://www.childcraftschooltx.com/index.html",
            "images": [
                "https://childcraftschooltx.com/uploads/1/2/3/5/123531586/published/image_6.png?1546248481",
                "https://s3-media0.fl.yelpcdn.com/bphoto/_PLB8tWLFahaR5p6adPPuw/348s.jpg",
                "https://cf-images.us-east-1.prod.boltdns.net/v1/static/6057277741001/fe6b8cea-b81f-4d96-99b9-1ee885863fe2/52b81240-6552-49e3-929f-3db8d8589f69/1280x720/match/image.jpg"
            ],
            "related-resources": {
                "book": {
                    id: 1, 
                    title: "Book 1",
                    author: "Author 1",
                    publishDate: "January 1, 2022",
                    pageCount: "100",
                    listPrice: "$10.00",
                    description: "Book about single parenting",
                    cat: "Housing",
                    image: "https://novapublishers.com/wp-content/uploads/2018/09/9781536132779-e1537696463162.jpg",
                    link: "https://novapublishers.com/shop/single-parenting-in-the-21st-century-perceptions-issues-and-implications/"       
                
                },
                "housing": {
                    name: "Salvation Army Social Services Center",
                    image: "https://lh3.googleusercontent.com/p/AF1QipMAAvugxD42xXAw5K-TPQM7RbRkxZRFJpZsfaqs=s1360-w1360-h1020",
                    cost: "$0",
                    rating: "3.8",
                    housingStyle: "Shelter",
                    address: "4613 Tannehill Ln Bldg 1, Austin, TX 78721",
                    website: "https://salvationarmyaustin.org/",
                    id: 2
                }
            }
        },
        2: {
            "name": "First English Lutheran Child Development Center",
            "childcare-type": "Daycare",
            "cost": "0",
            "quality-rating": 5.0,
            "ages": "6 weeks - 5 years old",
            "zipcode": "78705",
            "address": "3001 Whitis Ave, Austin, TX",
            "website": "https://www.firstenglishcdc.org/",
            "images": [
                "https://images.squarespace-cdn.com/content/v1/659d9f977b7a4100052c42be/1704828826252-OLIWM0453MDOXDWKZAOY/FELCDC_Food.png",
                "https://images.squarespace-cdn.com/content/v1/659d9f977b7a4100052c42be/1704828830090-C759IQ5K60BSVVNVRVMA/FELCDC_4.jpeg",
                "https://i0.wp.com/www.felcaustin.org/wp-content/uploads/FELCDC-Logo-2023.png?fit=474%2C598&ssl=1"
            ],
            "related-resources": {
                "book": {
                    id: 1, 
                    title: "Book 1",
                    author: "Author 1",
                    publishDate: "January 1, 2022",
                    pageCount: "100",
                    listPrice: "$10.00",
                    description: "Book about single parenting",
                    cat: "Housing",
                    image: "https://novapublishers.com/wp-content/uploads/2018/09/9781536132779-e1537696463162.jpg",
                    link: "https://novapublishers.com/shop/single-parenting-in-the-21st-century-perceptions-issues-and-implications/"       
                
                },
                "housing": {
                    name: "Kensington Apartments",
                    image: "https://rentpath-res.cloudinary.com/t_3x2_fixed_webp_xl/t_unpaid/e2335139f4a9f2257227377307f74af1",
                    cost: "$900-1300",
                    rating: "3.9",
                    housingStyle: "Apartments",
                    address: "2202 W N Loop Blvd, Austin, TX 78756",
                    website: "https://www.rainieratx.com/kensington-apartments",
                    id: 1
                }
            }
        },
        3: {
            "name": "Lil' Angels Daycare Center",
            "childcare-type": "Daycare",
            "cost": "0",
            "quality-rating": 4.9,
            "ages": "2 months - 11 years",
            "zipcode": "78723",
            "address": "6006 Cameron Rd, Austin, TX 78723",
            "website": "http://lilangelsaustin.com/",
            "images": [
                "https://winnie.imgix.net/30236f96-99fe-403a-aa72-5e38719cbab7?w=242&h=124&dpr=3&fit=crop&auto=compress",
                "https://winnie.imgix.net/2b530ca2-7c5d-448b-ad61-ffc1112998ed?w=242&h=124&dpr=3&fit=crop&auto=compress",
                "https://winnie.imgix.net/b175c141-f134-45ce-9689-4769f254fa65?w=242&h=124&dpr=3&fit=crop&auto=compress"
            ],
            "related-resources": {
                "book": {
                    id: 1, 
                    title: "Book 1",
                    author: "Author 1",
                    publishDate: "January 1, 2022",
                    pageCount: "100",
                    listPrice: "$10.00",
                    description: "Book about single parenting",
                    cat: "Housing",
                    image: "https://novapublishers.com/wp-content/uploads/2018/09/9781536132779-e1537696463162.jpg",
                    link: "https://novapublishers.com/shop/single-parenting-in-the-21st-century-perceptions-issues-and-implications/"       
                
                },
                "housing": {
                    name: "Pathways at North Loop Apartments",
                    image: "https://www.hacanet.org/wp-content/uploads/2017/02/NorthLoop-06-1024x683.jpg",
                    cost: "$1000-1100",
                    rating: "3.3",
                    housingStyle: "Apartments",
                    address: "2300 W N Loop Blvd #101, Austin, TX 78756",
                    website: "https://www.pathwaysatnorthloop.org/",
                    id: 3
                }
            }
        }
    };
    const childcare = childcares[id];

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
                           { <HousingCard 
                                image={childcare["related-resources"].housing.image}
                                name={childcare["related-resources"].housing.name}
                                cost={childcare["related-resources"].housing.cost}
                                rating={childcare["related-resources"].housing.rating}
                                HousingStyle={childcare["related-resources"].housing.housingStyle}
                                Address={childcare["related-resources"].housing.address}
                                website={childcare["related-resources"].housing.website}
                                id={childcare["related-resources"].housing.id}                           
                           />
                        }
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

