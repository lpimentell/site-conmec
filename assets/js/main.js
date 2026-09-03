/* =================================================================
   CONMEC INDUSTRIAL — main.js
   ================================================================= */

// ── Lucide icons init ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  initHeader();
  initMobileMenu();
  initReveal();
  initCounters();
  initForm();
});

// ── Header scroll ─────────────────────────────────────────────────
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Mobile menu ───────────────────────────────────────────────────
function initMobileMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

// ── Scroll reveal ─────────────────────────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => observer.observe(el));
}

// ── Animated counters ─────────────────────────────────────────────
function initCounters() {
  const nums = document.querySelectorAll('.numero[data-target]');
  if (!nums.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  const animate = (el, target) => {
    const duration = target > 1000 ? 2200 : 1600;
    const start = performance.now();
    const isLarge = target >= 1000;

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(easeOut(progress) * target);
      el.textContent = isLarge
        ? current.toLocaleString('pt-BR')
        : current;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = isLarge ? target.toLocaleString('pt-BR') : target;
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseInt(e.target.dataset.target, 10);
        animate(e.target, target);
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.4 }
  );

  nums.forEach(el => observer.observe(el));
}

// ── Form handling ─────────────────────────────────────────────────
function initForm() {
  const form = document.getElementById('form-contato');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const required = form.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#E39A38';
        valid = false;
      }
    });

    if (!valid) {
      const first = form.querySelector('[required]:invalid, [required][style*="E39A38"]');
      if (first) first.focus();
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Mensagem enviada!';
    btn.style.background = '#437a22';
    btn.style.borderColor = '#437a22';

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.style.borderColor = '';
      form.reset();
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 3500);
  });

  // Máscara de telefone simples
  const tel = document.getElementById('telefone');
  if (tel) {
    tel.addEventListener('input', () => {
      let v = tel.value.replace(/\D/g, '').substring(0, 11);
      if (v.length >= 11) v = v.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
      else if (v.length >= 7)  v = v.replace(/(\d{2})(\d{4,5})(\d{0,4})/, '($1) $2-$3');
      else if (v.length >= 3)  v = v.replace(/(\d{2})(\d+)/, '($1) $2');
      tel.value = v;
    });
  }
}
