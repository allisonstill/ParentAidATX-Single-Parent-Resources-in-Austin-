import "./Childcare.css";
import "./Search.css"
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

  // or sorting/filtering
  //const [searchQuery, setSearchQuery] = useState("");
  //const [sortBy, setSortBy] = useState(""); // e.g. "name", "program_type", etc.
  //const [sortOrder, setSortOrder] = useState("asc"); // or "desc"
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDropdown, setFilterDropdown] = useState(false);


  // Fetch data for childcare using API
  useEffect(() => {
    const fetchDaycares = async () => {
      try {
        const response = await fetch("https://api.parentaidatx.me/api/childcare");
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

      

      {/* PHASE THREE TODO */}
      <div className="filters-search-container">
          <div className="filters-search-wrapper">
              <div className="filter-dropdown">
                  <button className="filter-button" onClick={() => setFilterDropdown(!filterDropdown)}>
                      Filter By ⏷
                  </button>
                  {filterDropdown && (
                  <div className="filter-options">
                      <label>Distance (miles):</label>
                      <select>
                          <option value="">Any</option>
                          <option value="5">≤ 5 miles</option>
                          <option value="10">≤ 10 miles</option>
                          <option value="20">≤ 20 miles</option>
                          <option value="40">≤ 40 miles</option>
                          <option value="80">≤ 80 miles</option>
                          <option value="160">≤ 160 miles</option>
                      </select>
                      <label>Cost (per session):</label>
                      <select>
                          <option value="">Any</option>
                          <option value="40">≤ $40</option>
                          <option value="80">≤ $80</option>
                          <option value="160">≤ $160</option>
                          <option value="320">≤ $320</option>
                      </select>
                      <label>Availability:</label>
                      <select>
                          <option value="1">Available</option>
                          <option value="0">Unavailable</option>
                      </select>
                      <label>Session:</label>
                      <select>
                          <option value="2">Remote or In-Person</option>
                          <option value="0">Remote Only</option>
                          <option value="1">In-Person Only</option>
                      </select>
                  </div>)}
              </div>
              <input
                  type="text"
                  className="search-box"
                  placeholder="Search by name or speciality..."
                  value={searchQuery}
                  onChange={function(e) {setSearchQuery(e.target.value)}}
              />
          </div>
      </div>
      {/* END PHASE THREE TODO */}
      
      {loading ? (
        <p>Loading childcare...</p>
      ) : (
        <p className="child-page-description">
          Showing {displayedDaycares.length} of {daycares.length} daycares
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
