var SearchWeather = document.querySelector('#search-weather');
var cityWeather = document.querySelector('.city-weather');
var cityText = document.querySelector('#city-text');
var searchButton = document.querySelector(".searchBtn");
var weekForecast = document.querySelector('.forecast-5');
const APIKey = "5292a248e8acdb206f3b3112df2113a7";



function findCity(event){
    event.preventDefault();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityText.value + "&appid=" + APIKey +'&units=imperial';
  

    fetch(queryURL)
    .then(function (response) {
        return response.json()

    })
    .then(function (data){
    let latitude = data.coord.lat;
    let longitude = data.coord.lon;
    let forecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=imperial`;
    let uvURL = 'http://api.openweathermap.org/data/2.5/uvi?appid=' + APIKey + '&lat=' + latitude + '&lon=' + longitude;
     

    fetch(forecastURL)
    .then(response => {
         return response.json()
    })

     .then(forecastData => {
         console.log(forecastData.list)
         let index = [0, 8 , 16, 24, 32];
         for (x of index){
            let date = document.createElement('h3');
            let icon = document.createElement('img');
            let temp = document.createElement('p');
            let windSpeed = document.createElement('p');
            let humidity = document.createElement('p');
            date.textContent = forecastData.list[x].dt;
            icon.src = "http://openweathermap.org/img/wn/" +  data.weather[0].icon + "@2x.png";
            temp.textContent = forecastData.list[x].main.temp;
            windSpeed.textContent= forecastData.list[x].wind.speed;
            humidity.textContent = forecastData.list[x].main.humidity;

            weekForecast.append(date, icon, temp, windSpeed, humidity);
            
         }


        });

            var cityCurrent = document.createElement('h2');
            var cityTemp = document.createElement('p');
            var cityWind = document.createElement('p');
            var cityHumidity = document.createElement('p');
            var cityUV = document.createElement('p');
            var cityImage = document.createElement('img'); 
            cityCurrent.textContent = data.name + ' ' + moment().format("MMM Do YY");
            cityTemp.textContent = 'Temp: ' + data.main.temp + ' F';
            cityWind.textContent = 'Wind: ' + data.wind.speed + ' MPH';
            cityHumidity.textContent = 'Humidity: ' + data.main.humidity + ' %';

            cityImage.src = "http://openweathermap.org/img/wn/" +  data.weather[0].icon + "@2x.png";


            fetch(uvURL)
            .then(response => {
                return response.json()
            
            }).then(uvData => {
                cityUV.textContent = 'UV: ' + uvData.value + ' %';
            }) 
            cityWeather.append(cityCurrent);
            cityWeather.append(cityTemp);
            cityWeather.append(cityWind);
            cityWeather.append(cityHumidity);
            cityWeather.append(cityUV);
            cityWeather.append(cityImage);  
            

     })


    // pull: Temp, date, an image of what the weather is, wind, humidity and UV index for main.
    // pull for 5 day forcast: date, image of condition, temp, wind, humidity. 

}
searchButton.addEventListener('click', findCity)
