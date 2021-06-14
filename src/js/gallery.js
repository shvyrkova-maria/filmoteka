import cardTpl from '../templates/card-template.hbs';
import debounce from 'lodash.debounce';
import fetchApiFilms from './apiService';
import { startSpin, stopSpin } from './spinner';

const fetchFilms = new fetchApiFilms();

const refs = {
  gallery: document.querySelector('.js-gallery'),
  search: document.querySelector('.header__form-input'),
  searchError: document.querySelector('.header__error-text'),
};

createPopularMoviesGallery();
refs.search.addEventListener('input', debounce(onInputChange, 1000));

//рендер после ввода в input
function onInputChange(evt) {
  fetchFilms.query = evt.target.value;
  clearGalleryMarkup();

  if (fetchFilms.query) {
    fetchFilms.resetPageNum();
    createMoviesGallery();
  } else {
    createPopularMoviesGallery();
    refs.searchError.classList.add('is-hidden');
  }
}

//рендер популярных фильмов
function createPopularMoviesGallery() {
  clearGalleryMarkup();
  startSpin();
  fetchFilms
    .fetchPopularMovies()
    .then(makeGalleryMarkup)
    .catch(error => console.log(error))
    .finally(stopSpin);
}

//рендер по результату поиска фильмов
function createMoviesGallery() {
  startSpin();
  fetchFilms
    .fetchSearchMovies()
    .then(movies => {
      if (movies.length === 0) {
        refs.searchError.classList.remove('is-hidden');
        createPopularMoviesGallery(); //??
      } else {
        makeGalleryMarkup(movies);
      }
    })
    .catch(error => console.log(error))
    .finally(stopSpin);
}

//рендер сoxраненных фильмов
function makeLibraryGallery(id) {
  clearGalleryMarkup();
  startSpin();
  let filmsList = [];
  fetchFilms
    .fetchFilmByID(id)
    .then(result => {
      filmsList.push(result);
      return filmsList;
    })
    .then(films => {
      makeGalleryMarkup(films);
      document.querySelectorAll('.film-average').forEach(el => el.classList.remove('is-hidden'));
    })
    .catch(error => console.log(error))
    .finally(stopSpin);
}

function makeGalleryMarkup(movies) {
  refs.gallery.insertAdjacentHTML('beforeend', cardTpl(movies));
}

function clearGalleryMarkup() {
  refs.gallery.innerHTML = '';
}

export { fetchFilms, createPopularMoviesGallery, makeLibraryGallery, clearGalleryMarkup };
