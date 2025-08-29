import { refs } from './refs';

export function renderArtists(data) {
  const markup = data.map(artist => {
    const genresMarkup = artist.genres
      .map(genre => `<li class="genres-list-item">${genre}</li>`)
      .join('');
    return `<ul class="artists-list">
            <li class="artists-list-item">
                <img src="${artist.strArtistThumb}" alt="${artist.strArtist}" />
                <ul class="genres-list">
                    ${genresMarkup}
                </ul>
                <h3 class="artist-name">${artist.strArtist}</h3>
                <p class="artist-descr">${
                  artist.strBiographyEN.split('.')[0] + '.'
                }</p>
                <button type="button" class="artist-btn-learn-more">
                    <span>Learn More</span>
                    <span>
                        <svg class="artist-learn-svg" width="24" height="24">
                            <use href="/img/sprite.svg#next-icon"></use>
                        </svg>
                    </span>
                </button>
            </li>
        </ul>`;
  });
  refs.artistsList.insertAdjacentHTML('beforeend', markup);
}
