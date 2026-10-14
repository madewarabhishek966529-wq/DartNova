/**
 * Playground Property Controls Dock
 * Dynamically renders interactive controls for the selected component
 */

import { getComponentById } from '../registry/components.js';

export function setupControls(mountEl, store) {
  if (!mountEl) return;

  const render = () => {
    const { selectedComponentId, componentProps } = store.getState();
    const comp = getComponentById(selectedComponentId);
    const controls = comp.controls || [];
    const props = { ...comp.defaultProps, ...componentProps };

    if (controls.length === 0) {
      mountEl.innerHTML = '';
      return;
    }

    mountEl.innerHTML = `
      <div class="controls-dock">
        <div class="controls-dock-header">
          <div class="controls-dock-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
            <span>Component Properties</span>
          </div>
          <span style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">
            ${controls.length} configurable ${controls.length === 1 ? 'prop' : 'props'}
          </span>
        </div>

        <div class="controls-grid">
          ${controls.map(ctrl => {
            const val = props[ctrl.prop] ?? '';
            const unit = ctrl.unit || '';

            if (ctrl.type === 'slider') {
              return `
                <div class="control-item">
                  <div class="control-label-row">
                    <label for="ctrl-${ctrl.prop}">${ctrl.label}</label>
                    <span class="control-value-display" id="val-${ctrl.prop}">${val}${unit}</span>
                  </div>
                  <input 
                    type="range" 
                    id="ctrl-${ctrl.prop}"
                    class="control-slider"
                    min="${ctrl.min}" 
                    max="${ctrl.max}" 
                    step="${ctrl.step || 1}" 
                    value="${val}" 
                    data-prop="${ctrl.prop}"
                    data-unit="${unit}"
                  />
                </div>
              `;
            }

            if (ctrl.type === 'text') {
              return `
                <div class="control-item">
                  <div class="control-label-row">
                    <label for="ctrl-${ctrl.prop}">${ctrl.label}</label>
                  </div>
                  <input 
                    type="text" 
                    id="ctrl-${ctrl.prop}"
                    class="control-text-input" 
                    value="${val}" 
                    data-prop="${ctrl.prop}" 
                  />
                </div>
              `;
            }

            if (ctrl.type === 'color') {
              return `
                <div class="control-item">
                  <div class="control-label-row">
                    <label for="ctrl-${ctrl.prop}">${ctrl.label}</label>
                    <span class="control-value-display">${val}</span>
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <input 
                      type="color" 
                      id="ctrl-${ctrl.prop}"
                      class="control-color-input" 
                      value="${val}" 
                      data-prop="${ctrl.prop}" 
                    />
                    <span style="font-family:var(--font-mono); font-size:11px; color:var(--text-secondary);">${val}</span>
                  </div>
                </div>
              `;
            }

            if (ctrl.type === 'toggle') {
              return `
                <div class="control-item">
                  <div class="control-label-row">
                    <label for="ctrl-${ctrl.prop}">${ctrl.label}</label>
                    <span class="control-value-display">${val ? 'ON' : 'OFF'}</span>
                  </div>
                  <button 
                    id="ctrl-${ctrl.prop}"
                    class="btn btn-secondary" 
                    style="padding: 4px 10px; font-size: 11px;"
                    data-prop="${ctrl.prop}"
                    data-toggle="true"
                  >
                    ${val ? 'Collapse' : 'Expand / Trigger'}
                  </button>
                </div>
              `;
            }

            return '';
          }).join('')}
        </div>
      </div>
    `;

    // Bind event handlers
    controls.forEach(ctrl => {
      const input = mountEl.querySelector(`#ctrl-${ctrl.prop}`);
      if (!input) return;

      if (ctrl.type === 'slider') {
        input.addEventListener('input', (e) => {
          const num = parseFloat(e.target.value);
          const valEl = mountEl.querySelector(`#val-${ctrl.prop}`);
          if (valEl) valEl.textContent = `${num}${ctrl.unit || ''}`;
          store.updateComponentProp(ctrl.prop, num);
        });
      } else if (ctrl.type === 'text') {
        input.addEventListener('input', (e) => {
          store.updateComponentProp(ctrl.prop, e.target.value);
        });
      } else if (ctrl.type === 'color') {
        input.addEventListener('input', (e) => {
          store.updateComponentProp(ctrl.prop, e.target.value);
        });
      } else if (ctrl.type === 'toggle') {
        input.addEventListener('click', () => {
          const current = props[ctrl.prop];
          store.updateComponentProp(ctrl.prop, !current);
        });
      }
    });
  };

  render();

  store.subscribe((state, prev) => {
    if (
      state.selectedComponentId !== prev?.selectedComponentId ||
      JSON.stringify(state.componentProps) !== JSON.stringify(prev?.componentProps)
    ) {
      render();
    }
  });
}
