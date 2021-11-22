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
var currentWeatherHeaderIconDiv = document.getElementById("headerIconDiv")
var forecastWeaterContainer = document.getElementById("fivedayWeather")
var forecastHeader = document.getElementById("fivedayForecastHeader")
var cardGroup = document.getElementById("card-group")
var cardBody1 = document.getElementById("card-body-1")
var cardBody2 = document.getElementById("card-body-2")
var cardBody3 = document.getElementById("card-body-3")
var cardBody4 = document.getElementById("card-body-4")
var cardBody5 = document.getElementById("card-body-5")
var historyWeatherContainer = document.getElementById("history-weather")
var todayDate = moment().format("l");
var currentIcon1 = document.createElement("img")
var currentTemp = document.createElement("p")
var currentWind = document.createElement("p")
var currentHumidity = document.createElement("p")
var currentUVindex = document.createElement("p")
var forecastDate1 = document.createElement("h7")
var forecastTemp1 = document.createElement("p")
var forecastWind1 = document.createElement("p")
var forecastHumidity1 = document.createElement("p")
var forecasticon1 = document.createElement("img")
var forecastDate2 = document.createElement("h7")
var forecastTemp2 = document.createElement("p")
var forecastWind2 = document.createElement("p")
var forecastHumidity2 = document.createElement("p")
var forecasticon2 = document.createElement("img")
var forecastDate3 = document.createElement("h7")
var forecastTemp3 = document.createElement("p")
var forecastWind3 = document.createElement("p")
var forecastHumidity3 = document.createElement("p")
var forecasticon3 = document.createElement("img")
var forecastDate4 = document.createElement("h7")
var forecastTemp4 = document.createElement("p")
var forecastWind4 = document.createElement("p")
var forecastHumidity4 = document.createElement("p")
var forecasticon4 = document.createElement("img")
var forecastDate5 = document.createElement("h7")
var forecastTemp5 = document.createElement("p")
var forecastWind5 = document.createElement("p")
var forecastHumidity5 = document.createElement("p")
var forecasticon5 = document.createElement("img")
var cityHistoryBtn = document.createElement("button")



var inputHandler = function() {

    cityValue = city.value;
    //stateValue = state.value;

    
    if (cityValue === "") {
        alert("Please enter a valid city.");
    } /*else if (cityValue === "" && stateValue === "") {
        alert("Please enter city and state.");
    } else if (stateValue === "") {
        alert("Please enter a state.");
    }*/ else {
        getCoordinates(cityValue, stateValue);
        city.value = ""
    }

};

// API Connection //
// retrieve lat and lon //
var getCoordinates = function(cityValue, stateValue) {
    //console.log(cityValue, stateValue)
    //var requestURL = "http://api.openweathermap.org/geo/1.0/direct?q=Winters,TX,{country}&appid=097a5ac483594b0099362e36fa245dbe";
    var requestURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityValue + "," + stateValue + "{country}&appid=" + apiKey;

    console.log(requestURL)

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

        //error handling 
        .catch(function(response) {
            if(response.status === 302 || response.status === 400) {
                console.log("status error")
                // when I enter a city that doesn't exist, I still get status code 200
                // so this wouldn't work like this by status
                alert("Please enter a valid city.");
            }
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
        //apiState = coordinatesData[i].state;


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
    cityPlusDate.textContent = ""
    currentTemp.textContent = ""
    forecasticon1.src = ""
    currentWind.textContent = ""
    currentHumidity.textContent = ""
    currentUVindex.textContent = ""


    // setting text contents
    // city plus date, header
    //cityPlusDate.textContent=(apiCity + "," + apiState + "  (" + todayDate + ")");
    cityPlusDate.textContent=(apiCity  + "  (" + todayDate + ")");

    // current icon
    console.log(weatherData.current.weather[0].icon)
    currentIcon1.src = "https://openweathermap.org/img/wn/" + weatherData.current.weather[0].icon + "@2x.png"
    currentIcon1.setAttribute("width","60")
    currentIcon1.setAttribute("height","60")
    currentIcon1.classList.add("forecast-icon")
    currentIcon1.style.visibility="visible";


    // current temp
    // how do you get the degree symbol?
    currentTemp.textContent = "Temp: " + weatherData.current.temp + " F"

    // current wind
    currentWind.textContent = "Wind: " + weatherData.current.wind_speed + " MPH"

    //current humidity
    currentHumidity.textContent = "Humidity: " + weatherData.current.humidity + " %"

    //current uvindex 
    if (weatherData.current.uvi <= 2) {
        currentUVindex.textContent = "UV Index: " + weatherData.current.uvi
        currentUVindex.classList.add("uvindex-green");
    } else if (weatherData.current.uvi >= 3 && weatherData.current.uvi <= 5) {
        currentUVindex.textContent = "UV Index: " + weatherData.current.uvi
        currentUVindex.classList.add("uvindex-yellow");
    } else if (weatherData.current.uvi >= 6 && weatherData.current.uvi <= 7) {
        currentUVindex.textContent = "UV Index: " + weatherData.current.uvi
        currentUVindex.classList.add("uvindex-orange");
    } else if (weatherData.current.uvi >= 8 && weatherData.current.uvi <= 10) {
        currentUVindex.textContent = "UV Index: " + weatherData.current.uvi
        currentUVindex.classList.add("uvindex-red");
    } else if (weatherData.current.uvi >= 11) {
        currentUVindex.textContent = "UV Index: " + weatherData.current.uvi
        currentUVindex.classList.add("uvindex-violet");
    }


    //append
    currentWeatherHeaderIconDiv.appendChild(cityPlusDate);
    currentWeatherHeaderIconDiv.appendChild(currentIcon1);
    currentWeatherContainer.style.borderColor = "black";
    currentWeatherContainer.appendChild(currentTemp);
    currentWeatherContainer.appendChild(currentWind);
    currentWeatherContainer.appendChild(currentHumidity);
    currentWeatherContainer.appendChild(currentUVindex);

}


var displayForecastWeatherData = function(weatherData) {


    //cardGroup.classList.add("visible")
    //cardBody1.classList.add("visible")

    // add forecast-cards style to these containers weather-card-container-1

    // clear contents
    forecastHeader.textContent=""
    forecastDate1.textContent=""
    forecasticon1.src = "..."
    forecastTemp1.textContent=""
    forecastWind1.textContent=""
    forecastHumidity1.textContent=""

    forecastDate2.textContent=""
    forecasticon2.src = "..."
    forecastTemp2.textContent=""
    forecastWind2.textContent=""
    forecastHumidity2.textContent=""

    forecastDate3.textContent=""
    forecasticon3.src = "..."
    forecastTemp3.textContent=""
    forecastWind3.textContent=""
    forecastHumidity3.textContent=""

    forecastDate4.textContent=""
    forecasticon4.src = "..."
    forecastTemp4.textContent=""
    forecastWind4.textContent=""
    forecastHumidity4.textContent=""

    forecastDate5.textContent=""
    forecasticon5.src = "..."
    forecastTemp5.textContent=""
    forecastWind5.textContent=""
    forecastHumidity5.textContent=""

    // 5-day forecase header
    forecastHeader.textContent="5-day Forecast"
    forecastHeader.style.visibility="visible";


    // ** CARD 1 ** //

    //give class to container1
    var weatherCardContainer1 = document.getElementById("weather-card-container-1")
    weatherCardContainer1.classList.add("text-white", "bg-secondary" ,"forecast-cards", "visible")

    //covert date1
    unixTime1 = weatherData.daily[1].dt
    var date1 = new Date(unixTime1 * 1000)
    forecastDate1.textContent=date1.toLocaleDateString("en-US")
    forecastDate1.classList.add("card-title")
    forecastDate1.style.visibility="visible";

    // get icon1
    forecasticon1.src = "https://openweathermap.org/img/wn/" + weatherData.daily[1].weather[0].icon + "@2x.png"
    forecasticon1.setAttribute("width","70")
    forecasticon1.setAttribute("height","70")
    forecasticon1.style.visibility="visible";
    
    //get temp1
    forecastTemp1.textContent = "Temp: " + weatherData.daily[1].temp.day + " F"
    forecastTemp1.style.visibility="visible";

    //get wind1
    forecastWind1.textContent = "Wind: " + weatherData.daily[1].wind_speed + " MPH"
    forecastWind1.style.visibility="visible";

    //get humidity1
    forecastHumidity1.textContent = "Humidity: " + weatherData.daily[1].humidity + " %"
    forecastHumidity1.style.visibility="visible";


    // ** CARD 2 ** //

    //give class to container2
    var weatherCardContainer2 = document.getElementById("weather-card-container-2")
    weatherCardContainer2.classList.add("text-white", "bg-secondary" ,"forecast-cards", "visible")

    //covert date2
    unixTime2 = weatherData.daily[2].dt
    var date2 = new Date(unixTime2 * 1000)
    forecastDate2.textContent=date2.toLocaleDateString("en-US")
    forecastDate2.classList.add("card-title")
    forecastDate2.style.visibility="visible";

    // get icon2
    forecasticon2.src = "https://openweathermap.org/img/wn/" + weatherData.daily[2].weather[0].icon + "@2x.png"
    forecasticon2.setAttribute("width","70")
    forecasticon2.setAttribute("height","70")
    forecasticon2.classList.add("forecast-icon")
    forecasticon2.style.visibility="visible";
    
    //get temp2
    forecastTemp2.textContent = "Temp: " + weatherData.daily[2].temp.day + " F"
    forecastTemp2.style.visibility="visible";

    //get wind2
    forecastWind2.textContent = "Wind: " + weatherData.daily[2].wind_speed + " MPH"
    forecastWind2.style.visibility="visible";

    //get humidity2
    forecastHumidity2.textContent = "Humidity: " + weatherData.daily[2].humidity + " %"
    forecastHumidity2.style.visibility="visible";


    // ** CARD 3 ** //

    //give class to container3
    var weatherCardContainer3 = document.getElementById("weather-card-container-3")
    weatherCardContainer3.classList.add("text-white", "bg-secondary" ,"forecast-cards", "visible")

    unixTime3 = weatherData.daily[3].dt
    var date3 = new Date(unixTime3 * 1000)
    forecastDate3.textContent=date3.toLocaleDateString("en-US")
    forecastDate3.classList.add("card-title")
    forecastDate3.style.visibility="visible";

    // get icon3
    forecasticon3.src = "https://openweathermap.org/img/wn/" + weatherData.daily[3].weather[0].icon + "@2x.png"
    forecasticon3.setAttribute("width","70")
    forecasticon3.setAttribute("height","70")
    forecasticon3.classList.add("forecast-icon")
    forecasticon3.style.visibility="visible";
    
    //get temp3
    forecastTemp3.textContent = "Temp: " + weatherData.daily[3].temp.day + " F"
    forecastTemp3.style.visibility="visible";

    //get wind3
    forecastWind3.textContent = "Wind: " + weatherData.daily[3].wind_speed + " MPH"
    forecastWind3.style.visibility="visible";

    //get humidity3
    forecastHumidity3.textContent = "Humidity: " + weatherData.daily[3].humidity + " %"
    forecastHumidity3.style.visibility="visible";


    // ** CARD 4 ** //

    //give class to container4
    var weatherCardContainer4 = document.getElementById("weather-card-container-4")
    weatherCardContainer4.classList.add("text-white", "bg-secondary" ,"forecast-cards", "visible")


    unixTime4 = weatherData.daily[4].dt
    var date4 = new Date(unixTime4 * 1000)
    forecastDate4.textContent=date4.toLocaleDateString("en-US")
    forecastDate4.classList.add("card-title")
    forecastDate4.style.visibility="visible";

    // get icon4
    forecasticon4.src = "https://openweathermap.org/img/wn/" + weatherData.daily[4].weather[0].icon + "@2x.png"
    forecasticon4.setAttribute("width","70")
    forecasticon4.setAttribute("height","70")
    forecasticon4.classList.add("forecast-icon")
    forecasticon4.style.visibility="visible";
    
    //get temp4
    forecastTemp4.textContent = "Temp: " + weatherData.daily[4].temp.day + " F"
    forecastTemp4.style.visibility="visible";

    //get wind4
    forecastWind4.textContent = "Wind: " + weatherData.daily[4].wind_speed + " MPH"
    forecastWind4.style.visibility="visible";

    //get humidity4
    forecastHumidity4.textContent = "Humidity: " + weatherData.daily[4].humidity + " %"
    forecastHumidity4.style.visibility="visible";


    // ** CARD 5 ** //

    //give class to container5
    var weatherCardContainer5 = document.getElementById("weather-card-container-5")
    weatherCardContainer5.classList.add("text-white", "bg-secondary" ,"forecast-cards", "visible")

    unixTime5 = weatherData.daily[5].dt
    var date5 = new Date(unixTime5 * 1000)
    forecastDate5.textContent=date5.toLocaleDateString("en-US")
    forecastDate5.classList.add("card-title")
    forecastDate5.style.visibility="visible";

    // get icon5
    forecasticon5.src = "https://openweathermap.org/img/wn/" + weatherData.daily[5].weather[0].icon + "@2x.png"
    forecasticon5.setAttribute("width","70")
    forecasticon5.setAttribute("height","70")
    forecasticon5.classList.add("forecast-icon")
    forecasticon5.style.visibility="visible";
    
    //get temp5
    forecastTemp5.textContent = "Temp: " + weatherData.daily[5].temp.day + " F"
    forecastTemp5.style.visibility="visible";

    //get wind5
    forecastWind5.textContent = "Wind: " + weatherData.daily[5].wind_speed + " MPH"
    forecastWind5.style.visibility="visible";

    //get humidity5
    forecastHumidity5.textContent = "Humidity: " + weatherData.daily[5].humidity + " %"
    forecastHumidity5.style.visibility="visible";


    //apppend All
    cardBody1.appendChild(forecastDate1);
    cardBody1.appendChild(forecasticon1);
    cardBody1.appendChild(forecastTemp1);
    cardBody1.appendChild(forecastWind1);
    cardBody1.appendChild(forecastHumidity1);

    cardBody2.appendChild(forecastDate2);
    cardBody2.appendChild(forecasticon2);
    cardBody2.appendChild(forecastTemp2);
    cardBody2.appendChild(forecastWind2);
    cardBody2.appendChild(forecastHumidity2);

    cardBody3.appendChild(forecastDate3);
    cardBody3.appendChild(forecasticon3);
    cardBody3.appendChild(forecastTemp3);
    cardBody3.appendChild(forecastWind3);
    cardBody3.appendChild(forecastHumidity3);

    cardBody4.appendChild(forecastDate4);
    cardBody4.appendChild(forecasticon4);
    cardBody4.appendChild(forecastTemp4);
    cardBody4.appendChild(forecastWind4);
    cardBody4.appendChild(forecastHumidity4);

    cardBody5.appendChild(forecastDate5);
    cardBody5.appendChild(forecasticon5);
    cardBody5.appendChild(forecastTemp5);
    cardBody5.appendChild(forecastWind5);
    cardBody5.appendChild(forecastHumidity5);

    storeWeather();
}


var storeWeather = function() {
    
    var cityHistoryArray = JSON.parse(localStorage.getItem("cityHistoryArray"));
    if (cityHistoryArray === null) {
        var cityHistoryArray = [ ];
    }

    //store the values display on page
    //cityHistoryArray.push({city: apiCity, state: apiState, lat: lat, lon: lon}) 

    var foundInArray = false;

    for (let index = 0; index < cityHistoryArray.length; index++) {
        //console.log (cityHistoryArray[i].city)
        //console.log (apiCity)
        if (cityHistoryArray[index].city === apiCity) {
            console.log("found existing city")
            foundInArray = true;
            return;
        
        }
    }

    if (!foundInArray) {
        cityHistoryArray.push({city: apiCity, lat: lat, lon: lon}) 
        localStorage.setItem("cityHistoryArray", JSON.stringify(cityHistoryArray));
    }

    console.log(cityHistoryArray.includes({city: apiCity, lat: lat, lon: lon}))


    //clear the button container
    historyWeatherContainer.innerHTML = ""

    for (var i = 0; i < cityHistoryArray.length; i++) {
        var cityHistoryBtn = document.createElement("button")
        
        //append the buttons
        cityHistoryBtn.textContent = cityHistoryArray[i].city
        cityHistoryBtn.classList.add("weather-history-button")
        historyWeatherContainer.appendChild(cityHistoryBtn)

        // create the on click event for history button
        cityHistoryBtn.addEventListener("click", function() {
            
            //run getCoordinates
            getCoordinates(this.innerHTML,stateValue);

            //appending buttons but I don't want to at this point

        })
    }       
}




// on click event to kick off API
searchBtn.addEventListener("click", inputHandler)
