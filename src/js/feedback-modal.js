import $ from "jquery";
import "raty-js";

function initFeedbackModal() {
  const modal = document.getElementById("feedback-modal");
  if (!modal) return;


  const openBtn = document.getElementById("open-modal") ||
                  document.querySelector('[data-open="feedback-modal"]');
  const closeBtn = modal.querySelector(".modal__close");
  const backdrop = modal.querySelector(".modal__backdrop");
  const nameInput = modal.querySelector("#fb-name");

  const open = () => {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    setTimeout(() => nameInput?.focus(), 0);
  };
  const close = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  openBtn?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) close();
  });


  const $rating = $("#star-rating");
  if ($rating.length) {
    $rating.raty({
      starType: "i",
      scoreName: "rating",
      number: 5,
      hints: ["bad", "poor", "regular", "good", "gorgeous"]
    });
  }
}


if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFeedbackModal);
} else {
  initFeedbackModal();
}
