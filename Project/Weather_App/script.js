document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-messag");

  const API_KEY = '74b019e201c02getyourownapi';

  // _____________________________________________________________________

  getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if(!city) return; // In case the input is empty handle it

    // it may throw an error
    // server/database is always in another continent

    try {
      const weatherData = await fetchWeatherData(city)
      displayWeatherData(weatherData)
    } catch (error) {
      showError()
    } 
    await response.json()
  });

  // _____________________________________________________________________

  async function fetchWeatherData(city) {
    //gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url)

    if (!response) {
      throw new Error('City not found!')
    }
    const data = (await response).json()
    return data
  }

  // _____________________________________________________________________

  function displayWeatherData(data) {
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${main.temp}`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

    // Unlock the display
    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');
  }

  // _____________________________________________________________________

  function showError() {
    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');
  }

})