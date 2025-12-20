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
// Parallax — SOMENTE no orb
// ==============================
function setupHeroParallax() {
  const hero = document.querySelector('.hero-center-visual');
  const orbInner = document.querySelector('.hero-orb-inner');

  if (!hero || !orbInner) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

  if (prefersReducedMotion || !isDesktop) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x / rect.width - 0.5) * 8;
    const moveY = (y / rect.height - 0.5) * 8;

    orbInner.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  hero.addEventListener('mouseleave', () => {
    orbInner.style.transform = 'translate(0, 0)';
  });
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
  setupHeroParallax();
});