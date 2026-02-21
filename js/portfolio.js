/* ════════════════════════════════════════
   LUMINA INTERIORS — portfolio.js
   Portfolio data + filter + lightbox
════════════════════════════════════════ */

'use strict';

const PORTFOLIO_ITEMS = [
    {
        id: 1,
        title: 'The Penthouse Suite',
        category: 'Living Room',
        location: 'Mumbai, India',
        year: '2025',
        image: 'images/portfolio-3.jpg',
        description: 'A sweeping penthouse transformation that blends raw concrete with warm linen and travertine. Arched doorways and gallery walls create a sophisticated gallery-home feel.'
    },
    {
        id: 2,
        title: 'The Jade Bedroom',
        category: 'Bedroom',
        location: 'Delhi, India',
        year: '2025',
        image: 'images/portfolio-1.jpg',
        description: 'A sanctuary of calm featuring fluted wall panels, warm ambient cove lighting, and a custom linen headboard. Brass and stone accents add quiet luxury.'
    },
    {
        id: 3,
        title: 'The Brass Kitchen',
        category: 'Kitchen',
        location: 'Bangalore, India',
        year: '2024',
        image: 'images/portfolio-2.jpg',
        description: 'A chef\'s kitchen that refuses to compromise on beauty. Dark walnut cabinetry, a Calacatta marble island, and sculptural brass pendants define this culinary haven.'
    },
    {
        id: 4,
        title: 'The Spa Retreat',
        category: 'Bathroom',
        location: 'Goa, India',
        year: '2025',
        image: 'images/portfolio-4.jpg',
        description: 'A bathroom designed as a daily ritual. Floor-to-ceiling marble, a freestanding stone bath, and a garden-view rain shower create an atmosphere of pure tranquillity.'
    },
    {
        id: 5,
        title: 'The Executive Study',
        category: 'Commercial',
        location: 'Mumbai, India',
        year: '2024',
        image: 'images/portfolio-5.jpg',
        description: 'A high-powered executive office designed for focused work and powerful impressions. Walnut, leather, and deep green against a dramatic city backdrop.'
    },
    {
        id: 6,
        title: 'The Golden Living Room',
        category: 'Living Room',
        location: 'Pune, India',
        year: '2024',
        image: 'images/hero-bg.jpg',
        description: 'A grand living space with double-height ceilings and panoramic city views. Every element — from the sculptural chandelier to the marble floor — was custom-sourced.'
    }
];

// ── Render Portfolio Grid ─────────────
function renderPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    const filterTabs = document.querySelectorAll('[data-filter]');
    if (!grid) return;

    let currentFilter = 'All';

    const getFiltered = () => currentFilter === 'All'
        ? PORTFOLIO_ITEMS
        : PORTFOLIO_ITEMS.filter(p => p.category === currentFilter);

    const render = () => {
        const items = getFiltered();
        grid.innerHTML = items.map(item => `
      <div class="card project-card"
           data-reveal="fade-up"
           onclick="openLightbox(${item.id})"
           role="button"
           tabindex="0"
           aria-label="View ${item.title}">
        <div class="project-card-img">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <div class="project-card-overlay">
            <span style="color:var(--clr-gold);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">View Project ↗</span>
          </div>
        </div>
        <div class="project-card-body">
          <p class="project-card-cat">${item.category} · ${item.year}</p>
          <h3 class="project-card-title">${item.title}</h3>
          <p style="font-size:0.8rem;color:var(--clr-text-dim)">📍 ${item.location}</p>
        </div>
      </div>
    `).join('');

        // Re-trigger reveals
        grid.querySelectorAll('[data-reveal]').forEach((el, i) => {
            setTimeout(() => el.classList.add('revealed'), 100 + i * 80);
        });

        grid.querySelectorAll('[role="button"]').forEach(el => {
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') el.click();
            });
        });
    };

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.dataset.filter;
            render();
        });
    });

    render();
}

// ── Lightbox ──────────────────────────
function openLightbox(id) {
    const item = PORTFOLIO_ITEMS.find(p => p.id === id);
    if (!item) return;

    const lb = document.getElementById('lightbox');
    if (!lb) return;

    lb.querySelector('#lb-img').src = item.image;
    lb.querySelector('#lb-img').alt = item.title;
    lb.querySelector('#lb-cat').textContent = `${item.category} · ${item.location} · ${item.year}`;
    lb.querySelector('#lb-title').textContent = item.title;
    lb.querySelector('#lb-desc').textContent = item.description;

    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.classList.remove('open');
    document.body.style.overflow = '';
}

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();

    // Close on overlay click
    const lb = document.getElementById('lightbox');
    if (lb) {
        lb.addEventListener('click', (e) => {
            if (e.target === lb) closeLightbox();
        });
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
});
