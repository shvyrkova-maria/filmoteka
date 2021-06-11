import modalTpl from '../templates/modal-template.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';

import FetchApiFilms from './apiService';

const fetchApiFilms = new FetchApiFilms();

let lightbox;

/* find films gallery and add EventListener on click*/
const filmsGall = document.querySelector('.js-gallery');
filmsGall.addEventListener('click', createFilmOnModal);

function createFilmOnModal(e) {
  e.preventDefault();
  
  /* set current film */
  const currFilm = e.target;
  
  /* exclude click on wrong tag  */
  if (currFilm.nodeName !== 'LI' &&
      currFilm.nodeName !== 'IMG' &&
      currFilm.nodeName !== 'DIV' &&
      currFilm.nodeName !== 'H1' &&
      currFilm.nodeName !== 'P') {
    return;
  }

  /* set current film ID to call fetch function*/
  const filmId = currFilm.id;

  fetchApiFilms.fetchFilmByID(filmId).then((film) => {
    const modalFilmCard = modalTpl(film);
    openLightbox(modalFilmCard);
    //console.log(document.querySelector('.modal-btn')); для МАКСА
    //console.log(film.genres.name); для Оли
  })

  
}

/* LightBoxOpen function */
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
  closeBtn.addEventListener('click', () => { lightbox.close() })

  window.addEventListener('keydown', onEscKeyPress);
}


function onEscKeyPress(e) {
  const ESC_KEY_CODE = 'Escape';
    if (e.code === ESC_KEY_CODE) {
          lightbox.close()
    }
  window.removeEventListener('keydown', onEscKeyPress);
}