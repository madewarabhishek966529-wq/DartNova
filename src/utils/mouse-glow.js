/**
 * Interactive Mouse Glow & Global Spotlight
 * Tracks pointer coordinates on cards and across the viewport for dynamic lighting
 */

export function setupMouseGlow() {
  // 1. Global Ambient Spotlight Glow on Body
  window.addEventListener('pointermove', (e) => {
    document.body.style.setProperty('--cursor-x', `${e.clientX}px`);
    document.body.style.setProperty('--cursor-y', `${e.clientY}px`);
  });

  // 2. Card-specific dynamic glowing borders
  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--card-mouse-x', `${x}px`);
    card.style.setProperty('--card-mouse-y', `${y}px`);
  };

  const bindGlowCards = () => {
    const cards = document.querySelectorAll('.component-card, .category-tile, .workflow-step, .hero-badge-container');
    cards.forEach(card => {
      card.removeEventListener('pointermove', handleCardMove);
      card.addEventListener('pointermove', handleCardMove);
    });
  };

  bindGlowCards();

  // Rebind when DOM changes
  const observer = new MutationObserver(bindGlowCards);
  observer.observe(document.body, { childList: true, subtree: true });
}
