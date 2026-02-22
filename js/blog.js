/* ════════════════════════════════════════
   RATNAKALA INTERIORS — blog.js
   Blog data store + render functions
════════════════════════════════════════ */

'use strict';

let BLOG_POSTS = [];
const POSTS_PER_PAGE = 4;

const SANITY_PROJECT_ID = 'o0g8h2zi';
const SANITY_DATASET = 'production';
const QUERY = encodeURIComponent('*[_type == "post"] | order(publishedAt desc) { "id": _id, title, "slug": slug.current, "category": categories[0]->title, "date": publishedAt, "author": author->name, "image": mainImage.asset->url, excerpt, body, "gallery": gallery[].asset->url }');
const SANITY_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2022-03-07/data/query/${SANITY_DATASET}?query=${QUERY}`;

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

    if (filtered.length === 0) {
      grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">No posts found.</div>';
    } else {
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
    }

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
    // Prevent multiple bindings by cloning or ensuring singleton
    const newTab = tab.cloneNode(true);
    tab.parentNode.replaceChild(newTab, tab);
    newTab.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(t => t.classList.remove('active'));
      newTab.classList.add('active');
      currentFilter = newTab.dataset.filter;
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
  const id = params.get('id');
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

  // Create gallery HTML if images exist
  let galleryHTML = '';
  if (post.gallery && post.gallery.length > 0) {
    galleryHTML = `
      <div class="blog-post-gallery" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-top: 2rem;">
        ${post.gallery.map(imgUrl => `<img src="${imgUrl}" alt="Gallery image" style="width:100%; height:250px; object-fit:cover; border-radius: var(--radius-md);">`).join('')}
      </div>
    `;
  }

  postContainer.innerHTML = `
    <div class="blog-post-header">
      <div class="blog-card-meta" style="margin-bottom:1rem;">
        <span class="blog-card-cat">${post.category}</span>
        <span class="blog-card-date">${post.date}</span>
        <span class="blog-card-date">By ${post.author}</span>
      </div>
      <h1 class="blog-post-title">${post.title}</h1>
      <p style="font-size:1.1rem;color:var(--clr-text-muted);max-width:600px;">${post.excerpt || ''}</p>
    </div>
    <img src="${post.image}" alt="${post.title}" class="blog-post-hero">
    <div class="blog-post-body">${post.body || ''}</div>
    ${galleryHTML}
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

// Fetch Sanity Data
async function fetchSanityData() {
  try {
    const res = await fetch(SANITY_URL);
    const { result } = await res.json();
    
    // Import portable text to html converter dynamically from esm.sh
    const { toHTML } = await import('https://esm.sh/@portabletext/to-html@2.0.0');

    BLOG_POSTS = result.map(post => ({
      ...post,
      date: post.date ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '',
      body: post.body ? toHTML(post.body) : '',
      category: post.category || 'Uncategorized',
      author: post.author || 'Ratnakala Studio'
    }));
    window.BLOG_POSTS = BLOG_POSTS;
    
    // Once fetched, render the current page
    renderBlogListing();
    renderBlogPost();
  } catch (err) {
    console.error("Error fetching Sanity data:", err);
    // Render empty state if fails
    renderBlogListing();
    renderBlogPost();
  }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  // Show preliminary loading state on grid
  const grid = document.getElementById('blog-grid');
  if (grid) grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">Loading posts...</div>';
  
  fetchSanityData();
});
