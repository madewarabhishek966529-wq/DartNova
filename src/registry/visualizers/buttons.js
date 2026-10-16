/**
 * DartNova Buttons & Controls Visualizers (26 Bespoke Modern UI Components)
 * 120 FPS hardware-accelerated animations with interactive mouse/touch triggers
 */

export function renderButtonVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('liquid') || id === 'liquid-fill-button') {
    const btn = document.createElement('button');
    btn.className = 'dn-liquid-btn-widget';
    btn.innerHTML = `<span style="position:relative; z-index:2; font-weight:700;">${name}</span><div class="liquid-bg" style="background:${accent}; position:absolute; inset:0; z-index:1; transform:translateY(100%); transition:transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);"></div>`;
    btn.style.cssText = `position:relative; overflow:hidden; padding:12px 24px; border:1.5px solid ${accent}; border-radius:10px; background:#111318; color:${accent}; cursor:pointer; font-size:13px; font-weight:700;`;
    const bg = btn.querySelector('.liquid-bg');
    btn.addEventListener('mouseenter', () => { bg.style.transform = 'translateY(0)'; btn.style.color = '#08090B'; });
    btn.addEventListener('mouseleave', () => { bg.style.transform = 'translateY(100%)'; btn.style.color = accent; });
    stage.appendChild(btn);
    restartFn = () => { bg.style.transform = 'translateY(0)'; setTimeout(() => bg.style.transform = 'translateY(100%)', 400); };

  } else if (id.includes('shimmer') || id === 'shimmer-button') {
    const btn = document.createElement('button');
    btn.className = 'dn-shimmer-btn-widget';
    btn.style.cssText = `position:relative; overflow:hidden; padding:12px 24px; background:#161922; border:1px solid ${accent}66; border-radius:10px; color:#FFF; font-weight:700; font-size:13px; cursor:pointer;`;
    btn.innerHTML = `<span style="position:relative; z-index:2;">${name}</span><div style="position:absolute; top:-50%; left:-50%; width:200%; height:200%; background:linear-gradient(60deg, transparent 20%, ${accent}55 50%, transparent 80%); animation:dnShimmerSweep 2.2s infinite linear; pointer-events:none;"></div>`;
    stage.appendChild(btn);
    restartFn = () => { btn.style.transform = 'scale(1.1)'; setTimeout(() => btn.style.transform = 'none', 180); };

  } else if (id.includes('elastic-bounce') || id === 'elastic-bounce-button') {
    const btn = document.createElement('button');
    btn.className = 'dn-glow-btn-widget';
    btn.style.cssText = `padding:12px 26px; border-radius:10px; background:${accent}; color:#08090B; border:none; font-weight:800; font-size:13px; cursor:pointer; transition:transform 0.4s cubic-bezier(0.34, 1.8, 0.64, 1); box-shadow:0 0 20px ${accent}55;`;
    btn.textContent = name;
    btn.addEventListener('click', () => {
      btn.style.transform = 'scale(1.3) rotate(-3deg)';
      setTimeout(() => btn.style.transform = 'scale(1) rotate(0deg)', 260);
    });
    stage.appendChild(btn);
    restartFn = () => btn.click();

  } else if (id.includes('border-beam') || id === 'border-beam-button') {
    const btn = document.createElement('div');
    btn.className = 'dn-border-beam-widget';
    btn.style.cssText = `position:relative; padding:2px; border-radius:12px; overflow:hidden; display:inline-flex; align-items:center; justify-content:center; cursor:pointer;`;
    btn.innerHTML = `<div style="position:absolute; width:160px; height:160px; background:conic-gradient(transparent, ${accent}, transparent 40%); animation:dnBorderBeam 3s linear infinite;"></div><span style="position:relative; z-index:1; background:#111318; padding:10px 22px; border-radius:10px; color:#FFF; font-weight:700; font-size:13px; display:block;">${name}</span>`;
    stage.appendChild(btn);
    restartFn = () => { btn.style.transform = 'scale(1.08)'; setTimeout(() => btn.style.transform = 'none', 180); };

  } else if (id.includes('gradient-shift') || id === 'gradient-shift-button') {
    const btn = document.createElement('button');
    btn.style.cssText = `padding:12px 26px; border-radius:10px; background:linear-gradient(135deg, ${accent}, #42E8F5, #9B7CFF); background-size:200% 200%; animation:dnShimmerSweep 4s ease infinite; color:#08090B; border:none; font-weight:800; font-size:13px; cursor:pointer; transition:transform 0.2s;`;
    btn.textContent = name;
    btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.06)');
    btn.addEventListener('mouseleave', () => btn.style.transform = 'none');
    stage.appendChild(btn);
    restartFn = () => { btn.style.transform = 'scale(1.15)'; setTimeout(() => btn.style.transform = 'none', 200); };

  } else if (id.includes('particle-burst') || id === 'particle-burst-button') {
    const btn = document.createElement('button');
    btn.style.cssText = `padding:12px 24px; border-radius:10px; background:#181C24; border:1.5px solid ${accent}; color:${accent}; font-weight:800; font-size:13px; cursor:pointer; position:relative; overflow:visible;`;
    btn.textContent = '⚡ Tap For Sparks';
    btn.addEventListener('click', () => {
      for (let i = 0; i < 12; i++) {
        const spark = document.createElement('div');
        const angle = (i / 12) * Math.PI * 2;
        const dist = 35 + Math.random() * 25;
        spark.style.cssText = `position:absolute; width:6px; height:6px; border-radius:50%; background:${accent}; pointer-events:none; top:50%; left:50%; transform:translate(-50%, -50%); transition:transform 0.45s ease-out, opacity 0.45s ease-out; box-shadow:0 0 10px ${accent}; z-index:10;`;
        stage.appendChild(spark);
        setTimeout(() => {
          spark.style.transform = `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) scale(0)`;
          spark.style.opacity = '0';
        }, 10);
        setTimeout(() => spark.remove(), 480);
      }
    });
    stage.appendChild(btn);
    restartFn = () => btn.click();

  } else if (id.includes('cyber-glitch') || id === 'cyber-glitch-button') {
    const btn = document.createElement('button');
    btn.style.cssText = `position:relative; padding:12px 26px; border-radius:6px; background:#0F121C; border:1.5px solid ${accent}; color:#FFF; font-weight:900; font-family:var(--font-mono); font-size:12px; cursor:pointer; text-transform:uppercase; letter-spacing:1px;`;
    btn.innerHTML = `<span style="position:relative; z-index:2;">[ GLITCH // READY ]</span><div class="cg-ghost" style="position:absolute; inset:0; background:${accent}; opacity:0; mix-blend-mode:difference; pointer-events:none;"></div>`;
    const ghost = btn.querySelector('.cg-ghost');
    btn.addEventListener('mouseenter', () => {
      btn.style.animation = 'dnGlitchJitter 0.25s infinite';
      ghost.style.opacity = '0.4';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.animation = 'none';
      ghost.style.opacity = '0';
    });
    stage.appendChild(btn);
    restartFn = () => { btn.style.transform = 'translateX(-4px)'; setTimeout(() => btn.style.transform = 'none', 100); };

  } else if (id.includes('ripple-pulse') || id === 'ripple-pulse-button') {
    const btn = document.createElement('button');
    btn.style.cssText = `position:relative; overflow:hidden; padding:12px 28px; border-radius:99px; background:#161B26; border:1.5px solid ${accent}; color:${accent}; font-weight:800; font-size:12px; cursor:pointer;`;
    btn.textContent = 'Tap Ripple Pulse';
    btn.addEventListener('click', (e) => {
      const r = btn.getBoundingClientRect();
      const circle = document.createElement('span');
      circle.style.cssText = `position:absolute; width:10px; height:10px; border-radius:50%; background:${accent}66; transform:scale(0); animation:dnRippleWave 0.6s ease-out forwards; pointer-events:none; top:${e.clientY - r.top - 5}px; left:${e.clientX - r.left - 5}px;`;
      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
    stage.appendChild(btn);
    restartFn = () => btn.click();

  } else if (id.includes('gravity-tilt') || id === 'gravity-tilt-button') {
    const btn = document.createElement('button');
    btn.style.cssText = `perspective:400px; padding:14px 28px; border-radius:12px; background:linear-gradient(135deg, #1C2230, #141722); border:1px solid #333E56; color:#FFF; font-weight:800; font-size:12px; cursor:pointer; transition:transform 0.1s ease-out; box-shadow:0 12px 24px rgba(0,0,0,0.5);`;
    btn.innerHTML = `<span>🕹️ 3D Gyro Tilt</span>`;
    stage.addEventListener('mousemove', (e) => {
      const r = stage.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 35;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -35;
      btn.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    });
    stage.addEventListener('mouseleave', () => { btn.style.transform = 'none'; });
    stage.appendChild(btn);
    restartFn = () => { btn.style.transform = 'scale(1.1)'; setTimeout(() => btn.style.transform = 'none', 180); };

  } else if (id.includes('morphing-pill') || id === 'morphing-pill-button') {
    const btn = document.createElement('button');
    btn.style.cssText = `width:140px; height:42px; border-radius:99px; background:${accent}; color:#08090B; border:none; font-weight:800; font-size:12px; cursor:pointer; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); display:flex; align-items:center; justify-content:center;`;
    btn.innerHTML = `<span class="mp-text">Dispatch Event</span>`;
    let morphed = false;
    btn.addEventListener('click', () => {
      morphed = !morphed;
      if (morphed) {
        btn.style.width = '42px';
        btn.innerHTML = `<span style="display:inline-block; width:16px; height:16px; border:2px solid #08090B; border-top-color:transparent; border-radius:50%; animation:dnOrbitRotate 0.8s linear infinite;"></span>`;
      } else {
        btn.style.width = '140px';
        btn.innerHTML = `<span class="mp-text">Dispatch Event</span>`;
      }
    });
    stage.appendChild(btn);
    restartFn = () => btn.click();

  } else if (id.includes('corner-bracket') || id === 'corner-bracket-button') {
    const btn = document.createElement('button');
    btn.style.cssText = `position:relative; padding:12px 24px; background:#131620; border:none; color:#FFF; font-weight:800; font-size:12px; cursor:pointer;`;
    btn.innerHTML = `
      <span style="position:absolute; top:0; left:0; width:8px; height:8px; border-top:2px solid ${accent}; border-left:2px solid ${accent};"></span>
      <span style="position:absolute; top:0; right:0; width:8px; height:8px; border-top:2px solid ${accent}; border-right:2px solid ${accent};"></span>
      <span style="position:absolute; bottom:0; left:0; width:8px; height:8px; border-bottom:2px solid ${accent}; border-left:2px solid ${accent};"></span>
      <span style="position:absolute; bottom:0; right:0; width:8px; height:8px; border-bottom:2px solid ${accent}; border-right:2px solid ${accent};"></span>
      <span style="position:relative; z-index:2; color:${accent}; font-family:var(--font-mono);">[ RETICLE TECH ]</span>
    `;
    stage.appendChild(btn);
    restartFn = () => { btn.style.transform = 'scale(1.1)'; setTimeout(() => btn.style.transform = 'none', 180); };

  } else if (id.includes('slide-arrow') || id === 'slide-arrow-button') {
    const btn = document.createElement('button');
    btn.style.cssText = `padding:12px 22px; border-radius:10px; background:#181F2E; border:1px solid ${accent}66; color:#FFF; font-weight:800; font-size:12px; cursor:pointer; display:flex; align-items:center; gap:8px;`;
    btn.innerHTML = `<span>Get Started</span><span class="sa-arrow" style="color:${accent}; transition:transform 0.25s; font-size:15px;">→</span>`;
    const arrow = btn.querySelector('.sa-arrow');
    btn.addEventListener('mouseenter', () => arrow.style.transform = 'translateX(6px)');
    btn.addEventListener('mouseleave', () => arrow.style.transform = 'none');
    stage.appendChild(btn);
    restartFn = () => { arrow.style.transform = 'translateX(8px)'; setTimeout(() => arrow.style.transform = 'none', 200); };

  } else if (id.includes('confetti-blast') || id === 'confetti-blast-button') {
    const btn = document.createElement('button');
    btn.style.cssText = `padding:12px 24px; border-radius:10px; background:linear-gradient(135deg, #FF5C8D, #9B7CFF); color:#FFF; border:none; font-weight:900; font-size:12px; cursor:pointer; box-shadow:0 6px 18px rgba(255,92,141,0.4);`;
    btn.textContent = '🎉 Launch Party';
    btn.addEventListener('click', () => {
      btn.style.transform = 'scale(0.92)';
      setTimeout(() => btn.style.transform = 'scale(1.05)', 100);
      setTimeout(() => btn.style.transform = 'none', 200);
    });
    stage.appendChild(btn);
    restartFn = () => btn.click();

  } else if (id.includes('jelly-squeeze') || id === 'jelly-squeeze-button') {
    const btn = document.createElement('button');
    btn.style.cssText = `padding:12px 26px; border-radius:12px; background:#FFB703; color:#08090B; border:none; font-weight:900; font-size:13px; cursor:pointer; transition:transform 0.3s cubic-bezier(0.34, 1.7, 0.64, 1);`;
    btn.textContent = '🍮 Squeeze Me';
    btn.addEventListener('mousedown', () => btn.style.transform = 'scaleX(1.3) scaleY(0.7)');
    btn.addEventListener('mouseup', () => btn.style.transform = 'scaleX(0.9) scaleY(1.2)');
    btn.addEventListener('mouseleave', () => btn.style.transform = 'none');
    stage.appendChild(btn);
    restartFn = () => { btn.style.transform = 'scaleX(1.2) scaleY(0.8)'; setTimeout(() => btn.style.transform = 'none', 250); };

  } else if (id.includes('outline-draw') || id === 'outline-draw-button') {
    const btn = document.createElement('button');
    btn.style.cssText = `position:relative; padding:12px 26px; border-radius:8px; background:transparent; border:2px dashed ${accent}; color:#FFF; font-weight:800; font-size:12px; cursor:pointer;`;
    btn.textContent = '✏️ Draw Stroke';
    stage.appendChild(btn);
    restartFn = () => { btn.style.borderColor = '#FFF'; setTimeout(() => btn.style.borderColor = accent, 200); };

  } else if (id.includes('floating-halo') || id === 'floating-halo-button') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; display:flex; flex-direction:column; align-items:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="padding:12px 24px; border-radius:12px; background:#181E2E; border:1px solid #333F58; color:#FFF; font-weight:800; font-size:12px; z-index:2;">
        😇 Halo Levitating
      </div>
      <div style="position:absolute; bottom:-10px; width:70%; height:12px; border-radius:50%; background:${accent}; filter:blur(10px); opacity:0.7; z-index:1; animation:dnPulseGlow 1.8s infinite alternate;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'translateY(-6px)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('radar-sweep') || id === 'radar-sweep-button') {
    const btn = document.createElement('button');
    btn.style.cssText = `position:relative; overflow:hidden; padding:12px 26px; border-radius:10px; background:#0B1414; border:1px solid #1C3D3D; color:#42FFB0; font-weight:800; font-size:12px; cursor:pointer; font-family:var(--font-mono);`;
    btn.innerHTML = `<div style="position:absolute; inset:-50%; background:conic-gradient(from 0deg, transparent 75%, #42FFB0 100%); animation:dnBorderBeam 2.5s linear infinite; opacity:0.35;"></div><span style="position:relative; z-index:2;">🧭 RADAR ACTIVE</span>`;
    stage.appendChild(btn);
    restartFn = () => { btn.style.transform = 'scale(1.08)'; setTimeout(() => btn.style.transform = 'none', 180); };

  } else if (id.includes('segmented-toggle') || id === 'segmented-toggle-button') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:3px; border-radius:99px; background:#121622; border:1px solid #283144; display:flex; gap:2px; cursor:pointer;';
    wrap.innerHTML = `
      <button class="st-seg active" style="padding:8px 16px; border-radius:99px; border:none; background:${accent}; color:#08090B; font-weight:800; font-size:11px; cursor:pointer;">Monthly</button>
      <button class="st-seg" style="padding:8px 16px; border-radius:99px; border:none; background:transparent; color:#A0AEC0; font-weight:700; font-size:11px; cursor:pointer;">Yearly</button>
    `;
    const btns = wrap.querySelectorAll('.st-seg');
    btns.forEach((b, idx) => {
      b.addEventListener('click', () => {
        btns.forEach(other => {
          other.style.background = 'transparent';
          other.style.color = '#A0AEC0';
        });
        b.style.background = accent;
        b.style.color = '#08090B';
      });
    });
    stage.appendChild(wrap);
    restartFn = () => btns[1].click();

  } else if (id.includes('split-reveal') || id === 'split-reveal-button') {
    const btn = document.createElement('button');
    btn.style.cssText = 'position:relative; overflow:hidden; padding:12px 24px; border-radius:8px; background:#181F2E; border:1px solid #333F58; color:#FFF; font-weight:800; font-size:12px; cursor:pointer;';
    btn.innerHTML = `<span>✂️ Split Horizon</span>`;
    btn.addEventListener('mouseenter', () => btn.style.letterSpacing = '2px');
    btn.addEventListener('mouseleave', () => btn.style.letterSpacing = 'normal');
    stage.appendChild(btn);
    restartFn = () => { btn.style.letterSpacing = '3px'; setTimeout(() => btn.style.letterSpacing = 'normal', 300); };

  } else if (id.includes('audio-click') || id === 'audio-click-button') {
    const btn = document.createElement('button');
    btn.style.cssText = `padding:10px 22px; border-radius:10px; background:#111622; border:1.5px solid ${accent}; display:flex; align-items:center; gap:8px; cursor:pointer;`;
    btn.innerHTML = `
      <span style="color:#FFF; font-weight:800; font-size:12px;">Audio Beat</span>
      <div style="display:flex; align-items:center; gap:2.5px; height:16px;">
        <span style="width:3px; height:12px; background:${accent}; border-radius:1px; animation:dnEqBounce 0.4s infinite alternate;"></span>
        <span style="width:3px; height:16px; background:${accent}; border-radius:1px; animation:dnEqBounce 0.6s infinite alternate;"></span>
        <span style="width:3px; height:8px; background:${accent}; border-radius:1px; animation:dnEqBounce 0.5s infinite alternate;"></span>
      </div>
    `;
    stage.appendChild(btn);
    restartFn = () => { btn.style.transform = 'scale(1.1)'; setTimeout(() => btn.style.transform = 'none', 180); };

  } else if (id.includes('laser-scan') || id === 'laser-scan-button') {
    const btn = document.createElement('button');
    btn.style.cssText = `position:relative; overflow:hidden; padding:12px 26px; border-radius:8px; background:#10141D; border:1px solid #282E3D; color:#FFF; font-weight:800; font-size:12px; cursor:pointer; font-family:var(--font-mono);`;
    btn.innerHTML = `
      <div style="position:absolute; left:0; width:100%; height:2px; background:#FF0055; box-shadow:0 0 10px #FF0055; animation:dnFloatLevitate 1.5s infinite ease-in-out;"></div>
      <span style="position:relative; z-index:2; color:#FF5788;">🚨 LASER SCAN</span>
    `;
    stage.appendChild(btn);
    restartFn = () => { btn.style.transform = 'scale(1.08)'; setTimeout(() => btn.style.transform = 'none', 180); };

  } else if (id.includes('firefly-swarm') || id === 'firefly-swarm-button') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; padding:12px 26px; border-radius:10px; background:#141A26; border:1px solid #2E3A52; color:#FFF; font-weight:800; font-size:12px; cursor:pointer;';
    wrap.innerHTML = `
      <span>🪲 Firefly Orbit</span>
      <div style="position:absolute; width:4px; height:4px; border-radius:50%; background:${accent}; box-shadow:0 0 8px ${accent}; animation:dnFloatLevitate 1.8s infinite alternate; top:4px; left:8px;"></div>
      <div style="position:absolute; width:4px; height:4px; border-radius:50%; background:#42E8F5; box-shadow:0 0 8px #42E8F5; animation:dnFloatLevitate 1.2s infinite alternate-reverse; bottom:4px; right:8px;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('corner') || id === 'corner-button') {
    const btn = document.createElement('button');
    btn.style.cssText = `position:relative; padding:12px 24px; background:#131620; border:none; color:#FFF; font-weight:800; font-size:12px; cursor:pointer;`;
    btn.innerHTML = `
      <span style="position:absolute; top:0; left:0; width:8px; height:8px; border-top:2px solid ${accent}; border-left:2px solid ${accent};"></span>
      <span style="position:absolute; top:0; right:0; width:8px; height:8px; border-top:2px solid ${accent}; border-right:2px solid ${accent};"></span>
      <span style="position:absolute; bottom:0; left:0; width:8px; height:8px; border-bottom:2px solid ${accent}; border-left:2px solid ${accent};"></span>
      <span style="position:absolute; bottom:0; right:0; width:8px; height:8px; border-bottom:2px solid ${accent}; border-right:2px solid ${accent};"></span>
      <span style="position:relative; z-index:2; color:${accent}; font-family:var(--font-mono);">[ CORNER TECH ]</span>
    `;
    stage.appendChild(btn);
    restartFn = () => { btn.style.transform = 'scale(1.1)'; setTimeout(() => btn.style.transform = 'none', 180); };

  } else if (id.includes('magnetic') || id === 'magnetic-button') {
    const btn = document.createElement('button');
    btn.style.cssText = `padding:12px 24px; border-radius:99px; background:#181D2A; border:1.5px solid ${accent}; color:#FFF; font-weight:800; font-size:12px; cursor:pointer; transition:transform 0.15s ease-out; box-shadow:0 0 16px ${accent}33;`;
    btn.innerHTML = `<span>🧲 Magnetic Pull</span>`;
    stage.addEventListener('mousemove', (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      btn.style.transform = `translate(${x * 24}px, ${y * 24}px)`;
    });
    stage.addEventListener('mouseleave', () => { btn.style.transform = 'none'; });
    stage.appendChild(btn);
    restartFn = () => { btn.style.transform = 'scale(1.15)'; setTimeout(() => btn.style.transform = 'none', 180); };

  } else if (id.includes('radial-glow') || id === 'radial-glow-button') {
    const btn = document.createElement('button');
    btn.style.cssText = `position:relative; overflow:hidden; padding:12px 26px; border-radius:10px; background:#111318; border:1px solid #282E3D; color:#FFF; font-weight:800; font-size:12px; cursor:pointer;`;
    btn.innerHTML = `
      <div class="rg-glow" style="position:absolute; width:80px; height:80px; border-radius:50%; background:radial-gradient(circle, ${accent}66 0%, transparent 70%); pointer-events:none; transform:translate(-50%, -50%); opacity:0; transition:opacity 0.2s;"></div>
      <span style="position:relative; z-index:2;">Radial Spotlight</span>
    `;
    const glow = btn.querySelector('.rg-glow');
    btn.addEventListener('mouseenter', () => glow.style.opacity = '1');
    btn.addEventListener('mouseleave', () => glow.style.opacity = '0');
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      glow.style.left = `${e.clientX - r.left}px`;
      glow.style.top = `${e.clientY - r.top}px`;
    });
    stage.appendChild(btn);
    restartFn = () => { glow.style.opacity = '1'; glow.style.left = '50%'; glow.style.top = '50%'; };

  } else if (id.includes('pop-button') || id === 'pop-button') {
    // Pop Button
    const btn = document.createElement('button');
    btn.style.cssText = `padding:12px 26px; border-radius:10px; background:${accent}; color:#08090B; border:none; font-weight:900; font-size:13px; cursor:pointer; box-shadow:0 8px 20px ${accent}66; transition:transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);`;
    btn.textContent = '🚀 Pop Button';
    btn.addEventListener('click', () => {
      btn.style.transform = 'scale(0.88)';
      setTimeout(() => btn.style.transform = 'scale(1.1)', 100);
      setTimeout(() => btn.style.transform = 'none', 200);
    });
    stage.appendChild(btn);
    restartFn = () => btn.click();

  } else {
    // Default Button
    const btn = document.createElement('button');
    btn.style.cssText = `padding:12px 26px; border-radius:10px; background:${accent}; color:#08090B; border:none; font-weight:900; font-size:13px; cursor:pointer;`;
    btn.textContent = name || 'Button';
    stage.appendChild(btn);
    restartFn = () => { btn.style.transform = 'scale(1.1)'; setTimeout(() => btn.style.transform = 'none', 180); };
  }

  return { restart: restartFn, destroy: destroyFn };
}
