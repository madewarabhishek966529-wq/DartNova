import { describe, it, expect } from 'vitest';
import { 
  formatDartColor, 
  generateDynamicSnippet, 
  generateStandaloneFlutterApp 
} from '../src/utils/code-generator.js';

describe('DartNova Dynamic Code Generator', () => {
  it('should format hex colors into valid Dart Color consts', () => {
    expect(formatDartColor('#C5FF35')).toBe('const Color(0xFFC5FF35)');
    expect(formatDartColor('#fff')).toBe('const Color(0xFFFFFFFF)');
    expect(formatDartColor('#42E8F5')).toBe('const Color(0xFF42E8F5)');
  });

  it('should dynamically update snippet when props change', () => {
    const mockComp = {
      id: 'pop-button',
      name: 'Pop Button',
      flutterSnippet: `NovaPopButton(
  text: 'Explore Motion',
  accentColor: const Color(0xFFC5FF35),
  duration: const Duration(milliseconds: 250),
)`,
      controls: [
        { type: 'text', prop: 'text' },
        { type: 'color', prop: 'accentColor' },
        { type: 'slider', prop: 'duration', unit: 'ms' }
      ]
    };

    const customized = generateDynamicSnippet(mockComp, {
      text: 'Super Cool Button',
      accentColor: '#FF0055',
      duration: 500
    });

    expect(customized).toContain("text: 'Super Cool Button'");
    expect(customized).toContain("accentColor: const Color(0xFFFF0055)");
    expect(customized).toContain("duration: const Duration(milliseconds: 500)");
  });

  it('should generate standalone runnable Flutter app with main()', () => {
    const mockComp = {
      id: 'pop-button',
      name: 'Pop Button',
      flutterSnippet: `NovaPopButton()`,
      flutterFullCode: `import 'package:flutter/material.dart';\nclass NovaPopButton extends StatelessWidget { Widget build(BuildContext context) => Container(); }`,
      controls: []
    };

    const standalone = generateStandaloneFlutterApp(mockComp);
    expect(standalone).toContain('void main() {');
    expect(standalone).toContain('runApp(');
    expect(standalone).toContain('class PopButtonPreviewApp extends StatelessWidget');
    expect(standalone).toContain('class NovaPopButton extends StatelessWidget');
  });
});
