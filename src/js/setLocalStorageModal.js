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
    if (refs.modalBtnWatched.textContent === 'Remove from Watched') {
      removeFromStorage(currentId, storageWatched.idWatched);
      disactiveModalBtn(refs.modalBtnWatched);
      enableBtn(refs.modalBtnQueue);
    } else {
      addStorage(storageWatched.idWatched);
      activeModalBtn(refs.modalBtnWatched);
      disableBtn(refs.modalBtnQueue);
    }
  }

  function clickQueue() {
    if (refs.modalBtnQueue.textContent === 'Remove from Queue') {
      removeFromStorage(currentId, storageWatched.idQueue);
      disactiveModalBtn(refs.modalBtnQueue);
      enableBtn(refs.modalBtnWatched);
    } else {
      addStorage(storageWatched.idQueue);
      activeModalBtn(refs.modalBtnQueue);
      disableBtn(refs.modalBtnWatched);
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
      activeModalBtn(refs.modalBtnWatched);
      disableBtn(refs.modalBtnQueue);
    }
    if (savedQueue.includes(modalId.id)) {
      activeModalBtn(refs.modalBtnQueue);
      disableBtn(refs.modalBtnWatched);
    }
  }

  function activeModalBtn(button) {
    button.classList.add('btn-active');
    button.textContent = `Remove from ${button.dataset.btntext}`;
  }

  function disactiveModalBtn(button) {
    button.classList.remove('btn-active');
    button.textContent = `Add to ${button.dataset.btntext}`;
  }

  function enableBtn(button) {
    button.disabled = false;
  }

  function disableBtn(button) {
    button.disabled = 'disabled';
  }
}
