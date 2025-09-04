import iziToast from 'izitoast';
import { postFeedback } from './api';

function mountStarRating(host, options = {}) {
  const max = options.max ?? 5;
  const scoreName = options.scoreName ?? 'rating';

  host.innerHTML = '';
  host.classList.add('star-rating');

  let currentScore = 0;

  const hidden = document.createElement('input');
  hidden.type = 'hidden';
  hidden.name = scoreName;
  hidden.value = '0';
  host.appendChild(hidden);

  const stars = [];
  for (let i = 1; i <= max; i++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', `${i} star${i > 1 ? 's' : ''}`);
    btn.dataset.value = String(i);
    host.appendChild(btn);
    stars.push(btn);
  }

  function paint(score) {
    const full = Math.floor(score);
    stars.forEach((s, idx) => {
      s.classList.remove('is-on', 'is-hover');
      if (idx < full) s.classList.add('is-on');
    });
  }

  host.addEventListener('mousemove', e => {
    const b = e.target.closest('button');
    if (!b) return;
    const idx = Number(b.dataset.value);

    stars.forEach(s => s.classList.remove('is-hover'));
    for (let i = 0; i < idx; i++) stars[i].classList.add('is-hover');
  });

  host.addEventListener('mouseleave', () => {
    stars.forEach(s => s.classList.remove('is-hover'));
    paint(currentScore);
  });

  host.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    const base = Number(b.dataset.value);
    currentScore = base;
    hidden.value = String(currentScore);
    paint(currentScore);
  });

  paint(currentScore);
}

function validateFeedback({ name, rating, descr }) {
  const errors = {};
  const n = (name ?? '').trim();
  if (n.length < 2 || n.length > 16)
    errors.name = 'Name must be 2-16 characters.';

  const r = Number(rating);
  if (!Number.isFinite(r) || r < 1 || r > 5)
    errors.rating = 'Rating must be between 1 and 5.';

  const d = (descr ?? '').trim();
  if (d.length < 10 || d.length > 512)
    errors.descr = 'Message must be 10-512 characters.';

  return errors;
}

function initFeedbackModal() {
  const modal = document.getElementById('feedback-modal');
  if (!modal) return;

  const closeEl = modal.querySelector('.modal__close');
  const backdrop = modal.querySelector('.modal__backdrop');
  const nameInput = modal.querySelector('#fb-name');
  const form = modal.querySelector('.modal__form');
  const ratingHost = modal.querySelector('#star-rating');
  const openSelector = '#open-modal, [data-open="feedback-modal"]';

  let starsMounted = false;

  const clearErrors = () => {
    form.querySelectorAll('.form-error').forEach(n => n.remove());
    form
      .querySelectorAll('.field-invalid')
      .forEach(n => n.classList.remove('field-invalid'));
    form
      .querySelectorAll('[aria-invalid="true"]')
      .forEach(n => n.removeAttribute('aria-invalid'));
  };
  const showErrorUnder = (groupEl, msg) => {
    groupEl?.classList?.add('field-invalid');
    groupEl?.insertAdjacentHTML(
      'beforeend',
      `<div class="form-error">${msg}</div>`
    );
  };

  const lockScroll = () => (document.body.style.overflow = 'hidden');
  const unlockScroll = () => (document.body.style.overflow = 'auto');
  const open = () => {
    modal.classList.add('active');
    lockScroll();
    setTimeout(() => nameInput?.focus(), 0);

    if (!starsMounted && ratingHost) {
      mountStarRating(ratingHost, { name: 'rating', max: 5 });
      starsMounted = true;
    }
  };

  const resetStars = () => {
    if (!ratingHost) return;
    const hidden = ratingHost.querySelector('input[name="rating"]');
    if (hidden) hidden.value = '0';
    ratingHost
      .querySelectorAll('button')
      .forEach(b =>
        b.classList.remove('is-on', 'is-half', 'is-hover', 'is-hover-half')
      );
  };

  const close = () => {
    modal.classList.remove('active');
    unlockScroll();
  };

  document.addEventListener('click', e => {
    const btn = e.target.closest(openSelector);
    if (btn) {
      e.preventDefault();
      open();
    }
  });

  closeEl?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) close();
  });

  if (closeEl && !('disabled' in closeEl)) {
    closeEl.setAttribute('role', 'button');
    closeEl.setAttribute('tabindex', '0');
    closeEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        close();
      }
    });
  }

  form?.addEventListener('submit', async e => {
    e.preventDefault();

    const fd = new FormData(form);
    const payload = {
      name: (fd.get('name') || '').toString().trim(),
      rating: Number(
        ratingHost?.querySelector('input[name="rating"]')?.value || '0'
      ),
      descr: (fd.get('message') || '').toString().trim(),
    };

    clearErrors();
    const errors = validateFeedback(payload);
    if (Object.keys(errors).length) {
      if (errors.name) {
        const grp = form.querySelector('.form__group_1');
        grp?.querySelector('input')?.setAttribute('aria-invalid', 'true');
        showErrorUnder(grp, errors.name);
      }
      if (errors.descr) {
        const grp = form.querySelector('.form__group_2');
        grp?.querySelector('textarea')?.setAttribute('aria-invalid', 'true');
        showErrorUnder(grp, errors.descr);
      }
      if (errors.rating) {
        ratingHost?.insertAdjacentHTML(
          'afterend',
          `<div class="form-error">${errors.rating}</div>`
        );
      }
      return;
    }

    const submitBtn = form.querySelector('.fb-modal-btn');
    submitBtn?.setAttribute('disabled', 'true');

    try {
      await postFeedback(payload);
      iziToast.success({
        title: 'Success',
        message: 'Thank you for your feedback!',
        position: 'topRight',
      });

      form.reset();
      resetStars();
      clearErrors();
      close();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Something went wrong. Try again.';

      iziToast.error({
        title: 'Error',
        message: msg,
        position: 'topRight',
      });

      form.insertAdjacentHTML(
        'afterbegin',
        `<div class="form-error">${msg}</div>`
      );
    } finally {
      submitBtn?.removeAttribute('disabled');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFeedbackModal);
} else {
  initFeedbackModal();
}
