import GeneralPage from "./GeneralPage"

// Put data to go in cards here
const governmentProgramCardData = [
    { id: 1, title: "Temporary Assistance for Needy Families (TANF)", description: "this is the first card", image: "/TANF.png" },
    { id: 2, title: "Child Care Assistance Program (CCAP)", description: "this is the second card", image: "/cityofAustin.jpg" },
    { id: 3, title: "Supplemental Nutrition Assistance Program (SNAP)", description: "this is the third card", image: "/snap.jpg" },
  ];

function Housing(){
    return(
    <>
        <GeneralPage
         pageTitle="Government Services"
         pageDescription= "Find the best government program services in your area"
         cardData = {governmentProgramCardData}
         />
    </>);
}

export default Housing;