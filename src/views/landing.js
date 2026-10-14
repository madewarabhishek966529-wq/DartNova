/**
 * DartNova Landing Page View
 * Renders Hero, Interactive Stage, Featured Grid, Categories, Workflow, and Footer
 */

import { COMPONENTS, CATEGORIES } from '../registry/components.js';

export function renderLandingView(containerEl, store) {
  // Featured selection
  const featuredIds = ['pop-button', 'radial-glow-button', 'typing-text', 'cursor-card', 'neon-gradient', 'shimmer-effect'];
  const featured = COMPONENTS.filter(c => featuredIds.includes(c.id));

  containerEl.innerHTML = `
    <div class="landing-view">
      <!-- 1. HERO SECTION -->
      <section class="hero-section">
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
          <p class="hero-badge-tagline">Explore motion. Preview interactions. Copy Flutter code.</p>
        </div>

        <h1 class="hero-headline">
          Motion for <span class="text-gradient-lime">Flutter</span>
        </h1>

        <p class="hero-description">
          Discover expressive UI animations, interactive components, and reusable Flutter code. 
          Preview the motion in your browser, then bring it directly into your app.
        </p>

        <div class="hero-actions">
          <a href="#playground" class="btn btn-primary" id="hero-explore-btn">
            <span>Explore 20 Components</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <a href="#docs" class="btn btn-secondary" id="hero-docs-btn">
            <span>Documentation</span>
          </a>
        </div>

        <!-- Interactive Hero Stage -->
        <div class="hero-stage">
          <div class="hero-stage-demo" id="hero-stage-demo-mount">
            <div class="hero-stage-demo-glow"></div>
            <!-- Live interactive stage mounted by script -->
          </div>

          <div class="hero-stage-info">
            <div class="hero-stage-tags">
              <span class="badge badge-lime">Interactive Stage</span>
              <span class="badge">Zero Pub Dependencies</span>
              <span class="badge badge-cyan">Flutter 3.0+</span>
            </div>
            <h3>One Visual Idea, Two Implementations</h3>
            <p>
              HTML, CSS, and modern JavaScript power the interactive browser preview. 
              Clean, modular Flutter and Dart code provide the exact implementation you can copy-paste straight into your project.
            </p>
            <div>
              <a href="#playground/pop-button" class="btn btn-secondary" style="font-size:13px;">
                <span>Open in Playground</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. FEATURED COMPONENT SHOWCASE -->
      <section class="featured-section" id="featured-components">
        <div class="section-header">
          <span class="section-tag">Curated Library</span>
          <h2 class="section-title">Featured Motion Components</h2>
          <p class="section-desc">
            Explore animated UI widgets designed with precision timing curves and dynamic interaction states.
          </p>
        </div>

        <div class="featured-grid">
          ${featured.map(comp => `
            <div class="component-card" data-id="${comp.id}">
              <div class="component-preview-box" id="card-preview-${comp.id}"></div>
              <div class="component-details">
                <div class="component-meta">
                  <span class="badge badge-lime">${comp.badge}</span>
                  <span style="font-size:11px; color:var(--text-muted); font-family:var(--font-mono); text-transform:uppercase;">${comp.category}</span>
                </div>
                <h3 class="component-title">${comp.name}</h3>
                <p class="component-desc">${comp.description}</p>
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
          `).join('')}
        </div>

        <div style="text-align:center; margin-top:3rem;">
          <a href="#playground" class="btn btn-secondary" style="padding:0.75rem 2rem; font-size:15px;">
            <span>Browse All 20 Components</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </section>

      <!-- 3. MOTION CATEGORIES SHOWCASE -->
      <section class="categories-section">
        <div class="section-header">
          <span class="section-tag">Architecture</span>
          <h2 class="section-title">Organized by Motion Paradigm</h2>
          <p class="section-desc">
            From spring-driven micro-interactions to procedural wave shaders and multi-layer stacks.
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
                <p>High-performance ${cat.name.toLowerCase()} ready for mobile, web, and desktop Flutter apps.</p>
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
              Go from inspiration to a running Flutter widget in seconds.
            </p>
          </div>

          <div class="workflow-steps">
            <div class="workflow-step">
              <div class="step-num">01</div>
              <h4 class="step-title">Explore</h4>
              <p class="step-desc">Browse 20 animated motion patterns across 5 organized categories.</p>
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
                  <li><a href="#playground">All 20 Components</a></li>
                  <li><a href="#playground/pop-button">Buttons & Micro-interactions</a></li>
                  <li><a href="#playground/typing-text">Text & Transitions</a></li>
                  <li><a href="#playground/cursor-card">Cards & 3D Parallax</a></li>
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
            <span>&copy; ${new Date().getFullYear()} DartNova. Created by Abhishek Madewar. Released under MIT License.</span>
            <span>Motion for Flutter Developers Worldwide.</span>
          </div>
        </div>
      </footer>
    </div>
  `;

  // Mount Interactive Hero Stage Demo
  const heroStageMount = containerEl.querySelector('#hero-stage-demo-mount');
  if (heroStageMount) {
    const popComp = COMPONENTS.find(c => c.id === 'pop-button');
    if (popComp && popComp.render) {
      popComp.render(heroStageMount, { ...popComp.defaultProps, label: 'Tap to Pop' });
    }
  }

  // Mount Featured Cards Previews
  featured.forEach(comp => {
    const box = containerEl.querySelector(`#card-preview-${comp.id}`);
    if (box && comp.render) {
      comp.render(box, comp.defaultProps);
    }
  });

  // Bind Card Click to navigate to Playground
  containerEl.querySelectorAll('.component-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      window.location.hash = `playground/${id}`;
    });
  });

  // Bind Category Tiles to filter and open playground
  containerEl.querySelectorAll('.category-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const cat = tile.getAttribute('data-cat');
      store.setState({ selectedCategory: cat });
      window.location.hash = 'playground';
    });
  });
}
