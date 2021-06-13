const storageWatched = {
  idWatched: [],
  idQueue: [],
};

function createLocalStorage() {
  const cheker = localStorage.getItem('id');
  const updateLocalstorage = JSON.parse(cheker);
  if (null === cheker) {
    localStorage.setItem(`id`, JSON.stringify(storageWatched));
  }
  Object.assign(storageWatched, updateLocalstorage);
}

createLocalStorage();
console.log(storageWatched);

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
    addStorage(storageWatched.idWatched);
  }

  function clickQueue() {
    addStorage(storageWatched.idQueue);
  }

  function addStorage(idNum) {
    if (!idNum.includes(currentId)) {
      idNum.push(currentId);
      localStorage.setItem(`id`, JSON.stringify(storageWatched));
    }
  }
}
