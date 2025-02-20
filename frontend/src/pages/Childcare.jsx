import "./Childcare.css";
import ChildCard from "../components/childCard";

// Put data to go in cards here
const childcareCardData = [
  {   id: 1,
      name: "Child Craft Schools", 
      type: "Daycare",
      cost: "850-1050",
      rating: "5.0",
      Address: "800 W 30th St, Austin, TX 78705",
      website: "https://www.childcraftschooltx.com/index.html",
      image: "https://childcraftschooltx.com/uploads/1/2/3/5/123531586/published/image_6.png?1546248481"
  },
  {   id: 2, 
      name: "First English Lutheran Child Development Center",
      type: "Daycare",
      cost: "N/A",
      rating: "5.0",
      Address: "3001 Whitis Ave, Austin, TX 78705",
      website: "https://www.firstenglishcdc.org/",
      image: "https://images.squarespace-cdn.com/content/v1/659d9f977b7a4100052c42be/1704828826252-OLIWM0453MDOXDWKZAOY/FELCDC_Food.png"
  },
  {   id: 3, 
      name: "Lil' Angels Daycare Center",
      type: "Daycare",
      cost: "N/A",
      rating: "4.9",
      Address: "6006 Cameron Rd, Austin, TX 78723",
      website: "http://lilangelsaustin.com/",
      image:  "https://winnie.imgix.net/30236f96-99fe-403a-aa72-5e38719cbab7?w=242&h=124&dpr=3&fit=crop&auto=compress"
   }
];
const pageTitle="Child Care Services";
const pageDescription= "Find affordable child care services in your area";
const cardData = childcareCardData;

function Childcare(){
    return(
      <div className="child-page-container">
        <h1 className="child-page-title">{pageTitle}</h1>
        <p className="child-page-description">{pageDescription}</p>
        <p className="child-page-description">Showing 3/3 Instances</p>
        {/* NEW WRAPPER FOR CARDS */}
        <div className="cards-container">
          {cardData.map((currCard) => (
            <div key={currCard.id} style={{width: "350px"}}> {/* Adjust width as needed */}
              < ChildCard
                  name={currCard.name}
                  image={currCard.image}
                  id={currCard.id}
                  type={currCard.type}
                  cost={currCard.cost}
                  rating={currCard.rating}
                  Address={currCard.Address}
                  website={currCard.website}
              />
              </div>
          ))}
        </div>
      </div>
  );
}

export default Childcare;