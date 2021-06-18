import { clearGalleryMarkup, createPopularMoviesGallery } from './gallery';
import { checkSavedFilmsForRender } from './removeFromlocalStorage';

const refs = {
  headerBaground: document.querySelector('.header'),
  headerHomeBtn: document.querySelector('#headerHomeBtn'),
  headerLibraryBtn: document.querySelector('#headerLibraryBtn'),
  headerHomeContent: document.querySelector('.header__home-content'),
  headerLibraryContent: document.querySelector('.header__library-content'),
  pagination: document.querySelector('.pagination'),
};

refs.headerHomeBtn.addEventListener('click', changeHeaderHome);
refs.headerLibraryBtn.addEventListener('click', changeHeaderLibrary);

function changeHeaderHome() {
  createPopularMoviesGallery();
  refs.pagination.classList.remove('is-hidden');//для скрытия пагинации раскомментировать
  refs.headerHomeBtn.classList.add('current_page');
  refs.headerLibraryBtn.classList.remove('current_page');

  refs.headerHomeContent.classList.remove('header__content-hide');
  refs.headerLibraryContent.classList.add('header__content-hide');

  refs.headerBaground.classList.remove('header_library');
  refs.headerBaground.classList.add('header');
}

function changeHeaderLibrary() {
  clearGalleryMarkup();
  checkSavedFilmsForRender();
  refs.headerHomeBtn.classList.remove('current_page');
  refs.headerLibraryBtn.classList.add('current_page');

  refs.headerLibraryContent.classList.remove('header__content-hide');
  refs.headerHomeContent.classList.add('header__content-hide');

  refs.headerBaground.classList.remove('header');
  refs.headerBaground.classList.add('header_library');
}
