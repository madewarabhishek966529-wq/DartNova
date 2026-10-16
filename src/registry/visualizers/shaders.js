/**
 * DartNova Shaders & Impeller Canvas Visualizers (10 Bespoke Modern UI Components)
 */

export function renderShaderVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('glsl-fluid') || id === 'glsl-fluid-smoke') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:100%; height:100%; border-radius:10px; overflow:hidden; background:#08090E; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="smoke-1" style="position:absolute; width:100px; height:100px; border-radius:50%; background:radial-gradient(circle, ${accent}55 0%, transparent 70%); filter:blur(14px); animation:dnAuroraShift 4s ease-in-out infinite alternate;"></div>
      <div class="smoke-2" style="position:absolute; width:90px; height:90px; border-radius:50%; background:radial-gradient(circle, #42E8F555 0%, transparent 70%); filter:blur(16px); animation:dnAuroraShift 5s ease-in-out infinite alternate-reverse;"></div>
      <div style="position:relative; z-index:2; text-align:center;">
        <div style="font-size:11px; font-weight:800; color:#FFF;">Navier-Stokes Fluid</div>
        <div style="font-size:8px; color:${accent}; font-family:var(--font-mono); margin-top:2px;">GLSL Fragment Shader</div>
      </div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.05)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('crt-scanline') || id === 'crt-scanline-display') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:95px; border-radius:8px; overflow:hidden; background:#0C140C; border:1px solid #1C381C; display:flex; flex-direction:column; justify-content:center; align-items:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; inset:0; background:linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%); background-size:100% 4px; pointer-events:none; z-index:2;"></div>
      <div style="position:absolute; inset:0; box-shadow:inset 0 0 16px rgba(0,255,100,0.25); pointer-events:none; z-index:3;"></div>
      <div class="crt-text" style="font-family:var(--font-mono); font-size:12px; font-weight:800; color:#42FF70; text-shadow:0 0 6px #42FF70, 2px 0 #FF0055, -2px 0 #00E5FF; animation:dnGlitchJitter 3s infinite;">
        TERMINAL CRT 120Hz
      </div>
      <div style="font-size:7px; color:#2E7D32; font-family:var(--font-mono); margin-top:4px;">SCANLINES & ABERRATION</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.06)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('iridescent') || id === 'iridescent-glass-refraction') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:95px; border-radius:12px; background:linear-gradient(135deg, #121622, #1C2333); border:1px solid rgba(255,255,255,0.15); box-shadow:0 12px 28px rgba(0,0,0,0.6); display:flex; flex-direction:column; justify-content:space-between; padding:10px; cursor:pointer; overflow:hidden;';
    wrap.innerHTML = `
      <div style="position:absolute; top:-40%; left:-40%; width:180%; height:180%; background:conic-gradient(from 0deg, transparent, ${accent}33, #42E8F533, #9B7CFF33, transparent); animation:dnBorderBeam 6s linear infinite; pointer-events:none;"></div>
      <div style="display:flex; justify-content:space-between; align-items:center; position:relative; z-index:2;">
        <span style="font-size:9px; font-weight:800; color:${accent};">IMPELLER DISPERSION</span>
        <span style="font-size:10px;">💎</span>
      </div>
      <div style="position:relative; z-index:2; font-size:10px; font-weight:700; color:#FFF;">Chromic Refraction Wave</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('matrix-rain') || id === 'matrix-rain-terminal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:95px; border-radius:8px; overflow:hidden; background:#060A06; border:1px solid #142814; display:flex; align-items:center; justify-content:space-around; cursor:pointer; font-family:var(--font-mono); font-size:9px; font-weight:800; color:#39FF14;';
    const cols = ['0101', '7F9A', 'DART', 'NOVA', '120F'];
    wrap.innerHTML = cols.map((txt, i) => `
      <div class="mr-col" style="display:flex; flex-direction:column; animation:dnFloatLevitate ${1.2 + i * 0.2}s infinite alternate; opacity:${0.4 + i * 0.15};">
        ${txt.split('').map(c => `<span>${c}</span>`).join('')}
      </div>
    `).join('') + `<div style="position:absolute; font-size:8px; font-weight:900; background:rgba(0,0,0,0.7); color:#FFF; padding:2px 6px; border-radius:3px;">Matrix Rain</div>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.05)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('vortex-tunnel') || id === 'vortex-tunnel') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:90px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    for (let i = 0; i < 4; i++) {
      const ring = document.createElement('div');
      const size = 30 + i * 18;
      ring.style.cssText = `position:absolute; width:${size}px; height:${size}px; border-radius:50%; border:1.5px dashed ${i % 2 === 0 ? accent : '#42E8F5'}; animation:dnOrbitRotate ${3 + i}s linear infinite; opacity:${1 - i * 0.2};`;
      wrap.appendChild(ring);
    }
    const center = document.createElement('div');
    center.style.cssText = `width:18px; height:18px; border-radius:50%; background:${accent}; box-shadow:0 0 16px ${accent}; z-index:2;`;
    wrap.appendChild(center);
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('plasma-energy') || id === 'plasma-energy-field') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:95px; border-radius:10px; overflow:hidden; background:#0B0814; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; width:110px; height:80px; border-radius:50%; background:radial-gradient(circle, #9B7CFF 0%, transparent 70%); filter:blur(10px); animation:dnAuroraShift 3s infinite alternate;"></div>
      <div style="position:absolute; width:90px; height:70px; border-radius:50%; background:radial-gradient(circle, ${accent} 0%, transparent 70%); filter:blur(8px); animation:dnAuroraShift 4s infinite alternate-reverse;"></div>
      <span style="position:relative; z-index:2; font-size:10px; font-weight:800; color:#FFF; font-family:var(--font-mono); text-shadow:0 0 8px ${accent};">PLASMA FIELD · 120 FPS</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.05)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('dissolve-burn') || id === 'dissolve-burn-shader') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:95px; border-radius:10px; overflow:hidden; background:#10141D; border:1px solid #282E3D; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div style="font-size:11px; font-weight:800; color:#FFF;">Target Surface</div>
      <div class="db-mask" style="position:absolute; inset:0; background:linear-gradient(135deg, #FF4B72, #FF8800); opacity:0.85; clip-path:circle(100% at 50% 50%); transition:clip-path 0.5s ease; display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:10px;">
        🔥 Noise Dissolve
      </div>
    `;
    let dissolved = false;
    const mask = wrap.querySelector('.db-mask');
    const toggleDissolve = () => {
      dissolved = !dissolved;
      mask.style.clipPath = dissolved ? 'circle(0% at 50% 50%)' : 'circle(100% at 50% 50%)';
    };
    wrap.addEventListener('click', toggleDissolve);
    stage.appendChild(wrap);
    restartFn = toggleDissolve;

  } else if (id.includes('caustics') || id === 'caustics-water-reflection') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:95px; border-radius:10px; overflow:hidden; background:#071420; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; inset:0; background:radial-gradient(circle at 30% 40%, rgba(66,232,245,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 60%, ${accent}33 0%, transparent 50%); filter:blur(8px); animation:dnAuroraShift 3.5s infinite alternate;"></div>
      <div style="position:relative; z-index:2; font-size:10px; font-weight:800; color:#FFF; text-shadow:0 0 10px #42E8F5;">🌊 Underwater Caustics</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.05)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('heat-distortion') || id === 'heat-distortion-wave') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:95px; border-radius:10px; overflow:hidden; background:#1C140C; border:1px solid #382512; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="hd-text" style="font-size:14px; font-weight:900; color:#FFA726; font-family:var(--font-display); animation:dnFloatLevitate 1.5s infinite ease-in-out; text-shadow:0 0 12px #FF5722;">
        HEAT HAZE 120°
      </div>
      <div style="font-size:8px; color:var(--text-muted); margin-top:4px;">Mirage Refraction Wave</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else {
    // Neon Laser Wireframe
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:400px; position:relative; width:160px; height:95px; border-radius:10px; overflow:hidden; background:#080A10; border:1px solid #282E3D; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:120px; height:60px; border:1.5px solid ${accent}; transform:rotateX(45deg); box-shadow:0 0 16px ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:800; font-size:10px; font-family:var(--font-mono);">
        VOLUMETRIC
      </div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };
  }

  return { restart: restartFn, destroy: destroyFn };
}
