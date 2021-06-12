import cardTpl from '../templates/card-template.hbs';
import debounce from 'lodash.debounce';
import fetchApiFilms from './apiService.js';

const fetchFilms = new fetchApiFilms();

const refs = {
  gallery: document.querySelector('.js-gallery'),
  search: document.querySelector('.header__form-input'),
  searchError: document.querySelector('.header__error-text'),
};

createPopularMoviesGallery();
refs.search.addEventListener('input', debounce(onInputChange, 1000));

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
  fetchFilms
    .fetchPopularMovies()
    .then(makeGalleryMarkup)
    .catch(err => {
      console.log(err);
    });
}

//рендер по результату поиска фильмов
function createMoviesGallery() {
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
    .catch(err => {
      console.log(err);
    });
}

function makeGalleryMarkup(movies) {
  refs.gallery.insertAdjacentHTML('beforeend', cardTpl(movies));
}

function clearGalleryMarkup() {
  refs.gallery.innerHTML = '';
}


export { fetchFilms, createPopularMoviesGallery }; 