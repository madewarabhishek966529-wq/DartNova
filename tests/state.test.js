import { describe, it, expect } from 'vitest';
import { store } from '../src/state.js';

describe('DartNova Centralized State Store', () => {
  it('should initialize with default landing view and pop-button', () => {
    const state = store.getState();
    expect(state.currentView).toBe('landing');
    expect(state.selectedComponentId).toBe('pop-button');
    expect(state.previewMode).toBe('desktop');
  });

  it('should update state and notify subscribers', () => {
    let notifiedState = null;
    const unsubscribe = store.subscribe((newState) => {
      notifiedState = newState;
    });

    store.setState({ currentView: 'playground', selectedComponentId: 'radial-glow-button' });
    expect(notifiedState.currentView).toBe('playground');
    expect(notifiedState.selectedComponentId).toBe('radial-glow-button');

    unsubscribe();
  });

  it('should update component props specifically', () => {
    store.updateComponentProp('duration', 500);
    const state = store.getState();
    expect(state.componentProps.duration).toBe(500);
  });
});
