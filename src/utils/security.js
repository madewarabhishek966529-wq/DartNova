/**
 * DartNova Security & Sanitization Utilities
 */

/**
 * Escapes HTML characters in untrusted strings to prevent XSS.
 * @param {string|null|undefined} str 
 * @returns {string} Safe HTML string
 */
export function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Validates and sanitizes search queries.
 * @param {string} query 
 * @returns {string}
 */
export function sanitizeSearchQuery(query) {
  if (!query) return '';
  return String(query).trim().slice(0, 100);
}
