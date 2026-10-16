/**
 * DartNova Backgrounds & Ambience Visualizers (10 Bespoke Modern UI Components)
 */

export function renderBackgroundVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('animated-gradient') || id === 'animated-gradient') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `position:relative; width:100%; height:100%; border-radius:10px; overflow:hidden; background:linear-gradient(-45deg, #0B0E14, #1B2A4A, #123C36, ${accent}33); background-size:400% 400%; animation:dnAuroraShift 6s ease infinite alternate; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer;`;
    wrap.innerHTML = `
      <div style="padding:6px 12px; border-radius:8px; background:rgba(8,9,12,0.7); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.1); text-align:center;">
        <div style="font-size:10px; font-weight:800; color:#FFF;">Dynamic Mesh Gradient</div>
        <div style="font-size:8px; color:${accent}; font-family:var(--font-mono);">120 FPS Fluid Math</div>
      </div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.04)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('wave-animation') || id === 'wave-animation') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:100%; height:100%; border-radius:10px; overflow:hidden; background:#0B0E14; display:flex; flex-direction:column; justify-content:flex-end; cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 200 60" style="position:absolute; bottom:0; width:100%; height:45px; opacity:0.4;">
        <path d="M0 30 Q 50 10, 100 30 T 200 30 L 200 60 L 0 60 Z" fill="${accent}"/>
      </svg>
      <svg viewBox="0 0 200 60" style="position:absolute; bottom:0; width:100%; height:45px; opacity:0.6; transform:scaleX(-1);">
        <path d="M0 25 Q 50 45, 100 25 T 200 25 L 200 60 L 0 60 Z" fill="#42E8F5"/>
      </svg>
      <div style="position:relative; z-index:2; margin:auto 0 auto 0; text-align:center;">
        <div style="font-size:11px; font-weight:800; color:#FFF;">Translucent Sine Waves</div>
        <div style="font-size:8px; color:var(--text-muted);">Double-layer harmonic undulation</div>
      </div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.05)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('neon-gradient') || id === 'neon-gradient') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:100%; height:100%; border-radius:10px; overflow:hidden; background:#08090C; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="ng-beam" style="position:absolute; width:140px; height:2px; background:linear-gradient(90deg, transparent, ${accent}, #42E8F5, transparent); box-shadow:0 0 16px ${accent}; transform:rotate(-25deg); animation:dnBorderBeam 4s linear infinite;"></div>
      <div style="position:relative; z-index:2; padding:8px 14px; border-radius:8px; background:rgba(12,15,22,0.8); border:1px solid ${accent}55; text-align:center;">
        <div style="font-size:11px; font-weight:800; color:${accent};">NEON BEAM FIELD</div>
        <div style="font-size:8px; color:#FFF;">Cyberpunk Light Tracer</div>
      </div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.05)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('particle-motion') || id === 'particle-motion') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:100%; height:100%; border-radius:10px; overflow:hidden; background:#0B0E14; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    for (let i = 0; i < 14; i++) {
      const p = document.createElement('div');
      const size = 3 + (i % 4);
      p.style.cssText = `position:absolute; width:${size}px; height:${size}px; border-radius:50%; background:${i % 2 === 0 ? accent : '#42E8F5'}; opacity:${0.3 + (i % 5) * 0.15}; left:${(i * 17) % 90 + 5}%; top:${(i * 23) % 85 + 5}%; animation:dnFloatLevitate ${2 + (i % 3)}s ease-in-out infinite alternate; animation-delay:${i * 0.15}s; pointer-events:none;`;
      wrap.appendChild(p);
    }
    const label = document.createElement('div');
    label.style.cssText = 'position:relative; z-index:2; font-size:10px; font-weight:800; color:#FFF; padding:6px 10px; border-radius:6px; background:#121620; border:1px solid #282E3D;';
    label.textContent = 'Floating Dust Particles';
    wrap.appendChild(label);
    stage.appendChild(wrap);
    restartFn = () => { label.style.transform = 'scale(1.1)'; setTimeout(() => label.style.transform = 'none', 180); };

  } else if (id.includes('spotlight-effect') || id === 'spotlight-effect') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:100%; height:100%; border-radius:10px; overflow:hidden; background:#090B0F; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#222B3D; font-weight:900; font-size:24px; letter-spacing:4px; user-select:none;">
        DARTNOVA
      </div>
      <div class="sp-cone" style="position:absolute; width:110px; height:110px; border-radius:50%; background:radial-gradient(circle, ${accent}66 0%, transparent 70%); transform:translate(-50%, -50%); top:50%; left:50%; pointer-events:none; transition:opacity 0.2s;"></div>
      <div style="position:relative; z-index:2; font-size:9px; font-weight:800; color:#FFF; background:rgba(0,0,0,0.6); padding:4px 8px; border-radius:6px;">🔦 Move to reveal</div>
    `;
    const cone = wrap.querySelector('.sp-cone');
    wrap.addEventListener('mousemove', (e) => {
      const r = wrap.getBoundingClientRect();
      cone.style.left = `${e.clientX - r.left}px`;
      cone.style.top = `${e.clientY - r.top}px`;
    });
    stage.appendChild(wrap);
    restartFn = () => { cone.style.left = '50%'; cone.style.top = '50%'; };

  } else if (id.includes('aurora-background') || id === 'aurora-background') {
    const wrap = document.createElement('div');
    wrap.className = 'dn-aurora-bg-widget';
    wrap.style.cssText = 'position:relative; width:100%; height:100%; border-radius:10px; overflow:hidden; background:#080A10; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; width:120px; height:90px; border-radius:50%; background:radial-gradient(circle, ${accent} 0%, transparent 70%); animation:dnAuroraShift 5s ease-in-out infinite alternate;"></div>
      <div style="position:absolute; width:100px; height:100px; border-radius:50%; background:radial-gradient(circle, #42E8F5 0%, transparent 70%); animation:dnAuroraShift 4s ease-in-out infinite alternate-reverse;"></div>
      <span style="position:relative; z-index:2; font-family:var(--font-mono); font-size:11px; color:#FFF; font-weight:800; letter-spacing:0.1em; text-shadow:0 0 10px rgba(0,0,0,0.8);">AURORA BOREALIS</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.05)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('starfield') || id === 'starfield-motion') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:400px; position:relative; width:100%; height:100%; border-radius:10px; overflow:hidden; background:#060709; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    for (let i = 0; i < 20; i++) {
      const star = document.createElement('div');
      const angle = (i / 20) * Math.PI * 2;
      const x = Math.cos(angle) * 60;
      const y = Math.sin(angle) * 40;
      star.style.cssText = `position:absolute; width:2px; height:2px; border-radius:50%; background:#FFF; box-shadow:0 0 4px #FFF; transform:translate(${x}px, ${y}px); animation:dnStarWarp ${1.2 + (i % 4) * 0.3}s ease-in infinite; animation-delay:${(i % 5) * 0.2}s;`;
      wrap.appendChild(star);
    }
    const badge = document.createElement('div');
    badge.style.cssText = `position:relative; z-index:2; font-size:9px; font-weight:800; color:${accent}; font-family:var(--font-mono); background:#0F121A; padding:4px 8px; border-radius:4px; border:1px solid #282E3D;`;
    badge.textContent = 'WARP SPEED 120 FPS';
    wrap.appendChild(badge);
    stage.appendChild(wrap);
    restartFn = () => { badge.style.transform = 'scale(1.1)'; setTimeout(() => badge.style.transform = 'none', 180); };

  } else if (id.includes('constellation') || id === 'interactive-constellation') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:100%; height:100%; border-radius:10px; overflow:hidden; background:#0B0E15; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <svg style="position:absolute; inset:0; width:100%; height:100%;">
        <line x1="30" y1="30" x2="80" y2="50" stroke="${accent}44" stroke-width="1.5"/>
        <line x1="80" y1="50" x2="140" y2="35" stroke="${accent}44" stroke-width="1.5"/>
        <line x1="80" y1="50" x2="95" y2="85" stroke="#42E8F544" stroke-width="1.5"/>
        <line x1="140" y1="35" x2="155" y2="75" stroke="${accent}44" stroke-width="1.5"/>
        <circle cx="30" cy="30" r="3.5" fill="${accent}"/>
        <circle cx="80" cy="50" r="4.5" fill="#FFF"/>
        <circle cx="140" cy="35" r="3.5" fill="${accent}"/>
        <circle cx="95" cy="85" r="3" fill="#42E8F5"/>
        <circle cx="155" cy="75" r="3" fill="#FFF"/>
      </svg>
      <div style="position:relative; z-index:2; font-size:9px; font-weight:800; color:#FFF; background:rgba(10,14,22,0.8); padding:4px 8px; border-radius:4px; border:1px solid #262D3D;">
        Constellation Graph
      </div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.05)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('liquid-blob') || id === 'liquid-blob-background') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:100%; height:100%; border-radius:10px; overflow:hidden; background:#0B0E14; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="blob-1" style="position:absolute; width:80px; height:80px; border-radius:60% 40% 30% 70% / 60% 30% 70% 40%; background:linear-gradient(135deg, ${accent}, #42E8F5); opacity:0.6; filter:blur(10px); animation:dnAuroraShift 5s ease-in-out infinite alternate;"></div>
      <div class="blob-2" style="position:absolute; width:70px; height:70px; border-radius:40% 60% 70% 30% / 50% 60% 30% 60%; background:linear-gradient(135deg, #9B7CFF, ${accent}); opacity:0.5; filter:blur(8px); animation:dnAuroraShift 4s ease-in-out infinite alternate-reverse;"></div>
      <div style="position:relative; z-index:2; font-size:10px; font-weight:800; color:#FFF; background:rgba(8,10,15,0.7); padding:4px 10px; border-radius:6px; backdrop-filter:blur(6px);">
        Metaball Fluid Blobs
      </div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.05)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else {
    // Animated Grid
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:350px; position:relative; width:100%; height:100%; border-radius:10px; overflow:hidden; background:#080A10; display:flex; flex-direction:column; justify-content:flex-end; align-items:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; inset:0; background:linear-gradient(180deg, #080A10 30%, transparent 100%); z-index:2;"></div>
      <div class="grid-plane" style="width:200%; height:120px; background-size:24px 24px; background-image:linear-gradient(to right, ${accent}33 1px, transparent 1px), linear-gradient(to bottom, ${accent}33 1px, transparent 1px); transform:rotateX(65deg); transform-origin:bottom center;"></div>
      <div style="position:relative; z-index:3; margin-bottom:12px; font-size:9px; font-weight:800; color:${accent}; font-family:var(--font-mono); background:#101420; padding:4px 8px; border-radius:4px; border:1px solid ${accent}66;">
        SYNTHWAVE HORIZON GRID
      </div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.05)'; setTimeout(() => wrap.style.transform = 'none', 180); };
  }

  return { restart: restartFn, destroy: destroyFn };
}
