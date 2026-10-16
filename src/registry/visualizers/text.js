/**
 * DartNova Text & Typography Visualizers (26 Bespoke Modern UI Components)
 */

export function renderTextVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('glitch') || id === 'glitch-text') {
    const el = document.createElement('div');
    el.className = 'dn-glitch-text-widget';
    el.style.cssText = `font-family:var(--font-display); font-size:24px; font-weight:800; letter-spacing:0.1em; color:#FFF; animation:dnGlitchJitter 2.5s infinite; cursor:pointer;`;
    el.textContent = 'DARTNOVA';
    stage.appendChild(el);
    restartFn = () => { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = 'dnGlitchJitter 2.5s infinite'; };

  } else if (id.includes('gradient-flow') || id === 'gradient-flow-text') {
    const el = document.createElement('div');
    el.style.cssText = `font-family:var(--font-display); font-size:24px; font-weight:800; letter-spacing:-0.02em; background:linear-gradient(90deg, ${accent}, #42E8F5, #9B7CFF, ${accent}); background-size:300% 100%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation:dnShimmerSweep 3s linear infinite; cursor:pointer;`;
    el.textContent = 'MOTION FLOW';
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.1)'; setTimeout(() => el.style.transform = 'none', 180); };

  } else if (id.includes('wave') || id === 'text-wave') {
    const el = document.createElement('div');
    el.style.cssText = 'display:flex; gap:3px; font-size:20px; font-weight:800; font-family:var(--font-mono); cursor:pointer;';
    const text = 'SINE WAVE';
    el.innerHTML = text.split('').map((char, i) => `<span style="display:inline-block; animation:dnTextWaveLetter 1.4s ease-in-out infinite; animation-delay:${i * 0.12}s; color:${i % 2 === 0 ? accent : '#FFF'};">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.1)'; setTimeout(() => el.style.transform = 'none', 200); };

  } else if (id.includes('word-reveal') || id === 'word-reveal') {
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

  } else if (id.includes('morphing') || id === 'morphing-text') {
    const el = document.createElement('div');
    el.style.cssText = `font-family:var(--font-mono); font-size:20px; font-weight:800; color:${accent}; cursor:pointer; transition:opacity 0.25s, transform 0.25s;`;
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
      }, 200);
    };
    const t = setInterval(nextWord, 1800);
    destroyFn = () => clearInterval(t);
    el.addEventListener('click', nextWord);
    stage.appendChild(el);
    restartFn = nextWord;

  } else if (id.includes('scramble') || id === 'scramble-text') {
    const el = document.createElement('div');
    el.style.cssText = `font-family:var(--font-mono); font-size:20px; font-weight:800; color:${accent}; cursor:pointer;`;
    const target = 'DECRYPTED';
    const chars = '!@#$%^&*()_+-=<>?';
    let frame = 0;
    let timer = null;
    const scramble = () => {
      frame = 0;
      clearInterval(timer);
      timer = setInterval(() => {
        let out = '';
        for (let i = 0; i < target.length; i++) {
          if (frame / 2 > i) {
            out += target[i];
          } else {
            out += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        el.textContent = out;
        frame++;
        if (frame > target.length * 2 + 4) clearInterval(timer);
      }, 45);
    };
    scramble();
    destroyFn = () => clearInterval(timer);
    el.addEventListener('click', scramble);
    stage.appendChild(el);
    restartFn = scramble;

  } else if (id.includes('neon-flicker') || id === 'neon-flicker-text') {
    const el = document.createElement('div');
    el.style.cssText = `font-family:var(--font-display); font-size:24px; font-weight:900; color:${accent}; text-shadow:0 0 10px ${accent}, 0 0 20px ${accent}, 0 0 40px ${accent}; animation:dnPulseGlow 1.5s infinite alternate; cursor:pointer;`;
    el.textContent = 'NEON SIGN';
    stage.appendChild(el);
    restartFn = () => { el.style.opacity = '0.3'; setTimeout(() => el.style.opacity = '1', 120); };

  } else if (id.includes('3d-text') || id === '3d-text-extrusion') {
    const el = document.createElement('div');
    el.style.cssText = `font-family:var(--font-display); font-size:24px; font-weight:900; color:#FFF; text-shadow:1px 1px 0 #181E2E, 2px 2px 0 #181E2E, 3px 3px 0 ${accent}, 4px 4px 0 ${accent}, 5px 5px 8px rgba(0,0,0,0.8); cursor:pointer; transform:rotateX(20deg) rotateY(-15deg);`;
    el.textContent = '3D EXTRUDE';
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.1) rotateX(10deg)'; setTimeout(() => el.style.transform = 'rotateX(20deg) rotateY(-15deg)', 200); };

  } else if (id.includes('split-character') || id === 'split-character-stagger') {
    const el = document.createElement('div');
    el.style.cssText = 'display:flex; font-size:22px; font-weight:900; font-family:var(--font-display); cursor:pointer;';
    const text = 'CASCADE';
    el.innerHTML = text.split('').map((c, i) => `<span style="animation:dnFloatLevitate ${1 + i * 0.1}s infinite alternate; color:${i % 2 === 0 ? accent : '#FFF'};">${c}</span>`).join('');
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.15)'; setTimeout(() => el.style.transform = 'none', 180); };

  } else if (id.includes('blur-focus') || id === 'blur-focus-text') {
    const el = document.createElement('div');
    el.style.cssText = `font-family:var(--font-display); font-size:22px; font-weight:900; color:#FFF; transition:filter 0.5s ease; cursor:pointer; filter:blur(0px);`;
    el.textContent = 'LENS FOCUS';
    el.addEventListener('click', () => {
      el.style.filter = 'blur(10px)';
      setTimeout(() => el.style.filter = 'blur(0px)', 300);
    });
    stage.appendChild(el);
    restartFn = () => el.click();

  } else if (id.includes('kinetic-counter') || id === 'kinetic-counter-text') {
    const el = document.createElement('div');
    el.style.cssText = `font-family:var(--font-mono); font-size:26px; font-weight:900; color:${accent}; cursor:pointer;`;
    let count = 120;
    el.textContent = `${count} FPS`;
    el.addEventListener('click', () => {
      count = count === 120 ? 240 : 120;
      el.textContent = `${count} FPS`;
      el.style.transform = 'scale(1.2)';
      setTimeout(() => el.style.transform = 'none', 180);
    });
    stage.appendChild(el);
    restartFn = () => el.click();

  } else if (id.includes('mask-clip') || id === 'mask-clip-text') {
    const el = document.createElement('div');
    el.style.cssText = `font-family:var(--font-display); font-size:26px; font-weight:900; background:radial-gradient(circle, ${accent}, #42E8F5, #9B7CFF); background-size:200% 200%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation:dnShimmerSweep 4s infinite alternate; cursor:pointer;`;
    el.textContent = 'MASK VIDEO';
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.1)'; setTimeout(() => el.style.transform = 'none', 180); };

  } else if (id.includes('vaporwave') || id === 'vaporwave-gradient-text') {
    const el = document.createElement('div');
    el.style.cssText = 'font-family:var(--font-display); font-size:24px; font-weight:900; background:linear-gradient(135deg, #FF71CE, #01CDFE); -webkit-background-clip:text; -webkit-text-fill-color:transparent; cursor:pointer; letter-spacing:2px;';
    el.textContent = 'VAPORWAVE';
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.1)'; setTimeout(() => el.style.transform = 'none', 180); };

  } else if (id.includes('smoke-dissolve') || id === 'smoke-dissolve-text') {
    const el = document.createElement('div');
    el.style.cssText = 'font-family:var(--font-display); font-size:22px; font-weight:900; color:#FFF; cursor:pointer; transition:all 0.4s;';
    el.textContent = 'SMOKE PUFF';
    el.addEventListener('click', () => {
      el.style.filter = 'blur(8px)';
      el.style.opacity = '0.2';
      setTimeout(() => { el.style.filter = 'none'; el.style.opacity = '1'; }, 400);
    });
    stage.appendChild(el);
    restartFn = () => el.click();

  } else if (id.includes('matrix-decode') || id === 'matrix-decode-text') {
    const el = document.createElement('div');
    el.style.cssText = 'font-family:var(--font-mono); font-size:18px; font-weight:900; color:#39FF14; text-shadow:0 0 8px #39FF14; cursor:pointer;';
    el.textContent = '> MATRIX_CODE';
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.1)'; setTimeout(() => el.style.transform = 'none', 180); };

  } else if (id.includes('bouncing-letters') || id === 'bouncing-letters-text') {
    const el = document.createElement('div');
    el.style.cssText = 'display:flex; gap:2px; font-size:22px; font-weight:900; cursor:pointer;';
    const text = 'BOUNCE';
    el.innerHTML = text.split('').map((c, i) => `<span style="animation:dnFloatLevitate ${0.8 + i * 0.1}s infinite alternate; color:${accent};">${c}</span>`).join('');
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.15)'; setTimeout(() => el.style.transform = 'none', 180); };

  } else if (id.includes('laser-burn') || id === 'laser-burn-text') {
    const el = document.createElement('div');
    el.style.cssText = `font-family:var(--font-mono); font-size:20px; font-weight:900; color:#FF5722; text-shadow:0 0 12px #FF5722; cursor:pointer;`;
    el.textContent = '⚡ LASER BURN';
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.1)'; setTimeout(() => el.style.transform = 'none', 180); };

  } else if (id.includes('typewriter') || id === 'typewriter-cursor-text') {
    const el = document.createElement('div');
    el.style.cssText = 'font-family:var(--font-mono); font-size:18px; font-weight:800; color:#FFF; display:flex; align-items:center; cursor:pointer;';
    el.innerHTML = `<span>terminal_init()</span><span style="display:inline-block; width:8px; height:18px; background:${accent}; animation:dnPulseGlow 0.8s infinite; margin-left:4px;"></span>`;
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.05)'; setTimeout(() => el.style.transform = 'none', 180); };

  } else if (id.includes('curved-path') || id === 'curved-path-text') {
    const el = document.createElement('div');
    el.style.cssText = 'display:flex; gap:3px; font-size:20px; font-weight:900; cursor:pointer;';
    const text = 'S-CURVE';
    el.innerHTML = text.split('').map((c, i) => `<span style="transform:translateY(${Math.sin(i * 0.8) * 8}px); color:${accent};">${c}</span>`).join('');
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.1)'; setTimeout(() => el.style.transform = 'none', 180); };

  } else if (id.includes('rotary-dial') || id === 'rotary-dial-text') {
    const el = document.createElement('div');
    el.style.cssText = 'font-family:var(--font-display); font-size:20px; font-weight:900; color:#FFF; cursor:pointer; perspective:300px;';
    el.innerHTML = `<span style="display:inline-block; transform:rotateX(25deg); color:${accent};">CYLINDER 3D</span>`;
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.1)'; setTimeout(() => el.style.transform = 'none', 180); };

  } else if (id.includes('chromatic-zoom') || id === 'chromatic-zoom-text') {
    const el = document.createElement('div');
    el.style.cssText = 'font-family:var(--font-display); font-size:24px; font-weight:900; color:#FFF; text-shadow:2px 0 #FF0055, -2px 0 #00FFFF; cursor:pointer;';
    el.textContent = 'CHROMATIC';
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.2)'; setTimeout(() => el.style.transform = 'none', 180); };

  } else if (id.includes('aurora-glow') || id === 'aurora-glow-text') {
    const el = document.createElement('div');
    el.style.cssText = `position:relative; font-family:var(--font-display); font-size:22px; font-weight:900; color:#FFF; cursor:pointer; text-shadow:0 0 20px ${accent};`;
    el.textContent = 'AURORA GLOW';
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.1)'; setTimeout(() => el.style.transform = 'none', 180); };

  } else {
    // Default text visualizer
    const el = document.createElement('div');
    el.style.cssText = `font-family:var(--font-display); font-size:22px; font-weight:800; color:${accent}; cursor:pointer;`;
    el.textContent = name || 'DARTNOVA';
    stage.appendChild(el);
    restartFn = () => { el.style.transform = 'scale(1.1)'; setTimeout(() => el.style.transform = 'none', 180); };
  }

  return { restart: restartFn, destroy: destroyFn };
}
