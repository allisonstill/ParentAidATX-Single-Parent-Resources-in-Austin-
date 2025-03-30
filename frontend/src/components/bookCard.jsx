import { Link } from "react-router-dom";
import "./bookCard.css";

function highlightText(text, query) {
  if (!query) return text;

  const str = String(text); // safely convert numbers/null/undefined to string
  const regex = new RegExp(`(${query})`, "gi");
  const parts = str.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? <mark key={index}>{part}</mark> : part
  );
}


function BookCard({ image, title, author, publishDate, description, pageCount, listPrice, cat, link, id, searchQuery}) {
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
        <h5 className="BookCard-title">{highlightText(title, searchQuery)}</h5>
        <p className="attribute-label">{highlightText("Author", searchQuery)}</p>
        <p className="BookCard-attributes">{highlightText(author, searchQuery)}</p>
        <p className="attribute-label">{highlightText("Date of Publication", searchQuery)}</p>
        <p className="BookCard-attributes">{highlightText(publishDate, searchQuery)}</p>
        <p className="attribute-label">{highlightText("Page Count", searchQuery)}</p>
        <p className="BookCard-attributes">{highlightText(pageCount, searchQuery)}</p>
        <p className="attribute-label">{highlightText("Listed Price", searchQuery)}</p>
        <p className="BookCard-attributes">{highlightText(listPrice, searchQuery)}</p>
        <p className="attribute-label">{highlightText("Category", searchQuery)}</p>
        <p className="BookCard-attributes">{highlightText(cat, searchQuery)}</p>
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
