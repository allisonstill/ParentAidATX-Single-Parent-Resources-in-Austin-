import { Link } from "react-router-dom";
import "./housingCard.css";

// For highlighting text as it is searched
function highlightText(text, query) {
  if (!text) return "";  // fallback: don't try to run split on undefined/null
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.toString().split(regex);  // convert to string just in case

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? <mark key={index}>{part}</mark> : part
  );
}


function HousingCard({ name, address, rating, totalRatings, photo, phone_number, website, id, searchQuery}) {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="HousingCard" style={{ width: "25rem" }}>
      <img
        src={photo}
        className="HousingCard-img-top"
        alt={name}
      />
      
      <div className="card-body">
        <h5 className="HousingCard-title">{highlightText(name, searchQuery)}</h5>
        <p className="attribute-label">{highlightText("Address", searchQuery)}</p>
        <p className="HousingCard-attributes">{highlightText(address, searchQuery)}</p>
        <p className="attribute-label">{highlightText("Phone Number", searchQuery)}</p>
        <p className="HousingCard-attributes">{highlightText(phone_number, searchQuery)}</p>
        <p className="attribute-label">{highlightText("Website", searchQuery)}</p>
        <p className="HousingCard-attributes">
          <a href={website} target="_blank" rel="noopener noreferrer">
            <button className="housing-card-btn">{highlightText("Visit Website", searchQuery)}</button>
          </a>
        </p>
        <p className="attribute-label">{highlightText("Rating", searchQuery)}</p>
        <p className="HousingCard-attributes">{highlightText(rating, searchQuery)}</p>
        <p className="attribute-label">{highlightText("Total Ratings", searchQuery)}</p>
        <p className="HousingCard-attributes">{highlightText(totalRatings, searchQuery)}</p>
        <Link to={`/housing/${id}`} className="custom-btn" onClick={handleClick}>
          View Details
        </Link>
      </div>
    </div>
  );
}

export default HousingCard;
