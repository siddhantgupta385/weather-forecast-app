Weather Forecast Application - React.js
This React.js application displays weather information for different cities, fulfilling the requirements outlined in the assignment document.

Key Features:

1) *Reusable Components*: The application is built using modular components like CityName, CurrentWeather, ForecastCard, etc., promoting maintainability and code reuse.

2) *City Search*: Users can search for weather data in various locations using a custom search bar with a dropdown modal.
5-Day Forecast: The current weather is complemented by a 5-day forecast, displaying day of the week, high/low temperatures, and weather icons.

3) *Temperature Unit Conversion*: Users can switch between Celsius and Fahrenheit using a toggle button. The conversion logic is implemented manually.

4) *Data Fetching & Error Handling*: Open-source APIs (nominatim.openstreetmap.org for city data and api.open-meteo.com for weather data) are used with centralized API handling and error handling for network issues or city not found scenarios.

5) *UI & Responsiveness*: Basic styles are included using CSS for a visually appealing interface. The application is responsive, adapting to different screen sizes and orientations.


Additional Implementations:

*Debouncing*: Input typing is debounced to optimize API calls and avoid unnecessary requests.
*API Retry*: API requests implement retry logic in case of initial failures.
Next.js Server Caching (Not Currently Deployed): While not deployed yet, Next.js server-side caching is implemented to improve performance by storing recent searches.


Usage Instructions:
Install dependencies using *npm install*
Run the development server using *npm run dev*