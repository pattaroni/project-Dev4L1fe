import { refs } from './refs';
import { prepareArtistDescription } from './helpers';
import spriteUrl from '../img/sprite.svg?url';
import { fetchArtistById, fetchArtistByIdWithAlbums } from './api';

export function renderArtists(data) {
  const markup = data
    .map(artist => {
      const genresMarkup = artist.genres
        .map(genre => `<li class="genres-list-item">${genre}</li>`)
        .join('');
      const preparedArtistDescription = prepareArtistDescription(
        artist.strBiographyEN
      );

      return `<li class="artists-list-item" data-id="${artist._id}">
                <img class="artist-image"
                  src="${artist.strArtistThumb}" 
                  alt="${artist.strArtist}" />
                <ul class="genres-list">
                    ${genresMarkup}
                </ul>
                <h3 class="artist-name">${artist.strArtist}</h3>
                <p class="artist-descr">${preparedArtistDescription}</p>
                <button type="button" class="artist-btn-learn-more">
                    <span>Learn More</span>
                    <span>
                        <svg class="artist-learn-svg" width="14" height="14">
                          <use href="${spriteUrl}#next-icon"></use>
                        </svg>
                    </span>
                </button>
            </li>`;
    })
    .join('');
  refs.artistsList.insertAdjacentHTML('beforeend', markup);}

export async function renderArtistDetails(artistId, modalContent) {
  // modalContent.innerHTML = `<p class="loader">Loading...</p>`;

  try {
    const artist = await fetchArtistById(artistId);
    const albumsObj = await fetchArtistByIdWithAlbums(artistId);

    // 🔒 Перевірка на обʼєкт і фільтрація пошкоджених записів
    const albums = Array.isArray(albumsObj.albumsList)
  ? albumsObj.albumsList.filter(album => album && typeof album === 'object')
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
  } catch (err) {
    console.error('Modal render error:', err);
    modalContent.innerHTML = `<p>Error loading artist data</p>`;
  }
}
