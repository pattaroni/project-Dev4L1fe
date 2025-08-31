import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import { fetchArtists } from './api';
import { refs } from './refs';
import { prepareArtistDescription, showLoader, hideLoader } from './helpers';
import { api } from './constants';
import spriteUrl from '../img/sprite.svg?url';

const { PER_PAGE } = api;

export function renderArtists(data, { reset = false } = {}) {
  if (reset) {
    refs.artistsList.innerHTML = '';
  }

  const markup = data
    .map(artist => {
      const genresMarkup = artist.genres
        .map(genre => `<li class="genres-list-item">${genre}</li>`)
        .join('');
      const preparedArtistDescription = prepareArtistDescription(
        artist.strBiographyEN
      );

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
