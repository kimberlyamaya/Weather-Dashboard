// global variables ///
var searchBtn = document.getElementById("search-btn");
var apiKey = "097a5ac483594b0099362e36fa245dbe";
var limit = 5;
var city = document.getElementById("city-input");
var state = document.getElementById("state-input");
var cityValue = "";
var stateValue = "";

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
        getAPI(cityValue, stateValue, limit);
    }

};

// API Connection //
// retrieve lat and lon //
var getAPI = function(city, state, limit) {
    var requestURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "," + "{country}&limit=" + limit + "&appid=" + apiKey;  
    //var requestURL = "http://api.openweathermap.org/geo/1.0/direct?q=Winters,{state},{country}&limit=5&appid=097a5ac483594b0099362e36fa245dbe"

    console.log(city);

    fetch(requestURL)
    .then(function (response) {
        return(response).json();
    })
    .then(function (data) {
        // loop through data to parse out city, state, lat and lon
        console.log(data);
    })
}

// on click event to kick off API
searchBtn.addEventListener("click",inputHandler);