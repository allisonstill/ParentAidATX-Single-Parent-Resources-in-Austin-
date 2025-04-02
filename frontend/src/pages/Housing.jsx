import "./Housing.css";
import "./Search.css";
import HousingCard from "../components/housingCard";
import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination.jsx";
import { useSearchParams } from "react-router-dom";
import Fuse from "fuse.js";

const pageTitle = "Housing";
const pageDescription = "Find affordable housing in your area";
const AUSTIN_CENTRAL_ADDRESS = "300 W Cesar Chavez St, Austin, TX 78701";

const getDrivingDistance = async (destination) => {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(AUSTIN_CENTRAL_ADDRESS)}&destinations=${encodeURIComponent(destination)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.rows[0].elements[0].status === "OK") {
      let distanceText = data.rows[0].elements[0].distance.text; // e.g., "10 km" or "6.2 mi"

      // Extract the numeric value
      let distanceValue = parseFloat(distanceText.replace(/[^0-9.]/g, "")); // Removes non-numeric characters

      // Convert km to miles if necessary
      if (distanceText.includes("km")) {
        distanceValue *= 0.621371; // 1 km ≈ 0.621371 miles
      }

      return distanceValue; // Returns a number in miles
    }
    return null;
  } catch (error) {
    console.error("Error fetching distance:", error);
    return null;
  }
};

const parseZipCode = (addressStr) => {
  const zipMatch = addressStr.match(/TX (\d{5})/);
  return zipMatch ? parseInt(zipMatch[1], 10) : null;
};

function Housing() {
  const [allHousing, setHousing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // State for pagination
  const itemsPerPage = 3; // Display 3 housing cards per page
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // Phase 3
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortWay, setSortWay] = useState("asc");

  const [filterZipCode, setFilterZipCode] = useState(""); // Removed filterDistance
  const [zipCodes, setZipCodes] = useState("");
  const [filterRatingsRange, setFilterRatingsRange] = useState("");
  const [filterTotalRatings, setFilterTotalRatings] = useState("");

  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (prev.get("page") !== "1") {
        newParams.set("page", "1");
      }
      return newParams;
    });
  }, [searchQuery, sortBy, sortWay, filterZipCode, filterRatingsRange, filterTotalRatings]);

  // Fetch housing data
  useEffect(() => {
    const getHousing = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.parentaidatx.me/api/housing");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched housing data:", data); // Debugging

        const allZipCodes = new Set();
        const distancePromises = data.map(async (housing) => {
          if (housing.address) {
            const zipCode = parseZipCode(housing.address);
            if (zipCode) {
              allZipCodes.add(zipCode);
            }
            housing.zipCode = zipCode;
            housing.distance = await getDrivingDistance(housing.address); // This can still be retained for later if needed
          }
          return housing;
        });
        const updatedData = await Promise.all(distancePromises);
        setHousing(updatedData);
        setZipCodes(Array.from(allZipCodes).sort());

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

  // start of phase 3 - filtering and sorting
  let filteredHousing = [];
  try {
    const housingArray = Array.isArray(allHousing) ? allHousing : [];
    const housingWithSearchBlob = housingArray.map((housing) => ({
      ...housing,
      _search_blob: `
        ${housing.name}
        ${housing.address}
        ${housing.rating}
        ${housing.totalRatings}
        ${housing.phone_number}
        ${housing.website}
        ${housing.opening_hours}
        ${housing.zipCode}
        Address Phone Number Website Rating Total Ratings
      `
    }));

    const fuse = new Fuse(housingWithSearchBlob, {
      keys: ["_search_blob"],
      threshold: 0.3,
      ignoreLocation: true,
      includeScore: true
    });

    const fuzzyResults = searchQuery
      ? fuse.search(searchQuery).sort((a, b) => a.score - b.score).map(res => res.item)
      : housingWithSearchBlob;

    // Apply filtering
    filteredHousing = fuzzyResults
      // Removed filter by distance
      .filter((housing) => {
        if (!filterZipCode) return true;
        return housing.zipCode === filterZipCode;
      })
      // filter by ratings range
      .filter((housing) => {
        if (!filterRatingsRange) return true;
        return housing.rating >= filterRatingsRange;
      })
      // filter by total ratings
      .filter((housing) => {
        if (!filterTotalRatings) return true;
        return housing.totalRatings >= filterTotalRatings;
      });
  } catch (err) {
    console.log("ERROR - filtering (housing)");
    filteredHousing = [];
  }

  let sortedHousing = [...filteredHousing];
  try {
    if (sortBy) {
      sortedHousing.sort((first, second) => {
        let firstVal;
        let secondVal;
        switch (sortBy) {
          case 'name':
            firstVal = (first.name || '').toLowerCase();
            secondVal = (second.name || '').toLowerCase();
            break;
          case 'ratings':
            firstVal = first.rating;
            secondVal = second.rating;
            break;
          case 'totalRatings':
            firstVal = first.totalRatings;
            secondVal = second.totalRatings;
            break;
          default:
            return 0;
        }
        if (firstVal > secondVal) return sortWay === 'asc' ? 1 : -1;
        if (firstVal < secondVal) return sortWay === 'asc' ? -1 : 1;
        return 0;
      });
    }
  } catch (err) {
    console.log("ERROR - sort housing");
  }

  const pageCount = Math.ceil(sortedHousing.length / itemsPerPage);
  const offset = (currentPage - 1) * itemsPerPage;
  const currentHousingData = sortedHousing.slice(offset, offset + itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo(0, 0);
  };

  return (
    <div className="housing-page-container">
      <h1 className="housing-page-title">{pageTitle}</h1>
      <p className="housing-page-description">{pageDescription}</p>

      <div className="filters-search-container">
        <div className="filters-search-wrapper">
          <div className="filter-dropdown">
            <button className="filter-button" onClick={() => setFilterDropdown(!filterDropdown)}>
              Filter By ⏷
            </button>
            {filterDropdown && (
            <div className="filter-options">
              {/* Removed Distance Filter */}
                <label>Zip Code</label>
                <select value={filterZipCode} onChange={(e) => setFilterZipCode(e.target.value ? Number(e.target.value) : null)}>
                  <option value="">Any</option>
                    {zipCodes.map((zipCode, index) => (
                      <option key={index} value={zipCode}>
                        {zipCode}
                      </option>
                    ))}
                </select>
                
                <label>Ratings Range</label>
                <select value={filterRatingsRange} onChange={(e) => setFilterRatingsRange(e.target.value ? Number(e.target.value) : null)}>
                  <option value="">Any</option>
                  <option value="1">1+ star</option>
                  <option value="2">2+ stars</option>
                  <option value="3">3+ stars</option>
                  <option value="4">4+ stars</option>
                </select>

                <label>Total Ratings</label>
                <select value={filterTotalRatings} onChange={(e) => setFilterTotalRatings(e.target.value ? Number(e.target.value) : null)}>
                  <option value="">Any</option>
                  <option value="1">1 or more ratings</option>
                  <option value="50">50 or more ratings</option>
                  <option value="100">100 or more ratings</option>
                  <option value="200">200 or more ratings</option>
                </select>

                {/* Sorting! */}
                <label>Sort By</label>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="">No Sort</option>
                    <option value="name">Name</option>
                    <option value="ratings">Ratings</option>
                    <option value="totalRatings">Total Ratings</option>
                  </select>
                  <select value={sortWay} onChange={(e) => setSortWay(e.target.value)}>
                    <option value="asc">Ascending (A–Z)</option>
                    <option value="desc">Descending (Z–A)</option>
                  </select>
                </div>

                <button className="filter-done-button" onClick={() => setFilterDropdown(false)}>Done</button>
              </div>
            )}
          </div>
          <input
            type="text"
            className="search-box"
            placeholder="Search..."
            value={searchQuery}
            onChange={function (e) { setSearchQuery(e.target.value) }}
          />
        </div>
      </div>

      {loading ? (
        <p className="loading-message">Loading housing...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <p className="housing-page-description">
            Showing {currentHousingData.length} of {sortedHousing.length} housing options
          </p>

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

          {allHousing.length > itemsPerPage && (
            <Pagination
              totalPages={pageCount}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalItems={sortedHousing.length}
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
