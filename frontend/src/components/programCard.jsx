import "./programCard.css";

function ProgramCard({ image, name, IDnum, description, website, govtScope, govtAdmin, cat}) {
  return (
    <div className="card" style={{ width: "25rem" }}>
      <img
        src={image}
        className="card-img-top"
        alt=""
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{IDnum}</p>
        <p className="card-text">{description}</p>
        <p className="card-text">{website}</p>
        <p className="card-text">{govtScope}</p>
        <p className="card-text">{govtAdmin}</p>
        <p className="card-text">{cat}</p>
        <a href="/housing" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
}

export default ProgramCard;
