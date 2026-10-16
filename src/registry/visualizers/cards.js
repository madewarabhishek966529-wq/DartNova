/**
 * DartNova Cards & Surfaces Visualizers (10 Bespoke Modern UI Components)
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
    exp.addEventListener('click', () => {
      isOpen = !isOpen;
      exp.querySelector('.exp-content').style.maxHeight = isOpen ? '60px' : '0';
      exp.querySelector('.exp-content').style.marginTop = isOpen ? '8px' : '0';
      exp.querySelector('span:last-child').textContent = isOpen ? '−' : '+';
      exp.style.borderColor = isOpen ? accent : '#282E3C';
    });
    stage.appendChild(exp);
    restartFn = () => exp.click();

  } else if (id.includes('card-stack') || id === 'animated-card-stack') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:150px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="cs-3" style="position:absolute; width:130px; height:70px; border-radius:8px; background:#131620; border:1px solid #222838; transform:translateY(-8px) scale(0.9); opacity:0.6; transition:transform 0.3s;"></div>
      <div class="cs-2" style="position:absolute; width:130px; height:70px; border-radius:8px; background:#181D2A; border:1px solid #2D354A; transform:translateY(-4px) scale(0.95); opacity:0.85; transition:transform 0.3s;"></div>
      <div class="cs-1" style="position:absolute; width:130px; height:70px; border-radius:8px; background:#1E2536; border:1.5px solid ${accent}; display:flex; flex-direction:column; justify-content:space-between; padding:8px; box-sizing:border-box; box-shadow:0 8px 20px rgba(0,0,0,0.5); transition:transform 0.3s;">
        <span style="font-size:9px; font-weight:800; color:${accent};">TOP DECK</span>
        <span style="font-size:8px; color:#FFF;">Tap to fan out</span>
      </div>
    `;
    let fanned = false;
    const c3 = wrap.querySelector('.cs-3');
    const c2 = wrap.querySelector('.cs-2');
    const c1 = wrap.querySelector('.cs-1');
    const toggleFan = () => {
      fanned = !fanned;
      c3.style.transform = fanned ? 'translateX(24px) rotate(10deg) scale(0.95)' : 'translateY(-8px) scale(0.9)';
      c2.style.transform = fanned ? 'translateX(-24px) rotate(-10deg) scale(0.95)' : 'translateY(-4px) scale(0.95)';
      c1.style.transform = fanned ? 'scale(1.05)' : 'none';
    };
    wrap.addEventListener('click', toggleFan);
    stage.appendChild(wrap);
    restartFn = toggleFan;

  } else if (id.includes('glow-pulse') || id === 'glow-pulse-card') {
    const card = document.createElement('div');
    card.style.cssText = `width:170px; padding:14px; border-radius:12px; background:#141822; border:1.5px solid ${accent}; box-shadow:0 0 16px ${accent}44; animation:dnPulseGlow 2.5s ease-in-out infinite alternate; display:flex; flex-direction:column; gap:6px; cursor:pointer;`;
    card.innerHTML = `
      <div style="font-size:11px; font-weight:800; color:#FFF;">Breathing Aura Card</div>
      <div style="font-size:8px; color:var(--text-muted);">Perimeter harmonic luminescence</div>
      <div style="font-size:9px; font-weight:700; color:${accent};">● Active Shaders</div>
    `;
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'scale(1.08)'; setTimeout(() => card.style.transform = 'none', 180); };

  } else if (id.includes('cursor-follow') || id === 'cursor-follow-card') {
    const card = document.createElement('div');
    card.style.cssText = `position:relative; width:170px; height:100px; border-radius:12px; background:#12151D; border:1px solid #282E3D; overflow:hidden; cursor:pointer; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:4px;`;
    card.innerHTML = `
      <div class="cf-track" style="position:absolute; width:90px; height:90px; border-radius:50%; background:radial-gradient(circle, ${accent}44 0%, transparent 70%); pointer-events:none; transform:translate(-50%, -50%); opacity:0; transition:opacity 0.2s;"></div>
      <span style="font-size:18px;">🎯</span>
      <span style="font-size:10px; font-weight:800; color:#FFF;">Dual Specular Follow</span>
    `;
    const track = card.querySelector('.cf-track');
    card.addEventListener('mouseenter', () => track.style.opacity = '1');
    card.addEventListener('mouseleave', () => track.style.opacity = '0');
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      track.style.left = `${e.clientX - r.left}px`;
      track.style.top = `${e.clientY - r.top}px`;
    });
    stage.appendChild(card);
    restartFn = () => { track.style.opacity = '1'; track.style.left = '50%'; track.style.top = '50%'; };

  } else if (id.includes('floating') || id === 'floating-card') {
    const card = document.createElement('div');
    card.style.cssText = `width:170px; padding:14px; border-radius:12px; background:#161B26; border:1px solid #2C3548; box-shadow:0 12px 28px rgba(0,0,0,0.6); animation:dnFloatLevitate 3.5s ease-in-out infinite; cursor:pointer; text-align:center;`;
    card.innerHTML = `
      <div style="font-size:11px; font-weight:800; color:#FFF;">Anti-Gravity Levitate</div>
      <div style="font-size:9px; color:${accent}; font-family:var(--font-mono); margin-top:4px;">Z-Axis Oscillation</div>
    `;
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'translateY(-14px) scale(1.08)'; setTimeout(() => card.style.transform = 'none', 240); };

  } else {
    // Cursor 3D Tilt Card
    const card = document.createElement('div');
    card.style.cssText = `width:170px; padding:14px; border-radius:12px; background:#181B24; border:1px solid #2A3040; box-shadow:0 10px 25px rgba(0,0,0,0.4); cursor:pointer; transition:transform 0.15s ease-out, border-color 0.2s;`;
    card.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;"><span style="font-size:12px; font-weight:700; color:#FFF;">${name}</span><span style="width:8px; height:8px; border-radius:50%; background:${accent}; box-shadow:0 0 8px ${accent};"></span></div><div style="font-size:20px; font-family:var(--font-mono); font-weight:800; color:${accent};">120 FPS</div><div style="font-size:10px; color:var(--text-muted); margin-top:4px;">Tilt Vector Ready</div>`;
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(500px) rotateY(${x * 24}deg) rotateX(${-y * 24}deg) scale(1.03)`;
      card.style.borderColor = accent;
    });
    stage.addEventListener('mouseleave', () => { card.style.transform = 'none'; card.style.borderColor = '#2A3040'; });
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'perspective(500px) rotateY(15deg) scale(1.05)'; setTimeout(() => card.style.transform = 'none', 260); };
  }

  return { restart: restartFn, destroy: destroyFn };
}
