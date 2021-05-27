//selector vars
var formEl = document.querySelector('#searchCity');
var city = document.querySelector('#city');
var btn = document.querySelector('#submit');
var ulEl = document.querySelector('#list');
var cityBtn = document.querySelector('button');
var btnList = document.querySelector('.buttonList');

//global vars
var lat = 0;
var lon = 0;
var UVI = 0;

//getting from local storage
var weatherData = JSON.parse(localStorage.getItem("weatherData")) || [];

//functiont that pulls from the open weather database
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
                console.log(data);
                renderWeather(data);
            })
                .then(function () {
                    var apiForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=metric&appid=5e18e2ae4a8234835170e48b2a9705f3';
                    fetch(apiForecastURL).then(function (response) {
                        if (response.ok) {
                            response.json().then(function (data) {
                                console.log(data);
                                render5Days(data);
                            }).then(function () {
                                var apiForecastURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=5e18e2ae4a8234835170e48b2a9705f3';
                                fetch(apiForecastURL).then(function (response) {
                                    if (response.ok) {
                                        response.json().then(function (data) {
                                            console.log(data);
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

//this is able to 
var renderCity = function () {
    var formElem = document.createElement('form');
    var button = document.createElement('button');

    for (var cities of weatherData) {
        button.textContent = cities;

        btnList.append(button);
    }
}
//function that creates the current weather
var renderWeather = function (weatherData) {
    var rowElem = document.querySelector('#weatherOverview');
    var ulElem = document.createElement('ul');
    var icon = document.createElement('img')
    rowElem.innerHTML = ' ';
    var weatherArr = [
        weatherData.name,
        weatherData.weather[0].icon,
        'Temperature: ' + weatherData.main.temp + '˚C',
        'Wind: ' + weatherData.wind.speed + 'mph',
        'Humidity: ' + weatherData.main.humidity + '%',
        'UV Index: ' + UVI
    ];
    for (var i = 0; i < weatherArr.length; i++) {
        if (i === 0) {
            var title = document.createElement('h1');
            title.textContent = weatherArr[i];
            rowElem.appendChild(title);
            icon.setAttribute('src', 'http://openweathermap.org/img/w/' + weatherArr[1] + '.png')
            rowElem.append(icon);
            i++
        } else {
            var liElem = document.createElement('li');
            liElem.textContent = weatherArr[i];
            rowElem.appendChild(ulElem);
            ulElem.appendChild(liElem);
        }
    }

}

//function that sets the five day forecast
var render5Days = function (weatherData) {
    var rowEl = document.querySelector('#fiveDayRow');
    var icon = document.createElement('img')
    rowEl.innerHTML = " ";
    var i = 3;
    while (i < 40) {
        var weatherArr = [
            weatherData.list[i].dt_txt.substring(0, 10),
            weatherData.list[i].weather[0].icon,
            'Temperature: ' + weatherData.list[i].main.temp + '˚C',
            'Wind: ' + weatherData.list[i].wind.speed + 'mph',
            'Humidity: ' + weatherData.list[i].main.humidity + '%',
        ]
        console.log(i);

        for (var j = 0; j < weatherArr.length; j++) {
            if (j === 0) {
                var divEl = document.createElement('div');
                var ulEl = document.createElement('ul');
                icon.setAttribute('src', 'http://openweathermap.org/img/w/' + weatherArr[1] + '.png');
                console.log(icon);
                divEl.setAttribute('class', 'col col-2');
                rowEl.appendChild(divEl);
                ulEl.appendChild(icon);
                ulEl.appendChild(document.createElement('br'))
                var header = document.createElement('h3');
                header.textContent = weatherArr[j];
                divEl.appendChild(header);
                divEl.appendChild(ulEl);
                j++;
            } else {
                    var il = document.createElement('il');
                    il.textContent = weatherArr[j];
                    ulEl.appendChild(il);
                    il.appendChild(document.createElement('br'))
                    il.appendChild(document.createElement('br'))
            }
        }
        i += 8;
    }
}

//event listeners that queue the fetching when a form has been interacted with
formEl.addEventListener('submit', currentWeather);
btn.addEventListener('click', function () {
    weatherData.push(city.value);
    localStorage.setItem('weatherData', JSON.stringify(weatherData));
    renderCity();
});

document.addEventListener('click', function (event) {
    var element = event.target;
    var apiWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + element.textContent + '&units=metric&appid=5e18e2ae4a8234835170e48b2a9705f3';
    fetch(apiWeatherURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                lon = data.coord.lon;
                lat = data.coord.lat;
                renderWeather(data);
            })
                .then(function () {
                    var apiForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + element.textContent + '&units=metric&appid=5e18e2ae4a8234835170e48b2a9705f3';
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

});
