export const prepareArtistDescription = (text = '') => {
  const isSupportsLineClamp =
    CSS.supports('-webkit-line-clamp', '2') &&
    CSS.supports('display', '-webkit-box');

  if (isSupportsLineClamp) {
    return text;
  }
  return text.length > 80 ? text.slice(0, 80).trim() + '...' : text;
};

export function showLoader(node) {
  if (!node) return;
  node.classList.add('is-loading');
}

export function hideLoader(node) {
  if (!node) return;
  node.classList.remove('is-loading');
}

