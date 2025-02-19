import HousingCard from "../components/housingCard";
import "./Housing.css";


// Put data to go in cards here
const HousingCardData = [
    {   id: 1, 
        name: "Kensington Apartments", 
        cost: "",
        rating: "",
        HousingStyle: "",
        address: "",
        image: "https://rentpath-res.cloudinary.com/t_3x2_fixed_webp_xl/t_unpaid/e2335139f4a9f2257227377307f74af1"
    },
    {   id: 2, 
        name: "Salvation Army Social Services Center",
        cost: "",
        rating: "",
        HousingStyle: "",
        address: "",
        image: "https://lh3.googleusercontent.com/p/AF1QipMAAvugxD42xXAw5K-TPQM7RbRkxZRFJpZsfaqs=s1360-w1360-h1020"
    },
    {   id: 3, 
        name: "Pathways at North Loop Apartments",
        cost: "",
        rating: "",
        HousingStyle: "",
        address: "",
        image:  "https://www.hacanet.org/wp-content/uploads/2017/02/NorthLoop-06-1024x683.jpg"
       }
  ];
const pageTitle="Housing";
const pageDescription= "Find affordable housing in your area";
const cardData = HousingCardData;

function Housing(){
    return( 
        <div className="housing-page-container ">
            <h1 className="housing-page-title">{pageTitle}</h1>
            <p className="housing-page-description">{pageDescription}</p>
            <p className="housing-page-description">Showing 3/3 Instances</p>
        {/* NEW WRAPPER FOR CARDS */}
        <div className="cards-container">
            {cardData.map((currCard) => (
                <div key={currCard.id} style={{ width: "350px" }}> {/* Adjust width as needed */}
                < HousingCard
                    name={currCard.name} 
                    image={currCard.image}
                    id={currCard.id}
                    cost={currCard.cost}
                    rating={currCard.rating}
                    HousingStyle={currCard.HousingStyle}
                    Address={currCard.Address}
                />
                </div>
            ))}
        </div>
    </div>
);
}

export default Housing;