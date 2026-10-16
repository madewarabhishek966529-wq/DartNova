/**
 * DartNova Page & Route Transitions Visualizers (26 Bespoke Modern UI Components)
 * 120 FPS hardware-accelerated animations with interactive mouse/touch triggers
 */

export function renderTransitionVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('welcome') || id === 'animated-welcome-screen') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#0B0D12; cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div class="ws-logo" style="width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg, ${accent}, #42E8F5); display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:900; color:#08090B; box-shadow:0 0 16px ${accent}66; transition:all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);">⚡</div>
      <div class="ws-text" style="font-size:10px; font-weight:900; letter-spacing:2px; color:#FFF; margin-top:6px; font-family:var(--font-display); opacity:0; transform:translateY(6px); transition:all 0.3s ease 0.15s;">DARTNOVA</div>
      <div style="font-size:7px; color:var(--text-muted); margin-top:2px;">Tap to trigger splash portal</div>
    `;
    const logo = wrap.querySelector('.ws-logo');
    const text = wrap.querySelector('.ws-text');
    const playSplash = () => {
      logo.style.transform = 'scale(0.4)';
      text.style.opacity = '0';
      text.style.transform = 'translateY(6px)';
      setTimeout(() => {
        logo.style.transform = 'scale(1.15) rotate(10deg)';
        setTimeout(() => {
          logo.style.transform = 'scale(1) rotate(0deg)';
          text.style.opacity = '1';
          text.style.transform = 'translateY(0)';
        }, 180);
      }, 50);
    };
    playSplash();
    wrap.addEventListener('click', playSplash);
    stage.appendChild(wrap);
    restartFn = playSplash;

  } else if (id.includes('shared-axis') || id === 'shared-axis-transition') {
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

  } else if (id.includes('hero') || id === 'hero-image-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#10131A; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div class="hero-target" style="width:85px; height:55px; border-radius:8px; background:linear-gradient(135deg, #FF6B6B, #4ECDC4, ${accent}); position:relative; overflow:hidden; transition:all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow:0 8px 18px rgba(0,0,0,0.5); display:flex; flex-direction:column; justify-content:flex-end; padding:6px; box-sizing:border-box;">
        <div class="hero-chip" style="font-size:7px; font-weight:800; background:rgba(0,0,0,0.6); color:#FFF; padding:2px 4px; border-radius:3px; align-self:flex-start;">HERO #01</div>
        <div class="hero-sub" style="font-size:8px; font-weight:800; color:#FFF; margin-top:2px;">Tap Expand</div>
      </div>
    `;
    let expanded = false;
    const target = wrap.querySelector('.hero-target');
    const toggleHero = () => {
      expanded = !expanded;
      if (expanded) {
        target.style.width = '100%';
        target.style.height = '100%';
        target.style.borderRadius = '12px';
      } else {
        target.style.width = '85px';
        target.style.height = '55px';
        target.style.borderRadius = '8px';
      }
    };
    wrap.addEventListener('click', toggleHero);
    stage.appendChild(wrap);
    restartFn = toggleHero;

  } else if (id.includes('cube') || id === 'cube-transition-3d') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:500px; width:170px; height:105px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="cube-box" style="width:85px; height:85px; position:relative; transform-style:preserve-3d; transition:transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <div style="position:absolute; inset:0; background:#181F2E; border:1.5px solid ${accent}; border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#FFF; font-size:10px; font-weight:800; transform:translateZ(42px);">
          <span>Face A</span><span style="font-size:8px; color:${accent};">Tap Rotate</span>
        </div>
        <div style="position:absolute; inset:0; background:#221828; border:1.5px solid #FF4B72; border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#FFF; font-size:10px; font-weight:800; transform:rotateY(90deg) translateZ(42px);">
          <span>Face B</span><span style="font-size:8px; color:#FF4B72;">3D Volume</span>
        </div>
      </div>
    `;
    let side = 0;
    const cube = wrap.querySelector('.cube-box');
    const rotateCube = () => {
      side = (side + 1) % 2;
      cube.style.transform = side === 1 ? 'rotateY(-90deg)' : 'rotateY(0deg)';
    };
    wrap.addEventListener('click', rotateCube);
    stage.appendChild(wrap);
    restartFn = rotateCube;

  } else if (id.includes('diagonal-wipe') || id === 'diagonal-wipe') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#11151E; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#FFF; font-size:10px; font-weight:800;">
        <span>Scene A</span><span style="font-size:8px; color:var(--text-muted);">Diagonal Angle</span>
      </div>
      <div class="diag-curtain" style="position:absolute; inset:-50%; background:linear-gradient(135deg, ${accent}, #42E8F5); transform:translateX(-100%) rotate(25deg); transition:transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1); display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:12px;">
        <span style="transform:rotate(-25deg);">Scene B ⚡</span>
      </div>
    `;
    let wiped = false;
    const curtain = wrap.querySelector('.diag-curtain');
    const toggleWipe = () => {
      wiped = !wiped;
      curtain.style.transform = wiped ? 'translateX(0%) rotate(25deg)' : 'translateX(-100%) rotate(25deg)';
    };
    wrap.addEventListener('click', toggleWipe);
    stage.appendChild(wrap);
    restartFn = toggleWipe;

  } else if (id.includes('zoom-page') || id === 'zoom-page-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#121622; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div class="zp-pane" style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#FFF; font-size:10px; font-weight:800; transition:all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <span>🔭 Zoom Portal</span>
        <span style="font-size:8px; color:${accent}; margin-top:4px;">Tap to Scale</span>
      </div>
    `;
    let zoomed = false;
    const pane = wrap.querySelector('.zp-pane');
    const toggleZoom = () => {
      zoomed = !zoomed;
      pane.style.transform = zoomed ? 'scale(1.8)' : 'scale(1)';
      pane.style.opacity = zoomed ? '0.2' : '1';
    };
    wrap.addEventListener('click', toggleZoom);
    stage.appendChild(wrap);
    restartFn = toggleZoom;

  } else if (id.includes('slide-fade-route') || id === 'slide-fade-route') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#10141D; cursor:pointer;';
    wrap.innerHTML = `
      <div class="sfr-card" style="position:absolute; inset:10px; border-radius:8px; background:#171D2B; border:1px solid ${accent}; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#FFF; font-size:10px; font-weight:800; transition:all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);">
        <span>Slide & Fade</span>
        <span style="font-size:8px; color:${accent};">Route Alpha</span>
      </div>
    `;
    let slid = false;
    const card = wrap.querySelector('.sfr-card');
    const toggleSlide = () => {
      slid = !slid;
      card.style.transform = slid ? 'translateX(100px)' : 'none';
      card.style.opacity = slid ? '0' : '1';
      if (slid) setTimeout(() => { card.style.transform = 'none'; card.style.opacity = '1'; }, 400);
    };
    wrap.addEventListener('click', toggleSlide);
    stage.appendChild(wrap);
    restartFn = toggleSlide;

  } else if (id.includes('morphing-container') || id === 'morphing-container-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#101319; border:1px solid #282E3D; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="mc-box" style="width:60px; height:40px; border-radius:8px; background:linear-gradient(135deg, ${accent}, #42E8F5); display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:9px; transition:all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);">
        Morph
      </div>
    `;
    let morphed = false;
    const box = wrap.querySelector('.mc-box');
    const toggleMorph = () => {
      morphed = !morphed;
      box.style.width = morphed ? '150px' : '60px';
      box.style.height = morphed ? '85px' : '40px';
      box.style.borderRadius = morphed ? '10px' : '8px';
    };
    wrap.addEventListener('click', toggleMorph);
    stage.appendChild(wrap);
    restartFn = toggleMorph;

  } else if (id.includes('liquid') || id === 'liquid-page-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3C; background:#11151E; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#FFF; font-size:10px; font-weight:800;">
        <span>🌊 Liquid Base</span>
      </div>
      <div class="lq-wave" style="position:absolute; inset:0; background:linear-gradient(135deg, ${accent}, #42E8F5); transform:translateY(100%); transition:transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1); display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:11px;">
        Sine Wave View ✨
      </div>
    `;
    let wave = false;
    const wv = wrap.querySelector('.lq-wave');
    const toggleWave = () => {
      wave = !wave;
      wv.style.transform = wave ? 'translateY(0%)' : 'translateY(100%)';
    };
    wrap.addEventListener('click', toggleWave);
    stage.appendChild(wrap);
    restartFn = toggleWave;

  } else if (id.includes('curtain-split') || id === 'curtain-split-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#161D2B; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:900; font-size:12px;">STAGE READY ✨</div>
      <div class="cs-left" style="position:absolute; top:0; bottom:0; left:0; width:50%; background:#101319; border-right:1px solid ${accent}; transition:transform 0.4s ease;"></div>
      <div class="cs-right" style="position:absolute; top:0; bottom:0; right:0; width:50%; background:#101319; border-left:1px solid ${accent}; transition:transform 0.4s ease;"></div>
    `;
    let parted = false;
    const [cL, cR] = [wrap.querySelector('.cs-left'), wrap.querySelector('.cs-right')];
    wrap.addEventListener('click', () => {
      parted = !parted;
      cL.style.transform = parted ? 'translateX(-100%)' : 'none';
      cR.style.transform = parted ? 'translateX(100%)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('iris-circle') || id === 'iris-circle-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#101319; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div style="font-size:10px; font-weight:800; color:#FFF;">Iris Camera</div>
      <div class="iris-disc" style="position:absolute; width:10px; height:10px; border-radius:50%; background:${accent}; transition:transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1); opacity:0.85;"></div>
    `;
    let open = false;
    const disc = wrap.querySelector('.iris-disc');
    wrap.addEventListener('click', () => {
      open = !open;
      disc.style.transform = open ? 'scale(24)' : 'scale(1)';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('shutter-blind') || id === 'shutter-blind-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#10141D; cursor:pointer; display:flex; flex-direction:column;';
    for (let i = 0; i < 4; i++) {
      const slat = document.createElement('div');
      slat.style.cssText = `flex:1; background:${accent}33; border-bottom:1px solid ${accent}; transition:transform 0.35s; transform-origin:top center;`;
      slat.className = 'blind-slat';
      wrap.appendChild(slat);
    }
    let flipped = false;
    const slats = wrap.querySelectorAll('.blind-slat');
    wrap.addEventListener('click', () => {
      flipped = !flipped;
      slats.forEach((s, idx) => {
        s.style.transform = flipped ? 'rotateX(85deg)' : 'none';
        s.style.transitionDelay = `${idx * 0.05}s`;
      });
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('origami-fold') || id === 'origami-fold-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:400px; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#121622; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div class="og-paper" style="width:110px; height:70px; background:linear-gradient(135deg, ${accent}, #42E8F5); border-radius:6px; transform-origin:left center; transition:transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1); display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:10px;">
        Origami
      </div>
    `;
    let folded = false;
    const paper = wrap.querySelector('.og-paper');
    wrap.addEventListener('click', () => {
      folded = !folded;
      paper.style.transform = folded ? 'rotateY(-70deg) scale(0.9)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('pixelate-dissolve') || id === 'pixelate-dissolve-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:grid; grid-template-columns:repeat(5, 1fr); width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#101319; cursor:pointer;';
    for (let i = 0; i < 20; i++) {
      const px = document.createElement('div');
      px.style.cssText = `background:${i % 2 === 0 ? accent : '#1C2333'}; opacity:0.8; transition:opacity 0.3s;`;
      px.className = 'px-tile';
      wrap.appendChild(px);
    }
    const tiles = wrap.querySelectorAll('.px-tile');
    wrap.addEventListener('click', () => {
      tiles.forEach((t, i) => {
        t.style.opacity = Math.random() > 0.5 ? '0.1' : '0.9';
      });
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('circular-mask-wipe') || id === 'circular-mask-wipe') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#121622; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:10px; font-weight:800;">Target View</div>
      <div class="cm-mask" style="position:absolute; inset:0; background:${accent}; color:#08090B; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:11px; clip-path:circle(100% at 50% 50%); transition:clip-path 0.4s ease;">
        Circular Mask
      </div>
    `;
    let wiped = false;
    const mask = wrap.querySelector('.cm-mask');
    wrap.addEventListener('click', () => {
      wiped = !wiped;
      mask.style.clipPath = wiped ? 'circle(0% at 50% 50%)' : 'circle(100% at 50% 50%)';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('flip-page-book') || id === 'flip-page-book') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:400px; width:170px; height:105px; border-radius:12px; background:#101319; border:1px solid #282E3D; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="fpb-page" style="width:70px; height:80px; background:#181F2E; border:1.5px solid ${accent}; border-radius:4px; transform-origin:left center; transition:transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); display:flex; flex-direction:column; align-items:center; justify-content:center; color:#FFF; font-size:9px; font-weight:800;">
        <span>Page 01</span><span style="font-size:7px; color:${accent};">Flip ➔</span>
      </div>
    `;
    let flipped = false;
    const page = wrap.querySelector('.fpb-page');
    wrap.addEventListener('click', () => {
      flipped = !flipped;
      page.style.transform = flipped ? 'rotateY(-140deg)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('push-slide-parallax') || id === 'push-slide-parallax') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#0E1118; cursor:pointer;';
    wrap.innerHTML = `
      <div class="psp-bg" style="position:absolute; inset:-20px; background:radial-gradient(circle, ${accent}33, transparent); transition:transform 0.4s ease;"></div>
      <div class="psp-fg" style="position:absolute; inset:10px; border-radius:8px; background:#161C28; border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:10px; font-weight:800; transition:transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">Parallax Push</div>
    `;
    let pushed = false;
    const [bg, fg] = [wrap.querySelector('.psp-bg'), wrap.querySelector('.psp-fg')];
    wrap.addEventListener('click', () => {
      pushed = !pushed;
      bg.style.transform = pushed ? 'translateX(-30px)' : 'none';
      fg.style.transform = pushed ? 'translateX(60px)' : 'none';
      if (pushed) setTimeout(() => { bg.style.transform = 'none'; fg.style.transform = 'none'; }, 400);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('vertical-accordion-wipe') || id === 'vertical-accordion-wipe') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#101319; cursor:pointer; display:flex;';
    for (let i = 0; i < 4; i++) {
      const col = document.createElement('div');
      col.style.cssText = `flex:1; background:${accent}44; border-right:1px solid ${accent}; transition:transform 0.35s; transform-origin:left center;`;
      col.className = 'acc-col';
      wrap.appendChild(col);
    }
    let collapsed = false;
    const cols = wrap.querySelectorAll('.acc-col');
    wrap.addEventListener('click', () => {
      collapsed = !collapsed;
      cols.forEach((c, idx) => {
        c.style.transform = collapsed ? 'scaleX(0)' : 'scaleX(1)';
        c.style.transitionDelay = `${idx * 0.05}s`;
      });
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('kaleidoscope-transition') || id === 'kaleidoscope-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:90px; height:90px; border-radius:50%; overflow:hidden; border:2px solid ${accent}; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `<div class="kal-spin" style="width:100%; height:100%; background:conic-gradient(${accent}, #42E8F5, #9B7CFF, ${accent}); transition:transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); opacity:0.8;"></div>`;
    let angle = 0;
    const spinner = wrap.querySelector('.kal-spin');
    wrap.addEventListener('click', () => {
      angle += 120;
      spinner.style.transform = `rotate(${angle}deg) scale(1.1)`;
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('burn-through') || id === 'burn-through-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#101218; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div style="color:#FFF; font-size:10px; font-weight:800;">Dest View</div>
      <div class="burn-layer" style="position:absolute; inset:0; background:#FF4B4B; box-shadow:inset 0 0 20px #FFA500; transition:all 0.4s ease; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:900; font-size:11px;">
        Burn Edge 🔥
      </div>
    `;
    let burned = false;
    const bLayer = wrap.querySelector('.burn-layer');
    wrap.addEventListener('click', () => {
      burned = !burned;
      bLayer.style.opacity = burned ? '0' : '1';
      bLayer.style.transform = burned ? 'scale(1.4)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('glitch-tear') || id === 'glitch-tear-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#0B0E14; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:900; font-size:12px; text-shadow:2px 0 #FF4B72, -2px 0 #42E8F5;';
    wrap.textContent = 'GLITCH // DISPLACE';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'skewX(12deg) scale(1.05)';
      setTimeout(() => { wrap.style.transform = 'skewX(-8deg)'; setTimeout(() => wrap.style.transform = 'none', 100); }, 100);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('vortex-spin') || id === 'vortex-spin-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#101319; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `<div class="vx-spin" style="width:50px; height:50px; border-radius:50%; border:3px dashed ${accent}; transition:all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:900;">🌀</div>`;
    let spun = false;
    const vx = wrap.querySelector('.vx-spin');
    wrap.addEventListener('click', () => {
      spun = !spun;
      vx.style.transform = spun ? 'rotate(360deg) scale(2.2)' : 'none';
      vx.style.opacity = spun ? '0.3' : '1';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('card-shuffle') || id === 'card-shuffle-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="csh-1" style="position:absolute; width:100px; height:65px; border-radius:8px; background:#181F2D; border:1px solid #333F56; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); transform:rotate(-6deg);"></div>
      <div class="csh-2" style="position:absolute; width:100px; height:65px; border-radius:8px; background:#1E2638; border:1.5px solid ${accent}; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); display:flex; align-items:center; justify-content:center; color:#FFF; font-size:10px; font-weight:800;">Deck Top</div>
    `;
    let shuffled = false;
    const [c1, c2] = [wrap.querySelector('.csh-1'), wrap.querySelector('.csh-2')];
    wrap.addEventListener('click', () => {
      shuffled = !shuffled;
      c2.style.transform = shuffled ? 'translate(30px, -15px) rotate(12deg)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('elastic-scale') || id === 'elastic-scale-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:14px 28px; border-radius:12px; background:#151A26; border:1.5px solid ${accent}; color:#FFF; font-weight:900; font-size:11px; cursor:pointer; transition:transform 0.4s cubic-bezier(0.34, 1.8, 0.64, 1); box-shadow:0 0 16px ${accent}44;';
    wrap.textContent = 'Elastic Spring Scale';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.3) rotate(-3deg)';
      setTimeout(() => wrap.style.transform = 'none', 250);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('tunnel-dive') || id === 'tunnel-dive-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#0B0D12; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div style="position:absolute; width:120px; height:70px; border:1px solid #333E56; border-radius:8px;"></div>
      <div style="position:absolute; width:80px; height:50px; border:1px solid ${accent}66; border-radius:6px;"></div>
      <div class="tn-core" style="position:absolute; width:40px; height:25px; border:1.5px solid ${accent}; border-radius:4px; transition:transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); display:flex; align-items:center; justify-content:center; color:${accent}; font-size:10px;">⚡</div>
    `;
    let diving = false;
    const core = wrap.querySelector('.tn-core');
    wrap.addEventListener('click', () => {
      diving = !diving;
      core.style.transform = diving ? 'scale(3.5)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else {
    // 26. fade-through-transition & default crossfade
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #2A2E38; background:#111318; cursor:pointer;';
    wrap.innerHTML = `
      <div class="ft-pane ft-a" style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; color:#FFF; transition:all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);">
        <span style="font-size:18px;">🔀</span>
        <span style="font-size:11px; font-weight:800;">Screen A (Origin)</span>
        <span style="font-size:8px; color:var(--text-muted);">Material Fade Through</span>
      </div>
      <div class="ft-pane ft-b" style="position:absolute; inset:0; background:${accent}18; border:1.5px solid ${accent}; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; color:${accent}; opacity:0; transform:scale(0.92); transition:all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);">
        <span style="font-size:18px;">✨</span>
        <span style="font-size:11px; font-weight:800;">Screen B (Destination)</span>
        <span style="font-size:8px; color:#FFF;">Crossfade Scale-In</span>
      </div>
    `;
    let toB = false;
    const pA = wrap.querySelector('.ft-a');
    const pB = wrap.querySelector('.ft-b');
    const toggleFade = () => {
      toB = !toB;
      pA.style.opacity = toB ? '0' : '1';
      pA.style.transform = toB ? 'scale(0.92)' : 'scale(1)';
      pB.style.opacity = toB ? '1' : '0';
      pB.style.transform = toB ? 'scale(1)' : 'scale(0.92)';
    };
    wrap.addEventListener('click', toggleFade);
    stage.appendChild(wrap);
    restartFn = toggleFade;
  }

  return { restart: restartFn, destroy: destroyFn };
}
