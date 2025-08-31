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
  const totalPages = Math.ceil(totalItems / PER_PAGE);

  return {
    artists: data.artists || [], // массив артистов
    totalItems, // всего артистов
    totalPages, // всего страниц
    currentPage: page, // текущая страница
  };
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

export const fetchFeedbacks = async (page = 1) => {
  const { data } = await axios.get(ENDPOINTS.feedbacks(), {
    params: {
      page,
      limit: PER_PAGE,
    },
  });

  const totalItems = data.total || 0;
  const totalPages = Math.ceil(totalItems / PER_PAGE);

  return {
    feedbacks: data.feedbacks || [],
    totalItems,
    totalPages,
    currentPage: page,
  };
};
