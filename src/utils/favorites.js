/**
 * DartNova Favorites System
 * Manages locally stored user favorites in localStorage with reactive listeners
 */

const STORAGE_KEY = 'dartnova_favorites';
const listeners = new Set();

export function getFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read favorites from localStorage:', err);
    return [];
  }
}

export function isFavorite(id) {
  const favs = getFavorites();
  return favs.includes(id);
}

export function toggleFavorite(id) {
  try {
    const favs = getFavorites();
    const index = favs.indexOf(id);
    let isNowFav = false;

    if (index >= 0) {
      favs.splice(index, 1);
      isNowFav = false;
    } else {
      favs.push(id);
      isNowFav = true;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
    notify(favs);
    return isNowFav;
  } catch (err) {
    console.error('Failed to update favorites in localStorage:', err);
    return false;
  }
}

export function subscribeFavorites(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function notify(favs) {
  for (const listener of listeners) {
    try {
      listener(favs);
    } catch (err) {
      console.error('Favorites listener error:', err);
    }
  }
}
