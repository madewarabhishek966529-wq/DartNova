/**
 * DartNova Roadmap Components Manifest
 * 134 planned components completing the 160-component catalog defined in PRD Section 9.
 * Each entry includes comprehensive metadata, tags, difficulty, interactive preview placeholder,
 * and valid Flutter/Dart code architecture.
 */

function createMotionVisualizer(id, category, name, icon, props) {
  const accent = props.accentColor || '#C5FF35';
  const stage = document.createElement('div');
  stage.className = 'dn-motion-stage';

  let restartFn = () => {};
  let destroyFn = () => {};

  // CATEGORY 1: BUTTONS & INTERACTIVE CONTROLS
  if (category === 'buttons') {
    if (id.includes('liquid') || id === 'liquid-fill-button') {
      const btn = document.createElement('button');
      btn.className = 'dn-liquid-btn-widget';
      btn.innerHTML = `<span style="position:relative; z-index:2;">Get Started</span><div class="liquid-bg" style="background:${accent};"></div>`;
      btn.style.borderColor = accent;
      btn.style.color = accent;
      stage.appendChild(btn);
    } else if (id.includes('shimmer') || id === 'shimmer-button') {
      const btn = document.createElement('button');
      btn.className = 'dn-shimmer-btn-widget';
      btn.textContent = 'Explore Motion';
      stage.appendChild(btn);
    } else if (id.includes('3d-press') || id === '3d-press-button') {
      const btn = document.createElement('button');
      btn.className = 'dn-press3d-btn-widget';
      btn.textContent = 'Press 3D';
      btn.style.background = accent;
      btn.addEventListener('mousedown', () => btn.classList.add('pressed'));
      btn.addEventListener('mouseup', () => btn.classList.remove('pressed'));
      btn.addEventListener('mouseleave', () => btn.classList.remove('pressed'));
      stage.appendChild(btn);
    } else if (id.includes('elastic') || id === 'elastic-bounce-button') {
      const btn = document.createElement('button');
      btn.className = 'dn-glow-btn-widget';
      btn.textContent = 'Elastic Spring';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.8, 0.64, 1)';
      btn.addEventListener('click', () => {
        btn.style.transform = 'scale(1.35) rotate(-3deg)';
        setTimeout(() => btn.style.transform = 'scale(1) rotate(0deg)', 280);
      });
      stage.appendChild(btn);
    } else if (id.includes('border-beam') || id === 'border-beam-button') {
      const btn = document.createElement('div');
      btn.className = 'dn-border-beam-widget';
      btn.innerHTML = `<span>Border Beam</span>`;
      stage.appendChild(btn);
    } else if (id.includes('particle-burst') || id === 'particle-burst-button') {
      const btn = document.createElement('button');
      btn.className = 'dn-glow-btn-widget';
      btn.innerHTML = `<span>⚡ Tap For Sparks</span>`;
      btn.addEventListener('click', () => {
        for (let i = 0; i < 10; i++) {
          const spark = document.createElement('div');
          const angle = (i / 10) * Math.PI * 2;
          const dist = 40 + Math.random() * 25;
          spark.style.cssText = `
            position: absolute; width: 6px; height: 6px; border-radius: 50%;
            background: ${accent}; pointer-events: none; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            transition: transform 0.45s ease-out, opacity 0.45s ease-out;
            box-shadow: 0 0 10px ${accent}; z-index: 10;
          `;
          stage.appendChild(spark);
          setTimeout(() => {
            spark.style.transform = `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) scale(0)`;
            spark.style.opacity = '0';
          }, 10);
          setTimeout(() => spark.remove(), 480);
        }
      });
      stage.appendChild(btn);
    } else if (id.includes('morphing-icon') || id === 'morphing-icon-button') {
      const btn = document.createElement('button');
      btn.className = 'dn-glow-btn-widget';
      let isPlaying = false;
      btn.innerHTML = `<span style="font-size:16px;">▶</span> <span style="margin-left:6px;">Play Audio</span>`;
      btn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        btn.innerHTML = isPlaying 
          ? `<span style="font-size:16px;">⏸</span> <span style="margin-left:6px;">Pause</span>`
          : `<span style="font-size:16px;">▶</span> <span style="margin-left:6px;">Play Audio</span>`;
        btn.style.transform = 'scale(1.1)';
        setTimeout(() => btn.style.transform = 'scale(1)', 150);
      });
      stage.appendChild(btn);
    } else {
      // Default production Neon Glow Button
      const btn = document.createElement('button');
      btn.className = 'dn-glow-btn-widget';
      btn.textContent = 'Explore Motion';
      btn.style.boxShadow = `0 0 24px ${accent}66`;
      btn.addEventListener('click', () => {
        btn.style.transform = 'scale(0.92)';
        setTimeout(() => btn.style.transform = 'scale(1)', 120);
      });
      stage.appendChild(btn);
      restartFn = () => {
        btn.style.transform = 'scale(1.15)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
      };
    }

  // CATEGORY 2: CARDS & SURFACES
  } else if (category === 'cards') {
    if (id.includes('glassmorphism')) {
      const card = document.createElement('div');
      card.style.cssText = `
        width: 190px; padding: 16px 18px; border-radius: 14px;
        background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.18);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        display: flex; flex-direction: column; gap: 12px; cursor: pointer;
        transition: transform 0.3s ease, border-color 0.3s ease;
      `;
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="width:28px; height:20px; background:linear-gradient(135deg, #FFD700, #FFA500); border-radius:4px;"></div>
          <span style="font-family:var(--font-mono); font-size:10px; color:${accent}; font-weight:700;">PREMIUM</span>
        </div>
        <div style="font-family:var(--font-mono); font-size:13px; letter-spacing:2px; color:#FFF;">•••• 8492</div>
        <div style="display:flex; justify-content:space-between; align-items:flex-end;">
          <div>
            <div style="font-size:9px; color:var(--text-muted); text-transform:uppercase;">Cardholder</div>
            <div style="font-size:11px; font-weight:700; color:#FFF;">ALEX RIVERA</div>
          </div>
          <div style="font-size:11px; font-weight:700; color:${accent};">$12,450</div>
        </div>
      `;
      card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-4px) scale(1.03)');
      card.addEventListener('mouseleave', () => card.style.transform = 'none');
      stage.appendChild(card);
    } else if (id.includes('flip-profile') || id.includes('flip')) {
      const flip = document.createElement('div');
      flip.className = 'dn-flip-card-widget';
      flip.style.cssText = 'perspective:800px; width:170px; height:105px; cursor:pointer;';
      flip.innerHTML = `
        <div class="dn-flip-inner">
          <div class="dn-flip-front" style="gap:6px; padding:12px;">
            <div style="width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg, #C5FF35, #42E8F5); display:flex; align-items:center; justify-content:center; font-weight:800; color:#08090B; font-size:16px;">AR</div>
            <div style="font-size:13px; font-weight:700; color:#FFF;">Alex Rivera</div>
            <div style="font-size:10px; color:var(--text-muted);">UI/UX Motion Designer</div>
          </div>
          <div class="dn-flip-back" style="gap:6px; padding:12px; background:#181c26;">
            <div style="font-size:11px; font-weight:700; color:${accent};">ACTIVITY METRICS</div>
            <div style="display:flex; gap:12px; font-size:10px; color:#FFF;">
              <div><strong>142</strong><br><span style="color:var(--text-muted);">Projects</span></div>
              <div><strong>99%</strong><br><span style="color:var(--text-muted);">Success</span></div>
            </div>
            <div style="font-size:9px; color:var(--accent-cyan); margin-top:2px;">Tap to flip back</div>
          </div>
        </div>
      `;
      flip.addEventListener('click', () => flip.classList.toggle('flipped'));
      stage.appendChild(flip);
    } else if (id.includes('holographic')) {
      const holo = document.createElement('div');
      holo.style.cssText = `
        width: 170px; height: 105px; border-radius: 12px;
        background: linear-gradient(135deg, #181c25, #222938);
        border: 1px solid rgba(255, 255, 255, 0.2);
        position: relative; overflow: hidden; cursor: pointer;
        display: flex; flex-direction: column; justify-content: space-between; padding: 12px;
      `;
      holo.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:11px; font-weight:800; color:#FFF;">CYBER SHARD</span>
          <span style="font-size:10px; font-family:var(--font-mono); color:${accent};">#009</span>
        </div>
        <div style="position:absolute; inset:0; background:linear-gradient(115deg, transparent 20%, rgba(66,232,245,0.3) 40%, rgba(197,255,53,0.3) 60%, rgba(155,124,255,0.3) 80%, transparent 100%); pointer-events:none; transition:transform 0.2s ease;"></div>
        <div style="font-size:10px; color:var(--text-secondary); position:relative; z-index:2;">Holographic Iridescence</div>
      `;
      stage.addEventListener('mousemove', (e) => {
        const rect = stage.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 100;
        holo.children[1].style.transform = `translateX(${x - 50}px)`;
      });
      stage.appendChild(holo);
    } else if (id.includes('stacked-deck')) {
      const deck = document.createElement('div');
      deck.style.cssText = 'position:relative; width:150px; height:90px; cursor:pointer;';
      deck.innerHTML = `
        <div style="position:absolute; inset:0; background:#181c25; border:1px solid #2e3444; border-radius:12px; transform:rotate(-8deg); transition:transform 0.3s ease;"></div>
        <div style="position:absolute; inset:0; background:#202533; border:1px solid #3c445a; border-radius:12px; transform:rotate(5deg); transition:transform 0.3s ease;"></div>
        <div style="position:absolute; inset:0; background:#282f42; border:1px solid ${accent}; border-radius:12px; display:flex; align-items:center; justify-content:center; gap:8px; color:#FFF; font-size:12px; font-weight:700; transform:rotate(0deg); transition:transform 0.3s ease; box-shadow:0 8px 24px rgba(0,0,0,0.6);">
          <span>🎴</span> <span>Active Deck Card</span>
        </div>
      `;
      deck.addEventListener('click', () => {
        const top = deck.children[2];
        top.style.transform = 'translateY(-28px) scale(1.05)';
        setTimeout(() => top.style.transform = 'translateY(0) scale(1)', 260);
      });
      stage.appendChild(deck);
    } else {
      // Default high-performance 3D Tilt Card
      const card = document.createElement('div');
      card.style.cssText = `
        width: 180px; padding: 14px 16px; border-radius: 12px;
        background: #191C23; border: 1px solid var(--border-default);
        box-shadow: 0 10px 25px rgba(0,0,0,0.4); cursor: pointer;
        transition: transform 0.1s ease-out, border-color 0.2s ease;
      `;
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:12px; font-weight:700; color:#FFF;">Live Telemetry</span>
          <span style="width:8px; height:8px; border-radius:50%; background:${accent}; box-shadow:0 0 8px ${accent};"></span>
        </div>
        <div style="font-size:20px; font-family:var(--font-mono); font-weight:800; color:${accent};">120 FPS</div>
        <div style="font-size:10px; color:var(--text-muted); margin-top:4px;">Hardware Accelerated</div>
      `;
      stage.addEventListener('mousemove', (e) => {
        const rect = stage.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(500px) rotateY(${x * 22}deg) rotateX(${-y * 22}deg) scale(1.03)`;
        card.style.borderColor = accent;
      });
      stage.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
        card.style.borderColor = 'var(--border-default)';
      });
      stage.appendChild(card);
    }

  // CATEGORY 3: TEXT & TYPOGRAPHY
  } else if (category === 'typography') {
    if (id.includes('glitch')) {
      const el = document.createElement('div');
      el.className = 'dn-glitch-text-widget';
      el.textContent = 'DARTNOVA';
      stage.appendChild(el);
    } else if (id.includes('gradient-flow')) {
      const el = document.createElement('div');
      el.style.cssText = `
        font-family: var(--font-display); font-size: 26px; font-weight: 800;
        letter-spacing: -0.02em;
        background: linear-gradient(90deg, #C5FF35, #42E8F5, #9B7CFF, #C5FF35);
        background-size: 300% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        animation: dnShimmerSweep 3s linear infinite;
      `;
      el.textContent = 'MOTION FLOW';
      stage.appendChild(el);
    } else if (id.includes('wave')) {
      const el = document.createElement('div');
      el.style.cssText = 'display:flex; gap:3px; font-size:20px; font-weight:800; font-family:var(--font-mono);';
      const text = 'SINE WAVE';
      el.innerHTML = text.split('').map((char, i) => `
        <span style="display:inline-block; animation:dnTextWaveLetter 1.4s ease-in-out infinite; animation-delay:${i * 0.12}s;">${char === ' ' ? '&nbsp;' : char}</span>
      `).join('');
      stage.appendChild(el);
    } else {
      // Scramble / Typewriter
      const el = document.createElement('div');
      el.style.cssText = `font-family:var(--font-mono); font-size:22px; font-weight:800; color:${accent}; cursor:pointer; text-align:center;`;
      el.textContent = 'FLUTTER MOTION';
      const phrase = 'FLUTTER MOTION';
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
          iter += 1 / 2;
        }, 30);
      };
      runScramble();
      el.addEventListener('mouseenter', runScramble);
      stage.appendChild(el);
      restartFn = runScramble;
      destroyFn = () => clearInterval(interval);
    }

  // CATEGORY 4: LOADERS & PROGRESS
  } else if (category === 'loaders') {
    if (id.includes('orbit')) {
      const el = document.createElement('div');
      el.className = 'dn-orbit-loader-widget';
      el.innerHTML = `
        <div class="dn-orbit-ring ring-1" style="border-color:${accent};"></div>
        <div class="dn-orbit-ring ring-2"></div>
        <div class="dn-orbit-center" style="background:${accent}; box-shadow:0 0 12px ${accent};"></div>
      `;
      stage.appendChild(el);
    } else if (id.includes('wave')) {
      const el = document.createElement('div');
      el.className = 'dn-wave-loader-widget';
      el.innerHTML = `
        <div class="dn-wave-bar" style="background:${accent};"></div>
        <div class="dn-wave-bar" style="background:#42E8F5;"></div>
        <div class="dn-wave-bar" style="background:#9B7CFF;"></div>
        <div class="dn-wave-bar" style="background:#42E8F5;"></div>
        <div class="dn-wave-bar" style="background:${accent};"></div>
      `;
      stage.appendChild(el);
    } else if (id.includes('dot-matrix')) {
      const el = document.createElement('div');
      el.style.cssText = 'display:grid; grid-template-columns:repeat(4, 11px); gap:6px;';
      for (let i = 0; i < 16; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
          width: 11px; height: 11px; border-radius: 50%;
          background: ${accent}; opacity: ${0.2 + (i % 4) * 0.25};
          animation: dnPulseGlow 1.5s ease-in-out infinite alternate;
          animation-delay: ${(i % 4) * 0.15 + Math.floor(i / 4) * 0.1}s;
        `;
        el.appendChild(dot);
      }
      stage.appendChild(el);
    } else if (id.includes('counter') || id.includes('number')) {
      const el = document.createElement('div');
      el.style.cssText = `font-family:var(--font-mono); font-size:36px; font-weight:800; color:${accent};`;
      let count = 0;
      const interval = setInterval(() => {
        count = (count + 1) % 100;
        el.textContent = String(count).padStart(2, '0') + '%';
      }, 50);
      stage.appendChild(el);
      destroyFn = () => clearInterval(interval);
    } else {
      // Circular SVG Progress Ring
      const el = document.createElement('div');
      el.className = 'dn-circular-ring-widget';
      el.innerHTML = `
        <svg viewBox="0 0 76 76">
          <circle class="track" cx="38" cy="38" r="30" stroke-width="6" fill="none"></circle>
          <circle class="fill" cx="38" cy="38" r="30" stroke-width="6" fill="none" style="stroke:${accent};"></circle>
        </svg>
        <div class="ring-val" style="color:${accent};">84%</div>
      `;
      stage.appendChild(el);
    }

  // CATEGORY 5: NAVIGATION & MENUS
  } else if (category === 'navigation') {
    if (id.includes('floating-dock') || id.includes('dock')) {
      const dock = document.createElement('div');
      dock.className = 'dn-floating-dock-widget';
      dock.innerHTML = `
        <div class="dn-dock-icon">⚡</div>
        <div class="dn-dock-icon">🎨</div>
        <div class="dn-dock-icon" style="background:${accent}; color:#08090B;">🚀</div>
        <div class="dn-dock-icon">✨</div>
        <div class="dn-dock-icon">⚙️</div>
      `;
      stage.appendChild(dock);
    } else if (id.includes('hamburger')) {
      const ham = document.createElement('div');
      ham.style.cssText = 'width:40px; height:30px; display:flex; flex-direction:column; justify-content:space-between; cursor:pointer; padding:3px;';
      ham.innerHTML = `
        <div style="height:3.5px; background:${accent}; border-radius:2px; transition:transform 0.3s ease;"></div>
        <div style="height:3.5px; background:${accent}; border-radius:2px; transition:opacity 0.2s ease;"></div>
        <div style="height:3.5px; background:${accent}; border-radius:2px; transition:transform 0.3s ease;"></div>
      `;
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
    } else {
      // Mobile Bottom Nav with Gliding Pill
      const nav = document.createElement('div');
      nav.className = 'dn-mobile-nav-widget';
      nav.style.width = '190px';
      nav.innerHTML = `
        <div class="dn-mobile-nav-pill" style="left:12px; border-color:${accent}; background:${accent}22;"></div>
        <div class="dn-mobile-nav-item active" data-idx="0">⚡</div>
        <div class="dn-mobile-nav-item" data-idx="1">★</div>
        <div class="dn-mobile-nav-item" data-idx="2">✦</div>
        <div class="dn-mobile-nav-item" data-idx="3">👤</div>
      `;
      const pill = nav.querySelector('.dn-mobile-nav-pill');
      nav.querySelectorAll('.dn-mobile-nav-item').forEach((item, idx) => {
        item.addEventListener('click', () => {
          pill.style.left = `${12 + idx * 44}px`;
          nav.querySelectorAll('.dn-mobile-nav-item').forEach(i => i.classList.remove('active'));
          item.classList.add('active');
        });
      });
      stage.appendChild(nav);
    }

  // CATEGORY 6: PAGE & ROUTE TRANSITIONS
  } else if (category === 'transitions') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:100px; border-radius:12px; overflow:hidden; border:1px solid #2A2E38; cursor:pointer;';
    wrap.innerHTML = `
      <div class="pane-1" style="position:absolute; inset:0; background:#111318; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:700; font-size:13px; transition:transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);">Page A</div>
      <div class="pane-2" style="position:absolute; inset:0; background:${accent}22; border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:700; font-size:13px; transform:translateX(100%); transition:transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);">Page B (Active)</div>
    `;
    let isB = false;
    wrap.addEventListener('click', () => {
      isB = !isB;
      const p1 = wrap.querySelector('.pane-1');
      const p2 = wrap.querySelector('.pane-2');
      p1.style.transform = isB ? 'translateX(-100%)' : 'translateX(0)';
      p2.style.transform = isB ? 'translateX(0)' : 'translateX(100%)';
    });
    stage.appendChild(wrap);

  // CATEGORY 7: MODALS, DIALOGS & OVERLAYS
  } else if (category === 'overlays') {
    const modal = document.createElement('div');
    modal.style.cssText = `
      width: 175px; padding: 14px; border-radius: 12px;
      background: #191C23; border: 1px solid ${accent}66;
      box-shadow: 0 16px 32px rgba(0,0,0,0.6); display: flex; flex-direction: column; gap: 8px;
      animation: dnFloatLevitate 4s ease-in-out infinite; cursor: pointer;
    `;
    modal.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:12px; font-weight:700; color:#FFF;">Modal Dialog</span>
        <span style="font-size:10px; color:${accent};">ESC ✕</span>
      </div>
      <div style="font-size:10px; color:var(--text-muted); line-height:1.4;">Spring physics popover with background blur.</div>
      <button style="padding:5px; border-radius:6px; background:${accent}; border:none; color:#08090B; font-weight:700; font-size:10px; cursor:pointer;">Confirm Action</button>
    `;
    stage.appendChild(modal);

  // CATEGORY 8: GESTURES & PHYSICS
  } else if (category === 'gestures') {
    const card = document.createElement('div');
    card.style.cssText = `
      width: 160px; padding: 14px 18px; border-radius: 12px;
      background: #191C23; border: 1.5px solid ${accent};
      color: #FFF; font-size: 13px; font-weight: 700;
      display: flex; align-items: center; justify-content: space-between;
      cursor: grab; transition: transform 0.2s ease-out; box-shadow: 0 10px 20px rgba(0,0,0,0.4);
    `;
    card.innerHTML = `<span>↔ Swipe Left/Right</span><span>⚡</span>`;
    card.addEventListener('mousedown', () => {
      card.style.cursor = 'grabbing';
      card.style.transform = 'translateX(40px) rotate(6deg)';
      setTimeout(() => card.style.transform = 'none', 350);
    });
    stage.appendChild(card);

  // CATEGORY 9: BACKGROUNDS & AMBIENT
  } else if (category === 'backgrounds') {
    const el = document.createElement('div');
    el.className = 'dn-aurora-bg-widget';
    el.innerHTML = `
      <div class="dn-aurora-glow-1" style="background:radial-gradient(circle, ${accent} 0%, transparent 70%);"></div>
      <div class="dn-aurora-glow-2"></div>
      <span style="position:relative; z-index:1; font-family:var(--font-mono); font-size:13px; color:#FFF; font-weight:800; letter-spacing:0.1em;">AMBIENT AURA</span>
    `;
    stage.appendChild(el);

  // CATEGORY 10: 3D & PERSPECTIVE
  } else if (category === 'three-d') {
    const stageBox = document.createElement('div');
    stageBox.className = 'dn-cube-stage';
    stageBox.innerHTML = `
      <div class="dn-3d-cube">
        <div class="dn-cube-face front" style="border-color:${accent}; color:${accent};">⚡</div>
        <div class="dn-cube-face back">✦</div>
        <div class="dn-cube-face right">★</div>
        <div class="dn-cube-face left">▲</div>
        <div class="dn-cube-face top">●</div>
        <div class="dn-cube-face bottom">■</div>
      </div>
    `;
    stage.appendChild(stageBox);

  // CATEGORY 11: IMAGES & MEDIA
  } else if (category === 'media') {
    const box = document.createElement('div');
    box.style.cssText = 'position:relative; width:160px; height:100px; border-radius:10px; overflow:hidden; border:1px solid #2A2E38;';
    box.innerHTML = `
      <div style="position:absolute; inset:0; background:linear-gradient(135deg, #2b1055, #7597de); display:flex; align-items:center; justify-content:center; animation:dnFloatLevitate 4s infinite;">
        <span style="font-size:32px;">📷</span>
      </div>
      <div style="position:absolute; bottom:6px; left:8px; right:8px; display:flex; justify-content:space-between; font-size:10px; font-weight:700; color:#FFF; background:rgba(0,0,0,0.6); padding:4px 8px; border-radius:6px; backdrop-filter:blur(4px);">
        <span>Ken Burns</span>
        <span style="color:${accent};">Zoom 1.2x</span>
      </div>
    `;
    stage.appendChild(box);

  // CATEGORY 12: CHARTS & DATA
  } else if (category === 'charts') {
    if (id.includes('bar')) {
      const el = document.createElement('div');
      el.className = 'dn-barchart-widget';
      el.innerHTML = `
        <div class="dn-barchart-col" style="--target-height:40%; height:40%;"></div>
        <div class="dn-barchart-col" style="--target-height:85%; height:85%; animation-delay:0.1s; background:${accent};"></div>
        <div class="dn-barchart-col" style="--target-height:60%; height:60%; animation-delay:0.2s;"></div>
        <div class="dn-barchart-col" style="--target-height:100%; height:100%; animation-delay:0.3s; background:#42E8F5;"></div>
        <div class="dn-barchart-col" style="--target-height:75%; height:75%; animation-delay:0.4s;"></div>
      `;
      stage.appendChild(el);
    } else {
      // Line Chart
      const el = document.createElement('div');
      el.className = 'dn-linechart-widget';
      el.innerHTML = `
        <svg viewBox="0 0 140 55">
          <defs>
            <linearGradient id="chartGrad_${id}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${accent}" stop-opacity="0.5"/>
              <stop offset="100%" stop-color="${accent}" stop-opacity="0.0"/>
            </linearGradient>
          </defs>
          <polygon points="10,50 10,40 35,25 60,35 85,15 110,28 130,10 130,50" fill="url(#chartGrad_${id})"/>
          <path class="dn-linechart-path" d="M10,40 Q25,20 35,25 T60,35 T85,15 T110,28 T130,10" style="stroke:${accent};"/>
          <circle cx="130" cy="10" r="4" fill="${accent}" style="filter:drop-shadow(0 0 6px ${accent});"/>
        </svg>
      `;
      stage.appendChild(el);
    }

  // CATEGORY 13: FORMS & FEEDBACK
  } else if (category === 'forms') {
    if (id.includes('checkmark')) {
      const el = document.createElement('div');
      el.className = 'dn-checkmark-widget';
      el.innerHTML = `
        <svg viewBox="0 0 48 48">
          <circle class="dn-checkmark-circle" cx="24" cy="24" r="20" style="stroke:${accent};"></circle>
          <path class="dn-checkmark-stem" d="M14 24 L21 31 L34 17" style="stroke:${accent};"></path>
        </svg>
      `;
      stage.appendChild(el);
    } else if (id.includes('toggle')) {
      const toggle = document.createElement('div');
      toggle.className = 'dn-toggle-widget active';
      toggle.style.borderColor = accent;
      toggle.innerHTML = `<div class="dn-toggle-thumb" style="background:${accent};"></div>`;
      toggle.addEventListener('click', () => toggle.classList.toggle('active'));
      stage.appendChild(toggle);
    } else {
      const input = document.createElement('div');
      input.style.cssText = `
        padding: 10px 18px; border: 1.5px solid ${accent}; border-radius: 8px;
        background: #111318; color: #FFF; font-size: 13px; font-family: var(--font-mono);
        cursor: pointer; box-shadow: 0 0 14px ${accent}44; display: flex; align-items: center; gap: 8px;
      `;
      input.innerHTML = `<span>⚡</span> <span>Input Focus_</span>`;
      input.addEventListener('click', () => {
        input.style.transform = 'translateX(-6px)';
        setTimeout(() => input.style.transform = 'translateX(6px)', 60);
        setTimeout(() => input.style.transform = 'translateX(-4px)', 120);
        setTimeout(() => input.style.transform = 'none', 180);
      });
      stage.appendChild(input);
    }

  // CATEGORY 14: LISTS & COLLECTIONS
  } else if (category === 'lists') {
    const list = document.createElement('div');
    list.style.cssText = 'display:flex; flex-direction:column; gap:6px; width:170px;';
    for (let i = 0; i < 3; i++) {
      const item = document.createElement('div');
      item.style.cssText = `
        padding: 7px 12px; background: #181c25; border: 1px solid var(--border-default);
        border-radius: 8px; display: flex; justify-content: space-between; align-items: center;
        color: #FFF; font-size: 11px; cursor: pointer; transition: transform 0.2s ease, border-color 0.2s ease;
      `;
      item.innerHTML = `<span>Item 0${i + 1}</span><span style="color:${accent};">›</span>`;
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(6px)';
        item.style.borderColor = accent;
      });
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'none';
        item.style.borderColor = 'var(--border-default)';
      });
      list.appendChild(item);
    }
    stage.appendChild(list);

  // CATEGORY 15: ICONS & MICRO-INTERACTIONS
  } else if (category === 'micro-interactions') {
    if (id.includes('bell')) {
      const bell = document.createElement('div');
      bell.className = 'dn-bell-ring-widget';
      bell.innerHTML = `🔔<div class="dn-bell-badge" style="background:${accent};"></div>`;
      stage.appendChild(bell);
    } else {
      const heart = document.createElement('div');
      heart.className = 'dn-heart-pop-widget';
      heart.textContent = '❤️';
      heart.addEventListener('click', () => {
        heart.classList.remove('active');
        void heart.offsetWidth;
        heart.classList.add('active');
      });
      stage.appendChild(heart);
    }

  // CATEGORY 16: ADVANCED MOTION EXPERIMENTS
  } else {
    if (id.includes('waveform') || id.includes('visualizer')) {
      const el = document.createElement('div');
      el.style.cssText = 'display:flex; align-items:center; gap:4px; height:50px;';
      for (let i = 0; i < 14; i++) {
        const bar = document.createElement('div');
        bar.style.cssText = `
          width: 4px; border-radius: 2px;
          background: ${i % 2 === 0 ? accent : '#42E8F5'};
          animation: dnEqBounce ${0.7 + (i % 5) * 0.2}s ease-in-out infinite alternate;
          animation-delay: ${(i * 0.07)}s;
        `;
        el.appendChild(bar);
      }
      stage.appendChild(el);
    } else if (id.includes('confetti')) {
      const el = document.createElement('div');
      el.style.cssText = 'display:flex; flex-direction:column; align-items:center; cursor:pointer;';
      el.innerHTML = `<span style="font-size:36px;">🎉</span><span style="font-size:11px; font-family:var(--font-mono); color:${accent}; margin-top:4px; font-weight:700;">Tap For Confetti</span>`;
      el.addEventListener('click', () => {
        for (let i = 0; i < 20; i++) {
          const c = document.createElement('div');
          const colors = ['#C5FF35', '#42E8F5', '#9B7CFF', '#FF3C6E', '#FFB800'];
          c.style.cssText = `
            position: absolute; width: ${4 + Math.random() * 6}px; height: ${8 + Math.random() * 8}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${15 + Math.random() * 70}%; top: 20%;
            animation: dnConfettiFall 0.8s ease-out forwards; pointer-events: none;
          `;
          stage.appendChild(c);
          setTimeout(() => c.remove(), 850);
        }
      });
      stage.appendChild(el);
    } else {
      // Interactive Canvas Sparks
      const canvas = document.createElement('canvas');
      canvas.width = 160;
      canvas.height = 100;
      canvas.style.cssText = 'width:160px; height:100px; cursor:crosshair;';
      const ctx = canvas.getContext('2d');
      let particles = [];
      for (let i = 0; i < 24; i++) {
        particles.push({
          x: 80, y: 50,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          color: Math.random() > 0.5 ? accent : '#42E8F5',
          r: 2 + Math.random() * 2
        });
      }
      let animId;
      const loop = () => {
        ctx.fillStyle = 'rgba(8, 9, 11, 0.25)';
        ctx.fillRect(0, 0, 160, 100);
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > 160) p.vx *= -1;
          if (p.y < 0 || p.y > 100) p.vy *= -1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        });
        animId = requestAnimationFrame(loop);
      };
      loop();
      destroyFn = () => cancelAnimationFrame(animId);
      stage.appendChild(canvas);
    }
  }

  return {
    element: stage,
    restart: restartFn,
    destroy: destroyFn
  };
}

function createRoadmapComponent({
  id,
  name,
  category,
  description,
  tags = [],
  difficulty = 'intermediate',
  icon = '⚡',
  widgetName,
  notes = 'Designed using core Flutter AnimationController and CustomPainter.'
}) {
  const wName = widgetName || name.replace(/[^a-zA-Z0-9]/g, '');

  return {
    id,
    name,
    category,
    badge: 'Roadmap Spec',
    status: 'planned',
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
              style: TextStyle(
                color: const Color(0xFFF5F7FA),
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

export const ROADMAP_COMPONENTS = [
  // --- Category 1: Buttons & Controls ---
  createRoadmapComponent({
    id: 'liquid-fill-button',
    name: 'Liquid Fill Button',
    category: 'buttons',
    icon: '🌊',
    difficulty: 'intermediate',
    tags: ['button', 'liquid', 'wave', 'interactive'],
    description: 'Dynamic fluid wave that fills the button container geometry upon hover or tap.'
  }),
  createRoadmapComponent({
    id: 'shimmer-button',
    name: 'Shimmer Button',
    category: 'buttons',
    icon: '✨',
    difficulty: 'beginner',
    tags: ['button', 'shimmer', 'shine', 'glow'],
    description: 'High-speed iridescent light beam sweeping across button surface with specular highlights.'
  }),
  createRoadmapComponent({
    id: 'elastic-bounce-button',
    name: 'Elastic Bounce Button',
    category: 'buttons',
    icon: '🏀',
    difficulty: 'intermediate',
    tags: ['button', 'elastic', 'bounce', 'spring'],
    description: 'Bouncy spring reaction simulating physical elastic material with natural overshoot damping.'
  }),
  createRoadmapComponent({
    id: 'border-beam-button',
    name: 'Border Beam Button',
    category: 'buttons',
    icon: '⚡',
    difficulty: 'intermediate',
    tags: ['button', 'border', 'beam', 'laser'],
    description: 'Luminous light particle that travels continuously along the perimeter border of the button.'
  }),
  createRoadmapComponent({
    id: 'gradient-shift-button',
    name: 'Gradient Shift Button',
    category: 'buttons',
    icon: '🌈',
    difficulty: 'beginner',
    tags: ['button', 'gradient', 'shift', 'colors'],
    description: 'Smooth multi-stop linear gradient that shifts continuously along angles on user interaction.'
  }),
  createRoadmapComponent({
    id: 'particle-burst-button',
    name: 'Particle Burst Button',
    category: 'buttons',
    icon: '💥',
    difficulty: 'advanced',
    tags: ['button', 'particles', 'burst', 'celebration'],
    description: 'Radial explosion of multi-colored particles bursting outwards when the button is clicked.'
  }),

  // --- Category 2: Cards & Surfaces ---
  createRoadmapComponent({
    id: 'cursor-follow-card',
    name: 'Cursor-Follow Card',
    category: 'cards',
    icon: '🧲',
    difficulty: 'intermediate',
    tags: ['card', 'cursor', 'follow', 'proximity'],
    description: 'Card surface with high-precision pointer tracking and magnetic attraction vectors.'
  }),
  createRoadmapComponent({
    id: 'glassmorphism-card',
    name: 'Glassmorphism Card',
    category: 'cards',
    icon: '🧊',
    difficulty: 'beginner',
    tags: ['card', 'glass', 'blur', 'backdrop'],
    description: 'Frosted acrylic card surface with hardware backdrop filter blur and light specular borders.'
  }),
  createRoadmapComponent({
    id: 'holographic-card',
    name: 'Holographic Card',
    category: 'cards',
    icon: '💿',
    difficulty: 'advanced',
    tags: ['card', 'holographic', 'foil', 'iridescent'],
    description: 'Dynamic foil iridescence that shimmers with rainbow spectral gradients upon tilt.'
  }),
  createRoadmapComponent({
    id: 'spotlight-card',
    name: 'Spotlight Card',
    category: 'cards',
    icon: '🔦',
    difficulty: 'intermediate',
    tags: ['card', 'spotlight', 'radial', 'lighting'],
    description: 'Radial illumination beam illuminating subtle background texture where pointer is focused.'
  }),
  createRoadmapComponent({
    id: 'floating-card',
    name: 'Floating Card',
    category: 'cards',
    icon: '☁️',
    difficulty: 'beginner',
    tags: ['card', 'floating', 'levitation', 'shadow'],
    description: 'Gentle continuous levitation with dynamic elevation shadows expanding on hover.'
  }),
  createRoadmapComponent({
    id: 'flip-profile-card',
    name: 'Flip Profile Card',
    category: 'cards',
    icon: '🔄',
    difficulty: 'intermediate',
    tags: ['card', 'flip', '3d', 'profile'],
    description: 'Smooth 180-degree 3D perspective flip between profile front and telemetry details.'
  }),
  createRoadmapComponent({
    id: 'expandable-card',
    name: 'Expandable Card',
    category: 'cards',
    icon: '📐',
    difficulty: 'intermediate',
    tags: ['card', 'expand', 'accordion', 'layout'],
    description: 'Card that morphs its bounds smoothly to reveal extended content using curved motion.'
  }),

  // --- Category 3: Text & Typography ---
  createRoadmapComponent({
    id: 'word-reveal',
    name: 'Word-by-Word Reveal',
    category: 'text',
    icon: '📖',
    difficulty: 'beginner',
    tags: ['text', 'words', 'reveal', 'editorial'],
    description: 'Sequential word entrance with spring stagger timing and soft blur transitions.'
  }),
  createRoadmapComponent({
    id: 'gradient-flow-text',
    name: 'Gradient Flow Text',
    category: 'text',
    icon: '🌊',
    difficulty: 'intermediate',
    tags: ['text', 'gradient', 'flow', 'shimmer'],
    description: 'Multi-hue linear gradient continually flowing through typography strokes.'
  }),
  createRoadmapComponent({
    id: 'glitch-text',
    name: 'Glitch Text',
    category: 'text',
    icon: '👾',
    difficulty: 'advanced',
    tags: ['text', 'glitch', 'cyberpunk', 'rgb'],
    description: 'Cyberpunk RGB chromatic aberration split with high-frequency micro-displacements.'
  }),
  createRoadmapComponent({
    id: 'scramble-text',
    name: 'Scramble Text',
    category: 'text',
    icon: '🔐',
    difficulty: 'intermediate',
    tags: ['text', 'scramble', 'decoder', 'hacker'],
    description: 'Matrix decoder animation cycling through random glyphs before resolving into target string.'
  }),
  createRoadmapComponent({
    id: 'text-wave',
    name: 'Text Wave',
    category: 'text',
    icon: '〰️',
    difficulty: 'intermediate',
    tags: ['text', 'wave', 'sine', 'undulation'],
    description: 'Continuous vertical sine-wave undulating through individual typography characters.'
  }),
  createRoadmapComponent({
    id: 'morphing-text',
    name: 'Morphing Text',
    category: 'text',
    icon: '🔤',
    difficulty: 'advanced',
    tags: ['text', 'morph', 'crossfade', 'typography'],
    description: 'Fluid text transition that blurs and scales characters during message changes.'
  }),

  // --- Category 4: Loaders & Progress ---
  createRoadmapComponent({
    id: 'orbit-loader',
    name: 'Orbit Loader',
    category: 'loaders',
    icon: '🪐',
    difficulty: 'intermediate',
    tags: ['loader', 'orbit', 'planetary', 'spinner'],
    description: 'Concentric planetary rings rotating with variable orbital velocities and neon trails.'
  }),
  createRoadmapComponent({
    id: 'particle-loader',
    name: 'Particle Loader',
    category: 'loaders',
    icon: '✨',
    difficulty: 'advanced',
    tags: ['loader', 'particles', 'vortex', 'progress'],
    description: 'Vortex of glowing micro-particles converging into a focal point during asynchronous tasks.'
  }),
  createRoadmapComponent({
    id: 'liquid-loader',
    name: 'Liquid Loader',
    category: 'loaders',
    icon: '🧪',
    difficulty: 'advanced',
    tags: ['loader', 'liquid', 'gooey', 'metaballs'],
    description: 'Gooey viscous metaballs merging and separating with surface tension dynamics.'
  }),
  createRoadmapComponent({
    id: 'circular-progress-ring',
    name: 'Circular Progress Ring',
    category: 'loaders',
    icon: '⭕',
    difficulty: 'beginner',
    tags: ['loader', 'circular', 'ring', 'progress'],
    description: 'Precision radial ring with gradient stroke and animated percentage count.'
  }),
  createRoadmapComponent({
    id: 'wave-loader',
    name: 'Wave Loader',
    category: 'loaders',
    icon: '🌊',
    difficulty: 'intermediate',
    tags: ['loader', 'wave', 'bars', 'audio'],
    description: 'Vertical oscillating bars reacting with procedural phase-shifted wave frequencies.'
  }),
  createRoadmapComponent({
    id: 'dot-matrix-loader',
    name: 'Dot Matrix Loader',
    category: 'loaders',
    icon: '⠋',
    difficulty: 'beginner',
    tags: ['loader', 'dots', 'matrix', 'spinner'],
    description: 'Geometric dot grid pulsing sequentially with progressive brightness trails.'
  }),
  createRoadmapComponent({
    id: 'morphing-blob-loader',
    name: 'Morphing Blob Loader',
    category: 'loaders',
    icon: '🫧',
    difficulty: 'intermediate',
    tags: ['loader', 'blob', 'organic', 'spline'],
    description: 'Organic spline polygon that continuously shifts control vertices smoothly.'
  }),
  createRoadmapComponent({
    id: 'segmented-progress-bar',
    name: 'Segmented Progress Bar',
    category: 'loaders',
    icon: '📶',
    difficulty: 'beginner',
    tags: ['loader', 'segmented', 'steps', 'indicator'],
    description: 'Multi-step segmented progress bar with staggered glowing fill animations.'
  }),
  createRoadmapComponent({
    id: 'animated-number-counter',
    name: 'Animated Number Counter',
    category: 'loaders',
    icon: '🔢',
    difficulty: 'beginner',
    tags: ['loader', 'counter', 'odometer', 'numbers'],
    description: 'Odometer-style rolling numeric digits with cubic easing and formatting.'
  }),

  // --- Category 5: Navigation & Menus ---
  createRoadmapComponent({
    id: 'animated-bottom-nav',
    name: 'Animated Bottom Navigation',
    category: 'navigation',
    icon: '📱',
    difficulty: 'intermediate',
    tags: ['navigation', 'bottom-bar', 'tabs', 'mobile'],
    description: 'Mobile navigation bar featuring sliding active indicator and icon spring bounces.'
  }),
  createRoadmapComponent({
    id: 'floating-dock',
    name: 'Floating Dock',
    category: 'navigation',
    icon: '🖥️',
    difficulty: 'advanced',
    tags: ['navigation', 'dock', 'macos', 'magnification'],
    description: 'macOS-inspired floating icon dock with parabolic proximity magnification.'
  }),
  createRoadmapComponent({
    id: 'expanding-menu',
    name: 'Expanding Menu',
    category: 'navigation',
    icon: '📑',
    difficulty: 'intermediate',
    tags: ['navigation', 'expand', 'accordion', 'menu'],
    description: 'Tree menu with staggered child node reveals and rotating chevron indicators.'
  }),
  createRoadmapComponent({
    id: 'radial-menu',
    name: 'Radial Menu',
    category: 'navigation',
    icon: '🧭',
    difficulty: 'advanced',
    tags: ['navigation', 'radial', 'pie', 'fan-out'],
    description: 'Circular pie menu fanning out options symmetrically around the trigger point.'
  }),
  createRoadmapComponent({
    id: 'morphing-hamburger',
    name: 'Morphing Hamburger',
    category: 'navigation',
    icon: '🍔',
    difficulty: 'beginner',
    tags: ['navigation', 'hamburger', 'icon', 'cross'],
    description: 'Three-line menu icon transitioning cleanly into an exit cross with spring curves.'
  }),
  createRoadmapComponent({
    id: 'animated-sidebar',
    name: 'Animated Sidebar',
    category: 'navigation',
    icon: '📐',
    difficulty: 'intermediate',
    tags: ['navigation', 'sidebar', 'drawer', 'collapsible'],
    description: 'Collapsible desktop navigation sidebar with smooth width interpolation and icon tooltips.'
  }),
  createRoadmapComponent({
    id: 'pill-tab-switcher',
    name: 'Pill Tab Switcher',
    category: 'navigation',
    icon: '💊',
    difficulty: 'beginner',
    tags: ['navigation', 'tabs', 'segmented', 'pill'],
    description: 'Compact capsule tab switcher with physical sliding indicator pill.'
  }),
  createRoadmapComponent({
    id: 'breadcrumb-reveal',
    name: 'Breadcrumb Reveal',
    category: 'navigation',
    icon: '🍞',
    difficulty: 'beginner',
    tags: ['navigation', 'breadcrumbs', 'hierarchy', 'path'],
    description: 'Navigation path with staggered entry of parent crumb links and slash dividers.'
  }),

  // --- Category 6: Page & Route Transitions ---
  createRoadmapComponent({
    id: 'fade-through-transition',
    name: 'Fade Through Transition',
    category: 'transitions',
    icon: '🔀',
    difficulty: 'intermediate',
    tags: ['transition', 'fade', 'material', 'route'],
    description: 'Material Design fade-through pattern scaling and cross-fading destination views.'
  }),
  createRoadmapComponent({
    id: 'shared-axis-transition',
    name: 'Shared-Axis Transition',
    category: 'transitions',
    icon: '↔️',
    difficulty: 'intermediate',
    tags: ['transition', 'shared-axis', 'slide', 'route'],
    description: 'Directional slide along X, Y, or Z axis maintaining spatial context during route changes.'
  }),
  createRoadmapComponent({
    id: 'hero-image-transition',
    name: 'Hero Image Transition',
    category: 'transitions',
    icon: '🦸',
    difficulty: 'intermediate',
    tags: ['transition', 'hero', 'morph', 'bounds'],
    description: 'Seamless bounding box expansion of image elements across navigation stacks.'
  }),
  createRoadmapComponent({
    id: 'cube-transition-3d',
    name: '3D Cube Transition',
    category: 'transitions',
    icon: '🎲',
    difficulty: 'advanced',
    tags: ['transition', '3d', 'cube', 'perspective'],
    description: 'Rotates existing page away on a 3D polygonal cube face while the next page arrives.'
  }),
  createRoadmapComponent({
    id: 'diagonal-wipe',
    name: 'Diagonal Wipe',
    category: 'transitions',
    icon: '📐',
    difficulty: 'intermediate',
    tags: ['transition', 'wipe', 'diagonal', 'mask'],
    description: 'High-speed diagonal clip path wipe revealing incoming view with angled energy.'
  }),
  createRoadmapComponent({
    id: 'zoom-page-transition',
    name: 'Zoom Page Transition',
    category: 'transitions',
    icon: '🔍',
    difficulty: 'intermediate',
    tags: ['transition', 'zoom', 'scale', 'route'],
    description: 'Dynamic zoom out of active screen followed by high-speed zoom into selected child.'
  }),
  createRoadmapComponent({
    id: 'slide-fade-route',
    name: 'Slide-and-Fade Route',
    category: 'transitions',
    icon: '↗️',
    difficulty: 'beginner',
    tags: ['transition', 'slide', 'fade', 'smooth'],
    description: 'Classic Apple iOS style route push with parabolic slide and backdrop dimming.'
  }),
  createRoadmapComponent({
    id: 'morphing-container-transition',
    name: 'Morphing Container Transition',
    category: 'transitions',
    icon: '📦',
    difficulty: 'advanced',
    tags: ['transition', 'container', 'morph', 'expand'],
    description: 'Smooth physical expansion of card container into a fullscreen modal surface.'
  }),
  createRoadmapComponent({
    id: 'liquid-page-transition',
    name: 'Liquid Page Transition',
    category: 'transitions',
    icon: '🌊',
    difficulty: 'advanced',
    tags: ['transition', 'liquid', 'wave', 'canvas'],
    description: 'Organic sine wave curtain sweeping across the viewport to refresh the screen.'
  }),

  // --- Category 7: Modals & Overlays ---
  createRoadmapComponent({
    id: 'spring-modal',
    name: 'Spring Modal',
    category: 'overlays',
    icon: '🪟',
    difficulty: 'intermediate',
    tags: ['modal', 'spring', 'dialog', 'popup'],
    description: 'Centered dialog window entering with spring overshoot physics and subtle rotation.'
  }),
  createRoadmapComponent({
    id: 'bottom-sheet-slide',
    name: 'Bottom Sheet Slide',
    category: 'overlays',
    icon: '📋',
    difficulty: 'intermediate',
    tags: ['modal', 'bottom-sheet', 'slide', 'gesture'],
    description: 'Mobile sheet sliding smoothly from the bottom with draggable dismissal threshold.'
  }),
  createRoadmapComponent({
    id: 'expandable-bottom-sheet',
    name: 'Expandable Bottom Sheet',
    category: 'overlays',
    icon: '↕️',
    difficulty: 'advanced',
    tags: ['modal', 'bottom-sheet', 'snap', 'expand'],
    description: 'Multi-snap bottom sheet supporting collapsed, half, and expanded scrollable states.'
  }),
  createRoadmapComponent({
    id: 'blur-backdrop-dialog',
    name: 'Blur-Backdrop Dialog',
    category: 'overlays',
    icon: '🌫️',
    difficulty: 'beginner',
    tags: ['modal', 'dialog', 'blur', 'glass'],
    description: 'Modal overlay with progressive Gaussian blur diffusion across the underlying view.'
  }),
  createRoadmapComponent({
    id: 'fullscreen-modal-reveal',
    name: 'Fullscreen Modal Reveal',
    category: 'overlays',
    icon: '📺',
    difficulty: 'intermediate',
    tags: ['modal', 'fullscreen', 'circular', 'reveal'],
    description: 'Fullscreen takeover expanding circularly from the coordinate of the trigger button.'
  }),
  createRoadmapComponent({
    id: 'toast-pop-in',
    name: 'Toast Pop-In',
    category: 'overlays',
    icon: '🍞',
    difficulty: 'beginner',
    tags: ['modal', 'toast', 'notification', 'feedback'],
    description: 'Brief feedback pill popping in from screen edge with countdown progress bar.'
  }),
  createRoadmapComponent({
    id: 'snackbar-slide',
    name: 'Snackbar Slide',
    category: 'overlays',
    icon: '📢',
    difficulty: 'beginner',
    tags: ['modal', 'snackbar', 'slide', 'action'],
    description: 'Actionable bottom notification sliding into view with action button trigger.'
  }),
  createRoadmapComponent({
    id: 'popover-morph',
    name: 'Popover Morph',
    category: 'overlays',
    icon: '💬',
    difficulty: 'intermediate',
    tags: ['modal', 'popover', 'bubble', 'tooltip'],
    description: 'Anchored speech-bubble popover pointing directly to trigger widget with spring entry.'
  }),
  createRoadmapComponent({
    id: 'notification-stack',
    name: 'Notification Stack',
    category: 'overlays',
    icon: '📚',
    difficulty: 'advanced',
    tags: ['modal', 'notifications', 'stack', 'toast'],
    description: 'Interactive deck of notifications that stack, collapse, and swipe away individually.'
  }),

  // --- Category 8: Gestures & Physics ---
  createRoadmapComponent({
    id: 'rubber-band-drag',
    name: 'Rubber-Band Drag',
    category: 'gestures',
    icon: '🪢',
    difficulty: 'intermediate',
    tags: ['gesture', 'rubber-band', 'drag', 'physics'],
    description: 'Physical dragging with exponential resistance curve simulating rubber-band elasticity.'
  }),
  createRoadmapComponent({
    id: 'spring-drag-object',
    name: 'Spring Drag Object',
    category: 'gestures',
    icon: '🧲',
    difficulty: 'intermediate',
    tags: ['gesture', 'spring', 'drag', 'snap'],
    description: 'Draggable token that snaps back to origin with damped harmonic oscillator physics.'
  }),
  createRoadmapComponent({
    id: 'swipe-carousel',
    name: 'Swipe Carousel',
    category: 'gestures',
    icon: '🎠',
    difficulty: 'intermediate',
    tags: ['gesture', 'carousel', 'swipe', 'paging'],
    description: 'Touch-draggable card gallery with velocity-aware page snapping and focal zoom.'
  }),
  createRoadmapComponent({
    id: 'pull-to-refresh',
    name: 'Pull-to-Refresh',
    category: 'gestures',
    icon: '🔄',
    difficulty: 'intermediate',
    tags: ['gesture', 'pull-to-refresh', 'spinner', 'list'],
    description: 'Overscroll gesture that charges an elastic neon indicator to trigger data refresh.'
  }),
  createRoadmapComponent({
    id: 'draggable-floating-widget',
    name: 'Draggable Floating Widget',
    category: 'gestures',
    icon: '📌',
    difficulty: 'intermediate',
    tags: ['gesture', 'draggable', 'pip', 'overlay'],
    description: 'Picture-in-picture floating widget that can be positioned anywhere and snaps to edges.'
  }),
  createRoadmapComponent({
    id: 'inertial-scrolling',
    name: 'Inertial Scrolling',
    category: 'gestures',
    icon: '🏎️',
    difficulty: 'intermediate',
    tags: ['gesture', 'inertia', 'momentum', 'scroll'],
    description: 'Physics simulation preserving touch fling momentum with natural surface friction.'
  }),
  createRoadmapComponent({
    id: 'elastic-overscroll',
    name: 'Elastic Overscroll',
    category: 'gestures',
    icon: '📐',
    difficulty: 'beginner',
    tags: ['gesture', 'overscroll', 'bounce', 'edge'],
    description: 'iOS-like bounce when pulling beyond the boundary of scrollable viewports.'
  }),
  createRoadmapComponent({
    id: 'swipe-reveal-actions',
    name: 'Swipe-to-Reveal Actions',
    category: 'gestures',
    icon: '↔️',
    difficulty: 'intermediate',
    tags: ['gesture', 'swipe', 'actions', 'list'],
    description: 'Horizontal pan on list item uncovering contextual action buttons underneath.'
  }),
  createRoadmapComponent({
    id: 'gesture-driven-reveal',
    name: 'Gesture-Driven Reveal',
    category: 'gestures',
    icon: '🖐️',
    difficulty: 'advanced',
    tags: ['gesture', 'interactive', 'drag', 'reveal'],
    description: 'Direct interactive manipulation mapping pointer displacement directly to animation progress.'
  }),

  // --- Category 9: Backgrounds & Ambience ---
  createRoadmapComponent({
    id: 'aurora-background',
    name: 'Aurora Background',
    category: 'backgrounds',
    icon: '🌌',
    difficulty: 'advanced',
    tags: ['background', 'aurora', 'borealis', 'mesh'],
    description: 'Northern lights simulation with undulating luminescent wave curtains across dark skies.'
  }),
  createRoadmapComponent({
    id: 'starfield-motion',
    name: 'Starfield Motion',
    category: 'backgrounds',
    icon: '✨',
    difficulty: 'intermediate',
    tags: ['background', 'stars', 'space', 'warp'],
    description: 'Hyperspace starfield simulation with stars accelerating toward the viewer in 3D.'
  }),
  createRoadmapComponent({
    id: 'interactive-constellation',
    name: 'Interactive Constellation',
    category: 'backgrounds',
    icon: '🕸️',
    difficulty: 'advanced',
    tags: ['background', 'constellation', 'network', 'canvas'],
    description: 'Floating nodes connecting dynamic proximity lines that attract toward user cursor.'
  }),
  createRoadmapComponent({
    id: 'liquid-blob-background',
    name: 'Liquid Blob Background',
    category: 'backgrounds',
    icon: '🫧',
    difficulty: 'advanced',
    tags: ['background', 'liquid', 'blobs', 'ambient'],
    description: 'Organic floating metaballs with smooth chromatic diffusion and fluid collisions.'
  }),
  createRoadmapComponent({
    id: 'animated-grid',
    name: 'Animated Grid',
    category: 'backgrounds',
    icon: '📐',
    difficulty: 'beginner',
    tags: ['background', 'grid', 'matrix', 'tech'],
    description: 'Retro-futuristic perspective grid moving endlessly toward horizon line.'
  }),

  // --- Category 10: 3D & Perspective ---
  createRoadmapComponent({
    id: 'flip-tile-3d',
    name: '3D Flip Tile',
    category: 'three-d',
    icon: '🔄',
    difficulty: 'intermediate',
    tags: ['3d', 'flip', 'tile', 'matrix4'],
    description: 'Interactive square tile performing full 3D flip on axis upon pointer interaction.'
  }),
  createRoadmapComponent({
    id: 'rotating-cube-3d',
    name: '3D Rotating Cube',
    category: 'three-d',
    icon: '🎲',
    difficulty: 'advanced',
    tags: ['3d', 'cube', 'matrix4', 'perspective'],
    description: 'Six-sided polygon cube rendered with Matrix4 perspective transform and dynamic lighting.'
  }),
  createRoadmapComponent({
    id: 'parallax-depth-card',
    name: 'Parallax Depth Card',
    category: 'three-d',
    icon: '🖼️',
    difficulty: 'intermediate',
    tags: ['3d', 'parallax', 'depth', 'layers'],
    description: 'Multi-layer foreground and background translating at differential rates upon mouse move.'
  }),
  createRoadmapComponent({
    id: 'perspective-image-tilt',
    name: 'Perspective Image Tilt',
    category: 'three-d',
    icon: '📐',
    difficulty: 'intermediate',
    tags: ['3d', 'tilt', 'photo', 'matrix4'],
    description: 'Photography card that pitches and rolls smoothly following mouse cursor vectors.'
  }),
  createRoadmapComponent({
    id: 'orbiting-elements',
    name: 'Orbiting Elements',
    category: 'three-d',
    icon: '🪐',
    difficulty: 'advanced',
    tags: ['3d', 'orbit', 'elliptical', 'depth'],
    description: 'Interactive tokens revolving around a center anchor in an elliptical 3D plane.'
  }),
  createRoadmapComponent({
    id: 'rotating-product-showcase',
    name: 'Rotating Product Showcase',
    category: 'three-d',
    icon: '👟',
    difficulty: 'advanced',
    tags: ['3d', 'product', 'rotation', 'ecommerce'],
    description: 'Continuous 360-degree turntable showcasing product details with lighting speculars.'
  }),
  createRoadmapComponent({
    id: 'layered-stack-3d',
    name: '3D Layered Stack',
    category: 'three-d',
    icon: '📚',
    difficulty: 'intermediate',
    tags: ['3d', 'stack', 'layers', 'depth'],
    description: 'Isometric isometric view separating UI layers along the Z-axis on hover.'
  }),
  createRoadmapComponent({
    id: 'perspective-text',
    name: 'Perspective Text',
    category: 'three-d',
    icon: '🔤',
    difficulty: 'intermediate',
    tags: ['3d', 'text', 'perspective', 'starwars'],
    description: 'Cinematic typography crawling upward into receding 3D vanishing point.'
  }),
  createRoadmapComponent({
    id: 'interactive-globe',
    name: 'Interactive Globe',
    category: 'three-d',
    icon: '🌐',
    difficulty: 'advanced',
    tags: ['3d', 'globe', 'sphere', 'world'],
    description: 'Rotatable sphere plotted with dot coordinates representing global connections.'
  }),

  // --- Category 11: Images & Media ---
  createRoadmapComponent({
    id: 'image-zoom-reveal',
    name: 'Image Zoom Reveal',
    category: 'media',
    icon: '🔍',
    difficulty: 'beginner',
    tags: ['media', 'zoom', 'image', 'reveal'],
    description: 'Image scaling smoothly from 1.2x to 1.0x with subtle focus blur clearing.'
  }),
  createRoadmapComponent({
    id: 'ken-burns-image',
    name: 'Ken Burns Image',
    category: 'media',
    icon: '🎬',
    difficulty: 'intermediate',
    tags: ['media', 'ken-burns', 'pan', 'documentary'],
    description: 'Slow documentary-style camera pan and zoom across high-resolution imagery.'
  }),
  createRoadmapComponent({
    id: 'image-comparison-slider',
    name: 'Image Comparison Slider',
    category: 'media',
    icon: '↔️',
    difficulty: 'intermediate',
    tags: ['media', 'comparison', 'slider', 'before-after'],
    description: 'Draggable horizontal divider revealing before and after imagery interactively.'
  }),
  createRoadmapComponent({
    id: 'diagonal-image-reveal',
    name: 'Diagonal Image Reveal',
    category: 'media',
    icon: '📐',
    difficulty: 'intermediate',
    tags: ['media', 'diagonal', 'mask', 'wipe'],
    description: 'Angled polygon clipping path expanding diagonally to unveil photographs.'
  }),
  createRoadmapComponent({
    id: 'image-blur-to-sharp',
    name: 'Image Blur-to-Sharp',
    category: 'media',
    icon: '🌫️',
    difficulty: 'beginner',
    tags: ['media', 'blur', 'sharp', 'progressive'],
    description: 'Progressive transition from heavy Gaussian blur to pristine sharpness on load.'
  }),
  createRoadmapComponent({
    id: 'image-mask-transition',
    name: 'Image Mask Transition',
    category: 'media',
    icon: '🎭',
    difficulty: 'advanced',
    tags: ['media', 'mask', 'svg', 'transition'],
    description: 'SVG geometric shapes expanding and morphing to reveal media underneath.'
  }),
  createRoadmapComponent({
    id: 'circular-image-reveal',
    name: 'Circular Image Reveal',
    category: 'media',
    icon: '⭕',
    difficulty: 'intermediate',
    tags: ['media', 'circular', 'clip', 'expansion'],
    description: 'Expanding circular iris mask expanding from center point to reveal photograph.'
  }),
  createRoadmapComponent({
    id: 'masonry-grid-entrance',
    name: 'Masonry Grid Entrance',
    category: 'media',
    icon: '🧱',
    difficulty: 'intermediate',
    tags: ['media', 'masonry', 'grid', 'stagger'],
    description: 'Staggered cascading entrance of variable-height Pinterest-style image tiles.'
  }),
  createRoadmapComponent({
    id: 'video-thumbnail-hover',
    name: 'Video Thumbnail Hover',
    category: 'media',
    icon: '▶️',
    difficulty: 'intermediate',
    tags: ['media', 'video', 'thumbnail', 'hover'],
    description: 'Animated thumbnail scrubbing through preview frame keyframes on pointer hover.'
  }),

  // --- Category 12: Charts & Data Viz ---
  createRoadmapComponent({
    id: 'animated-line-chart',
    name: 'Animated Line Chart',
    category: 'charts',
    icon: '📈',
    difficulty: 'advanced',
    tags: ['charts', 'line', 'svg', 'data'],
    description: 'Spline curve drawing smoothly from left to right with glowing data points.'
  }),
  createRoadmapComponent({
    id: 'growing-bar-chart',
    name: 'Growing Bar Chart',
    category: 'charts',
    icon: '📊',
    difficulty: 'beginner',
    tags: ['charts', 'bars', 'growth', 'stagger'],
    description: 'Vertical telemetry bars growing from base with staggered spring timing.'
  }),
  createRoadmapComponent({
    id: 'donut-chart-reveal',
    name: 'Donut Chart Reveal',
    category: 'charts',
    icon: '🍩',
    difficulty: 'intermediate',
    tags: ['charts', 'donut', 'pie', 'radial'],
    description: 'Circular segments sweeping clockwise to illustrate proportional metric shares.'
  }),
  createRoadmapComponent({
    id: 'radial-statistics',
    name: 'Radial Statistics',
    category: 'charts',
    icon: '🎯',
    difficulty: 'intermediate',
    tags: ['charts', 'radial', 'progress', 'metrics'],
    description: 'Multi-ring fitness tracker dial rendering nested telemetry goals.'
  }),
  createRoadmapComponent({
    id: 'animated-area-chart',
    name: 'Animated Area Chart',
    category: 'charts',
    icon: '📉',
    difficulty: 'advanced',
    tags: ['charts', 'area', 'gradient', 'canvas'],
    description: 'Gradient filled area chart interpolating smoothly as data arrays update.'
  }),
  createRoadmapComponent({
    id: 'number-flip-counter',
    name: 'Number Flip Counter',
    category: 'charts',
    icon: '📟',
    difficulty: 'intermediate',
    tags: ['charts', 'counter', 'flip', 'ticker'],
    description: 'Airport departure board mechanical split-flap display flipping numbers.'
  }),
  createRoadmapComponent({
    id: 'sparkline-reveal',
    name: 'Sparkline Reveal',
    category: 'charts',
    icon: '⚡',
    difficulty: 'beginner',
    tags: ['charts', 'sparkline', 'mini', 'trend'],
    description: 'Compact inline trendline animating rapidly to show stock or metric volatility.'
  }),
  createRoadmapComponent({
    id: 'animated-heatmap',
    name: 'Animated Heatmap',
    category: 'charts',
    icon: '🟩',
    difficulty: 'intermediate',
    tags: ['charts', 'heatmap', 'github', 'grid'],
    description: 'GitHub contribution style calendar grid fading in with color intensity gradients.'
  }),
  createRoadmapComponent({
    id: 'progress-dashboard-cards',
    name: 'Progress Dashboard Cards',
    category: 'charts',
    icon: '🎛️',
    difficulty: 'intermediate',
    tags: ['charts', 'dashboard', 'cards', 'kpi'],
    description: 'Executive dashboard KPI widgets animating summary figures and percentage deltas.'
  }),

  // --- Category 13: Forms & Feedback ---
  createRoadmapComponent({
    id: 'floating-label-input',
    name: 'Floating Label Input',
    category: 'forms',
    icon: '🏷️',
    difficulty: 'beginner',
    tags: ['forms', 'input', 'floating-label', 'material'],
    description: 'Textfield placeholder floating up to the border collar when focused or populated.'
  }),
  createRoadmapComponent({
    id: 'animated-focus-border',
    name: 'Animated Focus Border',
    category: 'forms',
    icon: '🔲',
    difficulty: 'beginner',
    tags: ['forms', 'focus', 'border', 'glow'],
    description: 'Neon stroke expanding symmetrically from center outward upon input focus.'
  }),
  createRoadmapComponent({
    id: 'success-checkmark',
    name: 'Success Checkmark',
    category: 'forms',
    icon: '✅',
    difficulty: 'intermediate',
    tags: ['forms', 'success', 'checkmark', 'svg'],
    description: 'Animated checkmark drawing its path with spring pop circle expansion.'
  }),
  createRoadmapComponent({
    id: 'error-shake-input',
    name: 'Error Shake Input',
    category: 'forms',
    icon: '📳',
    difficulty: 'beginner',
    tags: ['forms', 'error', 'shake', 'validation'],
    description: 'Horizontal damped oscillation shaking input box upon validation failure.'
  }),
  createRoadmapComponent({
    id: 'password-strength-meter',
    name: 'Password Strength Meter',
    category: 'forms',
    icon: '🔑',
    difficulty: 'intermediate',
    tags: ['forms', 'password', 'strength', 'gauge'],
    description: 'Segmented color bar transitioning from red to neon lime as entropy increases.'
  }),
  createRoadmapComponent({
    id: 'otp-input-animation',
    name: 'OTP Input Animation',
    category: 'forms',
    icon: '🔢',
    difficulty: 'intermediate',
    tags: ['forms', 'otp', 'verification', 'code'],
    description: '6-digit PIN boxes with animated neon focus rings and automatic focus hopping.'
  }),
  createRoadmapComponent({
    id: 'checkbox-draw-animation',
    name: 'Checkbox Draw Animation',
    category: 'forms',
    icon: '☑️',
    difficulty: 'beginner',
    tags: ['forms', 'checkbox', 'draw', 'micro'],
    description: 'Tactile check mark drawing itself inside bounding box with spring fill.'
  }),
  createRoadmapComponent({
    id: 'radio-ripple',
    name: 'Radio Ripple',
    category: 'forms',
    icon: '🔘',
    difficulty: 'beginner',
    tags: ['forms', 'radio', 'ripple', 'select'],
    description: 'Center bullet expanding outward with expanding concentric water ripple wave.'
  }),
  createRoadmapComponent({
    id: 'toggle-morph',
    name: 'Toggle Morph',
    category: 'forms',
    icon: '🎚️',
    difficulty: 'beginner',
    tags: ['forms', 'toggle', 'switch', 'morph'],
    description: 'Sliding switch thumb that squashes elastically before snapping to on/off anchor.'
  }),
  createRoadmapComponent({
    id: 'form-step-transition',
    name: 'Form Step Transition',
    category: 'forms',
    icon: '🪜',
    difficulty: 'intermediate',
    tags: ['forms', 'wizard', 'steps', 'multi-step'],
    description: 'Multi-step onboarding form sliding steps horizontally with progress indicator.'
  }),

  // --- Category 14: Lists & Collections ---
  createRoadmapComponent({
    id: 'staggered-list-entrance',
    name: 'Staggered List Entrance',
    category: 'lists',
    icon: '📋',
    difficulty: 'beginner',
    tags: ['lists', 'stagger', 'entrance', 'cascade'],
    description: 'List rows sliding in sequentially with index-based millisecond delay cascades.'
  }),
  createRoadmapComponent({
    id: 'animated-grid-entrance',
    name: 'Animated Grid Entrance',
    category: 'lists',
    icon: '🪟',
    difficulty: 'intermediate',
    tags: ['lists', 'grid', 'entrance', 'stagger'],
    description: '2D grid cells popping into view with diagonal ripple delay coordinates.'
  }),
  createRoadmapComponent({
    id: 'expandable-list-item',
    name: 'Expandable List Item',
    category: 'lists',
    icon: '📂',
    difficulty: 'intermediate',
    tags: ['lists', 'expandable', 'accordion', 'details'],
    description: 'Accordion list item unfolding child view with smooth height curve.'
  }),
  createRoadmapComponent({
    id: 'drag-reorder-list',
    name: 'Drag-Reorder List',
    category: 'lists',
    icon: '↕️',
    difficulty: 'advanced',
    tags: ['lists', 'drag', 'reorder', 'sort'],
    description: 'Interactive dragging to reorder list items with physical displacement shifts.'
  }),
  createRoadmapComponent({
    id: 'swipeable-list-row',
    name: 'Swipeable List Row',
    category: 'lists',
    icon: '👈',
    difficulty: 'intermediate',
    tags: ['lists', 'swipe', 'actions', 'archive'],
    description: 'Horizontal drag revealing archive and delete icons with threshold feedback.'
  }),
  createRoadmapComponent({
    id: 'animated-search-results',
    name: 'Animated Search Results',
    category: 'lists',
    icon: '🔍',
    difficulty: 'intermediate',
    tags: ['lists', 'search', 'filter', 'transition'],
    description: 'Dynamic list filtering with items sliding and fading in/out as query changes.'
  }),
  createRoadmapComponent({
    id: 'filter-chip-transition',
    name: 'Filter Chip Transition',
    category: 'lists',
    icon: '🏷️',
    difficulty: 'beginner',
    tags: ['lists', 'filter', 'chips', 'tags'],
    description: 'Horizontal pill chips expanding and highlighting when toggled.'
  }),
  createRoadmapComponent({
    id: 'list-item-morph',
    name: 'List Item Morph',
    category: 'lists',
    icon: '🔄',
    difficulty: 'advanced',
    tags: ['lists', 'morph', 'detail', 'expand'],
    description: 'Single list row expanding seamlessly to occupy full modal workspace.'
  }),
  createRoadmapComponent({
    id: 'infinite-scroll-reveal',
    name: 'Infinite Scroll Reveal',
    category: 'lists',
    icon: '♾️',
    difficulty: 'intermediate',
    tags: ['lists', 'infinite', 'scroll', 'pagination'],
    description: 'New pagination batches fading in organically as scroll reaches bottom threshold.'
  }),
  createRoadmapComponent({
    id: 'animated-empty-state',
    name: 'Animated Empty State',
    category: 'lists',
    icon: '📭',
    difficulty: 'beginner',
    tags: ['lists', 'empty-state', 'illustration', 'feedback'],
    description: 'Floating empty-box illustration with bobbing icon and call-to-action button.'
  }),

  // --- Category 15: Icons & Micro-interactions ---
  createRoadmapComponent({
    id: 'heart-pop',
    name: 'Heart Pop Animation',
    category: 'micro-interactions',
    icon: '❤️',
    difficulty: 'intermediate',
    tags: ['icons', 'heart', 'like', 'micro-interaction'],
    description: 'Twitter-style heart icon scaling down, popping red, and radiating star burst particles.'
  }),
  createRoadmapComponent({
    id: 'bell-ring',
    name: 'Bell Ring',
    category: 'micro-interactions',
    icon: '🔔',
    difficulty: 'beginner',
    tags: ['icons', 'bell', 'ring', 'alert'],
    description: 'Notification bell swinging back and forth with decaying pendulum physics.'
  }),
  createRoadmapComponent({
    id: 'bookmark-morph',
    name: 'Bookmark Morph',
    category: 'micro-interactions',
    icon: '🔖',
    difficulty: 'beginner',
    tags: ['icons', 'bookmark', 'save', 'morph'],
    description: 'Bookmark ribbon drawing fill path with spring bounce upon saving.'
  }),
  createRoadmapComponent({
    id: 'like-burst',
    name: 'Like Burst',
    category: 'micro-interactions',
    icon: '👍',
    difficulty: 'intermediate',
    tags: ['icons', 'like', 'thumbs-up', 'particles'],
    description: 'Thumbs-up icon punching upward with concentric spark particles.'
  }),
  createRoadmapComponent({
    id: 'icon-spin-transition',
    name: 'Icon Spin Transition',
    category: 'micro-interactions',
    icon: '🔄',
    difficulty: 'beginner',
    tags: ['icons', 'spin', 'rotate', 'settings'],
    description: 'Gear settings icon spinning 180 degrees smoothly on hover or tap.'
  }),
  createRoadmapComponent({
    id: 'icon-draw-on',
    name: 'Icon Draw-On',
    category: 'micro-interactions',
    icon: '✏️',
    difficulty: 'intermediate',
    tags: ['icons', 'draw', 'svg', 'stroke'],
    description: 'Vector stroke outlining icon paths progressively from start to finish.'
  }),
  createRoadmapComponent({
    id: 'copy-success-animation',
    name: 'Copy Success Animation',
    category: 'micro-interactions',
    icon: '📋',
    difficulty: 'beginner',
    tags: ['icons', 'copy', 'clipboard', 'check'],
    description: 'Clipboard icon flipping smoothly into green verification checkmark.'
  }),
  createRoadmapComponent({
    id: 'theme-switch-animation',
    name: 'Theme Switch Animation',
    category: 'micro-interactions',
    icon: '🌓',
    difficulty: 'intermediate',
    tags: ['icons', 'theme', 'sun', 'moon'],
    description: 'Sun icon rays retracting and transforming into crescent moon on theme toggle.'
  }),
  createRoadmapComponent({
    id: 'cart-add-animation',
    name: 'Cart Add Animation',
    category: 'micro-interactions',
    icon: '🛒',
    difficulty: 'advanced',
    tags: ['icons', 'cart', 'ecommerce', 'flying'],
    description: 'Item thumbnail flying along parabolic arc directly into shopping cart badge.'
  }),
  createRoadmapComponent({
    id: 'drag-handle-feedback',
    name: 'Drag Handle Feedback',
    category: 'micro-interactions',
    icon: '⠿',
    difficulty: 'beginner',
    tags: ['icons', 'handle', 'drag', 'haptic'],
    description: 'Six-dot grip handle expanding and highlighting under active touch.'
  }),

  // --- Category 16: Motion Experiments ---
  createRoadmapComponent({
    id: 'particle-explosion',
    name: 'Particle Explosion',
    category: 'experiments',
    icon: '🎆',
    difficulty: 'advanced',
    tags: ['experiments', 'particles', 'explosion', 'physics'],
    description: 'Kinetic fireworks simulation with gravity vectors and drag deceleration.'
  }),
  createRoadmapComponent({
    id: 'text-to-particle',
    name: 'Text-to-Particle Effect',
    category: 'experiments',
    icon: '💨',
    difficulty: 'advanced',
    tags: ['experiments', 'text', 'particles', 'disperse'],
    description: 'Rasterized text letters disintegrating into swirling particles upon cursor touch.'
  }),
  createRoadmapComponent({
    id: 'svg-path-drawing',
    name: 'SVG Path Drawing',
    category: 'experiments',
    icon: '🖋️',
    difficulty: 'intermediate',
    tags: ['experiments', 'svg', 'path', 'draw'],
    description: 'Complex architectural SVG illustration drawing its path vectors sequentially.'
  }),
  createRoadmapComponent({
    id: 'morphing-svg-shapes',
    name: 'Morphing SVG Shapes',
    category: 'experiments',
    icon: '🔷',
    difficulty: 'advanced',
    tags: ['experiments', 'svg', 'morph', 'geometry'],
    description: 'Cubic bezier spline morphing between circle, star, polygon, and triangle.'
  }),
  createRoadmapComponent({
    id: 'liquid-metal-effect',
    name: 'Liquid Metal Effect',
    category: 'experiments',
    icon: '🪙',
    difficulty: 'advanced',
    tags: ['experiments', 'liquid', 'metal', 'chrome'],
    description: 'Chrome liquid reflection behaving like liquid mercury under cursor gravity.'
  }),
  createRoadmapComponent({
    id: 'magnetic-cursor-field',
    name: 'Magnetic Cursor Field',
    category: 'experiments',
    icon: '🧲',
    difficulty: 'advanced',
    tags: ['experiments', 'magnetic', 'field', 'vectors'],
    description: 'Grid of vector needles deflecting to track cursor coordinates across viewport.'
  }),
  createRoadmapComponent({
    id: 'waveform-visualizer',
    name: 'Waveform Visualizer',
    category: 'experiments',
    icon: '🎚️',
    difficulty: 'advanced',
    tags: ['experiments', 'audio', 'waveform', 'frequency'],
    description: 'Real-time procedural audio spectrum analyzer with glowing vertical frequency bars.'
  }),
  createRoadmapComponent({
    id: 'animated-logo-reveal',
    name: 'Animated Logo Reveal',
    category: 'experiments',
    icon: '⚡',
    difficulty: 'intermediate',
    tags: ['experiments', 'logo', 'brand', 'reveal'],
    description: 'DartNova lightning bolt drawing its path with radial neon halo explosion.'
  }),
  createRoadmapComponent({
    id: 'confetti-celebration',
    name: 'Confetti Celebration',
    category: 'experiments',
    icon: '🎉',
    difficulty: 'intermediate',
    tags: ['experiments', 'confetti', 'party', 'celebration'],
    description: 'Two-cannon confetti blast with physical rotation, fluttering, and gravity drag.'
  })
];
