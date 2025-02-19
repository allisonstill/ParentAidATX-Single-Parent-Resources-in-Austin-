import "./Home.css";

function Home() {
  return (
    <div className="main-container">
      <div className="background-container">
        <div className="title-box">
          <h1 className="home-page-title">ParentAidATX</h1>
          <p className="home-page-description">Empower. Simplify. Support.</p>
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
            government assistance, affordable housing, and childcare services.
          </p>
          <p>
            Navigating support systems can be overwhelming, especially for
            single parents balancing work and family. ParentAidATX bridges this
            gap by connecting users to tailored programs and services, making it
            easier to understand eligibility, find nearby affordable housing,
            and locate quality childcare.
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
