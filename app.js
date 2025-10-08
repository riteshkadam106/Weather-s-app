async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const resultDiv = document.getElementById("weather-result");
  if (!city) {
    resultDiv.textContent = "Please enter a city name.";
    return;
  }

  const apiKey = "https://api.open-meteo.com/v1/forecast?latitude=19.07&longitude=72.87&current_weather=true";
  resultDiv.textContent = "Fetching weather...";

  try {
    const response = await fetch(apiKey);
    const data = await response.json();
    const temp = data.current_weather.temperature;
    const wind = data.current_weather.windspeed;

    resultDiv.innerHTML = `
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Temperature:</strong> ${temp}°C</p>
      <p><strong>Wind Speed:</strong> ${wind} km/h</p>
    `;
  } catch (error) {
    resultDiv.textContent = "Error fetching weather data.";
  }
}
