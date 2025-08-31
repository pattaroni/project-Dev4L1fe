const API_URL = 'https://sound-wave.b.goit.study/api/artists';
const GENRES_URL = 'https://sound-wave.b.goit.study/api/genres';

const refs = {
  form: document.getElementById('filters-form'),
  genreSelect: document.getElementById('genre-select'),
  sortSelect: document.getElementById('sort-select'),
  searchInput: document.getElementById('search-input'),
  searchButton: document.getElementById('search-button'),
  resetButton: document.getElementById('reset-filters-btn'),
  artistsList: document.querySelector('.artists-list'),
};

// ---------------------- 1. Загрузка жанров ----------------------
async function fetchGenres() {
  try {
    const res = await fetch(GENRES_URL);
    const data = await res.json();
    return data;
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

// ---------------------- 2. Получение артистов ----------------------
async function fetchArtists({ genre = '', sort = '', search = '', page = 1 } = {}) {
  const params = new URLSearchParams({
    genre,
    sortBy: sort,
    keyword: search,
    page,
    limit: 12,
  });

  try {
    const res = await fetch(`${API_URL}?${params.toString()}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Ошибка загрузки артистов:', error);
    return { results: [] };
  }
}

// ---------------------- 3. Отрисовка ----------------------
function renderArtists(data) {
  refs.artistsList.innerHTML = '';

  if (!data.results || data.results.length === 0) {
    refs.artistsList.innerHTML = '<p>No artists found.</p>';
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

// ---------------------- 4. Слушатели ----------------------
function setupEventListeners() {
  refs.form.addEventListener('submit', async e => {
    e.preventDefault();
    await handleFilters();
  });

  refs.sortSelect.addEventListener('change', handleFilters);
  refs.genreSelect.addEventListener('change', handleFilters);

  refs.resetButton.addEventListener('click', async () => {
    refs.form.reset();
    await handleFilters();
  });
}

async function handleFilters() {
  const genre = refs.genreSelect.value;
  const sort = refs.sortSelect.value;
  const search = refs.searchInput.value.trim();

  const data = await fetchArtists({ genre, sort, search });
  renderArtists(data);
}

// ---------------------- 5. Инициализация ----------------------
export async function initFilters() {
  await populateGenreSelect();
  setupEventListeners();
  await handleFilters(); // Загрузка по умолчанию
}