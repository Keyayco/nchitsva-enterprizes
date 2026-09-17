(() => {
  'use strict';

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const header = document.querySelector('[data-header]');

  const closeMenu = () => {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    menuToggle.querySelector('.sr-only').textContent = 'Open menu';
  };

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
      menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Open menu' : 'Close menu';
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  if (header) {
    const updateHeader = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealItems.length) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();