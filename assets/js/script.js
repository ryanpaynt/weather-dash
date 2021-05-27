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
var ulEl = document.querySelector('#list');
var cityBtn = document.querySelector('button');
var btnList = document.querySelector('.buttonList');

var lat = 0;
var lon = 0;
var UVI = 0;

var wData;

var weatherData = JSON.parse(localStorage.getItem("weatherData")) || [];

var currentWeather = function (event) {
    event.preventDefault();

    var cityName = city.value;

    console.log(cityName);
    var apiWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=5e18e2ae4a8234835170e48b2a9705f3';
    fetch(apiWeatherURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                lon = data.coord.lon;
                lat = data.coord.lat;
                renderWeather(data);
            })
                .then(function () {
                    var apiForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=metric&appid=5e18e2ae4a8234835170e48b2a9705f3';
                    fetch(apiForecastURL).then(function (response) {
                        if (response.ok) {
                            response.json().then(function (data) {
                                render5Days(data);
                            }).then(function () {
                                var apiForecastURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=5e18e2ae4a8234835170e48b2a9705f3';
                                fetch(apiForecastURL).then(function (response) {
                                    if (response.ok) {
                                        response.json().then(function (data) {
                                            UVI = data.current.uvi;
                                        })
                                    } else {
                                        console.log('Error: ' + response.statusText);
                                    }
                                });
                            })
                        } else {
                            console.log('Error: ' + response.statusText);
                        }
                    });
                })
        } else {
            console.log('Error: ' + response.statusText);
        }
    })
        .catch(function (error) {
            console.log('Unable to connect geocode');
        })

};

var renderCity = function () {
    var formElem = document.createElement('form');
    var button = document.createElement('button');

    for (var cities of weatherData) {
        button.textContent = cities;

        btnList.append(button);
    }
}
var renderWeather = function (weather) {
    var rowElem = document.querySelector('#weatherOverview');
    var ulElem = document.createElement('ul');
    rowElem.innerHTML = ' ';
    var weatherArr = [
        weather.name,
        //icon
        'Temperature: ' + weather.main.temp + '˚C',
        'Wind: ' + weather.wind.speed + 'mph',
        'Humidity: ' + weather.main.humidity + '%',
        'UV Index: ' + UVI
    ];
    for (var i = 0; i < weatherArr.length; i++) {
        var liElem = document.createElement('li');
        liElem.textContent = weatherArr[i];
        if(i === 0){
            liElem.setAttribute('class', 'title');
        }
        rowElem.appendChild(ulElem);
        ulElem.appendChild(liElem);
    }

}

var render5Days = function (weather) {
    var rowEl = document.querySelector('#fiveDayRow');
    rowEl.innerHTML = " ";
    var i = 3;
    while (i < 40) {
        var weatherArr = [
            weather.list[i].dt_txt.substring(0, 10),
            //icon
            'Temperature: ' + weather.list[i].main.temp + '˚C',
            'Wind: ' + weather.list[i].wind.speed + 'mph',
            'Humidity: ' + weather.list[i].main.humidity + '%',
        ]
        console.log(i);
        
        for (var j = 0; j < weatherArr.length; j++) {
            if (j === 0) {
                var divEl = document.createElement('div');
                var ulEl = document.createElement('ul');
                divEl.setAttribute('class', 'col col-2');
                ulEl.textContent = weatherArr[j];
                rowEl.appendChild(divEl);
                divEl.appendChild(ulEl);
                ulEl.appendChild(document.createElement('br'))
            } else {
                var il = document.createElement('il');
                il.textContent = weatherArr[j];
                ulEl.appendChild(il);
                il.appendChild(document.createElement('br'))
            }
        }
        i += 8;
    }
}


formEl.addEventListener('submit', currentWeather);
btn.addEventListener('click', function () {
    weatherData.push(city.value);
    localStorage.setItem('weatherData', JSON.stringify(weatherData));
    renderCity();
});

document.addEventListener('click', function(event) {
    var element = event.target;
    console.log(element.textContent);
    if (element.matches('button')) {
      var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + element.textContent + '&units=metric&appid=5e18e2ae4a8234835170e48b2a9705f3';
      fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      }); 
    }
  });
