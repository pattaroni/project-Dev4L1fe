import { handleArtists, initFeedbackSection } from './js/handlers';
import { loader } from './js/helpers.js';
import { refs } from './js/refs.js';
import './js/to-top.js';
import { initFilters } from './js/filters.js';

handleArtists();
initFeedbackSection();

document.addEventListener('DOMContentLoaded', () => {
  const filtersContainer = document.querySelector('#filters-container-placeholder');
  if (!filtersContainer) return; // якщо секції нема — виходим

  fetch('./partials/artists-modal.html')
    .then(res => res.text())
    .then(html => {
      // 1) Вставляем HTML фільтрів
      filtersContainer.innerHTML = html;

      // 2) Инициализируем логику ПОСЛЕ вставки
      initFilters();
    })
    .catch(err => {
      console.error('Failed to load artists-modal.html:', err);
    });
});