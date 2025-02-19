import GeneralPage from "./GeneralPage"

// Put data to go in cards here
const housingCardData = [
    { id: 1, title: "housing card1", description: "this is the first card", image: "/house-pic.jpg" },
    { id: 2, title: "housing card2", description: "this is the second card", image: "/house-pic.jpg" },
    { id: 3, title: "housing card3", description: "this is the third card", image: "/house-pic.jpg" },
  ];

function Housing(){
    return(
    <>
        <GeneralPage
         pageTitle="Housing Services"
         pageDescription= "Find the best housing services in your area"
         cardData = {housingCardData}
         />
    </>);
}

export default Housing;