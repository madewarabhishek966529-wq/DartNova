import { describe, it, expect } from 'vitest';
import { escapeHtml, sanitizeSearchQuery } from '../src/utils/security.js';
import { highlightDart } from '../src/utils/highlighter.js';

describe('Security & Sanitization Tests', () => {
  it('escapes dangerous HTML characters to prevent XSS', () => {
    const dangerousInput = '<script>alert("XSS")</script>&<img src=x onerror=alert(1)>';
    const safeOutput = escapeHtml(dangerousInput);
    expect(safeOutput).not.toContain('<script>');
    expect(safeOutput).not.toContain('<img');
    expect(safeOutput).toContain('&lt;script&gt;');
    expect(safeOutput).toContain('&amp;');
    expect(safeOutput).toContain('&quot;XSS&quot;');
  });

  it('handles null, undefined, and non-string values safely', () => {
    expect(escapeHtml(null)).toBe('');
    expect(escapeHtml(undefined)).toBe('');
    expect(escapeHtml(123)).toBe('123');
  });

  it('escapes generic types like List<String> correctly', () => {
    expect(escapeHtml('List<String>')).toBe('List&lt;String&gt;');
    expect(escapeHtml('Map<String, dynamic>')).toBe('Map&lt;String, dynamic&gt;');
  });

  it('sanitizes search query lengths', () => {
    const longQuery = 'a'.repeat(200);
    expect(sanitizeSearchQuery(longQuery).length).toBe(100);
  });

  it('ensures highlightDart escapes arbitrary script tags in code examples', () => {
    const maliciousCode = 'void main() { /* <script>evil()</script> */ }';
    const highlighted = highlightDart(maliciousCode);
    expect(highlighted).not.toContain('<script>');
    expect(highlighted).toContain('&lt;script&gt;');
  });
});
