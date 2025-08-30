import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchArtists, fetchFeedbacks } from './api';
import { renderArtists, renderFeedbackSlider } from './render-function';

export async function handleArtists() {
  try {
    const { data } = await fetchArtists();
    console.log(data);
    renderArtists(data.artists);
  } catch (error) {
    if (error.response) {
      iziToast.error({
        message: `Error ${error.response.status}: ${error.response.data}`,
      });
    } else {
      iziToast.error({ message: `Error: ${error.message}` });
    }
  }
}

export async function initFeedbackSection() {
  try {
    const { feedbacks } = await fetchFeedbacks(1, 10);
    if (!Array.isArray(feedbacks)) throw new Error('Feedbacks is not an array');

    renderFeedbackSlider(feedbacks);
  } catch (err) {
    console.error('Feedback fetch error:', err);
  }
}
