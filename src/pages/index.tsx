import React, { useState } from 'react';
import axios from 'axios';
import ForecastCard from '../components/ForecastCard';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: [
    {
      main: string;
      icon: string;
    }
  ];
}

interface HomeProps {
  initialWeather: WeatherData;
}

const Home: React.FC<HomeProps> = ({ initialWeather }) => {
  const [weather, setWeather] = useState<WeatherData>(initialWeather);
  const [city, setCity] = useState<string>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchWeather = async (cityName: string) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`
      );
      setWeather(response.data);
      setError(null);
    } catch (error) {
      setError('City not found or network error');
    }
  };

  const handleSearch = () => {
    if (city.trim() === '') return;
    fetchWeather(city);
  };

  const toggleUnit = () => {
    setUnit(prevUnit => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <div className="container">
      <h1>Weather Forecast</h1>

      {/* City Search */}
      <div className="city-search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Unit Toggle */}
      <div className="unit-toggle">
        <button onClick={toggleUnit}>
          Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
        </button>
      </div>

      {/* Weather Display */}
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="weather-display">
          <h2>{weather.name}</h2>
          <div className="weather-info">
            <h3>{Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}</h3>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].main}
            />
          </div>
          <p>{weather.weather[0].main}</p>
        </div>
      )}

      {/* Five Day Forecast */}
      <div className="forecast-section">
        <h2>5-Day Forecast</h2>
        <div className="forecast-grid">
          {/* ForecastCard Example */}
          <ForecastCard day="Monday" high={30} low={20} icon="01d" />
          <ForecastCard day="Tuesday" high={32} low={22} icon="02d" />
          <ForecastCard day="Wednesday" high={28} low={18} icon="03d" />
          {/* Add more forecast cards based on actual data */}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`
  );
  return {
    props: {
      initialWeather: response.data,
    },
  };
}

export default Home;
