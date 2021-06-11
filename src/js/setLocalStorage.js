const storageWatched = {
  idWatched: [],
  idQueue: [],
};

function createLocalStorage() {
  localStorage.setItem(`id`, JSON.stringify(storageWatched));
}

createLocalStorage();

export default function localStorageModalBtn() {
  const refs = {
    headerBtnWatched: document.querySelector('#modal-btn-watched'),
    headerBtnQueue: document.querySelector('#modal-btn-queue'),
  };
  const modalId = document.querySelector('.modal');
  const currentId = modalId.id;

  refs.headerBtnWatched.addEventListener('click', clickWatched);
  refs.headerBtnQueue.addEventListener('click', clickQueue);

  function clickWatched() {
    addTsorage(storageWatched.idWatched);
  }

  function clickQueue() {
    addTsorage(storageWatched.idQueue);
  }

  function addTsorage(idNum) {
    if (!idNum.includes(currentId)) {
      idNum.push(currentId);
      localStorage.setItem(`id`, JSON.stringify(storageWatched));
    }
  }
}


