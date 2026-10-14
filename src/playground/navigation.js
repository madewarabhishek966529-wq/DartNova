/**
 * Playground Sidebar Navigation
 * Handles search filtering, category groups, and component selection
 */

import { CATEGORIES, COMPONENTS } from '../registry/components.js';

export function setupNavigation(sidebarEl, store) {
  if (!sidebarEl) return;

  const render = () => {
    const { searchQuery, selectedCategory, selectedComponentId } = store.getState();
    const query = searchQuery.toLowerCase().trim();

    // Filter components
    const filtered = COMPONENTS.filter(comp => {
      const matchesCategory = selectedCategory === 'all' || comp.category === selectedCategory;
      const matchesQuery = !query || 
        comp.name.toLowerCase().includes(query) || 
        comp.description.toLowerCase().includes(query) ||
        comp.badge.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });

    sidebarEl.innerHTML = `
      <div class="sidebar-search-box">
        <div class="search-input-wrapper">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            id="component-search" 
            class="search-input" 
            placeholder="Search 20 components... (/)" 
            value="${searchQuery}"
            autocomplete="off"
            spellcheck="false"
          />
          <button id="search-clear-btn" class="search-clear-btn" aria-label="Clear search">✕</button>
        </div>
      </div>

      <div class="sidebar-nav-scroll">
        ${CATEGORIES.map(cat => {
          const catComps = filtered.filter(c => cat.id === 'all' ? true : c.category === cat.id);
          if (catComps.length === 0 && query) return '';
          if (cat.id === 'all') return ''; // We group by actual categories

          return `
            <div class="sidebar-category-group">
              <div class="category-group-header">
                <span>${cat.name}</span>
                <span>${catComps.length}</span>
              </div>
              <ul class="component-nav-list">
                ${catComps.map(comp => `
                  <li>
                    <button 
                      class="component-nav-item ${comp.id === selectedComponentId ? 'active' : ''}" 
                      data-id="${comp.id}"
                    >
                      <span>${comp.name}</span>
                      <span class="component-nav-badge">${comp.badge}</span>
                    </button>
                  </li>
                `).join('')}
              </ul>
            </div>
          `;
        }).join('')}

        ${filtered.length === 0 ? `
          <div style="padding: 2rem 1rem; text-align: center; color: var(--text-muted); font-size: 13px;">
            No components match "${searchQuery}"
          </div>
        ` : ''}
      </div>
    `;

    // Bind event listeners
    const searchInput = sidebarEl.querySelector('#component-search');
    const clearBtn = sidebarEl.querySelector('#search-clear-btn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        store.setState({ searchQuery: e.target.value });
      });
      // Retain focus and cursor position after input update
      if (document.activeElement?.id === 'component-search') {
        const len = searchInput.value.length;
        searchInput.setSelectionRange(len, len);
      }
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        store.setState({ searchQuery: '' });
      });
    }

    const navButtons = sidebarEl.querySelectorAll('.component-nav-item');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const comp = COMPONENTS.find(c => c.id === id);
        if (comp) {
          store.setState({ 
            selectedComponentId: id,
            componentProps: { ...comp.defaultProps },
            sidebarOpen: false
          });
          window.location.hash = `playground/${id}`;
        }
      });
    });
  };

  render();
  store.subscribe((state, prev) => {
    if (
      state.searchQuery !== prev?.searchQuery ||
      state.selectedCategory !== prev?.selectedCategory ||
      state.selectedComponentId !== prev?.selectedComponentId
    ) {
      render();
    }
  });
}
