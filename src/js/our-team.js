import refs from './footerRefs';
import teamTpl from "../templates/team.hbs";
import teamList from './git-info';


refs.openTeamModalBtn.addEventListener('click', onOpenModal);

function onOpenModal(e) {
  e.preventDefault();

  renderTeam(teamList);
  window.addEventListener('keydown', onEscKeyPress);
  refs.closeTeamModalBtn.addEventListener('click', onCloseModal);
  refs.backdropTeamModal.addEventListener('click', onBackdropClick);
  
  refs.body.classList.add('show-footer-modal');
}

function renderTeam() {
  const markup = teamTpl(teamList);
  refs.teamContainer.innerHTML = markup;
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-footer-modal');
  
  refs.closeTeamModalBtn.removeEventListener('click', onCloseModal);
  refs.backdropTeamModal.removeEventListener('click', onBackdropClick);
  refs.teamContainer.innerHTML = "";
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}
