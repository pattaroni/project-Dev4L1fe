import {
  handleArtists,
  initFeedbackSection,
  initArtistFilters,
  initArtistModal,
} from './js/handlers';

import './js/to-top.js';
import './js/mobil-menu.js';
import './js/feedback-modal.js';
import { refs } from './js/refs.js';
import { toggleTheme } from './js/helpers.js';
import { loadTheme, saveTheme } from './js/storage.js';
loadTheme()
handleArtists();
initFeedbackSection();
initArtistFilters();
initArtistModal();

document.querySelectorAll('.theme-toggle').forEach(btn => {
  btn.addEventListener('click', toggleTheme);
});

