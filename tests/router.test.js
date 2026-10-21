import { describe, it, expect, beforeEach } from 'vitest';
import { setupRouter } from '../src/router.js';
import { store } from '../src/state.js';

describe('DartNova Router Integration Tests', () => {
  beforeEach(() => {
    window.location.hash = '';
    store.setState({
      currentView: 'landing',
      selectedComponentId: 'pop-button',
      favoritesOnly: false
    });
  });

  it('navigates to playground and selects default component', () => {
    setupRouter(store);
    window.location.hash = '#playground';
    window.dispatchEvent(new Event('hashchange'));

    const state = store.getState();
    expect(state.currentView).toBe('playground');
    expect(state.selectedComponentId).toBe('pop-button');
    expect(state.favoritesOnly).toBe(false);
  });

  it('navigates to specific component in playground', () => {
    setupRouter(store);
    window.location.hash = '#playground/cursor-card';
    window.dispatchEvent(new Event('hashchange'));

    const state = store.getState();
    expect(state.currentView).toBe('playground');
    expect(state.selectedComponentId).toBe('cursor-card');
  });

  it('activates favoritesOnly when navigating to #favorites', () => {
    setupRouter(store);
    window.location.hash = '#favorites';
    window.dispatchEvent(new Event('hashchange'));

    const state = store.getState();
    expect(state.currentView).toBe('playground');
    expect(state.favoritesOnly).toBe(true);
  });

  it('resets favoritesOnly to false when navigating back from #favorites to #playground', () => {
    setupRouter(store);
    
    // Step 1: Go to favorites
    window.location.hash = '#favorites';
    window.dispatchEvent(new Event('hashchange'));
    expect(store.getState().favoritesOnly).toBe(true);

    // Step 2: Navigate back to playground
    window.location.hash = '#playground';
    window.dispatchEvent(new Event('hashchange'));
    expect(store.getState().favoritesOnly).toBe(false);
  });

  it('navigates to docs view on #docs', () => {
    setupRouter(store);
    window.location.hash = '#docs';
    window.dispatchEvent(new Event('hashchange'));

    expect(store.getState().currentView).toBe('docs');
  });

  it('falls back safely to landing view on invalid routes', () => {
    setupRouter(store);
    window.location.hash = '#invalid-route-does-not-exist';
    window.dispatchEvent(new Event('hashchange'));

    expect(store.getState().currentView).toBe('landing');
  });
});
