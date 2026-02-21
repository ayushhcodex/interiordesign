/* ════════════════════════════════════════
   LUMINA INTERIORS — blog.js
   Blog data store + render functions
════════════════════════════════════════ */

'use strict';

// ── Blog Data ─────────────────────────
// To add a new post: copy a post object, change the id (unique!),
// update fields, and save. The post will appear automatically.
const BLOG_POSTS = [
    {
        id: 1,
        title: '10 Timeless Interior Design Principles Every Home Needs',
        slug: '10-timeless-interior-design-principles',
        category: 'Design Tips',
        date: 'February 14, 2026',
        author: 'Ratnakala Studio',
        authorRole: 'Principal Designer',
        image: 'images/portfolio-3.jpg',
        excerpt: 'Great design is never accidental. Behind every beautiful room lies a set of core principles that guide proportion, balance, and harmony.',
        body: `
      <p>Great design is never accidental. Behind every beautiful room lies a set of core principles that have guided interior designers for centuries. Whether you're working on a complete renovation or simply refreshing a space, understanding these fundamentals will transform your approach.</p>
      <h2>1. Start with a Clear Vision</h2>
      <p>Before making any purchases or decisions, define the mood and purpose of the room. Create a mood board with colours, textures, and inspirational images that resonate with you.</p>
      <h2>2. Proportion & Scale Matter</h2>
      <p>Every piece of furniture must relate harmoniously to the dimensions of the room. An oversized sofa in a small room can overwhelm; a tiny rug in a large living space looks lost.</p>
      <blockquote>Design is not just what it looks like and feels like. Design is how it works. — Steve Jobs</blockquote>
      <h2>3. Layer Your Lighting</h2>
      <p>Never rely on a single overhead light. Great rooms use three layers: ambient (general), task (functional), and accent (decorative) lighting to create depth and atmosphere.</p>
      <h2>4. Create a Focal Point</h2>
      <p>Every room needs an anchor — a fireplace, a statement artwork, or a dramatic window. Design the rest of the room around this focal point to create visual cohesion.</p>
      <h2>5. Balance Is Everything</h2>
      <p>Balance doesn't mean symmetry. You can achieve visual balance by distributing visual weight evenly — through colour, pattern, shape, and texture — creating a sense of calm without rigidity.</p>
      <h2>6. Rule of Three</h2>
      <p>Group decorative objects in sets of three at varying heights. This odd-number rule creates visual interest and feels more natural than even-numbered groupings.</p>
      <h2>7. Embrace Negative Space</h2>
      <p>The empty areas of a room are just as important as the furnished ones. Negative space gives the eye a place to rest and allows key pieces to shine.</p>
      <h2>8. Mix Textures & Materials</h2>
      <p>Layer different textures — linen, velvet, wood, metal, glass — to add depth and warmth. A monochromatic room still feels rich when it has textural variety.</p>
      <h2>9. Colour Flow Throughout the Home</h2>
      <p>Colours should relate from room to room so that your home feels like a curated whole rather than a series of disconnected spaces.</p>
      <h2>10. Personalise Thoughtfully</h2>
      <p>Personal objects — travel souvenirs, heirloom pieces, favourite books — make a house a home. Edit carefully; choose items that have genuine meaning rather than decorating with generic filler.</p>
    `
    },
    {
        id: 2,
        title: 'The Art of Layering Light: A Complete Guide',
        slug: 'art-of-layering-light',
        category: 'Lighting',
        date: 'February 7, 2026',
        author: 'Ratnakala Studio',
        authorRole: 'Principal Designer',
        image: 'images/portfolio-1.jpg',
        excerpt: 'Lighting is the single most powerful tool in an interior designer\'s toolkit. Discover how to layer ambient, task, and accent light like a professional.',
        body: `
      <p>Lighting is the single most powerful tool in an interior designer's toolkit. It can make a small room feel expansive, a cold room feel warm, and a flat space feel dynamic. Yet it remains the most overlooked aspect of home design.</p>
      <h2>The Three Layers of Light</h2>
      <p>Professional designers always work with three distinct layers of lighting, each serving a different purpose:</p>
      <ul>
        <li><strong>Ambient Light</strong> — The general, overall illumination of a room. Think recessed downlights, chandeliers, or large pendant fixtures.</li>
        <li><strong>Task Light</strong> — Focused light for specific activities: reading lamps, under-cabinet kitchen lighting, desk lamps.</li>
        <li><strong>Accent Light</strong> — Decorative lighting that highlights specific features: picture lights, uplights for plants, LED strip lighting in shelving.</li>
      </ul>
      <h2>Choosing the Right Colour Temperature</h2>
      <p>Colour temperature, measured in Kelvins (K), dramatically affects the mood of a room. Warm white (2700K–3000K) creates a cosy, intimate atmosphere, perfect for bedrooms and living rooms. Cool white (4000K+) is crisp and energising, better suited to kitchens and bathrooms.</p>
      <blockquote>Light is the first of painters. — Ralph Waldo Emerson</blockquote>
      <h2>The Magic of Dimmers</h2>
      <p>Installing dimmer switches on all lighting circuits is one of the highest return-on-investment upgrades you can make. They allow you to instantly shift the mood of a room from bright and energetic to warm and intimate.</p>
    `
    },
    {
        id: 3,
        title: 'Biophilic Design: Bringing Nature Indoors',
        slug: 'biophilic-design-nature-indoors',
        category: 'Trends',
        date: 'January 28, 2026',
        author: 'Ratnakala Studio',
        authorRole: 'Principal Designer',
        image: 'images/portfolio-2.jpg',
        excerpt: 'Biophilic design is one of the most important movements in contemporary interior design — and for good reason. Learn how to incorporate it into your space.',
        body: `
      <p>Biophilic design — the intentional integration of natural elements into built environments — has become one of the most significant movements in contemporary interior design. Rooted in the idea that humans have an innate need to connect with nature, it goes far beyond simply placing a houseplant in the corner.</p>
      <h2>What Is Biophilic Design?</h2>
      <p>Biophilia, from the Greek meaning "love of life," describes the fundamental human urge to connect with other living things. Biophilic design translates this into architectural and interior choices that support our psychological and physiological wellbeing.</p>
      <h2>Key Elements to Incorporate</h2>
      <ul>
        <li><strong>Natural Light</strong> — Maximise daylight through large windows, skylights, and strategic mirror placement.</li>
        <li><strong>Indoor Plants</strong> — From statement fiddle-leaf figs to living moss walls, plants purify air and reduce stress.</li>
        <li><strong>Natural Materials</strong> — Stone, wood, rattan, linen, and leather connect us viscerally to the natural world.</li>
        <li><strong>Water Features</strong> — Even a small tabletop water feature introduces the sound and movement of water.</li>
        <li><strong>Nature-Inspired Patterns</strong> — Wallpapers, textiles, and art based on botanical or geological forms.</li>
      </ul>
      <blockquote>In every walk with nature, one receives far more than he seeks. — John Muir</blockquote>
      <h2>The Research Behind It</h2>
      <p>Studies consistently show that biophilic environments reduce cortisol levels, lower blood pressure, improve cognitive function, and increase overall life satisfaction. For workplaces, biophilic design has been linked to a 15% increase in productivity.</p>
    `
    },
    {
        id: 4,
        title: 'How to Choose the Perfect Colour Palette for Any Room',
        slug: 'choose-perfect-colour-palette',
        category: 'Colour',
        date: 'January 21, 2026',
        author: 'Ratnakala Studio',
        authorRole: 'Principal Designer',
        image: 'images/portfolio-4.jpg',
        excerpt: 'Colour selection is the most intimidating part of any design project. Here\'s our foolproof process for choosing a palette that works every time.',
        body: `
      <p>Colour selection is the most intimidating aspect of interior design for most homeowners. With thousands of paint colours available, the choice can feel overwhelming. But with a clear process, it becomes infinitely more manageable.</p>
      <h2>Start with Inspiration, Not the Paint Deck</h2>
      <p>Instead of standing in a paint aisle, start with something that inspires you — a piece of art, a beautiful fabric, a travel photograph. The colour palette will emerge naturally from something you already love.</p>
      <h2>The 60-30-10 Rule</h2>
      <p>This classic formula creates visual balance in any space:</p>
      <ul>
        <li><strong>60%</strong> — Your dominant colour (walls, large furniture)</li>
        <li><strong>30%</strong> — Your secondary colour (upholstery, curtains)</li>
        <li><strong>10%</strong> — Your accent colour (cushions, art, accessories)</li>
      </ul>
      <h2>Consider Light at Different Times of Day</h2>
      <p>A colour that looks beautiful in the showroom may look entirely different in your home. Always test a paint swatch on the actual wall and observe it in morning, afternoon, and evening light before committing.</p>
      <blockquote>Colour is a power which directly influences the soul. — Wassily Kandinsky</blockquote>
    `
    }
];

window.BLOG_POSTS = BLOG_POSTS;
const POSTS_PER_PAGE = 4;

// ── Render Blog Listing ───────────────
function renderBlogListing() {
    const grid = document.getElementById('blog-grid');
    const filterTabs = document.querySelectorAll('[data-filter]');
    const paginationEl = document.getElementById('pagination');
    if (!grid) return;

    let currentFilter = 'All';
    let currentPage = 1;

    const getFiltered = () => currentFilter === 'All'
        ? BLOG_POSTS
        : BLOG_POSTS.filter(p => p.category === currentFilter);

    const render = () => {
        const filtered = getFiltered();
        const total = Math.ceil(filtered.length / POSTS_PER_PAGE);
        const paginated = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

        grid.innerHTML = paginated.map(post => `
      <article class="card blog-card" onclick="window.location='blog-post.html?id=${post.id}'" data-reveal="fade-up">
        <div class="blog-card-img">
          <img src="${post.image}" alt="${post.title}" loading="lazy">
        </div>
        <div class="blog-card-body">
          <div class="blog-card-meta">
            <span class="blog-card-cat">${post.category}</span>
            <span class="blog-card-date">${post.date}</span>
          </div>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-card-excerpt">${post.excerpt}</p>
          <span class="blog-card-read-more">Read Article →</span>
        </div>
      </article>
    `).join('');

        // Re-trigger scroll reveal
        grid.querySelectorAll('[data-reveal]').forEach(el => {
            setTimeout(() => el.classList.add('revealed'), 100);
        });

        // Pagination
        if (paginationEl) {
            paginationEl.innerHTML = '';
            if (total > 1) {
                for (let i = 1; i <= total; i++) {
                    const btn = document.createElement('button');
                    btn.className = `filter-tab${i === currentPage ? ' active' : ''}`;
                    btn.textContent = i;
                    btn.addEventListener('click', () => {
                        currentPage = i;
                        render();
                        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    });
                    paginationEl.appendChild(btn);
                }
            }
        }
    };

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.dataset.filter;
            currentPage = 1;
            render();
        });
    });

    render();
}

// ── Render Single Blog Post ───────────
function renderBlogPost() {
    const postContainer = document.getElementById('blog-post-container');
    if (!postContainer) return;

    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'), 10);
    const post = BLOG_POSTS.find(p => p.id === id);

    if (!post) {
        postContainer.innerHTML = `
      <div style="text-align:center;padding:4rem 0;">
        <h2>Post not found</h2>
        <a href="blog.html" class="btn btn-outline" style="display:inline-flex;margin-top:1.5rem;">← Back to Blog</a>
      </div>`;
        return;
    }

    // Update page title
    document.title = `${post.title} — Ratnakala Interiors`;

    // Breadcrumb
    const breadcrumb = document.getElementById('post-breadcrumb');
    if (breadcrumb) {
        breadcrumb.innerHTML = `
      <a href="index.html">Home</a> <span>›</span>
      <a href="blog.html">Blog</a> <span>›</span>
      <span>${post.title}</span>`;
    }

    postContainer.innerHTML = `
    <div class="blog-post-header">
      <div class="blog-card-meta" style="margin-bottom:1rem;">
        <span class="blog-card-cat">${post.category}</span>
        <span class="blog-card-date">${post.date}</span>
        <span class="blog-card-date">By ${post.author}</span>
      </div>
      <h1 class="blog-post-title">${post.title}</h1>
      <p style="font-size:1.1rem;color:var(--clr-text-muted);max-width:600px;">${post.excerpt}</p>
    </div>
    <img src="${post.image}" alt="${post.title}" class="blog-post-hero">
    <div class="blog-post-body">${post.body}</div>
  `;

    // Related posts
    const relatedContainer = document.getElementById('related-posts-grid');
    if (relatedContainer) {
        const related = BLOG_POSTS.filter(p => p.id !== id).slice(0, 3);
        relatedContainer.innerHTML = related.map(p => `
      <article class="card blog-card" onclick="window.location='blog-post.html?id=${p.id}'">
        <div class="blog-card-img">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
        </div>
        <div class="blog-card-body">
          <div class="blog-card-meta">
            <span class="blog-card-cat">${p.category}</span>
          </div>
          <h4 class="blog-card-title">${p.title}</h4>
          <span class="blog-card-read-more">Read →</span>
        </div>
      </article>
    `).join('');
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderBlogListing();
    renderBlogPost();
});
