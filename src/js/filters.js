import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const API_URL = 'https://sound-wave.b.goit.study/api/artists';
const GENRES_URL = 'https://sound-wave.b.goit.study/api/genres';
const ITEMS_PER_PAGE = 12;

const refs = {
  form: document.getElementById('filters-form'),
  genreSelect: document.getElementById('genre-select'),
  sortSelect: document.getElementById('sort-select'),
  searchInput: document.getElementById('search-input'),
  searchButton: document.getElementById('search-button'),
  resetButton: document.getElementById('reset-filters-btn'),
  artistsList: document.querySelector('.artists-list'),
  paginationContainer: document.getElementById('pagination'),
};

let pagination = null;
let currentFilters = {
  genre: '',
  sort: '',
  search: '',
};

async function fetchGenres() {
  try {
    const res = await fetch(GENRES_URL);
    return await res.json();
  } catch (error) {
    console.error('Ошибка загрузки жанров:', error);
    return [];
  }
}

async function populateGenreSelect() {
  const genres = await fetchGenres();
  refs.genreSelect.innerHTML = '<option value="">Select genre</option>';
  genres.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre.name;
    option.textContent = genre.name;
    refs.genreSelect.appendChild(option);
  });
}

async function fetchArtists({ genre = '', sort = '', search = '', page = 1 } = {}) {
  const params = new URLSearchParams({
    genre,
    sortBy: sort,
    keyword: search,
    page,
    limit: ITEMS_PER_PAGE,
  });

  try {
    const res = await fetch(`${API_URL}?${params}`);
    return await res.json();
  } catch (error) {
    console.error('Ошибка загрузки артистов:', error);
    return { results: [], totalItems: 0 };
  }
}

function renderArtists(data) {
  refs.artistsList.innerHTML = '';

  if (!data.results || data.results.length === 0) {
    refs.artistsList.innerHTML = '<p class="no-results">No artists found.</p>';
    refs.paginationContainer.innerHTML = '';
    return;
  }

  const markup = data.results
    .map(artist => {
      const genresMarkup = artist.genres.map(genre => `<li class="genres-list-item">${genre}</li>`).join('');
      return `
        <li class="artists-list-item">
          <img src="${artist.strArtistThumb}" alt="${artist.strArtist}" class="artist-image" />
          <ul class="genres-list">${genresMarkup}</ul>
          <h3 class="artist-name">${artist.strArtist}</h3>
          <p class="artist-descr">${artist.strBiographyEN?.slice(0, 120)}...</p>
        </li>
      `;
    })
    .join('');

  refs.artistsList.insertAdjacentHTML('beforeend', markup);
}

function setupPagination(totalItems) {
  if (pagination) {
    pagination.reset(totalItems);
    return;
  }

  pagination = new Pagination(refs.paginationContainer, {
    totalItems,
    itemsPerPage: ITEMS_PER_PAGE,
    visiblePages: 5,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
  });

  pagination.on('beforeMove', async evt => {
    const page = evt.page;
    const data = await fetchArtists({ ...currentFilters, page });
    renderArtists(data);
  });
}

function setupEventListeners() {
  refs.form.addEventListener('submit', async e => {
    e.preventDefault();
    await handleFilters();
  });

  refs.sortSelect.addEventListener('change', handleFilters);
  refs.genreSelect.addEventListener('change', handleFilters);

  refs.resetButton.addEventListener('click', async () => {
    refs.form.reset();
    currentFilters = { genre: '', sort: '', search: '' };
    await handleFilters();
  });
}

async function handleFilters() {
  currentFilters.genre = refs.genreSelect.value;
  currentFilters.sort = refs.sortSelect.value;
  currentFilters.search = refs.searchInput.value.trim();

  const data = await fetchArtists({ ...currentFilters, page: 1 });

  renderArtists(data);
  setupPagination(data.totalItems || 0);
}

export async function initFilters() {
  await populateGenreSelect();
  setupEventListeners();
  await handleFilters();
}