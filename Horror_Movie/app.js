const API_Key = 'api_key=80689e52a4f65d58050c47dc30e5c578';
const Base_URL = 'https://api.themoviedb.org/3';
const API_URL = Base_URL + '/discover/movie?with_genres=27&primary_release_year=2021&'+ API_Key;

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = Base_URL + '/search/movie?' + 'with_genres=27&primary_release_year=2021&' + API_Key;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
getMovies(API_URL);

function getMovies(url){

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    })
}

function showMovies(data){
    main.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        Full_Image_URL = IMG_URL+poster_path
        if (poster_path == null) {
            Full_Image_URL = 'https://www.malaco.com/wp-content/uploads/2016/06/no-photo-available-black-profile.jpg'
        }
        movieEl.innerHTML = `
        <img src="${Full_Image_URL}" alt= "${title}">
            <alt="image">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieEl);

    })
}

function getColor(vote){
    if(vote >= 7) {
        return 'green'
    }else if (vote >= 5.5){
        return 'orange'
    }else {
        return ' red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchterm = search.value;

    if(searchterm){
        getMovies(searchURL+'&query='+searchterm)
    } else {
        getMovies(API_URL);
    }
})

