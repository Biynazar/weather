const API_KEY = "881bcd595c5963950567e7c17e475432";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=`;
// "https://api.openweathermap.org/data/2.5/weather?q=uzgen&appid=881bcd595c5963950567e7c17e475432&units=metric";

let place = document.querySelector(".weather__city");
let temp = document.querySelector(".weather__temp");
let humidity = document.querySelector(".weather__humidity");
let wind = document.querySelector(".weather__wind");

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather__icon");
const displayWeather = document.querySelector(".weather");

const error = document.querySelector(".error");

async function checkWeather(city) {
  const response = await fetch(API_URL + city + `&appid=${API_KEY}`);

  if (response.status == 404) {
    error.style.display = "block";
    displayWeather.style.display = "none";
  } else {
    let data = await response.json();

    place.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + "°c";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " км/ч";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "src/images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "src/images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "src/images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "src/images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "src/images/mist.png";
    }

    displayWeather.style.display = "block";
    error.style.display = "none";
  }
}

searchBtn.addEventListener("click", function () {
  checkWeather(searchBox.value);
});
