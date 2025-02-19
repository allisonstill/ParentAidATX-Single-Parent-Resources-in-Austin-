import ProgramCard from "../components/programCard";
import "./Programs.css";


// Put data to go in cards here
const governmentProgramCardData = [
    {   id: 1, 
        name: "Temporary Assistance for Needy Families (TANF)", 
        IDnum: "1",
        description: "The Temporary Assistance for Needy Families program is designed to help families with children experiencing low-income achieve economic security and stability.", 
        website: "https://yourtexasbenefits.com/Learn/Home/",
        govtScope: "Texas", 
        govtAdmin: "US Department of Health and Human Services",
        cat: "Food",
        image: "/TANF.png" 
    },
    {   id: 2, 
        name: "Child Care Assistance Program (CCAP)",
        IDnum: "12345",
        description: "this is the second card", 
        website: " ",
        govtScope: " ",
        govtAdmin: " ",
        cat: " ",
        image: "/cityofAustin.jpg" 
    },
    {   id: 3, 
        name: "Supplemental Nutrition Assistance Program (SNAP)",
        IDnum: " ",
        description: "this is the third card",
        website: " ",
        govtScope: " ",
        govtAdmin: " ",
        cat: " ", 
        image: "/snap.jpg" }
  ];
const pageTitle="Government Services";
const pageDescription= "Find the best government program services in your area";
const cardData = governmentProgramCardData;

function Programs(){
    return( 
        <div className="programs-page-container">
            <h1 className="programs-page-title">{pageTitle}</h1>
            <p className="programs-page-description">{pageDescription}</p>
        {/* NEW WRAPPER FOR CARDS */}
        <div className="cards-container">
            {cardData.map((currCard) => (
                <div key={currCard.id} style={{ width: "350px" }}> {/* Adjust width as needed */}
                < ProgramCard
                    name={currCard.name} 
                    description={currCard.description} 
                    image={currCard.image} 
                    IDnum={currCard.IDnum}
                    website={currCard.website}
                    govtScope={currCard.govtScope}
                    govtAdmin={currCard.govtAdmin}
                    cat={currCard.cat}
                />
                </div>
            ))}
        </div>
    </div>
);
}

export default Programs;