/**
 * DartNova Loaders & Progress Visualizers (26 Bespoke Modern UI Components)
 */

export function renderLoaderVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('orbit') || id === 'orbit-loader') {
    const el = document.createElement('div');
    el.className = 'dn-orbit-loader-widget';
    el.style.cursor = 'pointer';
    el.innerHTML = `<div class="dn-orbit-ring ring-1" style="border-color:${accent};"></div><div class="dn-orbit-ring ring-2"></div><div class="dn-orbit-center" style="background:${accent}; box-shadow:0 0 12px ${accent};"></div>`;
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.2)'; setTimeout(() => el.style.transform = 'none', 200); };

  } else if (id.includes('wave-loader') || id === 'wave-loader') {
    const el = document.createElement('div');
    el.className = 'dn-wave-loader-widget';
    el.style.cursor = 'pointer';
    el.innerHTML = `<div class="dn-wave-bar" style="background:${accent};"></div><div class="dn-wave-bar" style="background:#42E8F5;"></div><div class="dn-wave-bar" style="background:#9B7CFF;"></div><div class="dn-wave-bar" style="background:#42E8F5;"></div><div class="dn-wave-bar" style="background:${accent};"></div>`;
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.2)'; setTimeout(() => el.style.transform = 'none', 200); };

  } else if (id.includes('counter') || id.includes('number') || id === 'animated-number-counter') {
    const el = document.createElement('div');
    el.style.cssText = `font-family:var(--font-mono); font-size:36px; font-weight:800; color:${accent}; cursor:pointer;`;
    let count = 0;
    const interval = setInterval(() => {
      count = (count + 1) % 100;
      el.textContent = String(count).padStart(2, '0') + '%';
    }, 50);
    destroyFn = () => clearInterval(interval);
    stage.appendChild(el);
    restartFn = () => { count = 0; };

  } else if (id.includes('dot-matrix') || id === 'dot-matrix-loader') {
    const el = document.createElement('div');
    el.style.cssText = 'display:grid; grid-template-columns:repeat(4, 10px); gap:6px; cursor:pointer;';
    for (let i = 0; i < 16; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `width:10px; height:10px; border-radius:50%; background:${accent}; opacity:${0.2 + (i % 4) * 0.25}; animation:dnPulseGlow 1.5s ease-in-out infinite alternate; animation-delay:${(i % 4) * 0.15 + Math.floor(i / 4) * 0.1}s;`;
      el.appendChild(dot);
    }
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.15)'; setTimeout(() => el.style.transform = 'none', 180); };

  } else if (id.includes('segmented') || id === 'segmented-progress-bar') {
    const el = document.createElement('div');
    el.style.cssText = 'display:flex; gap:6px; width:160px; cursor:pointer;';
    for (let i = 0; i < 5; i++) {
      const seg = document.createElement('div');
      seg.style.cssText = `flex:1; height:8px; border-radius:4px; background:#222632; overflow:hidden; position:relative;`;
      seg.innerHTML = `<div style="width:100%; height:100%; background:${accent}; transform:translateX(-100%); animation:dnBarGrow 2s ease-in-out infinite alternate; animation-delay:${i * 0.2}s;"></div>`;
      el.appendChild(seg);
    }
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.08)'; setTimeout(() => el.style.transform = 'none', 180); };

  } else if (id.includes('shimmer') || id === 'shimmer-effect') {
    const el = document.createElement('div');
    el.style.cssText = `width:160px; height:24px; border-radius:6px; background:#1C2230; position:relative; overflow:hidden; cursor:pointer;`;
    el.innerHTML = `<div style="position:absolute; inset:0; background:linear-gradient(90deg, transparent, ${accent}55, transparent); animation:dnShimmerSweep 1.8s infinite linear;"></div>`;
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.08)'; setTimeout(() => el.style.transform = 'none', 180); };

  } else if (id.includes('quantum') || id === 'quantum-spinner-loader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; width:50px; height:20px; border-radius:50%; border:1.5px solid ${accent}; transform:rotate(30deg); animation:dnOrbitRotate 2s linear infinite;"></div>
      <div style="position:absolute; width:50px; height:20px; border-radius:50%; border:1.5px solid #42E8F5; transform:rotate(-30deg); animation:dnOrbitRotate 2.5s linear infinite;"></div>
      <div style="width:12px; height:12px; border-radius:50%; background:${accent}; box-shadow:0 0 12px ${accent};"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('hourglass') || id === 'liquid-hourglass-loader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:40px; height:60px; display:flex; flex-direction:column; align-items:center; justify-content:space-between; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:30px; height:22px; border-radius:4px 4px 15px 15px; background:#1A2234; border:1px solid #334260; position:relative; overflow:hidden;">
        <div style="position:absolute; bottom:0; width:100%; height:80%; background:${accent}; opacity:0.8; animation:dnBarGrow 3s infinite alternate;"></div>
      </div>
      <div style="width:2px; height:12px; background:${accent}; animation:dnPulseGlow 0.8s infinite;"></div>
      <div style="width:30px; height:22px; border-radius:15px 15px 4px 4px; background:#1A2234; border:1px solid #334260; position:relative; overflow:hidden;">
        <div style="position:absolute; bottom:0; width:100%; height:30%; background:${accent}; opacity:0.8; animation:dnBarGrow 3s infinite alternate-reverse;"></div>
      </div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'rotate(180deg)'; setTimeout(() => wrap.style.transform = 'none', 400); };

  } else if (id.includes('radar-sweep') || id === 'radar-sweep-loader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:65px; height:65px; border-radius:50%; border:1px solid #1C3D2E; background:#0B140E; overflow:hidden; cursor:pointer;';
    wrap.innerHTML = `<div style="position:absolute; inset:0; background:conic-gradient(from 0deg, transparent 70%, #39FF14 100%); animation:dnBorderBeam 2s linear infinite; opacity:0.4;"></div><div style="position:absolute; top:50%; left:50%; width:4px; height:4px; border-radius:50%; background:#39FF14; transform:translate(-50%, -50%);"></div>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('dna-helix') || id === 'dna-helix-loader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:6px; align-items:center; height:50px; cursor:pointer;';
    for (let i = 0; i < 7; i++) {
      const col = document.createElement('div');
      col.style.cssText = `display:flex; flex-direction:column; justify-content:space-between; height:40px; animation:dnFloatLevitate 1.2s infinite alternate; animation-delay:${i * 0.15}s;`;
      col.innerHTML = `<span style="width:6px; height:6px; border-radius:50%; background:${accent};"></span><span style="width:6px; height:6px; border-radius:50%; background:#42E8F5;"></span>`;
      wrap.appendChild(col);
    }
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('gear-mesh') || id === 'gear-mesh-loader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:70px; height:50px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; top:0; left:0; width:34px; height:34px; border-radius:50%; border:3px dashed ${accent}; animation:dnOrbitRotate 3s linear infinite;"></div>
      <div style="position:absolute; bottom:0; right:0; width:26px; height:26px; border-radius:50%; border:3px dashed #42E8F5; animation:dnOrbitRotate 2.3s linear infinite reverse;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('cube-grid') || id === 'cube-grid-loader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:grid; grid-template-columns:repeat(3, 14px); gap:4px; cursor:pointer;';
    for (let i = 0; i < 9; i++) {
      const cube = document.createElement('div');
      cube.style.cssText = `width:14px; height:14px; border-radius:2px; background:${i % 2 === 0 ? accent : '#1C2433'}; animation:dnPulseGlow 1.2s infinite alternate; animation-delay:${i * 0.1}s;`;
      wrap.appendChild(cube);
    }
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('infinity-loop') || id === 'infinity-loop-loader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `font-size:32px; font-weight:900; color:${accent}; cursor:pointer; animation:dnPulseGlow 1.5s infinite; text-shadow:0 0 16px ${accent};`;
    wrap.textContent = '♾️';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.3)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('pacman') || id === 'pacman-chomp-loader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; gap:8px; cursor:pointer;';
    wrap.innerHTML = `
      <span style="font-size:22px; animation:dnFloatLevitate 0.6s infinite alternate;">🟡</span>
      <span style="width:6px; height:6px; border-radius:50%; background:#FFF; opacity:0.8;"></span>
      <span style="width:6px; height:6px; border-radius:50%; background:#FFF; opacity:0.8;"></span>
      <span style="width:6px; height:6px; border-radius:50%; background:#FFF; opacity:0.8;"></span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('fidget-spinner') || id === 'fidget-spinner-loader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `font-size:30px; animation:dnOrbitRotate 1.2s linear infinite; cursor:pointer; filter:drop-shadow(0 0 10px ${accent});`;
    wrap.textContent = '🌀';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.animationDuration = '0.5s'; setTimeout(() => wrap.style.animationDuration = '1.2s', 500); };

  } else if (id.includes('battery-charge') || id === 'battery-charge-loader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:50px; height:24px; border-radius:4px; border:2px solid ${accent}; padding:2px; box-sizing:border-box; display:flex;">
        <div style="height:100%; width:75%; background:${accent}; border-radius:2px; animation:dnBarGrow 2s infinite alternate;"></div>
      </div>
      <div style="width:4px; height:10px; background:${accent}; border-radius:0 2px 2px 0;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('audio-equalizer') || id === 'audio-equalizer-loader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:3px; align-items:flex-end; height:32px; cursor:pointer;';
    for (let i = 0; i < 7; i++) {
      const bar = document.createElement('div');
      bar.style.cssText = `width:4px; border-radius:2px; background:${accent}; animation:dnEqBounce ${0.4 + (i % 3) * 0.2}s infinite alternate; animation-delay:${i * 0.1}s;`;
      wrap.appendChild(bar);
    }
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('concentric-ripple') || id === 'concentric-ripple-loader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:50px; height:50px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; width:45px; height:45px; border-radius:50%; border:1.5px solid ${accent}55; animation:dnPulseGlow 1.6s infinite;"></div>
      <div style="position:absolute; width:30px; height:30px; border-radius:50%; border:1.5px solid ${accent}88; animation:dnPulseGlow 1.2s infinite alternate;"></div>
      <div style="width:14px; height:14px; border-radius:50%; background:${accent};"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('pulse-ring') || id === 'pulse-ring-loader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:40px; height:40px; border-radius:50%; border:3px solid ${accent}; box-shadow:0 0 16px ${accent}; animation:dnPulseGlow 1.2s infinite; cursor:pointer;`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.25)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('hypnotic-spiral') || id === 'hypnotic-spiral-loader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `font-size:36px; animation:dnOrbitRotate 2.5s linear infinite; cursor:pointer; filter:drop-shadow(0 0 12px ${accent});`;
    wrap.textContent = '🍥';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('bar-shuffler') || id === 'bar-shuffler-loader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:4px; height:35px; align-items:center; cursor:pointer;';
    for (let i = 0; i < 5; i++) {
      const b = document.createElement('div');
      b.style.cssText = `width:5px; height:${12 + i * 4}px; border-radius:3px; background:${i % 2 === 0 ? accent : '#42E8F5'}; animation:dnFloatLevitate ${0.8 + i * 0.15}s infinite alternate;`;
      wrap.appendChild(b);
    }
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('digital-clock') || id === 'digital-clock-loader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:50px; height:50px; border-radius:50%; border:2px solid #283348; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `<div style="position:absolute; top:8px; width:2px; height:18px; background:${accent}; transform-origin:bottom; animation:dnOrbitRotate 2s linear infinite;"></div>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else {
    // Circular Progress Default
    const el = document.createElement('div');
    el.className = 'dn-circular-ring-widget';
    el.style.cssText = 'width:50px; height:50px; cursor:pointer;';
    el.innerHTML = `<svg viewBox="0 0 50 50" style="width:100%; height:100%; animation:dnOrbitRotate 1.4s linear infinite;"><circle cx="25" cy="25" r="20" fill="none" stroke="${accent}" stroke-width="4" stroke-dasharray="80" stroke-dashoffset="20" stroke-linecap="round"/></svg>`;
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.2)'; setTimeout(() => el.style.transform = 'none', 200); };
  }

  return { restart: restartFn, destroy: destroyFn };
}
