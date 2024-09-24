import CitySearch from "@/components/CitySearch";
import ForecastCard from "@/components/ForecastCard";
import WeatherCard from "@/components/WeatherCard";
import React, { useState, useEffect } from "react";
import { fetchWeather } from "./api/weather";

const API_URL = "https://api.open-meteo.com/v1/forecast";
const DEFAULT_CITY = "New York"; // Modify as needed for default city

function App() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [unit, setUnit] = useState("C"); // "C" for Celsius, "F" for Fahrenheit

  useEffect(() => {
    fetchWeatherhelper(city);
  }, [city]);

  const fetchWeatherhelper = async (cityName:any) => {
    try {
      const data = await fetchWeather(cityName);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };
  

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <CitySearch setCity={setCity} />
      {weatherData && (
        <div>
          <WeatherCard data={weatherData} unit={unit} city={city} />
          <button onClick={toggleUnit}>Toggle to {unit === "C" ? "Fahrenheit" : "Celsius"}</button>
          <h2>Forecast</h2>
          <div className="forecast">
            {weatherData.daily.temperature_2m_max.map((temp:any, index:any) => (
              <ForecastCard key={index} day={index} maxTemp={temp} minTemp={weatherData.daily.temperature_2m_min[index]} unit={unit} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
