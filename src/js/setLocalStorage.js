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
