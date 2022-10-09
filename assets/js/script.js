var APIKey = "e4355a4446dc417d0aad89e95bf488f5";
var city;


var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+ APIKey;

fetch(queryURL);