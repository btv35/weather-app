function formateDate(timestemp) {
  let date = new Date(timestemp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function showDataOfTheCity(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#desription");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  descriptionElement.innerHTML = response.data.condition.description;
  windElement.innerHTML = `${Math.round(response.data.wind.speed * 3.6)} km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`;
  dateElement.innerHTML = formateDate(response.data.time * 1000);
  cityElement.innerHTML = response.data.city;
  iconElement.innerHTML =`<img 
                         src="${response.data.condition.icon_url}"
                         alt="Sunny"
                         class="weather-app-icon"
                          />`;
  getForecast(response.data.city);
}

function searchForTheCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-form-value").value;
  let apiKey = "858070b76b6bf49185ceeoc8a2f8ct34";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(showDataOfTheCity);
}

function formateDay(timestemp) {
  let date = new Date (timestemp * 1000);
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "858070b76b6bf49185ceeoc8a2f8ct34";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function displayForecast (response) {
  console.log(response.data);
let forecastElement = document.querySelector("#forecast");


let forecastHTML = "";

response.data.daily.forEach(function(day, index) {
  if (index < 5) {
    forecastHTML =
      forecastHTML +
      `<div class="weather-forecast-day">
    <div class="weather-forecast-date">${formateDay(day.time)}</div>
    
    <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
    
    <div class="weather-forecast-temperatures">
        <strong>${Math.round(day.temperature.maximum)}°</strong>
        ${Math.round(day.temperature.minimum)}° 
      </div>
</div>`;
  }
});
forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchForTheCity);


getForecast('Rome');