import CitySearch from "@/components/CitySearch";
import ForecastCard from "@/components/ForecastCard";
import WeatherCard from "@/components/WeatherCard";
import React, { useState, useEffect } from "react";

const API_URL = "https://api.open-meteo.com/v1/forecast";
const DEFAULT_CITY = "New York"; // Modify as needed for default city

function App() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [unit, setUnit] = useState("C"); // "C" for Celsius, "F" for Fahrenheit

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName:any) => {
    try {
      // Fetch latitude and longitude using Nominatim
      const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?q=${cityName}&format=json`);
      const geoData = await geoResponse.json();
  
      if (geoData.length === 0) {
        throw new Error("City not found");
      }
  
      const { lat, lon } = geoData[0];
  
      // Now fetch the weather data using latitude and longitude
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&current_weather=true`
      );
      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
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
          <WeatherCard data={weatherData} unit={unit} />
          <button onClick={toggleUnit}>Toggle to {unit === "C" ? "Fahrenheit" : "Celsius"}</button>
          <h2>5-Day Forecast</h2>
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
