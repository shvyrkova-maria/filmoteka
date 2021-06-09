const refs = {
  headerHomeBtn: document.querySelector('#headerHomeBtn'),
  headerLibraryBtn: document.querySelector('#headerLibraryBtn'),
  headerHomeContent: document.querySelector('.header__home-content'),
  headerLibraryContent: document.querySelector('.header__library-content'),
};

console.log(refs.headerHomeBtn);
console.log(refs.headerLibraryBtn);

refs.headerHomeBtn.addEventListener('click', changeHeaderHome);
refs.headerLibraryBtn.addEventListener('click', changeHeaderLibrary);

function changeHeaderHome() {
  refs.headerHomeBtn.classList.add('current_page');
  refs.headerLibraryBtn.classList.remove('current_page');

  refs.headerHomeContent.classList.remove('header__content-hide');
  refs.headerLibraryContent.classList.add('header__content-hide');
}

function changeHeaderLibrary() {
  refs.headerHomeBtn.classList.remove('current_page');
  refs.headerLibraryBtn.classList.add('current_page');

  refs.headerLibraryContent.classList.remove('header__content-hide');
  refs.headerHomeContent.classList.add('header__content-hide');
}
