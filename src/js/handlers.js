import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { fetchArtists, fetchFeedbacks } from './api';
import { renderArtists, renderFeedbackSlider } from './render-function';
import { loader, getPaginationOptions, getVisiblePages } from './helpers';
import { refs } from './refs';
import { openArtistModal } from './modal';

export async function handleArtists() {
  let pagination = null;
  let windowWidth = window.innerWidth;

  async function loadPage(page = 1) {
    const loaderEl = loader.create(refs.artistsLoader);
    loader.show(loaderEl);
    refs.artistsLoader.style.display = 'flex';

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
      refs.artistsLoader.style.display = 'none';
      document
        .querySelector('.artists-subtitle')
        .scrollIntoView({ behavior: 'smooth' });
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

export const initArtistModal = () => {
  refs.artistsList.addEventListener('click', async e => {
    const btn = e.target.closest('.artist-btn-learn-more');

    if (btn?.nodeName !== 'BUTTON') {
      return;
    }
    const artistId = btn.closest('.artists-list-item')?.dataset?.id;
    if (!artistId) {
      iziToast.error({
        message: `CUnable to find this artist. Please try again later.`,
      });
      return;
    }

    openArtistModal(artistId);
  });
};
