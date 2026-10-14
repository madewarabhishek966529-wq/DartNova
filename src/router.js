/**
 * DartNova Router
 * Handles hash-based routing for static hosting compatibility
 */

import { getComponentById } from './registry/components.js';

export function setupRouter(store) {
  const scrollToSection = (selector) => {
    const el = document.querySelector(selector);
    if (el) {
      const headerOffset = 75;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  const handleRoute = () => {
    const hash = window.location.hash.replace(/^#\/?/, '') || 'landing';
    const parts = hash.split('/');
    const mainRoute = parts[0];
    const subRoute = parts[1];

    if (mainRoute === 'playground') {
      const compId = subRoute || store.getState().selectedComponentId || 'pop-button';
      const comp = getComponentById(compId);
      store.setState({
        currentView: 'playground',
        selectedComponentId: comp.id,
        componentProps: { ...comp.defaultProps }
      });
    } else if (mainRoute === 'favorites') {
      store.setState({
        currentView: 'playground',
        favoritesOnly: true,
        filterStatus: 'all',
        selectedCategory: 'all'
      });
    } else if (mainRoute === 'docs') {
      store.setState({ currentView: 'docs' });
    } else if (mainRoute === 'components') {
      if (store.getState().currentView === 'landing') {
        scrollToSection('#featured-components');
      } else {
        store.setState({ currentView: 'landing' });
        setTimeout(() => {
          scrollToSection('#featured-components');
        }, 120);
      }
    } else if (mainRoute === 'categories') {
      if (store.getState().currentView === 'landing') {
        scrollToSection('#categories-showcase');
      } else {
        store.setState({ currentView: 'landing' });
        setTimeout(() => {
          scrollToSection('#categories-showcase');
        }, 120);
      }
    } else {
      store.setState({ currentView: 'landing' });
    }
  };

  // Intercept anchor clicks so clicking when already on #components or #categories still scrolls smoothly
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href === '#components' || href === '#categories' || href === '#featured-components') {
      const targetSelector = (href === '#components' || href === '#featured-components')
        ? '#featured-components'
        : '#categories-showcase';

      if (store.getState().currentView === 'landing') {
        e.preventDefault();
        window.history.pushState(null, '', href);
        scrollToSection(targetSelector);
      }
    }
  });

  window.addEventListener('hashchange', handleRoute);
  handleRoute();

  return {
    navigate: (route) => {
      window.location.hash = route;
    }
  };
}
