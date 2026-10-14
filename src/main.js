/**
 * DartNova Application Main Entry Point
 */

import { store } from './state.js';
import { setupRouter } from './router.js';
import { setupAccessibility } from './utils/accessibility.js';
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

  // Initialize Landing View once
  if (landingContainer) {
    renderLandingView(landingContainer, store);
  }

  // Initialize Docs View once
  if (docsContainer) {
    renderDocsView(docsContainer, store);
  }

  // Initialize Playground Workspace Modules
  let previewControls = null;
  if (playgroundContainer) {
    const sidebarEl = playgroundContainer.querySelector('.playground-sidebar');
    const workspaceEl = playgroundContainer.querySelector('.playground-workspace');
    const codePanelEl = playgroundContainer.querySelector('.playground-code-panel');

    setupNavigation(sidebarEl, store);
    previewControls = setupPreview(workspaceEl, store);
    setupCodePanel(codePanelEl, store);

    // Controls dock mount resides in workspaceEl (dynamically created)
    const observer = new MutationObserver(() => {
      const controlsMount = workspaceEl.querySelector('#controls-dock-mount');
      if (controlsMount && !controlsMount.hasAttribute('data-initialized')) {
        controlsMount.setAttribute('data-initialized', 'true');
        setupControls(controlsMount, store);
      }
    });
    observer.observe(workspaceEl, { childList: true, subtree: true });

    // Initial check for controls mount
    const controlsMount = workspaceEl.querySelector('#controls-dock-mount');
    if (controlsMount) {
      controlsMount.setAttribute('data-initialized', 'true');
      setupControls(controlsMount, store);
    }
  }

  // Mobile drawer toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // View Switcher logic
  const updateView = (currentView) => {
    if (landingContainer) {
      landingContainer.classList.toggle('view-hidden', currentView !== 'landing');
    }
    if (playgroundContainer) {
      playgroundContainer.classList.toggle('view-hidden', currentView !== 'playground');
    }
    if (docsContainer) {
      docsContainer.classList.toggle('view-hidden', currentView !== 'docs');
    }

    // Update active nav links in header
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href');
      const isActive = (currentView === 'landing' && href === '#landing') ||
                       (currentView === 'playground' && href === '#playground') ||
                       (currentView === 'docs' && href === '#docs');
      link.classList.toggle('active', isActive);
    });

    // Reset scroll when switching views
    if (currentView !== 'playground') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // Subscribe to view changes
  store.subscribe((state, prev) => {
    if (state.currentView !== prev?.currentView) {
      updateView(state.currentView);
    }
  });

  // Mobile Tabs for Playground (Mobile/Tablet breakpoint)
  const mobileTabButtons = document.querySelectorAll('.mobile-view-tab-btn');
  mobileTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      store.setState({ mobileTab: tab });

      mobileTabButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === tab));

      const sidebar = document.querySelector('.playground-sidebar');
      const workspace = document.querySelector('.playground-workspace');
      const codePanel = document.querySelector('.playground-code-panel');

      if (sidebar && workspace && codePanel) {
        sidebar.classList.toggle('mobile-active', tab === 'components');
        workspace.classList.toggle('mobile-active', tab === 'preview');
        codePanel.classList.toggle('mobile-active', tab === 'code');
      }
    });
  });

  // Setup Accessibility & Keyboard shortcuts
  setupAccessibility(store, {
    onRestart: () => {
      if (previewControls?.restartCurrent) {
        previewControls.restartCurrent();
      }
    }
  });

  // Setup Router
  setupRouter(store);
});
