import cardTpl from '../templates/card-template.hbs';

const refs = {
  gallery: document.querySelector('#js-gallery'),
};

function makeGalleryMarkup(film) {
  refs.gallery.insertAdjacentHTML('beforeend', cardTpl(film));
}

function clearGalleryMarkup() {
  refs.gallery.innerHTML = '';
}

function createGallery(films) {
  if (films.length === 0) {
    console.log('no matches');
  } else {
    fetchApiFilms() ///уточнить у Вики
      .then(({ results }) => {
        return results;
      })
      .then(makeGalleryMarkup)
      .сatch(console.log);
  }
}
