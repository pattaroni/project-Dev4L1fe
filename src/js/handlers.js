import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { fetchArtists, fetchFeedbacks, fetchGenres } from './api';
import { renderArtists, renderFeedbackSlider } from './render-function';
import { loader, getPaginationOptions, getVisiblePages } from './helpers';
import { refs } from './refs';

export async function handleArtists() {
  const loaderEl = loader.create(refs.artistsList);

  let pagination = null;
  let windowWidth = window.innerWidth;

  async function loadPage(page = 1) {
    loader.show(loaderEl);

    try {
      const { artists, totalItems, perPage } = await fetchArtists({
        page,
      });

      renderArtists(artists);

      if (!pagination) {
        initPagination(totalItems, perPage, page);
      }
    } catch (error) {
      if (error.response) {
        iziToast.error({
          message: `Error ${error.response.status}: ${error.response.data}`,
        });
      } else {
        iziToast.error({ message: `Error: ${error.message}` });
      }
    } finally {
      loader.hide(loaderEl);
    }
  }

  function initPagination(totalItems, itemsPerPage, startPage = 1) {
    pagination = new Pagination(
      refs.artistsPagination,
      getPaginationOptions({
        page: startPage,
        visiblePages: getVisiblePages(windowWidth),
        itemsPerPage,
        totalItems,
      })
    );

    pagination.on('afterMove', event => {
      loadPage(event.page);
    });
  }

  await loadPage(1);
}

export async function initFeedbackSection() {
  const loaderEl = loader.create(refs.feedbackContainer);
  loader.show(loaderEl);
  try {
    const { feedbacks } = await fetchFeedbacks(1, 10);
    if (!Array.isArray(feedbacks)) throw new Error('Feedbacks is not an array');

    renderFeedbackSlider(feedbacks);
  } catch (err) {
    console.error('Feedback fetch error:', err);
  } finally {
    loader.hide(loaderEl);
  }
}

// ================== FILTERS ==================
const genreSelect = document.querySelector('#genre-select');
const sortSelect = document.querySelector('#sort-select');
const searchInput = document.querySelector('.filters-search-input');
const searchBtn = document.querySelector('.filters-search-btn');
const resetBtn = document.querySelector('.filters-reset-btn');

let filtersState = {
  genre: '',
  sortName: '',
  name: '',
  page: 1,
};

export async function initArtistFilters() {
  await loadGenres();
  attachFilterListeners();
  applyFilters(); // начальная загрузка артистов с фильтрами
}

async function loadGenres() {
  try {
    const genres = await fetchGenres(); // массив жанров

    
    const options = genres
  .map(g => `<option value="${g.genre}">${g.genre}</option>`) // 👈 genre вместо _id
  .join('');

    genreSelect.innerHTML =
      `<option value="" disabled selected hidden>Genre</option>` + options;
  } catch (error) {
    iziToast.error({ message: 'Failed to load genres' });
    console.error(error);
  }
}


function attachFilterListeners() {
  genreSelect.addEventListener('change', () => {
    filtersState.genre = genreSelect.value;
    filtersState.page = 1;
    applyFilters();
  });

  sortSelect.addEventListener('change', () => {
    const val = sortSelect.value;
    filtersState.sortName = val === 'az' ? 'asc' : val === 'za' ? 'desc' : '';
    filtersState.page = 1;
    applyFilters();
  });

  searchBtn.addEventListener('click', e => {
    e.preventDefault();
    filtersState.name = searchInput.value.trim();
    filtersState.page = 1;
    applyFilters();
  });

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      filtersState.name = searchInput.value.trim();
      filtersState.page = 1;
      applyFilters();
    }
  });

  resetBtn.addEventListener('click', () => {
    genreSelect.value = '';
    sortSelect.value = '';
    searchInput.value = '';
    filtersState = { genre: '', sortName: '', name: '', page: 1 };
    applyFilters();
  });
  // ✅ ДОБАВЛЕННЫЙ код для Reset Filters в пустом состоянии
  const emptyResetBtn = document.querySelector('.empty-reset-btn');

  if (emptyResetBtn) {
    emptyResetBtn.addEventListener('click', () => {
      genreSelect.value = '';
      sortSelect.value = '';
      searchInput.value = '';
      filtersState = { genre: '', sortName: '', name: '', page: 1 };
      document.querySelector('.artists-empty-state').classList.add('is-hidden');
      applyFilters();
    });
  }
  // ✅ Кнопка "Search and Filters" — показать/скрыть фильтры
  const toggleBtn = document.querySelector('.filters-toggle-btn');
  const filtersWrapper = document.querySelector('.filters-wrapper');

  if (toggleBtn && filtersWrapper) {
    toggleBtn.addEventListener('click', () => {
      filtersWrapper.classList.toggle('is-open');
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', String(!expanded));
    });
  }
}

let paginationInstance = null;

async function applyFilters() {
  const loaderEl = loader.create(refs.artistsList);
  loader.show(loaderEl);

  try {
    const response = await fetchArtists(filtersState);

    if (!response || !Array.isArray(response.artists)) {
      throw new Error('Invalid API response structure');
    }

    // renderArtists(response.artists);
    // initFilteredPagination(response.totalItems, response.perPage);
    if (response.artists.length === 0) {
  refs.artistsList.innerHTML = ''; // очищаем предыдущих артистов
  document.querySelector('.artists-empty-state').classList.remove('is-hidden');
  refs.artistsPagination.innerHTML = ''; // убираем пагинацию
} else {
  document.querySelector('.artists-empty-state').classList.add('is-hidden');
  renderArtists(response.artists);
  initFilteredPagination(response.totalItems, response.perPage);
}
  } catch (error) {
    iziToast.error({ message: 'Failed to load filtered artists' });
  } finally {
    loader.hide(loaderEl);
  }
}

function initFilteredPagination(totalItems, itemsPerPage) {
//  if (paginationInstance) paginationInstance.destroy();
  paginationInstance = new Pagination(refs.artistsPagination, {
    totalItems,
    itemsPerPage,
    visiblePages: 5,
    centerAlign: true,
    page: filtersState.page,
  });

  paginationInstance.on('afterMove', event => {
    filtersState.page = event.page;
    applyFilters();
  });
}