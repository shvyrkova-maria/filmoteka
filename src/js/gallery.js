import cardTpl from '../templates/card-template.hbs';
import fetchApiFilms from './js/apiService.js';

const fetchApiFilms = new fetchApiFilms();

const refs = {
  gallery: document.querySelector('#js-gallery'),
};

//рендер популярных фильмов
function createPopularMoviesGallery() {
  fetchApiFilms.fetchPopularMovies().then(makeGalleryMarkup).сatch(console.log); // переписать сatch, выводим ошибку или нотификашку?
}

//рендер по результату поиска фильмов
function createMoviesGallery() {
  fetchApiFilms
    .fetchSearchMovies()
    .then(movies => {
      if (movies.length === 0) {
        console.log('no matches');
      } else {
        makeGalleryMarkup(movies);
      }
    })
    .сatch(console.log); // переписать сatch, выводим ошибку или нотификашку?
}

function makeGalleryMarkup(movies) {
  refs.gallery.insertAdjacentHTML('beforeend', cardTpl(movies));
}

function clearGalleryMarkup() {
  refs.gallery.innerHTML = '';
}
