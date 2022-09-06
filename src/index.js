import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic
function getWeather(city) {
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, city);
    } else {
      printError(this, response, city);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function getZipWeather(zip) {
  let request = new XMLHttpRequest();
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${process.env.API_KEY}`;

  request.addEventListener("loadend", function () {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, zip);
    } else {
      printError(this, response, zip);
    }
  });

  request.open("GET", url, true);
  request.send();
}


// UI Logic
function printError(request, apiResponse, city) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function printElements(apiResponse, city) {
  let temp = apiResponse.main.temp;
  temp = (((temp - 273.15) * 9/5) + 32).toFixed(1);
  let direction = apiResponse.wind.deg;
  if (direction >= 315 || direction <= 45) {
    direction = "North";
  } else if (direction <= 135) {
    direction = "East";
  } else if (direction <= 180) {
    direction = "South";
  } else {
    direction = "West";
  }
  document.querySelector('#showResponse').innerText = `The humidity in ${city} is ${apiResponse.main.humidity}%.
  The temperature in farenheit is ` + temp + ` degrees.
  The forecast for today is ${apiResponse.weather[0].main}
  the wind is blowing ${apiResponse.wind.speed}m/s towards the ` + direction;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  document.querySelector('#zipcode').value = null;
  getWeather(city);
}

function handleZipForm(e) {
  e.preventDefault();
  const zip = document.querySelector("#zipcode").value;
  document.querySelector('#zipcode').value = null;
  document.querySelector('#location').value = null;
  getZipWeather(zip);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
  document.querySelector("form#zip").addEventListener("submit", handleZipForm);
});