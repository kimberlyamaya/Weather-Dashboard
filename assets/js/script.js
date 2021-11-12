// global variables //
var searchBtn = document.getElementById("search-btn");
var apiKey = "097a5ac483594b0099362e36fa245dbe";
var city = document.getElementById("city-input");
var state = document.getElementById("state-input");
var cityValue = "";
var stateValue = "";
var lat = "";
var lon = "";
var apiCity = "";
var apiState = "";
var excludeAPI = "minutely,hourly";
var cityPlusDate = document.getElementById("city-plus-date");
var currentWeatherContainer = document.getElementById("currentWeather")
var forecastWeaterContainer = document.getElementById("5dayWeather")
var forecastHeader = document.getElementById("5dayForecastHeader")
var cardBody1 = document.getElementById("card-body-1")
var todayDate = moment().format("l");

var inputHandler = function() {
    // removed (event) from function above to avoid errors
    //event.preventDefault();

    // get values from input
    // can I add trim here?
    cityValue = city.value;
    stateValue = state.value;

    
    if (cityValue === "") {
        alert("Please enter a city.");
    } else if (cityValue === "" && stateValue === "") {
        alert("Please enter city and state.");
    } else if (stateValue === "") {
        alert("Please enter a state.");
    } else {
        getCoordinates(cityValue, stateValue);
    }

};

// API Connection //
// retrieve lat and lon //
var getCoordinates = function(city, state) {
    console.log(city, state)
    //var requestURL = "http://api.openweathermap.org/geo/1.0/direct?q=Winters,CA,{country}&appid=097a5ac483594b0099362e36fa245dbe";
    var requestURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "{country}&appid=" + apiKey;

    fetch(requestURL).then(function (response) {
        response.json().then(function(coordinatesData) {
        console.log(coordinatesData);
``
        /*// only run this function if input value equals api value
        if (state.value = apiState) {
            console.log("runNextFunction")
        } else (
            console.log("Nothing")
        )*/

        storeCoordinates(coordinatesData);
        })
    })

}

var storeCoordinates = function(coordinatesData) {

    // loop through data to parse out city, state, lat and lon
    for (var i = 0; i < coordinatesData.length; i++) {
        // add some logic here to say if city state from api = city state from input then continue otherwise...
        lat = coordinatesData[i].lat;
        lon = coordinatesData[i].lon;
        apiCity = coordinatesData[i].name;
        apiState = coordinatesData[i].state;


        // need to add icon next to this!
        cityPlusDate.textContent=(apiCity + "," + apiState + "  (" + todayDate + ")");
        currentWeatherContainer.appendChild(cityPlusDate);

        /*// only run this function if input value equals api value
        if (state.value = apiState) {
            console.log("runNextFunction")
        } else (
            console.log("Nothing")
        )*/

        getWeatherData(lat,lon);

    }
}


// API Connection //
// retrieve weather data //
// I only want to pass one lat and lon here! //
var getWeatherData = function(lat,lon) {
    //var requestURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=38.5249&lon=-121.9708&units=imperial&appid=097a5ac483594b0099362e36fa245dbe"
    var requestURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    fetch(requestURL2).then(function (response) {
        response.json().then(function(weatherData) {
        console.log(weatherData);
        
        displayCurrentWeatherData(weatherData);
        displayForecastWeatherData(weatherData);
        })
    })

}

var displayCurrentWeatherData = function(weatherData) {

    // current temp
    // how do you get the degree symbol?
    var currentTemp = document.createElement("p")
    currentTemp.textContent = "Temp: " + weatherData.current.temp + " F"

    // current wind
    var currentWind = document.createElement("p")
    currentWind.textContent = "Wind: " + weatherData.current.wind_speed + " MPH"

    //current humidity
    var currentHumidity = document.createElement("p")
    currentHumidity.textContent = "Humidity: " + weatherData.current.humidity + " %"

    //current uvindex
    var currentUVindex = document.createElement("p")
    currentUVindex.textContent = "UV Index: " + weatherData.current.uvi
    //need the value to have uvIndex
    //currentUVindex.classList.add("uvIndex")

    //append
    currentWeatherContainer.appendChild(currentTemp);
    currentWeatherContainer.appendChild(currentWind);
    currentWeatherContainer.appendChild(currentHumidity);
    currentWeatherContainer.appendChild(currentUVindex);

}


var displayForecastWeatherData = function(weatherData) {

    /*for (var i = 0; i < weatherData.daily.length; i++) {
        var forecastTemp = document.createElement("p")
        forecastTemp.textContent=weatherData.daily[i].temp.day
        console.log(forecastTemp);
    }*/

    forecastHeader.textContent="5-day Forecast"
    forecastHeader.classList.add("visible")

    //covert date1
    unixTime1 = weatherData.daily[1].dt
    var date1 = new Date(unixTime1 * 1000)
    var forecastDate1 = document.createElement("p")
    forecastDate1.textContent=date1.toLocaleDateString("en-US")
    forecastDate1.classList.add("card-Title")
    forecastDate1.classList.add("visible")

    //get icon
    /*var forecasticon1 = document.createElement("i")
    forecasticon1.textContent = "weatherData.daily[1].weather.icon"
    forecasticon1.classList.add("cart-text")
    forecasticon1.classList.add("visible")*/
    
    //get temp1
    var forecastTemp1 = document.createElement("p")
    forecastTemp1.textContent = "Temp: " + weatherData.daily[1].temp.day + " F"
    forecastTemp1.classList.add("text")
    forecastTemp1.classList.add("visible")

    //get wind1
    var forecastWind1 = document.createElement("p")
    forecastWind1.textContent = "Wind: " + weatherData.daily[1].wind_speed + " MPH"
    forecastWind1.classList.add("text")
    forecastWind1.classList.add("visible")

    //get humidity1
    var forecastHumidity1 = document.createElement("p")
    forecastHumidity1.textContent = "Humidity: " + weatherData.daily[1].humidity + " %"
    forecastHumidity1.classList.add("text")
    forecastHumidity1.classList.add("visible")

    //apppend1
    cardBody1.appendChild(forecastDate1);
    //cardBody1.appendChild(forecasticon1);
    cardBody1.appendChild(forecastTemp1);
    cardBody1.appendChild(forecastWind1);
    cardBody1.appendChild(forecastHumidity1);
}

// on click event to kick off API
searchBtn.addEventListener("click",inputHandler);