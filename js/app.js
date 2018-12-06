// DOM
const input = document.getElementById("search-bar");
const main = document.querySelector("main");
const searchBtn = document.getElementById("search-btn");
const error = document.querySelector(".error");

const pollutionInfo = document.querySelector(".pollution-info");
const value = document.getElementById("value");
const status = document.querySelector(".status");
const desc = document.getElementById("desc");
const advice = document.getElementById("advice");

// Validate city name
function validateCity(city) {
  var re = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  return re.test(String(city));
}

// URL for weather API
function getUrlWeather() {
  let api = "https://api.openweathermap.org/data/2.5/weather?q=";
  let city = "";
  let units = "&units=metric";
  let apiKey = "&APPID=a1fbfdd383446efccdaf81d5b68ca793";

  if (validateCity(input.value)) {
    city = input.value;
  } else {
    console.log("Niepoprawna nazwa miasta.");
  }

  return api + city + units + apiKey;
}

// URL for pollution API
function getUrlPollution(pol) {
  let api = "https://airapi.airly.eu/v2/measurements/nearest?";
  let indexType = "indexType=AIRLY_CAQI";
  let distance = "&maxDistanceKM=5";

  let { lat, lon } = pol.coord;

  return `${api}${indexType}&lat=${lat}&lng=${lon}${distance}`;
}

// animate counting
function animateValue(id, start, end, duration, unit) {
  var range = end - start;
  var current = start;
  var increment = end > start ? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));
  var obj = document.getElementById(id);
  if (start === end) {
    obj.innerHTML = end;
    return null;
  }
  var timer = setInterval(function() {
    current += increment;
    obj.innerHTML = current + unit;
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}

// Display weather data
function loadWeather(weather) {
  const hum = weather.main.humidity;
  const temp = Math.ceil(weather.main.temp);
  const clouds = weather.clouds.all;
  animateValue("hum", 0, hum, 800, "%");
  animateValue("temp", 0, temp, 800, "°C");
  animateValue("clouds", 0, clouds, 800, "%");
}

// Display pollution data
function loadPollution(pollution) {
  let width = pollution.current.indexes[0].value;
  let color = pollution.current.indexes[0].color;
  status.style.backgroundColor = color;
  status.style.width = `${width}%`;
  status.style.display = "block";
  status.textContent = `${width}%`;
  desc.textContent = pollution.current.indexes[0].description;
  advice.innerHTML = pollution.current.indexes[0].advice;
}

// AJAX weather
function loadWeatherData(url) {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);

  xhr.onload = function() {
    if (this.status == 200) {
      let JSONData = JSON.parse(this.responseText);
      loadWeather(JSONData);

      loadPollutionData(getUrlPollution(JSONData));

      error.textContent = "";
      main.style.display = "block";
    } else if (this.status == 400 || 404) {
      main.style.display = "none";
      error.textContent = "Nie ma takiego miasta";
    }
  };

  xhr.send();
}

// AJAX pollution
function loadPollutionData(url) {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);

  xhr.onload = function() {
    if (this.status == 200) {
      let JSONData = JSON.parse(this.responseText);
      loadPollution(JSONData);
      console.log(JSONData);
      pollutionInfo.style.visibility = "visible";
    } else if (this.status >= 400) {
      pollutionInfo.style.visibility = "hidden";
      console.log("ERROR");
    }
  };

  xhr.setRequestHeader("apikey", "wrx2BgtI1X3VvDyxV3IpjFuL7FW0jBUk");

  xhr.send();
}

// Events
input.addEventListener("keyup", event => {
  if (event.keyCode === 13) {
    let url = getUrlWeather();
    loadWeatherData(url, loadWeather);
    input.value = "";
  }
});

searchBtn.addEventListener("click", () => {
  let url = getUrlWeather();
  loadWeatherData(url, loadWeather);
  input.value = "";
});
