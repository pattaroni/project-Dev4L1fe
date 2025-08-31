
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import { fetchArtists } from './api';

import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { refs } from './refs';
import { prepareArtistDescription, showLoader, hideLoader } from './helpers';
import { api } from './constants';
import spriteUrl from '../img/sprite.svg?url';


const { PER_PAGE } = api;

export function renderArtists(data, { reset = false } = {}) {
  if (reset) {
    refs.artistsList.innerHTML = '';
  }


export function renderArtists(data) {

  const markup = data
    .map(artist => {
      const genresMarkup = artist.genres
        .map(genre => `<li class="genres-list-item">${genre}</li>`)
        .join('');
      const preparedArtistDescription = prepareArtistDescription(artist.strBiographyEN);

      return `<li class="artists-list-item">
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

  refs.artistsList.insertAdjacentHTML('beforeend', markup);
}


// ==========================
// Пагинация + загрузка
// ==========================

let pagination = null;

const state = {
  genre: null,
  name: null,
  sortName: null,
  perPage: PER_PAGE, // 8 артистов на страницу
};

async function loadPage(page) {
  showLoader(refs.artistsList);

  try {
    const { artists, totalItems } = await fetchArtists({
      page,
      genre: state.genre,
      name: state.name,
      sortName: state.sortName,
      limit: state.perPage,
    });

    renderArtists(artists, { reset: true });

    if (!pagination) {
      initPagination(totalItems, state.perPage, page);
    } else {
      pagination.reset(totalItems);
    }
  } catch (err) {
    console.error('Не удалось загрузить артистов:', err);
    refs.artistsList.innerHTML =
      '<li class="error">Ошибка загрузки. Попробуйте позже.</li>';
  } finally {
    hideLoader(refs.artistsList);
  }
}

function initPagination(totalItems, itemsPerPage, startPage = 1) {
  pagination = new Pagination(refs.artistsPagination, {
  totalItems,
  itemsPerPage,
  page: startPage,
  visiblePages: 5,
  centerAlign: true,
  usageStatistics: false,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
      '</a>'
  },
});


  pagination.on('afterMove', event => {
    loadPage(event.page);
  });
}

// Для фильтров (если нужно будет)
export async function reloadArtistsWithFilters({
  genre = null,
  name = null,
  sortName = null,
} = {}) {
  state.genre = genre;
  state.name = name;
  state.sortName = sortName;

  if (pagination) {
    pagination.off();
    refs.artistsPagination.innerHTML = '';
    pagination = null;
  }

  await loadPage(1);
}

// старт
loadPage(1);

export const renderFeedbackSlider = feedbacks => {
  const container = document.querySelector('.section-feedback .container');
  if (!container) return console.error('Container not found');

  const markup = `
    <div class="feedback-slider swiper">
      <div class="swiper-wrapper">
        ${feedbacks.map(fb => `
          <div class="swiper-slide">
            <div class="feedback-card">
              <div class="stars">${renderStars(fb.rating)}</div>
              <p class="comment">"${fb.descr}"</p>
              <h3 class="comm-name">${fb.name}</h3>
            </div>
          </div>
        `).join('')}
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

  document.querySelector('.swiper-button-next')?.addEventListener('click', () => {
    swiperInstance.slideNext();
  });
  document.querySelector('.swiper-button-prev')?.addEventListener('click', () => {
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

