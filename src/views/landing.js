/**
 * DartNova Landing Page View
 * Simplified, developer-focused home screen with essential hero, search,
 * curated featured Flutter animations, simple category navigation, and direct code viewer links.
 */

import { COMPONENTS, CATEGORIES } from '../registry/components.js';
import { sound } from '../utils/audio.js';
import { isFavorite, toggleFavorite, getFavorites, subscribeFavorites } from '../utils/favorites.js';
import { escapeHtml } from '../utils/security.js';

// Curated 6 standout featured components for the home screen
const FEATURED_COMPONENT_IDS = [
  'pop-button',
  'spring-fab',
  'cursor-card',
  'neon-gauge',
  'fluid-tab-bar',
  'typing-text'
];

export function renderLandingView(containerEl, store) {
  let activeCardInstances = new Map();
  let cardObserver = null;
  let searchQuery = '';

  const cleanupFeaturedPreviews = () => {
    if (cardObserver) {
      cardObserver.disconnect();
      cardObserver = null;
    }
    for (const [id, instance] of activeCardInstances.entries()) {
      if (instance && typeof instance.destroy === 'function') {
        try {
          instance.destroy();
        } catch (e) {
          console.warn('Featured preview cleanup error:', id, e);
        }
      }
    }
    activeCardInstances.clear();
  };

  const featuredComponents = FEATURED_COMPONENT_IDS
    .map(id => COMPONENTS.find(c => c.id === id))
    .filter(Boolean);

  containerEl.innerHTML = `
    <div class="landing-view">
      <!-- 1. SIMPLIFIED ESSENTIAL HERO SECTION -->
      <section class="hero-section">
        <!-- Ambient Glow Orbs -->
        <div class="hero-ambient-orb orb-1"></div>
        <div class="hero-ambient-orb orb-2"></div>

        <!-- Brand Badge -->
        <div class="hero-badge-container">
          <div class="hero-badge-header">
            <div class="hero-badge-icon">
              <svg viewBox="0 0 48 48">
                <path d="M26 8L14 26H24L22 40L34 22H24L26 8Z" fill="#080808" stroke="#080808" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="hero-badge-title">DartNova</span>
          </div>
          <span class="hero-badge-subtitle">MOTION FOR FLUTTER</span>
        </div>

        <!-- Clean Unobstructed Headline -->
        <div class="hero-headline-wrap">
          <h1 class="hero-headline">
            Bring Your Flutter UI to <span class="text-gradient-lime">Life.</span>
          </h1>
        </div>

        <p class="hero-description">
          A curated library of production-ready Flutter animations and motion widgets.
          Preview interactive motion live in your browser, customize parameters, then copy clean Dart code.
        </p>

        <!-- Search Bar -->
        <div class="hero-search-container">
          <div class="hero-search-box">
            <svg class="hero-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              id="hero-quick-search" 
              class="hero-search-input" 
              placeholder="Search Flutter animations (e.g., 'button', 'spring', 'card', 'tabs')..."
              aria-label="Search Flutter animations"
              autocomplete="off"
              spellcheck="false"
            />
            <button id="hero-search-submit" class="btn btn-primary hero-search-btn">
              <span>Search</span>
            </button>
          </div>
        </div>

        <!-- Essential Action Controls -->
        <div class="hero-actions">
          <a href="#playground" class="btn btn-primary" id="hero-explore-btn">
            <span>Explore Flutter Animations</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <a href="#playground" class="btn btn-secondary" id="hero-browse-btn">
            <span>Browse All Animations</span>
          </a>
        </div>
      </section>

      <!-- 2. CURATED FEATURED FLUTTER ANIMATIONS -->
      <section class="featured-section" id="featured-animations">
        <div class="section-header">
          <span class="section-tag">Curated Highlights</span>
          <h2 class="section-title">Featured Flutter Animations</h2>
          <p class="section-desc">
            A small selection of interactive animations built with native Flutter physics, curves, and CustomPainters.
          </p>
        </div>

        <div class="featured-cards-grid" id="featured-cards-grid">
          <!-- Rendered dynamically -->
        </div>

        <div class="featured-browse-all">
          <a href="#playground" class="btn btn-secondary btn-lg" id="browse-all-library-btn">
            <span>Browse All 468 Animations in Playground</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </section>

      <!-- 3. SIMPLE CATEGORY NAVIGATION -->
      <section class="categories-section" id="categories-showcase">
        <div class="section-header">
          <span class="section-tag">Library Structure</span>
          <h2 class="section-title">Explore by Category</h2>
          <p class="section-desc">
            Discover animations organized into 18 specialized motion categories. Click any category to view its components.
          </p>
        </div>

        <div class="categories-simple-grid">
          ${CATEGORIES.filter(c => c.id !== 'all').map(cat => {
            const count = COMPONENTS.filter(c => c.category === cat.id).length;
            return `
              <div class="category-card-simple" data-cat-id="${escapeHtml(cat.id)}">
                <div class="cat-card-header">
                  <div class="cat-card-icon">${cat.icon}</div>
                  <span class="cat-card-count">${count} widgets</span>
                </div>
                <h4 class="cat-card-name">${escapeHtml(cat.name)}</h4>
                <p class="cat-card-desc">${escapeHtml(cat.description || `Production-ready ${cat.name.toLowerCase()} for Flutter apps.`)}</p>
                <div class="cat-card-link">
                  <span>Explore category</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <!-- 4. DEVELOPER WORKFLOW -->
      <section class="workflow-section">
        <div class="workflow-inner">
          <div class="section-header">
            <span class="section-tag">Workflow</span>
            <h2 class="section-title">From Browser to Flutter in Seconds</h2>
            <p class="section-desc">
              Fast, friction-free developer experience.
            </p>
          </div>

          <div class="workflow-steps">
            <div class="workflow-step">
              <div class="step-num">01</div>
              <h4 class="step-title">Preview</h4>
              <p class="step-desc">Interact with the real-time browser preview across fluid desktop, tablet, and mobile frames.</p>
            </div>
            <div class="workflow-step">
              <div class="step-num">02</div>
              <h4 class="step-title">Customize</h4>
              <p class="step-desc">Tweak curves, timing, scale factors, and colors dynamically with live visual feedback.</p>
            </div>
            <div class="workflow-step">
              <div class="step-num">03</div>
              <h4 class="step-title">View & Copy Code</h4>
              <p class="step-desc">Inspect clean Flutter Dart code in our IDE editor and copy with a single click.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. SITE FOOTER -->
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-top">
            <div class="footer-brand">
              <div class="footer-brand-title">
                <div class="hero-badge-icon" style="width:24px; height:24px;">
                  <svg viewBox="0 0 48 48" style="width:13px; height:13px;">
                    <path d="M26 8L14 26H24L22 40L34 22H24L26 8Z" fill="#080808" stroke="#080808" stroke-width="1.5" stroke-linejoin="round"/>
                  </svg>
                </div>
                <span>DartNova</span>
              </div>
              <p class="footer-brand-desc">
                Motion for Flutter — Interactive UI motion library and developer showcase.
              </p>
            </div>

            <div class="footer-links-group">
              <div class="footer-column">
                <h5 class="footer-column-title">Navigation</h5>
                <ul class="footer-nav">
                  <li><a href="#playground">All 468 Animations</a></li>
                  <li><a href="#favorites">Favorites</a></li>
                  <li><a href="#categories-showcase">18 Categories</a></li>
                </ul>
              </div>

              <div class="footer-column">
                <h5 class="footer-column-title">Resources</h5>
                <ul class="footer-nav">
                  <li><a href="#docs">Documentation</a></li>
                  <li><a href="https://flutter.dev" target="_blank" rel="noopener noreferrer">Flutter Official</a></li>
                  <li><a href="https://dart.dev" target="_blank" rel="noopener noreferrer">Dart Language</a></li>
                  <li><a href="https://github.com/madewarabhishek966529-wq/DartNova" target="_blank" rel="noopener noreferrer">GitHub Repository</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <span>&copy; ${new Date().getFullYear()} DartNova. Released under the MIT License.</span>
            <span>468 Flutter Animations · Zero External Pub Dependencies</span>
          </div>
        </div>
      </footer>
    </div>
  `;

  // Render the Curated Featured Cards
  const renderFeaturedCards = () => {
    cleanupFeaturedPreviews();

    const gridEl = containerEl.querySelector('#featured-cards-grid');
    if (!gridEl) return;

    const favs = getFavorites();
    const query = searchQuery.toLowerCase().trim();

    const displayedComps = featuredComponents.filter(c => 
      !query || 
      c.name.toLowerCase().includes(query) || 
      c.description.toLowerCase().includes(query) ||
      c.category.toLowerCase().includes(query)
    );

    if (displayedComps.length === 0) {
      gridEl.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 3rem 1rem; text-align: center; color: var(--text-muted);">
          <p style="font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: 8px;">No featured animations match "${escapeHtml(searchQuery)}"</p>
          <p style="font-size: 13px; margin-bottom: 16px;">Try searching in the complete 468-animation playground library.</p>
          <a href="#playground" class="btn btn-primary" id="search-all-playground-link">
            <span>Search All in Playground</span>
          </a>
        </div>
      `;
      const searchAllLink = gridEl.querySelector('#search-all-playground-link');
      if (searchAllLink) {
        searchAllLink.addEventListener('click', () => {
          store.setState({ searchQuery, currentView: 'playground' });
        });
      }
      return;
    }

    gridEl.innerHTML = displayedComps.map(comp => {
      const isFav = favs.includes(comp.id);
      return `
        <div class="featured-card" data-comp-id="${escapeHtml(comp.id)}">
          <div class="featured-card-header">
            <div class="featured-card-title-group">
              <h3 class="featured-card-title">${escapeHtml(comp.name)}</h3>
              <span class="badge" style="font-size: 10px; font-family: var(--font-mono); text-transform: uppercase;">${escapeHtml(comp.category)}</span>
            </div>
            <button 
              class="featured-fav-btn ${isFav ? 'is-fav' : ''}" 
              data-fav-id="${escapeHtml(comp.id)}"
              title="${isFav ? 'Remove from favorites' : 'Add to favorites'}"
              aria-label="Toggle favorite for ${escapeHtml(comp.name)}"
            >
              ${isFav ? '♥' : '♡'}
            </button>
          </div>

          <div class="featured-preview-box" id="featured-preview-${escapeHtml(comp.id)}" data-id="${escapeHtml(comp.id)}">
            <!-- Mounted via visualizer -->
          </div>

          <p class="featured-card-desc">${escapeHtml(comp.description)}</p>

          <div class="featured-card-actions">
            <button class="btn btn-primary btn-sm featured-view-code-btn" data-id="${escapeHtml(comp.id)}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              <span>View Code</span>
            </button>
            <a href="#playground/${escapeHtml(comp.id)}" class="btn btn-secondary btn-sm featured-playground-link" data-id="${escapeHtml(comp.id)}">
              <span>Open in Playground</span>
            </a>
          </div>
        </div>
      `;
    }).join('');

    // Mount visualizers for featured cards
    displayedComps.forEach(comp => {
      const box = gridEl.querySelector(`#featured-preview-${comp.id}`);
      if (box && comp.render) {
        try {
          const instance = comp.render(box, { ...comp.defaultProps });
          activeCardInstances.set(comp.id, instance);
        } catch (e) {
          console.warn('Failed to mount featured card preview:', comp.id, e);
        }
      }
    });

    // Wire "View Code" button on featured cards
    gridEl.querySelectorAll('.featured-view-code-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        sound.playClick();
        const id = btn.getAttribute('data-id');
        store.setState({
          selectedComponentId: id,
          codeViewerOpen: true,
          codeViewerLayout: 'split',
          currentView: 'playground',
          mobileTab: 'code'
        });
        window.location.hash = `playground/${id}`;
      });
    });

    // Wire favorite buttons
    gridEl.querySelectorAll('.featured-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.playPop();
        const id = btn.getAttribute('data-fav-id');
        toggleFavorite(id);
        renderFeaturedCards();
      });
    });

    // Wire playground links
    gridEl.querySelectorAll('.featured-playground-link').forEach(link => {
      link.addEventListener('click', () => {
        sound.playClick();
        const id = link.getAttribute('data-id');
        store.setState({
          selectedComponentId: id,
          codeViewerOpen: false,
          currentView: 'playground',
          mobileTab: 'preview'
        });
      });
    });
  };

  renderFeaturedCards();

  // Search input handler
  const searchInput = containerEl.querySelector('#hero-quick-search');
  const searchSubmitBtn = containerEl.querySelector('#hero-search-submit');

  const executeSearch = () => {
    const q = searchInput ? searchInput.value.trim() : '';
    searchQuery = q;
    sound.playClick();

    // If query has length, update featured grid and allow direct navigation to playground with search
    renderFeaturedCards();
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderFeaturedCards();
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const q = searchInput.value.trim();
        if (q) {
          store.setState({ searchQuery: q, currentView: 'playground' });
          window.location.hash = 'playground';
        } else {
          executeSearch();
        }
      }
    });
  }

  if (searchSubmitBtn) {
    searchSubmitBtn.addEventListener('click', () => {
      const q = searchInput ? searchInput.value.trim() : '';
      if (q) {
        store.setState({ searchQuery: q, currentView: 'playground' });
        window.location.hash = 'playground';
      } else {
        executeSearch();
      }
    });
  }

  // Category navigation clicks -> Navigate to playground filtered by category
  containerEl.querySelectorAll('.category-card-simple').forEach(card => {
    card.addEventListener('click', () => {
      sound.playClick();
      const catId = card.getAttribute('data-cat-id');
      store.setState({
        selectedCategory: catId,
        currentView: 'playground'
      });
      window.location.hash = 'playground';
    });
  });

  // Re-render featured cards when favorites change
  subscribeFavorites(() => {
    renderFeaturedCards();
  });
}
