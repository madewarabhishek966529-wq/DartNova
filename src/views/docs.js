/**
 * DartNova Documentation View
 * In-depth technical guides for Flutter animation architecture, 16 categories, & integration
 */

import { highlightDart } from '../utils/highlighter.js';
import { CATEGORIES } from '../registry/categories.js';

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
      title: 'DartNova Showcase',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF08090B),
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

  const springExample = `// Example: Pure Flutter Spring Physics Micro-interaction
class NovaSpringScale extends StatefulWidget {
  final Widget child;
  const NovaSpringScale({super.key, required this.child});

  @override
  State<NovaSpringScale> createState() => _NovaSpringScaleState();
}

class _NovaSpringScaleState extends State<NovaSpringScale>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 320),
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.92).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOutQuad),
    );
  }

  @override
  void dispose() {
    _controller.dispose(); // Always dispose controllers to prevent memory leaks
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => _controller.forward(),
      onTapUp: (_) => _controller.reverse(),
      onTapCancel: () => _controller.reverse(),
      child: ScaleTransition(scale: _scaleAnimation, child: widget.child),
    );
  }
}`;

  containerEl.innerHTML = `
    <div style="max-width:960px; margin:0 auto; padding:3rem 1.5rem 6rem; width:100%; display:flex; flex-direction:column; gap:2.5rem;">
      <div style="border-bottom:1px solid var(--border-default); padding-bottom:1.5rem;">
        <span class="badge badge-lime" style="margin-bottom:8px;">Documentation & Architecture</span>
        <h1 style="font-size:2.5rem; letter-spacing:-0.02em; margin-bottom:8px;">DartNova Developer Guide</h1>
        <p style="font-size:1.1rem; color:var(--text-secondary);">
          Everything you need to discover, understand, customize, and implement high-fidelity Flutter motion design.
        </p>
      </div>

      <!-- 1. Executive Summary & Core Principle -->
      <section style="display:flex; flex-direction:column; gap:12px;">
        <h2 style="font-size:1.5rem; color:var(--text-primary);">1. Executive Summary & Core Principles</h2>
        <div style="background:var(--surface-main); border:1px solid var(--border-default); border-radius:12px; padding:1.5rem; display:flex; flex-direction:column; gap:12px;">
          <h3 style="font-size:1.15rem; color:var(--accent-lime);">Discover motion. Preview it instantly. Customize it. Copy the Flutter code.</h3>
          <p style="color:var(--text-secondary); line-height:1.6; font-size:14px;">
            DartNova is a modern, interactive motion UI library and developer showcase for Flutter.
            It provides a catalog of <strong>160 planned components</strong> structured across <strong>16 motion categories</strong>.
            The website is implemented in pure HTML5, CSS3, and vanilla JavaScript for lightweight, instant responsiveness in any modern browser.
            Every component corresponds to a 100% pure Flutter and Dart implementation that developers can drop straight into their projects.
          </p>
          <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:4px;">
            <span class="badge badge-lime">Zero Pub Dependencies</span>
            <span class="badge badge-cyan">60–120 FPS Native Motion</span>
            <span class="badge badge-purple">16 Formal Categories</span>
            <span class="badge badge-amber">100% Free & Open Source</span>
          </div>
        </div>
      </section>

      <!-- 2. The 16 Motion Categories -->
      <section style="display:flex; flex-direction:column; gap:12px;">
        <h2 style="font-size:1.5rem; color:var(--text-primary);">2. The 16 Motion Categories</h2>
        <p style="color:var(--text-secondary); font-size:14px; line-height:1.6;">
          DartNova organizes its 160 components into 16 distinct categories with 10 components each.
          Each category represents a specific UI layer and interaction paradigm:
        </p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px; margin-top:8px;">
          ${CATEGORIES.filter(c => c.id !== 'all').map(cat => `
            <div style="background:var(--surface-elevated); border:1px solid var(--border-default); border-radius:10px; padding:1rem;">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                <span style="font-size:18px;">${cat.icon}</span>
                <h4 style="font-size:14px; color:#FFF; font-weight:600;">${cat.name}</h4>
                <span style="margin-left:auto; font-family:var(--font-mono); font-size:11px; color:var(--accent-primary);">10 widgets</span>
              </div>
              <p style="color:var(--text-muted); font-size:12px; line-height:1.4;">${cat.description}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 3. Flutter Animation Primitives & Architecture -->
      <section style="display:flex; flex-direction:column; gap:12px;">
        <h2 style="font-size:1.5rem; color:var(--text-primary);">3. Flutter Motion Architecture & Best Practices</h2>
        <p style="color:var(--text-secondary); font-size:14px; line-height:1.6;">
          DartNova strictly adheres to official Flutter guidelines. All examples use core Flutter SDK widgets and avoid undocumented external dependencies:
        </p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin-top:8px;">
          <div style="background:var(--surface-elevated); border:1px solid var(--border-default); border-radius:10px; padding:1.25rem;">
            <div style="color:var(--accent-cyan); font-family:var(--font-mono); font-size:12px; font-weight:bold; margin-bottom:6px;">EXPLICIT CONTROLLERS</div>
            <h4 style="font-size:15px; margin-bottom:6px; color:#FFF;">AnimationController & CurvedAnimation</h4>
            <p style="color:var(--text-secondary); font-size:13px; line-height:1.5;">
              Used for micro-interactions, spring bounces, and coordinated multi-stage motion.
              Always pair with <code>SingleTickerProviderStateMixin</code> and dispose in <code>dispose()</code>.
            </p>
          </div>

          <div style="background:var(--surface-elevated); border:1px solid var(--border-default); border-radius:10px; padding:1.25rem;">
            <div style="color:var(--accent-lime); font-family:var(--font-mono); font-size:12px; font-weight:bold; margin-bottom:6px;">IMPLICIT WIDGETS</div>
            <h4 style="font-size:15px; margin-bottom:6px; color:#FFF;">AnimatedContainer & AnimatedSwitcher</h4>
            <p style="color:var(--text-secondary); font-size:13px; line-height:1.5;">
              Declarative state-driven animations for color transitions, layout sizing, and cross-fades without manual controller bookkeeping.
            </p>
          </div>

          <div style="background:var(--surface-elevated); border:1px solid var(--border-default); border-radius:10px; padding:1.25rem;">
            <div style="color:var(--accent-purple); font-family:var(--font-mono); font-size:12px; font-weight:bold; margin-bottom:6px;">VECTOR & PERSPECTIVE</div>
            <h4 style="font-size:15px; margin-bottom:6px; color:#FFF;">Matrix4 & Transform</h4>
            <p style="color:var(--text-secondary); font-size:13px; line-height:1.5;">
              Utilize hardware-accelerated 4x4 matrix transforms (e.g. <code>Matrix4.identity()..setEntry(3, 2, 0.001)</code>) for smooth 3D tilt and perspective card flips.
            </p>
          </div>

          <div style="background:var(--surface-elevated); border:1px solid var(--border-default); border-radius:10px; padding:1.25rem;">
            <div style="color:var(--accent-amber); font-family:var(--font-mono); font-size:12px; font-weight:bold; margin-bottom:6px;">HARDWARE CANVAS</div>
            <h4 style="font-size:15px; margin-bottom:6px; color:#FFF;">CustomPainter & ShaderMask</h4>
            <p style="color:var(--text-secondary); font-size:13px; line-height:1.5;">
              Procedural sine wave backgrounds, radial spotlights, and particle explosions executed directly on the Skia/Impeller canvas.
            </p>
          </div>
        </div>
      </section>

      <!-- 4. Quick Integration Example -->
      <section style="display:flex; flex-direction:column; gap:12px;">
        <h2 style="font-size:1.5rem; color:var(--text-primary);">4. Quick Integration Example</h2>
        <p style="color:var(--text-secondary); font-size:14px;">
          Paste any DartNova component into your Flutter application and invoke it directly with zero pubspec.yaml modifications:
        </p>

        <div style="background:#0c0c0c; border:1px solid var(--border-default); border-radius:12px; overflow:hidden;">
          <div style="padding:10px 16px; background:var(--surface-main); border-bottom:1px solid var(--border-default); display:flex; align-items:center; justify-content:space-between;">
            <span style="font-size:12px; font-family:var(--font-mono); color:var(--text-secondary);">main.dart</span>
            <span class="badge badge-lime">Flutter 3.0+</span>
          </div>
          <pre class="code-pre" style="padding:16px; font-size:13px; overflow-x:auto;"><code>${highlightDart(exampleCode)}</code></pre>
        </div>

        <div style="background:#0c0c0c; border:1px solid var(--border-default); border-radius:12px; overflow:hidden; margin-top:12px;">
          <div style="padding:10px 16px; background:var(--surface-main); border-bottom:1px solid var(--border-default); display:flex; align-items:center; justify-content:space-between;">
            <span style="font-size:12px; font-family:var(--font-mono); color:var(--text-secondary);">spring_scale.dart</span>
            <span class="badge badge-cyan">Zero Dependencies</span>
          </div>
          <pre class="code-pre" style="padding:16px; font-size:13px; overflow-x:auto;"><code>${highlightDart(springExample)}</code></pre>
        </div>
      </section>

      <!-- 5. Performance, Accessibility & Reduced Motion -->
      <section style="display:flex; flex-direction:column; gap:12px;">
        <h2 style="font-size:1.5rem; color:var(--text-primary);">5. Performance & Accessibility (PRD Section 12)</h2>
        <ul style="list-style:disc; padding-left:1.5rem; display:flex; flex-direction:column; gap:8px; color:var(--text-secondary); font-size:14px;">
          <li><strong style="color:var(--text-primary);">Controller Lifecycle:</strong> Always call <code>_controller.dispose()</code> to prevent memory leaks in Flutter State classes.</li>
          <li><strong style="color:var(--text-primary);">RepaintBoundary:</strong> Isolate complex animated painters (such as Particle Motion or Wave Visualizers) inside a <code>RepaintBoundary</code> to prevent unnecessary repainting of the parent tree.</li>
          <li><strong style="color:var(--text-primary);">Reduced Motion:</strong> In Flutter, inspect <code>MediaQuery.of(context).disableAnimations</code> to bypass or simplify transitions for users who have requested reduced motion in their OS settings.</li>
          <li><strong style="color:var(--text-primary);">Web Showcase Clean-up:</strong> In DartNova's web previews, event listeners and requestAnimationFrame loops are automatically destroyed on route switch to guarantee zero tab bloat.</li>
        </ul>
      </section>

      <!-- CTA -->
      <div style="text-align:center; margin-top:2rem;">
        <a href="#playground" class="btn btn-primary" style="padding:0.75rem 2rem; font-size:15px;">
          <span>Explore Interactive Playground</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </div>
  `;
}
