import React, { useState } from "react";
import HousingCard from "../components/housingCard";
import ReactPaginate from "react-paginate";
import "./Housing.css";

// Housing Card Data
const HousingCardData = [
    {   
        id: 1, 
        name: "Kensington Apartments", 
        cost: "900-1300",
        rating: "3.9",
        HousingStyle: "Apartments",
        Address: "2202 W N Loop Blvd, Austin, TX 78756",
        website: "https://www.rainieratx.com/kensington-apartments",
        image: "https://rentpath-res.cloudinary.com/t_3x2_fixed_webp_xl/t_unpaid/e2335139f4a9f2257227377307f74af1"
    },
    {   
        id: 2, 
        name: "Salvation Army Social Services Center",
        cost: "0",
        rating: "3.8",
        HousingStyle: "Shelter",
        Address: "4613 Tannehill Ln Bldg 1, Austin, TX 78721",
        website: "https://salvationarmyaustin.org/",
        image: "https://lh3.googleusercontent.com/p/AF1QipMAAvugxD42xXAw5K-TPQM7RbRkxZRFJpZsfaqs=s1360-w1360-h1020"
    },
    {   
        id: 3, 
        name: "Pathways at North Loop Apartments",
        cost: "1000-1100",
        rating: "3.3",
        HousingStyle: "Apartments",
        Address: "2300 W N Loop Blvd #101, Austin, TX 78756",
        website: "https://www.pathwaysatnorthloop.org/brochure.aspx",
        image:  "https://www.hacanet.org/wp-content/uploads/2017/02/NorthLoop-06-1024x683.jpg"
    }
];

const pageTitle = "Housing";
const pageDescription = "Find affordable housing in your area";

function Housing() {
    // State for pagination
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3; // Display 3 housing cards per page

    // Slice the HousingCardData based on the current page
    const offset = currentPage * itemsPerPage;
    const currentHousingData = HousingCardData.slice(offset, offset + itemsPerPage);
    
    // Calculate the total page count
    const pageCount = Math.ceil(HousingCardData.length / itemsPerPage);

    // Handle page click
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="housing-page-container">
            <h1 className="housing-page-title">{pageTitle}</h1>
            <p className="housing-page-description">{pageDescription}</p>
            <p className="housing-page-description">
                Showing {offset + 1} - {offset + itemsPerPage <= HousingCardData.length ? offset + itemsPerPage : HousingCardData.length} of {HousingCardData.length} Instances
            </p>

            {/* Wrapper for Housing Cards */}
            <div className="HousingCards-container">
                {currentHousingData.map((currCard) => (
                    <div key={currCard.id} style={{ width: "350px" }}>
                        <HousingCard
                            name={currCard.name} 
                            image={currCard.image}
                            id={currCard.id}
                            cost={currCard.cost}
                            rating={currCard.rating}
                            HousingStyle={currCard.HousingStyle}
                            Address={currCard.Address}
                            website={currCard.website}
                        />
                    </div>
                ))}
            </div>

            {/* Pagination Component */}
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount} // Total number of pages
                marginPagesDisplayed={2} // How many pages to show at the beginning and end
                pageRangeDisplayed={3} // How many pages to show around the current page
                onPageChange={handlePageClick} // What happens when a page is clicked
                containerClassName={"pagination"} // CSS class for the pagination container
                pageClassName={"page-item"} // CSS class for each page element
                pageLinkClassName={"page-link"} // CSS class for each page link
                previousClassName={"page-item"} // CSS class for the "previous" button
                previousLinkClassName={"page-link"} // CSS class for the "previous" link
                nextClassName={"page-item"} // CSS class for the "next" button
                nextLinkClassName={"page-link"} // CSS class for the "next" link
                breakLinkClassName={"page-link"} // CSS class for the break link
                activeClassName={"active"} // CSS class for the active page
                disabledClassName={"disabled"} // CSS class for disabled elements
            />
        </div>
    );
}

export default Housing;
