async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const resultDiv = document.getElementById("weather-result");

  if (!city) {
    resultDiv.textContent = "Please enter a city name.";
    return;
  }

  resultDiv.textContent = "Fetching weather...";

  try {
    // Step 1: Get latitude & longitude from city name
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      resultDiv.textContent = "City not found!";
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // Step 2: Fetch weather data for that location
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherResponse.json();

    const temp = weatherData.current_weather.temperature;
    const wind = weatherData.current_weather.windspeed;

    resultDiv.innerHTML = `
      <p><strong>City:</strong> ${name}, ${country}</p>
      <p><strong>Temperature:</strong> ${temp}°C</p>
      <p><strong>Wind Speed:</strong> ${wind} km/h</p>
    `;
  } catch (error) {
    resultDiv.textContent = "Error fetching weather data.";
    console.error(error);
  }
}
