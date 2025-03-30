import "./Childcare.css";
import "./Search.css";
import ChildCard from "../components/childCard";
import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination.jsx";
import { useSearchParams } from "react-router-dom";
import Fuse from "fuse.js"

const pageTitle = "Childcare Services";
const pageDescription = "Find affordable childcare services in the Austin area";

// for standardizing age format
const ageCategories = {
  Infant: { min: 0, max: 12 },
  Toddler: { min: 12, max: 24 },
  "2 Year Old": { min: 24, max: 36 },
  "3 Year Old": { min: 36, max: 48 },
  "4 Year Old": { min: 48, max: 60 },
  "5 Years Old and Up": { min: 60, max: Infinity },
};

function parseAgeRange(rangeStr) {
  const months = (str) => {
    if (str.includes("yr")) {
      return parseInt(str) * 12;
    } else if (str.includes("mo")) {
      return parseInt(str);
    }
    return null;
  };

  // Format: "Up to X yrs"
  if (/Up to/i.test(rangeStr)) {
    const match = rangeStr.match(/Up to (\d+)\s*yrs?/i);
    if (match) {
      return { min: 0, max: parseInt(match[1]) * 12 };
    }
  }

  // Format: "X mos - Y mos", "X mos - Y yrs", etc.
  const match = rangeStr.match(/(\d+)\s*(mos|yrs?)\s*-\s*(\d+)\s*(mos|yrs?)/i);
  if (match) {
    const [, minVal, minUnit, maxVal, maxUnit] = match;
    const min = minUnit.startsWith("yr") ? parseInt(minVal) * 12 : parseInt(minVal);
    const max = maxUnit.startsWith("yr") ? parseInt(maxVal) * 12 : parseInt(maxVal);
    return { min, max };
  }

  return { min: null, max: null }; // fallback
}

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
  const [selectedAgeCategory, setSelectedAgeCategory] = useState("");

  // Reset page to 1 when filters or search changes
  useEffect(() => {
    setSearchParams({ page: "1" });
  }, [searchQuery, filterType, filterOpensAt, filterClosesAt, sortByAddress, selectedAgeCategory]);


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

  // filter menu logic, and search bar logic

  // Define what data the search engine should search.
  // Note: we want want to be able to search all text, so include any attributes only visible on the instance page. 
  const daycaresSearchBlob = daycares.map((d) => ({
    ...d,
    _search_blob: `
      ${d.name}
      ${d.program_type}
      ${d.age_range}
      ${d.open_time}
      ${d.close_time}
      ${d.address}
      ${d.description || ""}
      Type Age Range Open Time Close Time Address
    `
  }));
  
  // Create the fuse object for the searching. 
  const fuse = new Fuse(daycaresSearchBlob, {
    keys: ["_search_blob"], // which attributes of your data objects it should search through
    threshold: 0.3, // fuzzy sensitivity
    ignoreLocation: true, // make it not required for the match to be in the same order or place in the text
    includeScore: true // return a relevance score
  });

  // perform the fuzzy search and order results by score
  const fuzzyResults = searchQuery
    ? fuse
        .search(searchQuery)
        .sort((a, b) => a.score - b.score) // lower score = more relevant
        .map(result => result.item)
    : daycares;

  // Apply filtering
  const filteredDaycares = fuzzyResults
    // filter by program type
    .filter((d) => (filterType ? d.program_type === filterType : true))

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

    // filter by age
    .filter((d) => {
      if (!selectedAgeCategory) return true;
    
      const daycareRange = parseAgeRange(d.age_range); // e.g., { min: 12, max: 36 }
      const filterRange = ageCategories[selectedAgeCategory]; // e.g., { min: 24, max: 36 }
    
      if (daycareRange.min == null || daycareRange.max == null) return false;
    
      // Check if the two ranges overlap
      return (
        daycareRange.max >= filterRange.min &&
        daycareRange.min <= filterRange.max
      );
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

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
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

                      <label>Age</label>
                        <select value={selectedAgeCategory} onChange={(e) => setSelectedAgeCategory(e.target.value)}>
                          <option value="">Any</option>
                          <option value="Infant">Infant</option>
                          <option value="Toddler">Toddler</option>
                          <option value="2 Year Old">2 Year Old</option>
                          <option value="3 Year Old">3 Year Old</option>
                          <option value="4 Year Old">4 Year Old</option>
                          <option value="5 Years Old and Up">5 Years Old and Up</option>
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

                      <label>Address</label>
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
                  placeholder="Search..."
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
              searchQuery={searchQuery}
            />
          </div>
        ))}
      </div>

      {/* Pagination Component */}
      {sortedDaycares.length > 0 && (
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
