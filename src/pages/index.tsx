import CitySearch from "@/components/CitySearch";
import ForecastCard from "@/components/ForecastCard";
import WeatherCard from "@/components/WeatherCard";
import React, { useState, useEffect } from "react";
import { fetchWeather } from "./api/weather";
import ForecastCardSkeleton from "@/components/ForecastCardSkeleton";
import WeatherCardSkeleton from "@/components/WeatherCardSkeleton";

const API_URL = "https://api.open-meteo.com/v1/forecast";
const DEFAULT_CITY = "New York"; // Modify as needed for default city

function App() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [unit, setUnit] = useState("C"); // "C" for Celsius, "F" for Fahrenheit
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  
  useEffect(() => {
    fetchWeatherhelper(city);
  }, [city]);

  const fetchWeatherhelper = async (cityName:any) => {
    try {
      setLoading(true); // Set loading to true when fetching starts
      const data = await fetchWeather(cityName);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally{
      setLoading(false)
    } 

  };
  

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <CitySearch setCity={setCity} />
        <div>
        {loading ? (<WeatherCardSkeleton />) : (<WeatherCard data={weatherData} unit={unit} city={city} />)}
          <button onClick={toggleUnit}>
            Toggle to {unit === "C" ? "Fahrenheit" : "Celsius"}
          </button>
          <h2>Forecast</h2>
          <div className="forecast">
            {loading ? (<ForecastCardSkeleton />):(
              weatherData.daily.temperature_2m_max.map((temp:any, index:any) =>
                  <ForecastCard
                    key={index}
                    day={index}
                    maxTemp={temp}
                    minTemp={weatherData.daily.temperature_2m_min[index]}
                    unit={unit}
                  />
                )
              )}
          </div>
        </div>
    </div>
  );
}

export default App;
