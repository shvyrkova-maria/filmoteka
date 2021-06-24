import modalTpl from '../templates/modal-template.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import localStorage from './setLocalStorageModal';

import FetchApiFilms from './apiService';


const fetchApiFilms = new FetchApiFilms();

let lightbox;
let trailerLightbox;

/* find films gallery and add EventListener on click*/
const filmsGall = document.querySelector('.js-gallery');//это вынести в refs
filmsGall.addEventListener('click', createFilmOnModal);//нужно будет изменить после того, как перенесем ссылку в refs

function createFilmOnModal(e) {
  e.preventDefault();

  /* set current film */
  const currFilm = e.target;

  /* exclude click on wrong tag  */
  if (currFilm.nodeName !== 'IMG') {
    return;
  }
  /* set current film ID to call fetch function*/
  const filmId = currFilm.id;

  fetchApiFilms.fetchFilmByID(filmId).then(film => {
    const modalFilmCard = modalTpl(film);
    openLightbox(modalFilmCard);
    localStorage();

    const playTrailerBtn = document.querySelector('.modal-trailer-wraper');
    playTrailerBtn.addEventListener('click', openTrailerWindow);

    function openTrailerWindow(e) {
      e.preventDefault();
      const filmName = film.original_title;

      fetchApiFilms.fetchTrailers(filmName)
      .then(YouTube_FilmID => {
       openLightboxWithTrailer(YouTube_FilmID);
      });
    }
    window.addEventListener('keydown', onModalClose);
  });
}

/* create Lightbox for FilmCard */
function openLightbox(modalFilmCard) {
  lightbox = basicLightbox.create(modalFilmCard, {
    onShow: lightbox => {
      document.body.style.overflow = 'hidden';
    },
    onClose: lightbox => {
      document.body.style.overflow = 'visible';
    },
  });

  lightbox.show();

  const closeBtn = document.querySelector('.modal-close-btn');
  closeBtn.addEventListener('click', ()=>{lightbox.close()});
}

/* create Lightbox for Trailer */
function openLightboxWithTrailer(YouTube_FilmID) {
  trailerLightbox = basicLightbox.create(
    `<iframe width="80%" height="80%" src="https://www.youtube-nocookie.com/embed/${YouTube_FilmID}"></iframe>`,
    {
      onShow: trailerLightbox => {
        document.body.style.overflow = 'hidden';
      },
      onClose: trailerLightbox => {
        document.body.style.overflow = 'visible';
      },
    },
  );

  trailerLightbox.show();
  window.removeEventListener('keydown', onModalClose); //add list. on modal

  const iframeLightbox = document.querySelector('.basicLightbox--iframe');
  window.addEventListener('keydown', onTrailerClose); // add list. to trailer
}


// close Modal Lightbox
function onModalClose(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    lightbox.close();
    window.removeEventListener('keydown', onModalClose);
  }
}


// close Trailer Lightbox
function onTrailerClose(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    trailerLightbox.close();
    window.removeEventListener('keydown', onTrailerClose); //remove list. from trailer
    window.addEventListener('keydown', onModalClose); //add list. to modal
  }
}