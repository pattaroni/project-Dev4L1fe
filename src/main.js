
import { handleArtists, initFeedbackSection } from './js/handlers';
import { loader } from './js/helpers.js';
import { refs } from './js/refs.js';
import './js/to-top.js';
import { initFilters } from './js/filters.js';

handleArtists();
initFeedbackSection();

document.addEventListener('DOMContentLoaded', () => {
  const filtersContainer = document.querySelector('#filters-container-placeholder');
    if (!filtersContainer) return;
    document.addEventListener('DOMContentLoaded', () => {
  initFilters();
});

  fetch('./partials/artists-modal.html')
    .then(res => res.text())
    .then(html => {
      filtersContainer.innerHTML = html;
      // initFilters(); если подключен функционал
    })
    .catch(err => {
    });
});


