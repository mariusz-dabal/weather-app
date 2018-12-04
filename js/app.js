// DOM
const humidity = document.getElementById("hum");
const temperature = document.getElementById("temp");
const clouds = document.getElementById("clouds");
const searchBtn = document.getElementById("search-btn");
const input = document.getElementById("search-bar");

// Validate city name
function validateCity(city) {
  var re = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  return re.test(String(city));
}

// URL
function getUrl() {
  let api = "https://api.openweathermap.org/data/2.5/weather?q=";
  let city = "";
  let units = "&units=metric";
  let apiKey = "&APPID=a1fbfdd383446efccdaf81d5b68ca793";

  if (validateCity(input.value)) {
    city = input.value;
  } else {
    console.log("Invalid City Name");
  }

  return api + city + units + apiKey;
}

// AJAX
function loadWeather(url) {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);

  xhr.onload = function() {
    if (this.status == 200) {
      let JSONData = JSON.parse(this.responseText);
      loadData(JSONData);
    } else if (this.status == 400 || 404) {
      console.log("Can not find the city");
    }
  };

  xhr.send();
}

input.addEventListener("keyup", event => {
  if (event.keyCode === 13) {
    let url = getUrl();
    loadWeather(url);
  }
});

searchBtn.addEventListener("click", () => {
  let url = getUrl();
  loadWeather(url);
});

// Display data
function loadData(weather) {
  humidity.innerHTML = `Wilgotność: ${weather.main.humidity}%`;
  temperature.innerHTML = `Temperatura: ${weather.main.temp}°C`;
  clouds.innerHTML = `Zachmurzenie: ${weather.clouds.all}%`;
}
