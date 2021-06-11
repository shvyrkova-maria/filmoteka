const refs = {
  headerBtnWatched: document.querySelector('#btn__header-watched'),
  headerBtnQueue: document.querySelector('#btn__header-queue'),
};

// console.log(refs.headerBtnWatched);
// console.log(refs.headerBtnQueue);

refs.headerBtnWatched.addEventListener('click', clickHeaderBtnWatched);
refs.headerBtnQueue.addEventListener('click', clickHeaderBtnQueue);

function clickHeaderBtnWatched() {
  //   console.log('++');
  const getStWatch = localStorage.getItem('id');
//   console.log('get Watch ', getStWatch);
  const watchList = JSON.parse(getStWatch);
  console.log(watchList.idWatched);
}

function clickHeaderBtnQueue() {
  //   console.log('--');
  const getQueue = localStorage.getItem('id');
//   console.log('get Queue ', getQueue);
  const queueList = JSON.parse(getQueue);
  console.log(queueList.idQueue);
}
