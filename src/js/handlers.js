import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { fetchArtists, fetchFeedbacks, fetchGenres } from './api';
import {
  renderArtists,
  renderFeedbackSlider,
  renderGenresOptions,
} from './render-function';
import { loader, getPaginationOptions, getVisiblePages } from './helpers';
import { refs } from './refs';
import { openArtistModal } from './modal';
import { SORT_TYPES } from './constants';

export async function handleArtists() {
  async function loadPage(page = 1) {
    const loaderEl = loader.create(refs.artistsLoader);
    loader.show(loaderEl);
    refs.artistsLoader.style.display = 'flex';

    try {
      const response = await fetchArtists({
        page,
      });
      initFilteredPagination(response.totalItems, response.perPage);

      renderArtists(response.artists);
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
      refs.artistsLoader.style.display = 'none';
    }
  }

  await loadPage(1);
}

export async function initFeedbackSection() {
  // const loaderEl = loader.create(refs.feedbackContainer);
  // loader.show(loaderEl);
  try {
    const { feedbacks } = await fetchFeedbacks(1, 10);
    if (!Array.isArray(feedbacks)) throw new Error('Feedbacks is not an array');

    renderFeedbackSlider(feedbacks);
  } catch (err) {
    console.error('Feedback fetch error:', err);
  } finally {
    // loader.hide(loaderEl);
  }
}

// ================== FILTERS ==================

let filtersState = {
  genre: '',
  sortName: '',
  name: '',
  page: 1,
};

export async function initArtistFilters() {
  await loadGenres();
  attachFilterListeners();
}

async function loadGenres() {
  try {
    const genres = await fetchGenres();

    const options = renderGenresOptions(genres);

    refs.genreSelect.insertAdjacentHTML('beforeend', options);
  } catch (error) {
    iziToast.error({ message: 'Failed to load genres' });
  }
}

function attachFilterListeners() {
  refs.filtersMenuBtn.addEventListener('click', () => {
    refs.filtersMenu.classList.toggle('is-open');
    refs.filtersMenuIcon.classList.toggle('is-open');
  });

  refs.filtersSortingBtn.addEventListener('click', () => {
    refs.filtersSortingMenu.classList.toggle('is-open');
    refs.filtersSortingIcon.classList.toggle('is-open');
    refs.filtersSortingBtn.classList.toggle('is-open');
  });

  refs.filtersGenreBtn.addEventListener('click', () => {
    refs.filtersGenreMenu.classList.toggle('is-open');
    refs.filtersGenreIcon.classList.toggle('is-open');
    refs.filtersGenreBtn.classList.toggle('is-open');
  });

  refs.filtersSortingList.addEventListener('click', e => {
    const selectedOption = e.target;
    let parameter = '';

    if (!selectedOption || selectedOption.nodeName !== 'BUTTON') return;

    if (selectedOption.hasAttribute('data-filters-asc')) {
      parameter = SORT_TYPES.ASC;
    }
    if (selectedOption.hasAttribute('data-filters-desc')) {
      parameter = SORT_TYPES.DESC;
    }

    if (parameter === filtersState.sortName) return;

    filtersState.sortName = parameter;
    filtersState.page = 1;
    applyFilters();
  });

  refs.filtersGenreList.addEventListener('click', e => {
    const selectedOption = e.target;

    if (!selectedOption || selectedOption.nodeName !== 'BUTTON') return;
    const genre = selectedOption.dataset.genre;

    if (!genre || filtersState.genre === genre) return;

    filtersState.genre = genre;
    filtersState.page = 1;
    applyFilters();
  });

  refs.searchBtn.addEventListener('click', e => {
    e.preventDefault();

    const value = refs.searchInput.value.trim();
    if (value === filtersState.name) return;

    filtersState.name = refs.searchInput.value.trim();
    filtersState.page = 1;
    applyFilters();
  });

  refs.searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = refs.searchInput.value.trim();
      if (value === filtersState.name) return;
      refs.filtersMenu.classList.remove('is-open');
      filtersState.name = value;
      filtersState.page = 1;

      applyFilters();
    }
  });

  refs.filtersResetBtn.addEventListener('click', () => {
    refs.searchInput.value = '';
    filtersState = { genre: '', sortName: '', name: '', page: 1 };
    refs.filtersWrapper?.classList?.remove('is-open');
    refs.filtersMenu.classList.remove('is-open');
    refs.filtersMenuIcon.classList.remove('is-open');
    refs.filtersSortingMenu.classList.remove('is-open');
    refs.filtersSortingIcon.classList.remove('is-open');
    refs.filtersSortingBtn.classList.remove('is-open');
    refs.filtersGenreMenu.classList.remove('is-open');
    refs.filtersGenreIcon.classList.remove('is-open');
    refs.filtersGenreBtn.classList.remove('is-open');

    applyFilters();
  });

  refs.filtersResetBtnMob.addEventListener('click', () => {
    refs.searchInput.value = '';
    filtersState = { genre: '', sortName: '', name: '', page: 1 };
    refs.filtersWrapper?.classList?.remove('is-open');
    refs.filtersMenu.classList.remove('is-open');
    refs.filtersMenuIcon.classList.remove('is-open');
    refs.filtersSortingMenu.classList.remove('is-open');
    refs.filtersSortingIcon.classList.remove('is-open');
    refs.filtersSortingBtn.classList.remove('is-open');
    refs.filtersGenreMenu.classList.remove('is-open');
    refs.filtersGenreIcon.classList.remove('is-open');
    refs.filtersGenreBtn.classList.remove('is-open');

    applyFilters();
  });

  if (refs.emptyResetBtn) {
    refs.emptyResetBtn.addEventListener('click', () => {
      refs.genreSelect.value = '';
      refs.sortSelect.value = '';
      refs.searchInput.value = '';
      filtersState = { genre: '', sortName: '', name: '', page: 1 };
      document.querySelector('.artists-empty-state').classList.add('is-hidden');

      applyFilters();
    });
  }
}

let paginationInstance = null;

async function applyFilters() {
  const loaderEl = loader.create(refs.artistsLoader);
  loader.show(loaderEl);

  try {
    const response = await fetchArtists(filtersState);

    if (!response || !Array.isArray(response.artists)) {
      throw new Error('Invalid API response structure');
    }

    if (response.artists.length === 0) {
      refs.artistsList.innerHTML = '';
      document
        .querySelector('.artists-empty-state')
        .classList.remove('is-hidden');
      refs.artistsPagination.classList.add('is-hidden');
    } else {
      document.querySelector('.artists-empty-state').classList.add('is-hidden');
      refs.artistsPagination.classList.remove('is-hidden');
      renderArtists(response.artists);
      initFilteredPagination(response.totalItems, response.perPage);
    }
  } catch (error) {
    iziToast.error({ message: 'Failed to load filtered artists' });
  } finally {
    loader.hide(loaderEl);
    refs.artistsLoader.style.display = 'none';
    document
      .querySelector('.artists-subtitle')
      .scrollIntoView({ behavior: 'smooth' });
  }
}

function initFilteredPagination(totalItems, itemsPerPage) {
  let windowWidth = window.innerWidth;
  paginationInstance = new Pagination(
    refs.artistsPagination,
    getPaginationOptions({
      page: filtersState.page,
      visiblePages: getVisiblePages(windowWidth),
      itemsPerPage,
      totalItems,
    })
  );

  paginationInstance.on('afterMove', event => {
    filtersState.page = event.page;
    applyFilters();
  });
}

export const initArtistModal = () => {
  refs.artistsList.addEventListener('click', async e => {
    const btn = e.target.closest('.artist-btn-learn-more');

    if (btn?.nodeName !== 'BUTTON') {
      return;
    }
    const artistId = btn.closest('.artists-list-item')?.dataset?.id;
    if (!artistId) {
      iziToast.error({
        message: `Unable to find this artist. Please try again later.`,
      });
      return;
    }

    openArtistModal(artistId);
  });
};
