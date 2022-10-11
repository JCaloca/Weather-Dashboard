//API key variable and global variables
var APIKey = "e4355a4446dc417d0aad89e95bf488f5";

var queryURL =
  "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey;

var city = $("#city-input");
var searchForm = document.querySelector("#searchtwo");
searchForm.addEventListener("submit", searchHandler);
console.log("searchForm = ", searchForm);
var searchResults = $("search-results");
var searchHistory = $("#search-history");
var currentCity;

// function to retrieve data from API and display in todays-weather div
function getWeather(data) {
  var queryURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    data +
    "&appid=" +
    APIKey;
  console.log(queryURL);
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("data = ", data);
      var todaysWeather = $("#todays-weather");
      todaysWeather.addClass("border-border-primary");

      var cityName = $("<h2>");
      cityName.text(currentCity);
      todaysWeather.append(cityName);

      var currentDate = data.current.dt;
      currentDate = moment(currentDate).format("MM/DD/YYYY");
      var currentDateEl = $("<span>");
      currentDateEl.text(` (${currentDate}) `);
      cityName.append(currentDateEl);

      var currentWeatherIcon = data.current.weather[0].icon;
      var displayWeatherIconEl = $("<img>");
      displayWeatherIconEl.attr(
        "src",
        "http://openweathermap.org/img/wn/" + currentWeatherIcon + ".png"
      );
      cityName.append(currentWeatherIcon);

      var currentTemp = data.current.temp;
      var currentTempEl = $("<p>");
      currentTempEl.text(`Temp: ${currentTemp}°F`);
      todaysWeather.append(currentTempEl);

      var currentWind = data.current.wind_speed;
      var currentWindEl = $("<p>");
      currentWindEl.text(`Wind: ${currentWind} MPH`);
      todaysWeather.append(currentWindEl);

      var currentHumidity = data.current.humidity;
      var currentHumidityEl = $("<p>");
      currentHumidityEl.text(`Humidity: ${currentHumidity}%`);
      currentConditionsEl.append(currentHumidityEl);
      fetch();
      // creating the cards for the five day forecast
      var fiveDayForecast = $("#five-day-forecast");
      var fiveDayHeader = $("<h2>");
      fiveDayHeader.text("Five Day Forecast");
      fiveDayForecast.append(fiveDayHeader);

      var fiveDayCards = $("#five-day-cards");

      for (var i = 1; i <= 5; i++) {}
    });
}

function searchHandler(event) {
  event.preventDefault();
  console.log("searchHandler");
  var cityInputEL = document.getElementById("city-input");
  currentCity = cityInputEL.value.trim();
  console.log(currentCity);
  getWeather(currentCity);
}
