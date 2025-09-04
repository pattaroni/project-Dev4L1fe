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
  refs.genreSelect.addEventListener('change', () => {
    filtersState.genre = refs.genreSelect.value;
    filtersState.page = 1;
    applyFilters();
  });

  refs.sortSelect.addEventListener('change', () => {
    const val = refs.sortSelect.value;
    filtersState.sortName = val === 'az' ? 'asc' : val === 'za' ? 'desc' : '';
    filtersState.page = 1;
    applyFilters();
  });

  refs.searchBtn.addEventListener('click', e => {
    e.preventDefault();
    filtersState.name = refs.searchInput.value.trim();
    filtersState.page = 1;
    applyFilters();
  });

  refs.searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      filtersState.name = refs.searchInput.value.trim();
      filtersState.page = 1;
      applyFilters();
    }
  });

  refs.resetBtn.addEventListener('click', () => {
    refs.genreSelect.value = '';
    refs.sortSelect.value = '';
    refs.searchInput.value = '';
    filtersState = { genre: '', sortName: '', name: '', page: 1 };
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

  if (refs.toggleBtn && refs.filtersWrapper) {
    refs.toggleBtn.addEventListener('click', () => {
      refs.filtersWrapper.classList.toggle('is-open');
      const expanded = refs.toggleBtn.getAttribute('aria-expanded') === 'true';
      refs.toggleBtn.setAttribute('aria-expanded', String(!expanded));
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
      refs.artistsPagination.innerHTML = '';
    } else {
      document.querySelector('.artists-empty-state').classList.add('is-hidden');
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
