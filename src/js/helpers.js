import spriteUrl from '../img/sprite.svg?url';
import { saveTheme } from './storage';

export const prepareArtistDescription = (text = '') => {
  const isSupportsLineClamp =
    CSS.supports('-webkit-line-clamp', '2') &&
    CSS.supports('display', '-webkit-box');

  if (isSupportsLineClamp) {
    return text;
  }
  return text.length > 80 ? text.slice(0, 80).trim() + '...' : text;
};

export const loader = {
  create(element) {
    if (!element) return;
    let loaderEl = element.querySelector('.loader');
    if (!loaderEl) {
      const markup = '<span class="loader hidden"></span>';
      element.insertAdjacentHTML('beforeend', markup);
      loaderEl = element.querySelector('.loader');
    }
    return { loaderEl, parent: element };
  },
  show({ loaderEl, parent } = {}) {
    if (!loaderEl || !parent) return;
    loaderEl?.classList.remove('hidden');
    if (parent === document.querySelector('.artists-loader')) {
      parent.style.display = 'flex';
      loaderEl?.classList.remove('hidden');
    }
  },
  hide({ loaderEl, parent } = {}) {
    if (!loaderEl || !parent) return;
    loaderEl?.classList.add('hidden');
    if (parent === document.querySelector('.artists-loader')) {
      parent.style.display = 'none';
      loaderEl?.classList.add('hidden');
    }
  },
};

/*
 Інструкція:
  - create(parentEl) → додає лоадер у вказаний контейнер і повертає його
  - show(loaderEl) → показує лоадер (знімає клас 'hidden')
  - hide(loaderEl) → ховає лоадер (додає клас 'hidden')

 Використання:
   const loaderEl = loader.create(refs.container);
   loader.show(loaderEl);
   ... // async code
   loader.hide(loaderEl);
*/

export const getPaginationOptions = ({
  page,
  visiblePages,
  itemsPerPage,
  totalItems,
} = {}) => ({
  totalItems,
  itemsPerPage,
  page,
  visiblePages,
  centerAlign: true,
  usageStatistics: false,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton: ({ type }) =>
      `<a href="#" class="tui-page-btn tui-${type}">` +
      `<svg class="pagination-${
        type === 'next' ? 'right' : 'left'
      }-icon"><use href="${spriteUrl}#${
        type === 'next' ? 'right' : 'left'
      }-arrow-icon"></use></svg>` +
      '</a>',
    disabledMoveButton: ({ type }) =>
      `<span class="tui-page-btn tui-is-disabled tui-${type}">` +
      `<svg class="icon-disabled pagination-${
        type === 'next' ? 'right' : 'left'
      }-icon"><use href="${spriteUrl}#${
        type === 'next' ? 'right' : 'left'
      }-arrow-icon"></use></svg>` +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
});

export const getVisiblePages = width => {
  if (width < 768) {
    return 3;
  } else if (width >= 768 && width < 1440) {
    return 4;
  }
  return 5;
};

export const formatDuration = ms => {
  if (!ms || isNaN(ms)) return 'N/A';
  const totalSeconds = Math.floor(ms / 1000);
  const min = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
};

export function updateArrowVisibility(swiper) {
  const prevBtn = swiper.el.querySelector('.swiper-button-prev');
  const nextBtn = swiper.el.querySelector('.swiper-button-next');

  if (swiper.isBeginning) {
    prevBtn.classList.add('swiper-button-disabled');
  } else {
    prevBtn.classList.remove('swiper-button-disabled');
  }

  if (swiper.isEnd) {
    nextBtn.classList.add('swiper-button-disabled');
  } else {
    nextBtn.classList.remove('swiper-button-disabled');
  }

  if (swiper.slides.length <= swiper.params.slidesPerView) {
    prevBtn.classList.add('swiper-button-disabled');
    nextBtn.classList.add('swiper-button-disabled');
  }
}

export function toggleTheme() {
  const current = document.body.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', next);

  saveTheme(next);
}
