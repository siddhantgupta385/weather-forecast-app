import React from "react";
import { Sun, Cloud, CloudRain, Snowflake, Wind } from "lucide-react";

interface WeatherData {
  current_weather: {
    temperature: number;
    weathercode: number;
    windspeed: number;
    winddirection: number;
    time: string;
  };
}

interface WeatherCardProps {
  data: WeatherData;
  unit: 'C' | 'F';
  city: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, unit, city }) => {
  const convertTemp = (temp: number): number => 
    unit === "F" ? (temp * 9) / 5 + 32 : temp;

  const getWeatherInfo = (weatherCode: number): { icon: React.ReactNode; description: string; tip: string } => {
    const weatherMap: Record<number, { icon: React.ReactNode; description: string; tip: string }> = {
      0: { icon: <Sun className="text-yellow-400" size={48} />, description: "Clear sky", tip: "Perfect day for outdoor activities!" },
      1: { icon: <Cloud className="text-gray-400" size={48} />, description: "Partly cloudy", tip: "Don't forget your sunglasses!" },
      2: { icon: <Cloud className="text-gray-600" size={48} />, description: "Cloudy", tip: "A light jacket might be handy." },
      3: { icon: <Cloud className="text-gray-800" size={48} />, description: "Overcast", tip: "Bring a book, it's a cozy day inside." },
      45: { icon: <Wind className="text-blue-300" size={48} />, description: "Foggy", tip: "Drive carefully, visibility might be low." },
      51: { icon: <CloudRain className="text-blue-400" size={48} />, description: "Light rain", tip: "An umbrella could come in handy!" },
      61: { icon: <CloudRain className="text-blue-600" size={48} />, description: "Thunderstorm", tip: "Stay indoors and enjoy the show!" },
      71: { icon: <Snowflake className="text-blue-200" size={48} />, description: "Snow", tip: "Time for hot chocolate and warm socks!" },
    };

    return weatherMap[weatherCode] || { icon: <Sun className="text-yellow-400" size={48} />, description: "Unknown", tip: "Check local weather for more info." };
  };

  const getWeatherClass = (weatherCode: number): string => {
    const weatherClassMap: Record<number, string> = {
      0: "bg-clear-sky",         // Clear sky
      1: "bg-partly-cloudy",     // Partly cloudy
      2: "bg-cloudy",            // Cloudy
      3: "bg-overcast",          // Overcast
      45: "bg-foggy",            // Foggy
      51: "bg-light-rain",       // Light rain
      61: "bg-thunderstorm",     // Thunderstorm
      71: "bg-snow",             // Snow
    };
  
    return weatherClassMap[weatherCode] || "bg-unknown";
  };

  const { icon, description, tip } = getWeatherInfo(data.current_weather.weathercode);
  const weatherClass = getWeatherClass(data.current_weather.weathercode);

  const formatWindDirection = (degrees: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  return (
    // <div className="weather-card bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
    <div className={`weather-card shadow-lg rounded-lg p-6 max-w-sm mx-auto ${weatherClass}`}>
 
      <h2 className="text-2xl font-bold mb-4">{city}</h2>
      <div className="flex items-center justify-between mb-4">
        {icon}
        <div className="text-right">
          <p className="text-4xl font-bold">{convertTemp(data.current_weather.temperature).toFixed(1)}°{unit}</p>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600">Wind: {data.current_weather.windspeed} km/h {formatWindDirection(data.current_weather.winddirection)}</p>
        <p className="text-sm text-gray-600">Last updated: {new Date(data.current_weather.time).toLocaleString()}</p>
      </div>
      <div className="mt-4 bg-blue-100 p-3 rounded-md">
        <p className="text-sm text-blue-800"><strong>Weather Tip:</strong> {tip}</p>
      </div>
    </div>
  );
};

export default WeatherCard;