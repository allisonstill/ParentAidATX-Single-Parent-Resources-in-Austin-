import "./Childcare.css";
import ChildCard from "../components/childCard";
import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination.jsx";
import { useSearchParams } from "react-router-dom";

const pageTitle = "Childcare Services";
const pageDescription = "Find affordable childcare services in the Austin area";

function Childcare() {
  const [daycares, setDaycares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // Pagination state
  const itemsPerPage = 3; // Limit to 3 instances per page
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // Fetch data for childcare using API
  useEffect(() => {
    const fetchDaycares = async () => {
      try {
        const response = await fetch("https://flask-api-production-730f.up.railway.app/api/childcare");
        const data = await response.json();
        console.log("Fetched data:", data);
        setDaycares(data);
      } catch (error) {
        console.error("Error fetching daycares:", error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchDaycares();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(daycares.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedDaycares = daycares.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo(0, 0);
  };

  return (
    <div className="child-page-container">
      <h1 className="child-page-title">{pageTitle}</h1>
      <p className="child-page-description">{pageDescription}</p>

      {loading ? (
        <p>Loading childcare...</p>
      ) : (
        <p className="child-page-description">
          Showing {displayedDaycares.length} of {daycares.length} Instances
        </p>
      )}

      <div className="ChildCards-container">
        {displayedDaycares.map((daycare) => (
          <div key={daycare.id} style={{ width: "350px" }}>
            <ChildCard
              image={daycare.image_url}
              name={daycare.name}
              type={daycare.program_type}
              age_range={daycare.age_range}
              open_time={daycare.open_time}
              close_time={daycare.close_time}
              address={daycare.address}
              id={daycare.id}
            />
          </div>
        ))}
      </div>

      {/* Pagination Component */}
      {daycares.length > itemsPerPage && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalItems={daycares.length}
          itemsPerPage={itemsPerPage}
          url="/childcare"
        />
      )}
    </div>
  );
}

export default Childcare;
