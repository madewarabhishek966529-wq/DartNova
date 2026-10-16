/**
 * DartNova Dynamic & Ambient Backgrounds Visualizers (26 Bespoke Modern UI Components)
 * 120 FPS hardware-accelerated animations with interactive mouse/touch triggers
 */

export function renderBackgroundVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('animated-gradient') || id === 'animated-gradient') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:160px; height:90px; border-radius:10px; border:1px solid #282E3D; background:linear-gradient(135deg, ${accent}44, #42E8F544, #9B7CFF44, #FF4B7244); background-size:300% 300%; animation:dnShimmerSweep 5s ease infinite; cursor:pointer; display:flex; align-items:center; justify-content:center;`;
    wrap.innerHTML = `<span style="font-size:9px; font-weight:800; color:#FFF;">Animated Gradient</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('wave-animation') || id === 'wave-animation') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:90px; border-radius:10px; background:#10141D; border:1px solid #282E3D; overflow:hidden; position:relative; cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 160 90" style="position:absolute; inset:0; width:100%; height:100%;">
        <path d="M 0 50 Q 40 20, 80 50 T 160 50 L 160 90 L 0 90 Z" fill="${accent}" fill-opacity="0.25"/>
        <path d="M 0 65 Q 40 40, 80 65 T 160 65 L 160 90 L 0 90 Z" fill="${accent}" fill-opacity="0.45"/>
      </svg>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('neon-gradient') || id === 'neon-gradient') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:160px; height:90px; border-radius:10px; border:1.5px solid ${accent}; background:radial-gradient(circle at 50% 50%, ${accent}55, #0B0E14); box-shadow:0 0 20px ${accent}44; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:9px; font-weight:800; cursor:pointer;`;
    wrap.textContent = 'Neon Radiance';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('particle-motion') || id === 'particle-motion') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:90px; border-radius:10px; background:#0B0E14; border:1px solid #282E3D; overflow:hidden; cursor:pointer;';
    for (let i = 0; i < 8; i++) {
      const p = document.createElement('div');
      p.style.cssText = `position:absolute; width:4px; height:4px; border-radius:50%; background:${accent}; top:${Math.random() * 80}px; left:${Math.random() * 150}px; animation:dnFloatLevitate ${1 + Math.random()}s infinite alternate;`;
      wrap.appendChild(p);
    }
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('spotlight-effect') || id === 'spotlight-effect') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:90px; border-radius:10px; background:#0E1118; border:1px solid #282E3D; overflow:hidden; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div class="se-beam" style="position:absolute; width:80px; height:80px; border-radius:50%; background:radial-gradient(circle, ${accent}55, transparent); pointer-events:none; transition:transform 0.1s;"></div>
      <span style="font-size:9px; font-weight:800; color:#FFF;">Spotlight Surface</span>
    `;
    const beam = wrap.querySelector('.se-beam');
    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left - 40;
      const y = e.clientY - rect.top - 40;
      beam.style.transform = `translate(${x}px, ${y}px)`;
    });
    stage.appendChild(wrap);
    restartFn = () => { beam.style.transform = 'scale(1.5)'; setTimeout(() => beam.style.transform = 'none', 200); };

  } else if (id.includes('aurora') || id === 'aurora-background') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:160px; height:90px; border-radius:10px; background:linear-gradient(45deg, #091515, #0D2818, ${accent}33, #091515); border:1px solid #282E3D; overflow:hidden; position:relative; cursor:pointer; display:flex; align-items:center; justify-content:center;`;
    wrap.innerHTML = `<span style="font-size:9px; font-weight:800; color:#FFF;">Aurora Waves</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('starfield-motion') || id === 'starfield-motion') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:90px; border-radius:10px; background:#06080C; border:1px solid #282E3D; overflow:hidden; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `<span style="font-size:8px; color:var(--text-muted); z-index:1;">Starfield Warp</span>`;
    for (let i = 0; i < 12; i++) {
      const s = document.createElement('div');
      s.style.cssText = `position:absolute; width:2px; height:2px; border-radius:50%; background:#FFF; top:${Math.random() * 80}px; left:${Math.random() * 150}px; animation:dnPulseGlow 1s infinite alternate;`;
      wrap.appendChild(s);
    }
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('interactive-constellation') || id === 'interactive-constellation') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:90px; border-radius:10px; background:#0F131C; border:1px solid #282E3D; overflow:hidden; cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 160 90" style="position:absolute; inset:0; width:100%; height:100%;">
        <line x1="30" y1="30" x2="80" y2="60" stroke="${accent}66" stroke-width="1.5"/>
        <line x1="80" y1="60" x2="130" y2="25" stroke="${accent}66" stroke-width="1.5"/>
        <circle cx="30" cy="30" r="3" fill="${accent}"/>
        <circle cx="80" cy="60" r="4" fill="${accent}"/>
        <circle cx="130" cy="25" r="3" fill="${accent}"/>
      </svg>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('liquid-blob-background') || id === 'liquid-blob-background') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:90px; border-radius:10px; background:#0E121B; border:1px solid #282E3D; overflow:hidden; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div style="position:absolute; width:70px; height:70px; border-radius:40% 60% 70% 30% / 40% 50% 60% 50%; background:linear-gradient(135deg, ${accent}66, #42E8F544); animation:dnOrbitRotate 6s linear infinite;"></div>
      <span style="position:relative; z-index:1; font-size:9px; font-weight:800; color:#FFF;">Metaball Liquid</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('animated-grid') || id === 'animated-grid') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:300px; width:160px; height:90px; border-radius:10px; background:#0B0E14; border:1px solid #282E3D; overflow:hidden; cursor:pointer; display:flex; align-items:flex-end; justify-content:center;';
    wrap.innerHTML = `
      <div style="width:200px; height:120px; background:linear-gradient(to right, ${accent}22 1px, transparent 1px), linear-gradient(to bottom, ${accent}22 1px, transparent 1px); background-size:16px 16px; transform:rotateX(60deg); transform-origin:bottom center;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('matrix-cyber-hex') || id === 'matrix-cyber-hex-bg') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:90px; border-radius:10px; background:#0C1018; border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:900; font-size:10px; cursor:pointer;';
    wrap.textContent = 'HEX LATTICE';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('floating-dust-motes') || id === 'floating-dust-motes') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:90px; border-radius:10px; background:#0D111A; border:1px solid #282E3D; overflow:hidden; cursor:pointer;';
    for (let i = 0; i < 10; i++) {
      const d = document.createElement('div');
      d.style.cssText = `position:absolute; width:3px; height:3px; border-radius:50%; background:#FFF; opacity:0.4; top:${Math.random() * 80}px; left:${Math.random() * 150}px;`;
      wrap.appendChild(d);
    }
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('warp-speed-hyperdrive') || id === 'warp-speed-hyperdrive') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:90px; border-radius:10px; background:#000; border:1px solid ${accent}; overflow:hidden; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `<span style="font-size:10px; font-weight:900; color:${accent}; font-family:var(--font-mono);">HYPERDRIVE</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('perlin-noise-terrain') || id === 'perlin-noise-terrain') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:90px; border-radius:10px; background:#111622; border:1px solid #282E3D; overflow:hidden; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <svg viewBox="0 0 160 90" style="width:100%; height:100%;">
        <path d="M 0 45 Q 40 15, 80 45 T 160 45" fill="none" stroke="${accent}" stroke-width="1.5"/>
        <path d="M 0 60 Q 40 35, 80 60 T 160 60" fill="none" stroke="${accent}88" stroke-width="1.5"/>
      </svg>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('voronoi-cell-mesh') || id === 'voronoi-cell-mesh') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:90px; border-radius:10px; background:#10141E; border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:900; color:${accent}; cursor:pointer;';
    wrap.textContent = 'VORONOI CELLS';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('magnetic-gravity-particles') || id === 'magnetic-gravity-particles') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:90px; border-radius:10px; background:#0B0E14; border:1px solid #282E3D; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:16px; height:16px; border-radius:50%; background:${accent}; box-shadow:0 0 14px ${accent};"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('flowing-silk-ribbons') || id === 'flowing-silk-ribbons') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:160px; height:90px; border-radius:10px; background:linear-gradient(120deg, ${accent}22, #42E8F544, transparent); border:1px solid #282E3D; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:9px; font-weight:800; cursor:pointer;`;
    wrap.textContent = 'Silk Ribbons';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('cyberpunk-city-grid') || id === 'cyberpunk-city-grid') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:90px; border-radius:10px; background:#0D0B14; border:1px solid #FF4B72; overflow:hidden; cursor:pointer; display:flex; align-items:flex-end; justify-content:center;';
    wrap.innerHTML = `
      <div style="position:absolute; top:12px; width:30px; height:30px; border-radius:50%; background:linear-gradient(to bottom, #FFA500, #FF4B72);"></div>
      <div style="width:100%; height:35px; background:repeating-linear-gradient(0deg, #FF4B7244, #FF4B7244 1px, transparent 1px, transparent 8px);"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('digital-rain-code') || id === 'digital-rain-code') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:90px; border-radius:10px; background:#050B05; border:1px solid #00FF66; padding:6px; box-sizing:border-box; color:#00FF66; font-family:var(--font-mono); font-size:8px; line-height:1.2; cursor:pointer; overflow:hidden;';
    wrap.innerHTML = `01011001<br>11001010<br>00110101<br>10100110`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('nebula-cloud-drift') || id === 'nebula-cloud-drift') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:160px; height:90px; border-radius:10px; background:radial-gradient(circle at 30% 40%, #9B7CFF55, #42E8F533, #090B10); border:1px solid #282E3D; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:9px; font-weight:800; cursor:pointer;`;
    wrap.textContent = 'Nebula Drift';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('subtle-dot-grid-shift') || id === 'subtle-dot-grid-shift') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:160px; height:90px; border-radius:10px; background-image:radial-gradient(#FFF 1px, transparent 1px); background-size:12px 12px; background-color:#10131A; border:1px solid #282E3D; cursor:pointer;`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('plasma-energy-mesh') || id === 'plasma-energy-mesh') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:160px; height:90px; border-radius:10px; background:radial-gradient(ellipse at center, ${accent}66 0%, #000 80%); border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:900; font-size:10px; cursor:pointer;`;
    wrap.textContent = 'PLASMA FIELD';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('bokeh-blur-orbs') || id === 'bokeh-blur-orbs') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:90px; border-radius:10px; background:#0B0E14; border:1px solid #282E3D; overflow:hidden; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; width:45px; height:45px; border-radius:50%; background:${accent}44; filter:blur(8px); top:10px; left:20px;"></div>
      <div style="position:absolute; width:55px; height:55px; border-radius:50%; background:#42E8F544; filter:blur(10px); bottom:10px; right:20px;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('sunburst-radial-rays') || id === 'sunburst-radial-rays') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:160px; height:90px; border-radius:10px; background:repeating-conic-gradient(from 0deg, ${accent}22 0deg 15deg, transparent 15deg 30deg); border:1px solid #282E3D; display:flex; align-items:center; justify-content:center; cursor:pointer;`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'rotate(30deg) scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('water-ripple-pool') || id === 'water-ripple-pool') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:90px; border-radius:10px; background:#0A121A; border:1px solid #42E8F5; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; width:30px; height:30px; border-radius:50%; border:2px solid #42E8F5;"></div>
      <div style="position:absolute; width:60px; height:60px; border-radius:50%; border:1.5px solid #42E8F5; opacity:0.6;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else {
    // 26. circuit-board-traces & default background
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:160px; height:90px; border-radius:10px; background:#0B1015; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:900; font-size:10px; cursor:pointer;`;
    wrap.textContent = 'CIRCUIT TRACES';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };
  }

  return { restart: restartFn, destroy: destroyFn };
}
