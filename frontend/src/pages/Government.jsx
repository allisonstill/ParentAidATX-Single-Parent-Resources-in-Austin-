import React from 'react';
import {Building, Navigation, Shield, Users, Link, Play } from 'lucide-react';
import './Government.css';
import {useParams} from 'react-router-dom';

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
            "logo": "../TANF.png",
            "video": "-NGi5crTYPs",
        },
        2: {
            "program-id": 78700,
            "program-name": "Child Care Assistance Program (CCAP)",
            "government-admin": "Texas Workforce Commission",
            "government-scope": "Texas",
            "category": "Child care",
            "description": "Child care assistance programs help families pay for child care so they can work, study, or train for jobs. These programs are funded by the federal government and may also be called vouchers, subsidies, or fee assistance. ",
            "app-link": "https://www.austintexas.gov/department/child-care/",
            "logo": "../cityofAustin.jpg",
            "video": "W8j0TZbnXL0",
        },
        3: {
            "program-id": 78700,
            "program-name": "Supplemental Nutrition Assistance Program (SNAP)",
            "government-admin": "US Department of Agriculture",
            "government-scope": "Texas",
            "category": "Food",
            "description": "SNAP provides food benefits to low-income families to supplement their grocery budget so they can afford the nutritious food essential to health and well-being.",
            "app-link": "https://www.fns.usda.gov/snap/supplemental-nutrition-assistance-program/",
            "logo": "../snap.jpg",
            "video": "ogvnpefvvbE",
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
            </div>
        </div>
    );
};

export default Government_Program;