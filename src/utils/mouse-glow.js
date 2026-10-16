/**
 * Interactive Mouse Glow & Global Spotlight
 * Engineered for 120 FPS high-refresh rate displays:
 * - Direct translate3d compositor transform (zero document-level style recalcs)
 * - requestAnimationFrame coalescing on pointermove
 * - Event delegation with cached bounding rects to prevent layout thrashing
 */

export function setupMouseGlow() {
  const spotlight = document.getElementById('global-spotlight-glow');
  let mouseX = -1000;
  let mouseY = -1000;
  let spotlightScheduled = false;
  let isPointerActive = false;

  // 1. Ultra-smooth 120 FPS Global Spotlight via hardware transform
  const updateSpotlight = () => {
    if (spotlight && isPointerActive) {
      spotlight.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }
    spotlightScheduled = false;
  };

  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isPointerActive && spotlight) {
      isPointerActive = true;
      spotlight.style.opacity = '0.65';
    }
    if (!spotlightScheduled) {
      spotlightScheduled = true;
      requestAnimationFrame(updateSpotlight);
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    isPointerActive = false;
    if (spotlight) {
      spotlight.style.opacity = '0';
    }
  });

  // 2. High-performance Event Delegated Card Mouse Glow
  let activeCard = null;
  let cardRect = null;
  let cardMouseX = 0;
  let cardMouseY = 0;
  let cardUpdateScheduled = false;

  const updateCardCoordinates = () => {
    if (activeCard && cardRect) {
      activeCard.style.setProperty('--card-mouse-x', `${cardMouseX}px`);
      activeCard.style.setProperty('--card-mouse-y', `${cardMouseY}px`);
    }
    cardUpdateScheduled = false;
  };

  const getGlowTarget = (target) => {
    return target.closest?.('.component-card, .category-tile, .workflow-step, .hero-badge-container');
  };

  document.addEventListener('pointerover', (e) => {
    const targetCard = getGlowTarget(e.target);
    if (targetCard) {
      activeCard = targetCard;
      cardRect = targetCard.getBoundingClientRect();
    }
  }, { passive: true });

  document.addEventListener('pointerout', (e) => {
    const targetCard = getGlowTarget(e.target);
    if (targetCard && targetCard === activeCard) {
      // Check if moving to child inside the same card
      if (e.relatedTarget && activeCard.contains(e.relatedTarget)) {
        return;
      }
      activeCard = null;
      cardRect = null;
    }
  }, { passive: true });

  document.addEventListener('pointermove', (e) => {
    if (!activeCard) return;
    if (!cardRect) {
      cardRect = activeCard.getBoundingClientRect();
    }
    cardMouseX = e.clientX - cardRect.left;
    cardMouseY = e.clientY - cardRect.top;

    if (!cardUpdateScheduled) {
      cardUpdateScheduled = true;
      requestAnimationFrame(updateCardCoordinates);
    }
  }, { passive: true });

  // Invalidate cached rect on scroll/resize without layout thrashing
  window.addEventListener('scroll', () => {
    cardRect = null;
  }, { passive: true });

  window.addEventListener('resize', () => {
    cardRect = null;
  }, { passive: true });
}
