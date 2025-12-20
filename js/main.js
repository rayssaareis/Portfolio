// Arquivo base de JavaScript do portfólio.
// Interações serão adicionadas apenas quando realmente necessárias.

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

function setupSectionHighlightOnScroll() {
  const navLinks = document.querySelectorAll('#nav-links a');

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
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

      // Aguarda o scroll suave terminar antes de aplicar o destaque
      setTimeout(() => {
        heading.classList.add('section-highlight');
        setTimeout(() => {
          heading.classList.remove('section-highlight');
        }, 1200);
      }, 300);
    });
  });
}

/* Parte do codigo bugado */
  /**
 * Script para animação suave da lista de redes sociais
 * A animação ocorre apenas no carregamento da página (DOMContentLoaded)
 */
function setupSocialLinksAnimation() {
  // Seleciona todos os links de redes sociais
  const socialLinks = document.querySelectorAll(".social-link");

  // Verifica se existem links para animar
  if (socialLinks.length === 0) {
    return;
  }

  /**
   * Adiciona a classe 'social-enter' a cada link com um pequeno delay
   * Isso cria o efeito em cascata (cada item aparece um pouco depois do anterior)
   */
  socialLinks.forEach((link, index) => {
    // Delay escalonado: primeiro item aparece imediatamente, os outros seguem
    setTimeout(() => {
      link.classList.add("social-enter");
    }, index * 100); // 100ms de diferença entre cada item
  });
}
/* Parte do codigo bugado */

function setupScrollReveal() {
  const sections = document.querySelectorAll('main section');

  if (!('IntersectionObserver' in window) || sections.length === 0) {
    return;
  }

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
    {
      threshold: 0.18,
    }
  );




  sections.forEach((section) => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupSectionHighlightOnScroll();
  setupScrollReveal();
  setupSocialLinksAnimation();
});
