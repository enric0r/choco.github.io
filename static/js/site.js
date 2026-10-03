document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.toc-toggle');
  const toc = document.querySelector('.docs-toc');
  if (!toggle || !toc) return;

  toggle.addEventListener('click', () => {
    const open = toc.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  const links = [...toc.querySelectorAll('a[href^="#"]')];
  const headings = links.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
  links.forEach(link => link.addEventListener('click', () => {
    if (window.matchMedia('(max-width: 720px)').matches) {
      toc.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }));

  const updateActive = () => {
    let current = headings[0];
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= 180) current = heading;
    }
    for (const link of links) {
      if (current && link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };
  let queued = false;
  window.addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; updateActive(); });
  }, { passive: true });
  updateActive();
});
