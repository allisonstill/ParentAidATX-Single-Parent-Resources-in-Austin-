import { Link } from "react-router-dom";
import "./programCard.css";

function ProgramCard({ image, name, IDnum, description, website, govtScope, govtAdmin, cat, id}) {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="ProgramCard" style={{ width: "25rem" }}>
      <img
        src={image}
        className="ProgramCard-img-top"
        alt=""
      />
      <div className="card-body">
        <h5 className="ProgramCard-title">{name}</h5>
        <p className="ProgramCard-text">{description}</p>
        <p className="attribute-label">ID Number</p>
        <p className="ProgramCard-attributes">{IDnum}</p>
        <p className="attribute-label">Website</p>
        <p className="ProgramCard-attributes">{website}</p>
        <p className="attribute-label">Government Scope </p>
        <p className="ProgramCard-attributes">{govtScope}</p>
        <p className="attribute-label">Government Admin </p>
        <p className="ProgramCard-attributes">{govtAdmin}</p>
        <p className="attribute-label">Category </p>
        <p className="ProgramCard-attributes">{cat}</p>
        <Link to={`/programs/${id}`} className="custom-btn" onClick={handleClick}>
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProgramCard;
