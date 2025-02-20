import { Link } from "react-router-dom";
import "./housingCard.css";

function HousingCard({ image, name, cost, rating, HousingStyle, Address, id}) {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="HousingCard" style={{ width: "25rem" }}>
      <img
        src={image}
        className="HousingCard-img-top"
        alt=""
      />
      <div className="card-body">
        <h5 className="HousingCard-title">{name}</h5>
        <p className="attribute-label">Cost</p>
        <p className="HousingCard-attributes">{cost}</p>
        <p className="attribute-label">Rating</p>
        <p className="HousingCard-attributes">{rating}</p>
        <p className="attribute-label">Housing Style</p>
        <p className="HousingCard-attributes">{HousingStyle}</p>
        <p className="attribute-label">Address</p>
        <p className="HousingCard-attributes">{Address}</p>
        <Link to={`/housing/${id}`} className="custom-btn" onClick={handleClick}>
          View Details
        </Link>
      </div>
    </div>
  );
}

export default HousingCard;
