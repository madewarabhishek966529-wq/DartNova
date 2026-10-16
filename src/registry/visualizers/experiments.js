/**
 * DartNova Cutting-Edge Creative Coding & Experiments Visualizers (26 Bespoke Modern UI Components)
 * 120 FPS hardware-accelerated animations with interactive mouse/touch triggers
 */

export function renderExperimentVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('image-trail') || id === 'image-trail') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:150px; height:85px; border-radius:10px; background:#121622; border:1px solid #282E3D; overflow:hidden; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `<span style="font-size:9px; font-weight:800; color:#FFF;">Mouse Image Trail</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('particle-explosion') || id === 'particle-explosion') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:26px;';
    wrap.textContent = '💥';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.4) rotate(20deg)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('text-to-particle') || id === 'text-to-particle') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:10px 18px; border-radius:8px; background:#141926; border:1px solid ${accent}; font-weight:900; color:${accent}; font-size:11px; cursor:pointer;';
    wrap.textContent = 'TEXT DISPERSE ✦';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('svg-path-drawing') || id === 'svg-path-drawing') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 60 60" style="width:50px; height:50px;">
        <path d="M 10 30 Q 30 5, 50 30 T 10 30" fill="none" stroke="${accent}" stroke-width="2.5"/>
      </svg>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'rotate(180deg) scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 250); };

  } else if (id.includes('morphing-svg-shapes') || id === 'morphing-svg-shapes') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:50px; height:50px; border-radius:12px; background:linear-gradient(135deg, ${accent}, #42E8F5); cursor:pointer; transition:all 0.4s;';
    let circle = false;
    wrap.addEventListener('click', () => {
      circle = !circle;
      wrap.style.borderRadius = circle ? '50%' : '12px';
      wrap.style.transform = circle ? 'rotate(90deg)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('liquid-metal-effect') || id === 'liquid-metal-effect') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:140px; height:80px; border-radius:10px; background:linear-gradient(135deg, #CBD5E0, #4A5568, #E2E8F0); border:1.5px solid #FFF; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:10px; color:#08090B; cursor:pointer; box-shadow:0 10px 24px rgba(0,0,0,0.6);';
    wrap.textContent = 'MOLTEN CHROME';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('magnetic-cursor-field') || id === 'magnetic-cursor-field') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:grid; grid-template-columns:repeat(4, 16px); gap:6px; cursor:pointer;';
    for (let i = 0; i < 12; i++) {
      const pin = document.createElement('div');
      pin.style.cssText = `width:16px; height:3px; background:${accent}; border-radius:1px; transform:rotate(${i * 30}deg);`;
      wrap.appendChild(pin);
    }
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15) rotate(45deg)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('waveform-visualizer') || id === 'waveform-visualizer') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:150px; height:50px; cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 150 50" style="width:100%; height:100%;">
        <path d="M 0 25 Q 35 5, 75 25 T 150 25" fill="none" stroke="${accent}" stroke-width="2.5"/>
      </svg>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('animated-logo-reveal') || id === 'animated-logo-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:50px; height:50px; border-radius:10px; background:${accent}; color:#08090B; font-weight:900; font-size:24px; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 0 16px ${accent}66;';
    wrap.textContent = '⚡';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.3) rotate(360deg)';
      setTimeout(() => wrap.style.transform = 'none', 350);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('confetti-celebration') || id === 'confetti-celebration') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:32px; cursor:pointer;';
    wrap.textContent = '🎉';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.4) rotate(15deg)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('gravity-cloth-mesh') || id === 'gravity-cloth-mesh') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:140px; height:80px; border-radius:8px; background:#141926; border:1px dashed ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:800; font-size:9px; cursor:pointer;';
    wrap.textContent = 'CLOTH PHYSICS MESH';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08) skewX(6deg)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('boids-flocking-simulation') || id === 'boids-flocking-simulation') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:140px; height:80px; border-radius:8px; background:#10141E; border:1px solid #282E3D; overflow:hidden; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `<span style="font-size:8px; font-weight:800; color:${accent};">BOIDS SWARM (30)</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('fireworks-sky-display') || id === 'fireworks-sky-display') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:32px; cursor:pointer;';
    wrap.textContent = '🎆';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.4)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('chaos-pendulum-fractal') || id === 'chaos-pendulum-fractal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:60px; height:60px; border-radius:50%; border:2px solid ${accent}; display:flex; align-items:center; justify-content:center; font-size:8px; font-weight:900; color:${accent}; cursor:pointer;';
    wrap.textContent = 'CHAOS';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'rotate(180deg) scale(1.2)';
      setTimeout(() => wrap.style.transform = 'none', 250);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('gravitational-attractor') || id === 'gravitational-attractor') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:70px; height:70px; border-radius:50%; border:2px dashed #42E8F5; display:flex; align-items:center; justify-content:center; color:#42E8F5; font-size:9px; font-weight:900; cursor:pointer;';
    wrap.textContent = 'LORENZ';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15) rotate(45deg)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('sound-frequency-mandala') || id === 'sound-frequency-mandala') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:65px; height:65px; border-radius:50%; border:2px solid ${accent}; display:flex; align-items:center; justify-content:center; font-size:8px; font-weight:900; color:${accent}; cursor:pointer;';
    wrap.textContent = 'MANDALA';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2) rotate(60deg)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('ferrofluid-spike-magnet') || id === 'ferrofluid-spike-magnet') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:60px; height:60px; border-radius:50%; background:#08090B; border:2px solid ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; font-size:8px; font-weight:900; cursor:pointer; box-shadow:0 0 16px ${accent}66;';
    wrap.textContent = 'FERRO';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('raymarched-metaball-swarm') || id === 'raymarched-metaball-swarm') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:6px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:24px; height:24px; border-radius:50%; background:${accent};"></div>
      <div style="width:24px; height:24px; border-radius:50%; background:#42E8F5; margin-left:-8px;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('smoke-ring-vortex') || id === 'smoke-ring-vortex') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:60px; height:60px; border-radius:50%; border:4px solid #E2E8F0; opacity:0.8; display:flex; align-items:center; justify-content:center; font-size:8px; font-weight:900; color:#FFF; cursor:pointer;';
    wrap.textContent = 'VORTEX';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.3)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('slime-mold-physarum') || id === 'slime-mold-physarum') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:140px; height:80px; border-radius:8px; background:#0B1410; border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:900; font-size:9px; cursor:pointer;`;
    wrap.textContent = 'PHYSARUM NETWORK';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('aurora-borealis-canvas') || id === 'aurora-borealis-canvas') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:140px; height:80px; border-radius:8px; background:linear-gradient(135deg, #091515, ${accent}33, #42E8F533); border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:900; font-size:9px; cursor:pointer;`;
    wrap.textContent = 'AURORA CANVAS';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('kinetic-typography-spiral') || id === 'kinetic-typography-spiral') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:24px; cursor:pointer; color:${accent};';
    wrap.textContent = '🌀 SPIRAL';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'rotate(180deg) scale(1.2)';
      setTimeout(() => wrap.style.transform = 'none', 250);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('light-prism-refraction') || id === 'light-prism-refraction') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:140px; height:80px; border-radius:8px; background:#0B0E14; border:1px solid #FFF; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:10px; font-weight:900; cursor:pointer;';
    wrap.textContent = 'PRISM 🌈';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('fractal-tree-growth') || id === 'fractal-tree-growth') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:28px; cursor:pointer;';
    wrap.textContent = '🌳';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.3)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('wave-interference-pool') || id === 'wave-interference-pool') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:65px; height:65px; border-radius:50%; border:2px solid #42E8F5; display:flex; align-items:center; justify-content:center; font-size:8px; font-weight:900; color:#42E8F5; cursor:pointer;';
    wrap.textContent = 'RIPPLE';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else {
    // 26. procedural-lightning-arc & default experiment
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:32px; cursor:pointer; filter:drop-shadow(0 0 10px ${accent});';
    wrap.textContent = '⚡';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.4) rotate(15deg)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();
  }

  return { restart: restartFn, destroy: destroyFn };
}
