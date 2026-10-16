import { getComponentById } from '../registry/components.js';
import { sound } from '../utils/audio.js';
import { isFavorite, toggleFavorite } from '../utils/favorites.js';
import { escapeHtml } from '../utils/security.js';

export function setupPreview(workspaceEl, store) {
  if (!workspaceEl) return;

  let activeComponentInstance = null;

  const render = () => {
    const { 
      selectedComponentId, 
      previewMode, 
      canvasBg, 
      componentProps,
      favorites = []
    } = store.getState();

    const comp = getComponentById(selectedComponentId);
    const props = { ...comp.defaultProps, ...componentProps };
    const isFav = favorites.includes(comp.id) || isFavorite(comp.id);

    workspaceEl.innerHTML = `
      <div class="workspace-header">
        <div class="workspace-header-info">
          <div class="workspace-header-title-row">
            <h2 class="workspace-title">${escapeHtml(comp.name)}</h2>
            <span class="badge" style="font-size:10px; font-family:var(--font-mono); text-transform:uppercase; letter-spacing:0.05em;">${escapeHtml(comp.category)}</span>

            <button id="workspace-fav-btn" class="workspace-fav-btn ${isFav ? 'is-fav' : ''}" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}" aria-label="Toggle favorite">
              <span>${isFav ? '♥ Favorited' : '♡ Add Favorite'}</span>
            </button>
          </div>
          <p class="workspace-description">${escapeHtml(comp.description)}</p>
        </div>

        <div class="workspace-toolbar">
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

          <!-- Replay Animation Button -->
          <button id="toolbar-replay-btn" class="btn btn-secondary" style="padding: 5px 12px; font-size: 12px;" title="Replay Animation (R)" aria-label="Replay Animation">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
            <span>Replay Animation</span>
          </button>

          <!-- View Code Button (VS Code IDE Workspace) -->
          <button id="toolbar-view-code-btn" class="btn btn-primary" style="padding: 5px 14px; font-size: 12px;" title="View Flutter Code in IDE Workspace" aria-label="View Code">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <span>View Code</span>
          </button>

          <!-- Reset Properties -->
          <button id="toolbar-reset-btn" class="btn btn-ghost" style="padding: 5px 10px; font-size: 12px;" title="Reset Animation Properties" aria-label="Reset Properties">
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div class="preview-canvas-wrapper canvas-bg-default">
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
    `;

    // Bind toolbar viewport actions
    workspaceEl.querySelectorAll('[data-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        store.setState({ previewMode: btn.getAttribute('data-mode') });
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

    // Bind View Code button -> Opens dedicated IDE code viewer workspace
    const viewCodeBtn = workspaceEl.querySelector('#toolbar-view-code-btn');
    if (viewCodeBtn) {
      viewCodeBtn.addEventListener('click', () => {
        sound.playClick();
        store.setState({ 
          codeViewerOpen: true,
          mobileTab: 'code'
        });
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
    if (state.selectedComponentId !== prev?.selectedComponentId || state.favorites !== prev?.favorites) {
      render();
    } else if (state.previewMode !== prev?.previewMode) {
      const frame = workspaceEl.querySelector('.preview-viewport-frame');
      if (frame) {
        frame.className = `preview-viewport-frame mode-${state.previewMode}`;
        workspaceEl.querySelectorAll('[data-mode]').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-mode') === state.previewMode);
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
