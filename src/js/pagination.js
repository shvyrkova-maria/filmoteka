import { fetchFilms, createPopularMoviesGallery } from './gallery.js';
let pageNum = 1; // let visPage = 5;

fetchFilms
  .fetchPopularMoviesMaxPage()
  .then(r => (fetchFilms.maxPageNum = r.total_results))
  .catch(err => console.log(err));

l1.classList.toggle('pag_acc');

const scrollNum = () => {
  if (fetchFilms.maxPageNum - pageNum === 1) {
    s1.textContent = pageNum - 3;
    s2.textContent = pageNum - 2;
    s3.textContent = pageNum - 1;
    s4.textContent = pageNum;
    s5.textContent = pageNum + 1;
    return;
  }
  if (pageNum === 1) {
    s1.textContent = pageNum;
    s2.textContent = pageNum + 1;
    s3.textContent = pageNum + 2;
    s4.textContent = pageNum + 3;
    s5.textContent = pageNum + 4;
    return;
  }
  if (pageNum === 2) {
    s1.textContent = pageNum - 1;
    s2.textContent = pageNum;
    s3.textContent = pageNum + 1;
    s4.textContent = pageNum + 2;
    s5.textContent = pageNum + 3;
    return;
  }
  if (fetchFilms.maxPageNum === pageNum) return;

  s1.textContent = pageNum - 2;
  s2.textContent = pageNum - 1;
  s3.textContent = pageNum;
  s4.textContent = pageNum + 1;
  s5.textContent = pageNum + 2;
};

const accenting = () => {
  document.querySelector('.pag_acc').classList.toggle('pag_acc');

  if (pageNum === 1) return l1.classList.add('pag_acc');
  if (pageNum === 2) return l2.classList.toggle('pag_acc');
  if (pageNum === fetchFilms.maxPageNum - 1) return l4.classList.toggle('pag_acc');
  if (pageNum === fetchFilms.maxPageNum) return l5.classList.add('pag_acc');

  l3.classList.add('pag_acc');
};
// changePageNumAndReDraw
const cPNARD = () => {
  fetchFilms.pageNum = pageNum;
  console.log(pageNum);

  document.querySelector('.js-gallery').innerHTML = '';
  createPopularMoviesGallery();
  console.log("createPopularMoviesGallery - ok");
  scrollNum();
  console.log("scrollNum - ok");

  accenting();
  console.log("accenting - ok");

  console.log(`fPageNum - ${fetchFilms.pageNum}`); // to DEL after tune
};
// ============= listeners ==================
dec.addEventListener('click', () => {
  if (pageNum <= 1) return;
  pageNum -= 1;

  cPNARD();
});

inc.addEventListener('click', () => {
  if (pageNum + 1 >= fetchFilms.maxPageNum) return;
  console.log(`fMaxPageNum - ${fetchFilms.maxPageNum}, pageNum - ${pageNum}`);

  pageNum += 1;

  cPNARD();
});

document.querySelectorAll('.pag_item').forEach(el => {
  el.addEventListener('click', click => {
    if (pageNum === +click.currentTarget.innerText) return;
    pageNum = +click.currentTarget.innerText;

    cPNARD();
  });
});

// тень под правой стрелкой
// filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
// transform: matrix(-1, 0, 0, 1, 0, 0);

// m 20-40-19-[]-16-[]-17-40-16-[]-16-[]-20-40-20
// t 197-40-16-[7]-16-.1.1.-16-[]-16-[]-17-40-16-[]-16-[]-16-.1.1.-16-[]-10-40-197

// =>20-40-20-[]-16-[]-16-40-16-[]-16-[]-20-40-20
// ========================================
// window.onload = () => {};
// -----------------------
// ===========================
// +++++++++++++++++++++