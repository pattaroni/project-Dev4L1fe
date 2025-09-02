import spriteUrl from '../img/sprite.svg?url';

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
    if (parent === document.querySelector('.artists-loader')) {
      parent.style.display = 'flex';
    }
  },
  hide({ loaderEl, parent } = {}) {
    if (!loaderEl || !parent) return;
    loaderEl?.classList.add('hidden');
    if (parent === document.querySelector('.artists-loader')) {
      parent.style.display = 'none';
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
