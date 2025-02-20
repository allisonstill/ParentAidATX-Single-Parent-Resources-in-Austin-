import React from 'react';
import {Building, Navigation, Shield, Users, Link, Play } from 'lucide-react';
import './Government.css';
import {useParams} from 'react-router-dom';
import HousingCard from '../components/housingCard'
import ChildCard from '../components/childCard';

const Government_Program = () => {
    const { id } = useParams();

    const programs = {
        1: {
            "program-id": 78750,
            "program-name": "Temporary Assistance for Needy Families (TANF)",
            "government-admin": "US Department of Health and Human Services",
            "government-scope": "Texas",
            "category": "Food",
            "description": "The Temporary Assistance for Needy Families (TANF) program is designed to help families with children experiencing low-income achieve economic security and stability. ",
            "app-link": "https://yourtexasbenefits.com/Learn/Home/",
            "logo": "/TANF.png",
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
            "program-id": 78700,
            "program-name": "Child Care Assistance Program (CCAP)",
            "government-admin": "Texas Workforce Commission",
            "government-scope": "Texas",
            "category": "Child care",
            "description": "Child care assistance programs help families pay for child care so they can work, study, or train for jobs. These programs are funded by the federal government and may also be called vouchers, subsidies, or fee assistance. ",
            "app-link": "https://www.austintexas.gov/department/child-care/",
            "logo": "/cityofAustin.jpg",
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
            "program-id": 78700,
            "program-name": "Supplemental Nutrition Assistance Program (SNAP)",
            "government-admin": "US Department of Agriculture",
            "government-scope": "Texas",
            "category": "Food",
            "description": "SNAP provides food benefits to low-income families to supplement their grocery budget so they can afford the nutritious food essential to health and well-being.",
            "app-link": "https://www.fns.usda.gov/snap/supplemental-nutrition-assistance-program/",
            "logo": "/snap.jpg",
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
    const program = programs[id];

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
        <div className="program-container">
            <div className="program-card">
                <div className="header-section">
                    <img 
                        src={program.logo} 
                        alt={program["program-name"]} 
                        className="program-logo"
                    />
                    <div className="program-info">
                        <h1 className="program-title">
                            {program["program-name"]}
                        </h1>
                        <div className="admin-info">
                            <Building />
                            <span>{program["government-admin"]}</span>
                        </div>
                        <p className="program-description">
                            {program.description}
                        </p>
                        <a 
                            href={program["app-link"]} 
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
                        icon={Shield} 
                        label="Program Category" 
                        value={program.category}
                    />
                    <FeatureCard 
                        icon={Navigation} 
                        label="Scope" 
                        value={program["government-scope"]}
                    />
                    <FeatureCard 
                        icon={Users} 
                        label="Administering Agency" 
                        value={program["government-admin"]}
                    />
                </div>
                <div className="video-section">
                    <h2 className = "section-title">Watch this video!</h2>
                    <div className="video-container">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${program["video"]}`}
                            title={`${program["program-name"]} Overview`}
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
                                image={program["related-resources"].housing.image}
                                name={program["related-resources"].housing.name}
                                cost={program["related-resources"].housing.cost}
                                rating={program["related-resources"].housing.rating}
                                HousingStyle={program["related-resources"].housing.housingStyle}
                                Address={program["related-resources"].housing.address}
                                website={program["related-resources"].housing.website}
                                id={program["related-resources"].housing.id}                           
                           />
                        }
                        </div>
                        <div style={{ width: '350px' }}>
                           { <ChildCard
                                image={program["related-resources"].childcare.image}
                                name={program["related-resources"].childcare.name}
                                cost={program["related-resources"].childcare.cost}
                                rating={program["related-resources"].childcare.rating}
                                type={program["related-resources"].childcare.type}
                                Address={program["related-resources"].childcare.address}
                                website={program["related-resources"].childcare.website}
                                id={program["related-resources"].childcare.id}                           
                           />
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Government_Program;



