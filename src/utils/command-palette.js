/**
 * Modern Command Palette (Ctrl+K / ⌘K / /)
 * Fast, keyboard-first modal for discovering and jumping to any motion component
 */

import { COMPONENTS } from '../registry/components.js';
import { escapeHtml } from './security.js';

export function setupCommandPalette(store) {
  // Create modal container if not exists
  let modal = document.querySelector('#command-palette-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'command-palette-modal';
    modal.className = 'cmd-palette-backdrop';
    modal.innerHTML = `
      <div class="cmd-palette-box">
        <div class="cmd-palette-input-row">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            id="cmd-palette-input" 
            placeholder="Type a component name or category..." 
            aria-label="Search components in command palette"
            autocomplete="off" 
            spellcheck="false" 
          />
          <kbd>ESC</kbd>
        </div>
        <div class="cmd-palette-results" id="cmd-palette-results"></div>
        <div class="cmd-palette-footer">
          <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
          <span><kbd>↵</kbd> to select</span>
          <span><kbd>ESC</kbd> to close</span>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const input = modal.querySelector('#cmd-palette-input');
  const resultsContainer = modal.querySelector('#cmd-palette-results');
  let selectedIdx = 0;
  let currentFiltered = [];

  const openPalette = () => {
    modal.classList.add('open');
    input.value = '';
    selectedIdx = 0;
    renderResults('');
    setTimeout(() => input.focus(), 50);
  };

  const closePalette = () => {
    modal.classList.remove('open');
  };

  const renderResults = (query) => {
    const q = query.toLowerCase().trim();
    currentFiltered = COMPONENTS.filter(c => 
      !q || 
      c.name.toLowerCase().includes(q) || 
      c.category.toLowerCase().includes(q) ||
      c.badge.toLowerCase().includes(q) ||
      (c.description && c.description.toLowerCase().includes(q)) ||
      (c.tags && c.tags.some(t => t.toLowerCase().includes(q)))
    );

    if (currentFiltered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding:2rem 1rem; text-align:center; color:var(--text-muted); font-size:13px;">
          No components found matching "${escapeHtml(query)}"
        </div>
      `;
      return;
    }

    if (selectedIdx >= currentFiltered.length) {
      selectedIdx = 0;
    }

    resultsContainer.innerHTML = currentFiltered.map((c, i) => `
      <div class="cmd-item ${i === selectedIdx ? 'active' : ''}" data-id="${escapeHtml(c.id)}" data-index="${i}">
        <div class="cmd-item-left">
          <span class="cmd-item-badge">${escapeHtml(c.badge)}</span>
          <span class="cmd-item-title">${escapeHtml(c.name)}</span>
        </div>
        <div class="cmd-item-right">
          <span class="cmd-item-cat">${escapeHtml(c.category)}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    `).join('');

    // Click handler for items
    resultsContainer.querySelectorAll('.cmd-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        selectComponent(id);
      });
      item.addEventListener('mouseenter', () => {
        selectedIdx = parseInt(item.getAttribute('data-index'), 10);
        updateActiveItem();
      });
    });
  };

  const updateActiveItem = () => {
    const items = resultsContainer.querySelectorAll('.cmd-item');
    items.forEach((it, idx) => {
      it.classList.toggle('active', idx === selectedIdx);
      if (idx === selectedIdx) {
        it.scrollIntoView({ block: 'nearest' });
      }
    });
  };

  const selectComponent = (id) => {
    const comp = COMPONENTS.find(c => c.id === id);
    if (comp) {
      store.setState({
        currentView: 'playground',
        selectedComponentId: id,
        componentProps: { ...comp.defaultProps }
      });
      window.location.hash = `playground/${id}`;
    }
    closePalette();
  };

  // Keyboard navigation inside palette
  input.addEventListener('input', (e) => {
    selectedIdx = 0;
    renderResults(e.target.value);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentFiltered.length > 0) {
        selectedIdx = (selectedIdx + 1) % currentFiltered.length;
        updateActiveItem();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentFiltered.length > 0) {
        selectedIdx = (selectedIdx - 1 + currentFiltered.length) % currentFiltered.length;
        updateActiveItem();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentFiltered[selectedIdx]) {
        selectComponent(currentFiltered[selectedIdx].id);
      }
    } else if (e.key === 'Escape') {
      closePalette();
    }
  });

  // Close when clicking backdrop outside box
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closePalette();
    }
  });

  // Global triggers
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (modal.classList.contains('open')) {
        closePalette();
      } else {
        openPalette();
      }
    }
  });

  // Header button trigger
  const searchBtn = document.querySelector('#header-search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', openPalette);
  }

  return { open: openPalette, close: closePalette };
}
