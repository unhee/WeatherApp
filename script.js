const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherDisplay = document.getElementById("weatherDisplay");
const apiKey = "cf3156206e9d7c856ff1153286dcda9e"; // Replace with your API key from OpenWeatherMap

searchBtn.addEventListener("click", function () {
  const city = cityInput.value;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())

    .then((data) => {
      const weatherInfo = ` 
  
          <h2>${data.name}, ${data.sys.country}</h2> 
  
          <p>Temperature: ${data.main.temp} &deg;C</p> 
  
          <p>Weather: ${data.weather[0].description}</p> 
  
          <p>Humidity: ${data.main.humidity}%</p> 
  
          <p>Wind Speed: ${data.wind.speed} m/s</p> 
  
          <p>Sunrise: ${new Date(
            data.sys.sunrise * 1000
          ).toLocaleTimeString()}</p> 
  
          <p>Sunset: ${new Date(
            data.sys.sunset * 1000
          ).toLocaleTimeString()}</p> 
  
        `;

      weatherDisplay.innerHTML = weatherInfo;
    })

    .catch((error) => {
      console.error("Error fetching weather data:", error);

      weatherDisplay.innerHTML = `<p>Error fetching weather data. Please try again.</p>`;
    });
});

function fetchWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Weather data not available");
      }
      return response.json();
    })

    .then((data) => {
      console.log(data);

      const weatherInfo = ` 
        <h2>${data.name}, ${data.sys.country}</h2> 
        <p>Temperature: ${data.main.temp} &deg;C</p> 
        <p>Weather: ${data.weather[0].description}</p> 
        <p>Humidity: ${data.main.humidity}%</p> 
        <p>Wind Speed: ${data.wind.speed} m/s</p> 
      `;

      weatherDisplay.innerHTML = weatherInfo;
    })

    .catch((error) => {
      console.error("Error fetching weather data:", error);
      weatherDisplay.innerHTML = `<p>${error.message}</p>`;
    });
}
