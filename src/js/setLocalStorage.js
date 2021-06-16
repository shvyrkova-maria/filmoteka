import { renderLibraryGallery } from './gallery'; //test

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

const refs = {
  gallery: document.querySelector('.js-gallery'),
};

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
  removeFromCategory(filmId);
}

function removeFromCategory(filmId) {
  allSaved.map(saved => removeFilmId(saved));

  function removeFilmId(category) {
    if (category.includes(filmId)) {
      category.splice(category.indexOf(filmId), 1);
      localStorage.setItem('id', JSON.stringify(updateStorageWatched));
      renderLibraryGallery(category);
    }
  }
}

// function onRemoveBtnClick(e) {
//   if (e.target.nodeName !== 'svg') {
//     return;
//   }
//   const filmId = e.target.parentNode.nextElementSibling.id;
//   removeFromAllCategories(filmId);
// }

// function removeFromAllCategories(filmId) {
//   allSaved.map(saved => removeFilmId(saved));
//   localStorage.setItem('id', JSON.stringify(updateStorageWatched));

//   let allSavedList = savedWatched.concat(savedQueue);
//   allSavedList = Array.from(new Set(allSavedList));

//   function removeFilmId(category) {
//     if (category.includes(filmId)) {
//       category.splice(category.indexOf(filmId), 1);
//     }
//   }
//   renderLibraryGallery(allSavedList);
// }

//============================ v2 =================================

// let savedWatched = storageWatched.idWatched;
// let savedQueue = storageWatched.idQueue;
// let allSaved = [savedWatched, savedQueue];

// let updateStorageWatched = {
//   ...storageWatched,
//   idWatched: savedWatched,
//   idQueue: savedQueue,
// };

// function one() {
//   refs.gallery.addEventListener('click', removeCategoryBtnClick);

//   function removeCategoryBtnClick(e) {
//     if (e.target.nodeName !== 'svg') {
//       return;
//     }
//     const filmId = e.target.parentNode.nextElementSibling.id;
//     removeFromCategory(filmId);
//   }

//   function removeFromCategory(filmId) {
//     allSaved.map(saved => removeFilmId(saved));

//     function removeFilmId(category) {
//       if (category.includes(filmId)) {
//         category.splice(category.indexOf(filmId), 1);
//         localStorage.setItem('id', JSON.stringify(updateStorageWatched));
//         renderLibraryGallery(category);
//       }
//     }
//   }
// }

// function all(el) {
//   el.addEventListener('click', removeLibraryBtnClick);

//   function removeLibraryBtnClick(e) {
//     if (e.target.nodeName !== 'svg') {
//       return;
//     }
//     const filmId = e.target.parentNode.nextElementSibling.id;
//     removeFromAllCategories(filmId);
//   }

//   function removeFromAllCategories(filmId) {
//     allSaved.map(saved => removeFilmId(saved));
//     localStorage.setItem('id', JSON.stringify(updateStorageWatched));

//     let allSavedList = savedWatched.concat(savedQueue);
//     allSavedList = Array.from(new Set(allSavedList));

//     function removeFilmId(category) {
//       if (category.includes(filmId)) {
//         category.splice(category.indexOf(filmId), 1);
//       }
//     }
//     renderLibraryGallery(allSavedList);
//   }
// }
