import { fetchArtistById, fetchArtistByIdWithAlbums } from './api';

const modal = document.getElementById('artist-modal');
const modalContent = modal.querySelector('.modal-content');
const closeBtn = document.getElementById('close-modal');

export async function openArtistModal(artistId) {
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  await renderArtistDetails(artistId);
  document.addEventListener('keydown', escHandler);
}

export function closeArtistModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
  modalContent.scrollTop = 0;
  document.removeEventListener('keydown', escHandler);
}

function escHandler(e) {
  if (e.key === 'Escape') closeArtistModal();
}

closeBtn?.addEventListener('click', closeArtistModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeArtistModal();
});

async function renderArtistDetails(artistId) {
  modalContent.innerHTML = `<p class="loader">Loading...</p>`;

  try {
    const artist = await fetchArtistById(artistId);
    const albumsObj = await fetchArtistByIdWithAlbums(artistId);

    // 🔒 Перевірка на обʼєкт і фільтрація пошкоджених записів
    const albums = albumsObj && typeof albumsObj === 'object'
      ? Object.values(albumsObj).filter(album => album && typeof album === 'object')
      : [];

    const genreChips = artist.genres?.map(
      genre => `<span class="genre-chip">${genre}</span>`
    ).join('') || '';

    modalContent.innerHTML = `
      <button class="close-btn" id="close-modal">&times;</button>
      <h2 class="modal-title">${artist.strArtist || 'Unknown Artist'}</h2>

      <div class="modal-header">
        <img src="${artist.strArtistThumb || ''}" alt="${artist.strArtist}" class="modal-img" />
        <div class="modal-info">
          <p><strong>Years active:</strong> ${artist.intFormedYear || 'N/A'}–${artist.intDiedYear || 'present'}</p>
          <p><strong>Sex:</strong> ${artist.strGender || 'N/A'}</p>
          <p><strong>Members:</strong> ${artist.intMembers || 'N/A'}</p>
          <p><strong>Country:</strong> ${artist.strCountry || 'N/A'}</p>
          <div><strong>Biography:</strong><p>${artist.strBiographyEN || 'N/A'}</p></div>
          <div class="modal-genres">${genreChips}</div>
        </div>
      </div>

      <h3 class="albums-heading">Albums</h3>
      <div class="albums-container">
        ${albums.length > 0 
          ? albums.map(album => `
            <div class="album-card">
              <h4>${album.strAlbum || 'Unknown Album'}</h4>
              ${album.strAlbumThumb 
                ? `<img src="${album.strAlbumThumb}" alt="${album.strAlbum}" class="album-thumb" />`
                : ''
              }
              <p><strong>Year:</strong> ${album.intYearReleased || 'N/A'}</p>
              <ul class="track-list">
                ${Array.isArray(album.tracks) && album.tracks.length > 0 
                  ? album.tracks.map(track => `
                    <li class="track-item">${track.strTrack || 'Track'} – ${track.intDuration || 'N/A'}</li>
                  `).join('')
                  : '<li class="track-item">No tracklist available</li>'
                }
              </ul>
            </div>
          `).join('')
          : '<p>No albums found</p>'
        }
      </div>
    `;

    document.getElementById('close-modal')?.addEventListener('click', closeArtistModal);
  } catch (err) {
    console.error('Modal render error:', err);
    modalContent.innerHTML = `<p>Error loading artist data</p>`;
  }
}
