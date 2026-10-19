/**
 * DartNova Dynamic Flutter Code Generator
 * Generates reactive Flutter Dart code snippets, standalone runnable apps,
 * and 1-click DartPad sandbox exports.
 */

import { copyToClipboard } from './clipboard.js';

/**
 * Format a color hex string (#RRGGBB, #RGB) into Dart Color: const Color(0xFFRRGGBB)
 */
export function formatDartColor(hex) {
  if (!hex || typeof hex !== 'string') return 'const Color(0xFFC5FF35)';
  let clean = hex.replace('#', '').toUpperCase();
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  if (clean.length === 6) {
    clean = 'FF' + clean;
  }
  return `const Color(0x${clean})`;
}

/**
 * Update a Flutter snippet dynamically based on user-configured properties
 */
export function generateDynamicSnippet(comp, props = {}) {
  if (!comp) return '';
  let snippet = comp.flutterSnippet || '';
  if (!snippet) return '';

  const activeProps = { ...comp.defaultProps, ...props };
  const controls = comp.controls || [];

  // 1. Replace or update controlled properties
  for (const ctrl of controls) {
    const val = activeProps[ctrl.prop];
    if (val === undefined) continue;

    const propName = ctrl.prop;

    // A. Color properties (accentColor, color, glowColor, etc.)
    if (ctrl.type === 'color') {
      const dartColor = formatDartColor(val);
      const colorRegex = new RegExp(`(${propName}\\s*:\\s*)(?:const\\s+)?Color\\([^)]+\\)`, 'g');
      if (colorRegex.test(snippet)) {
        snippet = snippet.replace(colorRegex, `$1${dartColor}`);
      }
    }

    // B. Duration properties
    else if (ctrl.prop === 'duration' || (ctrl.unit === 'ms' && ctrl.type === 'slider')) {
      const dartDuration = `const Duration(milliseconds: ${Math.round(val)})`;
      const durationRegex = new RegExp(`(${propName}\\s*:\\s*)(?:const\\s+)?Duration\\([^)]+\\)`, 'g');
      if (durationRegex.test(snippet)) {
        snippet = snippet.replace(durationRegex, `$1${dartDuration}`);
      }
    }

    // C. String properties (label, text, title)
    else if (ctrl.type === 'text') {
      const textRegex = new RegExp(`(${propName}|text|label|title)(\\s*:\\s*)'[^']*'`, 'g');
      if (textRegex.test(snippet)) {
        const escaped = String(val).replace(/'/g, "\\'");
        snippet = snippet.replace(textRegex, `$1$2'${escaped}'`);
      }
    }

    // D. Number / Scale / Size properties
    else if (ctrl.type === 'slider') {
      const numRegex = new RegExp(`(${propName}\\s*:\\s*)[0-9.]+`, 'g');
      if (numRegex.test(snippet)) {
        snippet = snippet.replace(numRegex, `$1${val}`);
      }
    }

    // E. Boolean toggles
    else if (ctrl.type === 'toggle') {
      const boolRegex = new RegExp(`(${propName}\\s*:\\s*)(true|false)`, 'g');
      if (boolRegex.test(snippet)) {
        snippet = snippet.replace(boolRegex, `$1${Boolean(val)}`);
      }
    }
  }

  return snippet;
}

/**
 * Generate a standalone, production-ready runnable Flutter app file
 * Perfect for dropping into DartPad or downloading directly
 */
export function generateStandaloneFlutterApp(comp, props = {}) {
  if (!comp) return '';
  const snippet = generateDynamicSnippet(comp, props);
  const rawFullCode = comp.flutterFullCode || '';

  // Extract widget implementation without duplicate import 'package:flutter/material.dart';
  const cleanWidgetCode = rawFullCode
    .replace(/import\s+['"]package:flutter\/material\.dart['"];\s*/g, '')
    .trim();

  // If fullCode already contains a `void main()`, return as is
  if (rawFullCode.includes('void main()')) {
    return rawFullCode;
  }

  const appClassName = `${comp.name.replace(/[^a-zA-Z0-9]/g, '')}PreviewApp`;

  return `import 'package:flutter/material.dart';

void main() {
  runApp(const ${appClassName}());
}

class ${appClassName} extends StatelessWidget {
  const ${appClassName}({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: '${comp.name} — DartNova Motion',
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF08090B),
      ),
      home: Scaffold(
        backgroundColor: const Color(0xFF08090B),
        appBar: AppBar(
          title: const Text('${comp.name}'),
          backgroundColor: const Color(0xFF111318),
          elevation: 0,
        ),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: ${snippet.split('\n').map((line, idx) => idx === 0 ? line : '            ' + line).join('\n')},
          ),
        ),
      ),
    );
  }
}

// ============================================================================
// DartNova Pure Flutter Component Implementation (Zero Pub Dependencies)
// ============================================================================
${cleanWidgetCode}
`;
}

/**
 * 1-Click Run in DartPad: Copies standalone code and opens DartPad
 */
export async function openInDartPad(comp, props = {}) {
  const code = generateStandaloneFlutterApp(comp, props);
  await copyToClipboard(code);
  
  // DartPad web application
  const dartPadUrl = 'https://dartpad.dev/?null_safety=true';
  window.open(dartPadUrl, '_blank', 'noopener,noreferrer');
  return { success: true };
}

/**
 * 1-Click File Downloader: Downloads .dart file directly into user's downloads
 */
export function downloadDartFile(comp, props = {}) {
  const code = generateStandaloneFlutterApp(comp, props);
  const fileName = `${comp.id}.dart`;
  
  const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
  
  return { success: true, fileName };
}
