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
    const markup = '<span class="loader hidden"></span>';
    element.insertAdjacentHTML('beforeend', markup);
    return element.querySelector('.loader');
  },
  show(loaderEl) {
    loaderEl?.classList.remove('hidden');
  },
  hide(loaderEl) {
    loaderEl?.classList.add('hidden');
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
