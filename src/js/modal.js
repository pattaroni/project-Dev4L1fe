import { renderArtistDetails } from './render-function.js';

const modal = document.getElementById('artist-modal');
const modalContent = modal.querySelector('.modal-content-container');
const closeBtn = document.getElementById('close-modal');

export async function openArtistModal(artistId) {
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  await renderArtistDetails(artistId, modalContent); // ⬅️ передаємо modalContent
  document.addEventListener('keydown', escHandler);
}

export function closeArtistModal() {
  modal.classList.remove('is-open');
  document.body.style.overflow = 'auto';
  document.removeEventListener('keydown', escHandler);
  modalContent.innerHTML = '';
}

function escHandler(e) {
  if (e.key === 'Escape') closeArtistModal();
}
closeBtn?.addEventListener('click', closeArtistModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeArtistModal();
});
