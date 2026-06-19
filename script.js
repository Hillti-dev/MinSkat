// Mobile detection: adds `is-mobile` class to <body> when running on a phone
function detectMobile() {
  const ua = navigator.userAgent || '';
  const uaMobile = /Mobi|Android|iPhone|iPod|IEMobile|Opera Mini|BlackBerry/i.test(ua);
  const smallViewport = window.matchMedia && window.matchMedia('(max-width: 760px)').matches;
  return uaMobile || smallViewport;
}

const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

function updateMobileClass() {
  if (detectMobile()) {
    document.body.classList.add('is-mobile');
  } else {
    document.body.classList.remove('is-mobile');
  }
}

// initialize and update on resize
updateMobileClass();
window.addEventListener('resize', () => {
  updateMobileClass();
});

if (navToggle && mainNav) {
  // ensure ARIA and ids
  if (!mainNav.id) mainNav.id = 'main-navigation';
  navToggle.setAttribute('aria-controls', mainNav.id);
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', navToggle.getAttribute('aria-label') || 'Navigation öffnen');

  navToggle.addEventListener('click', () => {
    const isActive = mainNav.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isActive);
  });

  // close when clicking outside
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!mainNav.classList.contains('active')) return;
    if (mainNav.contains(target) || navToggle.contains(target)) return;
    mainNav.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });

  // close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
      mainNav.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // ensure menu closes when switching to desktop
  window.addEventListener('resize', () => {
    updateMobileClass();
    if (!detectMobile() && mainNav.classList.contains('active')) {
      mainNav.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
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
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
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
