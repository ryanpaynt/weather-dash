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
console.log('hello');
var formEl = document.querySelector('#searchCity');
var city = document.querySelector('#city');
var btn = document.querySelector('#submit');

var lat;
var long;
var name;

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
                displayDayWeather(data);
            });
        } else {
            console.log('Error: ' + response.statusText);
        }
    })
        .catch(function (error) {
            console.log('Unable to connect geocode');
        })

};

var fiveDayWeather = function (event) {
    event.preventDefault();

    var cityName = city.value;
    var apiURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=metric&appid=5e18e2ae4a8234835170e48b2a9705f3'
    fetch(apiURL).then(function (response) {
        console.log(response.ok);
        if (response.ok) {
            return response.json();

        } else {
            console.log('Error: ' + response.statusText);
        }
    })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (error) {
            console.log('Unable to connect geocode');
        })

};


formEl.addEventListener('submit', currentWeather);
formEl.addEventListener('submit', fiveDayWeather);

var displayDayWeather = function (weatherDay) {
    if (weatherDay.length === 0) {
        return;
    }
    console.log(weatherDay.main.temp);

    var ulEl = document.querySelector('#dayWeather');
    var headEl = document.querySelector('#weatherOverview');

    var listEl1 = document.createElement('li');
    var listEl2 = document.createElement('li');
    var listEl3 = document.createElement('li');
    var listEl4 = document.createElement('li');

    var header = document.createElement('h2');
    header.textContent = weatherDay.name + ' ' + moment().format('MM/Do');
    headEl.appendChild(header);

    listEl1.textContent = 'Current Temperature: ' + weatherDay.main.temp + '˚C';
    ulEl.appendChild(listEl1);

    listEl2.textContent = 'Current Wind Speed: ' + weatherDay.wind.speed + ' mph';
    ulEl.appendChild(listEl2);

    listEl3.textContent = 'Current Humidity: ' + weatherDay.main.humidity + '%';
    ulEl.appendChild(listEl3);
};