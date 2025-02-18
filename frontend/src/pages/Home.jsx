import CustomCard from "../components/Card";
//import "./Home.css"
const cardData = [
  { id: 1, title: "andrew harvey", description: "hello world" },
  { id: 2, title: "card2", description: "this is the second card" },
  { id: 3, title: "card3", description: "this is the third card" },
];

function Home() {
  return (
    <>
        <home className = "home-container">
          <h1 className= "home-page-title">Home page</h1>
        
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          {cardData.map((currCard) => (
            <CustomCard title={currCard.title} description={currCard.description} />
          ))}
        </home>
     
    </>
  );
}

export default Home;
