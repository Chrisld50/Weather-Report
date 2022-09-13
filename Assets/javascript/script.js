var SearchWeather = document.querySelector('#search-weather');
var cityWeather = document.querySelector('.city-weather');
var cityText = document.querySelector('#city-text');
var searchButton = document.querySelector(".searchBtn");
var weekForecast = document.querySelectorAll('.forecast-5');
let cityNameHistory = document.querySelector('.city-name-history');
const APIKey = "5292a248e8acdb206f3b3112df2113a7";

// Above are the global Variables I call in the function and the API key that was made. 


function findCity(event){
    event.preventDefault();
    console.log(event.target.innerText)
    var cityVal = cityText.value || event.target.innerText
    cityText.value = ''

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityVal + "&appid=" + APIKey +'&units=imperial';

    // above is the queryURL i created for the API to call what i need from the openweathermap.

    // my fetches and .thens are what help pull the data that i need and convert it into json.
    fetch(queryURL)
    .then(function (response) {
        return response.json()

    })
    .then(function (data){
    let latitude = data.coord.lat;
    let longitude = data.coord.lon;
    let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=imperial`;
    let uvURL = 'https://api.openweathermap.org/data/2.5/uvi?appid=' + APIKey + '&lat=' + latitude + '&lon=' + longitude;
     

    // I do the same here for the forecastURL.
    fetch(forecastURL)
    .then(response => {
         return response.json()
    })

     .then(forecastData => {
         let index = [0, 8 , 16, 24, 32];
         for (x of index){
            let date = document.createElement('h3');   // here my element is being created and added to the html. 
            let icon = document.createElement('img');
            let temp = document.createElement('p');
            let windSpeed = document.createElement('p');
            let humidity = document.createElement('p');
            date.textContent = moment(forecastData.list[x].dt_txt).format("MM/DD/YY");
            icon.src = "https://openweathermap.org/img/wn/" +  data.weather[0].icon + "@2x.png";
            temp.textContent ='Temp: ' + forecastData.list[x].main.temp + ' F';
            windSpeed.textContent='Wind: ' + forecastData.list[x].wind.speed + ' MPH';
            humidity.textContent ='Humidity: ' + forecastData.list[x].main.humidity + ' %';

            for (i=0; i<weekForecast.length; i++) {
             const allWeekWeather = weekForecast[i];
            allWeekWeather.append(date, icon, temp, windSpeed, humidity);
            }
         }


        });

            var cityCurrent = document.createElement('h2'); // the same is done here for the current City you type in. 
            var cityTemp = document.createElement('p');
            var cityWind = document.createElement('p');
            var cityHumidity = document.createElement('p');
            var cityUV = document.createElement('p');
            var cityImage = document.createElement('img'); 
            cityCurrent.textContent = data.name + ' ' + moment().format("MM/DD/YY");
            cityTemp.textContent = ' Temp: ' + data.main.temp + ' F ';
            cityWind.textContent = ' Wind: ' + data.wind.speed + ' MPH ';
            cityHumidity.textContent = ' Humidity: ' + data.main.humidity + ' % ';

            cityImage.src = "https://openweathermap.org/img/wn/" +  data.weather[0].icon + "@2x.png";


            // here is the fetch for the UVURL which was a different url I had to use to get the info for the UV data.
            fetch(uvURL)
            .then(response => {
                return response.json()
                
            
            }).then(uvData => {
                cityUV.textContent = 'UV: ' + uvData.value + ' %';
                if (uvData.vaue < 3) {
                    cityUV.classList.add('goodUV')        
                }
                if (uvData.value < 7){
                    cityUV.classList.remove('goodUV')
                    cityUV.classList.add('moderateUV')
                }
                if (uvData.value > 7){
                    cityCurrent.classList.remove('moderateUV')
                    cityUV.classList.add('severeUV')
                }
            }) 
            

            
            

            cityWeather.append(cityCurrent);
            cityWeather.append(cityTemp);
            cityWeather.append(cityWind);
            cityWeather.append(cityHumidity);
            cityWeather.append(cityUV);
            cityWeather.append(cityImage);  
            

     })

     var historyBtn = document.createElement('button');
     historyBtn.textContent = cityVal;
     historyBtn.setAttribute('class','buttonEl btn-dark col-8 mt-1')
     cityNameHistory.append(historyBtn);

//console.log(totalBtn)


}

// var totalBtn = document.querySelector('.buttonEl');
// console.log(totalBtn)
$(document).on("click", ".buttonEl", findCity);
searchButton.addEventListener('click',findCity)
// totalBtn.addEventListener('click', function(){
//     console.log('Hi')
// } )
  