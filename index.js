// TIMESTAMP
function time() {
    today = new Date();
    h = today.getHours();
    m = today.getMinutes();

    if (h < 12) {
        document.getElementById('time').innerHTML= h + ':' + m + ' AM';
        setTimeout('time()', 500);
    }else {
        document.getElementById('time').innerHTML= h + ':' + m + ' PM';
        setTimeout('time()', 500);
    }
}

// MOVIES 
const API_KEY = '03c4e3dc470296959d6bf68804146538'
const API_LANGUAGE = 'pt-br'

const LIST_MOVIES = ['tt1877830', 'tt10872600', 'tt1211837', 'tt7286456','tt0816692' ,'tt0137523', 'tt1853728', 'tt1375666']

function get_url_movie(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${API_LANGUAGE}`
}

fetch(get_url_movie(LIST_MOVIES[0]))
.then(response  => response.json())
.then(data => {
    console.log(data)
    
    const app = document.getElementById('app')

    const movie_title = document.querySelector('.movie h2')
    const sinopse = document.querySelector('.movie #description')
    const category = document.querySelector('.movie span')

    const runtime = document.querySelector('.rating__time p')
    
    movie_title.innerHTML = data.title
    sinopse.innerHTML = data.overview
    category.innerHTML = data.genres[0].name
    runtime.innerHTML = data.runtime + ' minutos'

    const image = `https://image.tmdb.org/t/p/original${data.backdrop_path}`
    app.style.backgroundImage = `linear-gradient(90.18deg, rgba(13, 22, 46, 0.7) 23.21%, rgba(13, 22, 46, 0.0001) 96.69%), url('${image}')`
})

const moviesList = document.getElementById('movies__list')

function create_movie(movieId) {
    fetch(get_url_movie(movieId)).then(response  => response.json()).then(data => {
        const movie = document.createElement('li')
        const genre = `<span>${data.genres[0].name}</span>`
        const stars = `<img src="./assets/img/Rating.svg" id="stars" alt="">`
        const title = `<strong>${data.title}</strong>`
        const image = `https://image.tmdb.org/t/p/original${data.backdrop_path}`

        movie.innerHTML = genre + stars + title
        movie.style.backgroundImage = `linear-gradient(180deg, rgba(14, 23, 47, 0.0001) 11.72%, #0E172F 100%), url('${image}')`

        moviesList.appendChild(movie)
    })
}

function load_list_movies() {
    LIST_MOVIES.map(create_movie)
}

load_list_movies()

