/**
 * Playground Code Panel — Professional VS Code / IDE Workspace
 * Cleanly structured into distinct, dedicated sections:
 * - Top Control Bar: Navigation, breadcrumb path, language indicator, layout toggle, and Copy Code.
 * - Sub-Bar: Active file tab (untruncated), centered segmented mode switcher (Usage / Full / Params), and metadata.
 * - Editor Body: Monospace code with line numbers or parameters table.
 * - Status Bar: VS Code diagnostics, line count, and language info.
 */

import { getComponentById } from '../registry/components.js';
import { highlightDart } from '../utils/highlighter.js';
import { copyToClipboard } from '../utils/clipboard.js';
import { sound } from '../utils/audio.js';
import { escapeHtml } from '../utils/security.js';

export function setupCodePanel(codePanelEl, store) {
  if (!codePanelEl) return;

  const render = () => {
    const { 
      selectedComponentId, 
      codeTab = 'usage', 
      codeViewerLayout = 'full'
    } = store.getState();

    const comp = getComponentById(selectedComponentId);

    let activeCode = '';
    if (codeTab === 'usage') {
      activeCode = comp.flutterSnippet || '';
    } else if (codeTab === 'full') {
      activeCode = comp.flutterFullCode || '';
    }

    const lines = activeCode ? activeCode.split('\n') : [];
    const lineNumbersHtml = lines.map((_, i) => `<span class="ide-line-num">${i + 1}</span>`).join('');

    codePanelEl.innerHTML = `
      <!-- 1. VS CODE TAB BAR & PRIMARY ACTIONS (TOP ROW) -->
      <div class="ide-tab-bar">
        <div class="ide-tabs-left">
          <div class="ide-file-tab-item active" title="lib/widgets/${escapeHtml(comp.category)}/${escapeHtml(comp.id)}.dart">
            <span class="ide-tab-icon">⚡</span>
            <span class="ide-tab-filename">${escapeHtml(comp.id)}.dart</span>
            <span class="ide-tab-badge">Flutter</span>
          </div>

          <div class="ide-mode-segmented-control" role="tablist" aria-label="Code mode selector">
            <button class="ide-segment-btn ${codeTab === 'usage' ? 'active' : ''}" data-tab="usage" role="tab" aria-selected="${codeTab === 'usage'}">
              <span>Widget Usage</span>
            </button>
            <button class="ide-segment-btn ${codeTab === 'full' ? 'active' : ''}" data-tab="full" role="tab" aria-selected="${codeTab === 'full'}">
              <span>Complete Implementation</span>
            </button>
            <button class="ide-segment-btn ${codeTab === 'params' ? 'active' : ''}" data-tab="params" role="tab" aria-selected="${codeTab === 'params'}">
              <span>Parameters & API</span>
            </button>
          </div>
        </div>

        <div class="ide-tabs-right">
          <button id="code-copy-btn" class="btn btn-primary ide-copy-btn" title="Copy Flutter Code to Clipboard">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span class="btn-copy-label">Copy Code</span>
          </button>

          <button id="code-close-btn" class="ide-back-btn" title="Scroll back up to Live Preview" aria-label="Back to Preview">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
            <span>Back to Preview</span>
          </button>
        </div>
      </div>

      <!-- 2. VS CODE DEDICATED BREADCRUMBS & METADATA BAR (SECOND ROW) -->
      <div class="ide-breadcrumbs-bar">
        <div class="ide-path-breadcrumbs" title="dartnova > lib > widgets > ${escapeHtml(comp.category)} > ${escapeHtml(comp.id)}.dart">
          <span class="path-root">dartnova</span>
          <span class="path-sep">›</span>
          <span class="path-folder">lib</span>
          <span class="path-sep">›</span>
          <span class="path-folder">widgets</span>
          <span class="path-sep">›</span>
          <span class="path-folder">${escapeHtml(comp.category)}</span>
          <span class="path-sep">›</span>
          <span class="path-file">${escapeHtml(comp.id)}.dart</span>
        </div>

        <div class="ide-sub-meta">
          <div class="ide-lang-pill" title="Target framework and language">
            <span class="lang-dot"></span>
            <span>Flutter / Dart</span>
          </div>
          <div class="ide-file-meta-pill">
            <span>${codeTab === 'params' ? 'API Documentation' : `${lines.length} lines`}</span>
            <span class="meta-dot">·</span>
            <span>Zero Pub Deps</span>
          </div>
        </div>
      </div>

      <!-- 3. EDITOR WORKSPACE BODY -->
      <div class="ide-editor-body">
        ${codeTab === 'params' ? `
          <div class="ide-params-container">
            <div class="ide-params-header">
              <h3 class="ide-params-title">${escapeHtml(comp.name)} — Flutter API Reference</h3>
              <p class="ide-params-desc">${escapeHtml(comp.description)}</p>
            </div>

            <div class="ide-table-wrapper">
              <table class="ide-params-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  ${(comp.params && comp.params.length > 0) ? comp.params.map(p => `
                    <tr>
                      <td class="col-param-name"><code>${escapeHtml(p.name)}</code></td>
                      <td class="col-param-type"><code>${escapeHtml(p.type)}</code></td>
                      <td class="col-param-default"><code>${escapeHtml(p.defaultVal)}</code></td>
                      <td class="col-param-desc">${escapeHtml(p.description)}</td>
                    </tr>
                  `).join('') : `
                    <tr>
                      <td colspan="4" style="text-align:center; padding:1.5rem; color:var(--text-muted);">
                        No configurable parameters required. Drop the widget directly into your widget tree.
                      </td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>

            <div class="ide-notes-card">
              <div class="ide-notes-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span>Flutter Integration Guide</span>
              </div>
              <p class="ide-notes-text">${escapeHtml(comp.notes || 'Ensure the widget is mounted within a MaterialApp/Scaffold. AnimationController resources are automatically cleaned up in dispose().')}</p>
            </div>
          </div>
        ` : `
          <div class="ide-code-scrollable">
            <div class="ide-line-numbers-gutter">${lineNumbersHtml}</div>
            <pre class="ide-code-pre"><code>${highlightDart(activeCode)}</code></pre>
          </div>
        `}
      </div>

      <!-- 4. VS CODE STATUS BAR -->
      <div class="ide-status-bar">
        <div class="ide-status-left">
          <span class="ide-status-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="6" y1="3" x2="6" y2="15"></line>
              <circle cx="18" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <path d="M18 9a9 9 0 0 1-9 9"></path>
            </svg>
            <span>main</span>
          </span>
          <span class="ide-status-item">0 errors · 0 warnings</span>
          <span class="ide-status-item">Flutter SDK 3.x</span>
        </div>

        <div class="ide-status-right">
          <span class="ide-status-item">${codeTab === 'params' ? 'API Documentation' : `Ln ${lines.length}, Col 1`}</span>
          <span class="ide-status-item">Spaces: 2</span>
          <span class="ide-status-item">UTF-8</span>
          <span class="ide-status-item ide-status-lang">Dart</span>
        </div>
      </div>
    `;

    // Bind mode segmented buttons
    codePanelEl.querySelectorAll('.ide-segment-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        store.setState({ codeTab: btn.getAttribute('data-tab') });
      });
    });

    // Bind Close / Back to Preview action -> Smoothly scroll up to preview
    const closeBtn = codePanelEl.querySelector('#code-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        sound.playClick();
        store.setState({ mobileTab: 'preview' });
        const workspace = document.querySelector('.playground-workspace');
        if (workspace) {
          workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    // Bind Copy Code action
    const copyBtn = codePanelEl.querySelector('#code-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        sound.playPop();
        const textToCopy = codeTab === 'params' 
          ? (comp.flutterSnippet || comp.flutterFullCode || '') 
          : activeCode;

        const success = await copyToClipboard(textToCopy);
        if (success) {
          copyBtn.classList.add('copied');
          const label = copyBtn.querySelector('.btn-copy-label');
          if (label) label.textContent = 'Copied!';

          setTimeout(() => {
            copyBtn.classList.remove('copied');
            if (label) label.textContent = 'Copy Code';
          }, 2000);
        }
      });
    }
  };

  render();

  store.subscribe((state, prev) => {
    if (
      state.selectedComponentId !== prev?.selectedComponentId ||
      state.codeTab !== prev?.codeTab ||
      state.codeViewerLayout !== prev?.codeViewerLayout ||
      state.codeViewerOpen !== prev?.codeViewerOpen
    ) {
      render();
    }
  });
}
