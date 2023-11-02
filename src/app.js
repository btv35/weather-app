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
  cityElement.innerHTML = response.data.name;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = `${Math.round(response.data.wind.speed * 3.6)} km/h`;
  humidityElement.innerHTML = `${response.data.main.humidity} %`;
  dateElement.innerHTML = formateDate(response.data.dt * 1000);
}

function searchForTheCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-form-value").value;
  let apiKey = "9496e550c50357215588180769f9651c";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showDataOfTheCity);
}

let searchFormElement = document.querySelector("#search-button");
searchFormElement.addEventListener("click", searchForTheCity);
