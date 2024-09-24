import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';

interface CitySearchProps {
  setCity: (city: string) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ setCity }) => {
  const [input, setInput] = useState('');
  const [cities, setCities] = useState<string[]>([]);

  const fetchCities = async (query: string) => {
    if (!query) {
      setCities([]);
      return;
    }

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`);
      const data = await response.json();
      
      // Extract city names from the data
      const cityNames = data.map((item: any) => item.display_name);
      setCities(cityNames);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]);
    }
  };

  // Create a debounced version of fetchCities
  const debouncedFetchCities = useCallback(
    debounce((query: string) => fetchCities(query), 300),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    debouncedFetchCities(value);
  };

  const handleCitySelect = (city: string) => {
    setCity(city);
    setInput(city);
    setCities([]);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Search City"
      />
      {cities.length > 0 && (
        <div className="suggestions">
          {cities.map((city) => (
            <div
              key={city}
              onClick={() => handleCitySelect(city)}
              className="suggestion"
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySearch;