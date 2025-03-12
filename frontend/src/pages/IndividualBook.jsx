import React, { useEffect, useState } from 'react';
import { BookOpen, Calendar, DollarSign, BookMarked, Tag, Building, Users, Link, ArrowLeft} from 'lucide-react';
import './IndividualBook.css';
import { useParams, Link as RouterLink } from 'react-router-dom';
import HousingCard from '../components/housingCard';
import ChildCard from '../components/childCard';

const Individual_Book = () => {
    const {id} = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedHousing, setRelatedHousing] = useState(null);
    const [relatedChildcare, setRelatedChildcare] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://flask-api-production-730f.up.railway.app/api/books/${id}`);
                
                if (!response.ok) {
                    throw new Error("HTTP ERROR!");
                }
                
                const data = await response.json();
                setBook(data);

                setRelatedHousing({
                    "name": "Kensington Apartments",
                    "cost": "900-1300",
                    "rating": "3.9",
                    "housingStyle": "Apartments",
                    "address": "2202 W N Loop Blvd, Austin, TX 78756",
                    "website": "https://www.rainieratx.com/kensington-apartments",
                    "image": "https://rentpath-res.cloudinary.com/t_3x2_fixed_webp_xl/t_unpaid/e2335139f4a9f2257227377307f74af1",
                    "id": 1
                });

                setRelatedChildcare({
                    "name": "Child Craft Schools",
                    "open_time": "8:00 AM",
                    "close_time": "6:00 PM",
                    "program_type": "Daycare",
                    "age_range": "5 months - 5 years old",
                    "address": "800 W 30th St, Austin, TX",
                    "full_link": "https://www.childcraftschooltx.com/index.html",
                    "image_url": "https://childcraftschooltx.com/uploads/1/2/3/5/123531586/published/image_6.png?1546248481",
                    "description": "Child Craft Schools provides a nurturing environment for early childhood development with experienced staff and engaging educational activities.",
                    "id": 1
                });

                setLoading(false);
            } catch (error) {
                console.error("Error fetching book");
                setLoading(false);
            }
        };
        
        fetchBook();
    }, [id]);

    const FeatureCard = ({ icon: Icon, label, value }) => (
        <div className="feature-card">
            <Icon className="feature-icon" />
            <div className="feature-content">
                <p className="feature-label">{label}</p>
                <p className="feature-value">{value || "Not available"}</p>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="book-container">
                <div className="book-card">
                    <p>Loading book</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="book-container">
                <div className="book-card">
                    <p>Error loading book</p>
                </div>
            </div>
        );
    }

    return (
        <div className="book-container">
            <div className="book-card">
                <div className="back-link">
                    <RouterLink to="/books" className="back-button">
                        <ArrowLeft size={16} />
                            See All Books
                    </RouterLink>
                </div>
                <div className="header-section">
                    <div className = "book-image-container">
                        <img 
                            src={book.image} 
                            alt={book.title} 
                            className="book-image"
                        />
                    </div>

                    <div className="book-info">
                        <div className="title-row">
                            <h1 className="book-title">
                                {book.title}
                            </h1>
                            <a href={book.link} target="_blank" rel="noopener noreferrer" className="website-button">
                                <Link size={20} />
                                Visit Book Website
                            </a>
                        </div>
                        
                        <div className="author-info">
                            <Building />
                            <span>{book.author}</span>
                        </div>

                        

                        <div className="book-badges">
                            <span className="badge"> <BookMarked size={16} /> Paperback</span>
                            <span className="badge"> <Calendar size={16} /> {book.publishDate}</span>
                            <span className="badge"><Tag size={16} /> {book.cat || "Parenting"}</span>
                        </div>
                        <p className="description-section">
                            <p className="description-body">
                                {isExpanded ? book.description : book.description.slice(0, 200) + "..."}
                            </p>
                            {book.description.length > 200 && (
                                <button className="see-more-button" onClick={() => setIsExpanded(!isExpanded)} >
                                    {isExpanded ? "See Less" : "See More"}
                                </button>
                            )}
                        </p>
                        
                    </div>
                </div>
                
                <div className="details-section">
                    <h2 className="section-title">Book Details</h2>
                    <div className="features-grid">
                        <FeatureCard 
                            icon={Calendar} 
                            label="Publish Date" 
                            value={book.publishDate}
                        />
                        <FeatureCard 
                            icon={BookOpen} 
                            label="Page Count" 
                            value={book.pageCount}
                        />
                        <FeatureCard 
                            icon={DollarSign} 
                            label="Listed Price" 
                            value={book.listPrice}
                        />
                        <FeatureCard 
                            icon={Tag} 
                            label="Category" 
                            value={book.cat}
                        />
                    </div>
                </div>

                
                
                {(relatedHousing || relatedChildcare) && (
                    <div className="related-resources-section">
                        <h2 className="section-title">Related Resources</h2>
                        <div className="cards-container" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {relatedHousing && (
                                <div style={{ width: '350px' }}>
                                    <HousingCard 
                                        image={relatedHousing.image}
                                        name={relatedHousing.name}
                                        cost={relatedHousing.cost}
                                        rating={relatedHousing.rating}
                                        HousingStyle={relatedHousing.housingStyle}
                                        Address={relatedHousing.address}
                                        website={relatedHousing.website}
                                        id={relatedHousing.id}                           
                                    />
                                </div>
                            )}
                            {relatedChildcare && (
                                <div style={{ width: '350px' }}>
                                    <ChildCard
                                        image={relatedChildcare.image_url}
                                        name={relatedChildcare.name}
                                        type={relatedChildcare.program_type}
                                        age_range={relatedChildcare.age_range}
                                        open_time={relatedChildcare.open_time}
                                        close_time={relatedChildcare.close_time}
                                        address={relatedChildcare.address}
                                        id={relatedChildcare.id}                           
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Individual_Book;