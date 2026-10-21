# DartNova Feature & Architecture Inventory

**Document Identifier:** `DN-FEAT-INV-2026`  
**Application:** DartNova — Motion for Flutter  
**Scope:** Complete catalog of all views, components, modules, APIs, routing, and developer capabilities.

---

## 1. Architectural Architecture Overview

DartNova is built as an ultra-responsive, zero-framework, static single-page application (SPA) optimized for developer experience:
- **Core Architecture:** Vanilla HTML5, CSS3 Custom Properties (Tokens), and modern ES Modules (ESM).
- **Tooling & Build Engine:** Vite 5.4.21, Rollup chunking, Vitest 2.1 with Happy-DOM.
- **Client State Store:** Centralized reactive Pub/Sub store (`src/state.js`) managing active view, component selection, filters, props, layout states, and audio settings.
- **Client Routing:** Hash-based client router (`#landing`, `#playground`, `#playground/:id`, `#favorites`, `#docs`, `#components`, `#categories`).
- **Data Persistence:** Client-side HTML5 `localStorage` for favorites, theme, and audio preferences. Zero database or backend runtime requirements.

```
                    ┌───────────────────────────┐
                    │  Hash Router (#playground)│
                    └─────────────┬─────────────┘
                                  │ Dispatches state
                                  ▼
                    ┌───────────────────────────┐
                    │   Central Store (Pub/Sub) │
                    └──────┬──────────────┬─────┘
                           │              │
             ┌─────────────┴──────┐ ┌─────┴──────────────┐
             ▼                    ▼ ▼                    ▼
     Landing View          Playground View           Docs View
  (Hero, Search,        ┌──────────────────┐     (Architecture,
   Featured Cards,      │ Sidebar Nav      │      Guides, Code)
   18 Categories)       │ Live Canvas      │
                        │ Controls Dock    │
                        │ Bento Gallery    │
                        │ VS Code IDE Code │
                        └──────────────────┘
```

---

## 2. Page & Route Inventory

| Route Path | View Component | Description | Access / Roles | Test Status |
|---|---|---|---|---|
| `#landing` / `` | `renderLandingView` | Landing page featuring hero, quick search, 6 featured animations, 18 category cards, developer workflow, and footer. | Public | **PASS** |
| `#playground` | `setupPreview`, `setupNavigation` | Interactive developer playground defaulting to `pop-button` in Inspector mode. | Public | **PASS** |
| `#playground/:id` | `setupPreview`, `setupCodePanel` | Direct link to specific component inspector and code panel (e.g. `#playground/cursor-card`). | Public | **PASS** |
| `#favorites` | `setupNavigation` | Playground view filtered strictly to user's favorited components (`favoritesOnly: true`). | Public | **PASS** |
| `#docs` | `renderDocsView` | Technical documentation, architecture guides, and standalone Flutter implementation examples. | Public | **PASS** |
| `#components` | Anchor Scroll | Smooth scroll to `#featured-components` on the landing page. | Public | **PASS** |
| `#categories` | Anchor Scroll | Smooth scroll to `#categories-showcase` on the landing page. | Public | **PASS** |
| `/*` (Invalid Route) | Route Fallback | Fallback to `#landing` view with safe default state. | Public | **PASS** |

---

## 3. Motion Categories Inventory (18 Formal Categories · 468 Components)

The catalog contains **18 formal motion categories**, each containing exactly **26 production-ready components** (totaling 468 components):

| Category ID | Display Name | Icon | Component Count | Motion Specialization | Status |
|---|---|:---:|:---:|---|---|
| `buttons` | Buttons & Controls | 👆 | 26 | Micro-interactions, magnetic pull, neon glows, liquid fills, and elastic press physics | **PASS** |
| `cards` | Cards & Surfaces | 🎴 | 26 | 3D perspective tilts, specular light reflections, holographic foils, and glassmorphism | **PASS** |
| `text` | Text & Typography | ✨ | 26 | Typewriter tickers, kinetic tickers, masked reveals, and character staggers | **PASS** |
| `loaders` | Loaders & Progress | ⏳ | 26 | Orbital rings, particle swirls, liquid blobs, dot matrices, and skeleton shimmers | **PASS** |
| `navigation` | Navigation & Menus | 🧭 | 26 | Fluid tab bars, floating docks, radial menus, expanding sidebars, and FAB speed dials | **PASS** |
| `transitions` | Page & Route Transitions | 🔀 | 26 | Shared-axis, hero image transitions, 3D cube rotations, diagonal wipes, and liquid reveals | **PASS** |
| `overlays` | Modals & Overlays | 💬 | 26 | Spring bottom sheets, blur backdrops, toast pop-ins, snackbars, and tooltip reveals | **PASS** |
| `gestures` | Gestures & Physics | 🧲 | 26 | Swipe-to-dismiss, rubber-band dragging, inertial scrolling, and pull-to-refresh | **PASS** |
| `backgrounds` | Backgrounds & Ambience | 🌌 | 26 | Animated gradient meshes, aurora waves, starfields, constellations, and cursor spotlights | **PASS** |
| `three-d` | 3D & Perspective | 🌀 | 26 | Matrix4 3D tilt, rotating cubes, parallax depth, 3D carousels, and interactive globes | **PASS** |
| `media` | Images & Media | 🖼️ | 26 | Ken Burns zooms, image comparison sliders, masked diagonal wipes, and avatar stacks | **PASS** |
| `charts` | Charts & Data Viz | 📊 | 26 | Animated line charts, donut reveals, radial statistics, gauges, and sparklines | **PASS** |
| `forms` | Forms & Feedback | 📝 | 26 | Floating labels, focus borders, password strength meters, and error shake inputs | **PASS** |
| `lists` | Lists & Collections | 📋 | 26 | Staggered entrance cascades, animated grid cascades, drag-reorder rows, and swipe items | **PASS** |
| `micro-interactions`| Icons & Micro-interactions| ⚡ | 26 | Heart pops, bell rings, bookmarks, like bursts, cart additions, and icon morphs | **PASS** |
| `experiments` | Motion Experiments | 🧪 | 26 | Particle explosions, SVG path drawing, fluid trails, magnetic fields, and confetti | **PASS** |
| `shaders` | Shaders & Impeller Canvas | 🔮 | 26 | GLSL fragment shaders, Impeller dispersion, fluid smoke, scanlines, and water caustics | **PASS** |
| `ai-interactions` | Smart AI & Voice | 🤖 | 26 | Voice orb pulsars, neural synapse graphs, streaming token cascades, and chat bubbles | **PASS** |
| **TOTAL** | **18 Categories** | — | **468** | **Zero External Pub Dependencies · Pure Flutter Primitives** | **PASS** |

---

## 4. Interactive Feature Inventory

### 4.1 Global Site Header & Navigation
- **Brand Identity Link:** High-contrast logo icon and "DartNova" typography with sound feedback on click.
- **Command Palette Trigger Button:** `⌘K` or `/` quick search button in header opening full keyboard modal.
- **Theme Accent Switcher:** 4 vibrant visual accents (`lime`, `cyan`, `purple`, `amber`) that update CSS variables across the root DOM and persist in `localStorage`.
- **Audio Feedback Toggle:** Subtle synthesized UI clicks and pops via Web Audio API (`src/utils/audio.js`) with mute persistence in `localStorage`.
- **GitHub Repository External Link:** Direct link to repository with `rel="noopener noreferrer"`.
- **Primary Explore Button:** Direct jump to interactive playground.
- **Mobile Menu Drawer:** Responsive slide-out navigation menu for viewports < 900px.

### 4.2 Interactive Playground Workspace
- **Sidebar Search & Filters:**
  - Real-time search across 468 component names, descriptions, tags, and categories.
  - Category dropdown filter (18 categories + All).
  - Sort order dropdown (Featured, A–Z Alphabetical, Difficulty Level, Favorites).
  - Scope buttons (`All 468`, `♥ Favorites`).
  - Clear search (`✕`) and Reset All Filters button.
- **Center Canvas & Preview Frame:**
  - Viewport frame modes: Fluid Desktop, Tablet (768px frame), Phone (375px frame).
  - Canvas surface styles: Dark (#08090B), Clean Light, AMOLED Black (#000000), Blueprint Grid.
  - Replay button (`R` shortcut) triggering component animation lifecycles.
  - 60–120 FPS hardware acceleration indicator.
- **Dynamic Property Controls Dock:**
  - Sliders for durations, scales, curve factors, and spring stiffness with live units.
  - Color pickers for primary accents, glow colors, and shadows.
  - Text inputs for custom strings and button labels.
  - Toggles for stateful micro-interactions.
- **Visual Gallery / Bento Grid Explorer:**
  - Multi-card visual layout displaying animated preview cards for all matching components.
  - Inspect & Code trigger button on every card.
  - Favorite heart button on every card.
- **VS Code IDE Code Panel:**
  - Tab 1: **Usage Snippet** (dynamically updated with user-configured properties).
  - Tab 2: **Standalone Flutter App** (complete runnable code with `MaterialApp` and `main()`).
  - Tab 3: **Component Parameters** (type, default value, and description table).
  - **1-Click Copy Code:** Copies to clipboard with visual checkmark and pop sound.
  - **1-Click Run in DartPad:** Copies code and opens official Flutter DartPad sandbox in new tab.
  - **1-Click Download .dart File:** Automatically generates and triggers browser file download of `[component-id].dart`.
  - Custom Dart syntax highlighter with line numbers.

### 4.3 Command Palette Modal (Ctrl+K / ⌘K / /)
- Fast fuzzy search across all 468 components.
- Keyboard navigation with `ArrowUp`, `ArrowDown`, `Enter` to select, and `Escape` to close.
- Displays category tags and component badges.

---

## 5. Client-Side Data & State Management

| State Key | Type | Default | Persistence | Description |
|---|---|---|---|---|
| `currentView` | `string` | `'landing'` | URL Hash | Active page view (`'landing'`, `'playground'`, `'docs'`) |
| `selectedComponentId` | `string` | `'pop-button'` | URL Hash | Active inspected component |
| `searchQuery` | `string` | `''` | Session | Active component filter query |
| `selectedCategory` | `string` | `'all'` | Session | Filter category |
| `sortBy` | `string` | `'featured'` | Session | Sort ordering mode |
| `favoritesOnly` | `boolean` | `false` | Session | Filter for favorited items |
| `favorites` | `string[]` | `[]` | `localStorage: dartnova_favorites` | Array of favorited component IDs |
| `codeTab` | `string` | `'usage'` | Session | Active code panel mode (`'usage'`, `'full'`, `'params'`) |
| `codeViewerOpen` | `boolean` | `false` | Session | Whether code panel is open |
| `previewMode` | `string` | `'desktop'` | Session | Viewport frame (`'desktop'`, `'tablet'`, `'mobile'`) |
| `canvasBg` | `string` | `'default'` | Session | Canvas surface (`'default'`, `'light'`, `'black'`, `'grid'`) |
| `playgroundMode` | `string` | `'inspector'` | Session | View mode (`'inspector'` vs `'gallery'`) |
| `componentProps` | `object` | `{}` | Session | User-customized animation parameters |
