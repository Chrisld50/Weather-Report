var citySearch = document.querySelector('#city-search')

function findCity(event){
    event.preventDefault();

    var searchButton = document.querySelector('.searchBtn')

    if (!searchButton) {
        console.error('You need to put in a city!')
        return;
    }

    var queryString = './search-results.html?q=' + searchButton

   location.assign(queryString)
}

citySearch.addEventListener('submit', findCity)