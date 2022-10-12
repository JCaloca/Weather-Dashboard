//API key variable and global variables
var APIKey = "e4355a4446dc417d0aad89e95bf488f5";

var city = $("#city-input");
var searchForm = document.querySelector("#searchtwo");
searchForm.addEventListener("submit", searchHandler);
var searchResults = $("search-results");
var searchHistory = $("#search-history");
var currentCity;

// function to retrieve data from API and display in todays-weather div
function getWeatherForecast(data) {
  var queryURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    data +
    "&appid=" +
    APIKey;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var forecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=${APIKey}`;

      fetch(forecastURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // creating the cards for the five day forecast
          var fiveDayForecast = $("#five-day-forecast");
          var fiveDayHeader = $("<h2>");
          fiveDayHeader.text("Five Day Forecast");
          fiveDayForecast.append(fiveDayHeader);

          var fiveDayCards = $("#five-day-cards");

          for (var i = 4; i < 40; i = i + 8) {
            var date;
            var temp;
            var icon;
            var wind;
            var humidity;

            var date = data.list[i].dt;
            date = moment.unix(date).format("MM/DD/YYYY");
            temp = data.list[i].main.temp;
            icon = data.list[i].weather[0].icon;
            wind = data.list[i].wind.speed;
            humidity = data.list[i].main.humidity;

            var card = document.createElement("div");
            card.classList.add(
              "card",
              "col-2",
              "m-1",
              "bg-primary",
              "text-white"
            );

            var cardContent = document.createElement("div");
            cardContent.classList.add("card-body");
            cardContent.innerHTML = `<h6>${date}</h6>
                              <img src= "http://openweathermap.org/img/wn/${icon}.png"> </><br>
                               ${temp}°F<br>
                               ${wind} MPH <br>
                               ${humidity}%`;

            card.appendChild(cardContent);
            fiveDayCards.append(card);
          }
        });

      var currentWeatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=${APIKey}`;

      fetch(currentWeatherURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var todaysWeather = $("#todays-weather");
          todaysWeather.addClass("border border-primary");

          var cityNameEl = $("<h2>");
          cityNameEl.text(currentCity);
          todaysWeather.append(cityNameEl);

          var currentDate = data.dt;
          currentDate = moment.unix(currentDate).format("MM/DD/YYYY");
          var currentDateEl = $("<span>");
          currentDateEl.text(` (${currentDate}) `);
          cityNameEl.append(currentDateEl);

          var currentWeatherIcon = data.weather[0].icon;
          var currentWeatherIconEl = $("<img>");
          currentWeatherIconEl.attr(
            "src",
            "http://openweathermap.org/img/wn/" + currentWeatherIcon + ".png"
          );
          cityNameEl.append(currentWeatherIconEl);

          var currentTemp = data.main.temp;
          var currentTempEl = $("<p>");
          currentTempEl.attr("style", "width: 100%;");
          currentTempEl.text(`Temp: ${currentTemp}°F`);
          todaysWeather.append(currentTempEl);

          var currentWind = data.wind.speed;
          var currentWindEl = $("<p>");
          currentWindEl.attr("style", "width: 100%;");
          currentWindEl.text(`Wind: ${currentWind} MPH`);
          todaysWeather.append(currentWindEl);

          var currentHumidity = data.main.humidity;
          var currentHumidityEl = $("<p>");
          currentHumidityEl.attr("style", "width: 100%;");
          currentHumidityEl.text(`Humidity: ${currentHumidity}%`);
          todaysWeather.append(currentHumidityEl);
        });
    });
  return;
}

function searchHandler(event) {
  event.preventDefault();

  var cityInputEL = document.getElementById("city-input");
  currentCity = cityInputEL.value.trim();
  getWeatherForecast(currentCity);
}
