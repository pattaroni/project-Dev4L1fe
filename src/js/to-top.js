const toTopBtn = document.getElementById('toTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        toTopBtn.classList.add('show');
    } else {
        toTopBtn.classList.remove('show');
    }
});
toTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});