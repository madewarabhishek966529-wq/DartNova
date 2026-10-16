/**
 * DartNova Lists, Grids & Feeds Visualizers (26 Bespoke Modern UI Components)
 * 120 FPS hardware-accelerated animations with interactive mouse/touch triggers
 */

export function renderListVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('staggered-list') || id === 'staggered-list-entrance') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; display:flex; flex-direction:column; gap:6px; cursor:pointer;';
    for (let i = 0; i < 3; i++) {
      const row = document.createElement('div');
      row.style.cssText = `padding:8px 10px; border-radius:6px; background:#161C28; border:1px solid #283144; display:flex; align-items:center; justify-content:space-between; font-size:9px; font-weight:800; color:#FFF; transition:all 0.3s; transition-delay:${i * 0.08}s;`;
      row.innerHTML = `<span>Item #0${i + 1}</span><span style="color:${accent};">➔</span>`;
      row.className = 'stg-row';
      wrap.appendChild(row);
    }
    const rows = wrap.querySelectorAll('.stg-row');
    const playStagger = () => {
      rows.forEach((r, idx) => {
        r.style.transform = 'translateX(-20px)';
        r.style.opacity = '0';
        setTimeout(() => {
          r.style.transform = 'none';
          r.style.opacity = '1';
        }, 50 + idx * 80);
      });
    };
    wrap.addEventListener('click', playStagger);
    stage.appendChild(wrap);
    restartFn = playStagger;

  } else if (id.includes('animated-grid-entrance') || id === 'animated-grid-entrance') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:6px; width:140px; cursor:pointer;';
    for (let i = 0; i < 4; i++) {
      const tile = document.createElement('div');
      tile.style.cssText = `height:40px; border-radius:6px; background:#181F2D; border:1px solid ${accent}44; display:flex; align-items:center; justify-content:center; font-size:8px; font-weight:800; color:#FFF; transition:transform 0.3s;`;
      tile.textContent = `Grid ${i + 1}`;
      tile.className = 'ag-tile';
      wrap.appendChild(tile);
    }
    const tiles = wrap.querySelectorAll('.ag-tile');
    wrap.addEventListener('click', () => {
      tiles.forEach((t, i) => {
        t.style.transform = 'scale(0.8)';
        setTimeout(() => { t.style.transform = 'scale(1)'; }, 100 + i * 50);
      });
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('expandable-list-item') || id === 'expandable-list-item') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; border-radius:8px; background:#161C28; border:1px solid ${accent}; overflow:hidden; cursor:pointer;';
    wrap.innerHTML = `
      <div style="padding:8px 10px; display:flex; justify-content:space-between; align-items:center; font-size:9px; font-weight:800; color:#FFF;">
        <span>Motion Pipeline</span><span class="eli-arr" style="color:${accent}; transition:transform 0.3s;">▾</span>
      </div>
      <div class="eli-body" style="height:0px; overflow:hidden; transition:height 0.3s; padding:0 10px; font-size:8px; color:var(--text-muted);">
        <div style="padding-bottom:8px;">120 FPS accelerated hardware renderer with zero memory leaks.</div>
      </div>
    `;
    let open = false;
    const [body, arr] = [wrap.querySelector('.eli-body'), wrap.querySelector('.eli-arr')];
    wrap.addEventListener('click', () => {
      open = !open;
      body.style.height = open ? '36px' : '0px';
      arr.style.transform = open ? 'rotate(180deg)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('drag-reorder-list') || id === 'drag-reorder-list') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; display:flex; flex-direction:column; gap:4px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="drl-item" style="padding:6px 8px; border-radius:6px; background:#19202E; border:1px solid #333F54; display:flex; justify-content:space-between; align-items:center; font-size:8px; color:#FFF; transition:transform 0.3s;">
        <span>☰ First Item</span><span style="color:${accent};">●</span>
      </div>
      <div class="drl-item" style="padding:6px 8px; border-radius:6px; background:#19202E; border:1px solid #333F54; display:flex; justify-content:space-between; align-items:center; font-size:8px; color:#FFF; transition:transform 0.3s;">
        <span>☰ Second Item</span><span style="color:#42E8F5;">●</span>
      </div>
    `;
    let swapped = false;
    const items = wrap.querySelectorAll('.drl-item');
    wrap.addEventListener('click', () => {
      swapped = !swapped;
      items[0].style.transform = swapped ? 'translateY(28px)' : 'none';
      items[1].style.transform = swapped ? 'translateY(-28px)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('swipeable-list-row') || id === 'swipeable-list-row') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:40px; border-radius:6px; background:#FF4B72; overflow:hidden; cursor:pointer; display:flex; align-items:center; justify-content:flex-end; padding-right:12px; box-sizing:border-box; color:#FFF; font-size:9px; font-weight:800;';
    wrap.innerHTML = `
      <span>🗑️ Delete</span>
      <div class="slr-front" style="position:absolute; inset:0; background:#161C28; border:1px solid #283144; padding:0 10px; display:flex; align-items:center; justify-content:space-between; font-size:9px; color:#FFF; transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <span>Inbox Message</span><span style="color:${accent};">◀</span>
      </div>
    `;
    let swiped = false;
    const front = wrap.querySelector('.slr-front');
    wrap.addEventListener('click', () => {
      swiped = !swiped;
      front.style.transform = swiped ? 'translateX(-65px)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('animated-search-results') || id === 'animated-search-results') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; display:flex; flex-direction:column; gap:4px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="font-size:8px; color:var(--text-muted); padding:2px 4px;">Results for "button":</div>
      <div style="padding:6px; border-radius:4px; background:#19202E; border:1px solid ${accent}; font-size:8px; font-weight:800; color:${accent};">★ Pop Button (A01)</div>
      <div style="padding:6px; border-radius:4px; background:#19202E; border:1px solid #283144; font-size:8px; color:#FFF;">☆ Corner Button</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.06)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('filter-chip-transition') || id === 'filter-chip-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:6px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="fc-c1" style="padding:4px 10px; border-radius:99px; background:${accent}; color:#08090B; font-weight:900; font-size:9px;">All</div>
      <div class="fc-c2" style="padding:4px 10px; border-radius:99px; background:#181F2C; border:1px solid #333F54; color:#FFF; font-weight:800; font-size:9px;">Live</div>
    `;
    let live = false;
    const [c1, c2] = [wrap.querySelector('.fc-c1'), wrap.querySelector('.fc-c2')];
    wrap.addEventListener('click', () => {
      live = !live;
      c1.style.background = live ? '#181F2C' : accent;
      c1.style.color = live ? '#FFF' : '#08090B';
      c2.style.background = live ? accent : '#181F2C';
      c2.style.color = live ? '#08090B' : '#FFF';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('list-item-morph') || id === 'list-item-morph') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:45px; border-radius:8px; background:#161C28; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:800; font-size:9px; cursor:pointer; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);';
    wrap.textContent = 'Tap to Morph Row';
    let expanded = false;
    wrap.addEventListener('click', () => {
      expanded = !expanded;
      wrap.style.height = expanded ? '85px' : '45px';
      wrap.textContent = expanded ? 'Expanded Card View ✨' : 'Tap to Morph Row';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('infinite-scroll-reveal') || id === 'infinite-scroll-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:80px; overflow:hidden; display:flex; flex-direction:column; gap:4px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="padding:4px 6px; border-radius:4px; background:#181F2C; font-size:8px; color:#FFF;">Row #101</div>
      <div style="padding:4px 6px; border-radius:4px; background:#181F2C; font-size:8px; color:#FFF;">Row #102</div>
      <div style="padding:4px 6px; border-radius:4px; background:#181F2C; border:1px solid ${accent}; font-size:8px; color:${accent};">Row #103 (Fetched) ⚡</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.06)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('animated-empty-state') || id === 'animated-empty-state') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; cursor:pointer;';
    wrap.innerHTML = `
      <span style="font-size:24px; animation:dnFloatLevitate 1.5s infinite alternate;">📦</span>
      <span style="font-size:9px; font-weight:800; color:#FFF;">No Records Found</span>
      <span style="font-size:7px; color:var(--text-muted);">Tap to seed data</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('accordion-chevron-list') || id === 'accordion-chevron-list') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; padding:8px 10px; border-radius:8px; background:#151A24; border:1px solid #283144; display:flex; justify-content:space-between; align-items:center; cursor:pointer; font-size:9px; font-weight:800; color:#FFF;';
    wrap.innerHTML = `<span>FAQ Item</span><span class="acl-ch" style="color:${accent}; transition:transform 0.3s;">›</span>`;
    let rot = false;
    const ch = wrap.querySelector('.acl-ch');
    wrap.addEventListener('click', () => {
      rot = !rot;
      ch.style.transform = rot ? 'rotate(90deg)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('virtualized-infinite-stream') || id === 'virtualized-infinite-stream') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; padding:8px; border-radius:8px; background:#121622; border:1px solid ${accent}; text-align:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="font-size:10px; font-weight:900; color:#FFF;">Recycled Stream</div>
      <div style="font-size:8px; color:${accent}; font-family:var(--font-mono); margin-top:2px;">10,000 DOM Nodes Recycled</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('carousel-card-deck-list') || id === 'carousel-card-deck-list') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:6px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:50px; height:60px; border-radius:6px; background:#19202E; border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; font-size:8px; font-weight:800; color:#FFF;">Deck 1</div>
      <div style="width:50px; height:60px; border-radius:6px; background:#19202E; border:1px solid #42E8F5; display:flex; align-items:center; justify-content:center; font-size:8px; font-weight:800; color:#FFF;">Deck 2</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('nested-tree-hierarchy-list') || id === 'nested-tree-hierarchy-list') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; font-size:8px; color:#FFF; display:flex; flex-direction:column; gap:3px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="font-weight:800; color:${accent};">📁 lib/</div>
      <div style="padding-left:10px; color:#A0AEC0;">└ 📄 main.dart</div>
      <div style="padding-left:10px; color:#A0AEC0;">└ 📂 widgets/</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.06)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('selection-checkbox-list') || id === 'selection-checkbox-list') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; display:flex; flex-direction:column; gap:4px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="padding:4px 8px; border-radius:4px; background:#181F2C; border:1px solid ${accent}; font-size:8px; font-weight:800; color:#FFF;">☑ Select All (12 items)</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('swipe-to-archive-row') || id === 'swipe-to-archive-row') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:36px; border-radius:6px; background:#1A2338; border:1px solid ${accent}; display:flex; align-items:center; justify-content:space-between; padding:0 8px; box-sizing:border-box; color:#FFF; font-size:8px; font-weight:800; cursor:pointer;';
    wrap.innerHTML = `<span>Archive Row</span><span style="color:${accent};">📥</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('masonry-cascade-feed') || id === 'masonry-cascade-feed') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:6px; width:150px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="flex:1; display:flex; flex-direction:column; gap:4px;"><div style="height:35px; border-radius:4px; background:#1C2333; border:1px solid ${accent};"></div><div style="height:25px; border-radius:4px; background:#1C2333;"></div></div>
      <div style="flex:1; display:flex; flex-direction:column; gap:4px;"><div style="height:22px; border-radius:4px; background:#1C2333;"></div><div style="height:38px; border-radius:4px; background:#1C2333; border:1px solid #42E8F5;"></div></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('notification-inbox-list') || id === 'notification-inbox-list') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; padding:6px 10px; border-radius:6px; background:#161C28; border:1px solid #283144; display:flex; align-items:center; gap:8px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:8px; height:8px; border-radius:50%; background:${accent};"></div>
      <div><div style="font-size:8px; font-weight:800; color:#FFF;">New Deploy</div><div style="font-size:7px; color:var(--text-muted);">Production ready</div></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('contact-avatar-directory') || id === 'contact-avatar-directory') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; padding:6px 8px; border-radius:6px; background:#141824; border:1px solid #283144; display:flex; align-items:center; justify-content:space-between; cursor:pointer;';
    wrap.innerHTML = `
      <div style="display:flex; align-items:center; gap:6px;"><div style="width:20px; height:20px; border-radius:50%; background:${accent}; color:#08090B; display:flex; align-items:center; justify-content:center; font-size:8px; font-weight:900;">AR</div><span style="font-size:8px; font-weight:800; color:#FFF;">Alex Rivera</span></div>
      <span style="font-size:8px; color:${accent}; font-family:var(--font-mono);">[A]</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('pill-badge-table-list') || id === 'pill-badge-table-list') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; padding:6px 8px; border-radius:6px; background:#141722; border:1px solid #283144; display:flex; align-items:center; justify-content:space-between; cursor:pointer;';
    wrap.innerHTML = `
      <span style="font-size:8px; font-weight:800; color:#FFF;">Order #992</span>
      <span style="padding:2px 6px; border-radius:99px; background:${accent}33; color:${accent}; font-weight:800; font-size:7px;">SHIPPED</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('pull-to-refresh-list') || id === 'pull-to-refresh-list') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-direction:column; align-items:center; gap:4px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:20px; height:20px; border-radius:50%; border:2px dashed ${accent}; animation:dnOrbitRotate 2s linear infinite;"></div>
      <span style="font-size:8px; font-weight:800; color:#FFF;">Pulley Refresh</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('timeline-milestone-list') || id === 'timeline-milestone-list') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; gap:8px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:10px; height:10px; border-radius:50%; background:${accent}; box-shadow:0 0 10px ${accent};"></div>
      <div style="width:40px; height:2px; background:${accent};"></div>
      <div style="width:10px; height:10px; border-radius:50%; background:#283144;"></div>
      <span style="font-size:8px; font-weight:800; color:#FFF;">Milestone v2</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('shuffled-rank-leaderboard') || id === 'shuffled-rank-leaderboard') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; padding:6px 8px; border-radius:6px; background:#161D2B; border:1px solid ${accent}; display:flex; justify-content:space-between; align-items:center; cursor:pointer;';
    wrap.innerHTML = `
      <span style="font-size:8px; font-weight:900; color:${accent};">#1 TOP RANK</span>
      <span style="font-size:8px; font-weight:800; color:#FFF;">99.4% Elo</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('chat-bubble-thread') || id === 'chat-bubble-thread') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; display:flex; flex-direction:column; gap:4px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="align-self:flex-start; padding:4px 8px; border-radius:6px 6px 6px 0; background:#1C2333; font-size:8px; color:#FFF;">Hello team 👋</div>
      <div style="align-self:flex-end; padding:4px 8px; border-radius:6px 6px 0 6px; background:${accent}; color:#08090B; font-size:8px; font-weight:800;">120 FPS Live! ⚡</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.06)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('filterable-catalog-grid') || id === 'filterable-catalog-grid') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:grid; grid-template-columns:repeat(3, 1fr); gap:4px; width:150px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="height:30px; border-radius:4px; background:#19202E; border:1px solid ${accent};"></div>
      <div style="height:30px; border-radius:4px; background:#19202E;"></div>
      <div style="height:30px; border-radius:4px; background:#19202E;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else {
    // 26. collapsible-section-headers & default list
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; padding:6px 8px; border-radius:6px; background:#141722; border:1px solid ${accent}; display:flex; justify-content:space-between; align-items:center; cursor:pointer;';
    wrap.innerHTML = `
      <span style="font-size:9px; font-weight:900; color:${accent};">CORE MODULES (26)</span>
      <span style="font-size:8px; color:#FFF;">▾</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };
  }

  return { restart: restartFn, destroy: destroyFn };
}
