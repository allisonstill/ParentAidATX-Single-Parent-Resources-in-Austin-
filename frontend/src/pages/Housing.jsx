import React, { useState, useEffect } from "react";
import HousingCard from "../components/housingCard";
import Pagination from "../components/Pagination.jsx";
import "./Housing.css";
import { useSearchParams } from "react-router-dom";


const pageTitle = "Housing";
const pageDescription = "Find affordable housing in your area";

function Housing() {
    const [allHousing, setHousing] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    // State for pagination
    const itemsPerPage = 3; // Display 3 housing cards per page
    const currentPage = parseInt(searchParams.get("page") || "1", 10);

    // Fetch books data from API
  useEffect(() => {
    const getHousing = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://flask-api-production-730f.up.railway.app/api/housing");
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched housing data:", data); // Debugging
        setHousing(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching housing:", error);
        setError("Failed to load housing. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getHousing();
  }, []);

    const pageCount = Math.ceil(allHousing.length / itemsPerPage);
    // Slice the HousingCardData based on the current page
    const offset = (currentPage - 1) * itemsPerPage;
    const currentHousingData = allHousing.slice(offset, offset + itemsPerPage);
    
    // Handle page change
    const handlePageChange = (page) => {
      setSearchParams({ page: page.toString() });
      // Scroll to top when changing pages
      window.scrollTo(0, 0);
    };
    
    return (
        <div className="housing-page-container">
            <h1 className="housing-page-title">{pageTitle}</h1>
            <p className="housing-page-description">{pageDescription}</p>

            {loading ? (
                <p className="loading-message">Loading housing...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <>
                    <p className="housing-page-description">
                        Showing {currentHousingData.length} of {allHousing.length} housing options
                    </p>

            {/* Wrapper for Housing Cards */}
            <div className="HousingCards-container">
                {currentHousingData.map((currCard) => (
                    <div key={currCard.id} style={{ width: "350px" }}>
                        <HousingCard
                            id={currCard.id}
                            name={currCard.name} 
                            photo={currCard.photo}
                            address={currCard.address}
                            phone_number={currCard.phone_number}
                            website={currCard.website}
                            rating={currCard.rating}
                            totalRatings={currCard.totalRatings}
                            
                        />
                    </div>
                ))}
            </div>

            {/* Pagination Component */}
            {allHousing.length > itemsPerPage && (
                <Pagination
                totalPages={pageCount}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                totalItems={allHousing.length}
                itemsPerPage={itemsPerPage}
                url="/housing"
                />
            )}
          </>
        )}
        </div>
    );
}
export default Housing;
