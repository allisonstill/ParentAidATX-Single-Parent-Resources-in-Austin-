import "./Childcare.css";
import ChildCard from "../components/childCard";
import React, { useEffect, useState } from "react";

const pageTitle="Child Care Services";
const pageDescription= "Find affordable child care services in your area";

function Childcare(){

  const [daycares, setDaycares] = useState([]); // the api response data will be stored in "daycares"
  // Fetch data for childcare using API
  useEffect(() => {
      const fetchDaycares = async () => {
          try {
              const response = await fetch("https://flask-api-production-730f.up.railway.app/api/childcare");
              const data = await response.json();
              console.log("Fetched data:", data); // Debugging (F12)
              setDaycares(data);
          } catch (error) {
              console.error("Error fetching daycares:", error);
          }
      };

      fetchDaycares();
    }, []);

    return(
      <div className="child-page-container">
        <h1 className="child-page-title">{pageTitle}</h1>
        <p className="child-page-description">{pageDescription}</p>
        <p className="child-page-description">Showing {daycares.length} {daycares.length === 1 ? "Instance" : "Instances"}</p>
        <div className="ChildCards-container">
          {daycares.map((daycare) => (
            <div key={daycare.id} style={{width: "350px"}}> {/* Adjust width as needed */}
              < ChildCard
                  image={daycare.image_url}
                  name={daycare.name}
                  type={daycare.program_type}
                  age_range={daycare.age_range}
                  open_time={daycare.open_time}
                  close_time={daycare.close_time}
                  address={daycare.address}
                  id={daycare.id}
              />
              </div>
          ))}
        </div>
      </div>
  );
}

export default Childcare;