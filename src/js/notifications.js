const refs = {
  searchError: document.querySelector('.header__error-text'),
  searchErrorImg: document.querySelector('.error-notify'),
  emptyLibraryImg: document.querySelector('.info-notify'),
};

// -----  notifications
function renderInfoMsg() {
  refs.searchError.classList.remove('is-hidden');
  setTimeout(() => refs.searchError.classList.add('is-hidden'), 2500);
}

function renderSearchErrImg() {
  refs.searchErrorImg.classList.remove('is-hidden');
}

function renderEmptyLibImg() {
  refs.emptyLibraryImg.classList.remove('is-hidden');
}

function hideInfoImg() {
  refs.searchErrorImg.classList.add('is-hidden');
  refs.emptyLibraryImg.classList.add('is-hidden');
}

export { renderInfoMsg, hideInfoImg, renderSearchErrImg, renderEmptyLibImg };
