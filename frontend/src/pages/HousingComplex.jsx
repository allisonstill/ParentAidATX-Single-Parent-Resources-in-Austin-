import React, { useState } from 'react';
import { MapPin, Star, Building, Link, Shield, Clock, Landmark} from 'lucide-react';
import './HousingComplex.css';
import {useParams} from 'react-router-dom';
import ProgramCard from '../components/programCard';
import ChildCard from '../components/childCard';

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
            "website": "https://www.rainieratx.com/kensington-apartments",
            "related-resources": {
                "program": {
                    name: "Child Care Assistance Program (CCAP)",
                    image: "/cityofAustin.jpg",
                    description: "Child care assistance programs help families pay for child care so they can work, study, or train for jobs. These programs are funded by the federal government and may also be called vouchers, subsidies, or fee assistance. ",
                    id: 2,
                    website: "https://www.austintexas.gov/department/child-care/",
                    govtAdmin: "Texas Workforce Commission",
                    govtScope: "Texas",
                    cat: "Child care",
                    IDnum: 78700
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
            "website": "https://salvationarmyaustin.org/",
            "related-resources": {
                "program": {
                    name: "Supplemental Nutrition Assistance Program (SNAP)",
                    image: "/snap.jpg",
                    description: "SNAP provides food benefits to low-income families to supplement their grocery budget so they can afford the nutritious food essential to health and well-being.",
                    id: 3,
                    website: "https://www.fns.usda.gov/snap/supplemental-nutrition-assistance-program/",
                    govtAdmin: "US Department of Agriculture",
                    govtScope: "Texas",
                    cat: "Food",
                    IDnum: 78700
                },"childcare" : {
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
            "website": "https://www.pathwaysatnorthloop.org/brochure.aspx",
            "related-resources": {
                "program": {
                    name: "Temporary Assistance for Needy Families (TANF)",
                    image: "/TANF.png",
                    description: "The Temporary Assistance for Needy Families (TANF) program is designed to help families with children experiencing low-income achieve economic security and stability. ",
                    id: 1,
                    website: "https://yourtexasbenefits.com/Learn/Home/",
                    govtAdmin: "US Department of Health and Human Services",
                    govtScope: "Texas",
                    cat: "Food",
                    IDnum: 78750
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
                        <FeatureCard 
                            icon={Landmark}
                            label="Government Subsidized"
                            value={housingComplex.governmentSubsidized}
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
                            src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(housingComplex.address)}`}
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
                            <ProgramCard
                                name={housingComplex["related-resources"].program.name}
                                description={housingComplex["related-resources"].program.description}
                                image={housingComplex["related-resources"].program.image}
                                IDnum={housingComplex["related-resources"].program.IDnum}
                                website={housingComplex["related-resources"].program.website}
                                govtScope={housingComplex["related-resources"].program.govtScope}
                                govtAdmin={housingComplex["related-resources"].program.govtAdmin}
                                cat={housingComplex["related-resources"].program.cat}
                                id={housingComplex["related-resources"].program.id}
                            />
                    </div>
                    <div style={{ width: '350px' }}>
                           { <ChildCard
                                image={housingComplex["related-resources"].childcare.image}
                                name={housingComplex["related-resources"].childcare.name}
                                cost={housingComplex["related-resources"].childcare.cost}
                                rating={housingComplex["related-resources"].childcare.rating}
                                type={housingComplex["related-resources"].childcare.type}
                                Address={housingComplex["related-resources"].childcare.address}
                                website={housingComplex["related-resources"].childcare.website}
                                id={housingComplex["related-resources"].childcare.id}                           
                           />
                        }
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HousingComplex;