import { describe, it, expect, beforeEach } from 'vitest';
import { setupResizer } from '../src/playground/resizer.js';
import { store } from '../src/state.js';

describe('DartNova Block Resizer', () => {
  let playgroundViewEl;
  let resizerEl;
  let workspaceEl;
  let codePanelEl;

  beforeEach(() => {
    localStorage.clear();
    playgroundViewEl = document.createElement('div');
    playgroundViewEl.className = 'playground-view code-open code-layout-split';

    workspaceEl = document.createElement('section');
    workspaceEl.className = 'playground-workspace';

    resizerEl = document.createElement('div');
    resizerEl.className = 'playground-resizer';

    codePanelEl = document.createElement('aside');
    codePanelEl.className = 'playground-code-panel';

    playgroundViewEl.appendChild(workspaceEl);
    playgroundViewEl.appendChild(resizerEl);
    playgroundViewEl.appendChild(codePanelEl);
    document.body.appendChild(playgroundViewEl);

    store.setState({ codeViewerOpen: true, codeViewerLayout: 'split' });
  });

  it('should initialize with default split ratio', () => {
    setupResizer(resizerEl, playgroundViewEl, store);
    expect(playgroundViewEl.style.getPropertyValue('--split-workspace')).toBe('42%');
  });

  it('should restore saved ratio from localStorage', () => {
    localStorage.setItem('dartnova_split_ratio', '55');
    setupResizer(resizerEl, playgroundViewEl, store);
    expect(playgroundViewEl.style.getPropertyValue('--split-workspace')).toBe('55%');
  });

  it('should reset to default 42% on double click', () => {
    localStorage.setItem('dartnova_split_ratio', '60');
    setupResizer(resizerEl, playgroundViewEl, store);
    expect(playgroundViewEl.style.getPropertyValue('--split-workspace')).toBe('60%');

    resizerEl.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
    expect(playgroundViewEl.style.getPropertyValue('--split-workspace')).toBe('42%');
    expect(localStorage.getItem('dartnova_split_ratio')).toBeNull();
  });

  it('should adjust ratio via keyboard arrow keys', () => {
    setupResizer(resizerEl, playgroundViewEl, store);
    expect(playgroundViewEl.style.getPropertyValue('--split-workspace')).toBe('42%');

    resizerEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(playgroundViewEl.style.getPropertyValue('--split-workspace')).toBe('44%');

    resizerEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    expect(playgroundViewEl.style.getPropertyValue('--split-workspace')).toBe('42%');

    // Test vertical keys for bottom split
    resizerEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(playgroundViewEl.style.getPropertyValue('--split-workspace')).toBe('44%');

    resizerEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    expect(playgroundViewEl.style.getPropertyValue('--split-workspace')).toBe('42%');
  });
});
