import { Link } from "react-router-dom";
import "./childCard.css";


function ChildCard({ image, name, type, rating, cost, Address, website, id}) {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="ChildCard" style={{ width: "25rem" }}>
      <img
        src={image}
        className="ChildCard-img-top"
        alt=""
      />
      <div className="card-body">
        <h5 className="ChildCard-title">{name}</h5>
        <p className="attribute-label">Cost</p>
        <p className="ChildCard-attributes">{cost}</p>
        <p className="attribute-label">Type</p>
        <p className="ChildCard-attributes">{type}</p>
        <p className="attribute-label">Rating</p>
        <p className="ChildCard-attributes">{rating}</p>
        <p className="attribute-label">Address</p>
        <p className="ChildCard-attributes">{Address}</p>
        <p className="attribute-label">Website</p>
        <p className="ChildCard-attributes">{website}</p>
        <Link to={`/housing/${id}`} className="custom-btn" onClick={handleClick}>
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ChildCard;
