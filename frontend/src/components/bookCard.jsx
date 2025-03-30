import { Link } from "react-router-dom";
import "./bookCard.css";

function highlight(text, searchQuery) {
  if (!searchQuery || !text) return text;

  //split tokens by whitespace
  const tokens = searchQuery.toLowerCase().split(/\s+/).filter(token => token.length > 0);
  if (tokens.length === 0) return text;

  const pattern = `(${tokens.join('|')})`;
  const regEx = new RegExp(pattern, "gi");

  const parts = text.toString().split(regEx);

  return parts.map((part, index) => 
    regEx.test(part) ? <mark key= {index}>{part}</mark> : part
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
        <h5 className="BookCard-title">{highlight(title, searchQuery)}</h5>
        <p className="attribute-label">Author</p>
        <p className="BookCard-attributes">{highlight(author, searchQuery)}</p>
        <p className="attribute-label">Date of Publication</p>
        <p className="BookCard-attributes">{highlight(publishDate, searchQuery)}</p>
        <p className="attribute-label">Page Count </p>
        <p className="BookCard-attributes">{highlight(pageCount, searchQuery)}</p>
        <p className="attribute-label">Listed Price </p>
        <p className="BookCard-attributes">{highlight(listPrice, searchQuery)}</p>
        <p className="attribute-label">Category </p>
        <p className="BookCard-attributes">{highlight(cat, searchQuery)}</p>
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
