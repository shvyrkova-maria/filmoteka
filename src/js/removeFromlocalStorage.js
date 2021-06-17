import { renderLibraryGallery } from './gallery';
import { storageWatched } from './setLocalStorage';
import { refs } from './getLocalStorage';

refs.gallery.addEventListener('click', onRemoveBtnClick);

let savedWatched = storageWatched.idWatched;
let savedQueue = storageWatched.idQueue;
let allSaved = [savedWatched, savedQueue];

let updateStorageWatched = {
  ...storageWatched,
  idWatched: savedWatched,
  idQueue: savedQueue,
};

function onRemoveBtnClick(e) {
  if (e.target.nodeName !== 'svg') {
    return;
  }

  const filmId = e.target.parentNode.nextElementSibling.id;
  removeFromStorage(filmId);
}

function removeFromStorage(filmId, type) {
  if (refs.headerLibraryBtn.classList.contains('current_page')) {
    allSaved.map(saved => removeFilmId(saved));
    function removeFilmId(category) {
      if (category.includes(filmId)) {
        category.splice(category.indexOf(filmId), 1);
        localStorage.setItem('id', JSON.stringify(updateStorageWatched));
        renderLibraryGallery(category);
      }
    }
  } else {
    type.splice(type.indexOf(filmId), 1);
    localStorage.setItem('id', JSON.stringify(updateStorageWatched));
  }
}

function checkSavedFilmsForRender() {
  if (savedWatched.length > 0) {
    refs.headerBtnWatched.classList.add('btn-active');
    return renderLibraryGallery(savedWatched);
  }
  if (savedQueue.length > 0) {
    refs.headerBtnQueue.classList.add('btn-active');
    return renderLibraryGallery(savedQueue);
  }
  if (savedWatched.length === 0) {
    refs.headerBtnWatched.classList.add('btn-active');
    return renderLibraryGallery(savedWatched);
  }
}

export { checkSavedFilmsForRender, removeFromStorage };
