import React, { useEffect, useState } from 'react';
import DeveloperVisualizationCard from '../components/DeveloperVisualizationCard';
import './Visualizations.css'

const pageTitle = "UTherapy Data Visualizations"
const pageDescription = "Explore key insights about therapy resources for students of the Austin area provided by UTherapy through data visualizations."

function DeveloperVisualizations() {
    const [loading, setLoading] = useState(true);
    const [therapists, setTherapists] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [disorders, setDisorders] = useState([]);

    const API_BASE_URL = "https://api.utherapy.me";

    useEffect(() => {
        const fetchAllData = async() => {
            try {
                setLoading(true);


                const therapistsResponse = await fetch("https://api.utherapy.me/api/therapists");
                if (!therapistsResponse.ok) console.log("ERROR in retrieving therapists for UTherapy visualizations.");
                const therapistsData = await therapistsResponse.json();
                setTherapists (therapistsData);

                const clinicsResponse = await fetch("https://api.utherapy.me/api/clinics");
                if (!clinicsResponse.ok) console.log("ERROR in retrieving clinics for UTherapy visualizations.");
                const clinicsData = await clinicsResponse.json();
                setClinics (clinicsData);

                const disordersResponse = await fetch("https://api.utherapy.me/api/disorders");
                if (!disordersResponse.ok) console.log("ERROR in retrieving disorders for UTherapy visualizations.");
                const disordersData = await disordersResponse.json();
                setDisorders (disordersData);


            } catch (error) {
                console.log("Error in getting data for UTherapy visualizations.")
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);

    return (
        <div className="visualizations-page-container">
            <h1 className="visualizations-page-title">{pageTitle}</h1>
            <p className="visualizations-page-description">{pageDescription}</p>

            { loading ? (
                <p className="loading-message">Loading visualizations...</p>
            ) : (
                <div className="visualizations-container">
                    <DeveloperVisualizationCard
                        title = "Therapists by Interaction Type"
                        description = "A pie chart distribution of the different 'interaction types' of therapists available: Online, In-Person, or Both."
                        dataType = "therapists"
                        data = {therapists}
                    />

                    <DeveloperVisualizationCard
                        title = "Clinic Ratings vs. Distance"
                        description = "A line chart comparing the average rating of clinics at a certain distance away from UT."
                        dataType = "clinics"
                        data = {clinics}
                    />

                    <DeveloperVisualizationCard
                        title = "Disorders by Category"
                        description = "A distribution of mental health disorders across sevearl categories, giving some indication as to what symptoms are commonly related to different disorders."
                        dataType = "disorders"
                        data = {disorders}
                    />
                </div>
            )}
        </div>
    );
}

export default DeveloperVisualizations;