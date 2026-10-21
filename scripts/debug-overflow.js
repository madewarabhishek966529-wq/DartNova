import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testMobileFixes() {
  const p = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9229',
    '--no-first-run',
    '--disable-gpu',
    'http://localhost:3000/#landing'
  ], { stdio: 'ignore' });

  await new Promise(r => setTimeout(r, 1500));
  const res = await fetch('http://127.0.0.1:9229/json/list');
  const targets = await res.json();
  const target = targets.find(t => t.type === 'page');
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  const send = (m, p = {}) => new Promise(r => {
    const i = id++;
    const handler = (e) => {
      const d = JSON.parse(e.data);
      if (d.id === i) {
        ws.removeEventListener('message', handler);
        r(d);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: i, method: m, params: p }));
  });

  await send('Page.enable');
  await send('Runtime.enable');

  const testViewport = async (width, height) => {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 400));

    return await send('Runtime.evaluate', {
      expression: `(() => {
        const style = document.createElement('style');
        style.id = 'test-fix-style';
        style.textContent = \`
          html, body {
            overflow-x: hidden !important;
            max-width: 100vw !important;
          }
          .landing-view, .hero-section {
            overflow: clip;
          }
          #global-spotlight-glow {
            contain: strict;
          }
          @media (max-width: 900px) {
            .site-header #header-explore-btn,
            .site-header.landing-mode #header-explore-btn {
              display: none !important;
            }
            .header-inner {
              padding: 0 12px !important;
              gap: 8px !important;
            }
            .header-actions {
              gap: 6px !important;
            }
          }
        \`;
        if (!document.querySelector('#test-fix-style')) {
          document.head.appendChild(style);
        }

        const scrollW = document.documentElement.scrollWidth;
        const clientW = document.documentElement.clientWidth;
        return {
          width: ${width},
          scrollW,
          clientW,
          hasOverflow: scrollW > clientW
        };
      })()`,
      returnByValue: true
    });
  };

  const res390 = await testViewport(390, 844);
  console.log('390x844 test:', res390.result.result.value);

  const res375 = await testViewport(375, 812);
  console.log('375x812 test:', res375.result.result.value);

  ws.close();
  p.kill();
}

testMobileFixes();
