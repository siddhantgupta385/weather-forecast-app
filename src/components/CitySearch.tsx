import React, { useState } from "react";

const CitySearch = ({ setCity }:any) => {
  const [input, setInput] = useState("");
  const [cities, setCities] = useState<any>([]);

  const handleInputChange = (e:any) => {
    setInput(e.target.value);
    fetchCities(e.target.value);
  };

  const fetchCities = async (query:any) => {
    if (!query) return;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=5`);
      const data = await response.json();
      
      // Extract city names from the data
      const cityNames = data.map((item:any) => item.display_name);
      setCities(cityNames);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };
  return (
    <div className="city-search">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Search City"
      />
      <div className="dropdown">
        {cities.map((city:any) => (
          <p key={city} onClick={() => setCity(city)}>
            {city}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CitySearch;
