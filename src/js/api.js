import axios from 'axios';
import { api } from './constants';

const { BASE_URL, ENDPOINTS, PER_PAGE } = api;

axios.defaults.baseURL = BASE_URL;

export const fetchGenres = async () => {
  const { data } = await axios.get(ENDPOINTS.genres());
  return data;
};

// use SORT_TYPES from constants.js for sortName
export const fetchArtists = async ({
  page = 1,
  genre,
  name,
  sortName,
} = {}) => {
  const { data } = await axios.get(ENDPOINTS.artists(), {
    params: {
      page,
      limit: PER_PAGE,
      ...(!!genre && { genre }),
      ...(!!name && { name }),
      ...(!!sortName && { sortName }),
    },
  });

  const totalItems = data.totalArtists || 0;
  const isLastPage = page >= Math.ceil(totalItems / PER_PAGE);

  return { data, isLastPage };
};

export const fetchArtistById = async id => {
  const { data } = await axios.get(ENDPOINTS.artistById(id));
  return data;
};

export const fetchArtistByIdWithAlbums = async id => {
  const { data } = await axios.get(ENDPOINTS.artistByIdWithAlbums(id));
  return data;
};

export const postFeedback = async feedback => {
  const { data } = await axios.post(ENDPOINTS.feedbacks(), feedback);
  return data;
};

export const fetchFeedbacks = async (page = 1, PER_PAGE = 10) => {
  const { data } = await axios.get(ENDPOINTS.feedbacks(), {
    params: {
      page,
      limit: PER_PAGE,
    },
  });

  const feedbacks = data.data || [];
  const totalItems = data.total || 0;
  const isLastPage = page >= Math.ceil(totalItems / PER_PAGE);

  return { feedbacks, isLastPage };
};

