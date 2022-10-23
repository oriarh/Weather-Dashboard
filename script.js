//ISSUES
    //When I reload the page, the i becomes 0

var searchButton = document.querySelector (".searchButton");
var inputBar = document.querySelector("#input");
var column1 = document.querySelector(".column1");
var cityNameAndDate = document.getElementById("cityName");
var dateToday = moment().format("MM/DD/YYYY");

//Retrieves history from local storage
for (i=1;i<9;i++) {
    if(localStorage.getItem("search"+i) != null) {
        var searchHistory = document.createElement('li');
        searchHistory.textContent = JSON.parse(localStorage.getItem("search"+i)); 
        column1.appendChild(searchHistory);
        searchHistory.setAttribute("class","searchHistory");
    }
}

//Saves search history to local storage
var i = 1;
searchButton.addEventListener ('click',function () {
    localStorage.setItem("search"+i,JSON.stringify(inputBar.value));
    var searchHistory = document.createElement('li');
    searchHistory.textContent = JSON.parse(localStorage.getItem("search"+i)); 
    column1.appendChild(searchHistory);
    searchHistory.setAttribute("class","searchHistory");
    i++;
    cityNameAndDate.textContent = inputBar.value + " " + "(" + dateToday + ")";
    var geoCode = "https://api.openweathermap.org/geo/1.0/direct?q="+ inputBar.value + "&limit=1&appid=bc3b11dfa1ca8da93c5ea23cf8c6d41d";
    getCoordinates(geoCode);
    fiveDayForecast(geoCode);
    document.querySelector(".column2").style.display = "block";
    }
);

//This API gets the Latitude and Longitude of the city being searched for
function getCoordinates(geoCode) {
    fetch(geoCode)
    .then(function(response) {
        console.log(response.status);  
        return response.json();  
        }
    )
    .then(function(data) {
        console.log(data);
        var lat = data[0].lat;
        var lon = data[0].lon;
        return fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=bc3b11dfa1ca8da93c5ea23cf8c6d41d")
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data);
                document.getElementById("iconToday").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
                document.getElementById("tempToday").textContent = data.main.temp + " MPH";
                document.getElementById("windToday").textContent = data.wind.speed + "°F";
                document.getElementById("humidityToday").textContent = data.main.humidity + "%";
            })
        })
    };


function fiveDayForecast(geoCode) {
    fetch(geoCode)
    .then(function(response) {
        console.log(response.status);  
        return response.json();  
        }
    )
    .then(function(data) {
        console.log(data);
        var lat = data[0].lat;
        var lon = data[0].lon;
        return fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=bc3b11dfa1ca8da93c5ea23cf8c6d41d")
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data);
                document.getElementById("iconDay1").src = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png"
                document.getElementById("date1").textContent = moment().add(1,'days').format("MM/DD/YYYY");
                document.getElementById("tempDay1").textContent = data.list[0].main.temp + " MPH";
                document.getElementById("windDay1").textContent = data.list[0].wind.speed + "°F";
                document.getElementById("humidityDay1").textContent = data.list[0].main.humidity + "%";

                document.getElementById("iconDay2").src = "https://openweathermap.org/img/wn/" + data.list[6].weather[0].icon + "@2x.png"
                document.getElementById("date2").textContent = moment().add(2,'days').format("MM/DD/YYYY");
                document.getElementById("tempDay2").textContent = data.list[6].main.temp + " MPH";
                document.getElementById("windDay2").textContent = data.list[6].wind.speed + "°F";
                document.getElementById("humidityDay2").textContent = data.list[6].main.humidity + "%";

                document.getElementById("iconDay3").src = "https://openweathermap.org/img/wn/" + data.list[14].weather[0].icon + "@2x.png"
                document.getElementById("date3").textContent = moment().add(3,'days').format("MM/DD/YYYY");
                document.getElementById("tempDay3").textContent = data.list[14].main.temp + " MPH";
                document.getElementById("windDay3").textContent = data.list[14].wind.speed + "°F";
                document.getElementById("humidityDay3").textContent = data.list[14].main.humidity + "%";

                document.getElementById("iconDay4").src = "https://openweathermap.org/img/wn/" + data.list[26].weather[0].icon + "@2x.png"
                document.getElementById("date4").textContent = moment().add(4,'days').format("MM/DD/YYYY");
                document.getElementById("tempDay4").textContent = data.list[26].main.temp + " MPH";
                document.getElementById("windDay4").textContent = data.list[26].wind.speed + "°F";
                document.getElementById("humidityDay4").textContent = data.list[26].main.humidity + "%";

                document.getElementById("iconDay5").src = "https://openweathermap.org/img/wn/" + data.list[30].weather[0].icon + "@2x.png"
                document.getElementById("date5").textContent = moment().add(5,'days').format("MM/DD/YYYY");
                document.getElementById("tempDay5").textContent = data.list[30].main.temp + " MPH";
                document.getElementById("windDay5").textContent = data.list[30].wind.speed + "°F";
                document.getElementById("humidityDay5").textContent = data.list[30].main.humidity + "%";
            })
        })
    };