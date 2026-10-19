/**
 * DartNova — Interactive Screen/Block Split Resizer
 * Enables dragging to adjust width between Live Preview and Code Viewer blocks
 */
import { sound } from '../utils/audio.js';

export function setupResizer(resizerEl, playgroundViewEl, store) {
  if (!resizerEl || !playgroundViewEl) return;

  const DEFAULT_RATIO = 42; // 42% preview, 58% code
  const STORAGE_KEY = 'dartnova_split_ratio';

  // Restore saved split ratio if available
  const savedRatio = parseFloat(localStorage.getItem(STORAGE_KEY));
  if (!isNaN(savedRatio) && savedRatio >= 20 && savedRatio <= 80) {
    playgroundViewEl.style.setProperty('--split-workspace', `${savedRatio}%`);
  } else {
    playgroundViewEl.style.setProperty('--split-workspace', `${DEFAULT_RATIO}%`);
  }

  let isDragging = false;
  let currentPercentage = savedRatio || DEFAULT_RATIO;

  const startDragging = (e) => {
    // Only respond to primary mouse button or touch
    if (e.type === 'mousedown' && e.button !== 0) return;

    // Only active in split mode on desktop
    const state = store.getState();
    if (!state.codeViewerOpen || state.codeViewerLayout !== 'split') return;

    isDragging = true;
    document.body.classList.add('is-resizing-blocks');
    resizerEl.classList.add('is-active');
    resizerEl.setAttribute('aria-valuenow', Math.round(currentPercentage));

    if (e.cancelable && e.type === 'touchstart') {
      e.preventDefault();
    }
  };

  const onDrag = (e) => {
    if (!isDragging) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const viewRect = playgroundViewEl.getBoundingClientRect();
    const sidebarEl = playgroundViewEl.querySelector('.playground-sidebar');
    
    // Calculate sidebar width if visible
    let sidebarWidth = 0;
    if (sidebarEl && window.getComputedStyle(sidebarEl).display !== 'none') {
      sidebarWidth = sidebarEl.getBoundingClientRect().width;
    }

    const availableWidth = viewRect.width - sidebarWidth - resizerEl.offsetWidth;
    if (availableWidth <= 0) return;

    const mouseOffset = clientX - viewRect.left - sidebarWidth;

    // Minimum constraints: 300px for workspace, 360px for code panel
    const minWorkspace = 300;
    const maxWorkspace = availableWidth - 360;

    if (maxWorkspace <= minWorkspace) return;

    const clampedPx = Math.max(minWorkspace, Math.min(maxWorkspace, mouseOffset));
    const percent = parseFloat(((clampedPx / availableWidth) * 100).toFixed(2));

    currentPercentage = percent;
    playgroundViewEl.style.setProperty('--split-workspace', `${percent}%`);
    resizerEl.setAttribute('aria-valuenow', Math.round(percent));
  };

  const stopDragging = () => {
    if (!isDragging) return;
    isDragging = false;
    document.body.classList.remove('is-resizing-blocks');
    resizerEl.classList.remove('is-active');

    try {
      localStorage.setItem(STORAGE_KEY, currentPercentage.toString());
    } catch (_) {}
  };

  // Reset to default ratio on double click
  resizerEl.addEventListener('dblclick', () => {
    sound.playPop();
    currentPercentage = DEFAULT_RATIO;
    playgroundViewEl.style.setProperty('--split-workspace', `${DEFAULT_RATIO}%`);
    resizerEl.setAttribute('aria-valuenow', DEFAULT_RATIO);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {}
  });

  // Keyboard accessibility
  resizerEl.addEventListener('keydown', (e) => {
    let delta = 0;
    if (e.key === 'ArrowLeft') delta = -2;
    else if (e.key === 'ArrowRight') delta = 2;
    else if (e.key === 'Home') delta = -100;
    else if (e.key === 'End') delta = 100;
    else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      currentPercentage = DEFAULT_RATIO;
      playgroundViewEl.style.setProperty('--split-workspace', `${DEFAULT_RATIO}%`);
      try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
      return;
    }

    if (delta !== 0) {
      e.preventDefault();
      currentPercentage = Math.max(20, Math.min(80, currentPercentage + delta));
      playgroundViewEl.style.setProperty('--split-workspace', `${currentPercentage}%`);
      resizerEl.setAttribute('aria-valuenow', Math.round(currentPercentage));
      try {
        localStorage.setItem(STORAGE_KEY, currentPercentage.toString());
      } catch (_) {}
    }
  });

  // Mouse & Touch bindings
  resizerEl.addEventListener('mousedown', startDragging);
  resizerEl.addEventListener('touchstart', startDragging, { passive: false });

  window.addEventListener('mousemove', onDrag, { passive: true });
  window.addEventListener('touchmove', onDrag, { passive: false });

  window.addEventListener('mouseup', stopDragging);
  window.addEventListener('touchend', stopDragging);
  window.addEventListener('touchcancel', stopDragging);
}
