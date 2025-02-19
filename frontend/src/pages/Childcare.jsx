import GeneralPage from "./GeneralPage"

// Put data to go in cards here
const childcareCardData = [
    { id: 1, title: "childcare card1", description: "this is the first card", image: "/house-pic.jpg" },
    { id: 2, title: "childcare card2", description: "this is the second card", image: "/house-pic.jpg" },
    { id: 3, title: "childcare card3", description: "this is the third card", image: "/house-pic.jpg" },
  ];

function Childcare(){
    return(
    <>
        <GeneralPage
         pageTitle="Childcare Services"
         pageDescription= "Find the best childcare services in your area"
         cardData = {childcareCardData}
         />
    </>);
}

export default Childcare;