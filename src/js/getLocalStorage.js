import { makeLibraryGallery } from './gallery';

const refs = {
  headerBtnWatched: document.querySelector('#btn__header-watched'),
  headerBtnQueue: document.querySelector('#btn__header-queue'),
};

refs.headerBtnWatched.addEventListener('click', clickHeaderBtnWatched);
refs.headerBtnQueue.addEventListener('click', clickHeaderBtnQueue);

function clickHeaderBtnWatched() {
  const getStWatch = localStorage.getItem('id');
  const watchList = JSON.parse(getStWatch);
  watchList.idWatched.forEach(id => makeLibraryGallery(id));
}

function clickHeaderBtnQueue() {
  const getQueue = localStorage.getItem('id');
  const queueList = JSON.parse(getQueue);
  queueList.idQueue.forEach(id => makeLibraryGallery(id));
}

function makeLibraryList() {
  const getStWatch = localStorage.getItem('id');
  const watchList = JSON.parse(getStWatch);
  const getQueue = localStorage.getItem('id');
  const queueList = JSON.parse(getQueue);
  let libraryList = watchList.idWatched.concat(queueList.idQueue);
  libraryList = Array.from(new Set(libraryList));
  libraryList.forEach(id => makeLibraryGallery(id));
}

export { makeLibraryList };
