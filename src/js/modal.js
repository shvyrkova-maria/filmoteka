import modalTpl from '../templates/modal-template.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';

function fetchFilms() {

  const filmId = 503736;
  return fetch(
      `https://api.themoviedb.org/3/movie/${filmId}?api_key=2f8d6050c74d5f454a522d74a8cedbb8&language=en-US`,
    )
      .then((responce) => responce.json())
      .then((film) => {
        //this.incrementPage()
        // console.log(film)

      return film;
    })
}

document.querySelector('h1').addEventListener('click', createFilmOnModal)


function createFilmOnModal(e) {
  e.preventDefault();
  
  fetchFilms().then((film) => {
    if (film.success === false) {
      return
    } else {
      const modalFilmCard = modalTpl(film)
      const lightbox = basicLightbox.create(modalFilmCard)

      lightbox.show();
      const closeBtn = document.querySelector('.modal-close-btn');
      closeBtn.addEventListener('click', () => {
        lightbox.close()
      })
    }
  })
}

