const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));
  });
}

const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      event.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
      }
    }
  });
});

const productCards = document.querySelectorAll('.product-card[data-images]');
productCards.forEach((card) => {
  const images = card.dataset.images.split(',').map((src) => src.trim());
  const imageElement = card.querySelector('img');
  const prevButton = card.querySelector('.image-switch--prev');
  const nextButton = card.querySelector('.image-switch--next');
  let currentIndex = 0;

  const updateImage = () => {
    if (imageElement && images.length) {
      imageElement.src = images[currentIndex];
    }
  };

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateImage();
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateImage();
    });
  }
});
