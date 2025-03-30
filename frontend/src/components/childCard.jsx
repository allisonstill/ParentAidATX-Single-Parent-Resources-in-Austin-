import { Link } from "react-router-dom";
import "./childCard.css";

// For highlighting text as it is searched
function highlightText(text, query) {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? <mark key={index}>{part}</mark> : part
  );
}



function ChildCard({ image, name, type, age_range, open_time, close_time, address, id, searchQuery}) {
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
        <h5 className="ChildCard-title">{highlightText(name, searchQuery)}</h5>
        <p className="attribute-label">{highlightText("Type", searchQuery)}</p>
        <p className="ChildCard-attributes">{highlightText(type, searchQuery)}</p>
        <p className="attribute-label">{highlightText("Age Range", searchQuery)}</p>
        <p className="ChildCard-attributes">{highlightText(age_range, searchQuery)}</p>
        <p className="attribute-label">{highlightText("Open Time", searchQuery)}</p>
        <p className="ChildCard-attributes">{highlightText(open_time, searchQuery)}</p>
        <p className="attribute-label">{highlightText("Close Time", searchQuery)}</p>
        <p className="ChildCard-attributes">{highlightText(close_time, searchQuery)}</p>
        <p className="attribute-label">{highlightText("Address", searchQuery)}</p>
        <p className="ChildCard-attributes">{highlightText(address, searchQuery)}</p>
        <Link to={`/childcare/${id}`} className="custom-btn" onClick={handleClick}>
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ChildCard;
