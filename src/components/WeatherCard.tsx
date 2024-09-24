import React from "react";

const WeatherCard = ({ data, unit }:any) => {
  const convertTemp = (temp:any) => (unit === "F" ? temp * 1.8 + 32 : temp);

  return (
    <div className="weather-card">
      <h2>{data.current_weather.city}</h2>
      <img src={`weather-icon-url-based-on-${data.current_weather.weathercode}`} alt="Weather Icon" />
      <p>{convertTemp(data.current_weather.temperature)}°{unit}</p>
    </div>
  );
};

export default WeatherCard;
