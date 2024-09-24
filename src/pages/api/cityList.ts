import { fetchWithRetry } from "./utils";

// Fetch city list based on query
export const fetchCities = async (query: string) => {
    if (!query) return [];
  
    try {
      const response = await fetchWithRetry(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`
      );
      const data = await response.json();
      
      // Extract city names from the data
      const cityNames = data.map((item: any) => item.display_name);
      return cityNames;
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  };