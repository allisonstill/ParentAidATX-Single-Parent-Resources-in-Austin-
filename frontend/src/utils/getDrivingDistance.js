const AUSTIN_CENTRAL_ADDRESS = "300 W Cesar Chavez St, Austin, TX 78701";

export const getDrivingDistance = async (destination) => {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    AUSTIN_CENTRAL_ADDRESS
  )}&destinations=${encodeURIComponent(destination)}&key=${
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  }`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.rows[0].elements[0].status === "OK") {
      let distanceText = data.rows[0].elements[0].distance.text;
      let distanceValue = parseFloat(distanceText.replace(/[^0-9.]/g, ""));
      if (distanceText.includes("km")) {
        distanceValue *= 0.621371;
      }
      return distanceValue;
    }
    return null;
  } catch (err) {
    console.error("Distance fetch error:", err);
    return null;
  }
};
