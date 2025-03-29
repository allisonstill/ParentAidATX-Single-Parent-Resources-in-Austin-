import { useState, useEffect } from "react";
import BookCard from "../components/bookCard";
import "./Books.css";
import "./Search.css";
import Pagination from "../components/Pagination.jsx";
import { useSearchParams } from "react-router-dom";

const parsePages = (pageCountStr) => {
  if (!pageCountStr) return 0;
  const pageString = String(pageCountStr);
  const findMatches = pageString.match(/\d+/);
  if (findMatches && findMatches[0]) {
    return parseInt(findMatches[0], 10);
  } else {
    return 0;
  }
};

const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  const priceString = String(priceStr);
  const findMatches = priceString.match(/\d+(\.\d+)?/);
  if (findMatches && findMatches[0]) {
    return parseFloat(findMatches[0]);
  } else {
    return 0;
  }
};

const getYear = (publishDateStr) => {
  if (!publishDateStr) return 0;
  const publishYear = String(publishDateStr).match(/\b(19|20)\d{2}\b/);
  if (publishYear) {
    return parseInt(publishYear[0], 10);
  } else {
    return 0;
  }
}

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Pagination state
  const itemsPerPage = 3; // Adjust as needed
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortWay, setSortWay] = useState("asc");

  const [categoryFilter, setCategoryFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [author, setAuthor] = useState("");
  const [minPage, setMinPage] = useState("");
  const [maxPage, setMaxPage] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");


  
  // Fetch books data from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.parentaidatx.me/api/books");
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched books data:", data); // Debugging
        setBooks(data || []);

        const allCategories = new Set();
        data.forEach(book => {
          if (book.cat) {
            allCategories.add(book.cat);
          }
        });
        setCategories(Array.from(allCategories).sort());

        setError(null);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to load books. Please try again later.");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  let filterBooks = [];
  try {
    const booksArray = Array.isArray(books) ? books : [];
    filterBooks = booksArray

      //category
      .filter(book => {
        if (!categoryFilter) return true;
        return book.cat === categoryFilter;
      })

      //author
      .filter(book => {
        if (!author) return true;
        return book.author && book.author.toLowerCase().includes(author.toLowerCase());
      })

      //page count
      .filter(book => {
        try {

          if (!minPage && !maxPage) return true;
          const pageCount = parsePages(book.pageCount);
          if (minPage && minPage.trim() !== "") {
            const trueMin = parseInt(minPage, 10);
            if (!isNaN(trueMin) && pageCount < trueMin) {
              return false;
            }
          }

          if (maxPage && maxPage.trim() !== "") {
            const trueMax = parseInt(maxPage, 10);
            if (!isNaN(trueMax) && pageCount > trueMax) {
              return false;
            }
          }

          return true;

        } catch (err) {
          console.log("ERROR - page count filter");
          return true;
        }
      })

      //price
      .filter(book => {
        try {

          if (!minPrice && !maxPrice) return true;
          const price = parsePrice(book.listPrice);
          if (minPrice && minPrice.trim() !== "") {
            const trueMinPrice = parseFloat(minPrice);
            if (!isNaN(trueMinPrice) && price < trueMinPrice) {
              return false;
            }
          }

          if (maxPrice && maxPrice.trim() !== "") {
            const trueMaxPrice = parseFloat(maxPrice);
            if (!isNaN(trueMaxPrice) && price > trueMaxPrice) {
              return false;
            }
          }

          return true;
        } catch (err) {
          console.log("ERROR - price filter");
          return true;
        }
      })

      //publish year
      .filter(book => {
        try {

          if (!minYear && !maxYear) return true;
          const bookPublishYear = getYear(book.publishDate);
          if (minYear && minYear.trim() !== "") {
            const trueMinYear = parseInt(minYear, 10);
            if (!isNaN(trueMinYear) && bookPublishYear < trueMinYear) {
              return false;
            }
          }

          if (maxYear && maxYear.trim() !== "") {
            const trueMaxYear = parseInt(maxYear, 10);
            if (!isNaN(trueMaxYear) && bookPublishYear > trueMaxYear) {
              return false;
            }
          }

          return true;
        } catch (err) {
          console.log("ERROR - publish year date");
          return true;
        }
      })

      .filter(book => {
        if (!searchQuery) return true;
        const searchText = `${book.title || ""}
                            ${book.author || ""}
                            ${book.cat || ""}
                            ${book.pageCount || ""}
                            ${book.listPrice || ""}
                            ${book.publishDate || ""}`.toLowerCase();
        return searchText.includes(searchQuery.toLowerCase());
      })

  } catch (err) {
    console.log("ERROR - filtering (books)");
    filterBooks = [];
  }

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

  const handleNumbers = (e, setter) => {
    const inputVal = e.target.value;
    if (inputVal === "" || /^\d+$/.test(value)) {
      setter(inputVal);
    }
  };

  return (
    <div className="books-page-container">
      <h1 className="books-page-title">Books</h1>
      <p className="books-page-description">Find many books and resources about single parenting.</p>
      
      {/* Filtering and Sorting Here!! */}
      <div className="filters-search-container">
          <div className="filters-search-wrapper">
              <div className="filter-dropdown">
                <button className = "filter-button" onClick = {() => setFilterDropdown(!filterDropdown)}>
                  Filter By
                </button>

                {filterDropdown && (
                  <div className = "filter-options">
                    <label>Category</label>
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                      <option value="">Any</option>
                      {allCategories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

              </div>
          </div>
      </div>





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