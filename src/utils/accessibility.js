/**
 * Accessibility & Keyboard Shortcuts Utility
 */

export function setupAccessibility(store, callbacks = {}) {
  // Check system prefers-reduced-motion
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  const handleMotionChange = (e) => {
    if (e.matches) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  };

  mediaQuery.addEventListener('change', handleMotionChange);
  handleMotionChange(mediaQuery);

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // If typing in an input or textarea, don't trigger global shortcuts
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
      if (e.key === 'Escape') {
        document.activeElement.blur();
      }
      return;
    }

    // '/' focuses search input in playground
    if (e.key === '/') {
      e.preventDefault();
      const searchInput = document.querySelector('#component-search');
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }

    // 'Escape' closes mobile menu or drawer
    if (e.key === 'Escape') {
      store.setState({ sidebarOpen: false });
      const drawer = document.querySelector('.mobile-nav-drawer');
      if (drawer) drawer.classList.remove('open');
    }

    // 'r' or 'R' restarts current animation
    if ((e.key === 'r' || e.key === 'R') && !e.ctrlKey && !e.metaKey) {
      if (callbacks.onRestart) {
        callbacks.onRestart();
      }
    }

    // 'Space' plays/pauses animation in playground if not focused
    if (e.key === ' ' && store.getState().currentView === 'playground') {
      e.preventDefault();
      const isPlaying = store.getState().isPlaying;
      store.setState({ isPlaying: !isPlaying });
    }
  });
}
