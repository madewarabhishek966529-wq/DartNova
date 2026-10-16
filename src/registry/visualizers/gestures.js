/**
 * DartNova Gesture & Physics Visualizers (26 Bespoke Modern UI Components)
 * 120 FPS hardware-accelerated animations with interactive mouse/touch triggers
 */

export function renderGestureVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('swipeable-card') || id === 'swipeable-card') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:105px; display:flex; align-items:center; justify-content:center; cursor:grab; user-select:none;';
    wrap.innerHTML = `
      <div class="sw-under" style="position:absolute; width:130px; height:85px; border-radius:10px; background:#141720; border:1px solid #282E3D; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; opacity:0.6; transform:scale(0.92);">
        <span style="font-size:16px;">🃏</span>
        <span style="font-size:9px; color:var(--text-muted);">Next Card</span>
      </div>
      <div class="sw-card" style="position:absolute; width:140px; height:90px; border-radius:12px; background:#181D28; border:1.5px solid ${accent}; display:flex; flex-direction:column; justify-content:space-between; padding:8px 10px; box-sizing:border-box; box-shadow:0 10px 24px rgba(0,0,0,0.5); transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:9px; font-weight:800; color:#FFF;">DartNova Motion</span>
          <span class="sw-stamp" style="font-size:8px; font-weight:800; padding:1px 4px; border-radius:3px; opacity:0; border:1px solid;">LIKE</span>
        </div>
        <div style="font-size:8px; color:var(--text-muted);">Interactive Physics Card</div>
        <div style="display:flex; justify-content:space-between; font-size:8px; color:${accent}; font-weight:700;">
          <span>◀ Swipe</span><span>Swipe ▶</span>
        </div>
      </div>
    `;
    const card = wrap.querySelector('.sw-card');
    const stamp = wrap.querySelector('.sw-stamp');
    let state = 0;
    const swipe = (dir) => {
      if (dir === 'right') {
        card.style.transform = 'translateX(130px) rotate(18deg)';
        card.style.opacity = '0';
        stamp.textContent = 'LIKE';
        stamp.style.color = accent;
        stamp.style.borderColor = accent;
        stamp.style.opacity = '1';
        setTimeout(() => reset(), 450);
      } else {
        card.style.transform = 'translateX(-130px) rotate(-18deg)';
        card.style.opacity = '0';
        stamp.textContent = 'NOPE';
        stamp.style.color = '#FF4B72';
        stamp.style.borderColor = '#FF4B72';
        stamp.style.opacity = '1';
        setTimeout(() => reset(), 450);
      }
    };
    const reset = () => {
      card.style.transform = 'translateX(0) rotate(0deg)';
      card.style.opacity = '1';
      stamp.style.opacity = '0';
    };
    wrap.addEventListener('click', () => {
      state = (state + 1) % 2;
      swipe(state === 1 ? 'right' : 'left');
    });
    stage.appendChild(wrap);
    restartFn = () => swipe('right');

  } else if (id.includes('rubber-band') || id === 'rubber-band-drag') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:100px; display:flex; align-items:center; justify-content:center; cursor:grab;';
    wrap.innerHTML = `
      <div class="rb-puck" style="position:relative; padding:8px 14px; border-radius:99px; background:#171C26; border:1.5px solid ${accent}; color:#FFF; font-size:10px; font-weight:800; box-shadow:0 0 14px ${accent}44; display:flex; align-items:center; gap:6px; transition:transform 0.4s cubic-bezier(0.34, 1.8, 0.64, 1);">
        <span style="color:${accent};">🪢</span><span>Pull & Snap</span>
      </div>
    `;
    const puck = wrap.querySelector('.rb-puck');
    const dragCycle = () => {
      puck.style.transform = 'translate(45px, -18px) scale(1.1)';
      setTimeout(() => {
        puck.style.transform = 'translate(-15px, 6px) scale(0.96)';
        setTimeout(() => { puck.style.transform = 'translate(0, 0) scale(1)'; }, 160);
      }, 300);
    };
    wrap.addEventListener('click', dragCycle);
    stage.appendChild(wrap);
    restartFn = dragCycle;

  } else if (id.includes('spring-drag') || id === 'spring-drag-object') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="sp-ball" style="position:absolute; width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg, ${accent}, #42E8F5); display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:14px; box-shadow:0 0 16px ${accent}66; transition:transform 0.45s cubic-bezier(0.34, 1.8, 0.64, 1);">
        ⚡
      </div>
    `;
    const ball = wrap.querySelector('.sp-ball');
    let moved = false;
    const oscillate = () => {
      moved = !moved;
      ball.style.transform = moved ? 'translate(48px, -22px)' : 'translate(-38px, 18px)';
      setTimeout(() => { ball.style.transform = 'translate(0, 0)'; }, 350);
    };
    wrap.addEventListener('click', oscillate);
    stage.appendChild(wrap);
    restartFn = oscillate;

  } else if (id.includes('swipe-carousel') || id === 'swipe-carousel') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; display:flex; align-items:center; justify-content:center; cursor:pointer; overflow:hidden; border-radius:10px; background:#12151D; border:1px solid #282E3D;';
    wrap.innerHTML = `
      <div class="sc-track" style="display:flex; gap:8px; transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <div style="width:70px; height:60px; border-radius:6px; background:#1C2333; border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:9px; font-weight:800;">Slide A</div>
        <div style="width:70px; height:60px; border-radius:6px; background:#1C2333; border:1px solid #42E8F5; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:9px; font-weight:800;">Slide B</div>
        <div style="width:70px; height:60px; border-radius:6px; background:#1C2333; border:1px solid #9B7CFF; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:9px; font-weight:800;">Slide C</div>
      </div>
    `;
    let pos = 0;
    const track = wrap.querySelector('.sc-track');
    const step = () => {
      pos = (pos + 1) % 3;
      track.style.transform = `translateX(-${pos * 78}px)`;
    };
    wrap.addEventListener('click', step);
    stage.appendChild(wrap);
    restartFn = step;

  } else if (id.includes('pull-to-refresh') || id === 'pull-to-refresh') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#10131A; border:1px solid #282E3D; overflow:hidden; cursor:pointer; display:flex; flex-direction:column; align-items:center;';
    wrap.innerHTML = `
      <div class="ptr-spin" style="width:24px; height:24px; border-radius:50%; border:2px dashed ${accent}; margin-top:8px; transition:all 0.4s ease; transform:translateY(-30px); opacity:0;"></div>
      <div style="margin-top:20px; font-size:9px; color:var(--text-muted);">Pull down to refresh</div>
    `;
    let pulled = false;
    const spin = wrap.querySelector('.ptr-spin');
    wrap.addEventListener('click', () => {
      pulled = !pulled;
      spin.style.transform = pulled ? 'translateY(10px) rotate(180deg)' : 'translateY(-30px)';
      spin.style.opacity = pulled ? '1' : '0';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('draggable-floating-widget') || id === 'draggable-floating-widget') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#11151E; border:1px solid #282E3D; overflow:hidden; cursor:pointer;';
    wrap.innerHTML = `
      <div class="dfw-badge" style="position:absolute; top:20px; left:20px; padding:6px 10px; border-radius:99px; background:#1A2130; border:1.5px solid ${accent}; color:#FFF; font-size:9px; font-weight:800; display:flex; align-items:center; gap:4px; box-shadow:0 8px 18px rgba(0,0,0,0.5); transition:transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <span style="color:${accent};">⚡</span> Floating HUD
      </div>
    `;
    let moved = false;
    const badge = wrap.querySelector('.dfw-badge');
    wrap.addEventListener('click', () => {
      moved = !moved;
      badge.style.transform = moved ? 'translate(60px, 40px)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('inertial-scrolling') || id === 'inertial-scrolling') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:170px; height:105px; border-radius:12px; background:#101319; border:1px solid #282E3D; overflow:hidden; cursor:pointer; position:relative;';
    wrap.innerHTML = `
      <div class="is-list" style="padding:8px; display:flex; flex-direction:column; gap:4px; transition:transform 0.5s cubic-bezier(0.1, 0.9, 0.2, 1);">
        <div style="padding:4px 8px; border-radius:4px; background:#181F2C; font-size:8px; color:#FFF;">Row 01 · Velocity</div>
        <div style="padding:4px 8px; border-radius:4px; background:#181F2C; font-size:8px; color:#FFF;">Row 02 · Friction</div>
        <div style="padding:4px 8px; border-radius:4px; background:#181F2C; font-size:8px; color:#FFF;">Row 03 · Deceleration</div>
        <div style="padding:4px 8px; border-radius:4px; background:#181F2C; font-size:8px; color:#FFF;">Row 04 · Kinetic</div>
      </div>
    `;
    let scrolled = false;
    const list = wrap.querySelector('.is-list');
    wrap.addEventListener('click', () => {
      scrolled = !scrolled;
      list.style.transform = scrolled ? 'translateY(-40px)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('elastic-overscroll') || id === 'elastic-overscroll') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:170px; height:105px; border-radius:12px; background:#121622; border:1px solid #282E3D; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="eo-sheet" style="padding:10px 18px; border-radius:8px; background:#1A2130; border:1.5px solid ${accent}; color:#FFF; font-size:10px; font-weight:800; transition:transform 0.35s cubic-bezier(0.34, 1.8, 0.64, 1);">
        Overscroll Stretch
      </div>
    `;
    const sheet = wrap.querySelector('.eo-sheet');
    const bounce = () => {
      sheet.style.transform = 'translateY(-24px) scaleY(1.15)';
      setTimeout(() => {
        sheet.style.transform = 'translateY(12px) scaleY(0.92)';
        setTimeout(() => { sheet.style.transform = 'translateY(0) scale(1)'; }, 180);
      }, 200);
    };
    wrap.addEventListener('click', bounce);
    stage.appendChild(wrap);
    restartFn = bounce;

  } else if (id.includes('swipe-reveal') || id === 'swipe-reveal-actions') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:100px; display:flex; flex-direction:column; justify-content:center; cursor:pointer; overflow:hidden; border-radius:10px; background:#12151D; border:1px solid #282E3D;';
    wrap.innerHTML = `
      <div style="position:absolute; right:0; top:0; bottom:0; width:70px; background:#221820; display:flex; align-items:center; justify-content:space-around; padding:0 4px;">
        <span style="font-size:12px; color:#42E8F5;">⭐</span>
        <span style="font-size:12px; color:#FF4B72;">🗑️</span>
      </div>
      <div class="sr-row" style="position:relative; z-index:2; padding:10px 12px; background:#181D28; border:1px solid #333D50; border-radius:8px; display:flex; justify-content:space-between; align-items:center; transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <div>
          <div style="font-size:10px; font-weight:800; color:#FFF;">Inbox Item</div>
          <div style="font-size:8px; color:var(--text-muted);">Swipe left for actions</div>
        </div>
        <span style="color:${accent}; font-size:12px;">‹</span>
      </div>
    `;
    let opened = false;
    const row = wrap.querySelector('.sr-row');
    wrap.addEventListener('click', () => {
      opened = !opened;
      row.style.transform = opened ? 'translateX(-70px)' : 'translateX(0)';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('pinch-to-zoom-target') || id === 'pinch-to-zoom-target') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#101319; border:1px solid #282E3D; display:flex; align-items:center; justify-content:center; cursor:pointer; overflow:hidden;';
    wrap.innerHTML = `
      <div class="pz-img" style="width:70px; height:50px; border-radius:8px; background:linear-gradient(135deg, ${accent}, #42E8F5); display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:10px; transition:transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);">
        PINCH
      </div>
    `;
    let zoomed = false;
    const img = wrap.querySelector('.pz-img');
    wrap.addEventListener('click', () => {
      zoomed = !zoomed;
      img.style.transform = zoomed ? 'scale(1.8)' : 'scale(1)';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('pan-tilt-surface') || id === 'pan-tilt-surface') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:400px; width:170px; height:105px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="pt-surf" style="width:130px; height:75px; border-radius:10px; background:#181F2E; border:1.5px solid ${accent}; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#FFF; font-size:9px; font-weight:800; transition:transform 0.2s; box-shadow:0 10px 24px rgba(0,0,0,0.5);">
        <span>3D Tilt Surface</span>
        <span style="font-size:7px; color:${accent}; margin-top:2px;">Move mouse / tap</span>
      </div>
    `;
    const surf = wrap.querySelector('.pt-surf');
    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      surf.style.transform = `rotateY(${x * 30}deg) rotateX(${-y * 30}deg)`;
    });
    wrap.addEventListener('mouseleave', () => { surf.style.transform = 'none'; });
    stage.appendChild(wrap);
    restartFn = () => { surf.style.transform = 'rotateY(20deg) rotateX(-15deg)'; setTimeout(() => surf.style.transform = 'none', 300); };

  } else if (id.includes('flick-dismiss-card') || id === 'flick-dismiss-card') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#101319; border:1px solid #282E3D; overflow:hidden; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="fdc-card" style="width:120px; height:70px; border-radius:8px; background:#19202E; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:9px; font-weight:800; transition:all 0.35s cubic-bezier(0.1, 0.9, 0.2, 1);">
        Flick Me ➔
      </div>
    `;
    const card = wrap.querySelector('.fdc-card');
    wrap.addEventListener('click', () => {
      card.style.transform = 'translate(150px, -40px) rotate(25deg)';
      card.style.opacity = '0';
      setTimeout(() => { card.style.transform = 'none'; card.style.opacity = '1'; }, 450);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('gyroscope-parallax') || id === 'gyroscope-parallax') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#10141D; border:1px solid #282E3D; overflow:hidden; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div class="gp-bg" style="position:absolute; inset:-10px; background:radial-gradient(circle, ${accent}44, transparent); transition:transform 0.3s;"></div>
      <div class="gp-fg" style="position:relative; font-size:10px; font-weight:900; color:#FFF; transition:transform 0.3s;">Gyroscope Parallax</div>
    `;
    const [bg, fg] = [wrap.querySelector('.gp-bg'), wrap.querySelector('.gp-fg')];
    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      bg.style.transform = `translateX(${x * 20}px)`;
      fg.style.transform = `translateX(${-x * 15}px)`;
    });
    stage.appendChild(wrap);
    restartFn = () => { bg.style.transform = 'translateX(15px)'; fg.style.transform = 'translateX(-10px)'; setTimeout(() => { bg.style.transform = 'none'; fg.style.transform = 'none'; }, 300); };

  } else if (id.includes('long-press-radial-fill') || id === 'long-press-radial-fill') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:70px; height:70px; border-radius:50%; background:#161C28; border:2px solid #283246; display:flex; align-items:center; justify-content:center; cursor:pointer; overflow:hidden;';
    wrap.innerHTML = `
      <div class="lp-fill" style="position:absolute; inset:0; background:${accent}; border-radius:50%; transform:scale(0); transition:transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); opacity:0.8;"></div>
      <span style="position:relative; z-index:2; font-size:9px; font-weight:900; color:#FFF;">HOLD</span>
    `;
    let held = false;
    const fill = wrap.querySelector('.lp-fill');
    wrap.addEventListener('mousedown', () => { fill.style.transform = 'scale(1)'; });
    wrap.addEventListener('mouseup', () => { fill.style.transform = 'scale(0)'; });
    stage.appendChild(wrap);
    restartFn = () => { fill.style.transform = 'scale(1)'; setTimeout(() => fill.style.transform = 'scale(0)', 400); };

  } else if (id.includes('double-tap-heart-burst') || id === 'double-tap-heart-burst') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#121622; border:1px solid #282E3D; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <span style="font-size:9px; color:var(--text-muted);">Double tap screen</span>
      <div class="dt-heart" style="position:absolute; font-size:32px; transform:scale(0); opacity:0; transition:all 0.35s cubic-bezier(0.34, 1.8, 0.64, 1);">💖</div>
    `;
    const heart = wrap.querySelector('.dt-heart');
    wrap.addEventListener('dblclick', () => {
      heart.style.transform = 'scale(1.4)';
      heart.style.opacity = '1';
      setTimeout(() => { heart.style.transform = 'scale(0)'; heart.style.opacity = '0'; }, 500);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.dispatchEvent(new Event('dblclick'));

  } else if (id.includes('drag-to-reorder-grid') || id === 'drag-to-reorder-grid') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:6px; width:150px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="dr-box" style="padding:10px; border-radius:6px; background:#181F2E; border:1px solid ${accent}; text-align:center; font-size:8px; font-weight:800; color:#FFF; transition:transform 0.3s;">Tile 1</div>
      <div class="dr-box" style="padding:10px; border-radius:6px; background:#181F2E; border:1px solid #42E8F5; text-align:center; font-size:8px; font-weight:800; color:#FFF; transition:transform 0.3s;">Tile 2</div>
    `;
    let swapped = false;
    const boxes = wrap.querySelectorAll('.dr-box');
    wrap.addEventListener('click', () => {
      swapped = !swapped;
      boxes[0].style.transform = swapped ? 'translate(80px, 0)' : 'none';
      boxes[1].style.transform = swapped ? 'translate(-80px, 0)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('radial-swipe-stepper') || id === 'radial-swipe-stepper') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:65px; height:65px; border-radius:50%; border:2px dashed ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:900; font-size:14px; cursor:pointer; transition:transform 0.3s;';
    wrap.textContent = '+5';
    let val = 5;
    wrap.addEventListener('click', () => {
      val += 5;
      wrap.textContent = `+${val}`;
      wrap.style.transform = 'rotate(30deg) scale(1.15)';
      setTimeout(() => wrap.style.transform = 'none', 150);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('stretch-pull-canvas') || id === 'stretch-pull-canvas') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:12px 20px; border-radius:10px; background:#161C28; border:1.5px solid ${accent}; color:#FFF; font-size:10px; font-weight:800; cursor:grab; transition:transform 0.35s cubic-bezier(0.34, 1.8, 0.64, 1);';
    wrap.textContent = 'Membrane Stretch';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scaleX(1.3) scaleY(0.85)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('throw-and-catch-puck') || id === 'throw-and-catch-puck') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#10131A; border:1px solid #282E3D; overflow:hidden; cursor:pointer;';
    wrap.innerHTML = `
      <div class="tcp-puck" style="position:absolute; width:30px; height:30px; border-radius:50%; background:${accent}; display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:12px; top:36px; left:20px; transition:all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);">⚡</div>
    `;
    let thrown = false;
    const puck = wrap.querySelector('.tcp-puck');
    wrap.addEventListener('click', () => {
      thrown = !thrown;
      puck.style.left = thrown ? '120px' : '20px';
      puck.style.top = thrown ? '60px' : '36px';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('two-finger-rotate') || id === 'two-finger-rotate') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:70px; height:70px; border-radius:50%; border:2px solid ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:900; font-size:12px; cursor:pointer; transition:transform 0.4s;';
    wrap.textContent = 'DIAL';
    let rot = 0;
    wrap.addEventListener('click', () => {
      rot += 60;
      wrap.style.transform = `rotate(${rot}deg) scale(1.1)`;
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('swipe-to-complete-slider') || id === 'swipe-to-complete-slider') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:42px; border-radius:99px; background:#141824; border:1px solid #29344A; display:flex; align-items:center; padding:3px; box-sizing:border-box; cursor:pointer;';
    wrap.innerHTML = `
      <div class="stc-thumb" style="width:34px; height:34px; border-radius:50%; background:${accent}; display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:14px; transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">➔</div>
      <span style="position:absolute; right:16px; font-size:8px; font-weight:800; color:var(--text-muted);">Swipe Complete</span>
    `;
    let completed = false;
    const thumb = wrap.querySelector('.stc-thumb');
    wrap.addEventListener('click', () => {
      completed = !completed;
      thumb.style.transform = completed ? 'translateX(126px)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('edge-swipe-back') || id === 'edge-swipe-back') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#101319; border:1px solid #282E3D; overflow:hidden; cursor:pointer;';
    wrap.innerHTML = `
      <div class="esb-pane" style="position:absolute; inset:0; background:#181F2E; border-left:2px solid ${accent}; padding:8px; transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:800; color:#FFF;">
        ◀ Edge Back Peek
      </div>
    `;
    let peeked = false;
    const pane = wrap.querySelector('.esb-pane');
    wrap.addEventListener('click', () => {
      peeked = !peeked;
      pane.style.transform = peeked ? 'translateX(40px)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('hold-to-confirm-button') || id === 'hold-to-confirm-button') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:12px 24px; border-radius:10px; background:#181C26; border:1.5px solid ${accent}; color:${accent}; font-weight:900; font-size:11px; cursor:pointer; transition:all 0.3s;';
    wrap.textContent = 'Hold to Confirm';
    wrap.addEventListener('mousedown', () => {
      wrap.style.background = accent;
      wrap.style.color = '#08090B';
      wrap.style.transform = 'scale(0.95)';
    });
    wrap.addEventListener('mouseup', () => {
      wrap.style.background = '#181C26';
      wrap.style.color = accent;
      wrap.style.transform = 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('joystick-controller') || id === 'joystick-controller') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:80px; height:80px; border-radius:50%; background:#141824; border:2px solid #283246; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="joy-knob" style="width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg, ${accent}, #42E8F5); box-shadow:0 0 14px ${accent}66; transition:transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);"></div>
    `;
    const knob = wrap.querySelector('.joy-knob');
    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left - 40) * 0.4;
      const y = (e.clientY - rect.top - 40) * 0.4;
      knob.style.transform = `translate(${x}px, ${y}px)`;
    });
    wrap.addEventListener('mouseleave', () => { knob.style.transform = 'none'; });
    stage.appendChild(wrap);
    restartFn = () => { knob.style.transform = 'translate(12px, -12px)'; setTimeout(() => knob.style.transform = 'none', 200); };

  } else if (id.includes('swipe-to-favorite-dock') || id === 'swipe-to-favorite-dock') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#101319; border:1px solid #282E3D; overflow:hidden; cursor:pointer; display:flex; flex-direction:column; justify-content:space-between; align-items:center; padding:8px; box-sizing:border-box;';
    wrap.innerHTML = `
      <div style="font-size:8px; color:${accent}; font-weight:800;">★ FAVORITES DOCK</div>
      <div class="sfd-item" style="padding:6px 12px; border-radius:6px; background:#1C2333; border:1px solid ${accent}; font-size:8px; font-weight:800; color:#FFF; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">
        Item (Swipe Up)
      </div>
    `;
    let docked = false;
    const it = wrap.querySelector('.sfd-item');
    wrap.addEventListener('click', () => {
      docked = !docked;
      it.style.transform = docked ? 'translateY(-30px) scale(0.8)' : 'none';
      it.style.opacity = docked ? '0.3' : '1';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else {
    // 26. gesture-driven-reveal & default gesture
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:10px; overflow:hidden; border:1px solid #282E3D; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; inset:0; background:#151A24; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px;">
        <span style="font-size:16px; color:${accent};">⚡ BLUEPRINT</span>
        <span style="font-size:8px; color:#FFF;">Underlying Hidden Layer</span>
      </div>
      <div class="gdr-curtain" style="position:absolute; inset:0; background:#101218; border-right:2px solid ${accent}; width:60%; transition:width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); display:flex; flex-direction:column; align-items:center; justify-content:center;">
        <span style="font-size:9px; font-weight:800; color:#FFF;">Surface</span>
        <span style="font-size:7px; color:var(--text-muted);">Drag curtain</span>
      </div>
    `;
    let expanded = false;
    const curtain = wrap.querySelector('.gdr-curtain');
    wrap.addEventListener('click', () => {
      expanded = !expanded;
      curtain.style.width = expanded ? '15%' : '60%';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();
  }

  return { restart: restartFn, destroy: destroyFn };
}
