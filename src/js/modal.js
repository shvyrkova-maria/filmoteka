import modalTpl from '../templates/modal-template.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import localStorage from './setLocalStorage';

import FetchApiFilms from './apiService';

const fetchApiFilms = new FetchApiFilms();

let lightbox;
let trailerLightbox;
/* find films gallery and add EventListener on click*/
const filmsGall = document.querySelector('.js-gallery');
filmsGall.addEventListener('click', createFilmOnModal);

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

  fetchApiFilms.fetchFilmByID(filmId).then((film) => {
    const modalFilmCard = modalTpl(film);
    openLightbox(modalFilmCard);
    localStorage();

    const playTrailerBtn = document.querySelector('.modal-trailer-wraper');
    playTrailerBtn.addEventListener('click', openTrailerWindow);
    
    function openTrailerWindow(e){
      e.preventDefault();
      const filmName = film.original_title;
      
      fetchTrailers(filmName).then((YouTube_FilmID) => {
        openLightboxWithTrailer(YouTube_FilmID)
      });   
    }
    window.addEventListener('keydown', onEscKeyPressModal);
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
}



function onEscKeyPressModal(e) {
  const ESC_KEY_CODE = 'Escape';
    if (e.code === ESC_KEY_CODE) {
      lightbox.close() 
      window.removeEventListener('keydown', onEscKeyPressModal)
  }
}


/** ==========TRAILERS ====================*/

// fetch trailers ID
function fetchTrailers(filmName){

  const YouTube_KEY = 'AIzaSyC7v1ShcnQaTExv8OJ4-PLMrgN7JRuclbM';
  const YouTube_URL = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet'
  
  return fetch(`${YouTube_URL}&q=${filmName} + "trailer"&key=${YouTube_KEY}`)
  .then(data=>data.json())
  .then(data => {
    console.log(data)
    return data.items[0].id.videoId;
  });
}

// create Lightbox with iframe
function openLightboxWithTrailer(YouTube_FilmID) {

  trailerLightbox = basicLightbox.create(`<iframe width="80%" height="80%" src="https://www.youtube-nocookie.com/embed/${YouTube_FilmID}"></iframe>`,
  {
    onShow: trailerLightbox => {
      document.body.style.overflow = 'hidden';
    },
    onClose: trailerLightbox => {
      document.body.style.overflow = 'visible';
    },
  });

  trailerLightbox.show()
  window.removeEventListener('keydown', onEscKeyPressModal);//add list. on modal
 
  const iframeLightbox = document.querySelector('.basicLightbox--iframe')
  window.addEventListener('keydown', onEscKeyPressTrailer); // add list. to trailer

  function onEscKeyPressTrailer(e) {
    const ESC_KEY_CODE = 'Escape';
    if (e.code === ESC_KEY_CODE){
      trailerLightbox.close();
      window.removeEventListener('keydown', onEscKeyPressTrailer);//remove list. from trailer
      window.addEventListener('keydown', onEscKeyPressModal);//add list. to modal
    }
  }  
}

