import { describe, it, expect } from 'vitest';
import { COMPONENTS, CATEGORIES, getComponentById, getComponentsByCategory } from '../src/registry/components.js';

describe('DartNova Component Registry', () => {
  it('should register all 160 components defined in PRD Section 9', () => {
    expect(COMPONENTS).toHaveLength(160);
  });

  it('should have 17 categories defined including all (16 formal categories)', () => {
    expect(CATEGORIES).toHaveLength(17);
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
    expect(buttons.length).toBeGreaterThanOrEqual(10);
    for (const b of buttons) {
      expect(b.category).toBe('buttons');
    }

    const all = getComponentsByCategory('all');
    expect(all).toHaveLength(160);
  });

  it('every one of the 16 formal categories should have exactly 10 components', () => {
    const formalCategories = CATEGORIES.filter(c => c.id !== 'all');
    expect(formalCategories).toHaveLength(16);

    for (const cat of formalCategories) {
      const items = COMPONENTS.filter(c => c.category === cat.id);
      expect(items, `Category ${cat.id} should have exactly 10 components`).toHaveLength(10);
    }
  });
});

