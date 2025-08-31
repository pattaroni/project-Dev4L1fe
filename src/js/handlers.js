import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchArtists, fetchFeedbacks } from './api';
import { renderArtists, renderFeedbackSlider } from './render-function';
import { loader } from './helpers';
import { refs } from './refs';

export async function handleArtists() {
  let loaderEl;
  try {
    loaderEl = loader.create(refs.artistsList);
    loader.show(loaderEl);
    const { data } = await fetchArtists();
    loader.show(loaderEl);
    renderArtists(data.artists);
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

export async function initFeedbackSection() {
  const loaderEl = loader.create(refs.containerEL)
  loader.show(loaderEl)
    try {
    const { feedbacks } = await fetchFeedbacks(1, 10);
    if (!Array.isArray(feedbacks)) throw new Error('Feedbacks is not an array');

    renderFeedbackSlider(feedbacks);
  } catch (err) {
    console.error('Feedback fetch error:', err);
    } finally {
        loader.hide(loaderEl)
  }
}
