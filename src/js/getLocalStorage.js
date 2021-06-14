import { clearGalleryMarkup, makeLibraryGallery } from './gallery';

const refs = {
  headerBtnWatched: document.querySelector('#btn__header-watched'),
  headerBtnQueue: document.querySelector('#btn__header-queue'),
};

refs.headerBtnWatched.addEventListener('click', clickHeaderBtnWatched);
refs.headerBtnQueue.addEventListener('click', clickHeaderBtnQueue);

function clickHeaderBtnWatched() {
  const getStWatch = localStorage.getItem('id');
  const watchList = JSON.parse(getStWatch);
  renderLibraryGallery(watchList.idWatched);
}

function clickHeaderBtnQueue() {
  const getQueue = localStorage.getItem('id');
  const queueList = JSON.parse(getQueue);
  renderLibraryGallery(queueList.idQueue);
}

function makeLibraryList() {
  const getStWatch = localStorage.getItem('id');
  const watchList = JSON.parse(getStWatch);
  const getQueue = localStorage.getItem('id');
  const queueList = JSON.parse(getQueue);
  let libraryList = watchList.idWatched.concat(queueList.idQueue);
  libraryList = Array.from(new Set(libraryList));
  renderLibraryGallery(libraryList);
}

function renderLibraryGallery(ids) {
  clearGalleryMarkup();
  ids.forEach(id => makeLibraryGallery(id));
}

export { makeLibraryList };
