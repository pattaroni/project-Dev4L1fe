export function saveTheme(theme) {
  localStorage.setItem('theme', theme);
}
export function loadTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.body.setAttribute('data-theme', saved);
  }
}
