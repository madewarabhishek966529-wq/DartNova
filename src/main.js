/**
 * DartNova Application Main Entry Point
 * Modern UI initialization: Command Palette, Ambient Spotlight, Audio Feedback, and Theme Switching
 */

import { store } from './state.js';
import { setupRouter } from './router.js';
import { setupAccessibility } from './utils/accessibility.js';
import { setupCommandPalette } from './utils/command-palette.js';
import { setupMouseGlow } from './utils/mouse-glow.js';
import { sound } from './utils/audio.js';
import { setupNavigation } from './playground/navigation.js';
import { setupPreview } from './playground/preview.js';
import { setupControls } from './playground/controls.js';
import { setupCodePanel } from './playground/code-panel.js';
import { renderLandingView } from './views/landing.js';
import { renderDocsView } from './views/docs.js';

document.addEventListener('DOMContentLoaded', () => {
  const landingContainer = document.querySelector('#view-landing');
  const playgroundContainer = document.querySelector('#view-playground');
  const docsContainer = document.querySelector('#view-docs');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileToggle = document.querySelector('#mobile-menu-toggle');

  // 1. Initialize Views
  if (landingContainer) {
    renderLandingView(landingContainer, store);
  }

  if (docsContainer) {
    renderDocsView(docsContainer, store);
  }

  // 2. Initialize Playground Modules
  let previewControls = null;
  if (playgroundContainer) {
    const sidebarEl = playgroundContainer.querySelector('.playground-sidebar');
    const workspaceEl = playgroundContainer.querySelector('.playground-workspace');
    const codePanelEl = playgroundContainer.querySelector('.playground-code-panel');

    setupNavigation(sidebarEl, store);
    previewControls = setupPreview(workspaceEl, store);
    setupCodePanel(codePanelEl, store);

    // Controls dock mount observer
    const observer = new MutationObserver(() => {
      const controlsMount = workspaceEl.querySelector('#controls-dock-mount');
      if (controlsMount && !controlsMount.hasAttribute('data-initialized')) {
        controlsMount.setAttribute('data-initialized', 'true');
        setupControls(controlsMount, store);
      }
    });
    observer.observe(workspaceEl, { childList: true, subtree: true });

    const controlsMount = workspaceEl.querySelector('#controls-dock-mount');
    if (controlsMount) {
      controlsMount.setAttribute('data-initialized', 'true');
      setupControls(controlsMount, store);
    }
  }

  // 3. Initialize Modern UI Utilities
  setupMouseGlow();
  setupCommandPalette(store);

  // 4. Accent Theme Switcher
  const savedTheme = localStorage.getItem('dartnova_theme') || 'lime';
  if (savedTheme !== 'lime') {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  const accentButtons = document.querySelectorAll('.accent-dot-btn');
  accentButtons.forEach(btn => {
    const theme = btn.getAttribute('data-theme');
    btn.classList.toggle('active', theme === savedTheme);

    btn.addEventListener('click', () => {
      sound.playClick();
      accentButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (theme === 'lime') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', theme);
      }
      localStorage.setItem('dartnova_theme', theme);
    });
  });

  // 5. Audio Toggle in Header
  const soundBtn = document.querySelector('#sound-toggle-btn');
  if (soundBtn) {
    const updateSoundBtn = () => {
      const isMuted = sound.isMuted();
      soundBtn.classList.toggle('active', !isMuted);
      soundBtn.title = isMuted ? 'Enable audio feedback' : 'Disable audio feedback';
    };
    updateSoundBtn();

    soundBtn.addEventListener('click', () => {
      sound.toggle();
      updateSoundBtn();
    });
  }

  // 6. Mobile drawer toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      sound.playClick();
      mobileDrawer.classList.toggle('open');
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  const siteHeader = document.querySelector('.site-header');

  // 7. View Switcher logic
  const updateView = (currentView, prevView) => {
    if (siteHeader) {
      siteHeader.classList.toggle('landing-mode', currentView === 'landing');
    }

    if (landingContainer) {
      landingContainer.classList.toggle('view-hidden', currentView !== 'landing');
    }
    if (playgroundContainer) {
      playgroundContainer.classList.toggle('view-hidden', currentView !== 'playground');
    }
    if (docsContainer) {
      docsContainer.classList.toggle('view-hidden', currentView !== 'docs');
    }

    const state = store.getState();
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href');
      const isActive = (currentView === 'landing' && href === '#landing') ||
                       (currentView === 'playground' && !state.favoritesOnly && href === '#playground') ||
                       (currentView === 'playground' && state.favoritesOnly && href === '#favorites') ||
                       (currentView === 'docs' && href === '#docs');
      link.classList.toggle('active', !!isActive);
    });

    const hash = window.location.hash || '';
    const isAnchorTarget = hash === '#components' || hash === '#categories' || hash.includes('featured');
    
    // Only scroll to top if actually changing views and not targeting an in-page section anchor
    if (prevView && prevView !== currentView && currentView !== 'playground' && !isAnchorTarget) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  let previousView = store.getState().currentView || 'landing';
  store.subscribe((state, prev) => {
    if (state.currentView !== prev?.currentView || state.favoritesOnly !== prev?.favoritesOnly) {
      const prevV = previousView;
      previousView = state.currentView;
      updateView(state.currentView, prevV);
    }
  });

  // Sync initial view state
  updateView(store.getState().currentView || 'landing');

  // 8. Playground IDE & Viewport Layout Manager
  const playgroundViewEl = document.querySelector('.playground-view');
  const updatePlaygroundLayout = (state) => {
    if (!playgroundViewEl) return;
    playgroundViewEl.classList.toggle('code-open', !!state.codeViewerOpen);
    playgroundViewEl.classList.toggle('code-layout-full', state.codeViewerLayout === 'full');
    playgroundViewEl.classList.toggle('code-layout-split', state.codeViewerLayout === 'split');

    const activeMobileTab = state.mobileTab || (state.codeViewerOpen ? 'code' : 'preview');
    const sidebar = document.querySelector('.playground-sidebar');
    const workspace = document.querySelector('.playground-workspace');
    const codePanel = document.querySelector('.playground-code-panel');

    if (sidebar && workspace && codePanel) {
      sidebar.classList.toggle('mobile-active', activeMobileTab === 'components');
      workspace.classList.toggle('mobile-active', activeMobileTab === 'preview');
      codePanel.classList.toggle('mobile-active', activeMobileTab === 'code');
    }

    document.querySelectorAll('.mobile-view-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === activeMobileTab);
    });
  };

  updatePlaygroundLayout(store.getState());

  store.subscribe((state, prev) => {
    if (
      state.codeViewerOpen !== prev?.codeViewerOpen ||
      state.codeViewerLayout !== prev?.codeViewerLayout ||
      state.mobileTab !== prev?.mobileTab
    ) {
      updatePlaygroundLayout(state);
    }
  });

  // Mobile Tabs for Playground
  const mobileTabButtons = document.querySelectorAll('.mobile-view-tab-btn');
  mobileTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      const tab = btn.getAttribute('data-tab');
      store.setState({ 
        mobileTab: tab,
        codeViewerOpen: tab === 'code'
      });
    });
  });

  // Nav link click sounds
  document.querySelectorAll('.nav-link, .brand-link').forEach(link => {
    link.addEventListener('click', () => sound.playClick());
  });

  // 8. Accessibility & Keyboard shortcuts
  setupAccessibility(store, {
    onRestart: () => {
      if (previewControls?.restartCurrent) {
        previewControls.restartCurrent();
      }
    }
  });

  // 9. Setup Router
  setupRouter(store);
});
