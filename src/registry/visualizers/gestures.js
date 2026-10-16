/**
 * DartNova Gesture & Physics Visualizers (10 Bespoke Modern UI Components)
 */

export function renderGestureVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('swipeable') || id === 'swipeable-card') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:105px; display:flex; align-items:center; justify-content:center; cursor:grab; user-select:none;';
    wrap.innerHTML = `
      <div class="sw-under" style="position:absolute; width:130px; height:85px; border-radius:10px; background:#141720; border:1px solid #282E3D; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; opacity:0.6; transform:scale(0.92);">
        <span style="font-size:16px;">🃏</span>
        <span style="font-size:9px; color:var(--text-muted);">Next Card</span>
      </div>
      <div class="sw-card" style="position:absolute; width:140px; height:90px; border-radius:12px; background:#181D28; border:1.5px solid ${accent}; display:flex; flex-direction:column; justify-content:space-between; padding:8px 10px; box-sizing:border-box; box-shadow:0 10px 24px rgba(0,0,0,0.5); transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:9px; font-weight:800; color:#FFF;">Alex Rivera</span>
          <span class="sw-stamp" style="font-size:8px; font-weight:800; padding:1px 4px; border-radius:3px; opacity:0; border:1px solid;">LIKE</span>
        </div>
        <div style="font-size:8px; color:var(--text-muted);">Lead Interaction Designer</div>
        <div style="display:flex; justify-content:space-between; font-size:8px; color:${accent}; font-weight:700;">
          <span>◀ Reject</span><span>Accept ▶</span>
        </div>
      </div>
    `;
    const card = wrap.querySelector('.sw-card');
    const stamp = wrap.querySelector('.sw-stamp');
    let state = 0; // 0: center, 1: swiped right, 2: swiped left
    const swipe = (dir) => {
      if (dir === 'right') {
        card.style.transform = 'translateX(130px) rotate(18deg)';
        card.style.opacity = '0';
        stamp.textContent = 'LIKE';
        stamp.style.color = accent;
        stamp.style.borderColor = accent;
        stamp.style.opacity = '1';
        setTimeout(() => reset(), 450);
      } else if (dir === 'left') {
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
      <div class="rb-origin" style="position:absolute; width:12px; height:12px; border-radius:50%; background:#2A3142; border:1px solid #444D62;"></div>
      <div class="rb-tether" style="position:absolute; height:2px; background:linear-gradient(90deg, #444D62, ${accent}); transform-origin:left center; width:0; pointer-events:none;"></div>
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
      <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none;">
        <line class="sp-line" x1="85" y1="52" x2="85" y2="52" stroke="${accent}88" stroke-width="2" stroke-dasharray="3 3"/>
      </svg>
      <div class="sp-anchor" style="position:absolute; width:10px; height:10px; border-radius:50%; background:#363F54;"></div>
      <div class="sp-ball" style="position:absolute; width:34px; height:34px; border-radius:50%; background:linear-gradient(135deg, ${accent}, #42E8F5); display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:800; font-size:14px; box-shadow:0 0 16px ${accent}66; transition:transform 0.45s cubic-bezier(0.34, 1.8, 0.64, 1);">
        ⚡
      </div>
    `;
    const ball = wrap.querySelector('.sp-ball');
    let moved = false;
    const oscillate = () => {
      moved = !moved;
      ball.style.transform = moved ? 'translate(48px, -22px)' : 'translate(-38px, 18px)';
      setTimeout(() => {
        ball.style.transform = 'translate(0, 0)';
      }, 350);
    };
    wrap.addEventListener('click', oscillate);
    stage.appendChild(wrap);
    restartFn = oscillate;

  } else if (id.includes('swipe-carousel') || id === 'swipe-carousel') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:180px; height:105px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:relative; width:160px; height:68px; overflow:hidden; border-radius:10px; border:1px solid #282E3D; background:#12151D;">
        <div class="sc-track" style="display:flex; width:300%; height:100%; transition:transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);">
          <div style="width:160px; height:100%; background:#161C28; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#FFF; font-size:10px; font-weight:700;">
            <span style="font-size:14px;">🌟</span><span>Slide 01: Hero</span>
          </div>
          <div style="width:160px; height:100%; background:#1C2333; border:1px solid ${accent}66; display:flex; flex-direction:column; align-items:center; justify-content:center; color:${accent}; font-size:10px; font-weight:700;">
            <span style="font-size:14px;">🚀</span><span>Slide 02: Physics</span>
          </div>
          <div style="width:160px; height:100%; background:#221E2C; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#FF99C8; font-size:10px; font-weight:700;">
            <span style="font-size:14px;">🎨</span><span>Slide 03: Motion</span>
          </div>
        </div>
      </div>
      <div class="sc-dots" style="display:flex; gap:5px;">
        <span class="d0" style="width:14px; height:4px; border-radius:2px; background:${accent}; transition:all 0.3s;"></span>
        <span class="d1" style="width:5px; height:4px; border-radius:2px; background:#363F54; transition:all 0.3s;"></span>
        <span class="d2" style="width:5px; height:4px; border-radius:2px; background:#363F54; transition:all 0.3s;"></span>
      </div>
    `;
    let slideIdx = 0;
    const track = wrap.querySelector('.sc-track');
    const dots = [wrap.querySelector('.d0'), wrap.querySelector('.d1'), wrap.querySelector('.d2')];
    const nextSlide = () => {
      slideIdx = (slideIdx + 1) % 3;
      track.style.transform = `translateX(-${slideIdx * 160}px)`;
      dots.forEach((d, i) => {
        d.style.width = (i === slideIdx) ? '14px' : '5px';
        d.style.background = (i === slideIdx) ? accent : '#363F54';
      });
    };
    wrap.addEventListener('click', nextSlide);
    stage.appendChild(wrap);
    restartFn = nextSlide;

  } else if (id.includes('pull-to-refresh') || id === 'pull-to-refresh') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#12151E; border:1px solid #282E3D; overflow:hidden; cursor:pointer; display:flex; flex-direction:column; align-items:center;';
    wrap.innerHTML = `
      <div class="ptr-spinner" style="position:absolute; top:-28px; width:26px; height:26px; border-radius:50%; background:#1C2230; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; font-size:11px; color:${accent}; box-shadow:0 4px 12px rgba(0,0,0,0.5); transition:all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); z-index:3;">
        ↓
      </div>
      <div class="ptr-body" style="padding-top:14px; display:flex; flex-direction:column; align-items:center; gap:4px; transition:transform 0.4s ease;">
        <span style="font-size:10px; font-weight:800; color:#FFF;">Feed: Up to Date</span>
        <span style="font-size:8px; color:var(--text-muted);">Tap to pull-to-refresh</span>
        <div style="display:flex; gap:4px; margin-top:6px;">
          <div style="width:36px; height:18px; border-radius:4px; background:#1E2535;"></div>
          <div style="width:36px; height:18px; border-radius:4px; background:#1E2535;"></div>
          <div style="width:36px; height:18px; border-radius:4px; background:#1E2535;"></div>
        </div>
      </div>
    `;
    const spinner = wrap.querySelector('.ptr-spinner');
    const body = wrap.querySelector('.ptr-body');
    const runRefresh = () => {
      spinner.style.top = '12px';
      spinner.style.transform = 'rotate(180deg)';
      body.style.transform = 'translateY(22px)';
      setTimeout(() => {
        spinner.innerHTML = '↻';
        spinner.style.transform = 'rotate(540deg)';
      }, 300);
      setTimeout(() => {
        spinner.style.top = '-28px';
        spinner.style.transform = 'none';
        spinner.innerHTML = '↓';
        body.style.transform = 'translateY(0)';
      }, 950);
    };
    wrap.addEventListener('click', runRefresh);
    stage.appendChild(wrap);
    restartFn = runRefresh;

  } else if (id.includes('floating-widget') || id === 'draggable-floating-widget') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:105px; border-radius:12px; background:#101319; border:1px solid #282E3D; overflow:hidden; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; inset:0; padding:8px; font-size:8px; color:#4B5568; display:flex; flex-direction:column; justify-content:space-between;">
        <div style="display:flex; justify-content:space-between;"><span>Top-L</span><span>Top-R</span></div>
        <div style="text-align:center; color:var(--text-muted);">Dockable PiP Window</div>
        <div style="display:flex; justify-content:space-between;"><span>Btm-L</span><span>Btm-R</span></div>
      </div>
      <div class="pip-box" style="position:absolute; top:8px; left:8px; width:70px; height:42px; border-radius:8px; background:#1A202C; border:1.5px solid ${accent}; box-shadow:0 8px 18px rgba(0,0,0,0.6); display:flex; flex-direction:column; justify-content:space-between; padding:4px 6px; box-sizing:border-box; transition:all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); z-index:2;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:7px; font-weight:800; color:${accent};">PIP</span>
          <span style="width:4px; height:4px; border-radius:50%; background:${accent};"></span>
        </div>
        <div style="font-size:7px; font-weight:700; color:#FFF;">Video 01</div>
      </div>
    `;
    const pip = wrap.querySelector('.pip-box');
    const positions = [
      { top: '8px', left: '8px' },
      { top: '8px', left: '92px' },
      { top: '55px', left: '92px' },
      { top: '55px', left: '8px' }
    ];
    let posIdx = 0;
    const movePip = () => {
      posIdx = (posIdx + 1) % positions.length;
      pip.style.top = positions[posIdx].top;
      pip.style.left = positions[posIdx].left;
    };
    wrap.addEventListener('click', movePip);
    stage.appendChild(wrap);
    restartFn = movePip;

  } else if (id.includes('inertial') || id === 'inertial-scrolling') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:105px; border-radius:10px; background:#12151D; border:1px solid #282E3D; overflow:hidden; cursor:pointer; display:flex; flex-direction:column; justify-content:center; align-items:center;';
    wrap.innerHTML = `
      <div class="in-feed" style="display:flex; flex-direction:column; gap:4px; width:130px; transition:transform 0.8s cubic-bezier(0.1, 0.9, 0.2, 1);">
        <div style="padding:4px 8px; border-radius:6px; background:#191E2A; font-size:9px; color:#FFF; display:flex; justify-content:space-between;"><span>01. Tokyo</span><span style="color:${accent};">120 fps</span></div>
        <div style="padding:4px 8px; border-radius:6px; background:#191E2A; font-size:9px; color:#FFF; display:flex; justify-content:space-between;"><span>02. London</span><span style="color:#42E8F5;">120 fps</span></div>
        <div style="padding:4px 8px; border-radius:6px; background:#191E2A; font-size:9px; color:#FFF; display:flex; justify-content:space-between;"><span>03. New York</span><span style="color:#9B7CFF;">120 fps</span></div>
        <div style="padding:4px 8px; border-radius:6px; background:#191E2A; font-size:9px; color:#FFF; display:flex; justify-content:space-between;"><span>04. Zurich</span><span style="color:${accent};">120 fps</span></div>
      </div>
      <div style="position:absolute; bottom:4px; font-size:8px; color:var(--text-muted);">Kinetic Inertia Flick</div>
    `;
    const feed = wrap.querySelector('.in-feed');
    let scrolled = false;
    const flick = () => {
      scrolled = !scrolled;
      feed.style.transform = scrolled ? 'translateY(-28px)' : 'translateY(0)';
    };
    wrap.addEventListener('click', flick);
    stage.appendChild(wrap);
    restartFn = flick;

  } else if (id.includes('elastic-overscroll') || id === 'elastic-overscroll') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:105px; border-radius:10px; background:#10131B; border:1px solid #282E3D; overflow:hidden; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div class="eo-sheet" style="width:130px; padding:10px; border-radius:8px; background:#171C26; border:1px solid ${accent}88; text-align:center; transition:transform 0.4s cubic-bezier(0.34, 1.8, 0.64, 1);">
        <div style="font-size:10px; font-weight:800; color:#FFF;">Boundaries</div>
        <div style="font-size:8px; color:${accent}; margin-top:2px;">Overscroll Damping</div>
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
    const toggleReveal = () => {
      opened = !opened;
      row.style.transform = opened ? 'translateX(-70px)' : 'translateX(0)';
    };
    wrap.addEventListener('click', toggleReveal);
    stage.appendChild(wrap);
    restartFn = toggleReveal;

  } else {
    // Gesture-Driven Reveal
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
    const toggleCurtain = () => {
      expanded = !expanded;
      curtain.style.width = expanded ? '15%' : '60%';
    };
    wrap.addEventListener('click', toggleCurtain);
    stage.appendChild(wrap);
    restartFn = toggleCurtain;
  }

  return { restart: restartFn, destroy: destroyFn };
}
