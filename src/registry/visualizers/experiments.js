/**
 * DartNova Advanced Motion Experiments Visualizers (10 Bespoke Modern UI Components)
 */

export function renderExperimentVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('confetti') || id === 'confetti-celebration') {
    const el = document.createElement('div');
    el.style.cssText = 'display:flex; flex-direction:column; align-items:center; cursor:pointer;';
    el.innerHTML = `<span style="font-size:34px;">🎉</span><span style="font-size:9px; font-family:var(--font-mono); color:${accent}; margin-top:4px; font-weight:800;">Tap For Confetti</span>`;
    const burst = () => {
      for (let i = 0; i < 22; i++) {
        const c = document.createElement('div');
        const colors = [accent, '#42E8F5', '#9B7CFF', '#FF3C6E', '#FFB800'];
        c.style.cssText = `position:absolute; width:${4 + Math.random() * 5}px; height:${8 + Math.random() * 6}px; background:${colors[Math.floor(Math.random() * colors.length)]}; left:${15 + Math.random() * 70}%; top:20%; animation:dnConfettiFall 0.8s ease-out forwards; pointer-events:none;`;
        stage.appendChild(c);
        setTimeout(() => c.remove(), 850);
      }
    };
    el.addEventListener('click', burst);
    stage.appendChild(el);
    restartFn = burst;

  } else if (id.includes('image-trail') || id === 'image-trail') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:100%; height:100%; display:flex; align-items:center; justify-content:center; cursor:crosshair;';
    wrap.innerHTML = `<div style="font-size:10px; font-weight:800; color:#FFF; background:#161B26; padding:6px 12px; border-radius:6px; border:1px solid #282E3D;">Hover to leave trail</div>`;
    wrap.addEventListener('mousemove', (e) => {
      const r = wrap.getBoundingClientRect();
      const dot = document.createElement('div');
      dot.style.cssText = `position:absolute; width:16px; height:16px; border-radius:4px; background:${accent}; left:${e.clientX - r.left - 8}px; top:${e.clientY - r.top - 8}px; pointer-events:none; transition:all 0.4s ease-out; opacity:0.8; box-shadow:0 0 10px ${accent};`;
      wrap.appendChild(dot);
      setTimeout(() => {
        dot.style.transform = 'scale(0.2)';
        dot.style.opacity = '0';
      }, 30);
      setTimeout(() => dot.remove(), 420);
    });
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.05)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('particle-explosion') || id === 'particle-explosion') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `<button style="padding:10px 18px; border-radius:8px; background:#161B26; border:1.5px solid ${accent}; color:${accent}; font-weight:800; font-size:11px; cursor:pointer; box-shadow:0 0 16px ${accent}44;">💥 Detonate Core</button>`;
    const btn = wrap.querySelector('button');
    const boom = () => {
      for (let i = 0; i < 20; i++) {
        const spark = document.createElement('div');
        const angle = (i / 20) * Math.PI * 2;
        const dist = 40 + Math.random() * 30;
        spark.style.cssText = `position:absolute; width:5px; height:5px; border-radius:50%; background:${i % 2 === 0 ? accent : '#FF4B72'}; top:50%; left:50%; pointer-events:none; transition:all 0.5s ease-out; box-shadow:0 0 8px ${accent};`;
        stage.appendChild(spark);
        setTimeout(() => {
          spark.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
          spark.style.opacity = '0';
        }, 10);
        setTimeout(() => spark.remove(), 520);
      }
    };
    btn.addEventListener('click', boom);
    stage.appendChild(wrap);
    restartFn = boom;

  } else if (id.includes('text-to-particle') || id === 'text-to-particle') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; font-size:22px; font-weight:900; font-family:var(--font-mono); color:${accent}; cursor:pointer; letter-spacing:2px;';
    wrap.textContent = 'DISSOLVE';
    let dissolved = false;
    const toggleDissolve = () => {
      dissolved = !dissolved;
      wrap.style.transition = 'all 0.4s ease';
      wrap.style.filter = dissolved ? 'blur(8px)' : 'none';
      wrap.style.opacity = dissolved ? '0.2' : '1';
      wrap.style.letterSpacing = dissolved ? '8px' : '2px';
    };
    wrap.addEventListener('click', toggleDissolve);
    stage.appendChild(wrap);
    restartFn = toggleDissolve;

  } else if (id.includes('svg-path') || id === 'svg-path-drawing') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:60px; height:60px; cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 60 60" style="width:100%; height:100%;">
        <polygon class="spd-poly" points="30 5, 55 50, 5 50" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="160" stroke-dashoffset="0" style="transition:stroke-dashoffset 0.6s ease; filter:drop-shadow(0 0 8px ${accent});"/>
      </svg>
    `;
    const poly = wrap.querySelector('.spd-poly');
    const redraw = () => {
      poly.style.strokeDashoffset = '160';
      setTimeout(() => { poly.style.strokeDashoffset = '0'; }, 40);
    };
    wrap.addEventListener('click', redraw);
    stage.appendChild(wrap);
    restartFn = redraw;

  } else if (id.includes('morphing-svg') || id === 'morphing-svg-shapes') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:60px; height:60px; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `<div class="mss-box" style="width:50px; height:50px; border-radius:50%; background:linear-gradient(135deg, ${accent}, #42E8F5); transition:all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow:0 0 16px ${accent}66;"></div>`;
    let form = 0;
    const box = wrap.querySelector('.mss-box');
    const morph = () => {
      form = (form + 1) % 3;
      if (form === 0) {
        box.style.borderRadius = '50%';
        box.style.transform = 'rotate(0deg)';
      } else if (form === 1) {
        box.style.borderRadius = '8px';
        box.style.transform = 'rotate(45deg)';
      } else {
        box.style.borderRadius = '30% 70% 70% 30% / 30% 30% 70% 70%';
        box.style.transform = 'rotate(90deg)';
      }
    };
    wrap.addEventListener('click', morph);
    stage.appendChild(wrap);
    restartFn = morph;

  } else if (id.includes('liquid-metal') || id === 'liquid-metal-effect') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:120px; height:80px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="lm-puddle" style="width:80px; height:55px; border-radius:50% 50% 40% 60% / 60% 40% 60% 40%; background:linear-gradient(135deg, #FFFFFF, #B0B8C8, #4A5568, #FFFFFF); box-shadow:0 8px 24px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.8); transition:all 0.4s ease;"></div>
      <div style="position:absolute; font-size:8px; font-weight:800; color:#08090B;">CHROME</div>
    `;
    const puddle = wrap.querySelector('.lm-puddle');
    const ripple = () => {
      puddle.style.transform = 'scale(1.2) rotate(15deg)';
      setTimeout(() => puddle.style.transform = 'none', 300);
    };
    wrap.addEventListener('click', ripple);
    stage.appendChild(wrap);
    restartFn = ripple;

  } else if (id.includes('magnetic-cursor') || id === 'magnetic-cursor-field') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:grid; grid-template-columns:repeat(4, 22px); gap:6px; cursor:pointer;';
    for (let i = 0; i < 12; i++) {
      const arrow = document.createElement('div');
      arrow.className = 'mc-needle';
      arrow.style.cssText = `width:22px; height:22px; display:flex; align-items:center; justify-content:center; font-size:12px; color:${i % 2 === 0 ? accent : '#FFF'}; transition:transform 0.15s ease-out;`;
      arrow.textContent = '➤';
      wrap.appendChild(arrow);
    }
    wrap.addEventListener('mousemove', (e) => {
      const r = wrap.getBoundingClientRect();
      const cx = e.clientX - r.left;
      const cy = e.clientY - r.top;
      wrap.querySelectorAll('.mc-needle').forEach(needle => {
        const nr = needle.getBoundingClientRect();
        const nx = nr.left - r.left + 11;
        const ny = nr.top - r.top + 11;
        const angle = Math.atan2(cy - ny, cx - nx) * (180 / Math.PI);
        needle.style.transform = `rotate(${angle}deg)`;
      });
    });
    stage.appendChild(wrap);
    restartFn = () => { wrap.querySelectorAll('.mc-needle').forEach(n => n.style.transform = 'rotate(45deg)'); };

  } else if (id.includes('animated-logo') || id === 'animated-logo-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="al-ring" style="width:48px; height:48px; border-radius:12px; background:#121622; border:2px solid ${accent}; display:flex; align-items:center; justify-content:center; font-size:24px; box-shadow:0 0 20px ${accent}66; transition:all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);">
        ⚡
      </div>
      <div style="font-size:10px; font-weight:900; letter-spacing:2px; color:#FFF; font-family:var(--font-display);">DARTNOVA</div>
    `;
    const ring = wrap.querySelector('.al-ring');
    const pulse = () => {
      ring.style.transform = 'scale(1.25) rotate(15deg)';
      setTimeout(() => ring.style.transform = 'none', 260);
    };
    wrap.addEventListener('click', pulse);
    stage.appendChild(wrap);
    restartFn = pulse;

  } else {
    // Waveform Visualizer
    const el = document.createElement('div');
    el.style.cssText = 'display:flex; align-items:center; gap:4px; height:50px; cursor:pointer;';
    for (let i = 0; i < 14; i++) {
      const bar = document.createElement('div');
      bar.style.cssText = `width:4px; border-radius:2px; background:${i % 2 === 0 ? accent : '#42E8F5'}; animation:dnEqBounce ${0.6 + (i % 5) * 0.18}s ease-in-out infinite alternate; animation-delay:${i * 0.07}s;`;
      el.appendChild(bar);
    }
    el.addEventListener('click', () => {
      el.style.transform = 'scale(1.15)';
      setTimeout(() => el.style.transform = 'none', 200);
    });
    stage.appendChild(el);
    restartFn = () => el.click();
  }

  return { restart: restartFn, destroy: destroyFn };
}
