function initFeedbackModal() {
  const modal = document.getElementById("feedback-modal");
  if (!modal) return;

  const closeIcon = modal.querySelector(".modal__close");      // <svg>
  const backdrop  = modal.querySelector(".modal__backdrop");
  const nameInput = modal.querySelector("#fb-name");
  const form      = modal.querySelector(".modal__form");
  const ratingHost= modal.querySelector("#star-rating");

  let starsMounted = false;

  const open = () => {
    modal.classList.add("active");
    document.body.classList.add("modal-open");
    setTimeout(() => nameInput?.focus(), 0);

   if (!starsMounted && ratingHost) {
          
  mountStarRating(ratingHost, { scoreName: "rating", max: 5 });
  starsMounted = true;
}
  };

  const resetStars = () => {
    if (!ratingHost) return;
    const hidden = ratingHost.querySelector('input[name="rating"]');
    if (hidden) hidden.value = "0";
    ratingHost.querySelectorAll("button")
      .forEach(b => b.classList.remove("is-on","is-half","is-hover","is-hover-half"));
  };

  const close = () => {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
    // якщо треба — скидай рейтинг при закритті:
    // resetStars();
  };

  // Відкрити (делегування: спрацює і для #open-modal, і для [data-open="feedback-modal"])
  document.addEventListener("click", (e) => {
    const btn = e.target.closest('#open-modal, [data-open="feedback-modal"]');
    if (btn) {
      e.preventDefault();
      open();
    }
  });

  // Закрити по кліку на іконку та на фон
  closeIcon?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);

  // Закрити по Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) close();
  });

  // Доступність для SVG (закриття Enter/Space)
  if (closeIcon) {
    closeIcon.setAttribute("role", "button");
    closeIcon.setAttribute("tabindex", "0");
    closeIcon.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        close();
      }
    });
  }

  // Сабміт без перезавантаження
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    console.log("Form submitted:", data);
    form.reset();
    resetStars();            // очищаємо зірки після відправки
    // за потреби: close();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFeedbackModal);
} else {
  initFeedbackModal();
}
