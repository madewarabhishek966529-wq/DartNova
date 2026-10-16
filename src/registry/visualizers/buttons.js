/**
 * DartNova Buttons & Controls Visualizers (10 Bespoke Modern UI Components)
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

  } else if (id.includes('elastic') || id === 'elastic-bounce-button') {
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

  } else {
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
  }

  return { restart: restartFn, destroy: destroyFn };
}
