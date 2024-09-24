import { fetchWithRetry } from "./utils";

// Fetch weather data
export const fetchWeather = async (cityName: string) => {
  try {
    // Fetch latitude and longitude using Nominatim
    const geoResponse = await fetchWithRetry(
      `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json`
    );
    const geoData = await geoResponse.json();

    if (geoData.length === 0) {
      throw new Error("City not found");
    }

    const { lat, lon } = geoData[0];

    // Fetch weather data using latitude and longitude
    const weatherResponse = await fetchWithRetry(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&current_weather=true`
    );
    const weatherData = await weatherResponse.json();
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
