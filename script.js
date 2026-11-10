(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }));
  }

  document.querySelectorAll('.app-store-link').forEach(badge => {
    const badgeImage = badge.querySelector('img');
    if (!badgeImage) return;

    badgeImage.addEventListener('load', () => badge.classList.add('badge-loaded'), { once: true });
    badgeImage.addEventListener('error', () => badge.classList.add('badge-unavailable'), { once: true });

    if (badgeImage.complete) {
      if (badgeImage.naturalWidth > 0) badge.classList.add('badge-loaded');
      else badge.classList.add('badge-unavailable');
    }
  });

  document.querySelectorAll('.platform-logo img, .substack-wordmark img, .instagram-mark img').forEach(img => {
    const host = img.closest('.platform-logo, .substack-wordmark, .instagram-mark');
    if (!host) return;

    img.addEventListener('load', () => host.classList.add('logo-loaded'), { once: true });
    img.addEventListener('error', () => img.remove(), { once: true });

    if (img.complete && img.naturalWidth > 0) host.classList.add('logo-loaded');
  });

  document.querySelectorAll('.product-photo img').forEach(img => {
    img.addEventListener('error', () => {
      img.remove();
      img.closest('.product-photo')?.classList.add('photo-unavailable');
    }, { once: true });
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
