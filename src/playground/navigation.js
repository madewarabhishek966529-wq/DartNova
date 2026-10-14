/**
 * Playground Sidebar Navigation
 * Search filtering across 160 components, 16 categories, status filters, sorting, and favorites
 */

import { CATEGORIES, COMPONENTS } from '../registry/components.js';
import { isFavorite, toggleFavorite } from '../utils/favorites.js';
import { sound } from '../utils/audio.js';

export function setupNavigation(sidebarEl, store) {
  if (!sidebarEl) return;

  const render = () => {
    const prevScrollContainer = sidebarEl.querySelector('.sidebar-nav-scroll');
    const prevScrollTop = prevScrollContainer ? prevScrollContainer.scrollTop : 0;

    const { 
      searchQuery, 
      selectedCategory, 
      selectedComponentId, 
      filterStatus = 'all', 
      sortBy = 'featured', 
      favoritesOnly = false,
      favorites = [] 
    } = store.getState();

    const query = searchQuery.toLowerCase().trim();

    // 1. Filter components
    let filtered = COMPONENTS.filter(comp => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || comp.category === selectedCategory;
      
      // Status filter
      const matchesStatus = filterStatus === 'all' || 
        (filterStatus === 'complete' && comp.status === 'complete') ||
        (filterStatus === 'planned' && comp.status === 'planned');

      // Favorites filter
      const matchesFav = !favoritesOnly || favorites.includes(comp.id);

      // Search query across name, description, tags, category
      const matchesQuery = !query || 
        comp.name.toLowerCase().includes(query) || 
        comp.description.toLowerCase().includes(query) ||
        comp.category.toLowerCase().includes(query) ||
        (comp.tags && comp.tags.some(t => t.toLowerCase().includes(query))) ||
        comp.badge.toLowerCase().includes(query);

      return matchesCategory && matchesStatus && matchesFav && matchesQuery;
    });

    // 2. Sort components
    if (sortBy === 'alphabetical') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'difficulty') {
      const order = { beginner: 1, intermediate: 2, advanced: 3 };
      filtered.sort((a, b) => (order[a.difficulty] || 2) - (order[b.difficulty] || 2));
    } else if (sortBy === 'favorites') {
      filtered.sort((a, b) => {
        const aFav = favorites.includes(a.id) ? -1 : 1;
        const bFav = favorites.includes(b.id) ? -1 : 1;
        return aFav - bFav;
      });
    }

    const liveCount = COMPONENTS.filter(c => c.status === 'complete').length;

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
            placeholder="Search 160 components & tags... (/)" 
            value="${searchQuery}"
            autocomplete="off"
            spellcheck="false"
          />
          <button id="search-clear-btn" class="search-clear-btn" aria-label="Clear search">✕</button>
        </div>

        <!-- Filter & Scope Controls -->
        <div class="sidebar-filter-dock">
          <!-- Category Selector Dropdown -->
          <div class="filter-row">
            <select id="sidebar-category-select" class="sidebar-select" title="Filter by Category">
              ${CATEGORIES.map(cat => `
                <option value="${cat.id}" ${selectedCategory === cat.id ? 'selected' : ''}>
                  ${cat.icon} ${cat.name}
                </option>
              `).join('')}
            </select>

            <select id="sidebar-sort-select" class="sidebar-select" title="Sort Order">
              <option value="featured" ${sortBy === 'featured' ? 'selected' : ''}>★ Featured</option>
              <option value="alphabetical" ${sortBy === 'alphabetical' ? 'selected' : ''}>A–Z Name</option>
              <option value="difficulty" ${sortBy === 'difficulty' ? 'selected' : ''}>⚡ Difficulty</option>
              <option value="favorites" ${sortBy === 'favorites' ? 'selected' : ''}>♥ Favorites</option>
            </select>
          </div>

          <!-- Status & Favorites Pill Bar -->
          <div class="filter-pills-row">
            <button class="nav-scope-btn ${filterStatus === 'all' && !favoritesOnly ? 'active' : ''}" data-status="all">
              All (${COMPONENTS.length})
            </button>
            <button class="nav-scope-btn ${filterStatus === 'complete' && !favoritesOnly ? 'active' : ''}" data-status="complete" title="Published live interactive previews">
              Live (${liveCount})
            </button>
            <button class="nav-scope-btn ${filterStatus === 'planned' && !favoritesOnly ? 'active' : ''}" data-status="planned" title="Roadmap specifications">
              Roadmap
            </button>
            <button class="nav-scope-btn fav-btn ${favoritesOnly ? 'active' : ''}" id="sidebar-fav-filter-btn" title="Show Favorites Only">
              ♥ ${favorites.length}
            </button>
          </div>
        </div>
      </div>

      <div class="sidebar-nav-scroll">
        ${CATEGORIES.filter(cat => cat.id !== 'all').map(cat => {
          const catComps = filtered.filter(c => c.category === cat.id);
          if (catComps.length === 0) return '';

          return `
            <div class="sidebar-category-group">
              <div class="category-group-header">
                <span class="cat-title-text">${cat.icon} ${cat.name}</span>
                <span class="cat-count-badge">${catComps.length}</span>
              </div>
              <ul class="component-nav-list">
                ${catComps.map(comp => {
                  const isFav = favorites.includes(comp.id);
                  const isLive = comp.status === 'complete';
                  return `
                    <li>
                      <div class="component-nav-row ${comp.id === selectedComponentId ? 'active' : ''}">
                        <button 
                          class="component-nav-item" 
                          data-id="${comp.id}"
                        >
                          <span class="comp-nav-name">${comp.name}</span>
                          <span class="component-nav-badge ${isLive ? 'badge-live' : 'badge-roadmap'}">
                            ${isLive ? 'LIVE' : 'SPEC'}
                          </span>
                        </button>
                        <button 
                          class="comp-fav-btn ${isFav ? 'is-fav' : ''}" 
                          data-fav-id="${comp.id}" 
                          title="${isFav ? 'Remove from favorites' : 'Add to favorites'}"
                          aria-label="Favorite ${comp.name}"
                        >
                          ${isFav ? '♥' : '♡'}
                        </button>
                      </div>
                    </li>
                  `;
                }).join('')}
              </ul>
            </div>
          `;
        }).join('')}

        ${filtered.length === 0 ? `
          <div style="padding: 2.5rem 1rem; text-align: center; color: var(--text-muted); font-size: 13px;">
            <div style="font-size: 28px; margin-bottom: 8px;">🔍</div>
            <p style="margin: 0 0 6px; color: var(--text-secondary); font-weight: 600;">No matching components found</p>
            <p style="margin: 0; font-size: 11px;">Try clearing filters or adjusting your search term.</p>
            <button id="sidebar-clear-filters-btn" class="btn btn-secondary" style="margin-top: 12px; font-size: 11px; padding: 4px 10px;">
              Reset All Filters
            </button>
          </div>
        ` : ''}
      </div>
    `;

    // Restore previous scroll position so sidebar doesn't reset to top
    const newScrollContainer = sidebarEl.querySelector('.sidebar-nav-scroll');
    if (newScrollContainer && prevScrollTop) {
      newScrollContainer.scrollTop = prevScrollTop;
    }

    // Bind event listeners
    const searchInput = sidebarEl.querySelector('#component-search');
    const clearBtn = sidebarEl.querySelector('#search-clear-btn');
    const categorySelect = sidebarEl.querySelector('#sidebar-category-select');
    const sortSelect = sidebarEl.querySelector('#sidebar-sort-select');
    const resetFiltersBtn = sidebarEl.querySelector('#sidebar-clear-filters-btn');
    const favFilterBtn = sidebarEl.querySelector('#sidebar-fav-filter-btn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        store.setState({ searchQuery: e.target.value });
      });
      if (document.activeElement?.id === 'component-search') {
        const len = searchInput.value.length;
        searchInput.setSelectionRange(len, len);
      }
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        sound.playClick();
        store.setState({ searchQuery: '' });
      });
    }

    if (categorySelect) {
      categorySelect.addEventListener('change', (e) => {
        sound.playClick();
        store.setState({ selectedCategory: e.target.value });
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        sound.playClick();
        store.setState({ sortBy: e.target.value });
      });
    }

    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        sound.playClick();
        store.setState({
          searchQuery: '',
          selectedCategory: 'all',
          filterStatus: 'all',
          favoritesOnly: false
        });
      });
    }

    if (favFilterBtn) {
      favFilterBtn.addEventListener('click', () => {
        sound.playClick();
        store.setState({ favoritesOnly: !store.getState().favoritesOnly });
      });
    }

    // Status filter buttons
    sidebarEl.querySelectorAll('.nav-scope-btn[data-status]').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const status = btn.getAttribute('data-status');
        store.setState({ filterStatus: status, favoritesOnly: false });
      });
    });

    // Component selection click
    sidebarEl.querySelectorAll('.component-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
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

    // Favorite heart click
    sidebarEl.querySelectorAll('.comp-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.playPop();
        const id = btn.getAttribute('data-fav-id');
        toggleFavorite(id);
      });
    });
  };

  render();

  store.subscribe((state, prev) => {
    if (
      state.searchQuery !== prev?.searchQuery ||
      state.selectedCategory !== prev?.selectedCategory ||
      state.selectedComponentId !== prev?.selectedComponentId ||
      state.filterStatus !== prev?.filterStatus ||
      state.sortBy !== prev?.sortBy ||
      state.favoritesOnly !== prev?.favoritesOnly ||
      state.favorites !== prev?.favorites
    ) {
      render();
    }
  });
}
