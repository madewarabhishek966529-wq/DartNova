# DartNova Bug Report & Defect Resolution Record

**Document Identifier:** `DN-BUG-REPORT-2026`  
**Application:** DartNova — Motion for Flutter  
**Auditor:** Senior QA Automation Engineer & Full-Stack Developer  
**Status:** All Confirmed Defects (BUG-02, BUG-03, BUG-04, BUG-05, BUG-06) Fully Resolved & Retested

---

## Defect Summary Dashboard

| Bug ID | Title | Severity | Impact Area | Fix Status | Retest Result |
|---|---|:---:|---|:---:|:---:|
| `BUG-01` | Resizer Element Architecture Omission in Vertical Scrolling Layout | Low | Workspace Layout | Documented (Architectural Shift) | Validated |
| `BUG-02` | Mobile Horizontal Layout Overflow on 375px and 390px Viewports | High | Responsive Layout | **FIXED** | **PASS** |
| `BUG-03` | Routing State Persistence Locking: `favoritesOnly` stuck on `#playground` | High | Navigation / Core UX | **FIXED** | **PASS** |
| `BUG-04` | WCAG 2.2 AA Missing Accessible Names on Inputs, Selects, & Buttons | Medium | Accessibility | **FIXED** | **PASS** |
| `BUG-05` | Monolithic 661 kB Vite Production Bundle & Missing Rollup Chunking | Medium | Performance | **FIXED** | **PASS** |
| `BUG-06` | Outdated OpenGraph Meta Tag Catalog Description in `index.html` | Low | SEO / Metadata | **FIXED** | **PASS** |
| `BUG-07` | Upstream DevDependencies Prototype Pollution Vulnerabilities | High / Dev | Build Pipeline | Documented (Roadmap Upgrade) | Pending Package Major Bump |

---

## Detailed Bug Reports

### BUG-02: Mobile Horizontal Layout Overflow on 375px and 390px Viewports
- **Bug ID:** `BUG-02`
- **Severity:** High
- **Component:** `styles/base.css`, `styles/layout.css`, `styles/landing.css`
- **Steps to Reproduce:**
  1. Open browser at viewport width `390px` or `375px` (e.g. iPhone 14/15 or iPhone SE).
  2. Navigate to `http://localhost:3000/#landing`.
  3. Inspect `document.documentElement.scrollWidth` versus `document.documentElement.clientWidth`.
- **Expected Behavior:** `scrollWidth === clientWidth` (390px or 375px); page scrolls vertically with zero horizontal spill.
- **Actual Behavior (Before Fix):** `scrollWidth` reached `581px` (on 390px client width) and `546px` (on 375px client width), allowing horizontal scrolling and exposing unstyled dark background margins.
- **Root Cause:**
  1. `.site-header.landing-mode #header-explore-btn` utilized `!important` with an ID selector, overriding the general mobile media query (`.header-actions .btn-primary { display: none; }`).
  2. `.hero-ambient-orb` elements in `.hero-section` had widths of 500px and 450px with `filter: blur(80px)` and no bounding overflow clipping on `.hero-section`, `.landing-view`, or `html`.
- **Remediation Implemented:**
  1. In `styles/base.css`, added `overflow-x: hidden; max-width: 100vw;` to both `html` and `body`.
  2. In `styles/landing.css`, added `overflow-x: clip;` to `.landing-view` and `overflow: clip;` to `.hero-section`.
  3. In `styles/layout.css`, updated media query `(max-width: 900px)` to explicitly target `.site-header.landing-mode #header-explore-btn, .site-header #header-explore-btn { display: none !important; }` and tightened `.header-inner` padding to `0 var(--space-4)` with `gap: var(--space-2)`.
- **Retest Result:**
  - Viewport 390×844: `scrollWidth: 390, clientWidth: 390` -> **PASS** (Zero overflow)
  - Viewport 375×812: `scrollWidth: 375, clientWidth: 375` -> **PASS** (Zero overflow)
  - Evidence: `reports/evidence/landing-mobile-390x844.png`, `reports/evidence/landing-mobile-375x812.png`.

---

### BUG-03: Routing State Persistence: `favoritesOnly` Stuck Active on `#playground`
- **Bug ID:** `BUG-03`
- **Severity:** High
- **Component:** `src/router.js`
- **Steps to Reproduce:**
  1. Open application at `http://localhost:3000/#landing`.
  2. Click `Favorites` navigation link (`#favorites`).
  3. Observe that `favoritesOnly: true` is dispatched to the store.
  4. Now click `Playground` navigation link (`#playground`).
- **Expected Behavior:** Navigating to `#playground` should present the complete 468-component catalog and reset `favoritesOnly: false`.
- **Actual Behavior (Before Fix):** `setupRouter()` handled `#playground` by setting `currentView: 'playground'` and `selectedComponentId`, but never reset `favoritesOnly: false`. If a user had 0 saved favorites, both the sidebar and the Visual Gallery rendered 0 items with an empty state.
- **Root Cause:** Missing `favoritesOnly: false` field in the partial state update inside `src/router.js`:
  ```javascript
  // Defective:
  if (mainRoute === 'playground') {
    store.setState({
      currentView: 'playground',
      selectedComponentId: comp.id,
      componentProps: { ...comp.defaultProps }
      // favoritesOnly was omitted!
    });
  }
  ```
- **Remediation Implemented:**
  Updated `src/router.js` to explicitly dispatch `favoritesOnly: false` when entering `#playground`:
  ```javascript
  if (mainRoute === 'playground') {
    const compId = subRoute || store.getState().selectedComponentId || 'pop-button';
    const comp = getComponentById(compId);
    store.setState({
      currentView: 'playground',
      selectedComponentId: comp.id,
      componentProps: { ...comp.defaultProps },
      favoritesOnly: false
    });
  }
  ```
  Created automated regression test in `tests/router.test.js`:
  ```javascript
  it('resets favoritesOnly to false when navigating back from #favorites to #playground', () => { ... });
  ```
- **Retest Result:** Vitest integration test passed. Browser search queries and Visual Gallery render all 468 components cleanly -> **PASS**.

---

### BUG-04: WCAG 2.2 AA Missing Accessible Names on Form Controls & Buttons
- **Bug ID:** `BUG-04`
- **Severity:** Medium
- **Component:** `index.html`, `src/views/landing.js`, `src/playground/navigation.js`, `src/utils/command-palette.js`, `src/playground/code-panel.js`
- **Steps to Reproduce:**
  1. Run automated WCAG compliance inspection across DOM elements.
  2. Inspect input fields, dropdown selects, and icon-only buttons for `aria-label`, `<label for="...">`, or accessible inner text.
- **Expected Behavior:** All interactive elements must have accessible names conforming to WCAG 1.3.1 (Info & Relationships) and 4.1.2 (Name, Role, Value).
- **Actual Behavior (Before Fix):** 6 interactive elements lacked accessible names:
  1. `input#hero-quick-search`
  2. `input#component-search`
  3. `select#sidebar-category-select`
  4. `select#sidebar-sort-select`
  5. `input#cmd-palette-input`
  6. `button#code-copy-btn` and `button.accent-dot-btn`
- **Remediation Implemented:**
  - Added `aria-label="Search Flutter animations"` to `#hero-quick-search`.
  - Added `aria-label="Search animations in catalog"` to `#component-search`.
  - Added `aria-label="Filter by Category"` to `#sidebar-category-select`.
  - Added `aria-label="Sort Order"` to `#sidebar-sort-select`.
  - Added `aria-label="Search components in command palette"` to `#cmd-palette-input`.
  - Added `aria-label="Copy Flutter Code to Clipboard"` to `#code-copy-btn`.
  - Added `aria-label="Select [Name] theme"` to all `.accent-dot-btn` buttons in `index.html`.
  - Added `aria-label="Quick Search"` to `#header-search-btn`.
- **Retest Result:** Automated WCAG inspection verified all 6 issues resolved -> **PASS**.

---

### BUG-05: Monolithic 661 kB Production Bundle & Missing Rollup Chunking
- **Bug ID:** `BUG-05`
- **Severity:** Medium (Performance)
- **Component:** `vite.config.js`
- **Steps to Reproduce:**
  1. Run `npm run build`.
  2. Observe Vite build warning output:
     `(!) Some chunks are larger than 500 kB after minification.`
     `dist/assets/index.js 661.20 kB │ gzip: 126 kB`
- **Expected Behavior:** Core application shell should load quickly with vendor and data libraries chunked separately for efficient browser caching.
- **Actual Behavior (Before Fix):** Complete 468-component registry data, visualizer logic, and application controllers were compiled into a single massive chunk exceeding 660 kB.
- **Remediation Implemented:**
  Configured `rollupOptions.output.manualChunks` in `vite.config.js`:
  ```javascript
  rollupOptions: {
    output: {
      manualChunks: (id) => {
        if (id.includes('src/registry')) {
          return 'catalog-registry';
        }
      }
    }
  }
  ```
- **Retest Result:**
  - `dist/assets/index-[hash].js`: **86.65 kB** (21.88 kB gzip) — **87% size reduction!**
  - `dist/assets/catalog-registry-[hash].js`: **574.53 kB** (104.42 kB gzip)
  - Build finished in 722 ms with 0 warnings -> **PASS**.

---

### BUG-06: Outdated OpenGraph Social Meta Description Copy in `index.html`
- **Bug ID:** `BUG-06`
- **Severity:** Low (SEO / Brand Integrity)
- **Component:** `index.html`
- **Steps to Reproduce:**
  1. Inspect `<meta property="og:description">` in `index.html`.
- **Expected Behavior:** Description should reflect the full 468-component catalog and 18 motion categories.
- **Actual Behavior (Before Fix):** Contained outdated text: `"20 interactive UI motion patterns with direct Flutter code parity."`
- **Remediation Implemented:**
  Updated tag in `index.html` to:
  ```html
  <meta property="og:description" content="Explore motion. Preview interactions. Copy Flutter code. 468 interactive UI motion patterns across 18 categories with direct Flutter code parity.">
  ```
- **Retest Result:** Verified accurate tag in DOM -> **PASS**.

---

### BUG-07: Upstream DevDependencies Vulnerabilities in Build Tooling (`npm audit`)
- **Bug ID:** `BUG-07`
- **Severity:** High / Moderate (Development Environment Only)
- **Component:** `package.json` (`devDependencies: vitest, vite, tinypool, esbuild`)
- **Findings:**
  - `tinypool <=2.1.1`: Prototype Pollution gadget in worker options (GHSA-5gmw-xhrv-c9v3, GHSA-85c8-ppgw-ccpr) [Critical]
  - `@vitest/mocker <=4.1.10`: Path traversal via redirect mock (GHSA-82fw-gwwq-j7x9) [Moderate]
  - `esbuild <=0.24.2`: Dev server request reading (GHSA-67mh-4wv8-2f99) [Moderate]
- **Risk Assessment:**
  These packages are exclusively development tools (`devDependencies`) used during local test runs and static compilation. They are **not included in production bundles** in `dist/`. No runtime user risk exists.
- **Recommended Remediation:**
  Schedule upgrade to `vitest@^3.0` and `vite@^6.0` during the next major tooling upgrade cycle.
