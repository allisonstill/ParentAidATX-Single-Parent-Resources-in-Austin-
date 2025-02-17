function CustomCard() {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src="/house-pic.jpg" className="card-img-top" alt="picture of a house" />
      <div className="card-body">
        <h5 className="card-title">Housing</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </p>
        <a href="/housing" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  );
}

export default CustomCard;
