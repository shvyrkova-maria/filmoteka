import { renderLibraryGallery } from './gallery';

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
  console.log('++');
  const getQueue = localStorage.getItem('id');
  const queueList = JSON.parse(getQueue);
  renderLibraryGallery(queueList.idQueue);
}

function makeLibraryList() {
  const getStWatch = localStorage.getItem('id');
  const watchList = JSON.parse(getStWatch);
  const getQueue = localStorage.getItem('id');
  const queueList = JSON.parse(getQueue);
  // let libraryList = watchList.idWatched.concat(queueList.idQueue);
  // console.log('libraryList', libraryList);
  // libraryList = Array.from(new Set(libraryList));
  // console.log('libraryList2', libraryList);

  console.log('watchList1', watchList.idWatched);
  console.log('watchList2', watchList.idWatched.length);

  // watchList = Array.from(new Set(watchList));
  // console.log('watchList2', watchList);

  if (watchList.idWatched.length > 0) {
    return renderLibraryGallery(watchList.idWatched);
  }
  if (watchList.idQueue.length > 0) {
    return renderLibraryGallery(watchList.idQueue);
  }
  if (watchList.idWatched.length === 0) {
    return renderLibraryGallery(watchList.idWatched);
  }
}

export { makeLibraryList };
