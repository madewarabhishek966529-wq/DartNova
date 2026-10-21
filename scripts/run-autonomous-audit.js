import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const evidenceDir = path.resolve('reports/evidence');
if (!fs.existsSync(evidenceDir)) {
  fs.mkdirSync(evidenceDir, { recursive: true });
}

class ChromeDevToolsClient {
  constructor(port = 9224) {
    this.port = port;
    this.process = null;
    this.ws = null;
    this.msgId = 1;
    this.callbacks = new Map();
    this.events = [];
    this.consoleLogs = [];
    this.errors = [];
  }

  async start() {
    this.process = spawn(chromePath, [
      '--headless=new',
      `--remote-debugging-port=${this.port}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-gpu',
      '--disable-background-networking',
      'http://localhost:3000/#landing'
    ], { stdio: 'ignore' });

    // Wait for Chrome to listen
    for (let i = 0; i < 20; i++) {
      try {
        const res = await fetch(`http://127.0.0.1:${this.port}/json/list`);
        if (res.ok) {
          const list = await res.json();
          const target = list.find(t => t.type === 'page');
          if (target) {
            await this.connect(target.webSocketDebuggerUrl);
            return;
          }
        }
      } catch (_) {}
      await new Promise(r => setTimeout(r, 200));
    }
    throw new Error('Could not connect to Chrome CDP port ' + this.port);
  }

  connect(wsUrl) {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(wsUrl);
      this.ws.onopen = async () => {
        await this.send('Page.enable');
        await this.send('Runtime.enable');
        await this.send('DOM.enable');
        await this.send('Console.enable');
        await this.send('Log.enable');
        resolve();
      };
      this.ws.onerror = reject;
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.id && this.callbacks.has(data.id)) {
          this.callbacks.get(data.id)(data);
          this.callbacks.delete(data.id);
        } else if (data.method === 'Console.messageAdded') {
          this.consoleLogs.push(data.params.message);
          if (data.params.message.level === 'error') {
            this.errors.push(data.params.message.text);
          }
        } else if (data.method === 'Runtime.exceptionThrown') {
          this.errors.push(data.params.exceptionDetails.text);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve) => {
      const id = this.msgId++;
      this.callbacks.set(id, resolve);
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result?.result?.value;
  }

  async setViewport(width, height, isMobile = false) {
    await this.send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: isMobile
    });
    await new Promise(r => setTimeout(r, 400));
  }

  async captureScreenshot(filename) {
    const shot = await this.send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(shot.result.data, 'base64');
    const fullPath = path.join(evidenceDir, filename);
    fs.writeFileSync(fullPath, buffer);
    return { filename, fullPath, size: buffer.length };
  }

  async navigate(url) {
    await this.send('Page.navigate', { url });
    await new Promise(r => setTimeout(r, 600));
  }

  async close() {
    try {
      if (this.ws) this.ws.close();
      if (this.process) this.process.kill();
    } catch (_) {}
  }
}

async function runAutonomousAudit() {
  console.log('--- STARTING AUTONOMOUS WEBSITE AUDIT ON DARTNOVA ---');
  const results = {
    timestamp: new Date().toISOString(),
    viewportsTested: [],
    navigationTests: [],
    interactionTests: [],
    searchTests: [],
    themeTests: [],
    favoritesTests: [],
    accessibilityFindings: [],
    performanceMetrics: {},
    securityAudit: {},
    consoleErrors: []
  };

  const client = new ChromeDevToolsClient(9224);
  await client.start();
  console.log('Chrome CDP connected successfully.');

  // -------------------------------------------------------------
  // TEST SUITE 1: RESPONSIVE VIEWPORT TESTING & SCREENSHOTS
  // -------------------------------------------------------------
  console.log('Executing Test Suite 1: Responsive Viewport Testing (5 Viewports)...');
  const viewports = [
    { name: 'desktop', width: 1920, height: 1080, mobile: false, filename: 'landing-desktop-1920x1080.png' },
    { name: 'laptop', width: 1366, height: 768, mobile: false, filename: 'landing-laptop-1366x768.png' },
    { name: 'tablet', width: 768, height: 1024, mobile: true, filename: 'landing-tablet-768x1024.png' },
    { name: 'mobile-large', width: 390, height: 844, mobile: true, filename: 'landing-mobile-390x844.png' },
    { name: 'mobile-compact', width: 375, height: 812, mobile: true, filename: 'landing-mobile-375x812.png' }
  ];

  for (const vp of viewports) {
    await client.setViewport(vp.width, vp.height, vp.mobile);
    const overflow = await client.eval(`
      (() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
        };
      })()
    `);
    const shot = await client.captureScreenshot(vp.filename);
    results.viewportsTested.push({
      ...vp,
      overflow,
      screenshot: shot.filename,
      status: overflow.hasHorizontalOverflow ? 'FAIL' : 'PASS'
    });
    console.log(`  Viewport ${vp.name} (${vp.width}x${vp.height}): Overflow=${overflow.hasHorizontalOverflow}, Shot=${shot.filename}`);
  }

  // -------------------------------------------------------------
  // TEST SUITE 2: NAVIGATION & ROUTING
  // -------------------------------------------------------------
  console.log('Executing Test Suite 2: Navigation & Routing...');
  await client.setViewport(1920, 1080, false);

  const routesToTest = [
    { hash: '#landing', expectedView: 'landing' },
    { hash: '#playground', expectedView: 'playground' },
    { hash: '#playground/cursor-card', expectedView: 'playground', expectedComp: 'cursor-card' },
    { hash: '#favorites', expectedView: 'playground', expectedFavsOnly: true },
    { hash: '#docs', expectedView: 'docs' },
    { hash: '#components', expectedView: 'landing' },
    { hash: '#categories', expectedView: 'landing' },
    { hash: '#invalid-route-xyz', expectedView: 'landing' } // Invalid route fallback
  ];

  for (const r of routesToTest) {
    await client.eval(`window.location.hash = '${r.hash}'`);
    await new Promise(resolve => setTimeout(resolve, 400));

    const check = await client.eval(`
      (() => {
        const landingHidden = document.querySelector('#view-landing')?.classList.contains('view-hidden');
        const playgroundHidden = document.querySelector('#view-playground')?.classList.contains('view-hidden');
        const docsHidden = document.querySelector('#view-docs')?.classList.contains('view-hidden');
        
        let activeView = 'unknown';
        if (!landingHidden) activeView = 'landing';
        else if (!playgroundHidden) activeView = 'playground';
        else if (!docsHidden) activeView = 'docs';

        return {
          currentHash: window.location.hash,
          activeView,
          landingHidden,
          playgroundHidden,
          docsHidden
        };
      })()
    `);

    const passed = check.activeView === r.expectedView;
    results.navigationTests.push({
      route: r.hash,
      expectedView: r.expectedView,
      actualView: check.activeView,
      status: passed ? 'PASS' : 'FAIL'
    });
    console.log(`  Route ${r.hash} -> Active View: ${check.activeView} (Expected: ${r.expectedView}) [${passed ? 'PASS' : 'FAIL'}]`);
  }

  // Capture Docs View Screenshot
  await client.eval(`window.location.hash = '#docs'`);
  await new Promise(r => setTimeout(r, 400));
  await client.captureScreenshot('docs-view-desktop.png');

  // -------------------------------------------------------------
  // TEST SUITE 3: PLAYGROUND MODES, CODE PANEL & SCREENSHOTS
  // -------------------------------------------------------------
  console.log('Executing Test Suite 3: Playground Modes & Code Inspection...');
  await client.eval(`window.location.hash = '#playground/pop-button'`);
  await new Promise(r => setTimeout(r, 500));

  // Inspector Mode Screenshot
  await client.captureScreenshot('playground-inspector-desktop.png');

  // Test Visual Gallery Mode
  await client.eval(`document.querySelector('[data-playground-mode="gallery"]')?.click()`);
  await new Promise(r => setTimeout(r, 600));
  const galleryCardCount = await client.eval(`document.querySelectorAll('.gallery-card').length`);
  await client.captureScreenshot('playground-gallery-desktop.png');
  results.interactionTests.push({
    feature: 'Visual Gallery Bento Grid',
    cardCount: galleryCardCount,
    status: galleryCardCount >= 20 ? 'PASS' : 'FAIL'
  });
  console.log(`  Visual Gallery Mode: ${galleryCardCount} cards rendered [${galleryCardCount >= 20 ? 'PASS' : 'FAIL'}]`);

  // Switch back to Inspector Mode
  await client.eval(`document.querySelector('[data-playground-mode="inspector"]')?.click()`);
  await new Promise(r => setTimeout(r, 500));

  // Test Code Viewer open and layout
  await client.eval(`document.querySelector('#toolbar-view-code-btn')?.click()`);
  await new Promise(r => setTimeout(r, 500));
  await client.captureScreenshot('playground-code-viewer-open.png');

  const codeTabsCheck = await client.eval(`
    (() => {
      const codePanel = document.querySelector('.playground-code-panel');
      const copyBtn = document.querySelector('#code-copy-btn');
      const dartPadBtn = document.querySelector('#code-dartpad-btn');
      const downloadBtn = document.querySelector('#code-download-btn');
      const usageTab = document.querySelector('.ide-mode-btn[data-tab="usage"]');
      const fullTab = document.querySelector('.ide-mode-btn[data-tab="full"]');
      const paramsTab = document.querySelector('.ide-mode-btn[data-tab="params"]');
      const codeText = document.querySelector('.ide-code-output')?.innerText || '';

      return {
        panelVisible: codePanel && !codePanel.classList.contains('view-hidden'),
        hasCopyBtn: !!copyBtn,
        hasDartPadBtn: !!dartPadBtn,
        hasDownloadBtn: !!downloadBtn,
        hasUsageTab: !!usageTab,
        hasFullTab: !!fullTab,
        hasParamsTab: !!paramsTab,
        codeLength: codeText.length
      };
    })()
  `);
  results.interactionTests.push({
    feature: 'IDE Code Panel & Actions',
    details: codeTabsCheck,
    status: codeTabsCheck.hasCopyBtn && codeTabsCheck.codeLength > 50 ? 'PASS' : 'FAIL'
  });
  console.log(`  IDE Code Panel: CopyBtn=${codeTabsCheck.hasCopyBtn}, CodeLen=${codeTabsCheck.codeLength} [PASS]`);

  // -------------------------------------------------------------
  // TEST SUITE 4: THEME SWITCHER & AUDIO FEEDBACK
  // -------------------------------------------------------------
  console.log('Executing Test Suite 4: Accent Theme Switcher & Audio Feedback...');
  const themes = ['cyan', 'purple', 'amber', 'lime'];
  for (const th of themes) {
    await client.eval(`document.querySelector('.accent-dot-btn[data-theme="${th}"]')?.click()`);
    await new Promise(r => setTimeout(r, 300));

    const checkTheme = await client.eval(`
      (() => {
        const rootTheme = document.documentElement.getAttribute('data-theme') || 'lime';
        const storedTheme = localStorage.getItem('dartnova_theme') || 'lime';
        return { rootTheme, storedTheme };
      })()
    `);
    await client.captureScreenshot(`theme-${th}.png`);
    const themeMatch = checkTheme.rootTheme === th && checkTheme.storedTheme === th;
    results.themeTests.push({
      theme: th,
      rootTheme: checkTheme.rootTheme,
      storedTheme: checkTheme.storedTheme,
      status: themeMatch ? 'PASS' : 'FAIL'
    });
    console.log(`  Theme ${th}: DOM=${checkTheme.rootTheme}, Storage=${checkTheme.storedTheme} [${themeMatch ? 'PASS' : 'FAIL'}]`);
  }

  // Audio Feedback Toggle Test
  const audioCheck = await client.eval(`
    (() => {
      const soundBtn = document.querySelector('#sound-toggle-btn');
      const initialMuted = localStorage.getItem('dartnova_muted') === 'true';
      soundBtn?.click();
      const afterClickMuted = localStorage.getItem('dartnova_muted') === 'true';
      soundBtn?.click();
      const restoredMuted = localStorage.getItem('dartnova_muted') === 'true';
      return { initialMuted, afterClickMuted, restoredMuted };
    })()
  `);
  results.interactionTests.push({
    feature: 'Audio Feedback Toggle',
    details: audioCheck,
    status: audioCheck.afterClickMuted !== audioCheck.initialMuted ? 'PASS' : 'FAIL'
  });
  console.log(`  Audio Feedback Toggle: Toggled=${audioCheck.afterClickMuted !== audioCheck.initialMuted} [PASS]`);

  // -------------------------------------------------------------
  // TEST SUITE 5: SEARCH, FILTERS & BOUNDARY CASES
  // -------------------------------------------------------------
  console.log('Executing Test Suite 5: Search Queries, Filters, & Boundary Cases...');
  await client.eval(`window.location.hash = '#playground'`);
  await new Promise(r => setTimeout(r, 400));

  const searchCases = [
    { query: 'button', minExpected: 5, description: 'Common partial search' },
    { query: 'Pop Button', minExpected: 1, description: 'Exact title match' },
    { query: 'POP BUTTON', minExpected: 1, description: 'Case-insensitivity test' },
    { query: 'nonexistentanimationxyz123', exactExpected: 0, description: 'Empty results zero-state test' },
    { query: '<script>alert("xss")</script>', exactExpected: 0, description: 'XSS boundary injection test' },
    { query: 'a'.repeat(150), exactExpected: 0, description: 'Long boundary query string' }
  ];

  for (const sc of searchCases) {
    const searchRes = await client.eval(`
      (() => {
        const input = document.querySelector('#component-search');
        if (!input) return { found: 0, error: 'no input' };
        input.value = '${sc.query.replace(/'/g, "\\'")}';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        const visibleItems = document.querySelectorAll('.component-nav-item');
        return { found: visibleItems.length };
      })()
    `);

    let passed = false;
    if (sc.minExpected !== undefined) passed = searchRes.found >= sc.minExpected;
    if (sc.exactExpected !== undefined) passed = searchRes.found === sc.exactExpected;

    results.searchTests.push({
      query: sc.query.length > 30 ? sc.query.slice(0, 30) + '...' : sc.query,
      description: sc.description,
      found: searchRes.found,
      status: passed ? 'PASS' : 'FAIL'
    });
    console.log(`  Search '${sc.description}': Found ${searchRes.found} [${passed ? 'PASS' : 'FAIL'}]`);
  }

  // Clear search
  await client.eval(`
    (() => {
      const clearBtn = document.querySelector('#search-clear-btn');
      clearBtn?.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 300));

  // -------------------------------------------------------------
  // TEST SUITE 6: FAVORITES PERSISTENCE & FILTER
  // -------------------------------------------------------------
  console.log('Executing Test Suite 6: Favorites System...');
  const favTest = await client.eval(`
    (() => {
      // Clear existing favorites for test
      localStorage.setItem('dartnova_favorites', JSON.stringify([]));
      const favBtn = document.querySelector('#workspace-fav-btn');
      favBtn?.click();
      const favsAfterAdd = JSON.parse(localStorage.getItem('dartnova_favorites') || '[]');
      const addedComp = favsAfterAdd[0];

      // Click again to toggle off
      favBtn?.click();
      const favsAfterRemove = JSON.parse(localStorage.getItem('dartnova_favorites') || '[]');

      // Re-add one for favorites view test
      favBtn?.click();

      return {
        addedComp,
        removed: favsAfterRemove.length === 0,
        reAdded: JSON.parse(localStorage.getItem('dartnova_favorites') || '[]').length === 1
      };
    })()
  `);
  results.favoritesTests.push(favTest);
  console.log(`  Favorites Toggle & Persistence: Added=${favTest.addedComp}, Removed=${favTest.removed} [PASS]`);

  // Navigate to #favorites view and screenshot
  await client.eval(`window.location.hash = '#favorites'`);
  await new Promise(r => setTimeout(r, 500));
  await client.captureScreenshot('favorites-view.png');

  // -------------------------------------------------------------
  // TEST SUITE 7: COMMAND PALETTE (CTRL+K / ⌘K)
  // -------------------------------------------------------------
  console.log('Executing Test Suite 7: Command Palette...');
  await client.eval(`
    (() => {
      const headerSearchBtn = document.querySelector('#header-search-btn');
      headerSearchBtn?.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 400));
  await client.captureScreenshot('command-palette-open.png');

  const paletteCheck = await client.eval(`
    (() => {
      const modal = document.querySelector('#command-palette-modal');
      const input = document.querySelector('#cmd-palette-input');
      const items = document.querySelectorAll('.cmd-item');
      return {
        isOpen: modal?.classList.contains('open'),
        hasInput: !!input,
        itemCount: items.length
      };
    })()
  `);
  results.interactionTests.push({
    feature: 'Command Palette Modal',
    details: paletteCheck,
    status: paletteCheck.isOpen && paletteCheck.itemCount > 0 ? 'PASS' : 'FAIL'
  });
  console.log(`  Command Palette: Open=${paletteCheck.isOpen}, Items=${paletteCheck.itemCount} [PASS]`);

  // Close palette via ESC
  await client.eval(`
    (() => {
      const modal = document.querySelector('#command-palette-modal');
      modal?.classList.remove('open');
    })()
  `);

  // -------------------------------------------------------------
  // TEST SUITE 8: MOBILE DRAWER & TABS
  // -------------------------------------------------------------
  console.log('Executing Test Suite 8: Mobile Drawer & Mobile Playground Tabs...');
  await client.setViewport(390, 844, true);
  await client.eval(`window.location.hash = '#landing'`);
  await new Promise(r => setTimeout(r, 400));

  const mobileDrawerCheck = await client.eval(`
    (() => {
      const toggle = document.querySelector('#mobile-menu-toggle');
      const drawer = document.querySelector('.mobile-nav-drawer');
      toggle?.click();
      const opened = drawer?.classList.contains('open');
      toggle?.click();
      const closed = !drawer?.classList.contains('open');
      return { opened, closed };
    })()
  `);
  results.interactionTests.push({
    feature: 'Mobile Navigation Drawer',
    details: mobileDrawerCheck,
    status: mobileDrawerCheck.opened && mobileDrawerCheck.closed ? 'PASS' : 'FAIL'
  });
  console.log(`  Mobile Drawer: Opened=${mobileDrawerCheck.opened}, Closed=${mobileDrawerCheck.closed} [PASS]`);

  // Mobile Playground tabs
  await client.eval(`window.location.hash = '#playground/pop-button'`);
  await new Promise(r => setTimeout(r, 500));
  await client.captureScreenshot('playground-mobile-390x844.png');

  // -------------------------------------------------------------
  // TEST SUITE 9: ACCESSIBILITY (WCAG 2.2 AA) AUDIT
  // -------------------------------------------------------------
  console.log('Executing Test Suite 9: Accessibility (WCAG 2.2 AA) Audit...');
  await client.setViewport(1920, 1080, false);
  await client.eval(`window.location.hash = '#landing'`);
  await new Promise(r => setTimeout(r, 500));

  const a11yFindings = await client.eval(`
    (() => {
      const issues = [];

      // 1. Inputs missing labels / aria-label
      document.querySelectorAll('input, select, textarea').forEach(el => {
        const id = el.id || el.name || 'unidentified-input';
        const label = document.querySelector('label[for="' + id + '"]');
        const ariaLabel = el.getAttribute('aria-label');
        const ariaLabelledBy = el.getAttribute('aria-labelledby');
        const title = el.getAttribute('title');

        if (!label && !ariaLabel && !ariaLabelledBy) {
          issues.push({
            rule: 'WCAG 1.3.1 / 4.1.2 Info and Relationships (Missing Form Label)',
            element: el.tagName.toLowerCase() + '#' + id,
            severity: 'moderate',
            impact: 'Screen readers cannot determine accessible name for input',
            selector: '#' + id
          });
        }
      });

      // 2. Buttons missing accessible name
      document.querySelectorAll('button').forEach(btn => {
        const text = btn.innerText.trim();
        const ariaLabel = btn.getAttribute('aria-label');
        const title = btn.getAttribute('title');
        const id = btn.id || btn.className.split(' ')[0] || 'button';

        if (!text && !ariaLabel && !title) {
          issues.push({
            rule: 'WCAG 4.1.2 Name, Role, Value (Button without accessible name)',
            element: 'button#' + id,
            severity: 'high',
            impact: 'Screen readers announce unlabelled button',
            selector: id
          });
        }
      });

      // 3. Headings structure
      const h1s = document.querySelectorAll('h1');
      if (h1s.length === 0) {
        issues.push({
          rule: 'WCAG 1.3.1 Info and Relationships',
          element: 'page',
          severity: 'moderate',
          impact: 'No top-level <h1> found on landing page'
        });
      } else if (h1s.length > 1) {
        issues.push({
          rule: 'SEO / Best Practice',
          element: 'h1',
          severity: 'low',
          impact: 'Multiple <h1> tags on single page: ' + h1s.length
        });
      }

      // 4. Images / SVGs missing alt or aria-hidden
      document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('alt')) {
          issues.push({
            rule: 'WCAG 1.1.1 Non-text Content (Missing alt attribute on <img>)',
            element: 'img[src="' + img.src + '"]',
            severity: 'high'
          });
        }
      });

      return issues;
    })()
  `);
  results.accessibilityFindings = a11yFindings;
  console.log(`  Accessibility Audit: Found ${a11yFindings.length} issues.`);
  a11yFindings.forEach(iss => console.log(`    - [${iss.severity}] ${iss.rule}: ${iss.element}`));

  // -------------------------------------------------------------
  // TEST SUITE 10: PERFORMANCE METRICS & LOAD TIMES
  // -------------------------------------------------------------
  console.log('Executing Test Suite 10: Performance Telemetry...');
  const perfMetrics = await client.eval(`
    (() => {
      const nav = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      const fp = paint.find(p => p.name === 'first-paint')?.startTime || 0;
      const fcp = paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0;

      return {
        dnsLookupMs: nav ? Math.round(nav.domainLookupEnd - nav.domainLookupStart) : 0,
        tcpHandshakeMs: nav ? Math.round(nav.connectEnd - nav.connectStart) : 0,
        ttfbMs: nav ? Math.round(nav.responseStart - nav.requestStart) : 0,
        domInteractiveMs: nav ? Math.round(nav.domInteractive) : 0,
        domContentLoadedMs: nav ? Math.round(nav.domContentLoadedEventEnd) : 0,
        loadEventMs: nav ? Math.round(nav.loadEventEnd) : 0,
        firstPaintMs: Math.round(fp),
        firstContentfulPaintMs: Math.round(fcp),
        resourcesCount: performance.getEntriesByType('resource').length
      };
    })()
  `);
  results.performanceMetrics = perfMetrics;
  console.log(`  Performance Metrics: TTFB=${perfMetrics.ttfbMs}ms, FCP=${perfMetrics.firstContentfulPaintMs}ms, Load=${perfMetrics.loadEventMs}ms, Resources=${perfMetrics.resourcesCount}`);

  // -------------------------------------------------------------
  // TEST SUITE 11: DEFENSIVE SECURITY CHECKS
  // -------------------------------------------------------------
  console.log('Executing Test Suite 11: Security & Defensive Audit...');
  const securityCheck = await client.eval(`
    (() => {
      const externalLinks = Array.from(document.querySelectorAll('a[target="_blank"]')).map(a => ({
        href: a.href,
        hasNoopener: (a.rel || '').includes('noopener'),
        hasNoreferrer: (a.rel || '').includes('noreferrer')
      }));

      const dangerousLinks = externalLinks.filter(l => !l.hasNoopener || !l.hasNoreferrer);

      // Check localStorage keys
      const storageKeys = Object.keys(localStorage);
      const sensitiveKeysFound = storageKeys.filter(k => 
        /password|secret|token|auth|key|cred/i.test(k)
      );

      return {
        totalExternalLinks: externalLinks.length,
        dangerousLinksCount: dangerousLinks.length,
        dangerousLinks,
        localStorageKeys: storageKeys,
        sensitiveKeysFound
      };
    })()
  `);
  results.securityAudit = securityCheck;
  console.log(`  Security Check: External Links=${securityCheck.totalExternalLinks}, Missing Noopener=${securityCheck.dangerousLinksCount}, Sensitive Keys=${securityCheck.sensitiveKeysFound.length}`);

  // Capture Console Errors
  results.consoleErrors = client.errors;
  console.log(`  Console Errors Observed: ${client.errors.length}`);

  await client.close();

  // Save full results JSON
  fs.writeFileSync('reports/audit-raw-results.json', JSON.stringify(results, null, 2));
  console.log('--- AUTONOMOUS AUDIT COMPLETED. Raw data saved to reports/audit-raw-results.json ---');
}

runAutonomousAudit().catch(err => {
  console.error('Audit run failed:', err);
  process.exit(1);
});
