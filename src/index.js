import MovieApi from './modules/api.js';
import ShowMovie from './modules/showMovies.js';
import './styles.css';

let apiKey = JSON.stringify(localStorage.getItem('apikey'));
if (!apiKey) {
  MovieApi.getApiKey().then((resp) => {
    apiKey = resp;
    localStorage.setItem('apikey', apiKey);
  });
}

// ItemsCounter.countItems(displayCounter);
const displayMovies = document.getElementById('movies');
const result = MovieApi.getMovies(displayMovies);
result.then((res) => {
  const likes = MovieApi.getLikes();
  likes.then((resp) => {
    ShowMovie.showMovies(res.Movies, res.Display, resp.Likes);
  });
});
