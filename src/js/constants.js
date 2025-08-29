export const api = {
  BASE_URL: 'https://sound-wave.b.goit.study/api',
  ENDPOINTS: {
    genres: () => '/genres',
    artists: () => '/artists',
    artistById: id => `/artists/${id}`,
    artistByIdWithAlbums: id => `/artists/${id}/albums`,
    feedbacks: () => '/feedbacks',
  },
  PER_PAGE: 8,
};

export const SORT_TYPES = {
  ASC: 'asc',
  DESC: 'desc',
};
