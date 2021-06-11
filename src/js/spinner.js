const spinRef = document.querySelector('.js-spinner');

function startSpin() {
  spinRef.classList.add('is-open');
}

function stopSpin() {
  spinRef.classList.remove('is-open');
}

export { startSpin, stopSpin };

