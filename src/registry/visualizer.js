/**
 * DartNova Motion Visualizer Engine
 * High-performance interactive visualizer for all motion design library components
 * Provides 60fps micro-animations, real-time reactive prop binding, touch/mouse interactivity,
 * and robust fail-safe rendering without null canvas crashes.
 */

export function createMotionVisualizer(id, category, name, icon, props) {
  const accent = props.accentColor || '#C5FF35';
  const duration = props.duration || 350;
  const stage = document.createElement('div');
  stage.className = 'dn-motion-stage';
  stage.style.position = 'relative';
  stage.style.width = '100%';
  stage.style.height = '100%';
  stage.style.display = 'flex';
  stage.style.flexDirection = 'column';
  stage.style.alignItems = 'center';
  stage.style.justifyContent = 'center';
  stage.style.overflow = 'hidden';
  stage.style.padding = '12px';
  stage.style.boxSizing = 'border-box';
  stage.style.userSelect = 'none';

  let restartFn = () => {};
  let destroyFn = () => {};

  // =========================================================================
  // 1. BUTTONS & CONTROLS
  // =========================================================================
  if (category === 'buttons') {
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
      restartFn = () => { btn.click(); };
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
    } else {
      const btn = document.createElement('button');
      btn.style.cssText = `padding:12px 26px; border-radius:10px; background:${accent}; color:#08090B; border:none; font-weight:800; font-size:13px; cursor:pointer; box-shadow:0 0 20px ${accent}55; transition:transform 0.2s;`;
      btn.textContent = name;
      btn.addEventListener('click', () => {
        btn.style.transform = 'scale(0.92)';
        setTimeout(() => btn.style.transform = 'scale(1)', 120);
      });
      stage.appendChild(btn);
      restartFn = () => { btn.style.transform = 'scale(1.1)'; setTimeout(() => btn.style.transform = 'none', 180); };
    }

  // =========================================================================
  // 2. CARDS & SURFACES
  // =========================================================================
  } else if (category === 'cards') {
    if (id.includes('glassmorphism')) {
      const card = document.createElement('div');
      card.style.cssText = `width:190px; padding:14px 16px; border-radius:14px; background:rgba(255, 255, 255, 0.05); backdrop-filter:blur(16px); border:1px solid rgba(255, 255, 255, 0.18); box-shadow:0 12px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2); display:flex; flex-direction:column; gap:10px; cursor:pointer; transition:transform 0.3s ease, border-color 0.3s ease;`;
      card.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center;"><div style="width:26px; height:18px; background:linear-gradient(135deg, #FFD700, #FFA500); border-radius:3px;"></div><span style="font-family:var(--font-mono); font-size:10px; color:${accent}; font-weight:700;">TITANIUM</span></div><div style="font-family:var(--font-mono); font-size:12px; letter-spacing:2px; color:#FFF;">•••• 9428</div><div style="display:flex; justify-content:space-between; align-items:flex-end;"><div><div style="font-size:8px; color:var(--text-muted); text-transform:uppercase;">Cardholder</div><div style="font-size:10px; font-weight:700; color:#FFF;">ALEX RIVERA</div></div><div style="font-size:11px; font-weight:700; color:${accent};">$18,420</div></div>`;
      card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-4px) scale(1.03)');
      card.addEventListener('mouseleave', () => card.style.transform = 'none');
      stage.appendChild(card);
      restartFn = () => { card.style.transform = 'scale(1.05)'; setTimeout(() => card.style.transform = 'none', 200); };
    } else if (id.includes('flip')) {
      const flip = document.createElement('div');
      flip.className = 'dn-flip-card-widget';
      flip.style.cssText = 'perspective:800px; width:170px; height:105px; cursor:pointer;';
      flip.innerHTML = `<div class="dn-flip-inner" style="position:relative; width:100%; height:100%; transition:transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); transform-style:preserve-3d;"><div class="dn-flip-front" style="position:absolute; inset:0; backface-visibility:hidden; border-radius:10px; background:#151821; border:1px solid #282E3C; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; padding:10px;"><div style="width:34px; height:34px; border-radius:50%; background:linear-gradient(135deg, ${accent}, #42E8F5); display:flex; align-items:center; justify-content:center; font-weight:800; color:#08090B; font-size:14px;">AR</div><div style="font-size:12px; font-weight:700; color:#FFF;">Alex Rivera</div><div style="font-size:9px; color:var(--text-muted);">Motion Designer</div></div><div class="dn-flip-back" style="position:absolute; inset:0; backface-visibility:hidden; border-radius:10px; background:#181c26; border:1px solid ${accent}; transform:rotateY(180deg); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; padding:10px;"><div style="font-size:10px; font-weight:700; color:${accent};">METRICS</div><div style="font-size:11px; color:#FFF;">142 Projects</div><div style="font-size:9px; color:var(--text-muted);">Tap to flip</div></div></div>`;
      const inner = flip.querySelector('.dn-flip-inner');
      let flipped = false;
      flip.addEventListener('click', () => { flipped = !flipped; inner.style.transform = flipped ? 'rotateY(180deg)' : 'none'; });
      stage.appendChild(flip);
      restartFn = () => { flipped = !flipped; inner.style.transform = flipped ? 'rotateY(180deg)' : 'none'; };
    } else if (id.includes('holographic')) {
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
    } else if (id.includes('spotlight')) {
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
    } else if (id.includes('expandable')) {
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
    } else {
      // 3D Tilt Card
      const card = document.createElement('div');
      card.style.cssText = `width:175px; padding:14px; border-radius:12px; background:#181B24; border:1px solid #2A3040; box-shadow:0 10px 25px rgba(0,0,0,0.4); cursor:pointer; transition:transform 0.15s ease-out, border-color 0.2s;`;
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

  // =========================================================================
  // 3. TEXT & TYPOGRAPHY (Matches category 'text' or 'typography')
  // =========================================================================
  } else if (category === 'text' || category === 'typography') {
    if (id.includes('glitch')) {
      const el = document.createElement('div');
      el.className = 'dn-glitch-text-widget';
      el.style.cssText = `font-family:var(--font-display); font-size:24px; font-weight:800; letter-spacing:0.1em; color:#FFF; animation:dnGlitchJitter 2.5s infinite; cursor:pointer;`;
      el.textContent = 'DARTNOVA';
      stage.appendChild(el);
      restartFn = () => { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = 'dnGlitchJitter 2.5s infinite'; };
    } else if (id.includes('gradient-flow') || id.includes('gradient')) {
      const el = document.createElement('div');
      el.style.cssText = `font-family:var(--font-display); font-size:24px; font-weight:800; letter-spacing:-0.02em; background:linear-gradient(90deg, ${accent}, #42E8F5, #9B7CFF, ${accent}); background-size:300% 100%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation:dnShimmerSweep 3s linear infinite; cursor:pointer;`;
      el.textContent = 'MOTION FLOW';
      stage.appendChild(el);
      restartFn = () => { el.style.transform = 'scale(1.1)'; setTimeout(() => el.style.transform = 'none', 180); };
    } else if (id.includes('wave')) {
      const el = document.createElement('div');
      el.style.cssText = 'display:flex; gap:3px; font-size:20px; font-weight:800; font-family:var(--font-mono); cursor:pointer;';
      const text = 'SINE WAVE';
      el.innerHTML = text.split('').map((char, i) => `<span style="display:inline-block; animation:dnTextWaveLetter 1.4s ease-in-out infinite; animation-delay:${i * 0.12}s; color:${i % 2 === 0 ? accent : '#FFF'};">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
      stage.appendChild(el);
      restartFn = () => { el.style.transform = 'scale(1.1)'; setTimeout(() => el.style.transform = 'none', 200); };
    } else if (id.includes('word-reveal')) {
      const el = document.createElement('div');
      el.style.cssText = 'display:flex; gap:6px; font-size:18px; font-weight:800; color:#FFF; cursor:pointer;';
      const words = ['Flutter', 'Motion', 'Live'];
      const build = () => {
        el.innerHTML = words.map((w, i) => `<span style="opacity:0; transform:translateY(12px); display:inline-block; transition:all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); transition-delay:${i * 0.15}s; color:${i === 2 ? accent : '#FFF'};">${w}</span>`).join('');
        setTimeout(() => {
          el.querySelectorAll('span').forEach(s => { s.style.opacity = '1'; s.style.transform = 'translateY(0)'; });
        }, 30);
      };
      build();
      el.addEventListener('click', build);
      stage.appendChild(el);
      restartFn = build;
    } else if (id.includes('morphing')) {
      const el = document.createElement('div');
      el.style.cssText = `font-family:var(--font-mono); font-size:22px; font-weight:800; color:${accent}; cursor:pointer; transition:opacity 0.25s, transform 0.25s;`;
      const words = ['FLUTTER', 'ANIMATION', 'DARTNOVA'];
      let idx = 0;
      el.textContent = words[0];
      const nextWord = () => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(-8px) scale(0.9)';
        setTimeout(() => {
          idx = (idx + 1) % words.length;
          el.textContent = words[idx];
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) scale(1)';
        }, 220);
      };
      el.addEventListener('click', nextWord);
      const timer = setInterval(nextWord, 2400);
      destroyFn = () => clearInterval(timer);
      stage.appendChild(el);
      restartFn = nextWord;
    } else {
      // Scramble Text
      const el = document.createElement('div');
      el.style.cssText = `font-family:var(--font-mono); font-size:20px; font-weight:800; color:${accent}; cursor:pointer; text-align:center;`;
      const phrase = 'FLUTTER CODE';
      const chars = '!@#$%^&*()_+-=<>?/';
      let interval = null;
      const runScramble = () => {
        let iter = 0;
        clearInterval(interval);
        interval = setInterval(() => {
          el.textContent = phrase.split('').map((letter, idx) => {
            if (idx < iter) return phrase[idx];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('');
          if (iter >= phrase.length) clearInterval(interval);
          iter += 0.5;
        }, 30);
      };
      runScramble();
      el.addEventListener('mouseenter', runScramble);
      stage.appendChild(el);
      restartFn = runScramble;
      destroyFn = () => clearInterval(interval);
    }

  // =========================================================================
  // 4. LOADERS & PROGRESS
  // =========================================================================
  } else if (category === 'loaders') {
    if (id.includes('orbit')) {
      const el = document.createElement('div');
      el.className = 'dn-orbit-loader-widget';
      el.innerHTML = `<div class="dn-orbit-ring ring-1" style="border-color:${accent};"></div><div class="dn-orbit-ring ring-2"></div><div class="dn-orbit-center" style="background:${accent}; box-shadow:0 0 12px ${accent};"></div>`;
      stage.appendChild(el);
      restartFn = () => { el.style.transform = 'scale(1.2)'; setTimeout(() => el.style.transform = 'none', 200); };
    } else if (id.includes('wave')) {
      const el = document.createElement('div');
      el.className = 'dn-wave-loader-widget';
      el.innerHTML = `<div class="dn-wave-bar" style="background:${accent};"></div><div class="dn-wave-bar" style="background:#42E8F5;"></div><div class="dn-wave-bar" style="background:#9B7CFF;"></div><div class="dn-wave-bar" style="background:#42E8F5;"></div><div class="dn-wave-bar" style="background:${accent};"></div>`;
      stage.appendChild(el);
      restartFn = () => { el.style.transform = 'scale(1.2)'; setTimeout(() => el.style.transform = 'none', 200); };
    } else if (id.includes('counter') || id.includes('number')) {
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
    } else if (id.includes('dot-matrix')) {
      const el = document.createElement('div');
      el.style.cssText = 'display:grid; grid-template-columns:repeat(4, 10px); gap:6px;';
      for (let i = 0; i < 16; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `width:10px; height:10px; border-radius:50%; background:${accent}; opacity:${0.2 + (i % 4) * 0.25}; animation:dnPulseGlow 1.5s ease-in-out infinite alternate; animation-delay:${(i % 4) * 0.15 + Math.floor(i / 4) * 0.1}s;`;
        el.appendChild(dot);
      }
      stage.appendChild(el);
      restartFn = () => { el.style.transform = 'scale(1.15)'; setTimeout(() => el.style.transform = 'none', 180); };
    } else if (id.includes('segmented')) {
      const el = document.createElement('div');
      el.style.cssText = 'display:flex; gap:6px; width:160px;';
      for (let i = 0; i < 5; i++) {
        const seg = document.createElement('div');
        seg.style.cssText = `flex:1; height:8px; border-radius:4px; background:#222632; overflow:hidden; position:relative;`;
        seg.innerHTML = `<div style="width:100%; height:100%; background:${accent}; transform:translateX(-100%); animation:dnBarGrow 2s ease-in-out infinite alternate; animation-delay:${i * 0.2}s;"></div>`;
        el.appendChild(seg);
      }
      stage.appendChild(el);
      restartFn = () => { el.style.transform = 'scale(1.08)'; setTimeout(() => el.style.transform = 'none', 180); };
    } else {
      // Circular SVG Progress Ring
      const el = document.createElement('div');
      el.className = 'dn-circular-ring-widget';
      el.innerHTML = `<svg viewBox="0 0 76 76"><circle class="track" cx="38" cy="38" r="30" stroke-width="6" fill="none"></circle><circle class="fill" cx="38" cy="38" r="30" stroke-width="6" fill="none" style="stroke:${accent};"></circle></svg><div class="ring-val" style="color:${accent};">84%</div>`;
      stage.appendChild(el);
      restartFn = () => {
        const circle = el.querySelector('.fill');
        if (circle) {
          circle.style.strokeDashoffset = '200';
          setTimeout(() => circle.style.strokeDashoffset = '60', 40);
        }
      };
    }

  // =========================================================================
  // =========================================================================
  // 5. NAVIGATION & MENUS
  // =========================================================================
  } else if (category === 'navigation') {
    if (id === 'radial-menu' || id.includes('radial')) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative; width:150px; height:110px; display:flex; align-items:center; justify-content:center;';
      wrap.innerHTML = `
        <div class="hub-btn" style="width:40px; height:40px; border-radius:50%; background:${accent}; color:#08090B; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:800; cursor:pointer; z-index:3; box-shadow:0 0 18px ${accent}66; transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">🧭</div>
        <div class="radial-item r-1" style="position:absolute; width:28px; height:28px; border-radius:50%; background:#1C212D; border:1px solid ${accent}; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:12px; cursor:pointer; opacity:0; pointer-events:none; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); z-index:2;">🔍</div>
        <div class="radial-item r-2" style="position:absolute; width:28px; height:28px; border-radius:50%; background:#1C212D; border:1px solid #42E8F5; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:12px; cursor:pointer; opacity:0; pointer-events:none; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); z-index:2;">⭐</div>
        <div class="radial-item r-3" style="position:absolute; width:28px; height:28px; border-radius:50%; background:#1C212D; border:1px solid #9B7CFF; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:12px; cursor:pointer; opacity:0; pointer-events:none; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); z-index:2;">📤</div>
        <div class="radial-item r-4" style="position:absolute; width:28px; height:28px; border-radius:50%; background:#1C212D; border:1px solid #FFA500; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:12px; cursor:pointer; opacity:0; pointer-events:none; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); z-index:2;">⚙️</div>
        <div class="radial-item r-5" style="position:absolute; width:28px; height:28px; border-radius:50%; background:#1C212D; border:1px solid #FF4B72; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:12px; cursor:pointer; opacity:0; pointer-events:none; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); z-index:2;">❤️</div>
      `;
      let isOpen = false;
      const hub = wrap.querySelector('.hub-btn');
      const items = [
        { el: wrap.querySelector('.r-1'), x: -44, y: 0 },
        { el: wrap.querySelector('.r-2'), x: -28, y: -38 },
        { el: wrap.querySelector('.r-3'), x: 28, y: -38 },
        { el: wrap.querySelector('.r-4'), x: 44, y: 0 },
        { el: wrap.querySelector('.r-5'), x: 0, y: 40 }
      ];
      const toggleRadial = () => {
        isOpen = !isOpen;
        hub.style.transform = isOpen ? 'rotate(45deg) scale(1.1)' : 'none';
        items.forEach((it, idx) => {
          if (isOpen) {
            it.el.style.opacity = '1';
            it.el.style.pointerEvents = 'auto';
            it.el.style.transform = `translate(${it.x}px, ${it.y}px) scale(1)`;
            it.el.style.transitionDelay = `${idx * 0.04}s`;
          } else {
            it.el.style.opacity = '0';
            it.el.style.pointerEvents = 'none';
            it.el.style.transform = 'translate(0, 0) scale(0.3)';
            it.el.style.transitionDelay = '0s';
          }
        });
      };
      hub.addEventListener('click', toggleRadial);
      items.forEach(it => {
        it.el.addEventListener('click', (e) => {
          e.stopPropagation();
          it.el.style.transform = `${it.el.style.transform} scale(1.35)`;
          setTimeout(() => toggleRadial(), 180);
        });
      });
      stage.appendChild(wrap);
      restartFn = toggleRadial;
    } else if (id === 'animated-sidebar' || id.includes('sidebar')) {
      const shell = document.createElement('div');
      shell.style.cssText = 'width:190px; height:105px; border-radius:10px; background:#10131A; border:1px solid #262D3D; display:flex; overflow:hidden; cursor:pointer;';
      shell.innerHTML = `
        <div class="sb-nav" style="width:110px; height:100%; background:#151A24; border-right:1px solid #262D3D; padding:6px; display:flex; flex-direction:column; gap:4px; transition:width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); box-sizing:border-box; position:relative;">
          <div class="sb-toggle-btn" style="display:flex; align-items:center; justify-content:space-between; padding:3px 6px; border-radius:6px; background:#1F2636; color:${accent}; font-size:10px; font-weight:800;">
            <span class="sb-lbl" style="transition:opacity 0.2s; white-space:nowrap; overflow:hidden;">SIDEBAR</span>
            <span>◀</span>
          </div>
          <div class="sb-item active" data-name="Home" style="display:flex; align-items:center; gap:6px; padding:4px 6px; border-radius:6px; background:${accent}22; color:${accent}; font-size:10px; font-weight:700;">
            <span>🏠</span><span class="sb-lbl" style="white-space:nowrap; overflow:hidden;">Home</span>
          </div>
          <div class="sb-item" data-name="Stats" style="display:flex; align-items:center; gap:6px; padding:4px 6px; border-radius:6px; color:#A0AEC0; font-size:10px; font-weight:600;">
            <span>📊</span><span class="sb-lbl" style="white-space:nowrap; overflow:hidden;">Stats</span>
          </div>
          <div class="sb-item" data-name="Config" style="display:flex; align-items:center; gap:6px; padding:4px 6px; border-radius:6px; color:#A0AEC0; font-size:10px; font-weight:600;">
            <span>⚙️</span><span class="sb-lbl" style="white-space:nowrap; overflow:hidden;">Config</span>
          </div>
        </div>
        <div class="sb-content" style="flex:1; padding:10px; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;">
          <div class="sb-title" style="font-size:11px; font-weight:800; color:#FFF;">Home View</div>
          <div style="font-size:9px; color:var(--text-muted); margin-top:2px;">Tap to toggle</div>
        </div>
      `;
      let collapsed = false;
      const sbNav = shell.querySelector('.sb-nav');
      const toggle = () => {
        collapsed = !collapsed;
        sbNav.style.width = collapsed ? '36px' : '110px';
        shell.querySelector('.sb-toggle-btn span:last-child').textContent = collapsed ? '▶' : '◀';
        shell.querySelectorAll('.sb-lbl').forEach(l => {
          l.style.opacity = collapsed ? '0' : '1';
          l.style.width = collapsed ? '0' : 'auto';
        });
      };
      shell.querySelector('.sb-toggle-btn').addEventListener('click', (e) => { e.stopPropagation(); toggle(); });
      shell.querySelectorAll('.sb-item').forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          shell.querySelectorAll('.sb-item').forEach(i => {
            i.style.background = 'transparent';
            i.style.color = '#A0AEC0';
          });
          item.style.background = `${accent}22`;
          item.style.color = accent;
          shell.querySelector('.sb-title').textContent = `${item.getAttribute('data-name')} View`;
        });
      });
      shell.addEventListener('click', toggle);
      stage.appendChild(shell);
      restartFn = toggle;
    } else if (id === 'pill-tab-switcher' || id.includes('pill-tab')) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex; flex-direction:column; align-items:center; gap:10px;';
      wrap.innerHTML = `
        <div class="pill-bar" style="position:relative; width:180px; height:34px; border-radius:99px; background:#141720; border:1px solid #272D3D; display:flex; padding:3px; box-sizing:border-box;">
          <div class="active-pill" style="position:absolute; top:3px; bottom:3px; width:56px; border-radius:99px; background:${accent}; left:3px; transition:transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow:0 0 10px ${accent}66;"></div>
          <div class="pt-item active" data-idx="0" style="flex:1; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; color:#08090B; position:relative; z-index:2; cursor:pointer; transition:color 0.2s;">Design</div>
          <div class="pt-item" data-idx="1" style="flex:1; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; color:#FFF; position:relative; z-index:2; cursor:pointer; transition:color 0.2s;">Code</div>
          <div class="pt-item" data-idx="2" style="flex:1; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; color:#FFF; position:relative; z-index:2; cursor:pointer; transition:color 0.2s;">Motion</div>
        </div>
        <div class="pill-panel" style="width:170px; padding:8px; border-radius:8px; background:#151922; border:1px solid #232836; text-align:center; font-size:10px; color:${accent}; font-family:var(--font-mono); font-weight:700; transition:opacity 0.2s;">
          Design: 120 FPS Curves
        </div>
      `;
      const pill = wrap.querySelector('.active-pill');
      const panel = wrap.querySelector('.pill-panel');
      const labels = ['Design: 120 FPS Curves', 'Code: Flutter 3.24 Widget', 'Motion: Spring Mass 1.0'];
      const tabs = wrap.querySelectorAll('.pt-item');
      let currentIdx = 0;
      const setTab = (idx) => {
        currentIdx = idx;
        pill.style.transform = `translateX(${idx * 58}px)`;
        tabs.forEach((t, i) => {
          t.style.color = (i === idx) ? '#08090B' : '#FFF';
        });
        panel.style.opacity = '0';
        setTimeout(() => {
          panel.textContent = labels[idx];
          panel.style.opacity = '1';
        }, 100);
      };
      tabs.forEach((t, i) => {
        t.addEventListener('click', () => setTab(i));
      });
      stage.appendChild(wrap);
      restartFn = () => setTab((currentIdx + 1) % 3);
    } else if (id === 'breadcrumb-reveal' || id.includes('breadcrumb')) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex; flex-direction:column; align-items:center; gap:10px; cursor:pointer;';
      wrap.innerHTML = `
        <div class="bc-row" style="display:flex; align-items:center; gap:5px; font-size:11px; font-family:var(--font-mono); font-weight:700; background:#141720; padding:8px 12px; border-radius:8px; border:1px solid #272E3F;">
          <span class="bc-node b1" style="color:var(--text-muted); opacity:0; transform:translateX(-10px); transition:all 0.3s ease;">App</span>
          <span class="bc-slash s1" style="color:#4B5563; opacity:0; transition:all 0.3s ease 0.08s;">›</span>
          <span class="bc-node b2" style="color:var(--text-muted); opacity:0; transform:translateX(-10px); transition:all 0.3s ease 0.14s;">Motion</span>
          <span class="bc-slash s2" style="color:#4B5563; opacity:0; transition:all 0.3s ease 0.20s;">›</span>
          <span class="bc-node b3 active" style="color:${accent}; opacity:0; transform:translateX(-10px); transition:all 0.3s ease 0.26s; display:flex; align-items:center; gap:4px;">
            <span style="width:6px; height:6px; border-radius:50%; background:${accent}; box-shadow:0 0 6px ${accent};"></span>120 FPS
          </span>
        </div>
        <div style="font-size:9px; color:var(--text-muted);">Tap to replay cascade</div>
      `;
      const playReveal = () => {
        const els = wrap.querySelectorAll('.bc-node, .bc-slash');
        els.forEach(el => {
          el.style.opacity = '0';
          el.style.transform = 'translateX(-10px)';
        });
        setTimeout(() => {
          els.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateX(0)';
          });
        }, 40);
      };
      playReveal();
      wrap.addEventListener('click', playReveal);
      stage.appendChild(wrap);
      restartFn = playReveal;
    } else if (id.includes('floating-dock') || id.includes('dock')) {
      const dock = document.createElement('div');
      dock.className = 'dn-floating-dock-widget';
      dock.innerHTML = `<div class="dn-dock-icon">⚡</div><div class="dn-dock-icon">🎨</div><div class="dn-dock-icon" style="background:${accent}; color:#08090B;">🚀</div><div class="dn-dock-icon">✨</div><div class="dn-dock-icon">⚙️</div>`;
      stage.appendChild(dock);
      restartFn = () => { dock.style.transform = 'scale(1.1)'; setTimeout(() => dock.style.transform = 'none', 200); };
    } else if (id.includes('hamburger')) {
      const ham = document.createElement('div');
      ham.style.cssText = 'width:36px; height:28px; display:flex; flex-direction:column; justify-content:space-between; cursor:pointer; padding:2px;';
      ham.innerHTML = `<div style="height:3.5px; background:${accent}; border-radius:2px; transition:transform 0.3s ease;"></div><div style="height:3.5px; background:${accent}; border-radius:2px; transition:opacity 0.2s ease;"></div><div style="height:3.5px; background:${accent}; border-radius:2px; transition:transform 0.3s ease;"></div>`;
      let open = false;
      ham.addEventListener('click', () => {
        open = !open;
        const [t, m, b] = ham.children;
        if (open) {
          t.style.transform = 'translateY(10px) rotate(45deg)';
          m.style.opacity = '0';
          b.style.transform = 'translateY(-10px) rotate(-45deg)';
        } else {
          t.style.transform = 'none';
          m.style.opacity = '1';
          b.style.transform = 'none';
        }
      });
      stage.appendChild(ham);
      restartFn = () => ham.click();
    } else if (id.includes('expanding')) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative; width:120px; height:80px; display:flex; align-items:center; justify-content:center;';
      wrap.innerHTML = `<div class="hub-btn" style="width:40px; height:40px; border-radius:50%; background:${accent}; color:#08090B; display:flex; align-items:center; justify-content:center; font-weight:800; cursor:pointer; z-index:2; box-shadow:0 0 15px ${accent}66; transition:transform 0.3s;">⚡</div><div class="item-1" style="position:absolute; width:28px; height:28px; border-radius:50%; background:#202533; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:12px; transition:all 0.3s ease;">★</div><div class="item-2" style="position:absolute; width:28px; height:28px; border-radius:50%; background:#202533; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:12px; transition:all 0.3s ease;">✦</div><div class="item-3" style="position:absolute; width:28px; height:28px; border-radius:50%; background:#202533; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:12px; transition:all 0.3s ease;">🚀</div>`;
      let isOpen = false;
      const hub = wrap.querySelector('.hub-btn');
      const [i1, i2, i3] = [wrap.querySelector('.item-1'), wrap.querySelector('.item-2'), wrap.querySelector('.item-3')];
      hub.addEventListener('click', () => {
        isOpen = !isOpen;
        hub.style.transform = isOpen ? 'rotate(45deg)' : 'none';
        i1.style.transform = isOpen ? 'translate(-42px, 0)' : 'none';
        i2.style.transform = isOpen ? 'translate(0, -38px)' : 'none';
        i3.style.transform = isOpen ? 'translate(42px, 0)' : 'none';
      });
      stage.appendChild(wrap);
      restartFn = () => hub.click();
    } else {
      // Mobile Bottom Nav with Gliding Pill
      const nav = document.createElement('div');
      nav.className = 'dn-mobile-nav-widget';
      nav.style.width = '190px';
      nav.innerHTML = `<div class="dn-mobile-nav-pill" style="left:12px; border-color:${accent}; background:${accent}22;"></div><div class="dn-mobile-nav-item active" data-idx="0">⚡</div><div class="dn-mobile-nav-item" data-idx="1">★</div><div class="dn-mobile-nav-item" data-idx="2">✦</div><div class="dn-mobile-nav-item" data-idx="3">👤</div>`;
      const pill = nav.querySelector('.dn-mobile-nav-pill');
      nav.querySelectorAll('.dn-mobile-nav-item').forEach((item, idx) => {
        item.addEventListener('click', () => {
          pill.style.left = `${12 + idx * 44}px`;
          nav.querySelectorAll('.dn-mobile-nav-item').forEach(i => i.classList.remove('active'));
          item.classList.add('active');
        });
      });
      stage.appendChild(nav);
      restartFn = () => {
        const next = (parseInt(pill.style.left || '12', 10) === 12) ? 1 : 0;
        const target = nav.querySelectorAll('.dn-mobile-nav-item')[next];
        if (target) target.click();
      };
    }

  // =========================================================================
  // 6. PAGE & ROUTE TRANSITIONS
  // =========================================================================
  } else if (category === 'transitions') {
    if (id.includes('shared-axis')) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #2A2E38; background:#101319; cursor:pointer;';
      wrap.innerHTML = `
        <div class="sa-pane pane-a" style="position:absolute; inset:0; padding:10px; display:flex; flex-direction:column; justify-content:space-between; background:#121620; transition:transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:9px; font-weight:800; color:var(--text-muted); font-family:var(--font-mono);">STEP 01</span>
            <span style="font-size:12px;">🛡️</span>
          </div>
          <div>
            <div style="font-size:11px; font-weight:800; color:#FFF;">Account Key</div>
            <div style="font-size:8px; color:var(--text-muted); margin-top:2px;">Material Shared Axis X</div>
          </div>
          <button style="padding:4px 8px; border-radius:6px; background:${accent}; color:#08090B; border:none; font-weight:800; font-size:9px; cursor:pointer; align-self:flex-end;">Next ➔</button>
        </div>
        <div class="sa-pane pane-b" style="position:absolute; inset:0; padding:10px; display:flex; flex-direction:column; justify-content:space-between; background:#161B28; border:1px solid ${accent}66; transform:translateX(60px) scale(0.92); opacity:0; transition:transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:9px; font-weight:800; color:${accent}; font-family:var(--font-mono);">STEP 02</span>
            <span style="font-size:12px;">🔑</span>
          </div>
          <div>
            <div style="font-size:11px; font-weight:800; color:#FFF;">Biometric Ready</div>
            <div style="font-size:8px; color:${accent}; margin-top:2px;">120 FPS Validated</div>
          </div>
          <button style="padding:4px 8px; border-radius:6px; background:#252D3D; color:#FFF; border:none; font-weight:700; font-size:9px; cursor:pointer; align-self:flex-start;">⬅ Back</button>
        </div>
      `;
      let isB = false;
      const toggle = () => {
        isB = !isB;
        const pA = wrap.querySelector('.pane-a');
        const pB = wrap.querySelector('.pane-b');
        if (isB) {
          pA.style.transform = 'translateX(-60px) scale(0.92)';
          pA.style.opacity = '0';
          pB.style.transform = 'translateX(0) scale(1)';
          pB.style.opacity = '1';
        } else {
          pA.style.transform = 'translateX(0) scale(1)';
          pA.style.opacity = '1';
          pB.style.transform = 'translateX(60px) scale(0.92)';
          pB.style.opacity = '0';
        }
      };
      wrap.addEventListener('click', toggle);
      stage.appendChild(wrap);
      restartFn = toggle;
    } else if (id.includes('hero-image') || id.includes('hero')) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#10131A; cursor:pointer; display:flex; align-items:center; justify-content:center;';
      wrap.innerHTML = `
        <div class="hero-target" style="width:85px; height:55px; border-radius:8px; background:linear-gradient(135deg, #FF6B6B, #4ECDC4, ${accent}); position:relative; overflow:hidden; transition:all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow:0 8px 18px rgba(0,0,0,0.5); display:flex; flex-direction:column; justify-content:flex-end; padding:6px; box-sizing:border-box;">
          <div class="hero-chip" style="font-size:7px; font-weight:800; background:rgba(0,0,0,0.6); color:#FFF; padding:2px 4px; border-radius:3px; align-self:flex-start;">HERO #01</div>
          <div class="hero-sub" style="font-size:8px; font-weight:800; color:#FFF; margin-top:2px;">Tap Expand</div>
          <div class="hero-close" style="position:absolute; top:6px; right:6px; width:18px; height:18px; border-radius:50%; background:rgba(0,0,0,0.7); color:#FFF; display:flex; align-items:center; justify-content:center; font-size:9px; opacity:0; transition:opacity 0.2s;">✕</div>
        </div>
      `;
      let expanded = false;
      const target = wrap.querySelector('.hero-target');
      const close = wrap.querySelector('.hero-close');
      const sub = wrap.querySelector('.hero-sub');
      const toggleHero = () => {
        expanded = !expanded;
        if (expanded) {
          target.style.width = '100%';
          target.style.height = '100%';
          target.style.borderRadius = '0px';
          close.style.opacity = '1';
          sub.textContent = 'Fullscreen Hero Morph · 120 FPS';
        } else {
          target.style.width = '85px';
          target.style.height = '55px';
          target.style.borderRadius = '8px';
          close.style.opacity = '0';
          sub.textContent = 'Tap Expand';
        }
      };
      wrap.addEventListener('click', toggleHero);
      stage.appendChild(wrap);
      restartFn = toggleHero;
    } else if (id.includes('cube') || id.includes('3d')) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'perspective:700px; width:160px; height:100px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
      wrap.innerHTML = `
        <div class="cube-box" style="position:relative; width:140px; height:85px; transform-style:preserve-3d; transition:transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);">
          <div class="c-face f1" style="position:absolute; inset:0; background:#141822; border:1px solid ${accent}; border-radius:10px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; transform:translateZ(42px); backface-visibility:hidden;">
            <span style="font-size:18px;">🎲</span>
            <span style="font-size:10px; font-weight:800; color:#FFF;">Face A: Dashboard</span>
            <span style="font-size:8px; color:${accent};">Tap to 3D Flip ➔</span>
          </div>
          <div class="c-face f2" style="position:absolute; inset:0; background:#181F2C; border:1px solid #42E8F5; border-radius:10px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; transform:rotateY(90deg) translateZ(42px); backface-visibility:hidden;">
            <span style="font-size:18px;">📊</span>
            <span style="font-size:10px; font-weight:800; color:#FFF;">Face B: Analytics</span>
            <span style="font-size:8px; color:#42E8F5;">⬅ 3D Cube Yaw</span>
          </div>
        </div>
      `;
      let flipped = false;
      const cube = wrap.querySelector('.cube-box');
      const toggleCube = () => {
        flipped = !flipped;
        cube.style.transform = flipped ? 'rotateY(-90deg)' : 'rotateY(0deg)';
      };
      wrap.addEventListener('click', toggleCube);
      stage.appendChild(wrap);
      restartFn = toggleCube;
    } else if (id.includes('diagonal-wipe') || id.includes('wipe')) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3C; background:#12151D; cursor:pointer;';
      wrap.innerHTML = `
        <div class="wipe-base" style="position:absolute; inset:0; background:#121620; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px;">
          <span style="font-size:18px;">📐</span>
          <span style="font-size:11px; font-weight:800; color:#FFF;">Screen A (Obsidian)</span>
          <span style="font-size:8px; color:var(--text-muted);">Tap for Diagonal Wipe</span>
        </div>
        <div class="wipe-layer" style="position:absolute; inset:0; background:linear-gradient(135deg, #182030, #131E28); border:1px solid ${accent}; clip-path:polygon(0 0, 0 0, 0 100%, 0 100%); transition:clip-path 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px;">
          <span style="font-size:18px;">⚡</span>
          <span style="font-size:11px; font-weight:800; color:${accent};">Screen B Revealed!</span>
          <span style="font-size:8px; color:#FFF;">Angled Polygon Mask</span>
        </div>
      `;
      let wiped = false;
      const layer = wrap.querySelector('.wipe-layer');
      const toggleWipe = () => {
        wiped = !wiped;
        layer.style.clipPath = wiped ? 'polygon(0 0, 140% 0, 100% 100%, -40% 100%)' : 'polygon(0 0, 0 0, 0 100%, 0 100%)';
      };
      wrap.addEventListener('click', toggleWipe);
      stage.appendChild(wrap);
      restartFn = toggleWipe;
    } else if (id.includes('zoom')) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3C; background:#12151E; cursor:pointer;';
      wrap.innerHTML = `
        <div class="zoom-grid" style="position:absolute; inset:0; padding:10px; display:grid; grid-template-columns:1fr 1fr; gap:6px; transition:transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;">
          <div style="background:#1B202C; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; color:#FFF;">Stats</div>
          <div class="zoom-target-item" style="background:${accent}; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; color:#08090B; box-shadow:0 0 12px ${accent}66;">🔍 Zoom</div>
          <div style="background:#1B202C; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; color:#FFF;">Media</div>
          <div style="background:#1B202C; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; color:#FFF;">Settings</div>
        </div>
        <div class="zoom-detail" style="position:absolute; inset:0; background:#181F2E; border:1.5px solid ${accent}; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; transform:scale(0.3); opacity:0; pointer-events:none; transition:transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease;">
          <span style="font-size:12px; font-weight:800; color:${accent};">DETAIL VIEW</span>
          <span style="font-size:9px; color:#FFF;">High-Velocity Camera Zoom</span>
          <button style="padding:4px 8px; border-radius:4px; background:${accent}; border:none; color:#08090B; font-weight:800; font-size:9px; cursor:pointer; margin-top:2px;">⬅ Return</button>
        </div>
      `;
      let zoomed = false;
      const grid = wrap.querySelector('.zoom-grid');
      const detail = wrap.querySelector('.zoom-detail');
      const toggleZoom = () => {
        zoomed = !zoomed;
        if (zoomed) {
          grid.style.transform = 'scale(2.5)';
          grid.style.opacity = '0';
          detail.style.transform = 'scale(1)';
          detail.style.opacity = '1';
          detail.style.pointerEvents = 'auto';
        } else {
          grid.style.transform = 'scale(1)';
          grid.style.opacity = '1';
          detail.style.transform = 'scale(0.3)';
          detail.style.opacity = '0';
          detail.style.pointerEvents = 'none';
        }
      };
      wrap.addEventListener('click', toggleZoom);
      stage.appendChild(wrap);
      restartFn = toggleZoom;
    } else if (id.includes('slide-fade') || id.includes('slide-and-fade')) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3C; background:#0B0D12; cursor:pointer;';
      wrap.innerHTML = `
        <div class="sf-master" style="position:absolute; inset:0; padding:10px; background:#131720; display:flex; flex-direction:column; gap:6px; transition:transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.4s ease;">
          <div style="font-size:11px; font-weight:800; color:#FFF;">Settings</div>
          <div style="padding:4px 6px; border-radius:4px; background:#1C2230; font-size:9px; color:#FFF; display:flex; justify-content:space-between;"><span>Account</span><span>›</span></div>
          <div class="sf-trigger" style="padding:4px 6px; border-radius:4px; background:${accent}22; border:1px solid ${accent}66; font-size:9px; color:${accent}; font-weight:700; display:flex; justify-content:space-between;"><span>Motion 120 FPS</span><span>›</span></div>
        </div>
        <div class="sf-detail" style="position:absolute; inset:0; padding:10px; background:#171C28; border-left:1px solid ${accent}; display:flex; flex-direction:column; gap:6px; transform:translateX(100%); transition:transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); box-shadow:-8px 0 20px rgba(0,0,0,0.5);">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:10px; color:${accent}; font-weight:800;">‹ Settings</span>
          </div>
          <div style="font-size:10px; font-weight:800; color:#FFF; margin-top:2px;">Motion 120 FPS</div>
          <div style="font-size:8px; color:var(--text-muted);">Cupertino Parabolic Slide</div>
        </div>
      `;
      let pushed = false;
      const master = wrap.querySelector('.sf-master');
      const detail = wrap.querySelector('.sf-detail');
      const toggleRoute = () => {
        pushed = !pushed;
        if (pushed) {
          master.style.transform = 'translateX(-28%)';
          master.style.filter = 'brightness(0.5)';
          detail.style.transform = 'translateX(0)';
        } else {
          master.style.transform = 'translateX(0)';
          master.style.filter = 'brightness(1)';
          detail.style.transform = 'translateX(100%)';
        }
      };
      wrap.addEventListener('click', toggleRoute);
      stage.appendChild(wrap);
      restartFn = toggleRoute;
    } else if (id.includes('container') || id.includes('morphing-container')) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3C; background:#10131A; cursor:pointer; display:flex; align-items:center; justify-content:center;';
      wrap.innerHTML = `
        <div class="morph-box" style="width:130px; height:34px; border-radius:99px; background:${accent}; color:#08090B; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; transition:all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow:0 0 15px ${accent}66; position:relative; overflow:hidden; box-sizing:border-box;">
          <span class="morph-lbl">+ Open Container</span>
          <div class="morph-full" style="position:absolute; inset:0; padding:8px; background:#151A24; color:#FFF; border:1px solid ${accent}; display:flex; flex-direction:column; justify-content:space-between; opacity:0; pointer-events:none; transition:opacity 0.25s ease;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:10px; font-weight:800; color:${accent};">Container Surface</span>
              <span style="font-size:9px; color:#FFF;">✕</span>
            </div>
            <div style="font-size:8px; color:var(--text-muted);">Morphed from button bounds</div>
            <button style="padding:3px; border-radius:4px; background:${accent}; border:none; color:#08090B; font-weight:800; font-size:9px;">Save</button>
          </div>
        </div>
      `;
      let morphed = false;
      const box = wrap.querySelector('.morph-box');
      const lbl = wrap.querySelector('.morph-lbl');
      const full = wrap.querySelector('.morph-full');
      const toggleMorph = () => {
        morphed = !morphed;
        if (morphed) {
          box.style.width = '100%';
          box.style.height = '100%';
          box.style.borderRadius = '0px';
          lbl.style.opacity = '0';
          full.style.opacity = '1';
          full.style.pointerEvents = 'auto';
        } else {
          box.style.width = '130px';
          box.style.height = '34px';
          box.style.borderRadius = '99px';
          lbl.style.opacity = '1';
          full.style.opacity = '0';
          full.style.pointerEvents = 'none';
        }
      };
      wrap.addEventListener('click', toggleMorph);
      stage.appendChild(wrap);
      restartFn = toggleMorph;
    } else if (id.includes('liquid')) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3C; background:#11151E; cursor:pointer;';
      wrap.innerHTML = `
        <div class="lq-base" style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; color:#FFF;">
          <span style="font-size:20px;">🌊</span>
          <span style="font-size:11px; font-weight:800;">Liquid Page View</span>
          <span style="font-size:8px; color:var(--text-muted);">Tap for Wave Curtain</span>
        </div>
        <div class="lq-curtain" style="position:absolute; inset:0; background:linear-gradient(135deg, ${accent}, #42E8F5); transform:translateY(100%); transition:transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); display:flex; flex-direction:column; align-items:center; justify-content:center; color:#08090B;">
          <span style="font-size:18px;">✨</span>
          <span style="font-size:11px; font-weight:800;">Refreshed State!</span>
          <span style="font-size:8px; font-weight:700;">Organic Sine Curve</span>
        </div>
      `;
      let waveActive = false;
      const curtain = wrap.querySelector('.lq-curtain');
      const triggerWave = () => {
        waveActive = !waveActive;
        curtain.style.transform = waveActive ? 'translateY(0%)' : 'translateY(100%)';
      };
      wrap.addEventListener('click', triggerWave);
      stage.appendChild(wrap);
      restartFn = triggerWave;
    } else {
      // Fade Through route default
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative; width:160px; height:100px; border-radius:12px; overflow:hidden; border:1px solid #2A2E38; cursor:pointer;';
      wrap.innerHTML = `<div class="pane-1" style="position:absolute; inset:0; background:#111318; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#FFF; font-weight:700; font-size:12px; transition:transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);"><span>Screen A</span><span style="font-size:9px; color:var(--text-muted); margin-top:4px;">Tap to Transition</span></div><div class="pane-2" style="position:absolute; inset:0; background:${accent}22; border:1.5px solid ${accent}; display:flex; flex-direction:column; align-items:center; justify-content:center; color:${accent}; font-weight:700; font-size:12px; transform:translateX(100%); transition:transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);"><span>Screen B (Active)</span><span style="font-size:9px; color:#FFF; margin-top:4px;">Tap to Return</span></div>`;
      let isB = false;
      wrap.addEventListener('click', () => {
        isB = !isB;
        const p1 = wrap.querySelector('.pane-1');
        const p2 = wrap.querySelector('.pane-2');
        p1.style.transform = isB ? 'translateX(-100%) scale(0.9)' : 'translateX(0) scale(1)';
        p2.style.transform = isB ? 'translateX(0) scale(1)' : 'translateX(100%) scale(0.9)';
      });
      stage.appendChild(wrap);
      restartFn = () => wrap.click();
    }

  // =========================================================================
  // 7. MODALS, DIALOGS & OVERLAYS
  // =========================================================================
  } else if (category === 'overlays') {
    if (id === 'expandable-bottom-sheet' || (id.includes('sheet') && id.includes('expand'))) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#10131B; border:1px solid #252A38; overflow:hidden; cursor:pointer; display:flex; flex-direction:column; justify-content:flex-end;';
      wrap.innerHTML = `
        <div style="flex:1; padding:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
          <div style="font-size:10px; font-weight:800; color:#FFF;">Parent Screen</div>
          <div style="font-size:8px; color:var(--text-muted); margin-top:2px;">Tap sheet to snap tier</div>
        </div>
        <div class="exp-sheet" style="background:#1B202C; border-top:2px solid ${accent}; border-radius:12px 12px 0 0; padding:8px; height:32px; box-sizing:border-box; transition:height 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); display:flex; flex-direction:column; gap:6px;">
          <div class="sheet-handle" style="width:28px; height:3px; background:#4B5568; border-radius:2px; margin:0 auto; flex-shrink:0;"></div>
          <div class="sheet-peek" style="display:flex; justify-content:space-between; align-items:center; font-size:9px; font-weight:700; color:#FFF;">
            <span>▶ Now Playing</span>
            <span class="snap-badge" style="font-size:8px; color:${accent}; font-family:var(--font-mono);">PEEK</span>
          </div>
          <div class="sheet-full-content" style="opacity:0; transition:opacity 0.2s; font-size:8px; color:var(--text-muted); line-height:1.4;">
            <div style="height:4px; border-radius:2px; background:#293245; overflow:hidden; margin:4px 0;"><div style="width:60%; height:100%; background:${accent};"></div></div>
            <div style="display:flex; justify-content:space-between;"><span>Track 04</span><span>3:42 / 5:10</span></div>
          </div>
        </div>
      `;
      let snapTier = 0; // 0: peek (32px), 1: half (62px), 2: full (98px)
      const sheet = wrap.querySelector('.exp-sheet');
      const badge = wrap.querySelector('.snap-badge');
      const fullContent = wrap.querySelector('.sheet-full-content');
      const cycleSnap = () => {
        snapTier = (snapTier + 1) % 3;
        if (snapTier === 0) {
          sheet.style.height = '32px';
          badge.textContent = 'PEEK';
          fullContent.style.opacity = '0';
        } else if (snapTier === 1) {
          sheet.style.height = '62px';
          badge.textContent = 'HALF';
          fullContent.style.opacity = '1';
        } else {
          sheet.style.height = '98px';
          badge.textContent = 'FULL';
          fullContent.style.opacity = '1';
        }
      };
      wrap.addEventListener('click', cycleSnap);
      stage.appendChild(wrap);
      restartFn = cycleSnap;
    } else if (id.includes('blur-backdrop') || (id.includes('blur') && id.includes('dialog'))) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#12151D; cursor:pointer;';
      wrap.innerHTML = `
        <div class="diag-bg" style="position:absolute; inset:0; padding:10px; display:flex; flex-direction:column; justify-content:space-between;">
          <div style="font-size:10px; font-weight:800; color:#FFF;">Analytics Dashboard</div>
          <div style="display:flex; gap:4px; height:30px; align-items:flex-end;">
            <div style="flex:1; height:40%; background:#2A3245; border-radius:2px;"></div>
            <div style="flex:1; height:80%; background:${accent}; border-radius:2px;"></div>
            <div style="flex:1; height:60%; background:#42E8F5; border-radius:2px;"></div>
            <div style="flex:1; height:100%; background:${accent}; border-radius:2px;"></div>
          </div>
          <div style="font-size:8px; color:var(--text-muted);">Tap to trigger blur modal</div>
        </div>
        <div class="diag-overlay" style="position:absolute; inset:0; background:rgba(8,10,14,0.65); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; opacity:0; pointer-events:none; transition:opacity 0.3s ease;">
          <div class="diag-card" style="width:140px; padding:10px; border-radius:10px; background:#171C26; border:1px solid ${accent}; box-shadow:0 12px 28px rgba(0,0,0,0.7); text-align:center; transform:scale(0.85); transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">
            <div style="font-size:10px; font-weight:800; color:#FFF;">Export Preset?</div>
            <div style="font-size:8px; color:var(--text-muted); margin:4px 0 8px;">Frosted Glass Blur</div>
            <div style="display:flex; gap:6px; justify-content:center;">
              <span class="d-btn-cancel" style="padding:3px 8px; border-radius:4px; background:#222938; font-size:8px; color:#FFF; font-weight:700;">Cancel</span>
              <span class="d-btn-confirm" style="padding:3px 8px; border-radius:4px; background:${accent}; font-size:8px; color:#08090B; font-weight:800;">Export</span>
            </div>
          </div>
        </div>
      `;
      let dialogOpen = false;
      const overlay = wrap.querySelector('.diag-overlay');
      const card = wrap.querySelector('.diag-card');
      const toggleDialog = () => {
        dialogOpen = !dialogOpen;
        overlay.style.opacity = dialogOpen ? '1' : '0';
        overlay.style.pointerEvents = dialogOpen ? 'auto' : 'none';
        card.style.transform = dialogOpen ? 'scale(1)' : 'scale(0.85)';
      };
      wrap.addEventListener('click', toggleDialog);
      stage.appendChild(wrap);
      restartFn = toggleDialog;
    } else if (id.includes('fullscreen-modal') || (id.includes('fullscreen') && id.includes('reveal'))) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#12151D; cursor:pointer; display:flex; align-items:center; justify-content:center;';
      wrap.innerHTML = `
        <button class="fs-trigger" style="padding:8px 14px; border-radius:8px; background:${accent}; border:none; color:#08090B; font-weight:800; font-size:10px; cursor:pointer; box-shadow:0 0 14px ${accent}55;">
          ⚡ Launch Studio
        </button>
        <div class="fs-surface" style="position:absolute; inset:0; background:#131822; border:1.5px solid ${accent}; padding:10px; display:flex; flex-direction:column; justify-content:space-between; clip-path:circle(0% at 50% 50%); transition:clip-path 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); box-sizing:border-box;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:10px; font-weight:800; color:${accent};">FULLSCREEN STUDIO</span>
            <span class="fs-close" style="width:16px; height:16px; border-radius:50%; background:#232B3D; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:9px;">✕</span>
          </div>
          <div style="font-size:9px; color:#FFF; font-weight:700;">120 FPS Realtime Canvas</div>
          <div style="font-size:8px; color:var(--text-muted);">Circular reveal from button center</div>
        </div>
      `;
      let fsOpen = false;
      const surface = wrap.querySelector('.fs-surface');
      const toggleFs = () => {
        fsOpen = !fsOpen;
        surface.style.clipPath = fsOpen ? 'circle(150% at 50% 50%)' : 'circle(0% at 50% 50%)';
      };
      wrap.addEventListener('click', toggleFs);
      stage.appendChild(wrap);
      restartFn = toggleFs;
    } else if (id.includes('snackbar')) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#12151E; cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:8px; box-sizing:border-box;';
      wrap.innerHTML = `
        <button class="sb-trigger" style="padding:6px 12px; border-radius:6px; background:#1D2332; border:1px solid ${accent}; color:${accent}; font-weight:700; font-size:10px; cursor:pointer;">
          🗑️ Delete Record
        </button>
        <div class="sb-banner" style="position:absolute; bottom:8px; left:8px; right:8px; padding:6px 8px; border-radius:8px; background:#191E2A; border:1px solid ${accent}; box-shadow:0 8px 20px rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:space-between; transform:translateY(60px); transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">
          <span class="sb-msg" style="font-size:9px; font-weight:700; color:#FFF;">Deleted!</span>
          <span class="sb-undo" style="font-size:9px; font-weight:800; color:${accent}; cursor:pointer;">UNDO</span>
          <div class="sb-bar" style="position:absolute; bottom:0; left:0; right:0; height:2px; background:${accent};"></div>
        </div>
      `;
      let sbActive = false;
      const banner = wrap.querySelector('.sb-banner');
      const msg = wrap.querySelector('.sb-msg');
      const undo = wrap.querySelector('.sb-undo');
      const toggleSb = () => {
        sbActive = !sbActive;
        banner.style.transform = sbActive ? 'translateY(0)' : 'translateY(60px)';
        if (sbActive) {
          msg.textContent = 'Deleted!';
          undo.textContent = 'UNDO';
        }
      };
      undo.addEventListener('click', (e) => {
        e.stopPropagation();
        msg.textContent = '✓ Restored!';
        undo.textContent = '';
        setTimeout(() => { banner.style.transform = 'translateY(60px)'; sbActive = false; }, 600);
      });
      wrap.addEventListener('click', toggleSb);
      stage.appendChild(wrap);
      restartFn = toggleSb;
    } else if (id.includes('popover')) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#12151E; cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; padding-bottom:12px; box-sizing:border-box;';
      wrap.innerHTML = `
        <div class="pop-bubble" style="position:absolute; bottom:44px; width:130px; padding:6px 8px; border-radius:8px; background:#1A202C; border:1px solid ${accent}; box-shadow:0 10px 24px rgba(0,0,0,0.6); display:flex; flex-direction:column; gap:4px; opacity:0; transform:scale(0.8) translateY(10px); transition:all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
          <div style="font-size:8px; font-weight:700; color:#FFF; display:flex; justify-content:space-between;"><span>📋 Copy</span><span style="color:${accent};">⌘C</span></div>
          <div style="font-size:8px; font-weight:700; color:#FFF; display:flex; justify-content:space-between;"><span>⭐ Star</span><span>★</span></div>
          <div class="pop-arrow" style="position:absolute; bottom:-5px; left:50%; width:8px; height:8px; background:#1A202C; border-right:1px solid ${accent}; border-bottom:1px solid ${accent}; transform:translateX(-50%) rotate(45deg);"></div>
        </div>
        <button class="pop-trigger" style="padding:5px 12px; border-radius:6px; background:#1A202C; border:1px solid #333D50; color:#FFF; font-weight:800; font-size:10px; cursor:pointer;">
          ⋯ Options
        </button>
      `;
      let popOpen = false;
      const bubble = wrap.querySelector('.pop-bubble');
      const togglePop = () => {
        popOpen = !popOpen;
        if (popOpen) {
          bubble.style.opacity = '1';
          bubble.style.transform = 'scale(1) translateY(0)';
        } else {
          bubble.style.opacity = '0';
          bubble.style.transform = 'scale(0.8) translateY(10px)';
        }
      };
      wrap.addEventListener('click', togglePop);
      stage.appendChild(wrap);
      restartFn = togglePop;
    } else if (id.includes('notification-stack') || (id.includes('notification') && id.includes('stack'))) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#12151E; cursor:pointer; display:flex; align-items:center; justify-content:center;';
      wrap.innerHTML = `
        <div class="stack-card sc-3" style="position:absolute; width:130px; padding:6px 8px; border-radius:8px; background:#141720; border:1px solid #282E3C; opacity:0.6; transform:translateY(-14px) scale(0.88); transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">
          <div style="font-size:8px; color:var(--text-muted);">Card 03</div>
          <div style="font-size:9px; font-weight:700; color:#FFF;">Flutter 3.24 Ready</div>
        </div>
        <div class="stack-card sc-2" style="position:absolute; width:130px; padding:6px 8px; border-radius:8px; background:#181E2A; border:1px solid #353D50; opacity:0.85; transform:translateY(-7px) scale(0.94); transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">
          <div style="font-size:8px; color:#42E8F5;">Card 02</div>
          <div style="font-size:9px; font-weight:700; color:#FFF;">Starred Radial Menu</div>
        </div>
        <div class="stack-card sc-1" style="position:absolute; width:130px; padding:6px 8px; border-radius:8px; background:#1C2333; border:1.5px solid ${accent}; box-shadow:0 8px 20px rgba(0,0,0,0.6); transform:translateY(0) scale(1); transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">
          <div style="font-size:8px; color:${accent}; font-weight:800;">TOP NOTIFICATION</div>
          <div style="font-size:9px; font-weight:700; color:#FFF;">120 FPS Build Passed</div>
        </div>
        <div class="stack-reset" style="position:absolute; font-size:9px; color:${accent}; font-weight:800; opacity:0; pointer-events:none;">↺ Reset Stack</div>
      `;
      let step = 0;
      const c1 = wrap.querySelector('.sc-1');
      const c2 = wrap.querySelector('.sc-2');
      const c3 = wrap.querySelector('.sc-3');
      const reset = wrap.querySelector('.stack-reset');
      const swipeTop = () => {
        step = (step + 1) % 4;
        if (step === 1) {
          c1.style.transform = 'translateX(140px) rotate(15deg) scale(0.9)';
          c1.style.opacity = '0';
          c2.style.transform = 'translateY(0) scale(1)';
          c2.style.opacity = '1';
          c2.style.borderColor = accent;
          c3.style.transform = 'translateY(-7px) scale(0.94)';
          c3.style.opacity = '0.85';
        } else if (step === 2) {
          c2.style.transform = 'translateX(140px) rotate(15deg) scale(0.9)';
          c2.style.opacity = '0';
          c3.style.transform = 'translateY(0) scale(1)';
          c3.style.opacity = '1';
          c3.style.borderColor = accent;
        } else if (step === 3) {
          c3.style.transform = 'translateX(140px) rotate(15deg) scale(0.9)';
          c3.style.opacity = '0';
          reset.style.opacity = '1';
        } else {
          // Reset
          reset.style.opacity = '0';
          c1.style.transform = 'translateY(0) scale(1)';
          c1.style.opacity = '1';
          c2.style.transform = 'translateY(-7px) scale(0.94)';
          c2.style.opacity = '0.85';
          c2.style.borderColor = '#353D50';
          c3.style.transform = 'translateY(-14px) scale(0.88)';
          c3.style.opacity = '0.6';
          c3.style.borderColor = '#282E3C';
        }
      };
      wrap.addEventListener('click', swipeTop);
      stage.appendChild(wrap);
      restartFn = swipeTop;
    } else if (id.includes('sheet')) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#12151D; border:1px solid #252A38; overflow:hidden; cursor:pointer; display:flex; flex-direction:column; justify-content:flex-end;';
      wrap.innerHTML = `<div style="flex:1; display:flex; align-items:center; justify-content:center; font-size:11px; color:var(--text-muted);">Main Content</div><div class="sheet-el" style="background:#1B202C; border-top:2px solid ${accent}; border-radius:12px 12px 0 0; padding:10px; transition:transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);"><div style="width:28px; height:3px; background:#444C60; border-radius:2px; margin:0 auto 6px;"></div><div style="font-size:11px; font-weight:700; color:#FFF; text-align:center;">Bottom Sheet</div></div>`;
      let open = true;
      const sheet = wrap.querySelector('.sheet-el');
      wrap.addEventListener('click', () => {
        open = !open;
        sheet.style.transform = open ? 'none' : 'translateY(65%)';
      });
      stage.appendChild(wrap);
      restartFn = () => wrap.click();
    } else if (id.includes('toast')) {
      const toast = document.createElement('div');
      toast.style.cssText = `width:170px; padding:10px 12px; border-radius:10px; background:#181C26; border:1px solid ${accent}66; box-shadow:0 8px 24px rgba(0,0,0,0.6); display:flex; align-items:center; gap:8px; cursor:pointer; transition:transform 0.2s;`;
      toast.innerHTML = `<div style="width:20px; height:20px; border-radius:50%; background:${accent}; color:#08090B; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:11px;">✓</div><div style="flex:1;"><div style="font-size:11px; font-weight:700; color:#FFF;">Action Saved</div><div style="font-size:9px; color:var(--text-muted);">Just now</div></div>`;
      toast.addEventListener('click', () => {
        toast.style.transform = 'scale(0.92)';
        setTimeout(() => toast.style.transform = 'scale(1)', 140);
      });
      stage.appendChild(toast);
      restartFn = () => { toast.style.transform = 'scale(1.08)'; setTimeout(() => toast.style.transform = 'none', 180); };
    } else {
      const modal = document.createElement('div');
      modal.style.cssText = `width:170px; padding:12px; border-radius:12px; background:#181C26; border:1px solid ${accent}66; box-shadow:0 16px 32px rgba(0,0,0,0.6); display:flex; flex-direction:column; gap:8px; animation:dnFloatLevitate 4s ease-in-out infinite; cursor:pointer;`;
      modal.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center;"><span style="font-size:11px; font-weight:700; color:#FFF;">${name}</span><span style="font-size:9px; color:${accent};">✕</span></div><div style="font-size:9px; color:var(--text-muted); line-height:1.4;">Spring physics overlay modal.</div><button style="padding:5px; border-radius:6px; background:${accent}; border:none; color:#08090B; font-weight:700; font-size:10px; cursor:pointer;">Confirm</button>`;
      stage.appendChild(modal);
      restartFn = () => { modal.style.transform = 'scale(1.08)'; setTimeout(() => modal.style.transform = 'none', 200); };
    }

  // =========================================================================
  // 8. GESTURES & PHYSICS
  // =========================================================================
  } else if (category === 'gestures') {
    const card = document.createElement('div');
    card.style.cssText = `width:160px; padding:14px 18px; border-radius:12px; background:#181C26; border:1.5px solid ${accent}; color:#FFF; font-size:12px; font-weight:700; display:flex; align-items:center; justify-content:space-between; cursor:grab; transition:transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow:0 10px 20px rgba(0,0,0,0.4);`;
    card.innerHTML = `<span>↔ Drag / Swipe</span><span style="color:${accent};">⚡</span>`;
    card.addEventListener('mousedown', () => {
      card.style.cursor = 'grabbing';
      card.style.transform = 'translateX(35px) rotate(5deg) scale(1.05)';
      setTimeout(() => { card.style.transform = 'none'; card.style.cursor = 'grab'; }, 320);
    });
    stage.appendChild(card);
    restartFn = () => {
      card.style.transform = 'translateX(-30px) rotate(-4deg)';
      setTimeout(() => card.style.transform = 'none', 280);
    };

  // =========================================================================
  // 9. BACKGROUNDS & AMBIENCE
  // =========================================================================
  } else if (category === 'backgrounds') {
    const el = document.createElement('div');
    el.className = 'dn-aurora-bg-widget';
    el.style.cssText = 'position:relative; width:100%; height:100%; display:flex; align-items:center; justify-content:center;';
    el.innerHTML = `<div class="dn-aurora-glow-1" style="position:absolute; width:110px; height:80px; border-radius:50%; background:radial-gradient(circle, ${accent} 0%, transparent 70%); animation:dnAuroraShift 5s ease-in-out infinite alternate;"></div><div class="dn-aurora-glow-2" style="position:absolute; width:90px; height:90px; border-radius:50%; background:radial-gradient(circle, #42E8F5 0%, transparent 70%); animation:dnAuroraShift 4s ease-in-out infinite alternate-reverse;"></div><span style="position:relative; z-index:1; font-family:var(--font-mono); font-size:12px; color:#FFF; font-weight:800; letter-spacing:0.1em; text-shadow:0 0 10px rgba(0,0,0,0.8);">${name.toUpperCase()}</span>`;
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.1)'; setTimeout(() => el.style.transform = 'none', 200); };

  // =========================================================================
  // 10. 3D & PERSPECTIVE
  // =========================================================================
  } else if (category === 'three-d') {
    const stageBox = document.createElement('div');
    stageBox.className = 'dn-cube-stage';
    stageBox.style.cssText = 'perspective:600px; width:70px; height:70px;';
    stageBox.innerHTML = `<div class="dn-3d-cube" style="width:100%; height:100%; position:relative; transform-style:preserve-3d; animation:dnCubeRotate 6s linear infinite;"><div class="dn-cube-face front" style="position:absolute; width:60px; height:60px; background:rgba(17,19,24,0.8); border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; transform:rotateY(0deg) translateZ(30px);">⚡</div><div class="dn-cube-face back" style="position:absolute; width:60px; height:60px; background:rgba(17,19,24,0.8); border:1.5px solid #42E8F5; display:flex; align-items:center; justify-content:center; color:#42E8F5; transform:rotateY(180deg) translateZ(30px);">✦</div><div class="dn-cube-face right" style="position:absolute; width:60px; height:60px; background:rgba(17,19,24,0.8); border:1.5px solid #9B7CFF; display:flex; align-items:center; justify-content:center; color:#9B7CFF; transform:rotateY(90deg) translateZ(30px);">★</div><div class="dn-cube-face left" style="position:absolute; width:60px; height:60px; background:rgba(17,19,24,0.8); border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; transform:rotateY(-90deg) translateZ(30px);">▲</div><div class="dn-cube-face top" style="position:absolute; width:60px; height:60px; background:rgba(17,19,24,0.8); border:1.5px solid #42E8F5; display:flex; align-items:center; justify-content:center; color:#42E8F5; transform:rotateX(90deg) translateZ(30px);">●</div><div class="dn-cube-face bottom" style="position:absolute; width:60px; height:60px; background:rgba(17,19,24,0.8); border:1.5px solid #9B7CFF; display:flex; align-items:center; justify-content:center; color:#9B7CFF; transform:rotateX(-90deg) translateZ(30px);">■</div></div>`;
    stage.appendChild(stageBox);
    restartFn = () => { stageBox.style.transform = 'scale(1.2)'; setTimeout(() => stageBox.style.transform = 'none', 200); };

  // =========================================================================
  // 11. IMAGES & MEDIA
  // =========================================================================
  } else if (category === 'media') {
    const box = document.createElement('div');
    box.style.cssText = 'position:relative; width:160px; height:100px; border-radius:10px; overflow:hidden; border:1px solid #2A2E38; cursor:pointer;';
    box.innerHTML = `<div style="position:absolute; inset:0; background:linear-gradient(135deg, #1f1035, #2b3a67); display:flex; align-items:center; justify-content:center; animation:dnFloatLevitate 4s infinite;"><span style="font-size:32px;">🖼️</span></div><div style="position:absolute; bottom:6px; left:8px; right:8px; display:flex; justify-content:space-between; font-size:10px; font-weight:700; color:#FFF; background:rgba(0,0,0,0.6); padding:4px 8px; border-radius:6px; backdrop-filter:blur(4px);"><span>${name}</span><span style="color:${accent};">60 FPS</span></div>`;
    stage.appendChild(box);
    restartFn = () => { box.style.transform = 'scale(1.06)'; setTimeout(() => box.style.transform = 'none', 180); };

  // =========================================================================
  // 12. CHARTS & DATA VIZ
  // =========================================================================
  } else if (category === 'charts') {
    if (id.includes('bar')) {
      const el = document.createElement('div');
      el.className = 'dn-barchart-widget';
      el.style.cssText = 'display:flex; align-items:flex-end; gap:8px; height:60px; padding-bottom:4px;';
      el.innerHTML = `<div class="dn-barchart-col" style="width:12px; height:40%; background:#282E3C; border-radius:3px 3px 0 0;"></div><div class="dn-barchart-col" style="width:12px; height:85%; background:${accent}; border-radius:3px 3px 0 0; animation:dnBarGrow 1s cubic-bezier(0.34, 1.56, 0.64, 1);"></div><div class="dn-barchart-col" style="width:12px; height:60%; background:#42E8F5; border-radius:3px 3px 0 0;"></div><div class="dn-barchart-col" style="width:12px; height:100%; background:${accent}; border-radius:3px 3px 0 0; animation:dnBarGrow 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);"></div><div class="dn-barchart-col" style="width:12px; height:75%; background:#9B7CFF; border-radius:3px 3px 0 0;"></div>`;
      stage.appendChild(el);
      restartFn = () => { el.style.transform = 'scale(1.1)'; setTimeout(() => el.style.transform = 'none', 200); };
    } else {
      const el = document.createElement('div');
      el.style.cssText = 'position:relative; width:150px; height:65px;';
      el.innerHTML = `<svg viewBox="0 0 140 55" style="width:100%; height:100%; overflow:visible;"><defs><linearGradient id="chartGrad_${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${accent}" stop-opacity="0.45"/><stop offset="100%" stop-color="${accent}" stop-opacity="0.0"/></linearGradient></defs><polygon points="10,50 10,40 35,25 60,35 85,15 110,28 130,10 130,50" fill="url(#chartGrad_${id})"/><path d="M10,40 Q25,20 35,25 T60,35 T85,15 T110,28 T130,10" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/><circle cx="130" cy="10" r="4" fill="${accent}" style="filter:drop-shadow(0 0 6px ${accent});"/></svg>`;
      stage.appendChild(el);
      restartFn = () => { el.style.transform = 'scale(1.08)'; setTimeout(() => el.style.transform = 'none', 180); };
    }

  // =========================================================================
  // 13. FORMS & FEEDBACK
  // =========================================================================
  } else if (category === 'forms') {
    if (id.includes('checkmark')) {
      const el = document.createElement('div');
      el.className = 'dn-checkmark-widget';
      el.innerHTML = `<svg viewBox="0 0 48 48"><circle class="dn-checkmark-circle" cx="24" cy="24" r="20" style="stroke:${accent}; stroke-width:2.5; fill:none; stroke-dasharray:150; animation:dnCheckDraw 0.8s ease-out;"></circle><path class="dn-checkmark-stem" d="M14 24 L21 31 L34 17" style="stroke:${accent}; stroke-width:3; stroke-linecap:round; fill:none; stroke-dasharray:48; animation:dnCheckDraw 0.6s ease-out 0.2s both;"></path></svg>`;
      stage.appendChild(el);
      restartFn = () => { el.style.transform = 'scale(1.2)'; setTimeout(() => el.style.transform = 'none', 200); };
    } else if (id.includes('toggle')) {
      const toggle = document.createElement('div');
      toggle.className = 'dn-toggle-widget active';
      toggle.style.borderColor = accent;
      toggle.innerHTML = `<div class="dn-toggle-thumb" style="background:${accent};"></div>`;
      toggle.addEventListener('click', () => toggle.classList.toggle('active'));
      stage.appendChild(toggle);
      restartFn = () => toggle.click();
    } else {
      const input = document.createElement('div');
      input.style.cssText = `padding:10px 18px; border:1.5px solid ${accent}; border-radius:8px; background:#111318; color:#FFF; font-size:12px; font-family:var(--font-mono); cursor:pointer; box-shadow:0 0 14px ${accent}44; display:flex; align-items:center; gap:8px;`;
      input.innerHTML = `<span style="color:${accent};">⚡</span><span>${name}_</span>`;
      input.addEventListener('click', () => {
        input.style.transform = 'translateX(-6px)';
        setTimeout(() => input.style.transform = 'translateX(6px)', 60);
        setTimeout(() => input.style.transform = 'translateX(-4px)', 120);
        setTimeout(() => input.style.transform = 'none', 180);
      });
      stage.appendChild(input);
      restartFn = () => input.click();
    }

  // =========================================================================
  // 14. LISTS & COLLECTIONS
  // =========================================================================
  } else if (category === 'lists') {
    const list = document.createElement('div');
    list.style.cssText = 'display:flex; flex-direction:column; gap:6px; width:160px;';
    for (let i = 0; i < 3; i++) {
      const item = document.createElement('div');
      item.style.cssText = `padding:6px 10px; background:#181c25; border:1px solid #282E3C; border-radius:8px; display:flex; justify-content:space-between; align-items:center; color:#FFF; font-size:11px; cursor:pointer; transition:transform 0.2s, border-color 0.2s;`;
      item.innerHTML = `<span>Item 0${i + 1}</span><span style="color:${accent};">›</span>`;
      item.addEventListener('mouseenter', () => { item.style.transform = 'translateX(6px)'; item.style.borderColor = accent; });
      item.addEventListener('mouseleave', () => { item.style.transform = 'none'; item.style.borderColor = '#282E3C'; });
      list.appendChild(item);
    }
    stage.appendChild(list);
    restartFn = () => {
      list.querySelectorAll('div').forEach((d, i) => {
        d.style.transform = 'translateX(8px)';
        setTimeout(() => d.style.transform = 'none', 200 + i * 80);
      });
    };

  // =========================================================================
  // 15. ICONS & MICRO-INTERACTIONS
  // =========================================================================
  } else if (category === 'micro-interactions') {
    if (id.includes('bell')) {
      const bell = document.createElement('div');
      bell.className = 'dn-bell-ring-widget';
      bell.style.fontSize = '32px';
      bell.innerHTML = `🔔<div class="dn-bell-badge" style="background:${accent};"></div>`;
      stage.appendChild(bell);
      restartFn = () => { bell.style.transform = 'scale(1.25)'; setTimeout(() => bell.style.transform = 'none', 200); };
    } else {
      const heart = document.createElement('div');
      heart.className = 'dn-heart-pop-widget';
      heart.textContent = '❤️';
      heart.style.fontSize = '34px';
      heart.addEventListener('click', () => {
        heart.classList.remove('active');
        void heart.offsetWidth;
        heart.classList.add('active');
      });
      stage.appendChild(heart);
      restartFn = () => heart.click();
    }

  // =========================================================================
  // 16. ADVANCED MOTION EXPERIMENTS
  // =========================================================================
  } else {
    if (id.includes('confetti')) {
      const el = document.createElement('div');
      el.style.cssText = 'display:flex; flex-direction:column; align-items:center; cursor:pointer;';
      el.innerHTML = `<span style="font-size:34px;">🎉</span><span style="font-size:10px; font-family:var(--font-mono); color:${accent}; margin-top:4px; font-weight:700;">Tap For Confetti</span>`;
      el.addEventListener('click', () => {
        for (let i = 0; i < 18; i++) {
          const c = document.createElement('div');
          const colors = [accent, '#42E8F5', '#9B7CFF', '#FF3C6E', '#FFB800'];
          c.style.cssText = `position:absolute; width:${4 + Math.random() * 5}px; height:${8 + Math.random() * 6}px; background:${colors[Math.floor(Math.random() * colors.length)]}; left:${15 + Math.random() * 70}%; top:20%; animation:dnConfettiFall 0.8s ease-out forwards; pointer-events:none;`;
          stage.appendChild(c);
          setTimeout(() => c.remove(), 850);
        }
      });
      stage.appendChild(el);
      restartFn = () => el.click();
    } else {
      // High-performance equalizer wave visualizer (CSS/DOM safe, zero canvas crash)
      const el = document.createElement('div');
      el.style.cssText = 'display:flex; align-items:center; gap:4px; height:50px; cursor:pointer;';
      for (let i = 0; i < 12; i++) {
        const bar = document.createElement('div');
        bar.style.cssText = `width:4px; border-radius:2px; background:${i % 2 === 0 ? accent : '#42E8F5'}; animation:dnEqBounce ${0.7 + (i % 5) * 0.2}s ease-in-out infinite alternate; animation-delay:${i * 0.08}s;`;
        el.appendChild(bar);
      }
      el.addEventListener('click', () => {
        el.style.transform = 'scale(1.15)';
        setTimeout(() => el.style.transform = 'none', 200);
      });
      stage.appendChild(el);
      restartFn = () => el.click();
    }
  }

  return {
    element: stage,
    restart: restartFn,
    destroy: destroyFn
  };
}

export function createRoadmapComponent({
  id,
  name,
  category,
  description,
  tags = [],
  difficulty = 'intermediate',
  icon = '⚡',
  widgetName,
  badge = 'Live Demo',
  notes = 'Designed using core Flutter AnimationController and CustomPainter.'
}) {
  const wName = widgetName || name.replace(/[^a-zA-Z0-9]/g, '');

  return {
    id,
    name,
    category,
    badge,
    status: 'complete',
    difficulty,
    dependencies: [],
    tags: [category, ...tags],
    description,
    defaultProps: {
      duration: 350,
      accentColor: '#C5FF35'
    },
    controls: [
      { type: 'slider', label: 'Duration (ms)', prop: 'duration', min: 100, max: 1000, step: 50, unit: 'ms' },
      { type: 'color', label: 'Accent Color', prop: 'accentColor' }
    ],
    render: (container, props) => {
      container.innerHTML = '';
      const visualizer = createMotionVisualizer(id, category, name, icon, props || {});
      container.appendChild(visualizer.element);

      return {
        restart: visualizer.restart,
        destroy: visualizer.destroy
      };
    },
    flutterSnippet: `${wName}(
  duration: const Duration(milliseconds: 350),
  accentColor: const Color(0xFFC5FF35),
  onAction: () {
    debugPrint('${name} triggered');
  },
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

/// DartNova: ${name}
/// Category: ${category}
/// ${description}
class ${wName} extends StatefulWidget {
  final Duration duration;
  final Color accentColor;
  final VoidCallback? onAction;

  const ${wName}({
    super.key,
    this.duration = const Duration(milliseconds: 350),
    this.accentColor = const Color(0xFFC5FF35),
    this.onAction,
  });

  @override
  State<${wName}> createState() => _${wName}State();
}

class _${wName}State extends State<${wName}> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: widget.duration,
    );
    _animation = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeOutCubic,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _trigger() {
    if (_controller.isCompleted) {
      _controller.reverse();
    } else {
      _controller.forward();
    }
    widget.onAction?.call();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _trigger,
      child: AnimatedBuilder(
        animation: _animation,
        builder: (context, child) {
          return Container(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
            decoration: BoxDecoration(
              color: const Color(0xFF111318),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: widget.accentColor.withValues(alpha: 0.3 + 0.7 * _animation.value),
              ),
              boxShadow: [
                BoxShadow(
                  color: widget.accentColor.withValues(alpha: 0.25 * _animation.value),
                  blurRadius: 16 * _animation.value,
                ),
              ],
            ),
            child: Text(
              '${name}',
              style: const TextStyle(
                color: Color(0xFFF5F7FA),
                fontWeight: FontWeight.w600,
                fontSize: 14,
              ),
            ),
          );
        },
      ),
    );
  }
}
`,
    params: [
      { name: 'duration', type: 'Duration', defaultVal: 'const Duration(milliseconds: 350)', description: 'Animation transition duration' },
      { name: 'accentColor', type: 'Color', defaultVal: 'const Color(0xFFC5FF35)', description: 'Primary interactive accent color' }
    ],
    notes
  };
}
