/* ════════════════════════════════════════
   LUMINA INTERIORS — main.js
   Nav, Scroll Reveal, Stats, 
   Testimonials, Back-to-Top
════════════════════════════════════════ */

'use strict';

// ── Page Enter Animation ──────────────
window.addEventListener('load', () => {
  document.body.classList.add('page-enter');
});

// ── Sticky Nav ────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// Active nav link
const navLinks = document.querySelectorAll('.nav-link');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
    link.classList.add('active');
  }
});

// ── Mobile Menu ───────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── Scroll Reveal ─────────────────────
const revealElements = document.querySelectorAll('[data-reveal]');
if (revealElements.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));
}

// ── Stats Counter ─────────────────────
const statNumbers = document.querySelectorAll('.stat-number[data-count]');
if (statNumbers.length) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();

      const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.innerHTML = `${Math.floor(eased * target)}<span class="stat-suffix">${suffix}</span>`;
        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => countObserver.observe(el));
}

// ── Testimonials Slider ───────────────
(function initTestimonials() {
  const track = document.querySelector('.testimonial-track');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  if (!track) return;

  const slides = track.querySelectorAll('.testimonial-slide');
  let current = 0;
  let autoTimer;

  const go = (idx) => {
    current = (idx + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  };

  const auto = () => {
    autoTimer = setInterval(() => go(current + 1), 5000);
  };

  const resetAuto = () => {
    clearInterval(autoTimer);
    auto();
  };

  if (prevBtn) prevBtn.addEventListener('click', () => { go(current - 1); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { go(current + 1); resetAuto(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { go(i); resetAuto(); }));

  go(0);
  auto();
})();

// ── Back-to-Top ───────────────────────
const btt = document.getElementById('back-to-top');
if (btt) {
  window.addEventListener('scroll', () => {
    btt.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Newsletter subscribe (footer) ─────
const newsletterForms = document.querySelectorAll('.footer-newsletter');
newsletterForms.forEach(form => {
  const btn = form.querySelector('button');
  const input = form.querySelector('input');
  if (!btn || !input) return;
  btn.addEventListener('click', () => {
    if (input.value.includes('@') && input.value.includes('.')) {
      showToast('You\'re subscribed! ✦');
      input.value = '';
    } else {
      showToast('Please enter a valid email.', true);
    }
  });
});

// ── Toast ─────────────────────────────
function showToast(message, isError = false) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.background = isError ? '#E66060' : 'var(--clr-gold)';
  toast.style.color = isError ? '#fff' : 'var(--clr-bg)';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

window.showToast = showToast;
