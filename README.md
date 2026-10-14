# DartNova ⚡

**Motion for Flutter**  
*Discover motion. Preview it instantly. Customize it. Copy the Flutter code.*

[![Flutter 3.0+](https://img.shields.io/badge/Flutter-3.0+-02569B?logo=flutter&logoColor=white)](https://flutter.dev)
[![Dart 3.0+](https://img.shields.io/badge/Dart-3.0+-0175C2?logo=dart&logoColor=white)](https://dart.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Components](https://img.shields.io/badge/Catalog-160_Components-C5FF35?colorA=111318&colorB=C5FF35&style=flat)](#)
[![Zero Pub Dependencies](https://img.shields.io/badge/Pub_Dependencies-0-42E8F5?colorA=111318&colorB=42E8F5&style=flat)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-9B7CFF?colorA=111318&colorB=9B7CFF&style=flat)](LICENSE)

---

## 🌟 Product Vision & Executive Summary

**DartNova** is a modern, interactive motion UI library and developer showcase for Flutter developers. It provides a curated collection of **160 animated UI components, interactive effects, transitions, loaders, gestures, backgrounds, and advanced motion experiments** across **16 formal motion categories**.

Developers can browse components, interact with live browser previews, customize animation parameters, inspect pure Flutter/Dart implementations, copy code with a single click, and integrate the components into their Flutter applications.

### Core Principles
- **One visual idea, two implementations:** HTML, CSS, and modern JavaScript power the interactive browser preview; clean Flutter and Dart code provide the exact implementation for Flutter apps.
- **Zero external Pub dependencies:** Every Flutter component uses built-in Flutter primitives (`AnimationController`, `Tween`, `AnimatedContainer`, `CustomPainter`, `Matrix4`, `GestureDetector`, etc.).
- **Live interaction:** Every browser preview is a real interaction, not a static illustration.
- **Accessibility first:** Built-in keyboard navigation and `prefers-reduced-motion` compliance.

---

## ✨ Brand & Visual Design System (PRD Section 6.2)

DartNova adopts a dark cinematic, high-contrast, motion-focused visual identity:

| Token | Hex / Value | Purpose |
|---|---|---|
| `--bg-primary` | `#08090B` | Main dark canvas |
| `--surface-main` | `#111318` | Cards and panels |
| `--surface-elevated` | `#191C23` | Hovered cards, overlays, and sidebars |
| `--accent-lime` | `#C5FF35` | Primary accent and actions |
| `--accent-cyan` | `#42E8F5` | Secondary highlights and particle telemetry |
| `--accent-purple` | `#9B7CFF` | Advanced motion accents and glows |
| `--text-primary` | `#F5F7FA` | Headings and main text |
| `--text-secondary` | `#A1A7B3` | Supporting text |
| `--border-default` | `#2A2E38` | Dividers and panel outlines |

---

## 📚 16 Motion Categories (160 Components Total)

The catalog is structured into 16 categories with exactly 10 components each:

1. **Category 1 — Buttons and Interactive Controls** (Magnetic Button, Neon Glow, Liquid Fill, Shimmer, 3D Press, Elastic Bounce, Border Beam, Gradient Shift, Particle Burst, Morphing Icon)
2. **Category 2 — Cards and Surfaces** (3D Tilt Card, Cursor-Follow, Glassmorphism, Holographic, Spotlight, Floating Card, Flip Profile, Expandable, Stacked Deck, Liquid Border)
3. **Category 3 — Text and Typography** (Typewriter Text, Text Reveal Mask, Character Stagger, Word-by-Word, Gradient Flow, Glitch Text, Scramble, Text Wave, Kinetic Typography, Morphing Text)
4. **Category 4 — Loaders and Progress** (Orbit Loader, Particle Loader, Liquid Loader, Circular Progress Ring, Wave Loader, Dot Matrix, Morphing Blob, Skeleton Shimmer, Segmented Progress, Animated Counter)
5. **Category 5 — Navigation and Menus** (Animated Bottom Nav, Floating Dock, Expanding Menu, Radial Menu, Morphing Hamburger, Animated Sidebar, Liquid Tab Indicator, Pill Tab Switcher, Breadcrumb Reveal, FAB Menu)
6. **Category 6 — Page and Route Transitions** (Fade Through, Shared-Axis, Hero Image Transition, Circular Page Reveal, 3D Cube, Diagonal Wipe, Zoom Page, Slide-and-Fade, Morphing Container, Liquid Page Transition)
7. **Category 7 — Modals, Dialogs and Overlays** (Spring Modal, Bottom Sheet Slide, Expandable Bottom Sheet, Blur-Backdrop Dialog, Fullscreen Modal, Toast Pop-In, Snackbar Slide, Tooltip Reveal, Popover Morph, Notification Stack)
8. **Category 8 — Gestures and Physics** (Swipe-to-Dismiss, Rubber-Band Drag, Spring Drag Object, Swipe Carousel, Pull-to-Refresh, Draggable Floating Widget, Inertial Scrolling, Elastic Overscroll, Swipe Actions, Gesture Reveal)
9. **Category 9 — Backgrounds and Ambient Effects** (Animated Gradient Mesh, Aurora Background, Floating Particles, Starfield Motion, Interactive Constellation, Liquid Blob, Wave Background, Animated Grid, Noise Gradient, Cursor Spotlight)
10. **Category 10 — 3D and Perspective Effects** (3D Flip Tile, 3D Rotating Cube, Parallax Depth Card, 3D Carousel, Perspective Image Tilt, Orbiting Elements, Rotating Product, 3D Layered Stack, Perspective Text, Interactive Globe)
11. **Category 11 — Images and Media** (Image Zoom Reveal, Ken Burns Image, Image Comparison Slider, Diagonal Reveal, Image Blur-to-Sharp, Image Mask Transition, Animated Avatar Group, Circular Image Reveal, Masonry Entrance, Video Thumbnail Hover)
12. **Category 12 — Charts and Data Visualization** (Animated Line Chart, Growing Bar Chart, Donut Chart Reveal, Radial Statistics, Animated Area Chart, Number Flip Counter, Gauge Meter, Sparkline Reveal, Animated Heatmap, Progress Dashboard Cards)
13. **Category 13 — Forms and Feedback** (Floating Label Input, Animated Focus Border, Success Checkmark, Error Shake Input, Password Strength Meter, OTP Input Animation, Checkbox Draw, Radio Ripple, Toggle Morph, Form Step Transition)
14. **Category 14 — Lists and Collections** (Staggered List Entrance, Animated Grid Entrance, Expandable List Item, Drag-Reorder List, Swipeable List Row, Animated Search Results, Filter Chip Transition, List Item Morph, Infinite Scroll Reveal, Animated Empty State)
15. **Category 15 — Icons and Micro-interactions** (Heart Pop Animation, Bell Ring, Bookmark Morph, Like Burst, Icon Spin Transition, Icon Draw-On, Copy Success Animation, Theme Switch Animation, Cart Add Animation, Drag Handle Feedback)
16. **Category 16 — Advanced Motion Experiments** (Particle Explosion, Text-to-Particle, SVG Path Drawing, Morphing SVG Shapes, Liquid Metal, Fluid Cursor Trail, Magnetic Cursor Field, Waveform Visualizer, Animated Logo Reveal, Confetti Celebration)

---

## 🛠️ Technical Architecture

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
│   ├── router.js                # Hash-based client router (#landing, #playground, #favorites, #docs)
│   ├── state.js                 # Centralized reactive state store
│   ├── registry/
│   │   ├── categories.js        # 16 formal motion categories + 'all'
│   │   ├── roadmap-components.js# 134 roadmap specifications with SVG preview renderers
│   │   └── components.js        # Complete 160 component registry
│   ├── playground/
│   │   ├── navigation.js        # Sidebar search, 16 categories, status filters, sorting, favorites
│   │   ├── preview.js           # Center preview canvas, viewport modes, background styles, status badges
│   │   ├── controls.js          # Dynamic property controls dock (sliders, colors, text)
│   │   └── code-panel.js        # Flutter code viewer, tabs, copy-to-clipboard, dependency notes
│   ├── views/
│   │   ├── landing.js           # Hero, featured catalog, 16 categories showcase, workflow, footer
│   │   └── docs.js              # Technical architecture and Flutter integration guide
│   └── utils/
│       ├── favorites.js         # Reactive localStorage favorites system
│       ├── clipboard.js         # Modern clipboard utility with fallback
│       ├── highlighter.js       # Custom syntax highlighter for Dart & Flutter
│       └── accessibility.js     # Reduced-motion queries & keyboard shortcuts
├── styles/
│   ├── tokens.css               # Design system CSS custom properties (PRD 6.2 colors)
│   ├── base.css                 # Typography, resets, scrollbars, utility classes
│   ├── layout.css               # Header, mobile drawer, layout containers
│   ├── landing.css              # Hero section, catalog filter bar, cards, categories, footer
│   ├── playground.css           # 3-column workspace, dock controls, code viewer
│   └── components.css           # Keyframe animations and styles
├── examples/
│   └── flutter/
│       ├── pubspec.yaml         # Pure Flutter package (0 external pub dependencies)
│       ├── lib/                 # Standalone Flutter widget source files
│       └── test/
│           └── dartnova_test.dart # Flutter widget tests
└── tests/
    ├── registry.test.js         # 160 components & 16 categories tests
    ├── favorites.test.js        # Favorites localStorage persistence tests
    ├── highlighter.test.js      # Syntax highlighter unit tests
    └── state.test.js            # Reactive state store tests
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+` (or `v20+`)
- Flutter SDK `3.0+` (optional, for running the Flutter test suite)

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

### Website Automated Tests (JavaScript / Vitest)
Run the automated Vitest test suite covering 160 components, 16 categories, favorites, syntax highlighter, and state management:
```bash
npm test
```

### Flutter Examples Tests
Run Flutter analyzer and widget tests:
```bash
cd examples/flutter
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
| `⌘K` or `/` | Focus component search input or open Command Palette |
| `R` | Restart current component animation |
| `Space` | Play / Pause playback |
| `Escape` | Close search / mobile drawer / modal |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

Developed with ⚡ by **Abhishek Madewar**.
