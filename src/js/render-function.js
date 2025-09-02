import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { refs } from './refs';
import { prepareArtistDescription, formatDuration } from './helpers';
import spriteUrl from '../img/sprite.svg?url';
import { fetchArtistById, fetchArtistByIdWithAlbums } from './api';

export function renderArtists(data) {
  refs.artistsList.innerHTML = data
    .map(artist => {
      const genresMarkup = artist.genres
        .map(genre => `<li class="genres-list-item">${genre}</li>`)
        .join('');
      const preparedArtistDescription = prepareArtistDescription(
        artist.strBiographyEN
      );

      return `<li class="artists-list-item" data-id="${artist._id}">
        <img class="artist-image" src="${artist.strArtistThumb}" alt="${artist.strArtist}" />
        <ul class="genres-list">${genresMarkup}</ul>
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
}

export const renderFeedbackSlider = feedbacks => {
  const container = document.querySelector('.section-feedback .container');
  if (!container) return console.error('Container not found');

  const markup = `
    <div class="feedback-slider swiper">
      <div class="swiper-wrapper">
        ${feedbacks
          .map(
            fb => `
          <div class="swiper-slide">
            <div class="feedback-card">
              <div class="stars">${renderStars(fb.rating)}</div>
              <p class="comment">"${fb.descr}"</p>
              <h3 class="comm-name">${fb.name}</h3>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
      <div class="swiper-button-prev">
        <svg class="icon">
          <use href="${spriteUrl}#left-arrow-icon"></use>

        </svg>
      </div>
      <div class="swiper-button-next">
        <svg class="icon">
          <use href="${spriteUrl}#right-arrow-icon"></use>

        </svg>
      </div>
      <div class="custom-pagination">
        <span class="bullet bullet-left"></span>
        <span class="bullet bullet-middle"></span>
        <span class="bullet bullet-right"></span>
      </div>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', markup);

  const swiperEl = container.querySelector('.feedback-slider');
  if (!swiperEl) return console.error('Swiper container not found');

  const swiperInstance = new Swiper(swiperEl, {
    spaceBetween: 30,
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      init(swiper) {
        updateCustomPagination(swiper);
      },
      slideChange(swiper) {
        updateCustomPagination(swiper);
      },
    },
  });

  document
    .querySelector('.swiper-button-next')
    ?.addEventListener('click', () => {
      swiperInstance.slideNext();
    });
  document
    .querySelector('.swiper-button-prev')
    ?.addEventListener('click', () => {
      swiperInstance.slidePrev();
    });

  function updateCustomPagination(swiper) {
    const total = swiper.slides.length;
    const current = swiper.activeIndex;

    const left = swiper.el.querySelector('.bullet-left');
    const middle = swiper.el.querySelector('.bullet-middle');
    const right = swiper.el.querySelector('.bullet-right');

    if (!left || !middle || !right) return;

    left.classList.remove('active');
    middle.classList.remove('active');
    right.classList.remove('active');

    if (current === 0) {
      left.classList.add('active');
    } else if (current === total - 1) {
      right.classList.add('active');
    } else {
      middle.classList.add('active');
    }
  }
};

function renderStars(rating) {
  const fullStars = Math.round(rating);
  const emptyStars = 5 - fullStars;

  return (
    '<span class="stars">' +
    '<span class="fa fa-star checked"></span>'.repeat(fullStars) +
    '<span class="fa fa-star" style="color: #fff;"></span>'.repeat(emptyStars) +
    '</span>'
  );
}

export async function renderArtistDetails(artistId, modalContent) {
  // modalContent.innerHTML = `<p class="loader">Loading...</p>`;

  try {
    const artist = await fetchArtistById(artistId);
    const albumsObj = await fetchArtistByIdWithAlbums(artistId);

    // 🔒 Перевірка на обʼєкт і фільтрація пошкоджених записів
    const albums = Array.isArray(albumsObj.albumsList)
      ? albumsObj.albumsList.filter(album => album && typeof album === 'object')
      : [];

    const genreChips =
      artist.genres
        ?.map(genre => `<span class="genre-chip">${genre}</span>`)
        .join('') || '';

    modalContent.innerHTML = `
      <button class="close-btn" id="close-modal">&times;</button>
      <h2 class="modal-title">${artist.strArtist || 'Unknown Artist'}</h2>

      <div class="modal-header">
        <img src="${artist.strArtistThumb || ''}" alt="${artist.strArtist}" class="modal-img" />
        <div class="modal-info">
          <div class="modal-info-container">
          <div class="modal-info-froup">
            <p><span>Years active</span> ${artist.intFormedYear || 'N/A'}-${artist.intDiedYear || 'present'}</p>
            <p><span>Sex</span> ${artist.strGender || 'N/A'}</p>
            </div>
            <div class="modal-info-froup">
            <p><span>Members</span> ${artist.intMembers || 'N/A'}</p>
            <p><span>Country</span> ${artist.strCountry || 'N/A'}</p>
            </div>
          </div>
          <div><span>Biography</span><p>${artist.strBiographyEN || 'N/A'}</p></div>
          <div class="modal-genres">${genreChips}</div>
        </div>
      </div>
      <h3 class="albums-heading">Albums</h3>
<div class="albums-container">
  ${
    albums.length > 0
      ? albums
          .map(
            album => `
      <div class="album-card">
        <h4 class="album-title">${album.strAlbum || 'Unknown Album'}</h4>
        <div class="album-tracks-header">
        <p>Track</p>
        <div class="track-info">
          <p>Time</p>
          <p>Link</p>
        </div>
        </div>
        <ul class="album-tracklist">
          ${
            album?.tracks?.length
              ? album.tracks
                  .map(
                    track => `
              <li class="album-track-item">
                <h5>${track.strTrack || 'Track'}</h5>
                <div class="track-info">
                  <p>
                    ${formatDuration(track.intDuration)}
                  </p>
                  <a class="track-video-link ${track.movie ? '' : 'track-video-link-hidden'}" 
                      href="${track.movie || '#'}" target="_blank" rel="noopener noreferrer">
                    <svg class="track-video-icon icon-hidden">
                      <use href="${spriteUrl}#youtube-icon"></use>
                    </svg>
                  </a>
                </div>
              </li>`
                  )
                  .join('')
              : '<li class="album-track-item">No tracks available</li>'
          }
        </ul>
      </div>
    `
          )
          .join('')
      : '<p>No albums found</p>'
  }
</div>`;
  } catch (err) {
    console.error('Modal render error:', err);
    modalContent.innerHTML = `<p>Error loading artist data</p>`;
  }
}
