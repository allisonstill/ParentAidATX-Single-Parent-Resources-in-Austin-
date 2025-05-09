

function InstanceCard({ image, title, description }) {
  return (
    <div className="card" style={{ width: "25rem" }}>
      <img
        src={image}
        className="card-img-top"
        alt=""
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">{description}</p>
        <p className="card-text">{description}</p>
        <p className="card-text">{description}</p>
        <a href="/housing" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
}

export default InstanceCard;
