import { Link } from "react-router-dom";
import "./housingCard.css";


function HousingCard({ name, address, rating, totalRatings, photo, phone_number, website, id}) {
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
        <h5 className="HousingCard-title">{name}</h5>
        <p className="attribute-label">Address</p>
        <p className="HousingCard-attributes">{address}</p>
        <p className="attribute-label">Phone Number</p>
        <p className="HousingCard-attributes">{phone_number}</p>
        <p className="attribute-label">Website</p>
        <p className="HousingCard-attributes">{website}</p>
        <p className="attribute-label">Rating</p>
        <p className="HousingCard-attributes">{rating}</p>
        <p className="attribute-label">Total Ratings</p>
        <p className="HousingCard-attributes">{totalRatings}</p>
        <Link to={`/housing/${id}`} className="custom-btn" onClick={handleClick}>
          View Details
        </Link>
      </div>
    </div>
  );
}

export default HousingCard;
