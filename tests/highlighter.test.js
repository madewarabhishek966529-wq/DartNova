import { describe, it, expect } from 'vitest';
import { highlightDart } from '../src/utils/highlighter.js';

describe('Dart Syntax Highlighter', () => {
  it('should return empty string for falsy input', () => {
    expect(highlightDart('')).toBe('');
    expect(highlightDart(null)).toBe('');
  });

  it('should escape HTML brackets and ampersands', () => {
    const code = 'List<String> items = [];';
    const result = highlightDart(code);
    expect(result).toContain('&lt;');
    expect(result).toContain('&gt;');
  });

  it('should highlight Dart keywords', () => {
    const code = 'class NovaWidget extends StatefulWidget';
    const result = highlightDart(code);
    expect(result).toContain('<span class="token-keyword">class</span>');
    expect(result).toContain('<span class="token-keyword">extends</span>');
  });

  it('should highlight Flutter widget types', () => {
    const code = 'Widget build(BuildContext context)';
    const result = highlightDart(code);
    expect(result).toContain('<span class="token-type">Widget</span>');
    expect(result).toContain('<span class="token-type">BuildContext</span>');
  });

  it('should highlight string literals and numbers', () => {
    const code = 'final double scale = 1.08; String label = "Pop";';
    const result = highlightDart(code);
    expect(result).toContain('<span class="token-number">1.08</span>');
    expect(result).toContain('<span class="token-string">"Pop"</span>');
  });
});
