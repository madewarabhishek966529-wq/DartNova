/**
 * DartNova Page & Route Transitions Visualizers (10 Bespoke Modern UI Components)
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

  } else if (id.includes('cube') || id === 'cube-transition-3d') {
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

  } else if (id.includes('diagonal-wipe') || id === 'diagonal-wipe') {
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

  } else if (id.includes('zoom') || id === 'zoom-page-transition') {
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

  } else if (id.includes('slide-fade') || id === 'slide-fade-route') {
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

  } else if (id.includes('container') || id === 'morphing-container-transition') {
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

  } else if (id.includes('liquid') || id === 'liquid-page-transition') {
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
    // Fade Through Transition
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
      if (toB) {
        pA.style.opacity = '0';
        pA.style.transform = 'scale(0.92)';
        pB.style.opacity = '1';
        pB.style.transform = 'scale(1)';
      } else {
        pA.style.opacity = '1';
        pA.style.transform = 'scale(1)';
        pB.style.opacity = '0';
        pB.style.transform = 'scale(0.92)';
      }
    };
    wrap.addEventListener('click', toggleFade);
    stage.appendChild(wrap);
    restartFn = toggleFade;
  }

  return { restart: restartFn, destroy: destroyFn };
}
