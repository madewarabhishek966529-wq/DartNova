import { describe, it, expect } from 'vitest';
import { COMPONENTS, CATEGORIES, getComponentById, getComponentsByCategory } from '../src/registry/components.js';

describe('DartNova Component Registry', () => {
  it('should register all 468 components (18 formal categories x 26 components)', () => {
    expect(COMPONENTS).toHaveLength(468);
  });

  it('should have 19 categories defined including all (18 formal categories)', () => {
    expect(CATEGORIES).toHaveLength(19);
  });

  it('every component should have id, name, category, description, and valid render function', () => {
    for (const comp of COMPONENTS) {
      expect(comp.id).toBeTruthy();
      expect(comp.name).toBeTruthy();
      expect(comp.category).toBeTruthy();
      expect(comp.description).toBeTruthy();
      expect(typeof comp.render).toBe('function');
      expect(comp.flutterSnippet).toContain('(');
      expect(comp.flutterFullCode).toContain('import \'package:flutter/material.dart\';');
      expect(Array.isArray(comp.controls)).toBe(true);
    }
  });

  it('getComponentById should retrieve requested component or default to first', () => {
    const popBtn = getComponentById('pop-button');
    expect(popBtn.name).toBe('Pop Button');

    const fallback = getComponentById('non-existent');
    expect(fallback.id).toBe('pop-button');
  });

  it('getComponentsByCategory should filter correctly', () => {
    const buttons = getComponentsByCategory('buttons');
    expect(buttons.length).toBeGreaterThanOrEqual(26);
    for (const b of buttons) {
      expect(b.category).toBe('buttons');
    }

    const shaders = getComponentsByCategory('shaders');
    expect(shaders).toHaveLength(26);

    const ai = getComponentsByCategory('ai-interactions');
    expect(ai).toHaveLength(26);

    const all = getComponentsByCategory('all');
    expect(all).toHaveLength(468);
  });

  it('every one of the 18 formal categories should have exactly 26 components', () => {
    const formalCategories = CATEGORIES.filter(c => c.id !== 'all');
    expect(formalCategories).toHaveLength(18);

    for (const cat of formalCategories) {
      const items = COMPONENTS.filter(c => c.category === cat.id);
      expect(items, `Category ${cat.id} should have exactly 26 components`).toHaveLength(26);
    }
  });

  it('verifies that all 18 bespoke interactive components render and execute cleanly', () => {
    const bespokeIds = [
      'radial-menu',
      'animated-sidebar',
      'pill-tab-switcher',
      'breadcrumb-reveal',
      'shared-axis-transition',
      'hero-image-transition',
      'cube-transition-3d',
      'diagonal-wipe',
      'zoom-page-transition',
      'slide-fade-route',
      'morphing-container-transition',
      'liquid-page-transition',
      'expandable-bottom-sheet',
      'blur-backdrop-dialog',
      'fullscreen-modal-reveal',
      'snackbar-slide',
      'popover-morph',
      'notification-stack'
    ];

    for (const id of bespokeIds) {
      const comp = getComponentById(id);
      expect(comp, `Component ${id} must exist in registry`).toBeTruthy();
      expect(comp.id).toBe(id);

      const container = document.createElement('div');
      const instance = comp.render(container, { accentColor: '#C5FF35', duration: 350 });
      expect(container.children.length).toBeGreaterThan(0);
      expect(typeof instance.restart).toBe('function');
      expect(typeof instance.destroy).toBe('function');

      // Verify lifecycle execution does not crash
      expect(() => instance.restart()).not.toThrow();
      expect(() => instance.destroy()).not.toThrow();
    }
  });

  it('verifies that all 468 components across all 18 categories render and execute lifecycles cleanly', () => {
    for (const comp of COMPONENTS) {
      const container = document.createElement('div');
      const props = Object.assign({}, comp.defaultProps, { accentColor: '#C5FF35', duration: 350 });
      const instance = comp.render(container, props);
      expect(container.children.length, `Component ${comp.id} must produce DOM nodes`).toBeGreaterThan(0);
      expect(typeof instance.restart).toBe('function');
      expect(typeof instance.destroy).toBe('function');
      expect(() => instance.restart()).not.toThrow();
      expect(() => instance.destroy()).not.toThrow();
    }
  });
});

