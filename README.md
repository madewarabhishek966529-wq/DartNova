# DartNova ⚡

**Motion for Flutter**  
*Explore motion. Preview interactions. Copy Flutter code.*

[![Flutter 3.0+](https://img.shields.io/badge/Flutter-3.0+-02569B?logo=flutter&logoColor=white)](https://flutter.dev)
[![Dart 3.0+](https://img.shields.io/badge/Dart-3.0+-0175C2?logo=dart&logoColor=white)](https://dart.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Zero Pub Dependencies](https://img.shields.io/badge/Pub_Dependencies-0-C5FF35?colorA=111111&colorB=C5FF35&style=flat)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-A78BFA?colorA=111111&colorB=A78BFA&style=flat)](LICENSE)

---

## 🌟 Product Vision

**DartNova** is an interactive UI motion library and developer showcase for Flutter developers. 

Developers explore components through live, high-performance browser previews, fine-tune dynamic properties (speed, duration, spring physics, color tints, angles), and instantly view the corresponding Flutter/Dart implementation beside each preview. With one click, they can copy production-ready widget code and drop it straight into their Flutter apps.

### Core Principle: One Visual Idea, Two Implementations
- **HTML, CSS, and Vanilla JavaScript** power the lightweight interactive web demonstration.
- **Flutter and Dart** provide the implementation that developers use in their applications.

No third-party packages or heavy dependencies required. Every Flutter component is constructed using core Flutter primitives (`AnimationController`, `Tween`, `AnimatedBuilder`, `AnimatedContainer`, `CustomPainter`, `Matrix4`, `GestureDetector`, and `MouseRegion`).

---

## ✨ Design System

DartNova adopts a dark, high-contrast, motion-focused visual identity:

| Token | Hex / Value | Description |
|---|---|---|
| `--bg-primary` | `#080808` | Deep matte obsidian background |
| `--surface-main` | `#111111` | Primary cards and app headers |
| `--surface-elevated` | `#181818` | Elevated dialogs and sidebars |
| `--surface-hover` | `#222222` | Active item hover surface |
| `--border-default` | `#292929` | Ultra-thin geometric borders |
| `--text-primary` | `#F5F5F5` | High-legibility crisp text |
| `--text-secondary` | `#A0A0A0` | Balanced subtitle text |
| `--text-muted` | `#707070` | Subtle metadata and labels |
| `--accent-lime` | `#C5FF35` | Electric neon lime brand accent |
| `--accent-cyan` | `#38DDF8` | Cyan particle and focus highlight |
| `--accent-purple` | `#A78BFA` | Atmospheric purple ambient glow |

---

## 📚 Component Catalog (26 Production Motion Components)

### Category A — Buttons & Micro-interactions
1. **Pop Button (`pop-button`)** — Bouncy spring press response with dynamic scale feedback and neon halo aura.
2. **Radial Glow Button (`radial-glow-button`)** — Tracks pointer coordinates to cast a high-precision radial gradient spotlight.
3. **Corner Button (`corner-button`)** — 45-degree polygon beveled corner button with active indicator dot.
4. **Magnetic Button (`magnetic-button`)** — Attracts the button toward the pointer using physical proximity vectors.
5. **Spring Speed Dial FAB (`spring-fab`)** — Floating Action Button that unfolds speed-dial action icons using realistic spring damping physics.
6. **Fluid Tab Bar (`fluid-tab-bar`)** — Segmented control bar with fluid sliding pill and smooth spring interpolation.

### Category B — Text & Transitions
7. **Typing Text (`typing-text`)** — Character-by-character typewriter reveal with blinking neon cursor.
8. **Text Reveal (`text-reveal`)** — Masked geometric slide-up reveal with cubic-bezier easing.
9. **Staggered Text (`staggered-text`)** — Sequentially animates words into view with staggered index delays.
10. **Kinetic Marquee (`kinetic-marquee`)** — Infinite hardware-accelerated kinetic typography ticker with pause-on-hover.

### Category C — Cards & Images
11. **Cursor Card (`cursor-card`)** — 3D perspective card tilt with specular light reflection following cursor.
12. **Image Trail (`image-trail`)** — Dynamic thumbnail stamps trailing along pointer motion with organic drift.
13. **Diagonal Carousel (`diagonal-carousel`)** — Angled skew card track with smooth prev/next translation and focal zoom.
14. **Animated Card Stack (`animated-card-stack`)** — Overlapping physical card deck that cascades and fans out on tap.
15. **Swipeable Physics Card (`swipeable-card`)** — Card gesture component with spring-back physics and velocity dismissal.
16. **Glow Pulse Card (`glow-card`)** — High-tech telemetry card with continuous breathing neon aura and live pulse wave.

### Category D — Avatars & Tooltips
17. **Avatar Group (`avatar-group`)** — Overlapping social avatars that expand, scale, and bring profiles to front.
18. **Tooltip Avatars (`tooltip-avatars`)** — Detailed user badge with animated floating card popover on hover or tap.

### Category E — Backgrounds & Visual Effects
19. **Animated Gradient (`animated-gradient`)** — Smooth shifting multi-stop ambient gradient mesh background.
20. **Wave Animation (`wave-animation`)** — Multi-layer organic sine waves rendered on canvas with customizable amplitude.
21. **Neon Gradient Effect (`neon-gradient`)** — Electric animated gradient border aura with double-layer soft blur diffusion.
22. **Particle Motion (`particle-motion`)** — Dynamic constellation of particles connected by distance-based affinity vectors.
23. **Animated Welcome Screen (`animated-welcome-screen`)** — Onboarding sequence with progressive typography entrance and CTA.
24. **Spotlight Effect (`spotlight-effect`)** — Pointer-following circular beam that illuminates dark textured surfaces.
25. **Shimmer Effect (`shimmer-effect`)** — Iridescent high-speed linear gradient wave sweeping across placeholder skeletons.
26. **Procedural Neon Gauge (`neon-gauge`)** — Hardware-accelerated radial meter rendered via CustomPainter with glowing sweep.

---

## 🛠️ Project Architecture

```text
dartnova/
├── index.html                   # Semantic HTML5 shell with responsive viewports
├── favicon.svg                  # Brand favicon icon
├── package.json                 # Node dependencies and scripts
├── vite.config.js               # Vite build and test configuration
├── assets/
│   └── icons/
│       └── logo.svg             # DartNova neon lime lightning logo
├── src/
│   ├── main.js                  # Application controller & view switcher
│   ├── router.js                # Hash-based client router (#landing, #playground, #docs)
│   ├── state.js                 # Centralized reactive state store
│   ├── registry/
│   │   └── components.js        # 20 component registry with renderers & Flutter code
│   ├── playground/
│   │   ├── navigation.js        # Sidebar search, category accordion, items list
│   │   ├── preview.js           # Center preview canvas, viewport modes, background styles
│   │   ├── controls.js          # Dynamic property controls dock (sliders, colors, text)
│   │   └── code-panel.js        # Flutter code viewer, tabs, copy-to-clipboard
│   ├── views/
│   │   ├── landing.js           # Hero, featured cards grid, motion categories, workflow
│   │   └── docs.js              # Technical architecture and Flutter integration guide
│   └── utils/
│       ├── clipboard.js         # Modern clipboard utility with fallback
│       ├── highlighter.js       # Custom syntax highlighter for Dart & Flutter
│       └── accessibility.js     # Reduced-motion queries & keyboard shortcuts
├── styles/
│   ├── tokens.css               # Design system CSS custom properties
│   ├── base.css                 # Typography, resets, scrollbars, utility classes
│   ├── layout.css               # Header, mobile drawer, layout containers
│   ├── landing.css              # Hero section, featured cards, workflow steps, footer
│   ├── playground.css           # 3-column workspace, dock controls, code viewer
│   └── components.css           # Keyframe animations and styles for all 20 components
├── examples/
│   └── flutter/
│       ├── pubspec.yaml         # Flutter package configuration
│       ├── README.md            # Flutter usage guide
│       ├── lib/                 # Standalone Flutter widget source files
│       │   ├── dartnova.dart
│       │   ├── buttons/
│       │   ├── text/
│       │   ├── cards/
│       │   ├── avatars/
│       │   └── effects/
│       └── test/
│           └── dartnova_test.dart # Flutter widget tests
└── tests/
    ├── registry.test.js         # Component registry unit tests
    ├── highlighter.test.js      # Syntax highlighter unit tests
    └── state.test.js            # Reactive state store tests
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+` (or `v20+`)
- Flutter SDK `3.0+` (optional, for running the Flutter examples and tests)

### Installation
```bash
git clone https://github.com/madewarabhishek966529-wq/DartNova.git
cd DartNova
npm install
```

### Run Locally (Dev Server)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing

### Website Automated Tests (JavaScript)
Run the automated Vitest test suite covering registry completeness, syntax highlighter, and state management:
```bash
npm test
```

### Flutter Examples Tests
Run Flutter analyzer and widget tests:
```bash
cd examples/flutter
flutter analyze
flutter test
```

---

## 📦 Production Build & Deployment

Build the static web application:
```bash
npm run build
```
The optimized static bundle is generated in `dist/`. DartNova can be hosted on GitHub Pages, Vercel, Netlify, or any static hosting service with zero server-side runtime requirements.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `/` | Focus component search input |
| `R` | Restart current component animation |
| `Space` | Play / Pause playback |
| `Escape` | Close search / mobile drawer |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

Developed with ⚡ by **Abhishek Madewar**.
