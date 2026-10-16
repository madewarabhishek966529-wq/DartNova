/**
 * DartNova Text & Typography Visualizers (10 Bespoke Modern UI Components)
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
      }, 220);
    };
    el.addEventListener('click', nextWord);
    stage.appendChild(el);
    restartFn = nextWord;

  } else if (id.includes('typing') || id === 'typing-text') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `font-family:var(--font-mono); font-size:16px; font-weight:800; color:#FFF; cursor:pointer; display:flex; align-items:center; background:#12151E; padding:8px 12px; border-radius:6px; border:1px solid #282E3D;`;
    wrap.innerHTML = `<span style="color:${accent}; margin-right:6px;">$</span><span class="tt-txt">flutter run</span><span class="tt-caret" style="display:inline-block; width:8px; height:16px; background:${accent}; margin-left:3px; animation:dnPulseGlow 0.8s infinite;"></span>`;
    const txt = wrap.querySelector('.tt-txt');
    const phrase = 'flutter run --release';
    let charIdx = 0;
    let timer = null;
    const typeLoop = () => {
      charIdx = 0;
      txt.textContent = '';
      clearInterval(timer);
      timer = setInterval(() => {
        if (charIdx < phrase.length) {
          txt.textContent += phrase[charIdx];
          charIdx++;
        } else {
          clearInterval(timer);
        }
      }, 60);
    };
    typeLoop();
    wrap.addEventListener('click', typeLoop);
    destroyFn = () => clearInterval(timer);
    stage.appendChild(wrap);
    restartFn = typeLoop;

  } else if (id.includes('text-reveal') || id === 'text-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'overflow:hidden; height:32px; display:flex; align-items:center; cursor:pointer;';
    wrap.innerHTML = `<div class="tr-inner" style="font-size:22px; font-weight:900; color:#FFF; transform:translateY(100%); transition:transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);"><span style="color:${accent};">HIGH VELOCITY</span> REVEAL</div>`;
    const inner = wrap.querySelector('.tr-inner');
    const playReveal = () => {
      inner.style.transform = 'translateY(100%)';
      setTimeout(() => { inner.style.transform = 'translateY(0)'; }, 40);
    };
    playReveal();
    wrap.addEventListener('click', playReveal);
    stage.appendChild(wrap);
    restartFn = playReveal;

  } else if (id.includes('staggered-text') || id === 'staggered-text') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:2px; font-size:20px; font-weight:900; font-family:var(--font-display); cursor:pointer;';
    const letters = 'CASCADE'.split('');
    wrap.innerHTML = letters.map((l, i) => `
      <span class="st-char" style="display:inline-block; opacity:0; transform:translateY(-16px); transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); transition-delay:${i * 0.05}s; color:${i % 2 === 0 ? accent : '#FFF'};">
        ${l}
      </span>
    `).join('');
    const runCascade = () => {
      wrap.querySelectorAll('.st-char').forEach(c => {
        c.style.opacity = '0';
        c.style.transform = 'translateY(-16px)';
      });
      setTimeout(() => {
        wrap.querySelectorAll('.st-char').forEach(c => {
          c.style.opacity = '1';
          c.style.transform = 'translateY(0)';
        });
      }, 30);
    };
    runCascade();
    wrap.addEventListener('click', runCascade);
    stage.appendChild(wrap);
    restartFn = runCascade;

  } else if (id.includes('marquee') || id === 'kinetic-marquee') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:180px; overflow:hidden; white-space:nowrap; border-radius:6px; background:#141722; border:1px solid #282E3D; padding:6px 0; cursor:pointer;`;
    wrap.innerHTML = `
      <div class="mq-track" style="display:inline-block; font-size:10px; font-weight:800; font-family:var(--font-mono); color:${accent}; animation:dnBorderBeam 10s linear infinite;">
        ✦ 120 FPS FLUTTER ✦ DARTNOVA MOTION ✦ ZERO LAG SHADERS ✦
      </div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.05)'; setTimeout(() => wrap.style.transform = 'none', 180); };

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

  return { restart: restartFn, destroy: destroyFn };
}
