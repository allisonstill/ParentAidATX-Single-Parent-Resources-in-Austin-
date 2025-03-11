import { Link } from "react-router-dom";
import "./childCard.css";


function ChildCard({ image, name, type, age_range, open_time, close_time, address, id}) {
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
        <p className="attribute-label">Type</p>
        <p className="ChildCard-attributes">{type}</p>
        <p className="attribute-label">Age Range</p>
        <p className="ChildCard-attributes">{age_range}</p>
        <p className="attribute-label">Open Time</p>
        <p className="ChildCard-attributes">{open_time}</p>
        <p className="attribute-label">Close Time</p>
        <p className="ChildCard-attributes">{close_time}</p>
        <p className="attribute-label">Address</p>
        <p className="ChildCard-attributes">{address}</p>
        {/*<p className="attribute-label">Website</p>
        <p className="ChildCard-attributes">{website}</p>*/}
        <Link to={`/childcare/${id}`} className="custom-btn" onClick={handleClick}>
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ChildCard;
