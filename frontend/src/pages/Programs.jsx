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
        IDnum: "2",
        description: "Child care assistance programs help families pay for child care so they can work, study, or train for jobs. These programs are funded by the federal government and may also be called vouchers, subsidies, or fee assistance.", 
        website: "https://www.austintexas.gov/department/child-care/",
        govtScope: "Texas",
        govtAdmin: "Texas Workforce Commission",
        cat: "Child care",
        image: "/cityofAustin.jpg" 
    },
    {   id: 3, 
        name: "Supplemental Nutrition Assistance Program (SNAP)",
        IDnum: "3",
        description: "SNAP provides food benefits to low-income families to supplement their grocery budget so they can afford the nutritious food essential to health and well-being.",
        website: "https://www.fns.usda.gov/snap/supplemental-nutrition-assistance-program/",
        govtScope: "Texas",
        govtAdmin: "US Department of Agriculture",
        cat: "Food", 
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
            <p className="programs-page-description">Showing 3/3 Instances</p>
        {/* NEW WRAPPER FOR CARDS */}
        <div className="ProgramCards-container">
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
                    id={currCard.id}
                />
                </div>
            ))}
        </div>
    </div>
);
}

export default Programs;