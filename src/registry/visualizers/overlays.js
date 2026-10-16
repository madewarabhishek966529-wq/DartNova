/**
 * DartNova Modals, Dialogs & Overlays Visualizers (26 Bespoke Modern UI Components)
 * 120 FPS hardware-accelerated animations with interactive mouse/touch triggers
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
        <div style="font-size:8px; color:var(--text-muted);">Tap for blur modal</div>
      </div>
      <div class="diag-overlay" style="position:absolute; inset:0; background:rgba(8,10,14,0.7); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; opacity:0; pointer-events:none; transition:opacity 0.3s ease;">
        <div class="diag-card" style="width:140px; padding:10px; border-radius:10px; background:#171C26; border:1px solid ${accent}; box-shadow:0 12px 28px rgba(0,0,0,0.7); text-align:center; transform:scale(0.85); transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">
          <div style="font-size:10px; font-weight:800; color:#FFF;">Confirm Action</div>
          <div style="font-size:8px; color:var(--text-muted); margin:4px 0 8px;">Frosted Glass Blur</div>
          <button style="padding:4px 10px; border-radius:6px; background:${accent}; border:none; color:#08090B; font-weight:800; font-size:9px;">Proceed</button>
        </div>
      </div>
    `;
    let open = false;
    const overlay = wrap.querySelector('.diag-overlay');
    const card = wrap.querySelector('.diag-card');
    const toggle = () => {
      open = !open;
      overlay.style.opacity = open ? '1' : '0';
      overlay.style.pointerEvents = open ? 'auto' : 'none';
      card.style.transform = open ? 'scale(1)' : 'scale(0.85)';
    };
    wrap.addEventListener('click', toggle);
    stage.appendChild(wrap);
    restartFn = toggle;

  } else if (id.includes('fullscreen-modal-reveal') || id === 'fullscreen-modal-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#11141D; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <button style="padding:6px 14px; border-radius:8px; background:#191F2C; border:1px solid ${accent}; color:${accent}; font-weight:800; font-size:10px;">Trigger Portal</button>
      <div class="fs-portal" style="position:absolute; inset:0; background:linear-gradient(135deg, #121824, #1B2232); border:1.5px solid ${accent}; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; transform:scale(0.2); opacity:0; pointer-events:none; transition:all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <span style="font-size:18px;">⚡</span>
        <span style="font-size:11px; font-weight:900; color:#FFF;">Fullscreen Reveal</span>
        <span style="font-size:8px; color:${accent};">Tap anywhere to dismiss</span>
      </div>
    `;
    let opened = false;
    const portal = wrap.querySelector('.fs-portal');
    wrap.addEventListener('click', () => {
      opened = !opened;
      portal.style.transform = opened ? 'scale(1)' : 'scale(0.2)';
      portal.style.opacity = opened ? '1' : '0';
      portal.style.pointerEvents = opened ? 'auto' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('snackbar-slide') || id === 'snackbar-slide') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; border:1px solid #282E3D; background:#10131A; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <span style="font-size:9px; color:var(--text-muted);">Tap for Snackbar</span>
      <div class="snack-bar" style="position:absolute; bottom:8px; left:8px; right:8px; padding:6px 10px; border-radius:8px; background:#181F2C; border:1px solid ${accent}; display:flex; align-items:center; justify-content:space-between; box-shadow:0 8px 18px rgba(0,0,0,0.6); transform:translateY(50px); transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <span style="font-size:9px; font-weight:700; color:#FFF;">Item archived</span>
        <span style="font-size:9px; font-weight:800; color:${accent}; cursor:pointer;">UNDO</span>
      </div>
    `;
    let show = false;
    const bar = wrap.querySelector('.snack-bar');
    wrap.addEventListener('click', () => {
      show = !show;
      bar.style.transform = show ? 'translateY(0)' : 'translateY(50px)';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('popover-morph') || id === 'popover-morph') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="pop-anchor" style="width:34px; height:34px; border-radius:50%; background:#191F2C; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; font-size:14px; color:${accent}; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">💬</div>
      <div class="pop-bubble" style="position:absolute; bottom:64px; width:130px; padding:8px 10px; border-radius:10px; background:#151A24; border:1.5px solid ${accent}; box-shadow:0 10px 24px rgba(0,0,0,0.6); opacity:0; transform:scale(0.7) translateY(10px); pointer-events:none; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <div style="font-size:9px; font-weight:800; color:#FFF;">Morphing Popover</div>
        <div style="font-size:8px; color:var(--text-muted); margin-top:2px;">Anchored tooltip bubble</div>
      </div>
    `;
    let open = false;
    const [anchor, bubble] = [wrap.querySelector('.pop-anchor'), wrap.querySelector('.pop-bubble')];
    wrap.addEventListener('click', () => {
      open = !open;
      anchor.style.transform = open ? 'scale(0.85) rotate(45deg)' : 'none';
      bubble.style.opacity = open ? '1' : '0';
      bubble.style.transform = open ? 'scale(1) translateY(0)' : 'scale(0.7) translateY(10px)';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('notification-stack') || id === 'notification-stack') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="ns-c3" style="position:absolute; width:130px; height:38px; border-radius:8px; background:#131722; border:1px solid #283144; transform:translateY(-12px) scale(0.9); opacity:0.5; transition:all 0.35s;"></div>
      <div class="ns-c2" style="position:absolute; width:140px; height:40px; border-radius:8px; background:#171C28; border:1px solid #333E56; transform:translateY(-6px) scale(0.95); opacity:0.8; transition:all 0.35s;"></div>
      <div class="ns-c1" style="position:absolute; width:150px; height:42px; border-radius:8px; background:#1C2232; border:1.5px solid ${accent}; padding:6px 10px; box-sizing:border-box; display:flex; align-items:center; gap:8px; box-shadow:0 8px 20px rgba(0,0,0,0.5); transition:all 0.35s;">
        <span style="font-size:14px; color:${accent};">🔔</span>
        <div><div style="font-size:9px; font-weight:800; color:#FFF;">Build Complete</div><div style="font-size:7px; color:var(--text-muted);">2s ago · 120 FPS</div></div>
      </div>
    `;
    let stacked = false;
    const [c1, c2, c3] = [wrap.querySelector('.ns-c1'), wrap.querySelector('.ns-c2'), wrap.querySelector('.ns-c3')];
    wrap.addEventListener('click', () => {
      stacked = !stacked;
      c1.style.transform = stacked ? 'translateY(24px)' : 'none';
      c2.style.transform = stacked ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.95)';
      c3.style.transform = stacked ? 'translateY(-24px) scale(0.95)' : 'translateY(-12px) scale(0.9)';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('floating-action-sheet') || id === 'floating-action-sheet') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#11151F; border:1px solid #283042; overflow:hidden; display:flex; flex-direction:column; justify-content:flex-end; padding:8px; box-sizing:border-box; cursor:pointer;';
    wrap.innerHTML = `
      <div class="fas-box" style="display:flex; flex-direction:column; gap:4px; transform:translateY(70px); transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <div style="padding:6px; border-radius:6px; background:#1B2232; border:1px solid ${accent}44; text-align:center; font-size:9px; font-weight:800; color:#FFF;">📤 Share Code</div>
        <div style="padding:6px; border-radius:6px; background:#1B2232; border:1px solid #FF4B7244; text-align:center; font-size:9px; font-weight:800; color:#FF4B72;">🗑️ Delete Preset</div>
      </div>
    `;
    let open = true;
    const box = wrap.querySelector('.fas-box');
    wrap.addEventListener('click', () => {
      open = !open;
      box.style.transform = open ? 'translateY(0)' : 'translateY(70px)';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('spotlight-walkthrough') || id === 'spotlight-walkthrough') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#121622; border:1px solid #293245; overflow:hidden; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div class="sp-btn" style="padding:6px 12px; border-radius:6px; background:${accent}; color:#08090B; font-weight:900; font-size:10px; z-index:2;">Primary CTA</div>
      <div class="sp-scrim" style="position:absolute; inset:0; background:rgba(0,0,0,0.75); clip-path:circle(36px at 50% 50%); transition:clip-path 0.4s ease; z-index:1;"></div>
    `;
    let on = true;
    const scrim = wrap.querySelector('.sp-scrim');
    wrap.addEventListener('click', () => {
      on = !on;
      scrim.style.clipPath = on ? 'circle(36px at 50% 50%)' : 'circle(120% at 50% 50%)';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('dropdown-bubble-menu') || id === 'dropdown-bubble-menu') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="font-size:10px; font-weight:800; color:${accent}; padding:4px 8px; border-radius:6px; background:#161C28; border:1px solid ${accent}66;">Dropdown ▾</div>
      <div class="db-menu" style="margin-top:6px; width:110px; border-radius:8px; background:#1A2130; border:1px solid #333F56; padding:6px; box-shadow:0 8px 20px rgba(0,0,0,0.6); opacity:0; transform:translateY(-8px); transition:all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <div style="font-size:8px; color:#FFF; padding:2px 0;">• Duplicate</div>
        <div style="font-size:8px; color:#FFF; padding:2px 0;">• Export Snippet</div>
      </div>
    `;
    let open = false;
    const menu = wrap.querySelector('.db-menu');
    wrap.addEventListener('click', () => {
      open = !open;
      menu.style.opacity = open ? '1' : '0';
      menu.style.transform = open ? 'translateY(0)' : 'translateY(-8px)';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('banner-alert-slide') || id === 'banner-alert-slide') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#10131A; border:1px solid #282E3D; overflow:hidden; cursor:pointer;';
    wrap.innerHTML = `
      <div class="ba-banner" style="position:absolute; top:0; left:0; right:0; padding:6px 8px; background:linear-gradient(90deg, ${accent}33, #FF4B7233); border-bottom:1px solid ${accent}; display:flex; justify-content:space-between; align-items:center; transform:translateY(0); transition:transform 0.3s ease;">
        <span style="font-size:8px; font-weight:800; color:#FFF;">⚠️ Live Sync Warning</span>
        <span style="font-size:8px; color:${accent};">✕</span>
      </div>
      <div style="margin-top:45px; text-align:center; font-size:8px; color:var(--text-muted);">Tap to toggle banner</div>
    `;
    let visible = true;
    const ban = wrap.querySelector('.ba-banner');
    wrap.addEventListener('click', () => {
      visible = !visible;
      ban.style.transform = visible ? 'translateY(0)' : 'translateY(-100%)';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('magnetic-cursor-tooltip') || id === 'magnetic-cursor-tooltip') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#10141D; border:1px solid #273144; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <span style="font-size:10px; font-weight:800; color:#FFF;">Hover Zone</span>
      <div class="mc-tip" style="position:absolute; padding:3px 8px; border-radius:4px; background:${accent}; color:#08090B; font-weight:900; font-size:8px; transition:transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); transform:translate(30px, -24px);">Tooltip ✦</div>
    `;
    const tip = wrap.querySelector('.mc-tip');
    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left - 85;
      const y = e.clientY - rect.top - 52;
      tip.style.transform = `translate(${x + 20}px, ${y - 15}px)`;
    });
    stage.appendChild(wrap);
    restartFn = () => { tip.style.transform = 'scale(1.2)'; setTimeout(() => tip.style.transform = 'scale(1)', 180); };

  } else if (id.includes('slide-panel-drawer') || id === 'slide-panel-drawer') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#101319; border:1px solid #282E3D; overflow:hidden; cursor:pointer;';
    wrap.innerHTML = `
      <div style="padding:10px; font-size:9px; color:var(--text-muted);">Main Content Area</div>
      <div class="spd-panel" style="position:absolute; top:0; bottom:0; right:0; width:90px; background:#181F2E; border-left:1.5px solid ${accent}; padding:8px; box-sizing:border-box; transform:translateX(0); transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); display:flex; flex-direction:column; gap:4px;">
        <span style="font-size:9px; font-weight:800; color:#FFF;">Settings</span>
        <span style="font-size:7px; color:var(--text-muted);">Slide panel drawer</span>
      </div>
    `;
    let open = true;
    const panel = wrap.querySelector('.spd-panel');
    wrap.addEventListener('click', () => {
      open = !open;
      panel.style.transform = open ? 'translateX(0)' : 'translateX(100%)';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('interactive-dialog-shake') || id === 'interactive-dialog-shake') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:150px; padding:12px; border-radius:10px; background:#171C28; border:1.5px solid #FF4B72; cursor:pointer; text-align:center; box-shadow:0 0 16px rgba(255,75,114,0.3);';
    wrap.innerHTML = `
      <div style="font-size:10px; font-weight:900; color:#FFF;">Passcode Error</div>
      <div style="font-size:8px; color:#FF4B72; margin-top:2px;">Tap to Shake</div>
    `;
    const shake = () => {
      wrap.style.transform = 'translateX(-10px)';
      setTimeout(() => {
        wrap.style.transform = 'translateX(10px)';
        setTimeout(() => {
          wrap.style.transform = 'translateX(-6px)';
          setTimeout(() => { wrap.style.transform = 'translateX(0)'; }, 80);
        }, 80);
      }, 80);
    };
    wrap.addEventListener('click', shake);
    stage.appendChild(wrap);
    restartFn = shake;

  } else if (id.includes('toast-stack-queue') || id === 'toast-stack-queue') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; display:flex; flex-direction:column; gap:6px; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="tq-item" style="padding:4px 10px; border-radius:6px; background:#181F2E; border:1px solid ${accent}; font-size:8px; font-weight:800; color:#FFF;">Toast #01: Saved</div>
      <div class="tq-item" style="padding:4px 10px; border-radius:6px; background:#181F2E; border:1px solid #42E8F5; font-size:8px; font-weight:800; color:#FFF;">Toast #02: Syncing</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('radial-context-overlay') || id === 'radial-context-overlay') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:110px; height:110px; border-radius:50%; border:1.5px dashed ${accent}; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:36px; height:36px; border-radius:50%; background:${accent}; color:#08090B; font-weight:900; font-size:12px; display:flex; align-items:center; justify-content:center;">RAD</div>
    `;
    let rot = 0;
    wrap.addEventListener('click', () => {
      rot += 60;
      wrap.style.transform = `rotate(${rot}deg) scale(1.1)`;
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('blur-lightbox-gallery') || id === 'blur-lightbox-gallery') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; overflow:hidden; background:#0F1218; border:1px solid #282E3D; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div class="blg-photo" style="width:70px; height:45px; border-radius:6px; background:linear-gradient(135deg, ${accent}, #FF4B72); transition:all 0.35s;"></div>
    `;
    let big = false;
    const photo = wrap.querySelector('.blg-photo');
    wrap.addEventListener('click', () => {
      big = !big;
      photo.style.width = big ? '140px' : '70px';
      photo.style.height = big ? '85px' : '45px';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('fab-speed-dial-overlay') || id === 'fab-speed-dial-overlay') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:110px; display:flex; align-items:flex-end; justify-content:flex-end; padding:8px; box-sizing:border-box; cursor:pointer;';
    wrap.innerHTML = `
      <div class="fsd-btn" style="width:42px; height:42px; border-radius:50%; background:${accent}; display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:18px;">⚡</div>
    `;
    let pop = false;
    const btn = wrap.querySelector('.fsd-btn');
    wrap.addEventListener('click', () => {
      pop = !pop;
      btn.style.transform = pop ? 'scale(1.25) rotate(45deg)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('command-palette-modal') || id === 'command-palette-modal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:170px; border-radius:10px; background:#151A26; border:1.5px solid ${accent}; padding:8px; box-sizing:border-box; cursor:pointer; box-shadow:0 10px 24px rgba(0,0,0,0.6);';
    wrap.innerHTML = `
      <div style="display:flex; align-items:center; gap:6px; border-bottom:1px solid #2B3448; padding-bottom:4px;">
        <span style="font-size:10px; color:${accent};">🔍</span>
        <span style="font-size:9px; color:#FFF; font-family:var(--font-mono);">Type command...</span>
      </div>
      <div style="font-size:8px; color:var(--text-muted); margin-top:4px;">⌘K Command Palette</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('floating-pip-window') || id === 'floating-pip-window') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#10131A; border:1px solid #282E3D; overflow:hidden; cursor:pointer;';
    wrap.innerHTML = `
      <div class="pip-frame" style="position:absolute; bottom:8px; right:8px; width:70px; height:45px; border-radius:6px; background:#1C2333; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:8px; font-weight:800; box-shadow:0 8px 16px rgba(0,0,0,0.5); transition:transform 0.3s;">
        PIP 120 FPS
      </div>
    `;
    let shifted = false;
    const pip = wrap.querySelector('.pip-frame');
    wrap.addEventListener('click', () => {
      shifted = !shifted;
      pip.style.transform = shifted ? 'translate(-30px, -20px) scale(1.15)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('confetti-modal-burst') || id === 'confetti-modal-burst') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:150px; padding:10px; border-radius:10px; background:#181F2E; border:1.5px solid ${accent}; text-align:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="font-size:16px;">🎉</div>
      <div style="font-size:10px; font-weight:900; color:#FFF; margin-top:2px;">Achievement!</div>
      <div style="font-size:8px; color:${accent}; font-weight:700;">Tap for Confetti</div>
    `;
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.15) rotate(2deg)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('peeking-drawer-tab') || id === 'peeking-drawer-tab') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#10141D; border:1px solid #282E3D; overflow:hidden; cursor:pointer;';
    wrap.innerHTML = `
      <div class="pdt-tab" style="position:absolute; top:20px; right:0; padding:6px 10px; border-radius:8px 0 0 8px; background:#1C2436; border:1px solid ${accent}; border-right:none; color:${accent}; font-weight:800; font-size:9px; transition:transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
        ◀ Drawer
      </div>
    `;
    let pulled = false;
    const tab = wrap.querySelector('.pdt-tab');
    wrap.addEventListener('click', () => {
      pulled = !pulled;
      tab.style.transform = pulled ? 'translateX(-30px)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('bottom-snack-undo') || id === 'bottom-snack-undo') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:170px; padding:8px 12px; border-radius:8px; background:#161D2B; border:1px solid ${accent}; display:flex; justify-content:space-between; align-items:center; cursor:pointer; box-shadow:0 8px 18px rgba(0,0,0,0.5);';
    wrap.innerHTML = `
      <span style="font-size:9px; font-weight:800; color:#FFF;">Deleted item</span>
      <span style="font-size:9px; font-weight:900; color:${accent};">UNDO (5s)</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('spring-modal') || id === 'spring-modal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:14px 22px; border-radius:12px; background:#161C28; border:1.5px solid ${accent}; text-align:center; cursor:pointer; transition:transform 0.4s cubic-bezier(0.34, 1.8, 0.64, 1); box-shadow:0 0 18px ${accent}44;';
    wrap.innerHTML = `
      <div style="font-size:11px; font-weight:900; color:#FFF;">Spring Modal</div>
      <div style="font-size:8px; color:${accent}; margin-top:2px;">Bouncy Physics</div>
    `;
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.2) rotate(-2deg)';
      setTimeout(() => wrap.style.transform = 'none', 250);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

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
    wrap.addEventListener('click', () => {
      open = !open;
      sheet.style.transform = open ? 'translateY(0)' : 'translateY(70%)';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('toast-pop-in') || id === 'toast-pop-in') {
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
    wrap.addEventListener('click', () => {
      visible = !visible;
      pill.style.transform = visible ? 'translateY(0)' : 'translateY(-40px)';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else {
    // 26. tooltip-avatars & default tooltip
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; cursor:pointer; gap:4px;';
    wrap.innerHTML = `
      <div style="position:relative; display:flex; align-items:center;">
        <div class="tt-avatar" style="width:34px; height:34px; border-radius:50%; background:${accent}; color:#08090B; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:12px; border:2px solid #111318;">DN</div>
        <div class="tt-tip" style="position:absolute; bottom:42px; left:50%; transform:translateX(-50%); padding:4px 8px; border-radius:4px; background:#181F2E; border:1px solid ${accent}; font-size:8px; font-weight:800; color:#FFF; white-space:nowrap; opacity:0; transition:opacity 0.2s;">
          DartNova Active
        </div>
      </div>
    `;
    let show = false;
    const tip = wrap.querySelector('.tt-tip');
    wrap.addEventListener('click', () => {
      show = !show;
      tip.style.opacity = show ? '1' : '0';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();
  }

  return { restart: restartFn, destroy: destroyFn };
}
