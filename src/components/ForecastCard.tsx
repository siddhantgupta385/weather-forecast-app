import React from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ForecastCard = ({ day, maxTemp, minTemp, unit }:any) => {
  const convertTemp = (temp:any) => (unit === "F" ? temp * 1.8 + 32 : temp);
  const dayOfWeek = new Date();
  dayOfWeek.setDate(dayOfWeek.getDate() + day);

  return (
    <div className="forecast-card">
      <h3>{daysOfWeek[dayOfWeek.getDay()]}</h3>
      <p>Max: {convertTemp(maxTemp)}°{unit}</p>
      <p>Min: {convertTemp(minTemp)}°{unit}</p>
    </div>
  );
};

export default ForecastCard;
