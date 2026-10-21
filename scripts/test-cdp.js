import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

console.log('Starting Chrome headless with remote debugging...');
const chromeProcess = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-gpu',
  'about:blank'
], { stdio: 'ignore' });

// Wait 1.5 seconds for Chrome to bind port 9222
setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9222/json/version');
    const versionData = await res.json();
    console.log('Connected to Chrome:', versionData.Browser);
    console.log('WebSocket Debugger URL:', versionData.webSocketDebuggerUrl);
    
    // Kill test process
    chromeProcess.kill();
    process.exit(0);
  } catch (err) {
    console.error('Failed to connect to Chrome CDP:', err.message);
    chromeProcess.kill();
    process.exit(1);
  }
}, 1500);
