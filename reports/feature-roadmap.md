# DartNova Prioritized Product Feature Roadmap & Backlog

**Document Identifier:** `DN-ROADMAP-2026`  
**Product:** DartNova — Motion for Flutter  
**Author:** Senior Product Manager & Full-Stack Lead  
**Scope:** Strategic, prioritized feature recommendations designed specifically for the Flutter motion ecosystem.

---

## 1. Backlog Prioritization Methodology

Features are evaluated against the core product mission:
> *"Discover motion. Preview it instantly. Customize it. Copy the Flutter code."*

### Priority Definitions:
- **P0 — Critical:** Urgent security, build pipeline, or data integrity necessity.
- **P1 — High:** Major workflow enhancement that directly increases developer conversion, adoption, or animation fidelity.
- **P2 — Medium:** Meaningful productivity, comparison, or integration capabilities for active Flutter engineers.
- **P3 — Low:** Optional polish, offline convenience, or experimental visual delight.

---

## 2. Top 10 Prioritized Feature Specifications

### Feature 1: Automated Tooling Upgrade & Security Hardening (Vite 6+ / Vitest 3+)
- **Priority:** **P0 (Critical Security & Build Integrity)**
- **Complexity:** Low
- **Description:** Upgrades `vite`, `vitest`, `esbuild`, and `tinypool` to latest patched releases to resolve the 6 upstream advisories identified in `npm audit`.
- **Problem it Solves:** Eliminates prototype pollution and path traversal warnings in the local build pipeline.
- **Target Users:** All developers and CI/CD pipelines building DartNova.
- **User Benefit:** Clean security posture, faster build times, and compatibility with modern ESM loaders.
- **Dependencies:** `package.json`, `vite.config.js`.
- **Potential Risks:** Minor Vitest configuration API syntax changes.
- **Acceptance Criteria:**
  - `npm audit` reports 0 vulnerabilities.
  - All 37 automated tests in `tests/` pass without error.
  - `npm run build` succeeds cleanly.
- **Implementation Approach:** Run `npm install -D vite@latest vitest@latest`, update `vite.config.js` if needed, and verify test suite.

---

### Feature 2: Interactive Animation Timeline Scrubber & Frame Inspector
- **Priority:** **P1 (High)**
- **Complexity:** Medium
- **Description:** A horizontal timeline slider beneath the preview canvas allowing developers to scrub progress from `0.0` to `1.0` (0% to 100%), pause at any micro-second, and inspect intermediate animation frames.
- **Problem it Solves:** Fast animations (150–300 ms) are difficult to inspect frame-by-frame; developers need to verify precise curves and settle behaviors.
- **Target Users:** Motion designers and senior Flutter engineers fine-tuning micro-interactions.
- **User Benefit:** Precise inspection of curve easing, overshoot, and settle states.
- **Dependencies:** `src/playground/preview.js`, Web Animations API / CSS animation playback control.
- **Potential Risks:** Syncing CSS keyframe timeline progress across complex nested SVGs.
- **Acceptance Criteria:**
  - Playback scrubber controls animation progress linearly from `0.0` to `1.0`.
  - Pause button stops animation at current frame.
  - Playback speed switcher (0.25x, 0.5x, 1x, 2x).
- **Implementation Approach:** Bind `animation.currentTime` or CSS animation-play-state with an interactive range slider dock control.

---

### Feature 3: Visual Bezier Curve & Easing Curve Customizer
- **Priority:** **P1 (High)**
- **Complexity:** Medium
- **Description:** An interactive cubic-bezier curve visualizer with drag handles directly mapped to Flutter `Curves` (e.g. `Curves.easeOutBack`, `Curves.easeInOutCubic`, `Curves.elasticOut`, or custom `Cubic(a, b, c, d)`).
- **Problem it Solves:** Developers often want to tweak the bounce or overshoot curve without guessing numerical cubic coordinates.
- **Target Users:** Flutter developers looking for custom physics and branded animation timing.
- **User Benefit:** Real-time visual feedback on timing curves with direct Flutter `Cubic(x1, y1, x2, y2)` code generation.
- **Dependencies:** `src/playground/controls.js`, `src/utils/code-generator.js`.
- **Potential Risks:** Extreme bezier coordinates producing negative scale or visual clipping.
- **Acceptance Criteria:**
  - SVG curve graph with 2 draggable control points.
  - Instant live preview of curve on active component.
  - Generated Flutter snippet outputs `curve: const Cubic(...)` automatically.
- **Implementation Approach:** Implement an interactive 2D SVG canvas in the property controls dock that updates `componentProps.curve`.

---

### Feature 4: Flutter Widget Test Suite Generator
- **Priority:** **P1 (High)**
- **Complexity:** Medium
- **Description:** A 4th tab in the VS Code IDE panel named **"Widget Test"** that generates complete, production-ready `testWidgets()` code for testing the animated widget in Flutter.
- **Problem it Solves:** Flutter teams require unit and widget tests for animations to prevent regressions, but writing pump, settle, and ticker tests manually is tedious.
- **Target Users:** Professional Flutter engineers and QA automation teams.
- **User Benefit:** Copy-paste ready `tester.pumpAndSettle()`, gesture taps, and scale assertion code.
- **Dependencies:** `src/playground/code-panel.js`, `src/utils/code-generator.js`.
- **Potential Risks:** Different widget types require different assertion triggers (taps vs timers).
- **Acceptance Criteria:**
  - Code panel includes "Test" tab alongside "Usage", "Full", and "Params".
  - Generates valid Flutter test code importing `flutter_test/flutter_test.dart`.
  - Tested by Dart analyzer.
- **Implementation Approach:** Add template generator in `code-generator.js` generating standard `testWidgets('should animate on tap', (WidgetTester tester) async { ... })`.

---

### Feature 5: One-Click Full Project .ZIP Exporter
- **Priority:** **P2 (Medium)**
- **Complexity:** Low
- **Description:** Allows developers to select one or multiple components and export a complete, runnable Flutter project bundle as a `.zip` file with `pubspec.yaml`, `lib/main.dart`, and `lib/widgets/`.
- **Problem it Solves:** Currently, developers must copy-paste code into an existing project. A ready-to-run template allows testing in VS Code or Android Studio in seconds.
- **Target Users:** Engineers prototyping ideas or creating client demos.
- **User Benefit:** Zero boilerplate setup; unzip, run `flutter run`, and view live on device.
- **Dependencies:** `jszip` (or lightweight client zip generator).
- **Potential Risks:** Keeping `pubspec.yaml` aligned with latest Flutter SDK constraints.
- **Acceptance Criteria:**
  - "Export Flutter Project (.zip)" button in playground toolbar.
  - Generates zip containing valid `pubspec.yaml`, `main.dart`, and widget source files.
  - Unzips cleanly and builds with `flutter analyze`.
- **Implementation Approach:** Dynamically assemble project files in memory as text and trigger a browser zip download.

---

### Feature 6: Side-by-Side Component Comparison Diff Tool
- **Priority:** **P2 (Medium)**
- **Complexity:** Medium
- **Description:** A split-screen comparison mode allowing developers to select two different components (e.g., `pop-button` vs `elastic-button`, or `orbit-loader` vs `liquid-loader`) to compare animation timing, feel, and Flutter implementations side-by-side.
- **Problem it Solves:** Teams frequently debate between multiple animation styles for a given UI interaction.
- **Target Users:** Product managers, UX designers, and frontend leads.
- **User Benefit:** Rapid decision-making and visual A/B evaluation before implementation.
- **Dependencies:** `src/playground/preview.js`, `src/state.js`.
- **Potential Risks:** Doubling render cycles if both components have heavy particle loops.
- **Acceptance Criteria:**
  - Dual canvas workspace with two independent component selectors.
  - Synchronized "Replay Both" trigger.
  - Side-by-side Flutter code diff.
- **Implementation Approach:** Create a `split-preview` layout mode in `src/playground/preview.js` mounting two active component instances.

---

### Feature 7: Impeller & GLSL Live Fragment Shader Editor
- **Priority:** **P2 (Medium)**
- **Complexity:** High
- **Description:** For the 26 Shaders & Impeller Canvas components (`category: shaders`), provide a browser-based GLSL code editor with instant canvas preview and Flutter `.frag` asset generation.
- **Problem it Solves:** Flutter 3.7+ uses Impeller and `FragmentProgram`, but writing GLSL shaders and hooking them up in Dart is complex.
- **Target Users:** Advanced Flutter developers building high-performance graphical effects.
- **User Benefit:** Real-time WebGL shader preview with direct Flutter `FragmentProgram` and `FragmentShader` code parity.
- **Dependencies:** WebGL canvas context, `src/registry/visualizers`.
- **Potential Risks:** Older client GPUs with limited WebGL 2.0 support.
- **Acceptance Criteria:**
  - Editable GLSL uniform parameters (resolution, time, touch coordinates).
  - WebGL canvas rendering fragment shader at 60 FPS.
  - 1-click download of both `.frag` file and Dart wrapper widget.
- **Implementation Approach:** Integrate a lightweight WebGL shader runner canvas into the `shaders` category visualizers.

---

### Feature 8: Dynamic Dark/Light Theme Aware Flutter Code Generator
- **Priority:** **P2 (Medium)**
- **Complexity:** Low
- **Description:** Toggle in the code panel that switches snippet output from hardcoded colors (`Color(0xFFC5FF35)`) to theme-aware Flutter tokens (`Theme.of(context).colorScheme.primary`).
- **Problem it Solves:** Production apps use dynamic Material 3 design tokens rather than hardcoded hex constants.
- **Target Users:** Enterprise Flutter teams with established design systems.
- **User Benefit:** Production-ready code that integrates seamlessly into existing light and dark theme architectures.
- **Dependencies:** `src/utils/code-generator.js`.
- **Potential Risks:** None.
- **Acceptance Criteria:**
  - Switcher button: "Hardcoded Hex" vs "Material 3 Theme Tokens".
  - Code snippet updates dynamically to use `Theme.of(context).colorScheme...`.
- **Implementation Approach:** Add token replacement mapping in `generateDynamicSnippet()` when `useThemeTokens` is enabled in store.

---

### Feature 9: Offline Progressive Web App (PWA) Support
- **Priority:** **P3 (Low / Convenience)**
- **Complexity:** Low
- **Description:** Adds a service worker and web manifest enabling DartNova to be installed on desktop/mobile and used entirely offline.
- **Problem it Solves:** Developers frequently code on trains, flights, or with intermittent internet access.
- **Target Users:** Traveling developers and conference attendees.
- **User Benefit:** Full access to all 468 component previews and Flutter code offline.
- **Dependencies:** `vite-plugin-pwa` or standalone `sw.js`.
- **Potential Risks:** Service worker caching stale assets during updates.
- **Acceptance Criteria:**
  - "Install App" prompt supported in Chrome/Edge.
  - Page loads and functions with network disabled.
- **Implementation Approach:** Register standard Cache-First service worker caching HTML, CSS, JS chunks, and fonts.

---

### Feature 10: Community Component Submission Pipeline
- **Priority:** **P3 (Community Growth)**
- **Complexity:** Medium
- **Description:** A GitHub-backed contribution guide and CLI schema validator (`npm run validate:component`) that allows community Flutter developers to submit new motion components via Pull Requests.
- **Problem it Solves:** Expanding the catalog beyond 468 components by leveraging the global Flutter open-source community.
- **Target Users:** Open-source Flutter contributors.
- **User Benefit:** Constantly expanding motion catalog without central maintenance bottlenecks.
- **Dependencies:** JSON schema, GitHub Actions PR validation workflow.
- **Potential Risks:** Low-quality or non-standard PR submissions.
- **Acceptance Criteria:**
  - Automated test validates component schema (id, name, description, render function, flutterSnippet, zero pub deps).
  - Contributor documentation in `CONTRIBUTING.md`.
- **Implementation Approach:** Implement a Vitest schema validator checking all submitted component objects against PRD standards.

---

## 3. Prioritized Implementation Summary Table

| Rank | Feature Name | Priority | Complexity | Target Release | Business & UX Value |
|:---:|---|:---:|:---:|:---:|---|
| **1** | Tooling Upgrade & Security Hardening | **P0** | Low | v1.1 | Resolves all 6 `npm audit` advisories |
| **2** | Interactive Animation Timeline Scrubber | **P1** | Medium | v1.1 | Frame-by-frame precision for motion designers |
| **3** | Visual Bezier Curve Customizer | **P1** | Medium | v1.2 | Direct Flutter `Cubic()` curve tuning |
| **4** | Flutter Widget Test Suite Generator | **P1** | Medium | v1.2 | Automated QA tests for all 468 widgets |
| **5** | Dynamic Dark/Light Theme Aware Code | **P2** | Low | v1.2 | Enterprise Material 3 design token parity |
| **6** | Side-by-Side Component Diff Tool | **P2** | Medium | v1.3 | Fast visual & code A/B comparison |
| **7** | One-Click Project .ZIP Exporter | **P2** | Low | v1.3 | Instant zero-boilerplate project testing |
| **8** | Impeller & GLSL Live Fragment Shader Editor | **P2** | High | v1.4 | Unlocks advanced Flutter 3.7+ shader development |
| **9** | Offline Progressive Web App (PWA) | **P3** | Low | v1.4 | 100% offline access for traveling engineers |
| **10**| Community Submission Pipeline & Validator | **P3** | Medium | v1.5 | Scales motion catalog to 1,000+ widgets |
