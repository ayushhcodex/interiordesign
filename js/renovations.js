/* ════════════════════════════════════════
   RATNAKALA INTERIORS — renovations.js
   Sanity-powered renovation carousels
════════════════════════════════════════ */

'use strict';

const RENO_PROJECT_ID = 'o0g8h2zi';
const RENO_DATASET = 'production';
const RENO_QUERY = encodeURIComponent(
    '*[_type == "renovationCategory"] | order(order asc) { _id, title, order, "images": images[]{ "url": asset->url, alt } }'
);
const RENO_URL = `https://${RENO_PROJECT_ID}.api.sanity.io/v2022-03-07/data/query/${RENO_DATASET}?query=${RENO_QUERY}`;

/* ── Render one carousel row ──────── */
function buildCarousel(category, idx) {
    const id = `reno-carousel-${idx}`;
    const images = category.images || [];
    if (!images.length) return '';

    // Highlight the last word(s) in title with orange
    const titleParts = category.title.split(' ');
    let highlighted = category.title;
    if (titleParts.length > 1) {
        const last = titleParts.pop();
        highlighted = `${titleParts.join(' ')} <span class="reno-highlight">${last}</span>`;
    }

    const slides = images.map((img, i) => `
    <div class="reno-slide">
      <img src="${img.url}" alt="${img.alt || category.title}" loading="lazy">
    </div>
  `).join('');

    return `
    <div class="reno-category" data-reveal="fade-up">
      <h3 class="reno-title">${highlighted}</h3>
      <div class="reno-carousel-wrap">
        <button class="reno-arrow reno-prev" data-carousel="${id}" aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div class="reno-viewport" id="${id}">
          <div class="reno-track">
            ${slides}
          </div>
        </div>
        <button class="reno-arrow reno-next" data-carousel="${id}" aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  `;
}

/* ── Wire up carousel controls ────── */
function initCarousel(container) {
    const viewport = container.querySelector('.reno-viewport');
    const track = container.querySelector('.reno-track');
    const slides = Array.from(track.children);
    const prevBtn = container.querySelector('.reno-prev');
    const nextBtn = container.querySelector('.reno-next');

    if (!slides.length) return;

    let current = 0;

    function getVisible() {
        return window.innerWidth >= 768 ? 2 : 1;
    }

    function maxIndex() {
        return Math.max(0, slides.length - getVisible());
    }

    function go(idx) {
        current = Math.max(0, Math.min(idx, maxIndex()));
        const gap = 16; // matches CSS gap
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${current * (slideWidth + gap)}px)`;
    }

    prevBtn.addEventListener('click', () => go(current - 1));
    nextBtn.addEventListener('click', () => go(current + 1));

    // Touch/swipe
    let startX = 0, moved = 0, dragging = false;
    viewport.addEventListener('touchstart', e => { startX = e.touches[0].clientX; dragging = true; }, { passive: true });
    viewport.addEventListener('touchmove', e => { if (dragging) moved = e.touches[0].clientX - startX; }, { passive: true });
    viewport.addEventListener('touchend', () => {
        if (Math.abs(moved) > 50) go(current + (moved < 0 ? 1 : -1));
        moved = 0; dragging = false;
    });

    // Recalc on resize
    window.addEventListener('resize', () => go(current));

    go(0);
}

/* ── Fetch & render ───────────────── */
async function fetchRenovations() {
    const container = document.getElementById('renovation-carousels');
    if (!container) return;

    try {
        const res = await fetch(RENO_URL);
        const data = await res.json();
        const categories = data.result || [];

        if (!categories.length) {
            container.innerHTML = '<p style="text-align:center;color:var(--clr-text-dim);padding:2rem;">No renovation designs yet — check back soon!</p>';
            return;
        }

        container.innerHTML = categories.map((cat, i) => buildCarousel(cat, i)).join('');

        // Init each carousel
        container.querySelectorAll('.reno-category').forEach(initCarousel);

        // Trigger reveal animations
        container.querySelectorAll('[data-reveal]').forEach(el => {
            setTimeout(() => el.classList.add('revealed'), 150);
        });

    } catch (err) {
        console.error('Error fetching renovation data:', err);
        container.innerHTML = '<p style="text-align:center;color:var(--clr-text-dim);padding:2rem;">Unable to load designs. Please refresh.</p>';
    }
}

document.addEventListener('DOMContentLoaded', fetchRenovations);
