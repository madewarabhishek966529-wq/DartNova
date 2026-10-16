/**
 * DartNova Modals, Dialogs & Overlays Visualizers (10 Bespoke Modern UI Components)
 */

export function renderOverlayVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('expandable-bottom-sheet') || id === 'expandable-bottom-sheet') {
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

  } else if (id.includes('blur-backdrop') || id === 'blur-backdrop-dialog') {
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

  } else if (id.includes('fullscreen-modal') || id === 'fullscreen-modal-reveal') {
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

  } else if (id.includes('snackbar') || id === 'snackbar-slide') {
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

  } else if (id.includes('popover') || id === 'popover-morph') {
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

  } else if (id.includes('notification-stack') || id === 'notification-stack') {
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

  } else if (id.includes('spring-modal') || id === 'spring-modal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#101319; border:1px solid #282E3D; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <button style="padding:6px 12px; border-radius:6px; background:#1C2232; border:1px solid ${accent}; color:${accent}; font-size:10px; font-weight:800;">
        Open Spring Modal
      </button>
      <div class="sm-dialog" style="position:absolute; width:140px; padding:10px; border-radius:10px; background:#191F2C; border:1.5px solid ${accent}; box-shadow:0 12px 28px rgba(0,0,0,0.8); text-align:center; transform:scale(0); opacity:0; transition:transform 0.4s cubic-bezier(0.34, 1.8, 0.64, 1), opacity 0.2s ease; z-index:3;">
        <div style="font-size:10px; font-weight:900; color:#FFF;">Spring Dialog</div>
        <div style="font-size:8px; color:var(--text-muted); margin:4px 0 8px;">Overshoot physics pop</div>
        <button style="padding:3px 8px; border-radius:4px; background:${accent}; border:none; color:#08090B; font-weight:800; font-size:8px;">Dismiss</button>
      </div>
    `;
    let open = false;
    const dialog = wrap.querySelector('.sm-dialog');
    const toggleSpring = () => {
      open = !open;
      dialog.style.transform = open ? 'scale(1)' : 'scale(0)';
      dialog.style.opacity = open ? '1' : '0';
    };
    wrap.addEventListener('click', toggleSpring);
    stage.appendChild(wrap);
    restartFn = toggleSpring;

  } else if (id.includes('bottom-sheet-slide') || id === 'bottom-sheet-slide') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#11141D; border:1px solid #282E3D; overflow:hidden; cursor:pointer; display:flex; flex-direction:column; justify-content:flex-end;';
    wrap.innerHTML = `
      <div style="flex:1; display:flex; align-items:center; justify-content:center; font-size:9px; color:var(--text-muted);">Tap to slide sheet</div>
      <div class="bss-sheet" style="background:#191E2A; border-top:2px solid ${accent}; border-radius:10px 10px 0 0; padding:8px; transform:translateY(0); transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); display:flex; flex-direction:column; align-items:center; gap:4px;">
        <div style="width:24px; height:3px; border-radius:2px; background:#4B5568;"></div>
        <span style="font-size:9px; font-weight:800; color:#FFF;">Draggable Sheet</span>
      </div>
    `;
    let open = true;
    const sheet = wrap.querySelector('.bss-sheet');
    const toggleSlide = () => {
      open = !open;
      sheet.style.transform = open ? 'translateY(0)' : 'translateY(70%)';
    };
    wrap.addEventListener('click', toggleSlide);
    stage.appendChild(wrap);
    restartFn = toggleSlide;

  } else if (id.includes('toast') || id === 'toast-pop-in') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#101319; border:1px solid #282E3D; overflow:hidden; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div class="t-pill" style="position:absolute; top:10px; padding:6px 10px; border-radius:99px; background:#191F2D; border:1px solid ${accent}; display:flex; align-items:center; gap:6px; box-shadow:0 8px 18px rgba(0,0,0,0.6); transform:translateY(-40px); transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <span style="width:6px; height:6px; border-radius:50%; background:${accent};"></span>
        <span style="font-size:9px; font-weight:800; color:#FFF;">Changes Saved</span>
      </div>
      <span style="font-size:9px; color:var(--text-muted);">Tap for Toast Pop</span>
    `;
    let visible = false;
    const pill = wrap.querySelector('.t-pill');
    const toggleToast = () => {
      visible = !visible;
      pill.style.transform = visible ? 'translateY(0)' : 'translateY(-40px)';
    };
    wrap.addEventListener('click', toggleToast);
    stage.appendChild(wrap);
    restartFn = toggleToast;

  } else {
    // Tooltip Avatars
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; cursor:pointer; gap:4px;';
    wrap.innerHTML = `
      <div style="position:relative; display:flex; align-items:center;">
        <div class="tt-avatar" style="width:32px; height:32px; border-radius:50%; background:${accent}; color:#08090B; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:12px; border:2px solid #111318;">AR</div>
        <div class="tt-tip" style="position:absolute; bottom:40px; left:50%; transform:translateX(-50%); padding:4px 8px; border-radius:4px; background:#181F2E; border:1px solid ${accent}; font-size:8px; font-weight:800; color:#FFF; white-space:nowrap; opacity:0; transition:opacity 0.2s;">
          Alex Rivera · Staff Eng
        </div>
      </div>
    `;
    let show = false;
    const tip = wrap.querySelector('.tt-tip');
    const toggleTip = () => {
      show = !show;
      tip.style.opacity = show ? '1' : '0';
    };
    wrap.addEventListener('click', toggleTip);
    stage.appendChild(wrap);
    restartFn = toggleTip;
  }

  return { restart: restartFn, destroy: destroyFn };
}
