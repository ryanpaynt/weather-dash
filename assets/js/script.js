// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
var formEl = document.querySelector('#searchCity');
var city = document.querySelector('#city');
var btn = document.querySelector('#submit');
var ulEl - document.querySelector('')

var lat;
var long;
var name;
var arr;

var weatherData = JSON.parse(localStorage.getItem("weatherData")) || [];

var currentWeather = function (event) {
    event.preventDefault();


    var cityName = city.value;

    console.log(cityName);
    var apiURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=5e18e2ae4a8234835170e48b2a9705f3'
    fetch(apiURL).then(function (response) {
        console.log(response.ok);
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            });
        } else {
            console.log('Error: ' + response.statusText);
        }
    })
        .catch(function (error) {
            console.log('Unable to connect geocode');
        })

};

var renderCity = function(){
    function
}

formEl.addEventListener('submit', currentWeather);
btn.addEventListener('click', function(){
    weatherData.push(city.value);
    localStorage.setItem('weatherData', JSON.stringify(weatherData));
    renderCity();
});