interface WeatherDisplayProps {
    city: string;
    temp: number;
    condition: string;
    icon: string;
  }
  
  const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ city, temp, condition, icon }) => (
    <div>
      <h2>{city}</h2>
      <p>{temp}°</p>
      <p>{condition}</p>
      <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="weather icon" />
    </div>
  );
  
  export default WeatherDisplay;
  