import { storageWatched } from './setLocalStorage';
import { removeFromStorage } from './removeFromlocalStorage';

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

  function clickWatched(e) {
    if (refs.modalBtnWatched.textContent === 'Added to Watched') {
      removeFromStorage(currentId, storageWatched.idWatched);
      disactiveModalBtnWatched(refs.modalBtnWatched);
    } else {
      addStorage(storageWatched.idWatched);
      activeModalBtnWatched(refs.modalBtnWatched);
    }
  }

  function clickQueue() {
    if (refs.modalBtnQueue.textContent === 'Added to Queue') {
      removeFromStorage(currentId, storageWatched.idQueue);
      disactiveModalBtnQueue(refs.modalBtnQueue);
    } else {
      addStorage(storageWatched.idQueue);
      activeModalBtnQueue(refs.modalBtnQueue);
    }
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
      activeModalBtnWatched(refs.modalBtnWatched);
    }
    if (savedQueue.includes(modalId.id)) {
      activeModalBtnQueue(refs.modalBtnQueue);
    }
  }

  function activeModalBtnWatched(button) {
    button.classList.add('btn-active');
    button.textContent = 'Added to Watched';
  }

  function activeModalBtnQueue(button) {
    button.classList.add('btn-active');
    button.textContent = 'Added to Queue';
  }

  function disactiveModalBtnWatched(button) {
    button.classList.remove('btn-active');
    button.textContent = 'Add to Watched';
  }

  function disactiveModalBtnQueue(button) {
    button.classList.remove('btn-active');
    button.textContent = 'Add to Queue';
  }
}
