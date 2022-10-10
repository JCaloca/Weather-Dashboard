//API key variable and global variables
var APIKey = "e4355a4446dc417d0aad89e95bf488f5";

var queryURL =
  "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey;

var cityInput = $("#city-input");
var searchBtn = $("#search-button");
var searchResults = $("search-results");
var searchHistory = $("#search-history");
var currentCity;

// function to retrieve data from API
function getWeather(data) {
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
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
      cityName.appen(currentWeatherIcon);

      var currentTemp = data.current.temp;
      var currentTempEl = $("<p>");
      currentTempEl.text(`Temp: ${currentTemp}°F`);
      todaysWeather.append(currentTempEl);

      var currentWind = data.current.wind_speed;
      var currentWindEl = $("<p>");
      currentWindEl.text(`Wind: ${currentWind} KPH`);
      todaysWeather.append(currentWindEl);

      var currentHumidity = data.current.humidity;
      var currentHumidityEl = $("<p>");
      currentHumidityEl.text(`Humidity: ${currentHumidity}%`);
      currentConditionsEl.append(currentHumidityEl);
    });
}
