export const storageWatched = {
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

export default function localStorageModalBtn() {
  const refs = {
    modalBtnWatched: document.querySelector('#modal-btn-watched'),
    modalBtnQueue: document.querySelector('#modal-btn-queue'),
  };

  const modalId = document.querySelector('.modal');
  const currentId = modalId.id;

  refs.modalBtnWatched.addEventListener('click', clickWatched);
  refs.modalBtnQueue.addEventListener('click', clickQueue);
  checkLibrary();

  function clickWatched() {
    addStorage(storageWatched.idWatched);
    chengeOnModalBtn(refs.modalBtnWatched);
  }
  //||refs.modalBtnQueue.textContent === 'Added to Queue';

  function clickQueue() {
    addStorage(storageWatched.idQueue);
    chengeOnModalBtn(refs.modalBtnQueue);
  }

  function addStorage(idNum) {
    if (!idNum.includes(currentId)) {
      idNum.push(currentId);
      localStorage.setItem(`id`, JSON.stringify(storageWatched));
    }
  }

  function checkLibrary() {
    const savedWatched = storageWatched.idWatched;
    const savedQueue = storageWatched.idQueue;

    if (savedWatched.includes(modalId.id)) {
      chengeOnModalBtn(refs.modalBtnWatched);
    }
    if (savedQueue.includes(modalId.id)) {
      chengeOnModalBtn(refs.modalBtnQueue);
    }
  }

  function chengeOnModalBtn(button) {
    button.disabled = 'disabled';
    button.textContent = 'Added to Watched';
  }
}

//==============================================================//
