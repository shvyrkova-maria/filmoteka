import { renderLibraryGallery } from './gallery';

export const refs = {
  headerBtnWatched: document.querySelector('#btn__header-watched'),
  headerBtnQueue: document.querySelector('#btn__header-queue'),
  headerLibraryBtn: document.querySelector('#headerLibraryBtn'),
  gallery: document.querySelector('.js-gallery'),
};

refs.headerBtnWatched.addEventListener('click', clickHeaderBtnWatched);
refs.headerBtnQueue.addEventListener('click', clickHeaderBtnQueue);

function clickHeaderBtnWatched() {
  refs.headerBtnQueue.classList.remove('btn-active');
  const getStWatch = localStorage.getItem('id');
  const watchList = JSON.parse(getStWatch);
  renderLibraryGallery(watchList.idWatched);
}

function clickHeaderBtnQueue() {
  refs.headerBtnWatched.classList.remove('btn-active');
  const getQueue = localStorage.getItem('id');
  const queueList = JSON.parse(getQueue);
  renderLibraryGallery(queueList.idQueue);
}
