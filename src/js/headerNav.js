

const refs = {
  headerHomeBtn: document.querySelector('#headerHomeBtn'),
  headerLibraryBtn: document.querySelector('#headerLibraryBtn'),
};

console.log(refs.headerHomeBtn);

console.log(refs.headerLibraryBtn);

refs.headerHomeBtn.addEventListener('click', changeHeader);


function changeHeader() {
    console.log('+')
}