import { useState, useEffect } from "react";
import BookCard from "../components/bookCard";
import "./Books.css";
import Pagination from "../components/Pagination.jsx";
import { useSearchParams } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Pagination state
  const itemsPerPage = 6; // Adjust as needed
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  
  // Fetch books data from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://flask-api-production-730f.up.railway.app/api/books");
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched books data:", data); // Debugging
        setBooks(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedBooks = books.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() });
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
  };

  return (
    <div className="books-page-container">
      <h1 className="books-page-title">Books about Single Parenting</h1>
      <p className="books-page-description">Find many books and resources about single parenting.</p>
      
      {loading ? (
        <p className="loading-message">Loading books...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <p className="books-page-description">
            Showing {displayedBooks.length} of {books.length} Books
          </p>
          
          {/* Book Cards Container */}
          <div className="BookCards-container">
            {displayedBooks.map((book) => (
              <div key={book.id} style={{ width: "350px" }}>
                <BookCard
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  publishDate={book.publishDate}
                  pageCount={book.pageCount}
                  listPrice={book.listPrice}
                  description={book.description}
                  cat={book.cat}
                  link={book.link}
                  image={book.image}
                />
              </div>
            ))}
          </div>
          
          {/* Pagination Component */}
          {books.length > itemsPerPage && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalItems={books.length}
              itemsPerPage={itemsPerPage}
              url="/books"
            />
          )}
        </>
      )}
    </div>
  );
}

export default Books;