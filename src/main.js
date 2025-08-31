import { handleArtists } from './js/handlers';
import { openArtistModal } from './js/modal';

handleArtists();

document.addEventListener('click', event => {
  const btn = event.target.closest('.artist-btn-learn-more');
  if (!btn) return;

  const card = btn.closest('.artists-list-item');
  const artistId = card?.dataset.id;

  if (!artistId) {
    console.warn('No artist ID found on clicked card');
    return;
  }

  openArtistModal(artistId);
});
