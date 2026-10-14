/**
 * DartNova Centralized State Management
 */

class Store {
  constructor(initialState) {
    this.state = initialState;
    this.listeners = new Set();
  }

  getState() {
    return this.state;
  }

  setState(partialState) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...partialState };
    this.notify(prevState);
  }

  updateComponentProp(propName, value) {
    this.state = {
      ...this.state,
      componentProps: {
        ...this.state.componentProps,
        [propName]: value
      }
    };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(prevState) {
    for (const listener of this.listeners) {
      try {
        listener(this.state, prevState);
      } catch (err) {
        console.error('Store subscriber error:', err);
      }
    }
  }
}

import { getFavorites, subscribeFavorites } from './utils/favorites.js';

export const store = new Store({
  currentView: 'landing', // 'landing' | 'playground' | 'docs'
  selectedComponentId: 'pop-button',
  searchQuery: '',
  selectedCategory: 'all',
  filterStatus: 'all', // 'all' | 'complete' | 'planned'
  sortBy: 'featured', // 'featured' | 'alphabetical' | 'difficulty' | 'favorites'
  favoritesOnly: false,
  favorites: getFavorites(),
  codeTab: 'usage', // 'usage' | 'full' | 'params'
  previewMode: 'desktop', // 'desktop' | 'tablet' | 'mobile'
  canvasBg: 'default', // 'default' | 'black' | 'grid' | 'contrast'
  isPlaying: true,
  animationSpeed: 1,
  sidebarOpen: false,
  mobileTab: 'preview', // 'preview' | 'components' | 'code' | 'controls'
  componentProps: {}
});

// Sync store when favorites change in localStorage
subscribeFavorites((favs) => {
  store.setState({ favorites: favs });
});

