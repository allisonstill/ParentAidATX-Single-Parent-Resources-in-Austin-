import { Link } from 'react-router-dom';
import "./Pagination.css"

const Pagination = ({ totalPages, currentPage, onPageChange, totalItems, url }) => {
    const itemsPerPage = 3; // Ensure 3 items per page
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const generatePagination = () => {
        if (totalPages <= 1) return [];

        const pages = [];
        const maxVisiblePages = 2; // Number of pages to show around current page

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - maxVisiblePages && i <= currentPage + maxVisiblePages)) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== '...') {
                pages.push('...');
            }
        }
        return pages;
    };

    return (
        <div className="container text-center">
            <div className="row">
                <div className="d-flex justify-content-center my-4">
                    <nav>
                        <ul className="pagination">
                            {/* Previous Button */}
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <Link className="page-link" to={`${url}?page=${currentPage - 1}`} onClick={() => handlePageChange(currentPage - 1)}>
                                    Previous
                                </Link>
                            </li>

                            {/* Page Numbers with "..." */}
                            {generatePagination().map((page, index) => (
                                <li key={index} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                                    {page === '...' ? (
                                        <span className="page-link">...</span>
                                    ) : (
                                        <Link className="page-link" to={`${url}?page=${page}`} onClick={() => handlePageChange(page)}>
                                            {page}
                                        </Link>
                                    )}
                                </li>
                            ))}

                            {/* Next Button */}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <Link className="page-link" to={`${url}?page=${currentPage + 1}`} onClick={() => handlePageChange(currentPage + 1)}>
                                    Next
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="row">
                <h4 className="page-item">
                    Showing {startItem} - {endItem} of {totalItems}
                </h4>
            </div>
        </div>
    );
};

export default Pagination;
