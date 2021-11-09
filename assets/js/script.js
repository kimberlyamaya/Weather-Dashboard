// global variables //
var searchBtn = document.getElementById("search-btn");
var apiKey = "097a5ac483594b0099362e36fa245dbe";
var limit = 5;
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
var todayWeatherContainer = document.getElementById("todayWeather")
var todayDate = moment().format("l");
var todayWeatherDetailsContainer = document.getElementById("weather-details-container");

var inputHandler = function() {
    // removed (event) from function above to avoid errors
    //event.preventDefault();

    // get values from input
    cityValue = city.value;
    stateValue = state.value.trim();

    //console.log(cityValue);
    
    if (cityValue === "") {
        alert("Please enter a city.");
    } else if (cityValue === "" && stateValue === "") {
        alert("Please enter city and state.");
    } else if (stateValue === "") {
        alert("Please enter a state.");
    } else {
        getCoordinates(cityValue, stateValue, limit);
    }

};

// API Connection //
// retrieve lat and lon //
// although I am passing state the search for the city returns all possible states
var getCoordinates = function(city, state) {
    var requestURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "," + "{country}&limit=" + limit + "&appid=" + apiKey;  
    //var requestURL = "http://api.openweathermap.org/geo/1.0/direct?q=Winters,CA,{country}&limit=5&appid=097a5ac483594b0099362e36fa245dbe"

    fetch(requestURL)   
    .then(function (response) {
        return(response).json();
    })
    .then(function (coordinatesData) {
        console.log(coordinatesData);
        storeCoordinates(coordinatesData);
    })

}

var storeCoordinates = function(coordinatesData) {

    // loop through data to parse out city, state, lat and lon
    for (var i = 0; i < coordinatesData.length; i++) {
        // grabbing at 0 because I am getting many results
        // passing state is not working 
        lat = coordinatesData[0].lat;
        lon = coordinatesData[0].lon;
        apiCity = coordinatesData[0].name;
        apiState = coordinatesData[0].state;
        console.log(lat,lon);
        console.log(apiCity, apiState);

        // dispaly city and state here
        // need to add icon next to this!
        cityPlusDate.textContent=apiCity + "," + apiState + "  (" + todayDate + ")";
        todayWeatherContainer.appendChild(cityPlusDate);

    }

    // I need to pass these coordinates into another API connection
}


// API Connection //
// retrieve weather data //
// need to pass lat and lon here but am instead passing the city, state
/*var getWeatherData = function() {
    // my lat and lon are empty, why?
    console.log(lat, lon)
    //var requestURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=" + excludeAPI + "&appid=" + apiKey
    var requestURL = "https://api.openweathermap.org/data/2.5/onecall?lat=38.5249&lon=-121.9708&exclude=" + excludeAPI + "&appid=" + apiKey

    fetch(requestURL)
    .then(function (response) {
        return(response).json();
    })
    .then(function (weatherData) {
        console.log(weatherData);
        storeWeatherData(weatherData);
    })
}

var storeWeatherData = function(weatherData) {
    for (var i = 0; i < weatherData.length; i++) {
        var mainTemp = document.createElement("p")
        mainTemp.textContent=weatherData[i].current.temp
        console.log("mainTemp")
        todayWeatherDetailsContainer.appendChild(mainTemp);
    }
}*/

// on click event to kick off API
searchBtn.addEventListener("click",inputHandler);