document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const menu = document.querySelector('.menu');
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  if (menu && nav) {
    menu.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('.navlinks a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: .12});
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('is-visible'));

  const toast = document.querySelector('.toast');
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 3300);
  };

  document.querySelectorAll('[data-doc-note]').forEach(button => {
    button.addEventListener('click', () => showToast(button.dataset.docNote));
  });

  // Keep broken remote brand marks graceful rather than leaving a broken-image icon.
  document.querySelectorAll('img[src^="http"]').forEach(img => {
    img.addEventListener('error', () => {
      img.classList.add('logo-load-failed');
      img.alt = `${img.alt} — logo could not be loaded`;
    }, {once:true});
  });
});