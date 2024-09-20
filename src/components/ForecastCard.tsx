interface ForecastCardProps {
    day: string;
    high: number;
    low: number;
    icon: string;
  }
  
  const ForecastCard: React.FC<ForecastCardProps> = ({ day, high, low, icon }) => (
    <div className="forecast-card">
      <h4>{day}</h4>
      <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="weather icon" />
      <p>High: {high}°</p>
      <p>Low: {low}°</p>
    </div>
  );
  
  
  export default ForecastCard;
  