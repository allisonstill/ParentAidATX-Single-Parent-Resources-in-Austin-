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
    //const [relatedHousing, setRelatedHousing] = useState(null);
    //const [relatedChildcare, setRelatedChildcare] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.parentaidatx.me/api/books/${id}`);
                
                if (!response.ok) {
                    throw new Error("HTTP ERROR!");
                }
                
                const data = await response.json();
                setBook(data);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching book");
                setError("ERROR -- can't load book.");
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
                        <div className="description-section">
                            <p className="description-body">
                                {isExpanded ? book.description : book.description.slice(0, 200) + "..."}
                            </p>
                            {book.description && book.description.length > 200 && (
                                <button className="see-more-button" onClick={() => setIsExpanded(!isExpanded)} >
                                    {isExpanded ? "See Less" : "See More"}
                                </button>
                            )}
                        </div>
                        
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

                
                    <div className="related-resources-section">
                        <h2 className="section-title">Related Resources</h2>
                        <div className="cards-container" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {book.related_housing && (
                                <div style={{ width: '350px' }}>
                                    <HousingCard 
                                        photo={book.related_housing.photo}
                                        phone_number={book.related_housing.phone_number}
                                        name={book.related_housing.name}
                                        rating={book.related_housing.rating}
                                        address={book.related_housing.address}
                                        website={book.related_housing.website}
                                        id={book.related_housing.id}        
                                        totalRatings={book.related_housing.totalRatings}                   
                                    />
                                </div>
                            )}
                            {book.related_childcare && (
                                <div style={{ width: '350px' }}>
                                    <ChildCard
                                        image={book.related_childcare.image_url}
                                        name={book.related_childcare.name}
                                        type={book.related_childcare.program_type}
                                        age_range={book.related_childcare.age_range}
                                        open_time={book.related_childcare.open_time}
                                        close_time={book.related_childcare.close_time}
                                        address={book.related_childcare.address}
                                        id={book.related_childcare.id}                           
                                    />
                                </div>
                            )}
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default Individual_Book;