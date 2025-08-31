// Вибираємо потрібні елементи
const burgerMenu = document.querySelector('.burger-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const overlay = document.querySelector('.overlay');
const mobileLinks = document.querySelectorAll('.nav-list-m a');

// Функція для відкриття меню
function openMenu() {
  mobileMenu.classList.add('active');
  overlay.classList.add('active');
}

// Функція для закриття меню
function closeMenu() {
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
}

// Відкриваємо меню по кліку на бургер
burgerMenu.addEventListener('click', openMenu);

// Закриваємо меню по кліку на хрестик
mobileMenuClose.addEventListener('click', closeMenu);

// Закриваємо меню по кліку на overlay
overlay.addEventListener('click', closeMenu);

// Закриваємо меню і скролимо до секції при кліку на пункт
mobileLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }

    closeMenu();
  });
});
