import GeneralPage from "./GeneralPage"

// Put data to go in cards here
const governmentProgramCardData = [
    { id: 1, title: "government program card1", description: "this is the first card", image: "/house-pic.jpg" },
    { id: 2, title: "government program card2", description: "this is the second card", image: "/house-pic.jpg" },
    { id: 3, title: "government program card3", description: "this is the third card", image: "/house-pic.jpg" },
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