function nav_toggle() {
  const button = document.getElementById('menu__collapse')
  const nav_toggle = document.getElementById('menu__links')

  button.classList.toggle('active')
  nav_toggle.classList.toggle('active')
}

// TIMESTAMP
function time() {
  today = new Date();
  h = today.getHours();
  m = today.getMinutes();

  if (h < 12) {
    document.getElementById("time").innerHTML = h + ":" + m + " AM";
    setTimeout("time()", 500);
  } else {
    document.getElementById("time").innerHTML = h + ":" + m + " PM";
    setTimeout("time()", 500);
  }
}

// MOVIES
const API_KEY = "03c4e3dc470296959d6bf68804146538";
const API_LANGUAGE = "pt-br";

let movie_active = "tt1877830"

const LIST_MOVIES = [
  "tt1877830",
  "tt7286456",
  "tt0137523",
  "tt1853728",
  "tt4633694",
  "tt0454921",
  "tt2980516",
  "tt2084970",
  "tt4857264",
  "tt10298810",
  "tt1464335",
  "tt2463208",
  "tt7991608",
  "tt11286314",
  "tt9620288",
];

function get_url_movie(movieId) {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${API_LANGUAGE}`;
}

const moviesList = document.getElementById("movies__list");

function create_movie(movieId) {
  fetch(get_url_movie(movieId))
    .then((response) => response.json())
    .then((data) => {
      const movie = document.createElement("li");
      const genre = `<span>${data.genres[0].name}</span>`;
      const stars = `<img src="./assets/img/Rating.svg" id="stars" alt="">`;
      const title = `<strong>${data.title}</strong>`;
      const image = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;

      movie.innerHTML = genre + stars + title;
      movie.style.backgroundImage = `linear-gradient(180deg, rgba(14, 23, 47, 0.0001) 11.72%, #0E172F 100%), url('${image}')`;
      moviesList.appendChild(movie);
      movie.setAttribute('id', movieId)

      movie.onclick = () => {
        set_active_movie(movieId)

        fetch(get_url_movie(movieId))
          .then((response) => response.json())
          .then((data) => {
            const app = document.getElementById("app");

            const movie_title = document.querySelector(".movie h2");
            const sinopse = document.querySelector(".movie #description");
            const category = document.querySelector(".movie span");

            const runtime = document.querySelector(".rating__time p");

            movie_title.innerHTML = data.title;
            sinopse.innerHTML = data.overview;
            category.innerHTML = data.genres[0].name;
            runtime.innerHTML = data.runtime + ' minutos';

            const image = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
            app.style.backgroundImage = `linear-gradient(90.18deg, rgba(13, 22, 46, 0.7) 23.21%, rgba(13, 22, 46, 0.0001) 96.69%), url('${image}')`;            
          });
      };
    });
}

function set_active_movie(newMovieActive) {
  const movie_current = document.getElementById(movie_active)
  movie_current.classList.remove('active-movie')

  const movie_active_new = document.getElementById(newMovieActive)
  movie_active_new.classList.add('active-movie')

  movie_active = newMovieActive
}

function load_list_movies() {
  LIST_MOVIES.map(create_movie);
}

function load_first_movie() {
  const app = document.getElementById("app");

  const movie_title = document.querySelector(".movie h2");
  const sinopse = document.querySelector(".movie #description");
  const category = document.querySelector(".movie span");

  const runtime = document.querySelector(".rating__time p");

  movie_title.innerHTML = 'Batman';
  sinopse.innerHTML = 'Após dois anos espreitando as ruas como Batman, Bruce Wayne se encontra nas profundezas mais sombrias de Gotham City. Com poucos aliados confiáveis, o vigilante solitário se estabelece como a personificação da vingança para a população.';
  category.innerHTML = 'Crime';
  runtime.innerHTML = "185 minutos";

  const image = 'https://image.tmdb.org/t/p/original/IYUD7rAIXzBM91TT3Z5fILUS7n.jpg';
  app.style.backgroundImage = `linear-gradient(90.18deg, rgba(13, 22, 46, 0.7) 23.21%, rgba(13, 22, 46, 0.0001) 96.69%), url('${image}')`;
}

load_first_movie();

load_list_movies();
