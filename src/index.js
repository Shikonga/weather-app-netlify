function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature"); 
  let temperature = Math.round(response.data.temperature.current); 
  let cityElement = document.querySelector("#showCity"); 
  let humidityElement = document.querySelector(".humidity"); 
  let windElement = document.querySelector(".wind"); 
  let currentDateELement = document.querySelector("#current-date-time");
  let date = new Date(response.data.time * 1000); 
  let iconElement = document.querySelector("#weather-icon");
  
  let humidity = response.data.temperature.humidity;
  let windSpeed = response.data.wind.speed;

  cityElement.innerHTML = response.data.city;
  currentDateElement.innerHTML = formatDate(new Date(response.data.time * 1000), response.data.timezone_offset);
  humidityElement.innerHTML = humidity + "%";
  windElement.innerHTML = windSpeed + "km/h";
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  showForecast(response.data.city);

}
 function showCity(city){
  let apiKey = "ba1d2aoaft5c96a00d3ffa23b9471ec3"
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {

    document.querySelector("#showCity").innerHTML = response.data.city;
    document.querySelector("#current-temperature").innerHTML = Math.round(response.data.temperature.current);
    document.querySelector("#weather-icon").innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

    let currentDateElement = document.querySelector("#current-date-time");
    currentDateElement.innerHTML = formatDate(new Date(response.data.time * 1000), response.data.timezone_offset);

    document.querySelector(".humidity").innerHTML = response.data.temperature.humidity + "%";
    document.querySelector(".wind").innerHTML = response.data.wind.speed + "km/h";

    showForecast(city);
  });
}

/*function formatDate(date) {
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
 

let currentDate = new Date();*/
function showSearch(event) {
  event.preventDefault();
  let citySearchElement = document.querySelector("#cityInput")
  let city = citySearchElement.value;

  showCity(city);
  
  citySearchElement.value = "";
}


function formatDate(date) {

  let timezoneOffset = date.getTimezoneOffset() * 60;
  date = new Date(date.getTime() + timezoneOffset * 1000);

  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let formattedDay = days[day];

  return `${formattedDay} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function showForecast(city){
  let apiKey = "ba1d2aoaft5c96a00d3ffa23b9471ec3"
  let apiUrl =  `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayForecast);

}
function init() {
  showCity("Nairobi");
}

window.addEventListener("load", init);

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
    
    forecastHtml +=
      `
      <div class="day-card">
        <div class="day-card-day">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div>${ Math.round(day.temperature)}</div>
      </div>`;
    }
  });

  let forecastElement = document.querySelector("#date-day-selection");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showSearch);