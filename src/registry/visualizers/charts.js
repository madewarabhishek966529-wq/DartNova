/**
 * DartNova Charts & Data Visualization Visualizers (26 Bespoke Modern UI Components)
 * 120 FPS hardware-accelerated animations with interactive mouse/touch triggers
 */

export function renderChartVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('neon-gauge') || id === 'neon-gauge') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:150px; height:90px; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 120 70" style="width:120px; height:70px; overflow:visible;">
        <path d="M 15 65 A 45 45 0 0 1 105 65" fill="none" stroke="#222838" stroke-width="8" stroke-linecap="round"/>
        <path class="g-arc" d="M 15 65 A 45 45 0 0 1 105 65" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-dasharray="141" stroke-dashoffset="35" style="filter:drop-shadow(0 0 8px ${accent}); transition:stroke-dashoffset 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);"/>
        <line class="g-needle" x1="60" y1="65" x2="60" y2="25" stroke="#FFF" stroke-width="2.5" stroke-linecap="round" transform-origin="60 65" transform="rotate(25 60 65)" style="transition:transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);"/>
        <circle cx="60" cy="65" r="5" fill="#FFF"/>
      </svg>
      <div class="g-val" style="font-family:var(--font-mono); font-size:12px; font-weight:800; color:${accent}; margin-top:2px;">120 FPS</div>
    `;
    const arc = wrap.querySelector('.g-arc');
    const needle = wrap.querySelector('.g-needle');
    const val = wrap.querySelector('.g-val');
    let high = true;
    const toggleGauge = () => {
      high = !high;
      arc.style.strokeDashoffset = high ? '35' : '100';
      needle.setAttribute('transform', high ? 'rotate(25 60 65)' : 'rotate(-50 60 65)');
      val.textContent = high ? '120 FPS' : '45 FPS';
    };
    wrap.addEventListener('click', toggleGauge);
    stage.appendChild(wrap);
    restartFn = toggleGauge;

  } else if (id.includes('line-chart') || id === 'animated-line-chart') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:85px; display:flex; flex-direction:column; justify-content:flex-end; cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 150 60" style="width:100%; height:60px; overflow:visible;">
        <path class="lc-path" d="M 10 50 Q 40 20, 75 35 T 140 15" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round" stroke-dasharray="200" stroke-dashoffset="0" style="filter:drop-shadow(0 0 6px ${accent}); transition:stroke-dashoffset 0.6s ease;"/>
        <circle class="lc-dot" cx="140" cy="15" r="4.5" fill="#FFF" stroke="${accent}" stroke-width="2"/>
      </svg>
      <div style="display:flex; justify-content:space-between; font-size:8px; font-family:var(--font-mono); color:var(--text-muted); padding:0 10px;">
        <span>JAN</span><span>JUN</span><span>DEC (▲ 94%)</span>
      </div>
    `;
    const path = wrap.querySelector('.lc-path');
    const redraw = () => {
      path.style.strokeDashoffset = '200';
      setTimeout(() => { path.style.strokeDashoffset = '0'; }, 50);
    };
    wrap.addEventListener('click', redraw);
    stage.appendChild(wrap);
    restartFn = redraw;

  } else if (id.includes('growing-bar') || id === 'growing-bar-chart') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:flex-end; gap:8px; height:65px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="bc-bar" style="width:12px; height:35%; background:#283144; border-radius:3px 3px 0 0; transition:height 0.4s;"></div>
      <div class="bc-bar" style="width:12px; height:65%; background:#283144; border-radius:3px 3px 0 0; transition:height 0.4s;"></div>
      <div class="bc-bar" style="width:12px; height:90%; background:${accent}; border-radius:3px 3px 0 0; transition:height 0.4s; box-shadow:0 0 10px ${accent}66;"></div>
      <div class="bc-bar" style="width:12px; height:50%; background:#283144; border-radius:3px 3px 0 0; transition:height 0.4s;"></div>
    `;
    const bars = wrap.querySelectorAll('.bc-bar');
    wrap.addEventListener('click', () => {
      bars.forEach(b => {
        b.style.height = `${Math.floor(Math.random() * 60 + 30)}%`;
      });
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('donut-chart') || id === 'donut-chart-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:80px; height:80px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 60 60" style="width:100%; height:100%; transform:rotate(-90deg);">
        <circle cx="30" cy="30" r="24" fill="none" stroke="#222838" stroke-width="8"/>
        <circle class="dc-arc" cx="30" cy="30" r="24" fill="none" stroke="${accent}" stroke-width="8" stroke-dasharray="150" stroke-dashoffset="45" style="transition:stroke-dashoffset 0.6s ease;"/>
      </svg>
      <span style="position:absolute; font-size:10px; font-weight:900; color:#FFF; font-family:var(--font-mono);">70%</span>
    `;
    const arc = wrap.querySelector('.dc-arc');
    wrap.addEventListener('click', () => {
      arc.style.strokeDashoffset = '150';
      setTimeout(() => arc.style.strokeDashoffset = '45', 100);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('radial-statistics') || id === 'radial-statistics') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:80px; height:80px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; width:70px; height:70px; border-radius:50%; border:3px solid ${accent};"></div>
      <div style="position:absolute; width:52px; height:52px; border-radius:50%; border:3px solid #42E8F5;"></div>
      <div style="position:absolute; width:34px; height:34px; border-radius:50%; border:3px solid #FF4B72;"></div>
      <span style="font-size:10px;">⚡</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15) rotate(20deg)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('area-chart') || id === 'animated-area-chart') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:70px; cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 160 70" style="width:100%; height:100%;">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${accent}" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="${accent}" stop-opacity="0.0"/>
          </linearGradient>
        </defs>
        <path d="M 0 60 Q 40 20, 80 40 T 160 10 L 160 70 L 0 70 Z" fill="url(#areaGrad)"/>
        <path d="M 0 60 Q 40 20, 80 40 T 160 10" fill="none" stroke="${accent}" stroke-width="2.5"/>
      </svg>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('number-flip') || id === 'number-flip-counter') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:6px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="nf-box" style="padding:8px 12px; border-radius:6px; background:#181F2C; border:1px solid ${accent}; font-size:18px; font-weight:900; color:#FFF; font-family:var(--font-mono);">9</div>
      <div class="nf-box" style="padding:8px 12px; border-radius:6px; background:#181F2C; border:1px solid ${accent}; font-size:18px; font-weight:900; color:#FFF; font-family:var(--font-mono);">8</div>
    `;
    let count = 98;
    const boxes = wrap.querySelectorAll('.nf-box');
    wrap.addEventListener('click', () => {
      count++;
      boxes[0].textContent = String(count)[0];
      boxes[1].textContent = String(count)[1];
      wrap.style.transform = 'scale(1.15)';
      setTimeout(() => wrap.style.transform = 'none', 150);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('sparkline') || id === 'sparkline-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; gap:8px; cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 80 30" style="width:80px; height:30px;">
        <path d="M 0 25 L 20 15 L 40 20 L 60 5 L 80 8" fill="none" stroke="${accent}" stroke-width="2"/>
        <circle cx="80" cy="8" r="3" fill="${accent}"/>
      </svg>
      <span style="font-size:10px; font-weight:900; color:${accent}; font-family:var(--font-mono);">+14.2%</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('heatmap') || id === 'animated-heatmap') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:grid; grid-template-columns:repeat(6, 12px); gap:4px; cursor:pointer;';
    for (let i = 0; i < 24; i++) {
      const cell = document.createElement('div');
      cell.style.cssText = `width:12px; height:12px; border-radius:2px; background:${i % 3 === 0 ? accent : i % 2 === 0 ? accent + '66' : '#1C2333'};`;
      wrap.appendChild(cell);
    }
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('progress-dashboard-cards') || id === 'progress-dashboard-cards') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:150px; padding:10px; border-radius:10px; background:#161C28; border:1px solid ${accent}; cursor:pointer;';
    wrap.innerHTML = `
      <div style="font-size:8px; color:var(--text-muted); font-weight:700;">TOTAL REQUESTS</div>
      <div style="font-size:14px; font-weight:900; color:#FFF; font-family:var(--font-mono); margin:2px 0 6px;">248.5k <span style="font-size:8px; color:${accent};">▲ 12%</span></div>
      <div style="height:4px; border-radius:2px; background:#2A3346; overflow:hidden;"><div style="width:78%; height:100%; background:${accent};"></div></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.06)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('radar-spider-chart') || id === 'radar-spider-chart') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:70px; height:70px; border-radius:50%; border:1px solid #333E56; display:flex; align-items:center; justify-content:center; cursor:pointer; position:relative;';
    wrap.innerHTML = `
      <div style="position:absolute; width:45px; height:45px; transform:rotate(45deg); border:1.5px solid ${accent}; background:${accent}22;"></div>
      <span style="font-size:8px; font-weight:900; color:${accent}; z-index:1;">RADAR</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15) rotate(45deg)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('stacked-waterfall-chart') || id === 'stacked-waterfall-chart') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:flex-end; gap:6px; height:60px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:14px; height:45px; background:${accent}; border-radius:2px;"></div>
      <div style="width:14px; height:20px; background:#FF4B72; border-radius:2px; margin-bottom:25px;"></div>
      <div style="width:14px; height:35px; background:#42E8F5; border-radius:2px;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('candlestick-trading-chart') || id === 'candlestick-trading-chart') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; gap:8px; height:60px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center;"><div style="width:1px; height:8px; background:#48BB78;"></div><div style="width:10px; height:24px; background:#48BB78; border-radius:1px;"></div><div style="width:1px; height:6px; background:#48BB78;"></div></div>
      <div style="display:flex; flex-direction:column; align-items:center;"><div style="width:1px; height:6px; background:#F56565;"></div><div style="width:10px; height:18px; background:#F56565; border-radius:1px;"></div><div style="width:1px; height:10px; background:#F56565;"></div></div>
      <div style="display:flex; flex-direction:column; align-items:center;"><div style="width:1px; height:10px; background:${accent};"></div><div style="width:10px; height:32px; background:${accent}; border-radius:1px;"></div><div style="width:1px; height:4px; background:${accent};"></div></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('bubble-scatter-chart') || id === 'bubble-scatter-chart') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:150px; height:70px; border-left:1px solid #333E56; border-bottom:1px solid #333E56; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; bottom:12px; left:20px; width:18px; height:18px; border-radius:50%; background:${accent}; opacity:0.8;"></div>
      <div style="position:absolute; bottom:35px; left:60px; width:26px; height:26px; border-radius:50%; background:#42E8F5; opacity:0.8;"></div>
      <div style="position:absolute; bottom:20px; left:110px; width:14px; height:14px; border-radius:50%; background:#FF4B72; opacity:0.8;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('semi-circle-speedometer') || id === 'semi-circle-speedometer') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:120px; height:65px; border-radius:60px 60px 0 0; border:3px solid ${accent}; border-bottom:none; display:flex; align-items:flex-end; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `<span style="font-size:12px; font-weight:900; color:${accent}; font-family:var(--font-mono); margin-bottom:4px;">120 KM/H</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('step-line-chart') || id === 'step-line-chart') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:150px; height:60px; cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 150 60" style="width:100%; height:100%;">
        <path d="M 0 50 L 40 50 L 40 30 L 90 30 L 90 15 L 150 15" fill="none" stroke="${accent}" stroke-width="2.5"/>
      </svg>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('radial-tree-map') || id === 'radial-tree-map') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:70px; height:70px; border-radius:50%; border:2px dashed ${accent}; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:9px; font-weight:900; color:${accent};';
    wrap.textContent = 'SUNBURST';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'rotate(90deg) scale(1.15)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('live-ticker-sparkline') || id === 'live-ticker-sparkline') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:6px 14px; border-radius:8px; background:#141A26; border:1px solid ${accent}; display:flex; align-items:center; gap:8px; cursor:pointer; font-family:var(--font-mono); font-size:10px; font-weight:800; color:#FFF;';
    wrap.innerHTML = `<span>BTC $94.2k</span><span style="color:${accent};">▲ +3.4%</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('funnel-conversion-chart') || id === 'funnel-conversion-chart') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-direction:column; align-items:center; gap:3px; width:150px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:140px; height:12px; background:${accent}; border-radius:2px; font-size:7px; font-weight:900; color:#08090B; text-align:center; line-height:12px;">Impressions 100%</div>
      <div style="width:95px; height:12px; background:${accent}CC; border-radius:2px; font-size:7px; font-weight:900; color:#08090B; text-align:center; line-height:12px;">Clicks 68%</div>
      <div style="width:55px; height:12px; background:${accent}88; border-radius:2px; font-size:7px; font-weight:900; color:#08090B; text-align:center; line-height:12px;">Sales 32%</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('interactive-sankey-flow') || id === 'interactive-sankey-flow') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:150px; height:60px; cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 150 60" style="width:100%; height:100%;">
        <path d="M 10 20 C 60 20, 90 40, 140 40" fill="none" stroke="${accent}" stroke-width="12" stroke-opacity="0.5"/>
        <path d="M 10 40 C 60 40, 90 20, 140 20" fill="none" stroke="#42E8F5" stroke-width="8" stroke-opacity="0.5"/>
      </svg>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('gauge-cluster-dashboard') || id === 'gauge-cluster-dashboard') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:12px; align-items:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:42px; height:42px; border-radius:50%; border:2px solid ${accent}; display:flex; align-items:center; justify-content:center; font-size:8px; font-weight:900; color:${accent}; font-family:var(--font-mono);">8k RPM</div>
      <div style="width:52px; height:52px; border-radius:50%; border:2.5px solid #42E8F5; display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:900; color:#42E8F5; font-family:var(--font-mono);">120 MPH</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.12)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('multi-line-comparison') || id === 'multi-line-comparison') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:150px; height:60px; cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 150 60" style="width:100%; height:100%;">
        <path d="M 0 50 Q 50 10, 100 40 T 150 15" fill="none" stroke="${accent}" stroke-width="2.5"/>
        <path d="M 0 30 Q 50 45, 100 20 T 150 35" fill="none" stroke="#FF4B72" stroke-width="2" stroke-dasharray="3 3"/>
      </svg>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('polar-area-rose-chart') || id === 'polar-area-rose-chart') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:70px; height:70px; border-radius:50%; background:radial-gradient(circle, ${accent}88 40%, #42E8F566 70%, transparent); cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:8px; font-weight:900; color:#FFF;';
    wrap.textContent = 'ROSE';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15) rotate(45deg)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('bullet-metric-graph') || id === 'bullet-metric-graph') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:150px; height:24px; border-radius:4px; background:#1C2433; display:flex; align-items:center; padding:0 6px; box-sizing:border-box; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:70%; height:8px; background:${accent}; border-radius:2px;"></div>
      <div style="position:absolute; left:85%; top:2px; bottom:2px; width:3px; background:#FF4B72;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('dot-density-matrix') || id === 'dot-density-matrix') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:grid; grid-template-columns:repeat(8, 8px); gap:4px; cursor:pointer;';
    for (let i = 0; i < 24; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `width:8px; height:8px; border-radius:50%; background:${i < 16 ? accent : '#283144'};`;
      wrap.appendChild(dot);
    }
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else {
    // 26. circular-counter-dial & default chart
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:65px; height:65px; border-radius:50%; border:3px solid ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:900; font-size:12px; font-family:var(--font-mono); cursor:pointer; box-shadow:0 0 14px ${accent}44;';
    wrap.textContent = '88%';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'rotate(45deg) scale(1.15)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();
  }

  return { restart: restartFn, destroy: destroyFn };
}
