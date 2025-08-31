  const burgerBtn = document.querySelector('.burger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const navLinks = document.querySelectorAll('.nav-link-m');
  const overlay = document.querySelector('.overlay');

  // Відкрити меню
  burgerBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
  });

  // Закрити меню
  function closeMenu() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
  }

  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  // Закривати по кліку на пункт меню і переходити до секції
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });