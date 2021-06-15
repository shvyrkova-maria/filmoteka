import cardTpl from '../templates/card-template.hbs';
import debounce from 'lodash.debounce';
import fetchApiFilms from './apiService';
import { startSpin, stopSpin } from './spinner';

const fetchFilms = new fetchApiFilms();

const refs = {
  gallery: document.querySelector('.js-gallery'),
  search: document.querySelector('.header__form-input'),
  searchError: document.querySelector('.header__error-text'),
  searchErrorImg: document.querySelector('.error-notify'),
  emptyLibraryImg: document.querySelector('.info-notify'),
};

createPopularMoviesGallery();
refs.search.addEventListener('input', debounce(onInputChange, 1000));
refs.search.addEventListener('keydown', preventOnEnterSubmit);

// ----- home ввод в input
function onInputChange(evt) {
  fetchFilms.query = evt.target.value;
  clearGalleryMarkup();

  if (fetchFilms.query) {
    fetchFilms.resetPageNum();
    createSearchMoviesGallery();
  } else {
    createPopularMoviesGallery();
  }
}

// ----- home рендер популярных фильмов
function createPopularMoviesGallery() {
  clearGalleryMarkup();
  hideInfoImg();
  startSpin();

  fetchFilms.fetchPopularMovies().then(makeGalleryMarkup).catch(console.log).finally(stopSpin);
}

// ----- home рендер по результату поиска
function createSearchMoviesGallery() {
  startSpin();
  fetchFilms
    .fetchSearchMovies()
    .then(movies => {
      if (movies.length === 0) {
        renderInfoMsg();
        renderInfoImg(refs.searchErrorImg);
      } else {
        makeGalleryMarkup(movies);
      }
    })
    .catch(console.log)
    .finally(stopSpin);
}

// ----- library запрос сoxраненных фильмов
function makeLibraryGallery(id) {
  clearGalleryMarkup();
  hideInfoImg();
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
    .catch(console.log)
    .finally(stopSpin);
}

// ----- library рендер сoxраненных фильмов
function renderLibraryGallery(ids) {
  clearGalleryMarkup();
  hideInfoImg();
  if (ids.length === 0) {
    renderInfoImg(refs.emptyLibraryImg);
  }
  ids.forEach(id => makeLibraryGallery(id));
}

// -----  home library разметка сoздание и чистка
function makeGalleryMarkup(movies) {
  refs.gallery.insertAdjacentHTML('beforeend', cardTpl(movies));
}

function clearGalleryMarkup() {
  refs.gallery.innerHTML = '';
}

// -----  input
function preventOnEnterSubmit(event) {
  if (event.code === 'Enter' || event.keyCode === 13) {
    event.preventDefault();
    return;
  }
}

// -----  notifications
function renderInfoMsg() {
  refs.searchError.classList.remove('is-hidden');
  setTimeout(() => refs.searchError.classList.add('is-hidden'), 2500);
}

function renderInfoImg(notifyEl) {
  notifyEl.classList.remove('is-hidden');
}

function hideInfoImg() {
  refs.searchErrorImg.classList.add('is-hidden');
  refs.emptyLibraryImg.classList.add('is-hidden');
}

export { fetchFilms, clearGalleryMarkup, createPopularMoviesGallery, renderLibraryGallery };
