import { refs } from './refs';
import { prepareArtistDescription } from './helpers';

export function renderArtists(data) {
  const markup = data
    .map(artist => {
      const genresMarkup = artist.genres
        .map(genre => `<li class="genres-list-item">${genre}</li>`)
        .join('');
      const preparedArtistDescription = prepareArtistDescription(
        artist.strBiographyEN
      );

      return `<li class="artists-list-item">
                <img class="artist-image"
                  src="${artist.strArtistThumb}" 
                  alt="${artist.strArtist}" />
                <ul class="genres-list">
                    ${genresMarkup}
                </ul>
                <h3 class="artist-name">${artist.strArtist}</h3>
                <p class="artist-descr">${preparedArtistDescription}</p>
                <button type="button" class="artist-btn-learn-more">
                    <span>Learn More</span>
                    <span>
                        <svg class="artist-learn-svg" width="14" height="14">
                            <use href="/img/sprite.svg#next-icon"></use>
                        </svg>
                    </span>
                </button>
            </li>`;
    })
    .join('');
  refs.artistsList.insertAdjacentHTML('beforeend', markup);
}
