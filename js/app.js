// DOM
const humidity = document.getElementById("hum");
const temperature = document.getElementById("temp");
const clouds = document.getElementById("clouds");
const searchBtn = document.getElementById("search-btn");

// URL parts
let api = "https://api.openweathermap.org/data/2.5/weather?q=";
let city = "Szczecin";
let apiKey = "&APPID=a1fbfdd383446efccdaf81d5b68ca793";
let units = "&units=metric";
let url = api + city + units + apiKey;

// AJAX
function loadWeather() {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);

  xhr.onload = function() {
    if (this.status == 200) {
      let JSONData = JSON.parse(this.responseText);
      loadData(JSONData);
    }
  };

  xhr.send();
}

// Getting data
function loadData(weather) {
  humidity.innerHTML = `Wilgotność: ${weather.main.humidity}%`;
  temperature.innerHTML = `Temperatura: ${weather.main.temp}°C`;
  clouds.innerHTML = `Zachmurzenie: ${weather.clouds.all}%`;
}

searchBtn.addEventListener("click", loadWeather);
