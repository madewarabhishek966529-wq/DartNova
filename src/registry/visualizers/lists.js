/**
 * DartNova Lists & Collections Visualizers (10 Bespoke Modern UI Components)
 */

export function renderListVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('staggered-list') || id === 'staggered-list-entrance') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-direction:column; gap:5px; width:160px; cursor:pointer;';
    const items = ['01. Initialize Pipeline', '02. Compile Shaders', '03. Mount GPU Stage'];
    wrap.innerHTML = items.map((txt, i) => `
      <div class="stg-row r-${i}" style="padding:6px 8px; border-radius:6px; background:#161A24; border:1px solid #282E3D; font-size:9px; color:#FFF; display:flex; justify-content:space-between; align-items:center; opacity:0; transform:translateX(-12px); transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); transition-delay:${i * 0.08}s;">
        <span>${txt}</span><span style="color:${accent};">✓</span>
      </div>
    `).join('');
    const cascade = () => {
      wrap.querySelectorAll('.stg-row').forEach(r => {
        r.style.opacity = '0';
        r.style.transform = 'translateX(-12px)';
      });
      setTimeout(() => {
        wrap.querySelectorAll('.stg-row').forEach(r => {
          r.style.opacity = '1';
          r.style.transform = 'translateX(0)';
        });
      }, 40);
    };
    cascade();
    wrap.addEventListener('click', cascade);
    stage.appendChild(wrap);
    restartFn = cascade;

  } else if (id.includes('grid-entrance') || id === 'animated-grid-entrance') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:6px; width:140px; cursor:pointer;';
    for (let i = 0; i < 4; i++) {
      const tile = document.createElement('div');
      tile.className = `ge-tile t-${i}`;
      tile.style.cssText = `height:36px; border-radius:6px; background:#181E2A; border:1px solid #2C3548; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; color:#FFF; opacity:0; transform:scale(0.6); transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); transition-delay:${i * 0.07}s;`;
      tile.innerHTML = `<span style="color:${i === 0 ? accent : '#FFF'};">Item 0${i + 1}</span>`;
      wrap.appendChild(tile);
    }
    const popGrid = () => {
      wrap.querySelectorAll('.ge-tile').forEach(t => {
        t.style.opacity = '0';
        t.style.transform = 'scale(0.6)';
      });
      setTimeout(() => {
        wrap.querySelectorAll('.ge-tile').forEach(t => {
          t.style.opacity = '1';
          t.style.transform = 'scale(1)';
        });
      }, 40);
    };
    popGrid();
    wrap.addEventListener('click', popGrid);
    stage.appendChild(wrap);
    restartFn = popGrid;

  } else if (id.includes('expandable-list') || id === 'expandable-list-item') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:165px; border-radius:8px; background:#141822; border:1px solid #282E3D; overflow:hidden; cursor:pointer; transition:border-color 0.2s;';
    wrap.innerHTML = `
      <div style="padding:8px 10px; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:10px; font-weight:800; color:#FFF;">Analytics Row</span>
        <span class="ex-arrow" style="font-size:10px; color:${accent}; transition:transform 0.3s;">▼</span>
      </div>
      <div class="ex-body" style="max-height:0; overflow:hidden; padding:0 10px; font-size:8px; color:var(--text-muted); line-height:1.4; transition:all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <div style="padding-bottom:8px; border-top:1px solid #242A38; padding-top:6px;">
          <div style="display:flex; justify-content:space-between; color:#FFF;"><span>Throughput:</span><span style="color:${accent}; font-weight:800;">120 FPS</span></div>
          <div style="margin-top:2px;">Memory: 42 MB / Latency: 1.2ms</div>
        </div>
      </div>
    `;
    let open = false;
    const body = wrap.querySelector('.ex-body');
    const arrow = wrap.querySelector('.ex-arrow');
    const toggleRow = () => {
      open = !open;
      body.style.maxHeight = open ? '60px' : '0';
      arrow.style.transform = open ? 'rotate(180deg)' : 'none';
      wrap.style.borderColor = open ? accent : '#282E3D';
    };
    wrap.addEventListener('click', toggleRow);
    stage.appendChild(wrap);
    restartFn = toggleRow;

  } else if (id.includes('drag-reorder') || id === 'drag-reorder-list') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-direction:column; gap:4px; width:155px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="dr-1" style="padding:6px 8px; border-radius:6px; background:#181D2A; border:1px solid #2D364A; display:flex; justify-content:space-between; align-items:center; font-size:9px; color:#FFF; transition:transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <span>1. Master Route</span><span style="color:var(--text-muted); font-size:10px;">⋮⋮</span>
      </div>
      <div class="dr-2" style="padding:6px 8px; border-radius:6px; background:#1E2536; border:1.5px solid ${accent}; display:flex; justify-content:space-between; align-items:center; font-size:9px; color:${accent}; font-weight:800; box-shadow:0 6px 14px rgba(0,0,0,0.5); transition:transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <span>2. Physics Shaders</span><span style="color:${accent}; font-size:10px;">⋮⋮</span>
      </div>
    `;
    let swapped = false;
    const r1 = wrap.querySelector('.dr-1');
    const r2 = wrap.querySelector('.dr-2');
    const swap = () => {
      swapped = !swapped;
      r1.style.transform = swapped ? 'translateY(28px)' : 'none';
      r2.style.transform = swapped ? 'translateY(-28px)' : 'none';
    };
    wrap.addEventListener('click', swap);
    stage.appendChild(wrap);
    restartFn = swap;

  } else if (id.includes('swipeable-list') || id === 'swipeable-list-row') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:34px; border-radius:6px; overflow:hidden; background:#2A141A; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; right:10px; top:0; bottom:0; display:flex; align-items:center; color:#FF4B72; font-size:9px; font-weight:800;">
        🗑️ DELETE
      </div>
      <div class="slr-front" style="position:absolute; inset:0; background:#171C26; border:1px solid #282E3D; border-radius:6px; display:flex; align-items:center; justify-content:space-between; padding:0 10px; font-size:9px; color:#FFF; transition:transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <span>Archive Message</span><span style="color:${accent};">‹ Swipe</span>
      </div>
    `;
    let swiped = false;
    const front = wrap.querySelector('.slr-front');
    const toggleSwipe = () => {
      swiped = !swiped;
      front.style.transform = swiped ? 'translateX(-65px)' : 'none';
    };
    wrap.addEventListener('click', toggleSwipe);
    stage.appendChild(wrap);
    restartFn = toggleSwipe;

  } else if (id.includes('search-results') || id === 'animated-search-results') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-direction:column; gap:4px; width:160px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="padding:4px 8px; border-radius:6px; background:#11141D; border:1px solid ${accent}66; font-size:8px; color:${accent}; font-family:var(--font-mono); display:flex; justify-content:space-between;">
        <span>query: "flutter"</span><span>3 hits</span>
      </div>
      <div class="sr-item i1" style="padding:4px 8px; border-radius:4px; background:#181D2A; font-size:9px; color:#FFF; transition:all 0.25s;">⚡ Flutter Curve</div>
      <div class="sr-item i2" style="padding:4px 8px; border-radius:4px; background:#181D2A; font-size:9px; color:#FFF; transition:all 0.25s;">✨ Flutter Physics</div>
    `;
    let filtered = false;
    const i2 = wrap.querySelector('.i2');
    const toggleFilter = () => {
      filtered = !filtered;
      i2.style.opacity = filtered ? '0' : '1';
      i2.style.transform = filtered ? 'translateY(-6px)' : 'none';
    };
    wrap.addEventListener('click', toggleFilter);
    stage.appendChild(wrap);
    restartFn = toggleFilter;

  } else if (id.includes('filter-chip') || id === 'filter-chip-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:4px; cursor:pointer;';
    const chips = ['All', '3D', 'Shaders'];
    wrap.innerHTML = chips.map((c, i) => `
      <div class="fc-chip c-${i}" style="padding:4px 8px; border-radius:99px; font-size:8px; font-weight:800; background:${i === 0 ? accent : '#161A24'}; color:${i === 0 ? '#08090B' : '#FFF'}; border:1px solid ${i === 0 ? accent : '#2B3245'}; transition:all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);">
        ${c}
      </div>
    `).join('');
    let activeIdx = 0;
    const cycleChip = () => {
      activeIdx = (activeIdx + 1) % 3;
      wrap.querySelectorAll('.fc-chip').forEach((chip, i) => {
        const isActive = (i === activeIdx);
        chip.style.background = isActive ? accent : '#161A24';
        chip.style.color = isActive ? '#08090B' : '#FFF';
        chip.style.borderColor = isActive ? accent : '#2B3245';
        chip.style.transform = isActive ? 'scale(1.08)' : 'scale(1)';
      });
    };
    wrap.addEventListener('click', cycleChip);
    stage.appendChild(wrap);
    restartFn = cycleChip;

  } else if (id.includes('item-morph') || id === 'list-item-morph') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:85px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="lim-box" style="width:145px; height:32px; border-radius:6px; background:#161B26; border:1px solid ${accent}; display:flex; align-items:center; justify-content:space-between; padding:0 8px; box-sizing:border-box; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <span style="font-size:9px; font-weight:800; color:#FFF;">Row Item</span>
        <span style="font-size:8px; color:${accent};">Tap Morph ➔</span>
      </div>
    `;
    let morphed = false;
    const box = wrap.querySelector('.lim-box');
    const toggleMorph = () => {
      morphed = !morphed;
      if (morphed) {
        box.style.width = '100%';
        box.style.height = '100%';
        box.style.borderRadius = '10px';
        box.style.flexDirection = 'column';
        box.style.justifyContent = 'space-between';
        box.style.padding = '8px';
        box.innerHTML = `
          <div style="display:flex; justify-content:space-between; width:100%;"><span style="font-size:10px; font-weight:800; color:${accent};">Morphed Card</span><span style="font-size:8px; color:#FFF;">✕</span></div>
          <div style="font-size:8px; color:var(--text-muted);">Expanded Telemetry Details</div>
          <div style="font-size:9px; color:#FFF; font-weight:700;">120 FPS Validated</div>
        `;
      } else {
        box.style.width = '145px';
        box.style.height = '32px';
        box.style.borderRadius = '6px';
        box.style.flexDirection = 'row';
        box.style.justifyContent = 'space-between';
        box.style.padding = '0 8px';
        box.innerHTML = `<span style="font-size:9px; font-weight:800; color:#FFF;">Row Item</span><span style="font-size:8px; color:${accent};">Tap Morph ➔</span>`;
      }
    };
    wrap.addEventListener('click', toggleMorph);
    stage.appendChild(wrap);
    restartFn = toggleMorph;

  } else if (id.includes('infinite-scroll') || id === 'infinite-scroll-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-direction:column; gap:4px; width:155px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="padding:4px 8px; border-radius:4px; background:#181D2A; font-size:9px; color:#FFF;">Post 01 · Loaded</div>
      <div style="padding:4px 8px; border-radius:4px; background:#181D2A; font-size:9px; color:#FFF;">Post 02 · Loaded</div>
      <div class="isr-skel" style="height:20px; border-radius:4px; background:linear-gradient(90deg, #181D2A 20%, #2A3348 50%, #181D2A 80%); background-size:200% 100%; animation:dnShimmerSweep 1.5s infinite;"></div>
    `;
    let loaded = false;
    const skel = wrap.querySelector('.isr-skel');
    const toggleLoad = () => {
      loaded = !loaded;
      if (loaded) {
        skel.style.animation = 'none';
        skel.style.background = '#181D2A';
        skel.style.color = accent;
        skel.style.fontSize = '9px';
        skel.style.fontWeight = '700';
        skel.style.display = 'flex';
        skel.style.alignItems = 'center';
        skel.style.padding = '0 8px';
        skel.textContent = 'Post 03 · Streamed ➔';
      } else {
        skel.textContent = '';
        skel.style.background = 'linear-gradient(90deg, #181D2A 20%, #2A3348 50%, #181D2A 80%)';
        skel.style.animation = 'dnShimmerSweep 1.5s infinite';
      }
    };
    wrap.addEventListener('click', toggleLoad);
    stage.appendChild(wrap);
    restartFn = toggleLoad;

  } else {
    // Animated Empty State
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; cursor:pointer; text-align:center;';
    wrap.innerHTML = `
      <div class="aes-ghost" style="font-size:26px; animation:dnFloatLevitate 3s ease-in-out infinite alternate;">👻</div>
      <div style="font-size:10px; font-weight:800; color:#FFF;">No Records Found</div>
      <button style="padding:3px 8px; border-radius:4px; background:${accent}; border:none; color:#08090B; font-weight:800; font-size:8px; cursor:pointer; margin-top:2px;">↺ Retry Search</button>
    `;
    const ghost = wrap.querySelector('.aes-ghost');
    wrap.addEventListener('click', () => {
      ghost.style.transform = 'scale(1.25) rotate(15deg)';
      setTimeout(() => ghost.style.transform = 'none', 240);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();
  }

  return { restart: restartFn, destroy: destroyFn };
}
