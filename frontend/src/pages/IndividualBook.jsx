import React from 'react';
import {BookOpen, Calendar, DollarSign, BookMarked, Tag, ExternalLink, MessageSquare, Award, Heart, Building, Navigation, Shield, Users, Link, Play } from 'lucide-react';
import './IndividualBook.css';
import {useParams} from 'react-router-dom';
import HousingCard from '../components/housingCard'
import ChildCard from '../components/childCard';

const Individual_Book = () => {
    const { id } = useParams();

    const books = {
        1: {
            "title": "Book 1",
            "author": "Author 1",
            "publishDate": "January 1, 2022",
            "pageCount": "100",
            "listPrice": "$10.00",
            "description": "Book about single parenting",
            "cat": "Housing",
            "link": "https://novapublishers.com/shop/single-parenting-in-the-21st-century-perceptions-issues-and-implications/",
            "image": "https://novapublishers.com/wp-content/uploads/2018/09/9781536132779-e1537696463162.jpg",
            "video": "-NGi5crTYPs",
            "related-resources": {
                "housing": {
                    name: "Pathways at North Loop Apartments",
                    image: "https://www.hacanet.org/wp-content/uploads/2017/02/NorthLoop-06-1024x683.jpg",
                    cost: "$1000-1100",
                    rating: "3.3",
                    housingStyle: "Apartments",
                    address: "2300 W N Loop Blvd #101, Austin, TX 78756",
                    website: "https://www.pathwaysatnorthloop.org/",
                    id: 3
                }, "childcare" : {
                    name: "Lil' Angels Daycare Center",
                    image: "https://winnie.imgix.net/b175c141-f134-45ce-9689-4769f254fa65?w=242&h=124&dpr=3&fit=crop&auto=compress",
                    cost: "$0",
                    rating: "4.9",
                    type: "Daycare",
                    address: "6006 Cameron Rd, Austin, TX 78723",
                    website: "http://lilangelsaustin.com/",
                    id: 3
                }
            }
        },
        2: {
           "title": "Book 2",
            "author": "Author 2",
            "publishDate": "January 2, 2022",
            "pageCount": "200",
            "listPrice": "$20.00",
            "description": "Book about single parenting 2",
            "cat": "Food",
            "link": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FSingle-Parent-Confident-Successful%2Fdp%2F0764232843&psig=AOvVaw2HRvHUEpjhpKlo2-I_vjaX&ust=1741721448851000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDCvpqggIwDFQAAAAAdAAAAABAI",
            "image": "https://m.media-amazon.com/images/I/81jHqwFaL5L._AC_UF1000,1000_QL80_.jpg",
            "video": "W8j0TZbnXL0",
            "related-resources": {
                "housing": {
                    name: "Kensington Apartments",
                    image: "https://rentpath-res.cloudinary.com/t_3x2_fixed_webp_xl/t_unpaid/e2335139f4a9f2257227377307f74af1",
                    cost: "$900-1300",
                    rating: "3.9",
                    housingStyle: "Apartments",
                    address: "2202 W N Loop Blvd, Austin, TX 78756",
                    website: "https://www.rainieratx.com/kensington-apartments",
                    id: 1
                },"childcare" : {
                    name: "First English Lutheran Child Development Center",
                    image: "https://images.squarespace-cdn.com/content/v1/659d9f977b7a4100052c42be/1704828826252-OLIWM0453MDOXDWKZAOY/FELCDC_Food.png",
                    cost: "$0",
                    rating: "5.0",
                    type: "Daycare",
                    address: "3001 Whitis Ave, Austin, TX",
                    website: "https://www.firstenglishcdc.org/",
                    id: 2
                }
            }
        },
        3: {
            "title": "Book 3",
            "author": "Author 3",
            "publishDate": "January 3, 2022",
            "pageCount": "300",
            "listPrice": "$30.00",
            "description": "Book about single parenting 3",
            "cat": "Childcare",
            "link": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.abebooks.com%2F9781565078604%2FSuccessful-Single-Parenting-Richmond-Gary-1565078608%2Fplp&psig=AOvVaw2HRvHUEpjhpKlo2-I_vjaX&ust=1741721448851000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDCvpqggIwDFQAAAAAdAAAAABAN",
            "image": "https://pictures.abebooks.com/isbn/9781565078604-us.jpg",
            "video": "ogvnpefvvbE",
            "related-resources": {
                "housing": {
                    name: "Salvation Army Social Services Center",
                    image: "https://lh3.googleusercontent.com/p/AF1QipMAAvugxD42xXAw5K-TPQM7RbRkxZRFJpZsfaqs=s1360-w1360-h1020",
                    cost: "$0",
                    rating: "3.8",
                    housingStyle: "Shelter",
                    address: "4613 Tannehill Ln Bldg 1, Austin, TX 78721",
                    website: "https://salvationarmyaustin.org/",
                    id: 2
                },"childcare" : {
                    name: "Child Craft Schools",
                    image: "https://childcraftschooltx.com/uploads/1/2/3/5/123531586/published/image_6.png?1546248481",
                    cost: "$850-1050",
                    rating: "5.0",
                    type: "Daycare",
                    address: "800 W 30th St, Austin, TX",
                    website: "https://www.childcraftschooltx.com/index.html",
                    id: 1
                }
            }

        }
    };
    const book = books[id];

    const FeatureCard = ({ icon: Icon, label, value }) => (
        <div className="feature-card">
            <Icon className="feature-icon" />
            <div className="feature-content">
                <p className="feature-label">{label}</p>
                <p className="feature-value">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="book-container">
            <div className="book-card">
                <div className="header-section">
                    <img 
                        src={book.image} 
                        alt={book["title"]} 
                        className="book-image"
                    />
                    <div className="book-info">
                        <h1 className="book-title">
                            {book["title"]}
                        </h1>
                        <div className="author-info">
                            <Building />
                            <span>{book["author"]}</span>
                        </div>
                        <p className="book-description">
                            {book.description}
                        </p>
                        <a 
                            href={book["link"]} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="website-button"
                        >
                            <Link size={20} />
                            Visit Official Book Link
                        </a>
                        
                    </div>
                    <div className="book-badges">
                        <span className="badge"><BookMarked size={16} /> Paperback</span>
                        <span className="badge"><Calendar size={16} /> {book.publishDate}</span>
                        <span className="badge"><Users size={16} /> Family Resources</span>
                    </div>
                </div>

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
                <div className="video-section">
                    <h2 className = "section-title">Watch this video!</h2>
                    <div className="video-container">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${book["video"]}`}
                            title={`${book["title"]} Overview`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

                <div className="related-resources-section">
                    <h2 className="section-title">Related Resources</h2>
                    <div className="cards-container" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div style={{ width: '350px' }}>
                           { <HousingCard 
                                image={book["related-resources"].housing.image}
                                name={book["related-resources"].housing.name}
                                cost={book["related-resources"].housing.cost}
                                rating={book["related-resources"].housing.rating}
                                HousingStyle={book["related-resources"].housing.housingStyle}
                                Address={book["related-resources"].housing.address}
                                website={book["related-resources"].housing.website}
                                id={book["related-resources"].housing.id}                           
                           />
                        }
                        </div>
                        <div style={{ width: '350px' }}>
                           { <ChildCard
                                image={book["related-resources"].childcare.image}
                                name={book["related-resources"].childcare.name}
                                cost={book["related-resources"].childcare.cost}
                                rating={book["related-resources"].childcare.rating}
                                type={book["related-resources"].childcare.type}
                                Address={book["related-resources"].childcare.address}
                                website={book["related-resources"].childcare.website}
                                id={book["related-resources"].childcare.id}                           
                           />
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Individual_Book;



