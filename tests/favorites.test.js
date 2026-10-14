import { describe, it, expect, beforeEach } from 'vitest';
import { getFavorites, isFavorite, toggleFavorite, subscribeFavorites } from '../src/utils/favorites.js';

describe('DartNova Favorites System', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty favorites array', () => {
    expect(getFavorites()).toEqual([]);
    expect(isFavorite('pop-button')).toBe(false);
  });

  it('should toggle favorite status and persist to localStorage', () => {
    const isNowFav = toggleFavorite('pop-button');
    expect(isNowFav).toBe(true);
    expect(isFavorite('pop-button')).toBe(true);
    expect(getFavorites()).toContain('pop-button');

    const toggledAgain = toggleFavorite('pop-button');
    expect(toggledAgain).toBe(false);
    expect(isFavorite('pop-button')).toBe(false);
    expect(getFavorites()).not.toContain('pop-button');
  });

  it('should notify subscribers when favorites change', () => {
    let notifiedValue = null;
    const unsubscribe = subscribeFavorites((favs) => {
      notifiedValue = favs;
    });

    toggleFavorite('cursor-card');
    expect(notifiedValue).toEqual(['cursor-card']);

    unsubscribe();
    toggleFavorite('liquid-fill-button');
    // notifiedValue should not have updated because of unsubscribe
    expect(notifiedValue).toEqual(['cursor-card']);
  });
});
