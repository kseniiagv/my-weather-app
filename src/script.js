let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dayTime = document.querySelector("span#day-time");
dayTime.innerHTML = `${day}, ${hours}:${minutes}`;

function changeCity(event) {
  event.preventDefault();
  let input = document.querySelector("#location");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = input.value.toUpperCase();

  let apiKey = `59a6ae41a8d53cb647a89df95d0d7348`;
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${input.value.toUpperCase()}&appid=${apiKey}`;
  axios.get(apiUrlCity).then(coords);
}

function coords(response) {
  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;

  let apiKey = `59a6ae41a8d53cb647a89df95d0d7348`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,daily,alerts&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(parameters);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(getCoords);
  function getCoords(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apiKey = `59a6ae41a8d53cb647a89df95d0d7348`;
    let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrlCity).then(showCurrentPosition);
  }
}

function showCurrentPosition(response) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name.toUpperCase();

  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  console.log(latitude, longitude);

  let apiKey = `59a6ae41a8d53cb647a89df95d0d7348`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,daily,alerts&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(parameters);
}

function parameters(response) {
  let temperature = document.querySelector("#temperature");
  let precipitation = document.querySelector("#first");
  let humidity = document.querySelector("#second");
  let wind = document.querySelector("#third");
  let uvIndex = document.querySelector("#fourth");
  let description = document.querySelector("#day-weather");

  let pop = response.data.hourly[now.getHours()].pop;
  temperature.innerHTML = Math.round(response.data.current.temp);
  precipitation.innerHTML = Math.round(pop * 100);
  humidity.innerHTML = Math.round(response.data.current.humidity);
  wind.innerHTML = Math.round(response.data.current.wind_speed);
  uvIndex.innerHTML = Math.round(response.data.current.uvi);
  description.innerHTML = response.data.current.weather[0].description;

  let temp = Math.round(response.data.current.temp);

  function changeTempFahrenheit() {
    let temperature = document.querySelector("#temperature");
    let fahrenheitTemperature = Math.round(temp * 1.8 + 32);
    temperature.innerHTML = fahrenheitTemperature;
  }

  function changeTempCelsius() {
    let celsiusTemperature = temp;
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = celsiusTemperature;
  }

  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.addEventListener("click", changeTempFahrenheit);

  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", changeTempCelsius);
}

let form = document.querySelector("form");
form.addEventListener("submit", changeCity);
form.addEventListener("click", changeCity);
let current = document.querySelector("#current");
current.addEventListener("click", getPosition);
