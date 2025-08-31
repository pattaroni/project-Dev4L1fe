import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const API_URL = 'https://sound-wave.b.goit.study/api/artists';
const GENRES_URL = 'https://sound-wave.b.goit.study/api/genres';
const ITEMS_PER_PAGE = 8; 
let refs = {};
let pagination = null;


let currentFilters = {
  genre: '',
  sortName: '', // asc|desc
  name: '',     // строка поиска
};

// ---- ИНИЦИАЛИЗАЦИЯ ----
export async function initFilters() {
  // 1) Берём ссылки на элементы ТОЛЬКО сейчас, когда HTML уже вставлен в DOM
  refs = {
    form: document.getElementById('filters-form'),
    genreSelect: document.getElementById('genre-select'),
    sortSelect: document.getElementById('sort-select'),
    searchInput: document.getElementById('search-input'),
    searchButton: document.getElementById('search-button'),
    resetButton: document.getElementById('reset-filters-btn'),
    artistsList: document.querySelector('.artists-list'),
    paginationContainer: document.getElementById('pagination'),
  };

  await populateGenreSelect();
  setupEventListeners();
  await handleFilters(); // первичная загрузка первой страницы без фильтров
}

// ---- GENRES ----
async function fetchGenres() {
  try {
    const res = await fetch(GENRES_URL);
    if (!res.ok) throw new Error('Genres request failed');
    return await res.json(); // ожидаем [{ name: 'Rock' }, ...]
  } catch (e) {
    console.error('Ошибка загрузки жанров:', e);
    return [];
  }
}

async function populateGenreSelect() {
  const genres = await fetchGenres();
  if (!refs.genreSelect) return;
  refs.genreSelect.innerHTML = '<option value="">Select genre</option>';
  genres.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g.name;
    opt.textContent = g.name;
    refs.genreSelect.appendChild(opt);
  });
}

// ---- ARTISTS ----
async function fetchArtists({ genre = '', sortName = '', name = '', page = 1 } = {}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(ITEMS_PER_PAGE),
  });
  if (genre) params.append('genre', genre);
  if (name) params.append('name', name);
  if (sortName) params.append('sortName', sortName);

  const url = `${API_URL}?${params.toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Artists request failed');
    return await res.json(); // варианты: { artists, totalArtists } или { results, totalItems }
  } catch (error) {
    console.error('Ошибка загрузки артистов:', error);
    return { artists: [], totalArtists: 0 };
  }
}

// Нормализация возможных вариантов ответа
function extractPayload(apiData) {
  const list = apiData.results ?? apiData.artists ?? [];
  const total = apiData.totalItems ?? apiData.totalArtists ?? 0;
  return { list, total };
}

function renderArtistsUI(list) {
  if (!refs.artistsList) return;

  refs.artistsList.innerHTML = '';

  if (!list.length) {
    refs.artistsList.innerHTML = '<p class="no-results">No artists found.</p>';
    if (refs.paginationContainer) refs.paginationContainer.innerHTML = '';
    pagination = null; // сброс ссылки, чтобы заново создать при следующей загрузке
    return;
  }

  const markup = list
    .map(a => {
      const genresMarkup = (a.genres ?? []).map(g => `<li class="genres-list-item">${g}</li>`).join('');
      return `
        <li class="artists-list-item">
          <img src="${a.strArtistThumb}" alt="${a.strArtist}" class="artist-image" />
          <ul class="genres-list">${genresMarkup}</ul>
          <h3 class="artist-name">${a.strArtist}</h3>
          <p class="artist-descr">${(a.strBiographyEN || '').slice(0, 120)}...</p>
        </li>`;
    })
    .join('');

  refs.artistsList.insertAdjacentHTML('beforeend', markup);
}

// ---- PAGINATION ----

function setupPagination(totalItems) {
  if (!refs.paginationContainer) return;

  if (!totalItems) {
    refs.paginationContainer.innerHTML = '';
    pagination = null;
    return;
  }

  if (pagination) {
    pagination.reset(totalItems);
    return;
  }

  pagination = new Pagination(refs.paginationContainer, {
    totalItems,
    itemsPerPage: ITEMS_PER_PAGE,
    visiblePages: 5,
    centerAlign: true,
    template: {
      page: '<button class="pagination-btn">{{page}}</button>',
      currentPage: '<button class="pagination-btn active">{{page}}</button>',
      moveButton({ type }) {
        const src =
          type === 'prev'
            ? '/src/img/SliderArrowLeft.png'
            : '/src/img/SliderArrowRight.png';
        const label =
          type === 'prev' ? 'Previous page' : 'Next page';
        const className =
          type === 'prev' ? 'move-prev' : 'move-next';

        return `
          <button class="pagination-btn ${className}" aria-label="${label}">
            <img src="${src}" alt="${label}" class="arrow-img" />
          </button>
        `;
      },
      moreButton: '<span class="pagination-btn dots">...</span>',
    },
  });

  pagination.on('beforeMove', async evt => {
    const page = evt.page;
    const data = await fetchArtists({ ...currentFilters, page });
    const { list } = extractPayload(data);
    renderArtistsUI(list);
  });
}

// ---- EVENTS ----
function setupEventListeners() {
  // Поиск по кнопке-лупе (submit формы) и Enter
  refs.form.addEventListener('submit', async e => {
    e.preventDefault();
    await handleFilters();
  });

  // Изменение жанра/сортировки — сразу фильтруем с первой страницы
  refs.genreSelect.addEventListener('change', handleFilters);
  refs.sortSelect.addEventListener('change', handleFilters);

  // Сброс
  refs.resetButton.addEventListener('click', async () => {
    refs.form.reset();
    currentFilters = { genre: '', sortName: '', name: '' };
    await handleFilters();
  });
}

async function handleFilters() {
  // Считываем актуальные значения из UI
  currentFilters.genre = refs.genreSelect.value;
  currentFilters.sortName = refs.sortSelect.value;   // важно имя параметра
  currentFilters.name = refs.searchInput.value.trim(); // важно имя параметра

  // Загружаем первую страницу с текущими фильтрами
  const data = await fetchArtists({ ...currentFilters, page: 1 });
  const { list, total } = extractPayload(data);

  renderArtistsUI(list);
  setupPagination(total);
}

