import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const evidenceDir = path.resolve('reports/evidence');
if (!fs.existsSync(evidenceDir)) {
  fs.mkdirSync(evidenceDir, { recursive: true });
}

async function testScreenshot() {
  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    'http://localhost:3000/#landing'
  ], { stdio: 'ignore' });

  // Wait 2 seconds for Chrome to start and load page
  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9223/json/list');
    const targets = await listRes.json();
    const pageTarget = targets.find(t => t.type === 'page');
    if (!pageTarget) throw new Error('No page target found');

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (callbacks.has(msg.id)) {
        callbacks.get(msg.id)(msg);
        callbacks.delete(msg.id);
      }
    };

    const send = (method, params = {}) => new Promise((resolve) => {
      const msgId = id++;
      callbacks.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

    await new Promise(r => ws.onopen = r);
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: false
    });

    // Wait 1.5 seconds for CSS/render
    await new Promise(r => setTimeout(r, 1500));

    // Evaluate title and check page state
    const evalRes = await send('Runtime.evaluate', {
      expression: 'document.title + " | " + document.querySelector("h1")?.innerText',
      returnByValue: true
    });
    console.log('Evaluated in Chrome:', evalRes.result?.result?.value);

    // Capture screenshot
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(shot.result.data, 'base64');
    fs.writeFileSync(path.join(evidenceDir, 'test-landing-1920x1080.png'), buffer);
    console.log('Saved test screenshot successfully! Size:', buffer.length, 'bytes');

    ws.close();
    chromeProcess.kill();
  } catch (err) {
    console.error('Test error:', err);
    chromeProcess.kill();
  }
}

testScreenshot();
