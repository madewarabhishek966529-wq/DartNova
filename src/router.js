/**
 * DartNova Router
 * Handles hash-based routing for static hosting compatibility
 */

import { getComponentById } from './registry/components.js';

export function setupRouter(store) {
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
    } else if (mainRoute === 'docs') {
      store.setState({ currentView: 'docs' });
    } else if (mainRoute === 'components') {
      // If on landing, scroll to featured components; otherwise switch to landing then scroll
      if (store.getState().currentView === 'landing') {
        const el = document.querySelector('#featured-components');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        store.setState({ currentView: 'landing' });
        setTimeout(() => {
          const el = document.querySelector('#featured-components');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      store.setState({ currentView: 'landing' });
    }
  };

  window.addEventListener('hashchange', handleRoute);
  handleRoute();

  return {
    navigate: (route) => {
      window.location.hash = route;
    }
  };
}
