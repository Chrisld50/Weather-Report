var SearchWeather = document.querySelector('#search-weather');
var cityWeather = document.querySelector('.city-weather');
var cityText = document.querySelector('#city-text');
var searchButton = document.querySelector(".searchBtn");
const APIKey = "5292a248e8acdb206f3b3112df2113a7";
function findCity(event){
    event.preventDefault();

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityText.value + "&appid=" + APIKey +'&units=imperial';
    fetch(queryURL)
    .then(function (response) {
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    
    console.log(queryURL)

    .then(function printResults(data){
        for (let i = 0; i < data.length; i++) {
           var cityCurrent = document.createElement('h2');
            var cityTemp = document.createElement('p');
            var cityWind = document.createElement('p');
            var cityHumidity = document.createElement('p');
            var cityUV = document.createElement('p');
            cityCurrent.textContent = data[i].name;
            cityTemp.textContent = data[i].temp;
            cityWind.textContent = data[i].wind;
            cityHumidity.textContent = data[i].humidity;
            cityWeather.append(cityCurrent);
            cityWeather.append(cityTemp);
            cityWeather.append(cityWind);
            cityWeather.append(cityHumidity);
            
            
        }
    }


    // pull: Temp, date, an image of what the weather is, wind, humidity and UV index for main.
    // pull for 5 day forcast: date, image of condition, temp, wind, humidity. 

}
searchButton.addEventListener('click', findCity)
