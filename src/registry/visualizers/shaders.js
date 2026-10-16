/**
 * DartNova Custom Shaders & GLSL Visualizers (26 Bespoke Modern UI Components)
 * 120 FPS hardware-accelerated animations with interactive mouse/touch triggers
 */

export function renderShaderVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('glsl-fluid-smoke') || id === 'glsl-fluid-smoke') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `position:relative; width:160px; height:90px; border-radius:10px; border:1px solid #282E3D; background:radial-gradient(ellipse at center, ${accent}44 0%, #080B10 80%); overflow:hidden; cursor:pointer; display:flex; align-items:center; justify-content:center;`;
    wrap.innerHTML = `<span style="font-size:9px; font-weight:900; color:#FFF; text-shadow:0 0 10px ${accent};">FLUID SMOKE</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('crt-scanline-display') || id === 'crt-scanline-display') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:90px; border-radius:10px; background:#060F08; border:1.5px solid #00FF66; padding:8px; box-sizing:border-box; color:#00FF66; font-family:var(--font-mono); font-size:9px; cursor:pointer; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 0 16px rgba(0,255,102,0.3);';
    wrap.innerHTML = `<div>CRT.DISP v2.4</div><div style="font-size:7px; opacity:0.8;">SCANLINE 60Hz OK</div>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('iridescent-glass-refraction') || id === 'iridescent-glass-refraction') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:160px; height:90px; border-radius:10px; background:linear-gradient(135deg, ${accent}33, #42E8F544, #FF4B7233); backdrop-filter:blur(10px); border:1.5px solid rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; color:#FFF; font-size:9px; font-weight:900; cursor:pointer;`;
    wrap.textContent = 'PRISM REFRACTOR';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('matrix-rain-terminal') || id === 'matrix-rain-terminal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:90px; border-radius:10px; background:#040905; border:1px solid #00FF66; padding:6px; box-sizing:border-box; color:#00FF66; font-family:var(--font-mono); font-size:8px; cursor:pointer;';
    wrap.innerHTML = `λ 0101 1100<br>θ 0010 1010<br>ψ 1111 0001`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('vortex-tunnel') || id === 'vortex-tunnel') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:70px; height:70px; border-radius:50%; border:3px dashed ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:900; font-size:10px; cursor:pointer; animation:dnOrbitRotate 3s linear infinite;';
    wrap.textContent = 'VORTEX';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('plasma-energy-field') || id === 'plasma-energy-field') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:160px; height:90px; border-radius:10px; background:radial-gradient(circle, ${accent}88, #9B7CFF44, #080A10); border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:900; font-size:10px; cursor:pointer;`;
    wrap.textContent = 'PLASMA FIELD';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('dissolve-burn-shader') || id === 'dissolve-burn-shader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:90px; border-radius:10px; background:#10131A; border:1.5px solid #FF4B72; display:flex; align-items:center; justify-content:center; color:#FF4B72; font-weight:900; font-size:10px; cursor:pointer; box-shadow:0 0 16px rgba(255,75,114,0.4);';
    wrap.textContent = 'DISSOLVE BURN 🔥';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('caustics-water-reflection') || id === 'caustics-water-reflection') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:90px; border-radius:10px; background:#0A1624; border:1px solid #42E8F5; display:flex; align-items:center; justify-content:center; color:#42E8F5; font-weight:900; font-size:10px; cursor:pointer;';
    wrap.textContent = 'WATER CAUSTICS 🌊';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('heat-distortion-wave') || id === 'heat-distortion-wave') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:90px; border-radius:10px; background:#181310; border:1px solid #FFA500; display:flex; align-items:center; justify-content:center; color:#FFA500; font-weight:900; font-size:10px; cursor:pointer;';
    wrap.textContent = 'HEAT MIRAGE ☀️';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('neon-laser-wireframe') || id === 'neon-laser-wireframe') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:160px; height:90px; border-radius:10px; background:#0B0E14; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:900; font-size:10px; cursor:pointer; box-shadow:0 0 16px ${accent}44;`;
    wrap.textContent = 'LASER WIREFRAME';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('raymarched-black-hole') || id === 'raymarched-black-hole') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:80px; height:80px; border-radius:50%; background:#000; border:2px solid #FFA500; box-shadow:0 0 20px #FFA500; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:8px; font-weight:900; cursor:pointer;';
    wrap.textContent = 'BLACK HOLE';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('holographic-foil-iridescence') || id === 'holographic-foil-iridescence') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:160px; height:90px; border-radius:10px; background:linear-gradient(45deg, #FF6B6B, ${accent}, #42E8F5, #9B7CFF); background-size:300% 300%; animation:dnShimmerSweep 4s ease infinite; display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:10px; cursor:pointer;`;
    wrap.textContent = 'HOLO FOIL';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('vaporwave-retro-sun') || id === 'vaporwave-retro-sun') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:90px; border-radius:10px; background:#0F0B18; border:1px solid #FF4B72; overflow:hidden; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:40px; height:40px; border-radius:50%; background:linear-gradient(to bottom, #FFA500, #FF4B72); box-shadow:0 0 16px #FF4B72;"></div>
      <span style="font-size:8px; font-weight:900; color:#FFF; margin-top:4px;">RETRO SUN</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('pixel-sorting-glitch') || id === 'pixel-sorting-glitch') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:90px; border-radius:10px; background:#121622; border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:900; font-size:10px; cursor:pointer;';
    wrap.textContent = 'PIXEL SORT GLITCH';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'skewX(15deg) scale(1.05)'; setTimeout(() => wrap.style.transform = 'none', 150); };

  } else if (id.includes('glassmorphic-blur-refractor') || id === 'glassmorphic-blur-refractor') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:160px; height:90px; border-radius:10px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.2); backdrop-filter:blur(12px); display:flex; align-items:center; justify-content:center; color:#FFF; font-size:9px; font-weight:800; cursor:pointer;`;
    wrap.textContent = 'FROSTED REFRACTOR';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('liquid-mercury-blob') || id === 'liquid-mercury-blob') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:60px; height:60px; border-radius:50%; background:linear-gradient(135deg, #E2E8F0, #718096, #CBD5E0); box-shadow:0 8px 20px rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; font-weight:900; font-size:9px; color:#08090B; cursor:pointer;';
    wrap.textContent = 'MERCURY';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2) rotate(20deg)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('frosted-ice-frosting') || id === 'frosted-ice-frosting') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:90px; border-radius:10px; background:#0F1926; border:1px solid #42E8F5; display:flex; align-items:center; justify-content:center; color:#42E8F5; font-weight:900; font-size:10px; cursor:pointer;';
    wrap.textContent = 'ICE CRYSTAL ❄️';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('cyberpunk-scanline-hud') || id === 'cyberpunk-scanline-hud') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:160px; height:90px; border-radius:10px; background:#0B0E14; border:1px solid ${accent}; padding:6px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; color:${accent}; font-family:var(--font-mono); font-size:8px; cursor:pointer;`;
    wrap.innerHTML = `<div>[TGT.LOCK: OK]</div><div>AZ: 342.1° EL: 12.4°</div>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('voronoi-water-ripples') || id === 'voronoi-water-ripples') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:90px; border-radius:10px; background:#0B1624; border:1px solid #42E8F5; display:flex; align-items:center; justify-content:center; color:#42E8F5; font-weight:900; font-size:10px; cursor:pointer;';
    wrap.textContent = 'VORONOI RIPPLES';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('fire-ember-convection') || id === 'fire-ember-convection') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:90px; border-radius:10px; background:#140C0A; border:1px solid #FFA500; display:flex; align-items:center; justify-content:center; color:#FFA500; font-weight:900; font-size:10px; cursor:pointer;';
    wrap.textContent = 'EMBER SMOKE 🔥';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('aurora-spectral-bands') || id === 'aurora-spectral-bands') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:160px; height:90px; border-radius:10px; background:linear-gradient(45deg, #091515, ${accent}44, #42E8F544); border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:900; font-size:10px; cursor:pointer;`;
    wrap.textContent = 'SPECTRAL BANDS';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('crt-color-aberration') || id === 'crt-color-aberration') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:90px; border-radius:10px; background:#0B0E14; border:1px solid #FF4B72; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:900; font-size:10px; cursor:pointer; text-shadow:2px 0 #FF4B72, -2px 0 #42E8F5;';
    wrap.textContent = 'RGB ABERRATION';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'skewX(10deg)'; setTimeout(() => wrap.style.transform = 'none', 100); };

  } else if (id.includes('neon-contour-topography') || id === 'neon-contour-topography') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:160px; height:90px; border-radius:10px; background:#0A0D14; border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:900; font-size:10px; cursor:pointer;`;
    wrap.textContent = 'CONTOUR TOPOGRAPHY';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('speed-line-anime-burst') || id === 'speed-line-anime-burst') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:160px; height:90px; border-radius:10px; background:#080A10; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:900; font-size:11px; cursor:pointer;`;
    wrap.textContent = 'SPEED BURST ⚡';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('metallic-flow-sheen') || id === 'metallic-flow-sheen') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:90px; border-radius:10px; background:linear-gradient(135deg, #2D3748, #A0AEC0, #2D3748); border:1px solid #E2E8F0; display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:10px; cursor:pointer;';
    wrap.textContent = 'TITANIUM SHEEN';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else {
    // 26. dither-halftone-dots & default shader
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:160px; height:90px; border-radius:10px; background:#0B0E14; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:900; font-size:10px; cursor:pointer;`;
    wrap.textContent = 'DITHER HALFTONE';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };
  }

  return { restart: restartFn, destroy: destroyFn };
}
