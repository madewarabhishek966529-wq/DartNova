# DartNova Detailed Test Cases & Execution Matrix

**Document Identifier:** `DN-TC-MATRIX-2026`  
**Application:** DartNova — Motion for Flutter  
**Execution Environment:** Chrome 155 Headless (CDP Engine), Windows 11, Node.js v24, Vitest 2.1  
**Total Tests:** 74  
**Summary:** 74 PASS · 0 FAIL · 0 BLOCKED (100% Passing after verified fixes)

---

## 1. Responsive Viewport Test Cases (5 Viewports)

| Test ID | Viewport / Dimensions | Device Type | Steps Performed | Expected Result | Actual Result | Status | Evidence Reference |
|---|---|---|---|---|---|:---:|---|
| `TC-RESP-01` | Desktop (1920 × 1080) | Full HD Monitor | Set CDP viewport to 1920×1080. Evaluate `scrollWidth` vs `clientWidth`. | `scrollWidth === clientWidth`, no horizontal overflow, layout fits cleanly. | `scrollWidth: 1913, clientWidth: 1913`. Zero overflow. | **PASS** | `reports/evidence/landing-desktop-1920x1080.png` |
| `TC-RESP-02` | Laptop (1366 × 768) | Standard Laptop | Set CDP viewport to 1366×768. Check layout and padding. | Elements fit within 1366px boundaries without wrapping breaks. | `scrollWidth: 1359, clientWidth: 1359`. Zero overflow. | **PASS** | `reports/evidence/landing-laptop-1366x768.png` |
| `TC-RESP-03` | Tablet (768 × 1024) | iPad Portrait | Set CDP viewport to 768×1024 with `mobile: true`. Verify drawer toggle and card grid. | Header collapses desktop navigation; cards adapt to 2-column grid. | `scrollWidth: 768, clientWidth: 768`. Zero overflow. | **PASS** | `reports/evidence/landing-tablet-768x1024.png` |
| `TC-RESP-04` | Mobile Large (390 × 844) | iPhone 14 / 15 | Set CDP viewport to 390×844. Verify header, search bar, and hero orbs. | `scrollWidth === 390`, no horizontal spill. Drawer and search full-width. | `scrollWidth: 390, clientWidth: 390`. Zero overflow (Fixed BUG-02). | **PASS** | `reports/evidence/landing-mobile-390x844.png` |
| `TC-RESP-05` | Mobile Compact (375 × 812) | iPhone X / SE | Set CDP viewport to 375×812. Check text wrapping and button stacking. | `scrollWidth === 375`. Single-column cards. Buttons accessible. | `scrollWidth: 375, clientWidth: 375`. Zero overflow (Fixed BUG-02). | **PASS** | `reports/evidence/landing-mobile-375x812.png` |

---

## 2. Navigation & Client Routing Test Cases

| Test ID | Route | Steps Performed | Expected Result | Actual Result | Status | Associated Defect |
|---|---|---|---|---|:---:|---|
| `TC-NAV-01` | `#landing` | Navigate to `#landing` via URL hash. | `#view-landing` visible; header in landing mode. | Landing page rendered; header in landing mode. | **PASS** | — |
| `TC-NAV-02` | `#playground` | Navigate to `#playground`. | `#view-playground` visible; default component (`pop-button`) loaded. `favoritesOnly: false`. | Playground loaded with 468 components; `favoritesOnly: false`. | **PASS** | BUG-03 (Fixed) |
| `TC-NAV-03` | `#playground/cursor-card` | Navigate to `#playground/cursor-card`. | Directly selects `cursor-card` in inspector and displays its Flutter snippet. | `selectedComponentId: 'cursor-card'` active; preview mounted. | **PASS** | — |
| `TC-NAV-04` | `#favorites` | Navigate to `#favorites`. | Sets `favoritesOnly: true`; filters sidebar to user favorites. | Playground displayed with favorites filter active. | **PASS** | — |
| `TC-NAV-05` | `#docs` | Navigate to `#docs`. | `#view-docs` visible; documentation rendered. | Developer documentation visible; code highlighted. | **PASS** | — |
| `TC-NAV-06` | `#components` | Click anchor link `#components`. | Smoothly scrolls landing page to `#featured-components`. | Page scrolls to featured section without error. | **PASS** | — |
| `TC-NAV-07` | `#categories` | Click anchor link `#categories`. | Smoothly scrolls landing page to `#categories-showcase`. | Page scrolls to category showcase without error. | **PASS** | — |
| `TC-NAV-08` | `/*` (Fallback) | Set hash to `#invalid-route-xyz`. | Gracefully falls back to `#landing` without unhandled exception. | Active view returned to `landing`. Zero crash. | **PASS** | — |

---

## 3. Search, Filters & Boundary Test Cases

| Test ID | Target / Query | Description | Expected Result | Actual Result | Status |
|---|---|---|---|---|:---:|
| `TC-SRCH-01` | `button` | Common partial string search across catalog. | Returns at least 5 matching button components. | Found 40 matching components across categories. | **PASS** |
| `TC-SRCH-02` | `Pop Button` | Exact component name search. | Returns exactly 1 matching component (`pop-button`). | Found 1 component (`Pop Button`). | **PASS** |
| `TC-SRCH-03` | `POP BUTTON` | Upper-case case-insensitivity test. | Returns same component regardless of casing. | Found 1 component (`Pop Button`). | **PASS** |
| `TC-SRCH-04` | `nonexistentanimationxyz123` | Zero-results search. | Shows friendly zero-state message with reset filter button. | Found 0; zero-state UI rendered with reset button. | **PASS** |
| `TC-SRCH-05` | `<script>alert("xss")</script>` | Malicious XSS boundary string. | Safely sanitized by `escapeHtml()`; no script execution. | Safely sanitized; 0 results; zero script execution. | **PASS** |
| `TC-SRCH-06` | `a` × 150 chars | Boundary length limit test. | Query clamped by `sanitizeSearchQuery()` to 100 chars; no layout breakage. | Handled cleanly without error. | **PASS** |

---

## 4. Theme & Personalization Test Cases

| Test ID | Action | Steps Performed | Expected Result | Actual Result | Status | Evidence Reference |
|---|---|---|---|---|:---:|---|
| `TC-THM-01` | Cyan Accent | Click cyan theme dot. | Sets `data-theme="cyan"` on `<html>` and updates `localStorage`. | DOM `data-theme: 'cyan'`, Storage: `'cyan'`. | **PASS** | `reports/evidence/theme-cyan.png` |
| `TC-THM-02` | Purple Accent | Click purple theme dot. | Sets `data-theme="purple"` on `<html>` and updates `localStorage`. | DOM `data-theme: 'purple'`, Storage: `'purple'`. | **PASS** | `reports/evidence/theme-purple.png` |
| `TC-THM-03` | Amber Accent | Click amber theme dot. | Sets `data-theme="amber"` on `<html>` and updates `localStorage`. | DOM `data-theme: 'amber'`, Storage: `'amber'`. | **PASS** | `reports/evidence/theme-amber.png` |
| `TC-THM-04` | Lime Accent | Click lime theme dot. | Removes `data-theme` attribute (defaults to lime) and saves `'lime'`. | Attribute removed; default lime accent active. | **PASS** | `reports/evidence/theme-lime.png` |

---

## 5. Audio & Sound Feedback Test Cases

| Test ID | Feature | Steps Performed | Expected Result | Actual Result | Status |
|---|---|---|---|---|:---:|
| `TC-AUD-01` | Mute Toggle | Click `#sound-toggle-btn`. | Toggles `dartnova_muted` state in `localStorage` between `'true'` and `'false'`. | Correctly toggles state in `localStorage` and updates button title. | **PASS** |
| `TC-AUD-02` | Web Audio Synthesis | Trigger click and pop actions. | Audio synthesizes via Web Audio API without console errors. | Synthesizer executes cleanly without media errors. | **PASS** |

---

## 6. Favorites System Test Cases

| Test ID | Feature | Steps Performed | Expected Result | Actual Result | Status |
|---|---|---|---|---|:---:|
| `TC-FAV-01` | Add Favorite | Click heart button on `pop-button`. | Component ID added to `dartnova_favorites` in `localStorage`; UI displays filled heart. | Added `pop-button` to array; UI updated to `♥`. | **PASS** |
| `TC-FAV-02` | Remove Favorite | Click heart button again on `pop-button`. | Component ID removed from `localStorage`; UI displays outline heart. | Removed from array; UI updated to `♡`. | **PASS** |
| `TC-FAV-03` | Filter Favorites | Click `♥ Favorites` button in sidebar. | Sidebar displays only saved favorites; resets when All clicked. | Correctly filters catalog list. | **PASS** |

---

## 7. Command Palette Test Cases (Ctrl+K / ⌘K)

| Test ID | Feature | Steps Performed | Expected Result | Actual Result | Status | Evidence Reference |
|---|---|---|---|---|:---:|---|
| `TC-CMD-01` | Open Palette | Click header search button or press `⌘K`. | Palette modal opens with backdrop blur; input auto-focused. | Modal opened; input focused; 468 items rendered. | **PASS** | `reports/evidence/command-palette-open.png` |
| `TC-CMD-02` | Filter Components | Type `card` into palette input. | Filters results list in real-time. | Filtered matching card components. | **PASS** | — |
| `TC-CMD-03` | Keyboard Navigation | Press `ArrowDown`, `ArrowUp`, `Enter`, `Escape`. | Cycles active item; `Enter` navigates to playground; `Escape` closes. | Navigates to selected component; closes modal. | **PASS** | — |

---

## 8. Code Panel & Flutter Code Generation Test Cases

| Test ID | Feature | Steps Performed | Expected Result | Actual Result | Status | Evidence Reference |
|---|---|---|---|---|:---:|---|
| `TC-CODE-01` | Code Mode Switcher | Click Usage / Full / Params segmented buttons. | Switches between dynamic snippet, standalone app, and props table. | Code output updates instantaneously. | **PASS** | `reports/evidence/playground-code-viewer-open.png` |
| `TC-CODE-02` | Copy Code Button | Click `#code-copy-btn`. | Copies Flutter code to system clipboard; shows success state. | Copied to clipboard; feedback displayed. | **PASS** | — |
| `TC-CODE-03` | Run in DartPad | Click `#code-dartpad-btn`. | Generates standalone app code, copies to clipboard, and triggers DartPad URL. | Code generated with `MaterialApp` and `main()`. | **PASS** | — |
| `TC-CODE-04` | Download .dart File | Click `#code-download-btn`. | Creates Blob with standalone Flutter app and triggers download of `[id].dart`. | Download triggered with clean Dart code. | **PASS** | — |

---

## 9. Visual Gallery Bento Grid Test Cases

| Test ID | Feature | Steps Performed | Expected Result | Actual Result | Status | Evidence Reference |
|---|---|---|---|---|:---:|---|
| `TC-GAL-01` | Bento Grid Rendering | Click `🎴 Visual Gallery` in playground toolbar. | Renders multi-card bento grid with live interactive previews for all components. | Renders 468 animated component preview cards. | **PASS** | `reports/evidence/playground-gallery-desktop.png` |
| `TC-GAL-02` | Inspect & Code Trigger | Click `Inspect & Code` button on gallery card. | Switches to Inspector mode, selects clicked component, and opens code panel. | Switched to inspector and loaded code panel cleanly. | **PASS** | — |

---

## 10. Automated Vitest Unit & Integration Suites

| Suite File | Test Count | Description | Result |
|---|:---:|---|:---:|
| `tests/registry.test.js` | 8 | Verifies 468 components, 18 categories, bespoke lifecycles, and getters. | **PASS** (8/8) |
| `tests/router.test.js` | 6 | Verifies hash routing, favoritesOnly reset, and route fallbacks. | **PASS** (6/6) |
| `tests/security.test.js` | 5 | Verifies XSS escaping, HTML sanitization, and search length limits. | **PASS** (5/5) |
| `tests/highlighter.test.js` | 5 | Verifies Dart syntax tokenization (keywords, comments, strings). | **PASS** (5/5) |
| `tests/favorites.test.js` | 3 | Verifies localStorage persistence, toggle logic, and reactivity. | **PASS** (3/3) |
| `tests/code-generator.test.js` | 3 | Verifies dynamic property injection, Dart colors, and standalone apps. | **PASS** (3/3) |
| `tests/state.test.js` | 3 | Verifies reactive store subscriptions, notifications, and partial updates. | **PASS** (3/3) |
| `tests/resizer.test.js` | 4 | Verifies resizer clamping, keyboard controls, and ratio persistence. | **PASS** (4/4) |
| **TOTAL** | **37** | **Complete Vitest Automated Test Suite** | **PASS (37/37)** |
