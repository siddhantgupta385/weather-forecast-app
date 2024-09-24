import React, { useState, useCallback, useRef } from 'react';
import { debounce } from 'lodash';
import { fetchCities } from '@/pages/api/cityList';

interface CitySearchProps {
  setCity: (city: string) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ setCity }) => {
  const [input, setInput] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNoResults, setShowNoResults] = useState<any>(false);
  const inputRef = useRef<any>(null);

  
  const fetchCitiesHelper = async (query: string) => {
    if (!query) {
      setCities([]);
      setShowNoResults(true);
      return;
    }
    try {
      setIsLoading(true); 
      const cityList = await fetchCities(query);
      setCities(cityList);

      // Show the "No cities found" message only if the query is not empty and there are no results
      setShowNoResults(query && cityList.length === 0);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setShowNoResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a debounced version of fetchCities
  const debouncedFetchCities = useCallback(
    debounce((query: string) => fetchCitiesHelper(query), 300),
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
        ref={inputRef}
      />
      {isLoading && <div className="loading">Loading...</div>}
      {cities.length > 0 && !isLoading &&(
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
      {!isLoading && showNoResults && inputRef.current && inputRef.current.focus && (
        <div className="suggestions">
          No cities found
        </div>
      )}
    </div>
  );
};

export default CitySearch;