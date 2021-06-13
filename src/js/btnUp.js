import throttle from 'lodash.throttle';

const upBtn= document.querySelector('[data-btn-up]');

window.addEventListener('scroll', throttle(hideElemOnScroll(upBtn), 250));
upBtn.addEventListener('click', pageUpOnClick);

function hideElemOnScroll(elem) {
  return function hideOnScroll(el) {
    if (pageYOffset < document.documentElement.clientHeight) {
      elem.classList.add('visually-hidden');
    } else {
      elem.classList.remove('visually-hidden');
    }
  };
}
function pageUpOnClick() {
  window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' });
}
export { pageUpOnClick };