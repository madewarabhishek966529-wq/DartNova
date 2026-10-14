/**
 * DartNova Documentation View
 * In-depth technical guides for Flutter animation architecture & integration
 */

import { highlightDart } from '../utils/highlighter.js';

export function renderDocsView(containerEl, store) {
  const exampleCode = `import 'package:flutter/material.dart';

void main() {
  runApp(const DartNovaApp());
}

class DartNovaApp extends StatelessWidget {
  const DartNovaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF080808),
      ),
      home: const Scaffold(
        body: Center(
          child: NovaPopButton(
            text: 'Explore Motion',
            accentColor: Color(0xFFC5FF35),
          ),
        ),
      ),
    );
  }
}`;

  containerEl.innerHTML = `
    <div style="max-width:960px; margin:0 auto; padding:3rem 1.5rem 6rem; width:100%; display:flex; flex-direction:column; gap:2.5rem;">
      <div style="border-bottom:1px solid var(--border-default); padding-bottom:1.5rem;">
        <span class="badge badge-lime" style="margin-bottom:8px;">Documentation & Architecture</span>
        <h1 style="font-size:2.5rem; letter-spacing:-0.02em; margin-bottom:8px;">DartNova Developer Guide</h1>
        <p style="font-size:1.1rem; color:var(--text-secondary);">
          Everything you need to integrate high-fidelity Flutter motion and interactive UI components.
        </p>
      </div>

      <!-- Core Principle -->
      <section style="display:flex; flex-direction:column; gap:12px;">
        <h2 style="font-size:1.5rem; color:var(--text-primary);">1. The Core Principle</h2>
        <div style="background:var(--surface-main); border:1px solid var(--border-default); border-radius:12px; padding:1.5rem; display:flex; flex-direction:column; gap:10px;">
          <h3 style="font-size:1.1rem; color:var(--accent-lime);">One Visual Idea, Two Implementations</h3>
          <p style="color:var(--text-secondary); line-height:1.6; font-size:14px;">
            DartNova is an interactive HTML, CSS, and JavaScript showcase designed specifically for Flutter developers.
            The interactive browser preview allows you to test timing, spring curves, and pointer tracking in real-time.
            Beside each preview, DartNova generates the corresponding Flutter/Dart code that produces the identical visual behavior using Flutter's core animation primitives.
          </p>
        </div>
      </section>

      <!-- Architecture -->
      <section style="display:flex; flex-direction:column; gap:12px;">
        <h2 style="font-size:1.5rem; color:var(--text-primary);">2. Flutter Animation Architecture</h2>
        <p style="color:var(--text-secondary); font-size:14px; line-height:1.6;">
          Every component in DartNova is built using standard Flutter primitives without requiring third-party Pub packages. 
          The library leverages two primary motion paradigms:
        </p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin-top:8px;">
          <div style="background:var(--surface-elevated); border:1px solid var(--border-default); border-radius:10px; padding:1.25rem;">
            <div style="color:var(--accent-cyan); font-family:var(--font-mono); font-size:12px; font-weight:bold; margin-bottom:6px;">EXPLICIT CONTROLLERS</div>
            <h4 style="font-size:15px; margin-bottom:6px; color:#FFF;">AnimationController & Tweens</h4>
            <p style="color:var(--text-secondary); font-size:13px; line-height:1.5;">
              Used for micro-interactions, wave generators, particle physics, and continuous loops. Managed through <code>SingleTickerProviderStateMixin</code> with careful controller disposal in <code>dispose()</code>.
            </p>
          </div>

          <div style="background:var(--surface-elevated); border:1px solid var(--border-default); border-radius:10px; padding:1.25rem;">
            <div style="color:var(--accent-lime); font-family:var(--font-mono); font-size:12px; font-weight:bold; margin-bottom:6px;">IMPLICIT ANIMATIONS</div>
            <h4 style="font-size:15px; margin-bottom:6px; color:#FFF;">AnimatedContainer & CustomPainter</h4>
            <p style="color:var(--text-secondary); font-size:13px; line-height:1.5;">
              Used for interactive cards, radial pointer glows, and layout expansions. Hardware-accelerated canvas paint operations guarantee 60-120 FPS on mobile and desktop.
            </p>
          </div>
        </div>
      </section>

      <!-- Integration Example -->
      <section style="display:flex; flex-direction:column; gap:12px;">
        <h2 style="font-size:1.5rem; color:var(--text-primary);">3. Quick Integration Example</h2>
        <p style="color:var(--text-secondary); font-size:14px;">
          Paste any DartNova component into your Flutter application and invoke it directly:
        </p>

        <div style="background:#0c0c0c; border:1px solid var(--border-default); border-radius:12px; overflow:hidden;">
          <div style="padding:10px 16px; background:var(--surface-main); border-bottom:1px solid var(--border-default); display:flex; align-items:center; justify-content:space-between;">
            <span style="font-size:12px; font-family:var(--font-mono); color:var(--text-secondary);">main.dart</span>
            <span class="badge badge-lime">Flutter 3.0+</span>
          </div>
          <pre class="code-pre" style="padding:16px; font-size:13px; overflow-x:auto;"><code>${highlightDart(exampleCode)}</code></pre>
        </div>
      </section>

      <!-- Performance & Accessibility -->
      <section style="display:flex; flex-direction:column; gap:12px;">
        <h2 style="font-size:1.5rem; color:var(--text-primary);">4. Performance & Accessibility</h2>
        <ul style="list-style:disc; padding-left:1.5rem; display:flex; flex-direction:column; gap:8px; color:var(--text-secondary); font-size:14px;">
          <li><strong style="color:var(--text-primary);">Controller Lifecycle:</strong> Always call <code>_controller.dispose()</code> to prevent memory leaks in Flutter State classes.</li>
          <li><strong style="color:var(--text-primary);">RepaintBoundary:</strong> Isolate complex animated painters (such as Particle Motion or Wave Animation) inside a <code>RepaintBoundary</code>.</li>
          <li><strong style="color:var(--text-primary);">Reduced Motion:</strong> In Flutter, inspect <code>MediaQuery.of(context).disableAnimations</code> to bypass or simplify transitions for users who prefer reduced motion.</li>
        </ul>
      </section>

      <div style="text-align:center; margin-top:2rem;">
        <a href="#playground" class="btn btn-primary" style="padding:0.75rem 2rem; font-size:15px;">
          <span>Back to Interactive Playground</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </div>
  `;
}
