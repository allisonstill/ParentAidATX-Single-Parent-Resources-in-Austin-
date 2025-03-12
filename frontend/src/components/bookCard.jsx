import { Link } from "react-router-dom";
import "./bookCard.css";

function BookCard({ image, title, author, publishDate, description, pageCount, listPrice, cat, link, id}) {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="BookCard" style={{ width: "25rem" }}>
      <img
        src={image}
        className="BookCard-img-top"
        alt={title}
      />
      <div className="card-body">
        <h5 className="BookCard-title">{title}</h5>
        {/*<p className="BookCard-text">{description}</p>*/} 
        <p className="attribute-label">Author</p>
        <p className="BookCard-attributes">{author}</p>
        <p className="attribute-label">Date of Publication</p>
        <p className="BookCard-attributes">{publishDate}</p>
        <p className="attribute-label">Page Count </p>
        <p className="BookCard-attributes">{pageCount}</p>
        <p className="attribute-label">Listed Price </p>
        <p className="BookCard-attributes">{listPrice}</p>
        <p className="attribute-label">Category </p>
        <p className="BookCard-attributes">{cat}</p>
        <div className = "buttons-group">
          <Link to={`/books/${id}`} className="custom-btn" onClick={handleClick}>
            View Details
          </Link>
          {/*
          <a href={link} target="_blank" rel="noopener noreferrer" className="custom-btn external-link">
            Visit Book Website
          </a>
          */}
        </div>
      </div>
    </div>
  );
}

export default BookCard;
