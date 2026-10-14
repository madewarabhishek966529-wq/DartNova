/**
 * DartNova Landing Page View
 * High-Impact Motion Showcase with Dynamic Hero Switcher, 160-Component Catalog, and Multi-faceted Filters
 */

import { COMPONENTS, CATEGORIES } from '../registry/components.js';
import { sound } from '../utils/audio.js';
import { copyToClipboard } from '../utils/clipboard.js';
import { isFavorite, toggleFavorite, getFavorites, subscribeFavorites } from '../utils/favorites.js';

export function renderLandingView(containerEl, store) {
  let activeCategoryFilter = 'all';
  let activeStatusFilter = 'all'; // 'all' | 'complete' | 'planned' | 'favorites'
  let activeSortBy = 'featured'; // 'featured' | 'alphabetical' | 'difficulty'
  let landingSearchQuery = '';
  let activeHeroComponentId = 'pop-button';
  let activeHeroInstance = null;
  let activeCardInstances = new Map();
  let cardObserver = null;

  const cleanupCardPreviews = () => {
    if (cardObserver) {
      cardObserver.disconnect();
      cardObserver = null;
    }
    for (const [id, instance] of activeCardInstances.entries()) {
      if (instance && typeof instance.destroy === 'function') {
        try {
          instance.destroy();
        } catch (e) {
          console.warn('Card preview cleanup error:', id, e);
        }
      }
    }
    activeCardInstances.clear();
  };

  const liveCount = COMPONENTS.filter(c => c.status === 'complete').length;
  const plannedCount = COMPONENTS.filter(c => c.status === 'planned').length;
  const currentFavs = getFavorites();

  // 1. Render Base Static Layout ONCE to prevent DOM destruction & scroll resets
  containerEl.innerHTML = `
    <div class="landing-view">
      <!-- 1. HERO SECTION -->
      <section class="hero-section">
        <!-- Ambient Glow Orbs -->
        <div class="hero-ambient-orb orb-1"></div>
        <div class="hero-ambient-orb orb-2"></div>

        <!-- Brand Badge matching user reference screenshot -->
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
          <p class="hero-badge-tagline">Discover motion. Preview it instantly. Customize it. Copy the Flutter code.</p>
        </div>

        <!-- Headline with Floating 3D Motion Badges -->
        <div class="hero-headline-wrap">
          <!-- Left Floating 3D Motion Card: Spring Physics -->
          <div class="hero-floating-card float-card-left" title="Spring Physics Demo">
            <div class="floating-card-glass">
              <div class="floating-header">
                <div class="floating-dot-pulse"></div>
                <span class="floating-label">Spring Physics</span>
                <span class="floating-tag">120 FPS</span>
              </div>
              <div class="floating-speed-dial-mock">
                <div class="mini-spring-node node-1">★</div>
                <div class="mini-spring-node node-2">✦</div>
                <div class="mini-spring-fab">⚡</div>
              </div>
              <div class="floating-footer">
                <span class="floating-sub">Mass 1.0 · Stiff 180</span>
              </div>
            </div>
          </div>

          <!-- Right Floating 3D Motion Card: Vector Matrix4 -->
          <div class="hero-floating-card float-card-right" title="Hardware Vector Matrix4">
            <div class="floating-card-glass">
              <div class="floating-header">
                <div class="floating-dot-cyan"></div>
                <span class="floating-label">Matrix4 3D</span>
                <span class="floating-tag cyan">Vector</span>
              </div>
              <div class="floating-canvas-preview">
                <div class="floating-radar-sweep"></div>
                <div class="floating-gauge-val">99.4%</div>
                <span class="floating-gauge-caption">CustomPainter</span>
              </div>
              <div class="floating-footer">
                <span class="floating-sub">60–120 FPS Fluid</span>
              </div>
            </div>
          </div>

          <h1 class="hero-headline">
            Bring Your Flutter UI to <span class="text-gradient-lime">Life.</span>
          </h1>
        </div>

        <p class="hero-description">
          DartNova is a curated collection of 160 animated UI components, interactive effects, 
          transitions, loaders, gestures, backgrounds, and advanced motion experiments built for Flutter developers.
        </p>

        <div class="hero-actions">
          <a href="#playground" class="btn btn-primary" id="hero-explore-btn">
            <span>Explore Motion</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <a href="#components" class="btn btn-secondary" id="hero-browse-btn">
            <span>Browse Components</span>
          </a>
        </div>

        <!-- Stats Pill Ribbon -->
        <div class="hero-stats-ribbon">
          <div class="stat-pill">
            <span class="status-dot" style="color:var(--accent-primary);"></span>
            <span><strong>160</strong> Planned Components</span>
          </div>
          <div class="stat-pill">
            <span class="status-dot" style="color:var(--accent-cyan);"></span>
            <span><strong>16</strong> Motion Categories</span>
          </div>
          <div class="stat-pill">
            <span class="status-dot" style="color:var(--accent-purple);"></span>
            <span><strong>Zero</strong> Pub Dependencies</span>
          </div>
          <div class="stat-pill">
            <span class="status-dot" style="color:var(--accent-amber);"></span>
            <span><strong>60–120 FPS</strong> Native Motion</span>
          </div>
        </div>

        <!-- Interactive Hero Stage with macOS Window Frame -->
        <div class="hero-stage window-frame">
          <div class="window-titlebar">
            <div class="window-dots">
              <span class="window-dot close"></span>
              <span class="window-dot min"></span>
              <span class="window-dot max"></span>
            </div>
            <span class="window-title">dartnova_hero_showcase.dart</span>
            <div class="hero-stage-badge-group">
              <span class="badge badge-lime" style="font-size:10px; padding:2px 8px;">LIVE PREVIEW</span>
            </div>
          </div>

          <div class="hero-stage-body">
            <div class="hero-stage-demo">
              <div class="hero-stage-demo-glow"></div>
              <div id="hero-stage-demo-mount" style="position:relative; z-index:2; width:100%; display:flex; align-items:center; justify-content:center;"></div>
            </div>

            <div class="hero-stage-info">
              <div class="hero-stage-switcher">
                <span style="font-size:11px; font-family:var(--font-mono); color:var(--text-muted); text-transform:uppercase;">Quick Motion Demo:</span>
                <div class="hero-switcher-pills">
                  <button class="hero-pill-btn active" data-hero-id="pop-button">Pop Button</button>
                  <button class="hero-pill-btn" data-hero-id="spring-fab">Spring Speed Dial</button>
                  <button class="hero-pill-btn" data-hero-id="cursor-card">3D Tilt Card</button>
                  <button class="hero-pill-btn" data-hero-id="neon-gauge">Neon Gauge</button>
                  <button class="hero-pill-btn" data-hero-id="fluid-tab-bar">Fluid Tabs</button>
                  <button class="hero-pill-btn" data-hero-id="radial-glow-button">Radial Glow</button>
                  <button class="hero-pill-btn" data-hero-id="neon-gradient">Neon Aura</button>
                </div>
              </div>

              <h3>One Visual Idea, Two Implementations</h3>
              <p>
                HTML, CSS, and modern JavaScript power the interactive browser preview. 
                Clean, modular Flutter and Dart code provide the exact implementation you can copy-paste straight into your project.
              </p>

              <div style="display:flex; align-items:center; gap:12px; margin-top:auto; flex-wrap:wrap;">
                <a href="#playground/pop-button" class="btn btn-primary" style="font-size:13px;" id="hero-stage-open-btn">
                  <span>Open in Playground</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
                <button class="btn btn-secondary" style="font-size:13px;" id="hero-quick-copy-btn">
                  <span>Copy Dart Code</span>
                </button>
                <button class="btn btn-secondary" style="font-size:13px;" id="hero-replay-motion-btn" title="Replay Motion Animation">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                  </svg>
                  <span>Replay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- KINETIC TYPOGRAPHY MOTION MARQUEE TICKER BANNER -->
      <div class="kinetic-ticker-wrapper">
        <div class="kinetic-ticker-track">
          <div class="ticker-item"><span class="ticker-pill accent-lime">⚡ 160 MOTION COMPONENTS</span></div>
          <div class="ticker-item"><span class="ticker-pill accent-cyan">🌀 16 FORMAL CATEGORIES</span></div>
          <div class="ticker-item"><span class="ticker-pill accent-purple">🎨 HARDWARE CUSTOMPAINTER</span></div>
          <div class="ticker-item"><span class="ticker-pill accent-amber">🌊 PROCEDURAL SINE WAVES</span></div>
          <div class="ticker-item"><span class="ticker-pill accent-lime">🧲 POINTER MAGNETICS</span></div>
          <div class="ticker-item"><span class="ticker-pill accent-cyan">✨ SHADER MASK SHIMMERS</span></div>
          <div class="ticker-item"><span class="ticker-pill accent-purple">🎯 ZERO PUB DEPENDENCIES</span></div>
          <div class="ticker-item"><span class="ticker-pill accent-lime">🚀 60–120 FPS FLUID MOTION</span></div>
          <div class="ticker-item"><span class="ticker-pill accent-amber">📱 TACTILE HAPTIC & AUDIO</span></div>
          <!-- Seamless loop duplicate -->
          <div class="ticker-item"><span class="ticker-pill accent-lime">⚡ 160 MOTION COMPONENTS</span></div>
          <div class="ticker-item"><span class="ticker-pill accent-cyan">🌀 16 FORMAL CATEGORIES</span></div>
          <div class="ticker-item"><span class="ticker-pill accent-purple">🎨 HARDWARE CUSTOMPAINTER</span></div>
          <div class="ticker-item"><span class="ticker-pill accent-amber">🌊 PROCEDURAL SINE WAVES</span></div>
          <div class="ticker-item"><span class="ticker-pill accent-lime">🧲 POINTER MAGNETICS</span></div>
          <div class="ticker-item"><span class="ticker-pill accent-cyan">✨ SHADER MASK SHIMMERS</span></div>
          <div class="ticker-item"><span class="ticker-pill accent-purple">🎯 ZERO PUB DEPENDENCIES</span></div>
          <div class="ticker-item"><span class="ticker-pill accent-lime">🚀 60–120 FPS FLUID MOTION</span></div>
          <div class="ticker-item"><span class="ticker-pill accent-amber">📱 TACTILE HAPTIC & AUDIO</span></div>
        </div>
      </div>

      <!-- 2. FEATURED COMPONENT SHOWCASE & CATALOG -->
      <section class="featured-section" id="featured-components">
        <div id="components" class="section-anchor"></div>
        <div class="section-header">
          <span class="section-tag">Catalog & Playground</span>
          <h2 class="section-title">Motion Component Library</h2>
          <p class="section-desc">
            Browse, filter, and inspect 160 motion components engineered with Flutter timing curves and clean Dart architectures.
          </p>

          <!-- Enhanced Multi-Faceted Filter Dock -->
          <div class="landing-filter-container">
            <!-- Search Input -->
            <div class="landing-search-wrap">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                id="landing-search-input" 
                class="landing-search-input" 
                placeholder="Search 160 components, tags, Flutter APIs (e.g. 'button', 'matrix4', 'spring')..." 
                value="${landingSearchQuery}"
                autocomplete="off"
                spellcheck="false"
              />
              <button id="landing-search-clear" class="landing-search-clear" title="Clear search" style="display:none;">✕</button>
            </div>

            <!-- Controls Row: Status Scope & Dropdowns -->
            <div class="landing-controls-row">
              <div class="landing-status-pills">
                <button class="status-pill-btn active" data-status="all">
                  All <span class="pill-count">(${COMPONENTS.length})</span>
                </button>
                <button class="status-pill-btn" data-status="complete">
                  Live Previews <span class="pill-count">(${liveCount})</span>
                </button>
                <button class="status-pill-btn" data-status="planned">
                  Roadmap Specs <span class="pill-count">(${plannedCount})</span>
                </button>
                <button class="status-pill-btn" data-status="favorites">
                  ♥ Favorites <span class="pill-count">(${currentFavs.length})</span>
                </button>
              </div>

              <div class="landing-dropdowns-group">
                <select id="landing-category-select" class="landing-select" title="Filter by Category">
                  ${CATEGORIES.map(cat => `
                    <option value="${cat.id}">
                      ${cat.icon} ${cat.name} (${cat.id === 'all' ? COMPONENTS.length : COMPONENTS.filter(c => c.category === cat.id).length})
                    </option>
                  `).join('')}
                </select>

                <select id="landing-sort-select" class="landing-select" title="Sort Order">
                  <option value="featured">★ Featured</option>
                  <option value="alphabetical">A–Z Name</option>
                  <option value="difficulty">⚡ Difficulty</option>
                </select>
              </div>
            </div>

            <!-- Scrollable Horizontal Category Pills -->
            <div class="landing-category-pills-bar">
              ${CATEGORIES.map(cat => `
                <button class="cat-pill-btn ${cat.id === 'all' ? 'active' : ''}" data-cat="${cat.id}">
                  <span>${cat.icon}</span>
                  <span>${cat.name}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Component Grid Container: Updated dynamically without resetting page scroll -->
        <div class="featured-grid" id="landing-featured-grid"></div>
      </section>

      <!-- 3. MOTION CATEGORIES SHOWCASE -->
      <section class="categories-section" id="categories-showcase">
        <div id="categories" class="section-anchor"></div>
        <div class="section-header">
          <span class="section-tag">Architecture</span>
          <h2 class="section-title">16 Motion Categories</h2>
          <p class="section-desc">
            Structured into 16 formal motion categories with 10 production widgets each, covering every layer of the Flutter animation system.
          </p>
        </div>

        <div class="categories-grid">
          ${CATEGORIES.filter(c => c.id !== 'all').map(cat => {
            const count = COMPONENTS.filter(c => c.category === cat.id).length;
            return `
              <div class="category-tile" data-cat="${cat.id}">
                <div class="category-tile-header">
                  <div class="category-icon">${cat.icon}</div>
                  <span class="category-count">${count} widgets</span>
                </div>
                <h4>${cat.name}</h4>
                <p>${cat.description || `High-performance ${cat.name.toLowerCase()} ready for mobile, web, and desktop Flutter apps.`}</p>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <!-- 4. DEVELOPER WORKFLOW -->
      <section class="workflow-section">
        <div class="workflow-inner">
          <div class="section-header">
            <span class="section-tag">Seamless DX</span>
            <h2 class="section-title">Developer Workflow</h2>
            <p class="section-desc">
              Go from visual inspiration to a running Flutter widget in seconds.
            </p>
          </div>

          <div class="workflow-steps">
            <div class="workflow-step">
              <div class="step-num">01</div>
              <h4 class="step-title">Explore</h4>
              <p class="step-desc">Browse 160 motion components across 16 formal categories.</p>
            </div>
            <div class="workflow-step">
              <div class="step-num">02</div>
              <h4 class="step-title">Preview</h4>
              <p class="step-desc">Interact with the real-time browser preview across desktop, tablet, and mobile frames.</p>
            </div>
            <div class="workflow-step">
              <div class="step-num">03</div>
              <h4 class="step-title">Customize</h4>
              <p class="step-desc">Tweak duration, timing curves, colors, scale factors, and text content dynamically.</p>
            </div>
            <div class="workflow-step">
              <div class="step-num">04</div>
              <h4 class="step-title">Copy Code</h4>
              <p class="step-desc">One click copies production-ready Flutter code with imports and lifecycle logic.</p>
            </div>
            <div class="workflow-step">
              <div class="step-num">05</div>
              <h4 class="step-title">Integrate</h4>
              <p class="step-desc">Paste into your Flutter codebase with zero extra dependencies required.</p>
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
                <div class="hero-badge-icon" style="width:26px; height:26px;">
                  <svg viewBox="0 0 48 48" style="width:14px; height:14px;">
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
                <h5 class="footer-column-title">Library</h5>
                <ul class="footer-nav">
                  <li><a href="#playground">All 160 Components</a></li>
                  <li><a href="#favorites">Saved Favorites</a></li>
                  <li><a href="#categories">16 Categories</a></li>
                  <li><a href="#playground/pop-button">Buttons & Controls</a></li>
                  <li><a href="#playground/cursor-card">Cards & Surfaces</a></li>
                  <li><a href="#playground/typing-text">Text & Typography</a></li>
                </ul>
              </div>

              <div class="footer-column">
                <h5 class="footer-column-title">Resources</h5>
                <ul class="footer-nav">
                  <li><a href="#docs">Documentation</a></li>
                  <li><a href="https://flutter.dev" target="_blank" rel="noopener">Flutter Official</a></li>
                  <li><a href="https://dart.dev" target="_blank" rel="noopener">Dart Language</a></li>
                  <li><a href="https://github.com/madewarabhishek966529-wq/DartNova" target="_blank" rel="noopener">GitHub Repository</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <span>&copy; ${new Date().getFullYear()} DartNova. Motion for Flutter Developers Worldwide. Released under MIT License.</span>
            <span>160 Components · Zero External Dependencies.</span>
          </div>
        </div>
      </footer>
    </div>
  `;

  // 2. Focused Catalog Update Function: updates ONLY the grid & active button classes, preserving exact scroll position
  const updateCatalogGrid = () => {
    cleanupCardPreviews();

    const favs = getFavorites();
    const query = landingSearchQuery.toLowerCase().trim();

    // Filter components
    let filteredComps = COMPONENTS.filter(comp => {
      const matchesCategory = activeCategoryFilter === 'all' || comp.category === activeCategoryFilter;
      const matchesStatus = 
        activeStatusFilter === 'all' ||
        (activeStatusFilter === 'complete' && comp.status === 'complete') ||
        (activeStatusFilter === 'planned' && comp.status === 'planned') ||
        (activeStatusFilter === 'favorites' && favs.includes(comp.id));
      const matchesQuery = !query ||
        comp.name.toLowerCase().includes(query) ||
        comp.description.toLowerCase().includes(query) ||
        comp.category.toLowerCase().includes(query) ||
        (comp.tags && comp.tags.some(t => t.toLowerCase().includes(query))) ||
        (comp.badge && comp.badge.toLowerCase().includes(query));

      return matchesCategory && matchesStatus && matchesQuery;
    });

    // Sort components
    if (activeSortBy === 'alphabetical') {
      filteredComps.sort((a, b) => a.name.localeCompare(b.name));
    } else if (activeSortBy === 'difficulty') {
      const order = { beginner: 1, intermediate: 2, advanced: 3 };
      filteredComps.sort((a, b) => (order[a.difficulty] || 2) - (order[b.difficulty] || 2));
    }

    // Update active class on horizontal category pills without touching the DOM structure
    containerEl.querySelectorAll('.cat-pill-btn').forEach(btn => {
      const isActive = btn.getAttribute('data-cat') === activeCategoryFilter;
      btn.classList.toggle('active', isActive);
      if (isActive && typeof btn.scrollIntoViewIfNeeded === 'function') {
        btn.scrollIntoViewIfNeeded({ inline: 'center' });
      }
    });

    // Update active class on status pills
    containerEl.querySelectorAll('.status-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-status') === activeStatusFilter);
    });

    // Update favorite count pill
    const favCountSpan = containerEl.querySelector('.status-pill-btn[data-status="favorites"] .pill-count');
    if (favCountSpan) {
      favCountSpan.textContent = `(${favs.length})`;
    }

    // Sync dropdown values if needed
    const catSelect = containerEl.querySelector('#landing-category-select');
    if (catSelect && catSelect.value !== activeCategoryFilter) {
      catSelect.value = activeCategoryFilter;
    }
    const sortSelect = containerEl.querySelector('#landing-sort-select');
    if (sortSelect && sortSelect.value !== activeSortBy) {
      sortSelect.value = activeSortBy;
    }

    // Toggle clear search button
    const clearBtn = containerEl.querySelector('#landing-search-clear');
    if (clearBtn) {
      clearBtn.style.display = landingSearchQuery ? 'flex' : 'none';
    }

    // Update grid container
    const gridEl = containerEl.querySelector('#landing-featured-grid');
    if (!gridEl) return;

    if (filteredComps.length === 0) {
      gridEl.innerHTML = `
        <div class="empty-catalog-state" style="grid-column: 1 / -1;">
          <div class="empty-catalog-icon">🔍</div>
          <h3 class="empty-catalog-title">No matching components found</h3>
          <p class="empty-catalog-desc">We couldn't find any component matching your filters. Try clearing your search query or switching categories.</p>
          <button class="btn btn-secondary" id="reset-catalog-btn" style="margin-top:8px;">
            <span>Reset All Filters</span>
          </button>
        </div>
      `;
      const resetBtn = gridEl.querySelector('#reset-catalog-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          sound.playPop();
          landingSearchQuery = '';
          activeCategoryFilter = 'all';
          activeStatusFilter = 'all';
          activeSortBy = 'featured';
          const input = containerEl.querySelector('#landing-search-input');
          if (input) input.value = '';
          updateCatalogGrid();
        });
      }
      return;
    }

    gridEl.innerHTML = filteredComps.map(comp => {
      const fav = favs.includes(comp.id);
      const isLive = comp.status === 'complete';
      return `
        <div class="component-card" data-id="${comp.id}">
          <button 
            class="card-fav-btn ${fav ? 'active' : ''}" 
            data-fav-id="${comp.id}" 
            title="${fav ? 'Remove from favorites' : 'Add to favorites'}" 
            aria-label="Toggle favorite"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="${fav ? 'var(--accent-primary)' : 'none'}" stroke="${fav ? 'var(--accent-primary)' : 'currentColor'}" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          <div class="component-preview-box" id="card-preview-${comp.id}" data-comp-id="${comp.id}"></div>
          <div class="component-details">
            <div class="component-meta">
              <span class="badge ${isLive ? 'badge-lime' : 'badge-cyan'}">${isLive ? 'LIVE DEMO' : 'ROADMAP SPEC'}</span>
              <span style="font-size:11px; color:var(--text-muted); font-family:var(--font-mono); text-transform:uppercase;">
                ${comp.difficulty || 'intermediate'}
              </span>
            </div>
            <h3 class="component-title">${comp.name}</h3>
            <p class="component-desc">${comp.description}</p>
            
            ${comp.tags && comp.tags.length ? `
              <div class="card-tags-list">
                ${comp.tags.slice(0, 3).map(tag => `<span class="card-tag-pill">#${tag}</span>`).join('')}
              </div>
            ` : ''}

            <div class="component-card-footer">
              <span class="btn-open-playground">
                <span>Open Playground</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Mount preview animations immediately for visible cards, lazy observe remaining
    const previewBoxes = Array.from(gridEl.querySelectorAll('.component-preview-box'));
    cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const box = entry.target;
          const compId = box.getAttribute('data-comp-id');
          if (compId && !activeCardInstances.has(compId)) {
            const comp = COMPONENTS.find(c => c.id === compId);
            if (comp && comp.render) {
              const inst = comp.render(box, comp.defaultProps);
              activeCardInstances.set(compId, inst);
            }
          }
        }
      });
    }, { rootMargin: '400px 0px' });

    previewBoxes.forEach((box, idx) => {
      if (idx < 24) {
        const compId = box.getAttribute('data-comp-id');
        if (compId && !activeCardInstances.has(compId)) {
          const comp = COMPONENTS.find(c => c.id === compId);
          if (comp && comp.render) {
            const inst = comp.render(box, comp.defaultProps);
            activeCardInstances.set(compId, inst);
          }
        }
      } else {
        cardObserver.observe(box);
      }
    });

    // Bind card clicks to navigate to playground
    gridEl.querySelectorAll('.component-card').forEach(card => {
      card.addEventListener('click', () => {
        sound.playClick();
        const id = card.getAttribute('data-id');
        window.location.hash = `playground/${id}`;
      });
    });

    // Bind card favorite heart clicks
    gridEl.querySelectorAll('.card-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.playPop();
        const compId = btn.getAttribute('data-fav-id');
        const isFav = toggleFavorite(compId);
        btn.classList.toggle('active', isFav);
        const svg = btn.querySelector('svg');
        if (svg) {
          svg.setAttribute('fill', isFav ? 'var(--accent-primary)' : 'none');
          svg.setAttribute('stroke', isFav ? 'var(--accent-primary)' : 'currentColor');
        }
        btn.title = isFav ? 'Remove from favorites' : 'Add to favorites';
        store.setState({ favorites: getFavorites() });
        if (activeStatusFilter === 'favorites') {
          updateCatalogGrid();
        }
      });
    });
  };

  // Mount Hero Demo Stage
  const mountHeroDemo = (compId) => {
    const heroStageMount = containerEl.querySelector('#hero-stage-demo-mount');
    if (!heroStageMount) return;
    if (activeHeroInstance?.destroy) {
      try {
        activeHeroInstance.destroy();
      } catch (e) {
        console.warn('Hero demo cleanup error:', e);
      }
    }
    const comp = COMPONENTS.find(c => c.id === compId);
    if (comp && comp.render) {
      heroStageMount.innerHTML = '';
      activeHeroInstance = comp.render(heroStageMount, comp.defaultProps);
    }
  };

  // Mount Initial Hero Demo
  mountHeroDemo(activeHeroComponentId);

  // 3. Bind Static Filter & Navigation Controls ONCE
  // Search Input
  const searchInput = containerEl.querySelector('#landing-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      landingSearchQuery = e.target.value;
      updateCatalogGrid();
    });
  }

  // Clear Search
  const clearBtn = containerEl.querySelector('#landing-search-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      sound.playPop();
      landingSearchQuery = '';
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      updateCatalogGrid();
    });
  }

  // Status Filter Pills
  containerEl.querySelectorAll('.status-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      activeStatusFilter = btn.getAttribute('data-status');
      updateCatalogGrid();
    });
  });

  // Category Dropdown
  const catSelect = containerEl.querySelector('#landing-category-select');
  if (catSelect) {
    catSelect.addEventListener('change', (e) => {
      sound.playClick();
      activeCategoryFilter = e.target.value;
      updateCatalogGrid();
    });
  }

  // Sort Dropdown
  const sortSelect = containerEl.querySelector('#landing-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sound.playClick();
      activeSortBy = e.target.value;
      updateCatalogGrid();
    });
  }

  // Horizontal Category Pills
  containerEl.querySelectorAll('.cat-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      activeCategoryFilter = btn.getAttribute('data-cat');
      updateCatalogGrid();
    });
  });

  // Hero Switcher Pills
  containerEl.querySelectorAll('.hero-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      const id = btn.getAttribute('data-hero-id');
      activeHeroComponentId = id;
      containerEl.querySelectorAll('.hero-pill-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-hero-id') === id));
      mountHeroDemo(id);
      const openBtn = containerEl.querySelector('#hero-stage-open-btn');
      if (openBtn) openBtn.setAttribute('href', `#playground/${id}`);
    });
  });

  // Hero Quick Copy
  const heroCopyBtn = containerEl.querySelector('#hero-quick-copy-btn');
  if (heroCopyBtn) {
    heroCopyBtn.addEventListener('click', async () => {
      sound.playPop();
      const comp = COMPONENTS.find(c => c.id === activeHeroComponentId);
      if (comp) {
        await copyToClipboard(comp.flutterSnippet);
        const orig = heroCopyBtn.innerHTML;
        heroCopyBtn.innerHTML = '<span>✓ Copied!</span>';
        setTimeout(() => {
          heroCopyBtn.innerHTML = orig;
        }, 2000);
      }
    });
  }

  // Hero Replay Motion
  const replayBtn = containerEl.querySelector('#hero-replay-motion-btn');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      sound.playPop();
      mountHeroDemo(activeHeroComponentId);
    });
  }

  // Category Showcase Tiles: sets category and smoothly scrolls up to the catalog grid
  containerEl.querySelectorAll('.category-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      sound.playClick();
      const cat = tile.getAttribute('data-cat');
      activeCategoryFilter = cat;
      updateCatalogGrid();
      const target = containerEl.querySelector('#featured-components');
      if (target) {
        const headerOffset = 75;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    });
  });

  // Subscribe to external favorite changes
  const unsubscribeFavs = subscribeFavorites(() => {
    const favs = getFavorites();
    containerEl.querySelectorAll('.card-fav-btn').forEach(btn => {
      const id = btn.getAttribute('data-fav-id');
      const isFav = favs.includes(id);
      btn.classList.toggle('active', isFav);
      const svg = btn.querySelector('svg');
      if (svg) {
        svg.setAttribute('fill', isFav ? 'var(--accent-primary)' : 'none');
        svg.setAttribute('stroke', isFav ? 'var(--accent-primary)' : 'currentColor');
      }
    });
    const favCountSpan = containerEl.querySelector('.status-pill-btn[data-status="favorites"] .pill-count');
    if (favCountSpan) {
      favCountSpan.textContent = `(${favs.length})`;
    }
  });

  // Initial population of the catalog grid
  updateCatalogGrid();
}
