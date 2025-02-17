function CustomCard({ title, description }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src="/house-pic.jpg"
        className="card-img-top"
        alt="picture of a house"
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href="/housing" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
}

export default CustomCard;
