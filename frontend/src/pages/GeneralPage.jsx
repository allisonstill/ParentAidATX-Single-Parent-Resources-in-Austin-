import InstanceCard from "../components/Card";
import "./GeneralPage.css";

function GeneralPage({pageTitle, pageDescription, cardData, image}) {
  return (
    <div className="general-page-container">
      <h1 className="general-page-title">{pageTitle}</h1>
      <h4>{pageDescription}</h4>
      <h5>Showing 3/3 Instances</h5>
      {/* NEW WRAPPER FOR CARDS */}
      <div className="cards-container">
        {cardData.map((currCard) => (
          <InstanceCard key={currCard.id} title={currCard.title} description={currCard.description} image={currCard.image}/>
        ))}
      </div>
    </div>
  );
}

export default GeneralPage;
