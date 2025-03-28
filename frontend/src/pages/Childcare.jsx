import "./Childcare.css";
import "./Search.css"
import ChildCard from "../components/childCard";
import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination.jsx";
import { useSearchParams } from "react-router-dom";

const pageTitle = "Childcare Services";
const pageDescription = "Find affordable childcare services in the Austin area";
// for ages

// For converting time to handle filtering
function to24HourFormat(timeStr) {
  // Example: "7:00am" → "07:00", "9:30am" → "09:30", "12:00pm" → "12:00"
  const [time, modifier] = timeStr.toLowerCase().split(/(am|pm)/);
  let [hours, minutes] = time.split(":").map((t) => parseInt(t));

  if (modifier === "pm" && hours !== 12) {
    hours += 12;
  }
  if (modifier === "am" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}


function Childcare() {
  const [daycares, setDaycares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  

  // states for pagination and filtering and querying
  const itemsPerPage = 3; // Limit to 3 instances per page
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [filterOpensAt, setFilterOpensAt] = useState("");
  const [filterClosesAt, setFilterClosesAt] = useState("");
  const [sortByAddress, setSortByAddress] = useState("");

  // add more...
  // Reset page to 1 when filters/search change
  useEffect(() => {
    setSearchParams({ page: "1" });
  }, [searchQuery, filterType, filterOpensAt, filterClosesAt]);


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

  // Calculate pagination, filter menu logic, and search bar logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  const filteredDaycares = daycares
    // searching logic
    .filter((d) =>
      (d.name + d.program_type + d.age_range  + d.open_time + d.close_time + d.address)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    // filter by program type
    .filter((d) => (filterType ? d.program_type === filterType : true))
    // TODO: filter by age

    // filter by open time
    .filter((d) => {
      if (!filterOpensAt) return true;
      const daycareTime = to24HourFormat(d.open_time);
      return daycareTime <= filterOpensAt;
    })

    // filter by close time
    .filter((d) => {
      if (!filterClosesAt) return true;
      const daycareCloseTime = to24HourFormat(d.close_time);
      return daycareCloseTime <= filterClosesAt;
    })
  ;
  
  // sorting (must sort after filtering, but before pagination!)
  function getStreetName(address) {
    // Assumes format: "10601 Bluff Bend Dr Austin, TX"
    // Returns: "Bluff Bend Dr Austin, TX"
    const parts = address.trim().split(" ");
    if (parts.length < 2) return address; // fallback
    return parts.slice(1).join(" ").toLowerCase();
  }
  
  const sortedDaycares = [...filteredDaycares].sort((a, b) => {
    if (!sortByAddress) return 0;
    const aVal = getStreetName(a.address.toLowerCase());
    const bVal = getStreetName(b.address.toLowerCase());
  
    if (aVal < bVal) return sortByAddress === "asc" ? -1 : 1;
    if (aVal > bVal) return sortByAddress === "asc" ? 1 : -1;
    return 0;
  });
  

  const totalPages = Math.ceil(sortedDaycares.length / itemsPerPage);
  const displayedDaycares = sortedDaycares.slice(startIndex, startIndex + itemsPerPage);


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
                      <label>Type</label>
                      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option value="">Any</option>
                        <option value="Arts">Arts</option>
                        <option value="Outdoor Nature">Outdoor Nature</option>
                        <option value="Reggio Emilia">Reggio Emilia</option>
                        <option value="Technology">Technology</option>
                        <option value="Play Based">Play Based</option>
                        <option value="Religious">Religious</option>
                        <option value="Montessori">Montessori</option>
                        <option value="Language Immersion">Language Immersion</option>
                        <option value="Waldorf">Waldorf</option>
                      </select>

                      <label>Age Range</label>
                      <select>
                          <option value="">Any</option>
                      </select>

                      <label>Opens at</label>
                        <select value={filterOpensAt} onChange={(e) => setFilterOpensAt(e.target.value)}>
                          <option value="">Any</option>
                          <option value="06:00">6 am or earlier</option>
                          <option value="07:00">7 am or earlier</option>
                          <option value="08:00">8 am or earlier</option>
                          <option value="09:00">9 am or earlier</option>
                      </select>

                      <label>Closes at</label>
                      <select value={filterClosesAt} onChange={(e) => setFilterClosesAt(e.target.value)}>
                        <option value="">Any</option>
                        <option value="17:00">5 pm or earlier</option>
                        <option value="18:00">6 pm or earlier</option>
                        <option value="19:00">7 pm or earlier</option>
                        <option value="20:00">8 pm or earlier</option>
                      </select>

                      <label>Sort by Address</label>
                      <select value={sortByAddress} onChange={(e) => setSortByAddress(e.target.value)}>
                        <option value="">None</option>
                        <option value="asc">Ascending (A–Z)</option>
                        <option value="desc">Descending (Z–A)</option>
                      </select>



                      
                      <button className="filter-done-button" onClick={() => setFilterDropdown(false)}>Done</button>
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
          Showing {displayedDaycares.length} of {filteredDaycares.length} daycares
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
          totalItems={filteredDaycares.length}
          itemsPerPage={itemsPerPage}
          url="/childcare"
        />
      )}
    </div>
  );
}

export default Childcare;
