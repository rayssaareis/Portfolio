// ==============================
// Menu mobile
// ==============================
function setupMobileMenu() {
  const header = document.getElementById('site-header');
  const toggleButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelectorAll('#nav-links a');

  if (!header || !toggleButton) return;

  toggleButton.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (header.classList.contains('nav-open')) {
        header.classList.remove('nav-open');
        toggleButton.setAttribute('aria-expanded', 'false');
      }
    });
  });
}


// ==============================
// Parallax do orb do hero
// ==============================

const orb = document.querySelector('.hero-orb');

function updateOrb(x, y) {
  // Sempre parte do ponto central (-50%, -50%)
  orb.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
}

// Parallax pelo mouse
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX - window.innerWidth / 2) / 50;
  const y = (e.clientY - window.innerHeight / 2) / 50;
  updateOrb(x, y);
});


// Inicializa o orb no centro sem salto
updateOrb(0, 0);



// ==============================
// Destaque de seção no scroll
// ==============================
function setupSectionHighlightOnScroll() {
  const navLinks = document.querySelectorAll('#nav-links a');

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((l) => l.classList.remove('nav-link-active'));
      link.classList.add('nav-link-active');

      setTimeout(() => {
        link.classList.remove('nav-link-active');
      }, 1500);

      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const section = document.querySelector(href);
      if (!section) return;

      const heading = section.querySelector('h2') || section.querySelector('h1');
      if (!heading) return;

      setTimeout(() => {
        heading.classList.add('section-highlight');
        setTimeout(() => {
          heading.classList.remove('section-highlight');
        }, 1200);
      }, 300);
    });
  });
}

// ==============================
// Animação das redes sociais
// ==============================
function setupSocialLinksAnimationOnScroll() {
  const container = document.querySelector('.social-links');
  const socialLinks = document.querySelectorAll('.social-link');

  if (!container || socialLinks.length === 0) return;
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        socialLinks.forEach((link, index) => {
          setTimeout(() => {
            link.classList.add('social-enter');
          }, index * 80);
        });

        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(container);
}

// ==============================
// Reveal das seções
// ==============================
function setupScrollReveal() {
  const sections = document.querySelectorAll('main section');

  if (!('IntersectionObserver' in window) || sections.length === 0) return;

  sections.forEach((section) => {
    section.classList.add('reveal-section');
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  sections.forEach((section) => observer.observe(section));
}

// ==============================
// Animação de entrada do hero
// ==============================
function setupHeroEntrance() {
  const orb = document.querySelector('.hero-orb');
  const person = document.querySelector('.hero-person');

  if (orb) orb.classList.add('hero-enter');
  if (person) person.classList.add('hero-enter');
}

// ==============================
// Inicialização geral
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupSectionHighlightOnScroll();
  setupScrollReveal();
  setupSocialLinksAnimationOnScroll();
  setupHeroEntrance();
});
