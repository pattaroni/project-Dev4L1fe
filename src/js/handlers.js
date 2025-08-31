import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchArtists } from './api';
import { renderArtists } from './render-function';
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
