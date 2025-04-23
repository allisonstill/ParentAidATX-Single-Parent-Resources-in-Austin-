import React, { useEffect, useState } from 'react';
import VisualizationCard from '../components/VisualizationCard';
import './Visualizations.css'

const pageTitle = "Data Visualizations"
const pageDescription = "Explore key insights about our resources for single-parent families in Austin through interactive visualizations."

function Visualizations() {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const [childcare, setChildcare] = useState([]);
    const [housing, setHousing] = useState([]);

    useEffect(() => {
        const fetchAllData = async() => {
            try {
                setLoading(true);
                const booksResponse = await fetch("https://api.parentaidatx.me/api/books");
                if (!booksResponse.ok) console.log("ERROR in retrieving books for visualizations.");
                const booksData = await booksResponse.json();
                setBooks (booksData);

                const childcareResponse = await fetch("https://api.parentaidatx.me/api/childcare");
                if (!childcareResponse.ok) console.log("ERROR in retrieving childcare for visualizations.");
                const childcareData = await childcareResponse.json();
                setChildcare (childcareData);

                const housingResponse = await fetch("https://api.parentaidatx.me/api/housing");
                if (!housingResponse.ok) console.log("ERROR in retrieving housing for visualizations.");
                const housingData = await housingResponse.json();
                setHousing (housingData);
            } catch (error) {
                console.log("Error in getting data for visualizations.")
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
                    <VisualizationCard
                        title = "Publication Timeline of Books"
                        description = "Distribution of books of parenting resources by year of publication"
                        dataType = "books"
                        data = {books}
                    />

                    <VisualizationCard
                        title = "Childcare Operating Hours"
                        description = "Distribution of operating hours of childcare centers, allowing parents to find childcare services that meet their needs."
                        dataType = "childcare"
                        data = {childcare}
                    />

                    <VisualizationCard
                        title = "Housing Ratings Distribution"
                        description = "Distribution of housing options available depending on average quality rating of housing."
                        dataType = "housing"
                        data = {housing}
                    />
                </div>
            )}
        </div>
    );
}

export default Visualizations;