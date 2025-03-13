import "./Home.css";

function Home() {
  return (
    <div className="main-container">
      <div className="background-container">
        <div className="title-box">
          <h1 className="home-page-title">ParentAidATX</h1>
          <p className="home-page-description">Your Partner in Parenting.</p>
        </div>
        <div className="learn-more-container">
          <span className="learn-more-arrow">↓</span>
          <p className="learn-more-text">Learn more!</p>
        </div>
      </div>
      <div className="description-overall-container">
        <div className="description-container">
          <h1 className="description-title">What do we do?</h1>
          <p>
            ParentAidATX empowers single parents in Austin, Texas, by
            simplifying access to essential resources, including family-related
            books, affordable housing, and childcare services.
          </p>
          <p>
            Navigating support systems can be overwhelming, especially for single parents balancing 
            work and family. ParentAidATX bridges this gap by connecting users with curated educational books 
            to help navigate single parenting, 
            affordable housing options, and quality childcare resources in Austin—making it 
            easier to find the support they need.
          </p>
          <p>
            We believe every parent deserves support, and every child deserves
            stability.
          </p>
        </div>
        <div className="skyline-container">
          <img className="austin-skyline" src="austin.jpg" />
        </div>
      </div>
    </div>
  );
}

export default Home;
