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
}

function searchForTheCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-form-value").value;
  let apiKey = "858070b76b6bf49185ceeoc8a2f8ct34";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(showDataOfTheCity);
}

// function displayForecast () {
// let forecastElement = document.querySelector("#forecast");

// let days = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'];
// let forecastHTML = "";

// days.forEach(function(day) {
//   forecastHTML =
//     forecastHTML +
//     `<div class="weather-forecast-day">
//     <div class="weather-forecast-date">${day}</div>
//     <div class="weather-forecast-icon">☁</div>
//     <div class="weather-forecast-temperatures">
//         <strong>11°</strong>
//         <strong>9°</strong> 
//       </div>
// </div>`;
// });
// forecastElement.innerHTML = forecastHTML;
// }

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchForTheCity);

// displayForecast();