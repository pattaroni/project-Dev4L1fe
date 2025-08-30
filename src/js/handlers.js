import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchArtists } from './api';
import { renderArtists } from './render-function';

export async function handleArtists() {
  try {
    const { data } = await fetchArtists();
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
