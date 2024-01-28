function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#showCity");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  let humidityElement = document.querySelector(".humidity");
  let windElement = document.querySelector(".wind");
  
  let humidity = response.data.temperature.humidity;
  let windSpeed = response.data.wind.speed;

  humidityElement.innerHTML = humidity + "%";
  windElement.innerHTML = windSpeed + "km/h";

  temperatureElement.innerHTML = temperature;

}


function showSearch(event) {
  event.preventDefault();
  let citySearchElement = document.querySelector("#cityInput")
  let city = citySearchElement.value;
  
  let apiKey = "ba1d2aoaft5c96a00d3ffa23b9471ec3"
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}
 
let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
function displayForecast() {
  let days = ["Mon", "Tue", "Wed", "Thur", "Fri"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml +=
      `
      <div class="day-card">
        <div class="day-card-day">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div>${Math.floor(Math.random() * (30 - 20 + 1)) + 20}&deg;</div>
      </div>`;
  });

  let forecastElement = document.querySelector("#date-day-selection");
  forecastElement.innerHTML = forecastHtml;
}

displayForecast();



let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showSearch);