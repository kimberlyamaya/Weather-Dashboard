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
var excludeAPI = "minutely,hourly"
var cityPlusDate = document.getElementById("city-plus-date")
var currentWeatherContainer = document.getElementById("current-weather")
var forecastWeaterContainer = document.getElementById("5dayWeather")
var forecastHeader = document.getElementById("5dayForecastHeader")
var cardBody1 = document.getElementById("card-body-1")
var historyWeatherContainer = document.getElementById("history-weather")
var cityHistoryBtn = document.createElement("button")
var todayDate = moment().format("l");
var currentTemp = document.createElement("p")
var currentWind = document.createElement("p")
var currentHumidity = document.createElement("p")
var currentUVindex = document.createElement("p")
var forecastDate1 = document.createElement("p")
var forecastTemp1 = document.createElement("p")
var forecastWind1 = document.createElement("p")
var forecastHumidity1 = document.createElement("p")


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

var checkHistoryArray = function() {
    var checkLocalStorage = localStorage.getItem("cityHistoryArray");

    if (checkLocalStorage === null) {
        var cityHistoryArray = [];

        localStorage.setItem('cityHistoryArray', JSON.stringify(cityHistoryArray));

    }
}

// API Connection //
// retrieve lat and lon //
var getCoordinates = function(city, state) {
    console.log(city, state)
    //var requestURL = "http://api.openweathermap.org/geo/1.0/direct?q=Winters,TX,{country}&appid=097a5ac483594b0099362e36fa245dbe";
    var requestURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "{country}&appid=" + apiKey;

    fetch(requestURL).then(function (response) {
        response.json().then(function(coordinatesData) {
        console.log(coordinatesData);

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

        cityPlusDate.textContent = ""

        // need to add icon next to this!
        cityPlusDate.textContent=(apiCity + "," + apiState + "  (" + todayDate + ")");
        //cityPlusDate.classList.add("visible");

        console.log(cityPlusDate);
        currentWeatherContainer.appendChild(cityPlusDate);
        currentWeatherContainer.style.borderColor = "black";

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
    console.log(lat,lon)
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

    // clear contents
    //cityPlusDate.textContent = ""
    currentTemp.textContent = ""
    currentWind.textContent = ""
    currentHumidity.textContent = ""
    currentUVindex.textContent = ""

    // current temp
    // how do you get the degree symbol?
    currentTemp.textContent = "Temp: " + weatherData.current.temp + " F"

    // current wind
    currentWind.textContent = "Wind: " + weatherData.current.wind_speed + " MPH"

    //current humidity
    currentHumidity.textContent = "Humidity: " + weatherData.current.humidity + " %"

    //current uvindex
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

    // clear contents
    forecastHeader.textContent=""
    forecastDate1.textContent=""
    //forecasticon1.textContent=""
    forecastTemp1.textContent=""
    forecastWind1.textContent=""
    forecastHumidity1.textContent=""

    forecastHeader.textContent="5-day Forecast"
    forecastHeader.style.visibility="visible";

    //covert date1
    unixTime1 = weatherData.daily[1].dt
    var date1 = new Date(unixTime1 * 1000)
    forecastDate1.textContent=date1.toLocaleDateString("en-US")
    forecastDate1.classList.add("card-Title")
    forecastDate1.style.visibility="visible";

    //get icon
    //more createElement to top of file
    /*var forecasticon1 = document.createElement("i")
    forecasticon1.textContent = "weatherData.daily[1].weather.icon"
    forecasticon1.classList.add("cart-text")
    forecasticon1.style.visibility="visible";*/
    console.log(weatherData.daily[1])
    var forecasticon1 = document.createElement("img")
    forecasticon1.src = "https://openweathermap.org/img/wn/" + weatherData.daily[1].weather[0].icon + "@2x.png"
    forecasticon1.style.visibility="visible";
    
    //get temp1
    forecastTemp1.textContent = "Temp: " + weatherData.daily[1].temp.day + " F"
    forecastTemp1.classList.add("text")
    forecastTemp1.style.visibility="visible";

    //get wind1
    forecastWind1.textContent = "Wind: " + weatherData.daily[1].wind_speed + " MPH"
    forecastWind1.classList.add("text")
    forecastWind1.style.visibility="visible";

    //get humidity1
    forecastHumidity1.textContent = "Humidity: " + weatherData.daily[1].humidity + " %"
    forecastHumidity1.classList.add("text")
    forecastHumidity1.style.visibility="visible";

    //apppend1
    cardBody1.appendChild(forecastDate1);
    cardBody1.appendChild(forecasticon1);
    cardBody1.appendChild(forecastTemp1);
    cardBody1.appendChild(forecastWind1);
    cardBody1.appendChild(forecastHumidity1);

    appendHistoryButtons();

    storeWeather();
}

// create the city history button and append
var appendHistoryButtons = function() {
    cityHistoryBtn.textContent = cityValue
    cityHistoryBtn.classList.add("weather-history-button")
    historyWeatherContainer.appendChild(cityHistoryBtn)
}

// create function to loop through the cityHistoryArray
// grab city.value assign to button

var storeWeather = function() {
    
    var cityHistoryArray = JSON.parse(localStorage.getItem("cityHistoryArray"));

    //store the values display on page
    cityHistoryArray.push({city: city.value, state: state.value, lat: lat, lon: lon}) 
    
    /*[city.value, cityPlusDate.textContent, currentTemp.textContent, currentWind.textContent, currentHumidity.textContent, currentUVindex.textContent];*/

    localStorage.setItem('cityHistoryArray', JSON.stringify(cityHistoryArray));

    var retrievedObject = localStorage.getItem("cityHistoryArray");

    //console.log('retrievedObject: ', JSON.parse(retrievedObject));
}


// on click event to kick off API
searchBtn.addEventListener("click",inputHandler)

checkHistoryArray();

// on click event reload weather data
//cityHistoryBtn.addEventListener


// does is make sense to store pertinent info from city save and call it when button is pressed?
// Would I have to pass the city value back into the API? 
// Could I store city in the object and call based on cityValue on click event = city?
