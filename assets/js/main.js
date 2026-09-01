/* ==========================================================================
   CONMEC INDUSTRIAL — main.js
   ========================================================================== */

/* --- Header scroll behavior --- */
const header = document.getElementById('site-header');
const scrollThreshold = 80;

const handleHeaderScroll = () => {
  if (window.scrollY > scrollThreshold) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleHeaderScroll, { passive: true });
handleHeaderScroll();

/* --- Hamburger / Mobile menu --- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Fechar menu ao clicar em link
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});

/* --- Contadores animados --- */
const animateCounter = (el) => {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const startTime = performance.now();

  const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(easeOutQuart(progress) * target);
    el.textContent = value >= 1000 ? value.toLocaleString('pt-BR') : value;
    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
};

// Intersection Observer para disparar contadores
const counters = document.querySelectorAll('.numero[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

/* --- Scroll reveal --- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.servico-card, .case-card, .diferencial-item, .setor-item').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* --- Lucide icons --- */
if (typeof lucide !== 'undefined') lucide.createIcons();

/* --- Sticky CTA mobile --- */
const stickyCTA = document.getElementById('sticky-cta');
const ctaSection = document.getElementById('contato');

const ctaObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (stickyCTA) {
      stickyCTA.style.display = entry.isIntersecting ? 'none' : '';
    }
  });
}, { threshold: 0.1 });

if (ctaSection) ctaObserver.observe(ctaSection);
