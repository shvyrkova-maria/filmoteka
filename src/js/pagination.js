import {
  fetchFilms,
  createPopularMoviesGallery,
  clearGalleryMarkup,
  createSearchMoviesGallery,
} from './gallery.js';

const API_KEY = '2f8d6050c74d5f454a522d74a8cedbb8';
const BASE_URL = 'https://api.themoviedb.org/3';
const total_results = (page = 1) => {
  const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`;
  // если находитесь на странице с поиском фильмов, url будет другим, но дальнейшая логика та же самая
  return fetch(url)
    .then(response => response.json())
    .then(res => {
      return res.total_pages;
    });
};

const refs = {
  dec: document.querySelector('#dec'),
  inc: document.querySelector('#inc'),
  page_numbers: document.querySelectorAll('.pag_text'),
  page_items: document.querySelectorAll('.pag_item'),
};

refs.inc.addEventListener('click', () => {
  total_results().then(data => {
    if (+refs.page_numbers[4].textContent === data) {
      refs.inc.disabled = true;
      return;
    }

    if (refs.dec.disabled == true) {
      refs.dec.disabled = false;
    }

    refs.page_numbers.forEach(el => {
      removeActivClassBtn();
      el.textContent = +el.textContent + 4;
      addActiveClassBtn();
    });
  });
});

refs.dec.addEventListener('click', () => {
  if (refs.page_numbers[0].textContent === '1') {
    refs.dec.disabled = true;
    return;
  }

  if (refs.inc.disabled == true) {
    refs.inc.disabled = false;
  }

  refs.page_numbers.forEach(el => {
    removeActivClassBtn();
    el.textContent = +el.textContent - 4;
    addActiveClassBtn();
  });
});

refs.page_items.forEach(el => {
  el.addEventListener('click', evt => {
    removeActivClassBtn();
    fetchFilms.pageNum = el.firstChild.textContent;
    evt.currentTarget.classList.add('pag_item__current');

    clearGalleryMarkup();

    if (!fetchFilms.searchQuery) {
      createPopularMoviesGallery();
    } else {
      createSearchMoviesGallery();
      fetchFilms.resetPageNum();
    }

    // fetchFilms.maxPageNum = el.firstChild.textContent;
    // fetchFilms
    //   .fetchPopularMovies(fetchFilms.maxPageNum)
    // .then(fetchFilms.maxPageNum = el.firstChild.textContent)
    // .then(createPopularMoviesGallery())
    // .catch(err => console.log(err));

    // console.log(fetchFilms.maxPageNum);

    // setTimeout(() => {
    //   let a = fetchFilms.maxPageNum;
    //   console.log(a);
    // }, 600);

    // тут вызываете функцию, отвечающую за получение от сервера нужных фильмов,
    // в которую в качестве параметра page передаете el.firstChild.textContent.
    // После этого вызываете функцию, отвечающую за рендер страницы.
  });
});

function removeActivClassBtn() {
  refs.page_items.forEach(el => el.classList.remove('pag_item__current'));
}

function addActiveClassBtn() {
  refs.page_items.forEach(el => {
    if (fetchFilms.pageNum === el.firstChild.textContent) {
      el.classList.add('pag_item__current');
    }
  });
}

// let pageNum = 1; // let visPage = 5;

// fetchFilms
//   .fetchPopularMoviesMaxPage()
//   .then(r => (fetchFilms.maxPageNum = r.total_results))
//   .catch(err => console.log(err));

// l1.classList.toggle('pag_acc');

// const scrollNum = () => {
//   if (fetchFilms.maxPageNum - pageNum === 1) {
//     s1.textContent = pageNum - 3;
//     s2.textContent = pageNum - 2;
//     s3.textContent = pageNum - 1;
//     s4.textContent = pageNum;
//     s5.textContent = pageNum + 1;
//     return;
//   }
//   if (pageNum === 1) {
//     s1.textContent = pageNum;
//     s2.textContent = pageNum + 1;
//     s3.textContent = pageNum + 2;
//     s4.textContent = pageNum + 3;
//     s5.textContent = pageNum + 4;
//     return;
//   }
//   if (pageNum === 2) {
//     s1.textContent = pageNum - 1;
//     s2.textContent = pageNum;
//     s3.textContent = pageNum + 1;
//     s4.textContent = pageNum + 2;
//     s5.textContent = pageNum + 3;
//     return;
//   }
//   if (fetchFilms.maxPageNum === pageNum) return;

//   s1.textContent = pageNum - 2;
//   s2.textContent = pageNum - 1;
//   s3.textContent = pageNum;
//   s4.textContent = pageNum + 1;
//   s5.textContent = pageNum + 2;
// };

// const accenting = () => {
//   document.querySelector('.pag_acc').classList.toggle('pag_acc');

//   if (pageNum === 1) return l1.classList.add('pag_acc');
//   if (pageNum === 2) return l2.classList.toggle('pag_acc');
//   if (pageNum === fetchFilms.maxPageNum - 1) return l4.classList.toggle('pag_acc');
//   if (pageNum === fetchFilms.maxPageNum) return l5.classList.add('pag_acc');

//   l3.classList.add('pag_acc');
// };
// // changePageNumAndReDraw
// const cPNARD = () => {
//   fetchFilms.pageNum = pageNum;

//   document.querySelector('.js-gallery').innerHTML = '';
//   createPopularMoviesGallery();
//   scrollNum();
//   accenting();

//   console.log(`fMaxPageNum - ${fetchFilms.maxPageNum}, pageNum - ${pageNum}`); // to DEL after tune
// };
// // ============= listeners ==================
// dec.addEventListener('click', () => {
//   if (pageNum <= 1) return;
//   pageNum -= 1;

//   cPNARD();
// });
// dec.addEventListener('click', pageUpOnClick);

// inc.addEventListener('click', () => {
//   if (pageNum + 1 >= fetchFilms.maxPageNum) return;

//   pageNum += 1;

//   cPNARD();

// });
// inc.addEventListener('click', pageUpOnClick);

// document.querySelectorAll('.pag_item').forEach(el => {
//   el.addEventListener('click', pageUpOnClick);
//   el.addEventListener('click', click => {
//     if (pageNum === +click.currentTarget.innerText) return;
//     pageNum = +click.currentTarget.innerText;
//     cPNARD();
//   })
// });

// ===============
