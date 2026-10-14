/**
 * Playground Code Panel
 * VS Code / IDE styled code viewer with line numbers, file tabs, parameters, and copy actions
 */

import { getComponentById } from '../registry/components.js';
import { highlightDart } from '../utils/highlighter.js';
import { copyToClipboard } from '../utils/clipboard.js';
import { sound } from '../utils/audio.js';

export function setupCodePanel(codePanelEl, store) {
  if (!codePanelEl) return;

  const render = () => {
    const { selectedComponentId, codeTab } = store.getState();
    const comp = getComponentById(selectedComponentId);

    let activeCode = '';
    if (codeTab === 'usage') {
      activeCode = comp.flutterSnippet || '';
    } else if (codeTab === 'full') {
      activeCode = comp.flutterFullCode || '';
    }

    const lines = activeCode.split('\n');
    const lineNumbersHtml = lines.map((_, i) => `<span>${i + 1}</span>`).join('');

    codePanelEl.innerHTML = `
      <div class="code-panel-header">
        <div class="code-tabs">
          <button class="code-tab-btn ${codeTab === 'usage' ? 'active' : ''}" data-tab="usage">
            Usage
          </button>
          <button class="code-tab-btn ${codeTab === 'full' ? 'active' : ''}" data-tab="full">
            Full Widget
          </button>
          <button class="code-tab-btn ${codeTab === 'params' ? 'active' : ''}" data-tab="params">
            Parameters
          </button>
        </div>

        <div class="code-actions">
          <span style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono); margin-right: 4px;">
            ${codeTab === 'params' ? 'Schema' : `${lines.length} lines`}
          </span>
          <button id="code-copy-btn" class="btn-copy" title="Copy Flutter code">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span class="btn-copy-label">Copy</span>
          </button>
        </div>
      </div>

      <div class="code-body-scroll">
        ${codeTab === 'params' ? `
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div>
              <h4 style="font-size:14px; color:var(--text-primary); margin-bottom:4px;">${comp.name} Parameters</h4>
              <p style="font-size:12px; color:var(--text-muted);">${comp.description}</p>
            </div>

            <table style="width:100%; border-collapse:collapse; font-size:12px; text-align:left;">
              <thead>
                <tr style="border-bottom:1px solid var(--border-default); color:var(--text-secondary); font-family:var(--font-mono);">
                  <th style="padding:6px 4px;">Property</th>
                  <th style="padding:6px 4px;">Type</th>
                  <th style="padding:6px 4px;">Default</th>
                  <th style="padding:6px 4px;">Description</th>
                </tr>
              </thead>
              <tbody>
                ${(comp.params || []).map(p => `
                  <tr style="border-bottom:1px solid var(--border-subtle);">
                    <td style="padding:8px 4px; font-family:var(--font-mono); color:var(--accent-primary);">${p.name}</td>
                    <td style="padding:8px 4px; font-family:var(--font-mono); color:var(--accent-cyan);">${p.type}</td>
                    <td style="padding:8px 4px; font-family:var(--font-mono); color:var(--text-muted);">${p.defaultVal}</td>
                    <td style="padding:8px 4px; color:var(--text-secondary);">${p.description}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div style="margin-top:8px;">
              <h5 style="font-size:11px; font-family:var(--font-mono); text-transform:uppercase; color:var(--accent-primary); margin-bottom:4px;">Integration Notes</h5>
              <p style="font-size:12px; color:var(--text-secondary); line-height:1.5;">${comp.notes || 'Drop the widget into your Flutter app with standard AnimationController lifecycle management.'}</p>
            </div>
          </div>
        ` : `
          <div class="code-editor-layout">
            <div class="code-line-numbers">${lineNumbersHtml}</div>
            <pre class="code-pre"><code>${highlightDart(activeCode)}</code></pre>
          </div>
        `}
      </div>

      <div class="code-docs-section">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 4px;">
          <h5>Package Support & Architecture</h5>
          <span style="font-size:11px; color:var(--accent-primary); font-family:var(--font-mono);">${comp.status === 'complete' ? '● Live Tested' : '○ Roadmap Spec'}</span>
        </div>
        <p style="font-size:11px; margin:0 0 6px; color:var(--text-secondary);">${comp.dependencies && comp.dependencies.length > 0 ? `Dependencies: ${comp.dependencies.join(', ')}` : 'Zero external pub packages required. 100% pure Flutter SDK primitives.'}</p>
        <div style="display:flex; gap:6px; align-items:center;">
          <span class="badge" style="font-size:10px; font-family:var(--font-mono); text-transform:uppercase;">${comp.difficulty || 'intermediate'}</span>
          <span class="badge" style="font-size:10px; font-family:var(--font-mono); text-transform:uppercase;">${comp.category}</span>
        </div>
      </div>
    `;

    // Bind tab clicks
    codePanelEl.querySelectorAll('.code-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        store.setState({ codeTab: btn.getAttribute('data-tab') });
      });
    });

    // Bind copy action
    const copyBtn = codePanelEl.querySelector('#code-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        sound.playPop();
        const textToCopy = codeTab === 'params' 
          ? comp.flutterSnippet 
          : activeCode;

        const success = await copyToClipboard(textToCopy);
        if (success) {
          copyBtn.classList.add('copied');
          const label = copyBtn.querySelector('.btn-copy-label');
          if (label) label.textContent = 'Copied!';

          setTimeout(() => {
            copyBtn.classList.remove('copied');
            if (label) label.textContent = 'Copy';
          }, 2000);
        }
      });
    }
  };

  render();

  store.subscribe((state, prev) => {
    if (
      state.selectedComponentId !== prev?.selectedComponentId ||
      state.codeTab !== prev?.codeTab
    ) {
      render();
    }
  });
}
