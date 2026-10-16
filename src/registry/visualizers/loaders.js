/**
 * DartNova Loaders & Progress Visualizers (10 Bespoke Modern UI Components)
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

  } else if (id.includes('wave') || id === 'wave-loader') {
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
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; padding:10px; border-radius:10px; background:#141822; border:1px solid #282E3D; display:flex; flex-direction:column; gap:6px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="height:12px; width:60%; border-radius:4px; background:linear-gradient(90deg, #1C2232 20%, #2D374E 50%, #1C2232 80%); background-size:200% 100%; animation:dnShimmerSweep 1.5s infinite;"></div>
      <div style="height:8px; width:100%; border-radius:4px; background:linear-gradient(90deg, #1C2232 20%, #2D374E 50%, #1C2232 80%); background-size:200% 100%; animation:dnShimmerSweep 1.5s infinite 0.2s;"></div>
      <div style="height:8px; width:80%; border-radius:4px; background:linear-gradient(90deg, #1C2232 20%, #2D374E 50%, #1C2232 80%); background-size:200% 100%; animation:dnShimmerSweep 1.5s infinite 0.4s;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.05)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('particle-loader') || id === 'particle-loader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:80px; height:80px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `<div style="width:16px; height:16px; border-radius:50%; background:${accent}; box-shadow:0 0 12px ${accent};"></div>`;
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('div');
      p.style.cssText = `position:absolute; width:6px; height:6px; border-radius:50%; background:#42E8F5; animation:dnOrbitRotate ${1.8 + i * 0.2}s linear infinite; animation-delay:${i * 0.15}s; transform-origin: 40px 40px;`;
      wrap.appendChild(p);
    }
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('liquid-loader') || id === 'liquid-loader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:60px; height:80px; border-radius:12px; border:2px solid #333F54; overflow:hidden; background:#12151E; display:flex; flex-direction:column; justify-content:flex-end; cursor:pointer;';
    wrap.innerHTML = `
      <div class="ll-fill" style="width:100%; height:60%; background:linear-gradient(180deg, ${accent}, #42E8F5); opacity:0.85; animation:dnLiquidWave 3s ease-in-out infinite alternate;"></div>
      <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-family:var(--font-mono); font-size:10px; font-weight:800; color:#FFF; text-shadow:0 1px 4px rgba(0,0,0,0.8);">60%</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('morphing-blob') || id === 'morphing-blob-loader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="mb-blob" style="width:65px; height:65px; border-radius:45% 55% 60% 40% / 50% 45% 55% 50%; background:linear-gradient(135deg, ${accent}, #9B7CFF); box-shadow:0 0 20px ${accent}66; animation:dnAuroraShift 3s ease-in-out infinite alternate; display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:12px;">
        ✦
      </div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else {
    // Circular SVG Progress Ring
    const el = document.createElement('div');
    el.className = 'dn-circular-ring-widget';
    el.style.cursor = 'pointer';
    el.innerHTML = `<svg viewBox="0 0 76 76"><circle class="track" cx="38" cy="38" r="30" stroke-width="6" fill="none"></circle><circle class="fill" cx="38" cy="38" r="30" stroke-width="6" fill="none" style="stroke:${accent}; stroke-dasharray:188; stroke-dashoffset:60; transition:stroke-dashoffset 0.6s ease;"></circle></svg><div class="ring-val" style="color:${accent};">84%</div>`;
    stage.appendChild(el);
    restartFn = () => {
      const circle = el.querySelector('.fill');
      if (circle) {
        circle.style.strokeDashoffset = '188';
        setTimeout(() => { circle.style.strokeDashoffset = '60'; }, 40);
      }
    };
  }

  return { restart: restartFn, destroy: destroyFn };
}
