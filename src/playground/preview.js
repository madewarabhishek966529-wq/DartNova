import { getComponentById, COMPONENTS, CATEGORIES } from '../registry/components.js';
import { sound } from '../utils/audio.js';
import { isFavorite, toggleFavorite } from '../utils/favorites.js';
import { escapeHtml } from '../utils/security.js';

export function setupPreview(workspaceEl, store) {
  if (!workspaceEl) return;

  let activeComponentInstance = null;
  const activeGalleryInstances = new Map();

  const cleanupGallery = () => {
    for (const [id, inst] of activeGalleryInstances.entries()) {
      if (inst && typeof inst.destroy === 'function') {
        try { inst.destroy(); } catch (_) {}
      }
    }
    activeGalleryInstances.clear();
  };

  const render = () => {
    const { 
      selectedComponentId, 
      selectedCategory = 'all',
      searchQuery = '',
      filterStatus = 'all',
      favoritesOnly = false,
      previewMode = 'desktop', 
      canvasBg = 'default', 
      playgroundMode = 'inspector',
      componentProps = {},
      favorites = []
    } = store.getState();

    // =========================================================================
    // MODE B: VISUAL GALLERY / BENTO GRID EXPLORER (FEATURE DN-F04)
    // =========================================================================
    if (playgroundMode === 'gallery') {
      if (activeComponentInstance?.destroy) {
        activeComponentInstance.destroy();
        activeComponentInstance = null;
      }
      cleanupGallery();

      const query = searchQuery.toLowerCase().trim();
      const filtered = COMPONENTS.filter(comp => {
        const matchesCategory = selectedCategory === 'all' || comp.category === selectedCategory;
        const matchesStatus = filterStatus === 'all' || 
          (filterStatus === 'complete' && comp.status === 'complete') ||
          (filterStatus === 'planned' && comp.status === 'planned');
        const matchesFav = !favoritesOnly || favorites.includes(comp.id);
        const matchesQuery = !query || 
          comp.name.toLowerCase().includes(query) || 
          comp.description.toLowerCase().includes(query) ||
          comp.category.toLowerCase().includes(query);
        return matchesCategory && matchesStatus && matchesFav && matchesQuery;
      });

      const currentCatObj = CATEGORIES.find(c => c.id === selectedCategory) || { name: 'All Categories', icon: '⚡' };

      workspaceEl.innerHTML = `
        <div class="playground-gallery-container">
          <div class="gallery-header-row">
            <div class="gallery-title-wrap">
              <div class="gallery-title">
                <span>${currentCatObj.icon} ${escapeHtml(currentCatObj.name)}</span>
                <span class="gallery-count-badge">${filtered.length} animations</span>
              </div>
              <p style="font-size:12px; color:var(--text-secondary); margin:0;">
                Click any component card to test its interactive controls and copy pure Flutter Dart code.
              </p>
            </div>

            <div class="workspace-toolbar">
              <!-- Presentation Mode Switcher -->
              <div class="toolbar-btn-group" title="Presentation Mode" role="group">
                <button class="toolbar-tool-btn" data-playground-mode="inspector" title="Focused Single Inspector">
                  <span>⚡ Inspector</span>
                </button>
                <button class="toolbar-tool-btn active" data-playground-mode="gallery" title="Visual Bento Grid Explorer">
                  <span>🎴 Visual Gallery</span>
                </button>
              </div>
            </div>
          </div>

          <div class="playground-gallery-grid">
            ${filtered.map(comp => {
              const isFav = favorites.includes(comp.id) || isFavorite(comp.id);
              return `
                <div class="gallery-card" data-comp-id="${escapeHtml(comp.id)}">
                  <div class="gallery-card-header">
                    <span class="gallery-card-title">${escapeHtml(comp.name)}</span>
                    <button class="comp-fav-btn ${isFav ? 'is-fav' : ''}" data-fav-id="${escapeHtml(comp.id)}" title="Favorite">
                      <span>${isFav ? '♥' : '♡'}</span>
                    </button>
                  </div>

                  <div class="gallery-card-preview" id="gallery-card-preview-${escapeHtml(comp.id)}"></div>

                  <div class="gallery-card-footer">
                    <span class="gallery-card-category">${escapeHtml(comp.category)}</span>
                    <button class="btn btn-primary btn-sm gallery-inspect-btn" data-id="${escapeHtml(comp.id)}" style="padding:4px 10px; font-size:11px;">
                      <span>Inspect & Code</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;

      // Mount mini visualizers for cards
      filtered.forEach(comp => {
        const box = workspaceEl.querySelector(`#gallery-card-preview-${comp.id}`);
        if (box && comp.render) {
          try {
            const inst = comp.render(box, { ...comp.defaultProps });
            activeGalleryInstances.set(comp.id, inst);
          } catch (e) {
            console.warn('Gallery card mount warning:', comp.id, e);
          }
        }
      });

      // Bind mode switcher
      workspaceEl.querySelectorAll('[data-playground-mode]').forEach(btn => {
        btn.addEventListener('click', () => {
          sound.playClick();
          store.setState({ playgroundMode: btn.getAttribute('data-playground-mode') });
        });
      });

      // Bind Inspect & Code button on cards
      workspaceEl.querySelectorAll('.gallery-inspect-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          sound.playClick();
          const id = btn.getAttribute('data-id');
          store.setState({ 
            selectedComponentId: id, 
            playgroundMode: 'inspector',
            codeViewerOpen: true 
          });
          setTimeout(() => {
            const codePanel = document.querySelector('.playground-code-panel');
            if (codePanel) {
              codePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 80);
        });
      });

      // Bind card favorites
      workspaceEl.querySelectorAll('[data-fav-id]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          sound.playPop();
          const id = btn.getAttribute('data-fav-id');
          toggleFavorite(id);
        });
      });

      return;
    }

    // =========================================================================
    // MODE A: FOCUSED SINGLE INSPECTOR & LIVE PREVIEW (DEFAULT)
    // =========================================================================
    cleanupGallery();
    const comp = getComponentById(selectedComponentId);
    const props = { ...comp.defaultProps, ...componentProps };
    const isFav = favorites.includes(comp.id) || isFavorite(comp.id);

    workspaceEl.innerHTML = `
      <div class="workspace-header">
        <div class="workspace-header-info">
          <div class="workspace-header-title-row">
            <h2 class="workspace-title">${escapeHtml(comp.name)}</h2>
            <span class="badge" style="font-size:10px; font-family:var(--font-mono); text-transform:uppercase; letter-spacing:0.05em;">${escapeHtml(comp.category)}</span>
            <span class="badge" style="font-size:10px; font-family:var(--font-mono); background: rgba(56, 189, 248, 0.12); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">Flutter 3.x+</span>
            <span class="badge" style="font-size:10px; font-family:var(--font-mono); background: rgba(34, 197, 94, 0.12); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3);">0 Pub Deps</span>

            <button id="workspace-fav-btn" class="workspace-fav-btn ${isFav ? 'is-fav' : ''}" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}" aria-label="Toggle favorite">
              <span>${isFav ? '♥ Favorited' : '♡ Add Favorite'}</span>
            </button>
          </div>
          <p class="workspace-description">${escapeHtml(comp.description)}</p>
        </div>

        <div class="workspace-toolbar">
          <!-- Presentation Mode Switcher -->
          <div class="toolbar-btn-group" title="Presentation Mode" role="group">
            <button class="toolbar-tool-btn active" data-playground-mode="inspector" title="Focused Single Inspector">
              <span>⚡ Inspector</span>
            </button>
            <button class="toolbar-tool-btn" data-playground-mode="gallery" title="Visual Bento Grid Explorer">
              <span>🎴 Visual Gallery</span>
            </button>
          </div>

          <!-- Viewport Mode -->
          <div class="toolbar-btn-group" title="Preview Viewport Frame" role="group" aria-label="Viewport size">
            <button class="toolbar-tool-btn ${previewMode === 'desktop' ? 'active' : ''}" data-mode="desktop" aria-label="Fluid viewport">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <span>Fluid</span>
            </button>
            <button class="toolbar-tool-btn ${previewMode === 'tablet' ? 'active' : ''}" data-mode="tablet" aria-label="Tablet viewport">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="4" y="2" width="16" height="20" rx="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
              <span>Tablet</span>
            </button>
            <button class="toolbar-tool-btn ${previewMode === 'mobile' ? 'active' : ''}" data-mode="mobile" aria-label="Phone viewport">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="5" y="2" width="14" height="20" rx="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
              <span>Phone</span>
            </button>
          </div>

          <!-- Canvas Background Surface Toggle (Feature DN-F05) -->
          <div class="toolbar-btn-group" title="Canvas Background Surface" role="group" aria-label="Canvas surface">
            <button class="toolbar-tool-btn ${canvasBg === 'default' ? 'active' : ''}" data-bg="default" title="Dark Canvas">
              <span>🌙 Dark</span>
            </button>
            <button class="toolbar-tool-btn ${canvasBg === 'light' ? 'active' : ''}" data-bg="light" title="Clean Light Surface">
              <span>☀️ Light</span>
            </button>
            <button class="toolbar-tool-btn ${canvasBg === 'black' ? 'active' : ''}" data-bg="black" title="AMOLED Black">
              <span>⬛ AMOLED</span>
            </button>
            <button class="toolbar-tool-btn ${canvasBg === 'grid' ? 'active' : ''}" data-bg="grid" title="Blueprint Grid">
              <span>📐 Grid</span>
            </button>
          </div>

          <!-- Replay Animation Button -->
          <button id="toolbar-replay-btn" class="btn btn-secondary" style="padding: 5px 12px; font-size: 12px;" title="Replay Animation (R)" aria-label="Replay Animation">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
            <span>Replay</span>
          </button>

          <!-- View Code Button (Smooth Scroll to Flutter Code on Down Side) -->
          <button id="toolbar-view-code-btn" class="btn btn-primary" style="padding: 5px 14px; font-size: 12px;" title="Scroll down to Flutter Code" aria-label="View Code">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <span>View Code</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left: 2px;">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <!-- Reset Properties -->
          <button id="toolbar-reset-btn" class="btn btn-ghost" style="padding: 5px 10px; font-size: 12px;" title="Reset Animation Properties" aria-label="Reset Properties">
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div class="preview-canvas-wrapper canvas-bg-${canvasBg}">
        <div class="preview-viewport-frame mode-${previewMode}">
          <div class="window-frame" style="width:100%; height:100%; display:flex; flex-direction:column;">
            <div class="window-titlebar">
              <div class="window-dots">
                <span class="window-dot close"></span>
                <span class="window-dot min"></span>
                <span class="window-dot max"></span>
              </div>
              <span class="window-title">${escapeHtml(comp.id)}.dart — Live Preview</span>
              <span style="font-size:10px; color:var(--accent-primary); font-family:var(--font-mono);">60–120 FPS</span>
            </div>
            <div id="preview-canvas-container" style="flex:1; width:100%; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden;"></div>
          </div>
        </div>
      </div>

      <div id="controls-dock-mount"></div>

      <div class="workspace-scroll-hint" id="workspace-scroll-hint" role="button" tabindex="0" title="Scroll down to view Flutter source code & API">
        <span>Scroll down to see Flutter Code</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </div>
    `;

    // Bind mode switcher
    workspaceEl.querySelectorAll('[data-playground-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        store.setState({ playgroundMode: btn.getAttribute('data-playground-mode') });
      });
    });

    // Bind toolbar viewport actions
    workspaceEl.querySelectorAll('[data-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        store.setState({ previewMode: btn.getAttribute('data-mode') });
      });
    });

    // Bind canvas background surface toggles
    workspaceEl.querySelectorAll('[data-bg]').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const bg = btn.getAttribute('data-bg');
        store.setState({ canvasBg: bg });
      });
    });

    // Bind Replay Animation
    const replayBtn = workspaceEl.querySelector('#toolbar-replay-btn');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        sound.playPop();
        if (activeComponentInstance?.restart) {
          activeComponentInstance.restart();
        }
      });
    }

    const scrollToCode = () => {
      const codePanel = document.querySelector('.playground-code-panel');
      if (codePanel) {
        codePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // Bind View Code button -> Smoothly scrolls down to the code panel
    const viewCodeBtn = workspaceEl.querySelector('#toolbar-view-code-btn');
    if (viewCodeBtn) {
      viewCodeBtn.addEventListener('click', () => {
        sound.playClick();
        store.setState({ codeViewerOpen: true, mobileTab: 'code' });
        scrollToCode();
      });
    }

    // Bind Scroll Hint
    const scrollHint = workspaceEl.querySelector('#workspace-scroll-hint');
    if (scrollHint) {
      scrollHint.addEventListener('click', () => {
        sound.playClick();
        store.setState({ codeViewerOpen: true, mobileTab: 'code' });
        scrollToCode();
      });
      scrollHint.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          sound.playClick();
          scrollToCode();
        }
      });
    }

    // Reset button
    const resetBtn = workspaceEl.querySelector('#toolbar-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        sound.playClick();
        store.setState({ componentProps: { ...comp.defaultProps } });
      });
    }

    // Favorite toggle button
    const favBtn = workspaceEl.querySelector('#workspace-fav-btn');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        sound.playPop();
        toggleFavorite(comp.id);
      });
    }

    // Mount Component into #preview-canvas-container
    const canvasContainer = workspaceEl.querySelector('#preview-canvas-container');
    if (canvasContainer && comp.render) {
      if (activeComponentInstance?.destroy) {
        activeComponentInstance.destroy();
      }
      activeComponentInstance = comp.render(canvasContainer, props);
    }
  };

  render();

  store.subscribe((state, prev) => {
    if (
      state.selectedComponentId !== prev?.selectedComponentId || 
      state.favorites !== prev?.favorites ||
      state.playgroundMode !== prev?.playgroundMode ||
      (state.playgroundMode === 'gallery' && (
        state.selectedCategory !== prev?.selectedCategory ||
        state.searchQuery !== prev?.searchQuery ||
        state.filterStatus !== prev?.filterStatus ||
        state.favoritesOnly !== prev?.favoritesOnly
      ))
    ) {
      render();
    } else if (state.previewMode !== prev?.previewMode) {
      const frame = workspaceEl.querySelector('.preview-viewport-frame');
      if (frame) {
        frame.className = `preview-viewport-frame mode-${state.previewMode}`;
        workspaceEl.querySelectorAll('[data-mode]').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-mode') === state.previewMode);
        });
      }
    } else if (state.canvasBg !== prev?.canvasBg) {
      const canvasWrapper = workspaceEl.querySelector('.preview-canvas-wrapper');
      if (canvasWrapper) {
        canvasWrapper.className = `preview-canvas-wrapper canvas-bg-${state.canvasBg}`;
        workspaceEl.querySelectorAll('[data-bg]').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-bg') === state.canvasBg);
        });
      }
    } else if (JSON.stringify(state.componentProps) !== JSON.stringify(prev?.componentProps)) {
      const comp = getComponentById(state.selectedComponentId);
      const canvasContainer = workspaceEl.querySelector('#preview-canvas-container');
      if (canvasContainer && comp.render) {
        if (activeComponentInstance?.destroy) {
          activeComponentInstance.destroy();
        }
        const props = { ...comp.defaultProps, ...state.componentProps };
        activeComponentInstance = comp.render(canvasContainer, props);
      }
    }
  });

  return {
    restartCurrent: () => {
      if (activeComponentInstance?.restart) {
        activeComponentInstance.restart();
      }
    }
  };
}
