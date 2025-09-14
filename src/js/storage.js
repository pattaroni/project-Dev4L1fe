import { refs } from "./refs";

export function saveTheme(theme) {
  localStorage.setItem('theme', theme);
}
export function loadTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.body.setAttribute('data-theme', saved);
  }
}

export function saveValueTextArea(value) {
  localStorage.setItem('textFeedBack', value)
}

export function loadValueTextArea() {
  const savedMessage = localStorage.getItem("textFeedBack");
  if (savedMessage && refs.textareaEl && refs.counterEl) {
    refs.textareaEl.value = savedMessage;
    refs.counterEl.textContent = `${savedMessage.length} / 500`;

    const isInvalid = savedMessage.length < 10 || savedMessage.length > 500;
    refs.textareaEl.classList.toggle("invalid", isInvalid);
    refs.counterEl.classList.toggle("error", isInvalid);
  }
}

