/**
 * DartNova Charts & Data Visualization Visualizers (10 Bespoke Modern UI Components)
 */

export function renderChartVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('gauge') || id === 'neon-gauge') {
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
    wrap.className = 'dn-barchart-widget';
    wrap.style.cssText = 'display:flex; align-items:flex-end; gap:8px; height:65px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="b-col" style="width:14px; height:35%; background:#252D3D; border-radius:4px 4px 0 0; transition:height 0.4s ease;"></div>
      <div class="b-col" style="width:14px; height:75%; background:${accent}; border-radius:4px 4px 0 0; transition:height 0.4s ease; box-shadow:0 0 10px ${accent}66;"></div>
      <div class="b-col" style="width:14px; height:50%; background:#42E8F5; border-radius:4px 4px 0 0; transition:height 0.4s ease;"></div>
      <div class="b-col" style="width:14px; height:95%; background:${accent}; border-radius:4px 4px 0 0; transition:height 0.4s ease; box-shadow:0 0 10px ${accent}66;"></div>
      <div class="b-col" style="width:14px; height:65%; background:#9B7CFF; border-radius:4px 4px 0 0; transition:height 0.4s ease;"></div>
    `;
    const randomize = () => {
      wrap.querySelectorAll('.b-col').forEach(c => {
        c.style.height = `${20 + Math.random() * 75}%`;
      });
    };
    wrap.addEventListener('click', randomize);
    stage.appendChild(wrap);
    restartFn = randomize;

  } else if (id.includes('donut') || id === 'donut-chart-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:90px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 80 80" style="width:80px; height:80px; transform:rotate(-90deg);">
        <circle cx="40" cy="40" r="30" fill="none" stroke="#222838" stroke-width="8"/>
        <circle class="d-seg1" cx="40" cy="40" r="30" fill="none" stroke="${accent}" stroke-width="8" stroke-dasharray="188" stroke-dashoffset="60" style="transition:stroke-dashoffset 0.5s ease;"/>
        <circle class="d-seg2" cx="40" cy="40" r="30" fill="none" stroke="#42E8F5" stroke-width="8" stroke-dasharray="188" stroke-dashoffset="130" style="transition:stroke-dashoffset 0.5s ease;"/>
      </svg>
      <div style="position:absolute; font-family:var(--font-mono); font-size:11px; font-weight:800; color:#FFF;">68%</div>
    `;
    const s1 = wrap.querySelector('.d-seg1');
    const s2 = wrap.querySelector('.d-seg2');
    const redraw = () => {
      s1.style.strokeDashoffset = '188';
      s2.style.strokeDashoffset = '188';
      setTimeout(() => { s1.style.strokeDashoffset = '60'; s2.style.strokeDashoffset = '130'; }, 60);
    };
    wrap.addEventListener('click', redraw);
    stage.appendChild(wrap);
    restartFn = redraw;

  } else if (id.includes('radial-statistics') || id === 'radial-statistics') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:90px; display:flex; align-items:center; justify-content:space-around; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:relative; width:65px; height:65px; display:flex; align-items:center; justify-content:center;">
        <svg viewBox="0 0 60 60" style="width:60px; height:60px; transform:rotate(-90deg);">
          <circle cx="30" cy="30" r="24" fill="none" stroke="#252D3D" stroke-width="4"/>
          <circle cx="30" cy="30" r="18" fill="none" stroke="#252D3D" stroke-width="4"/>
          <circle class="r-arc1" cx="30" cy="30" r="24" fill="none" stroke="${accent}" stroke-width="4" stroke-dasharray="150" stroke-dashoffset="35" style="transition:stroke-dashoffset 0.5s;"/>
          <circle class="r-arc2" cx="30" cy="30" r="18" fill="none" stroke="#42E8F5" stroke-width="4" stroke-dasharray="113" stroke-dashoffset="30" style="transition:stroke-dashoffset 0.5s;"/>
        </svg>
        <span style="position:absolute; font-size:9px; font-weight:800; color:#FFF;">GPU</span>
      </div>
      <div style="display:flex; flex-direction:column; gap:4px; font-size:9px; font-family:var(--font-mono);">
        <div style="color:${accent}; font-weight:800;">● Core: 78%</div>
        <div style="color:#42E8F5; font-weight:800;">● VRAM: 62%</div>
        <div style="color:var(--text-muted);">120 FPS Valid</div>
      </div>
    `;
    const arc1 = wrap.querySelector('.r-arc1');
    const toggle = () => {
      arc1.style.strokeDashoffset = (arc1.style.strokeDashoffset === '70') ? '35' : '70';
    };
    wrap.addEventListener('click', toggle);
    stage.appendChild(wrap);
    restartFn = toggle;

  } else if (id.includes('area-chart') || id === 'animated-area-chart') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:80px; cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 140 60" style="width:100%; height:100%; overflow:visible;">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${accent}" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <polygon class="ac-poly" points="10,55 10,40 45,20 80,35 115,10 135,25 135,55" fill="url(#areaGrad)"/>
        <path d="M 10 40 L 45 20 L 80 35 L 115 10 L 135 25" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="115" cy="10" r="3.5" fill="#FFF" stroke="${accent}" stroke-width="2"/>
      </svg>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('flip-counter') || id === 'number-flip-counter') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:4px; cursor:pointer; align-items:center;';
    const digits = ['0', '9', '4', '2'];
    wrap.innerHTML = digits.map((d, i) => `
      <div class="flip-cell" style="width:26px; height:38px; border-radius:6px; background:#181D2A; border:1px solid #333C50; display:flex; align-items:center; justify-content:center; font-family:var(--font-mono); font-size:18px; font-weight:800; color:${i === 1 ? accent : '#FFF'}; box-shadow:inset 0 1px 0 rgba(255,255,255,0.1); transition:transform 0.3s;">
        ${d}
      </div>
    `).join('') + `<span style="font-size:10px; font-weight:800; color:${accent}; margin-left:4px;">FPS</span>`;
    const roll = () => {
      wrap.querySelectorAll('.flip-cell').forEach((c, idx) => {
        c.style.transform = 'rotateX(90deg)';
        setTimeout(() => {
          c.textContent = Math.floor(Math.random() * 10);
          c.style.transform = 'rotateX(0deg)';
        }, 120 + idx * 40);
      });
    };
    wrap.addEventListener('click', roll);
    stage.appendChild(wrap);
    restartFn = roll;

  } else if (id.includes('sparkline') || id === 'sparkline-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; padding:10px; border-radius:8px; background:#141722; border:1px solid #282E3D; display:flex; align-items:center; justify-content:space-between; cursor:pointer;';
    wrap.innerHTML = `
      <div>
        <div style="font-size:8px; color:var(--text-muted);">Latency</div>
        <div style="font-size:12px; font-weight:800; color:#FFF; font-family:var(--font-mono);">8.2 ms</div>
      </div>
      <svg viewBox="0 0 70 24" style="width:70px; height:24px;">
        <path d="M 5 18 L 20 12 L 35 16 L 50 6 L 65 10" fill="none" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>
        <circle cx="65" cy="10" r="2.5" fill="${accent}"/>
      </svg>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.05)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('heatmap') || id === 'animated-heatmap') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:grid; grid-template-columns:repeat(6, 16px); gap:4px; cursor:pointer;';
    for (let i = 0; i < 18; i++) {
      const cell = document.createElement('div');
      const val = (i * 19) % 100;
      const op = val > 70 ? 0.9 : (val > 40 ? 0.5 : 0.2);
      cell.style.cssText = `width:16px; height:16px; border-radius:3px; background:${accent}; opacity:${op}; transition:opacity 0.3s;`;
      wrap.appendChild(cell);
    }
    const randomize = () => {
      wrap.querySelectorAll('div').forEach(c => {
        c.style.opacity = `${0.15 + Math.random() * 0.85}`;
      });
    };
    wrap.addEventListener('click', randomize);
    stage.appendChild(wrap);
    restartFn = randomize;

  } else {
    // Progress Dashboard Cards
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; padding:10px; border-radius:10px; background:#151A24; border:1px solid #282E3D; display:flex; flex-direction:column; gap:6px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:9px; font-weight:800; color:#FFF;">Render Queue</span>
        <span style="font-size:8px; font-weight:800; color:${accent}; background:${accent}22; padding:2px 4px; border-radius:3px;">+24%</span>
      </div>
      <div style="font-size:14px; font-weight:900; color:#FFF; font-family:var(--font-mono);">1,420 pkts</div>
      <div style="height:4px; border-radius:2px; background:#252D3D; overflow:hidden;">
        <div class="kpi-bar" style="width:72%; height:100%; background:${accent}; transition:width 0.4s ease;"></div>
      </div>
    `;
    const bar = wrap.querySelector('.kpi-bar');
    const toggleKpi = () => {
      bar.style.width = (bar.style.width === '94%') ? '40%' : '94%';
    };
    wrap.addEventListener('click', toggleKpi);
    stage.appendChild(wrap);
    restartFn = toggleKpi;
  }

  return { restart: restartFn, destroy: destroyFn };
}
