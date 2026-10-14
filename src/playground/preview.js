/**
 * Playground Center Workspace Preview
 * Handles canvas frame, viewport modes, background styles, and component lifecycle
 */

import { getComponentById } from '../registry/components.js';

export function setupPreview(workspaceEl, store) {
  if (!workspaceEl) return;

  let activeComponentInstance = null;

  const render = () => {
    const { 
      selectedComponentId, 
      previewMode, 
      canvasBg, 
      componentProps 
    } = store.getState();

    const comp = getComponentById(selectedComponentId);
    const props = { ...comp.defaultProps, ...componentProps };

    workspaceEl.innerHTML = `
      <div class="workspace-header">
        <div class="workspace-header-info">
          <div class="workspace-header-title-row">
            <h2 class="workspace-title">${comp.name}</h2>
            <span class="badge badge-lime">${comp.badge}</span>
          </div>
          <p class="workspace-description">${comp.description}</p>
        </div>

        <div class="workspace-toolbar">
          <!-- Viewport Mode -->
          <div class="toolbar-btn-group" title="Preview Viewport">
            <button class="toolbar-tool-btn ${previewMode === 'desktop' ? 'active' : ''}" data-mode="desktop">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <span>100%</span>
            </button>
            <button class="toolbar-tool-btn ${previewMode === 'tablet' ? 'active' : ''}" data-mode="tablet">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="4" y="2" width="16" height="20" rx="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
              <span>Tablet</span>
            </button>
            <button class="toolbar-tool-btn ${previewMode === 'mobile' ? 'active' : ''}" data-mode="mobile">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="5" y="2" width="14" height="20" rx="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
              <span>Mobile</span>
            </button>
          </div>

          <!-- Canvas Background -->
          <div class="toolbar-btn-group" title="Canvas Background">
            <button class="toolbar-tool-btn ${canvasBg === 'default' ? 'active' : ''}" data-bg="default">Dark</button>
            <button class="toolbar-tool-btn ${canvasBg === 'grid' ? 'active' : ''}" data-bg="grid">Grid</button>
            <button class="toolbar-tool-btn ${canvasBg === 'black' ? 'active' : ''}" data-bg="black">Black</button>
          </div>

          <!-- Restart & Reset -->
          <button id="toolbar-restart-btn" class="btn btn-secondary" style="padding: 4px 10px; font-size: 12px;" title="Restart Animation (R)">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
            <span>Restart</span>
          </button>

          <button id="toolbar-reset-btn" class="btn btn-ghost" style="padding: 4px 8px; font-size: 12px;" title="Reset Properties">
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div class="preview-canvas-wrapper canvas-bg-${canvasBg}">
        <div class="preview-viewport-frame mode-${previewMode}">
          <div id="preview-canvas-container"></div>
        </div>
      </div>

      <div id="controls-dock-mount"></div>
    `;

    // Bind toolbar actions
    workspaceEl.querySelectorAll('[data-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        store.setState({ previewMode: btn.getAttribute('data-mode') });
      });
    });

    workspaceEl.querySelectorAll('[data-bg]').forEach(btn => {
      btn.addEventListener('click', () => {
        store.setState({ canvasBg: btn.getAttribute('data-bg') });
      });
    });

    const restartBtn = workspaceEl.querySelector('#toolbar-restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        if (activeComponentInstance?.restart) {
          activeComponentInstance.restart();
        }
      });
    }

    const resetBtn = workspaceEl.querySelector('#toolbar-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        store.setState({ componentProps: { ...comp.defaultProps } });
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
    if (state.selectedComponentId !== prev?.selectedComponentId) {
      render();
    } else if (
      state.previewMode !== prev?.previewMode ||
      state.canvasBg !== prev?.canvasBg
    ) {
      // Light update without destroying active instance
      const wrapper = workspaceEl.querySelector('.preview-canvas-wrapper');
      const frame = workspaceEl.querySelector('.preview-viewport-frame');
      if (wrapper && frame) {
        wrapper.className = `preview-canvas-wrapper canvas-bg-${state.canvasBg}`;
        frame.className = `preview-viewport-frame mode-${state.previewMode}`;
        workspaceEl.querySelectorAll('[data-mode]').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-mode') === state.previewMode);
        });
        workspaceEl.querySelectorAll('[data-bg]').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-bg') === state.canvasBg);
        });
      }
    } else if (JSON.stringify(state.componentProps) !== JSON.stringify(prev?.componentProps)) {
      // Re-render live component with updated properties
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
