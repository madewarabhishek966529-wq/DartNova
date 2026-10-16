/**
 * DartNova Cards & Surfaces Visualizers (26 Bespoke Modern UI Components)
 */

export function renderCardVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('glassmorphism') || id === 'glassmorphism-card') {
    const card = document.createElement('div');
    card.style.cssText = `width:190px; padding:14px 16px; border-radius:14px; background:rgba(255, 255, 255, 0.05); backdrop-filter:blur(16px); border:1px solid rgba(255, 255, 255, 0.18); box-shadow:0 12px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2); display:flex; flex-direction:column; gap:10px; cursor:pointer; transition:transform 0.3s ease, border-color 0.3s ease;`;
    card.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center;"><div style="width:26px; height:18px; background:linear-gradient(135deg, #FFD700, #FFA500); border-radius:3px;"></div><span style="font-family:var(--font-mono); font-size:10px; color:${accent}; font-weight:700;">TITANIUM</span></div><div style="font-family:var(--font-mono); font-size:12px; letter-spacing:2px; color:#FFF;">•••• 9428</div><div style="display:flex; justify-content:space-between; align-items:flex-end;"><div><div style="font-size:8px; color:var(--text-muted); text-transform:uppercase;">Cardholder</div><div style="font-size:10px; font-weight:700; color:#FFF;">ALEX RIVERA</div></div><div style="font-size:11px; font-weight:700; color:${accent};">$18,420</div></div>`;
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-4px) scale(1.03)');
    card.addEventListener('mouseleave', () => card.style.transform = 'none');
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'scale(1.05)'; setTimeout(() => card.style.transform = 'none', 200); };

  } else if (id.includes('flip') || id === 'flip-profile-card') {
    const flip = document.createElement('div');
    flip.className = 'dn-flip-card-widget';
    flip.style.cssText = 'perspective:800px; width:170px; height:105px; cursor:pointer;';
    flip.innerHTML = `<div class="dn-flip-inner" style="position:relative; width:100%; height:100%; transition:transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); transform-style:preserve-3d;"><div class="dn-flip-front" style="position:absolute; inset:0; backface-visibility:hidden; border-radius:10px; background:#151821; border:1px solid #282E3C; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; padding:10px;"><div style="width:34px; height:34px; border-radius:50%; background:linear-gradient(135deg, ${accent}, #42E8F5); display:flex; align-items:center; justify-content:center; font-weight:800; color:#08090B; font-size:14px;">AR</div><div style="font-size:12px; font-weight:700; color:#FFF;">Alex Rivera</div><div style="font-size:9px; color:var(--text-muted);">Motion Designer</div></div><div class="dn-flip-back" style="position:absolute; inset:0; backface-visibility:hidden; border-radius:10px; background:#181c26; border:1px solid ${accent}; transform:rotateY(180deg); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; padding:10px;"><div style="font-size:10px; font-weight:700; color:${accent};">METRICS</div><div style="font-size:11px; color:#FFF;">142 Projects</div><div style="font-size:9px; color:var(--text-muted);">Tap to flip</div></div></div>`;
    const inner = flip.querySelector('.dn-flip-inner');
    let flipped = false;
    flip.addEventListener('click', () => { flipped = !flipped; inner.style.transform = flipped ? 'rotateY(180deg)' : 'none'; });
    stage.appendChild(flip);
    restartFn = () => { flipped = !flipped; inner.style.transform = flipped ? 'rotateY(180deg)' : 'none'; };

  } else if (id.includes('holographic') || id === 'holographic-card') {
    const holo = document.createElement('div');
    holo.style.cssText = `width:170px; height:100px; border-radius:12px; background:linear-gradient(135deg, #181c25, #222938); border:1px solid rgba(255, 255, 255, 0.2); position:relative; overflow:hidden; cursor:pointer; display:flex; flex-direction:column; justify-content:space-between; padding:12px; box-shadow:0 8px 24px rgba(0,0,0,0.5);`;
    holo.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center;"><span style="font-size:11px; font-weight:800; color:#FFF;">HOLOGRAPHIC</span><span style="font-size:10px; font-family:var(--font-mono); color:${accent};">#99</span></div><div style="position:absolute; inset:0; background:linear-gradient(115deg, transparent 20%, rgba(66,232,245,0.3) 40%, rgba(197,255,53,0.3) 60%, rgba(155,124,255,0.3) 80%, transparent 100%); pointer-events:none; transition:transform 0.2s ease;"></div><div style="font-size:10px; color:var(--text-muted); position:relative; z-index:2;">Spectral Foil Surface</div>`;
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 100;
      if (holo.children[1]) holo.children[1].style.transform = `translateX(${x - 50}px)`;
    });
    stage.appendChild(holo);
    restartFn = () => { if (holo.children[1]) { holo.children[1].style.transform = 'translateX(40px)'; setTimeout(() => holo.children[1].style.transform = 'none', 300); } };

  } else if (id.includes('spotlight') || id === 'spotlight-card') {
    const spot = document.createElement('div');
    spot.style.cssText = `width:175px; height:100px; border-radius:12px; background:#12151C; border:1px solid #262B38; position:relative; overflow:hidden; cursor:pointer; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:6px;`;
    spot.innerHTML = `<div class="spot-glow" style="position:absolute; width:100px; height:100px; border-radius:50%; background:radial-gradient(circle, ${accent}55 0%, transparent 70%); pointer-events:none; transform:translate(-50%, -50%); opacity:0; transition:opacity 0.2s;"></div><span style="font-size:24px;">🔦</span><span style="font-size:12px; font-weight:700; color:#FFF;">Spotlight Focus</span>`;
    const glow = spot.querySelector('.spot-glow');
    spot.addEventListener('mouseenter', () => glow.style.opacity = '1');
    spot.addEventListener('mouseleave', () => glow.style.opacity = '0');
    spot.addEventListener('mousemove', (e) => {
      const r = spot.getBoundingClientRect();
      glow.style.left = (e.clientX - r.left) + 'px';
      glow.style.top = (e.clientY - r.top) + 'px';
    });
    stage.appendChild(spot);
    restartFn = () => { glow.style.opacity = '1'; glow.style.left = '50%'; glow.style.top = '50%'; };

  } else if (id.includes('expandable') || id === 'expandable-card') {
    const exp = document.createElement('div');
    exp.style.cssText = `width:175px; border-radius:10px; background:#161922; border:1px solid #282E3C; padding:10px 12px; cursor:pointer; transition:all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);`;
    exp.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center;"><span style="font-size:12px; font-weight:700; color:#FFF;">Expandable Card</span><span style="color:${accent}; font-weight:800;">+</span></div><div class="exp-content" style="max-height:0; overflow:hidden; font-size:10px; color:var(--text-muted); line-height:1.4; transition:max-height 0.3s ease, margin-top 0.3s ease;">Animated height expansion reveals detailed telemetry data.</div>`;
    let isOpen = false;
    const content = exp.querySelector('.exp-content');
    const toggle = () => {
      isOpen = !isOpen;
      content.style.maxHeight = isOpen ? '60px' : '0';
      content.style.marginTop = isOpen ? '8px' : '0';
    };
    exp.addEventListener('click', toggle);
    stage.appendChild(exp);
    restartFn = toggle;

  } else if (id.includes('isometric-layer') || id === 'isometric-layer-card') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:600px; width:160px; height:100px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="iso-box" style="position:relative; width:100px; height:60px; transform:rotateX(55deg) rotateZ(-45deg); transform-style:preserve-3d; transition:transform 0.4s ease;">
        <div style="position:absolute; inset:0; background:#181F2E; border:1px solid ${accent}; transform:translateZ(0px);"></div>
        <div style="position:absolute; inset:0; background:${accent}44; border:1px solid ${accent}; transform:translateZ(18px);"></div>
        <div style="position:absolute; inset:0; background:#FFF; opacity:0.8; transform:translateZ(36px); display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:900; color:#08090B;">LAYERS</div>
      </div>
    `;
    const box = wrap.querySelector('.iso-box');
    wrap.addEventListener('mouseenter', () => box.style.transform = 'rotateX(55deg) rotateZ(-45deg) scale(1.15)');
    wrap.addEventListener('mouseleave', () => box.style.transform = 'rotateX(55deg) rotateZ(-45deg)');
    stage.appendChild(wrap);
    restartFn = () => { box.style.transform = 'rotateX(55deg) rotateZ(-45deg) scale(1.15)'; setTimeout(() => box.style.transform = 'rotateX(55deg) rotateZ(-45deg)', 300); };

  } else if (id.includes('frosted-glass') || id === 'frosted-glass-card') {
    const card = document.createElement('div');
    card.style.cssText = `width:170px; height:95px; border-radius:12px; background:rgba(255,255,255,0.04); backdrop-filter:blur(20px); border:1px solid ${accent}55; box-shadow:0 8px 32px rgba(0,0,0,0.6); display:flex; flex-direction:column; justify-content:center; align-items:center; cursor:pointer; gap:4px;`;
    card.innerHTML = `<span style="font-size:20px;">❄️</span><span style="font-size:11px; font-weight:800; color:#FFF;">Frosted Glass</span><span style="font-size:8px; color:${accent}; font-family:var(--font-mono);">BLUR 20PX</span>`;
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'scale(1.05)'; setTimeout(() => card.style.transform = 'none', 180); };

  } else if (id.includes('glitch-reveal') || id === 'glitch-reveal-card') {
    const card = document.createElement('div');
    card.style.cssText = `width:170px; height:95px; border-radius:8px; background:#0F121C; border:1px solid #FF0055; display:flex; flex-direction:column; justify-content:center; align-items:center; cursor:pointer; font-family:var(--font-mono);`;
    card.innerHTML = `<span style="font-size:11px; font-weight:900; color:#FF0055; text-shadow:2px 0 ${accent}; animation:dnGlitchJitter 2s infinite;">[ CORRUPT // REVEAL ]</span><span style="font-size:8px; color:var(--text-muted); margin-top:4px;">PARITY CHECK OK</span>`;
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'translateX(-3px)'; setTimeout(() => card.style.transform = 'none', 100); };

  } else if (id.includes('depth-perspective') || id === 'depth-perspective-card') {
    const card = document.createElement('div');
    card.style.cssText = `perspective:500px; width:170px; height:95px; border-radius:10px; background:linear-gradient(135deg, #1A2130, #10141D); border:1px solid #2B374E; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:transform 0.1s;`;
    card.innerHTML = `<div style="text-align:center;"><div style="font-size:18px;">🪟</div><div style="font-size:10px; font-weight:800; color:#FFF;">Depth Tilt 3D</div></div>`;
    stage.addEventListener('mousemove', (e) => {
      const r = stage.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 30;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -30;
      card.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    });
    stage.addEventListener('mouseleave', () => card.style.transform = 'none');
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'scale(1.08)'; setTimeout(() => card.style.transform = 'none', 180); };

  } else if (id.includes('accordion-fold') || id === 'accordion-fold-card') {
    const card = document.createElement('div');
    card.style.cssText = 'width:170px; border-radius:8px; background:#141924; border:1px solid #2B354C; padding:10px; cursor:pointer;';
    card.innerHTML = `
      <div style="font-size:11px; font-weight:800; color:#FFF; display:flex; justify-content:space-between;"><span>Accordion Section</span><span>▼</span></div>
      <div class="af-body" style="font-size:8px; color:var(--text-muted); margin-top:6px; line-height:1.4;">Unfolds vertical compartments with animated spring easing.</div>
    `;
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'scale(1.05)'; setTimeout(() => card.style.transform = 'none', 180); };

  } else if (id.includes('mesh-gradient') || id === 'mesh-gradient-card') {
    const card = document.createElement('div');
    card.style.cssText = `position:relative; overflow:hidden; width:170px; height:95px; border-radius:12px; background:#0B0E14; border:1px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; cursor:pointer;`;
    card.innerHTML = `
      <div style="position:absolute; inset:0; background:radial-gradient(circle at 20% 30%, ${accent}44 0%, transparent 60%), radial-gradient(circle at 80% 70%, #9B7CFF55 0%, transparent 60%); filter:blur(10px); animation:dnAuroraShift 3s infinite alternate;"></div>
      <span style="position:relative; z-index:2; font-size:11px; font-weight:800; color:#FFF;">Mesh Aura Card</span>
    `;
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'scale(1.06)'; setTimeout(() => card.style.transform = 'none', 180); };

  } else if (id.includes('swipeable-stack') || id === 'swipeable-stack-card') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:130px; height:85px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; width:100%; height:100%; border-radius:10px; background:#181F2E; border:1px solid #2D3A54; transform:scale(0.9) translateY(10px);"></div>
      <div class="ss-top" style="position:absolute; width:100%; height:100%; border-radius:10px; background:#1E273A; border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; color:#FFF; transition:transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">Toss Deck Card</div>
    `;
    const top = wrap.querySelector('.ss-top');
    let tossed = false;
    wrap.addEventListener('click', () => {
      tossed = !tossed;
      top.style.transform = tossed ? 'translateX(50px) rotate(15deg) scale(0.9)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('neon-outline') || id === 'neon-outline-card') {
    const card = document.createElement('div');
    card.style.cssText = `width:170px; height:95px; border-radius:10px; background:#0B0E14; border:1.5px solid ${accent}; box-shadow:0 0 16px ${accent}44; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer;`;
    card.innerHTML = `<span style="font-size:18px;">💡</span><span style="font-size:11px; font-weight:800; color:#FFF;">Neon Silhouette</span>`;
    stage.appendChild(card);
    restartFn = () => { card.style.boxShadow = `0 0 28px ${accent}`; setTimeout(() => card.style.boxShadow = `0 0 16px ${accent}44`, 250); };

  } else if (id.includes('shimmer-sheen') || id === 'shimmer-sheen-card') {
    const card = document.createElement('div');
    card.style.cssText = `position:relative; overflow:hidden; width:170px; height:95px; border-radius:10px; background:#141A26; border:1px solid #283248; display:flex; align-items:center; justify-content:center; cursor:pointer;`;
    card.innerHTML = `
      <div style="position:absolute; top:-50%; left:-50%; width:200%; height:200%; background:linear-gradient(60deg, transparent, ${accent}33, transparent); animation:dnShimmerSweep 2.5s infinite linear; pointer-events:none;"></div>
      <span style="font-size:11px; font-weight:800; color:#FFF; position:relative; z-index:2;">Specular Sheen</span>
    `;
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'scale(1.06)'; setTimeout(() => card.style.transform = 'none', 180); };

  } else if (id.includes('magnifier-zoom') || id === 'magnifier-zoom-card') {
    const card = document.createElement('div');
    card.style.cssText = 'position:relative; width:170px; height:95px; border-radius:10px; background:#121622; border:1px solid #283144; display:flex; align-items:center; justify-content:center; cursor:pointer; overflow:hidden;';
    card.innerHTML = `
      <div class="mz-lens" style="position:absolute; width:44px; height:44px; border-radius:50%; border:2px solid ${accent}; background:rgba(255,255,255,0.1); pointer-events:none; transition:transform 0.1s;"></div>
      <span style="font-size:11px; font-weight:800; color:#FFF;">Optical Loupe</span>
    `;
    const lens = card.querySelector('.mz-lens');
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      lens.style.transform = `translate(${e.clientX - r.left - 22}px, ${e.clientY - r.top - 22}px)`;
    });
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'scale(1.08)'; setTimeout(() => card.style.transform = 'none', 180); };

  } else if (id.includes('parchment-peel') || id === 'parchment-peel-card') {
    const card = document.createElement('div');
    card.style.cssText = `position:relative; width:170px; height:95px; border-radius:8px; background:#1B1E28; border:1px solid #32384A; display:flex; align-items:center; justify-content:center; cursor:pointer; overflow:hidden;`;
    card.innerHTML = `
      <div style="position:absolute; top:0; right:0; width:0; height:0; border-style:solid; border-width:0 24px 24px 0; border-color:transparent ${accent} transparent transparent;"></div>
      <span style="font-size:11px; font-weight:800; color:#FFF;">📜 Curled Page</span>
    `;
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'scale(1.05)'; setTimeout(() => card.style.transform = 'none', 180); };

  } else if (id.includes('kinetic-tilt') || id === 'kinetic-tilt-card') {
    const card = document.createElement('div');
    card.style.cssText = `width:170px; height:95px; border-radius:10px; background:#161B26; border:1px solid ${accent}55; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:transform 0.2s cubic-bezier(0.34, 1.8, 0.64, 1);`;
    card.innerHTML = `<span style="font-size:11px; font-weight:800; color:#FFF;">🛹 Kinetic Inertia</span>`;
    card.addEventListener('click', () => {
      card.style.transform = 'rotate(-8deg) scale(1.1)';
      setTimeout(() => card.style.transform = 'none', 250);
    });
    stage.appendChild(card);
    restartFn = () => card.click();

  } else if (id.includes('border-trail') || id === 'border-trail-card') {
    const card = document.createElement('div');
    card.style.cssText = `position:relative; width:170px; height:95px; border-radius:10px; background:#11141E; border:1px solid #232B3C; overflow:hidden; display:flex; align-items:center; justify-content:center; cursor:pointer;`;
    card.innerHTML = `
      <div style="position:absolute; width:120px; height:120px; background:conic-gradient(transparent, ${accent}, transparent 40%); animation:dnBorderBeam 2.8s linear infinite;"></div>
      <div style="position:absolute; inset:2px; border-radius:8px; background:#11141E; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:800; color:#FFF;">Border Comet</div>
    `;
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'scale(1.08)'; setTimeout(() => card.style.transform = 'none', 180); };

  } else if (id.includes('reveal-drawer') || id === 'reveal-drawer-card') {
    const card = document.createElement('div');
    card.style.cssText = `position:relative; width:170px; height:95px; border-radius:10px; background:#141924; border:1px solid #293348; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; padding:10px; cursor:pointer;`;
    card.innerHTML = `
      <span style="font-size:10px; font-weight:800; color:#FFF;">Main Asset Card</span>
      <div class="rd-drawer" style="padding:6px; border-radius:6px; background:${accent}; color:#08090B; font-size:9px; font-weight:800; transform:translateY(35px); transition:transform 0.3s ease;">Hidden Meta Drawer</div>
    `;
    const drawer = card.querySelector('.rd-drawer');
    card.addEventListener('mouseenter', () => drawer.style.transform = 'translateY(0)');
    card.addEventListener('mouseleave', () => drawer.style.transform = 'translateY(35px)');
    stage.appendChild(card);
    restartFn = () => { drawer.style.transform = 'translateY(0)'; setTimeout(() => drawer.style.transform = 'translateY(35px)', 400); };

  } else if (id.includes('cuboid-flip') || id === 'cuboid-flip-card') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:500px; width:160px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="cf-box" style="position:relative; width:120px; height:70px; transform-style:preserve-3d; transition:transform 0.5s;">
        <div style="position:absolute; inset:0; border-radius:8px; background:#181F2E; border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; color:#FFF;">🎲 Face A</div>
      </div>
    `;
    const box = wrap.querySelector('.cf-box');
    let flipped = false;
    wrap.addEventListener('click', () => {
      flipped = !flipped;
      box.style.transform = flipped ? 'rotateY(180deg)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('liquid-portal') || id === 'liquid-portal-card') {
    const card = document.createElement('div');
    card.style.cssText = `position:relative; overflow:hidden; width:170px; height:95px; border-radius:10px; background:#0B0E14; border:1px solid #202738; display:flex; align-items:center; justify-content:center; cursor:pointer;`;
    card.innerHTML = `
      <div style="position:absolute; width:70px; height:70px; border-radius:50%; background:radial-gradient(circle, ${accent}88 0%, #42E8F555 50%, transparent 70%); animation:dnOrbitRotate 4s linear infinite; filter:blur(8px);"></div>
      <span style="position:relative; z-index:2; font-size:11px; font-weight:800; color:#FFF;">🌀 Portal Core</span>
    `;
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'scale(1.1)'; setTimeout(() => card.style.transform = 'none', 180); };

  } else if (id.includes('floating') || id === 'floating-card') {
    const card = document.createElement('div');
    card.style.cssText = `width:170px; height:95px; border-radius:12px; background:linear-gradient(135deg, #181d28, #131720); border:1px solid #2b3344; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 10px 30px rgba(0,0,0,0.6); animation:dnFloatLevitate 2.5s infinite ease-in-out;`;
    card.innerHTML = `<span style="font-size:22px;">☁️</span><span style="font-size:11px; font-weight:800; color:#FFF; margin-top:4px;">Floating Card</span>`;
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'scale(1.08)'; setTimeout(() => card.style.transform = 'none', 180); };

  } else if (id.includes('cursor-card') || id === 'cursor-card') {
    const card = document.createElement('div');
    card.style.cssText = `perspective:400px; width:160px; height:90px; border-radius:10px; background:#161D2B; border:1.5px solid ${accent}; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 10px 24px rgba(0,0,0,0.6); transition:transform 0.2s;`;
    card.innerHTML = `<span style="font-size:18px;">🎴</span><span style="font-size:10px; font-weight:800; color:#FFF; margin-top:2px;">Cursor 3D Card</span>`;
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateY(${x * 25}deg) rotateX(${-y * 25}deg)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = 'none');
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'scale(1.1)'; setTimeout(() => card.style.transform = 'none', 180); };

  } else if (id.includes('animated-card-stack') || id === 'animated-card-stack') {
    const card = document.createElement('div');
    card.style.cssText = 'position:relative; width:140px; height:85px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    card.innerHTML = `
      <div style="position:absolute; width:110px; height:65px; border-radius:8px; background:#121622; border:1px solid #283144; transform:translateY(-8px) scale(0.92);"></div>
      <div style="position:absolute; width:120px; height:70px; border-radius:8px; background:#161C28; border:1px solid #333F54; transform:translateY(-4px) scale(0.96);"></div>
      <div style="position:absolute; width:130px; height:75px; border-radius:8px; background:#1C2436; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:9px; font-weight:800;">Card Stack</div>
    `;
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'scale(1.1)'; setTimeout(() => card.style.transform = 'none', 180); };

  } else if (id.includes('glow-pulse-card') || id === 'glow-pulse-card') {
    const card = document.createElement('div');
    card.style.cssText = `width:160px; height:90px; border-radius:10px; background:#141824; border:1.5px solid ${accent}; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 0 20px ${accent}66; animation:dnPulseGlow 2s infinite alternate;`;
    card.innerHTML = `<span style="font-size:18px;">💡</span><span style="font-size:10px; font-weight:800; color:#FFF;">Glow Pulse Card</span>`;
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'scale(1.1)'; setTimeout(() => card.style.transform = 'none', 180); };

  } else if (id.includes('cursor-follow-card') || id === 'cursor-follow-card') {
    const card = document.createElement('div');
    card.style.cssText = `position:relative; width:160px; height:90px; border-radius:10px; background:#11151E; border:1px solid #282E3D; overflow:hidden; display:flex; align-items:center; justify-content:center; cursor:pointer;`;
    card.innerHTML = `
      <div class="cfc-spot" style="position:absolute; width:80px; height:80px; border-radius:50%; background:radial-gradient(circle, ${accent}44, transparent); pointer-events:none;"></div>
      <span style="position:relative; z-index:1; font-size:10px; font-weight:800; color:#FFF;">Cursor Follow</span>
    `;
    const spot = card.querySelector('.cfc-spot');
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      spot.style.left = `${e.clientX - r.left - 40}px`;
      spot.style.top = `${e.clientY - r.top - 40}px`;
    });
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'scale(1.08)'; setTimeout(() => card.style.transform = 'none', 180); };

  } else {
    // Default Card
    const card = document.createElement('div');
    card.style.cssText = `width:170px; height:95px; border-radius:10px; background:#141722; border:1px solid #262D3D; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:transform 0.2s;`;
    card.innerHTML = `<span style="font-size:11px; font-weight:800; color:${accent};">🎴 Responsive Card</span>`;
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-4px)');
    card.addEventListener('mouseleave', () => card.style.transform = 'none');
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'scale(1.08)'; setTimeout(() => card.style.transform = 'none', 180); };
  }

  return { restart: restartFn, destroy: destroyFn };
}
