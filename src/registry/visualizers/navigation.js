/**
 * DartNova Navigation & Menus Visualizers (10 Bespoke Modern UI Components)
 */

export function renderNavigationVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('radial') || id === 'radial-menu') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:150px; height:110px; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div class="hub-btn" style="width:40px; height:40px; border-radius:50%; background:${accent}; color:#08090B; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:800; cursor:pointer; z-index:3; box-shadow:0 0 18px ${accent}66; transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">🧭</div>
      <div class="radial-item r-1" style="position:absolute; width:28px; height:28px; border-radius:50%; background:#1C212D; border:1px solid ${accent}; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:12px; cursor:pointer; opacity:0; pointer-events:none; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); z-index:2;">🔍</div>
      <div class="radial-item r-2" style="position:absolute; width:28px; height:28px; border-radius:50%; background:#1C212D; border:1px solid #42E8F5; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:12px; cursor:pointer; opacity:0; pointer-events:none; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); z-index:2;">⭐</div>
      <div class="radial-item r-3" style="position:absolute; width:28px; height:28px; border-radius:50%; background:#1C212D; border:1px solid #9B7CFF; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:12px; cursor:pointer; opacity:0; pointer-events:none; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); z-index:2;">📤</div>
      <div class="radial-item r-4" style="position:absolute; width:28px; height:28px; border-radius:50%; background:#1C212D; border:1px solid #FFA500; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:12px; cursor:pointer; opacity:0; pointer-events:none; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); z-index:2;">⚙️</div>
      <div class="radial-item r-5" style="position:absolute; width:28px; height:28px; border-radius:50%; background:#1C212D; border:1px solid #FF4B72; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:12px; cursor:pointer; opacity:0; pointer-events:none; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); z-index:2;">❤️</div>
    `;
    let isOpen = false;
    const hub = wrap.querySelector('.hub-btn');
    const items = [
      { el: wrap.querySelector('.r-1'), x: -44, y: 0 },
      { el: wrap.querySelector('.r-2'), x: -28, y: -38 },
      { el: wrap.querySelector('.r-3'), x: 28, y: -38 },
      { el: wrap.querySelector('.r-4'), x: 44, y: 0 },
      { el: wrap.querySelector('.r-5'), x: 0, y: 40 }
    ];
    const toggleRadial = () => {
      isOpen = !isOpen;
      hub.style.transform = isOpen ? 'rotate(45deg) scale(1.1)' : 'none';
      items.forEach((it, idx) => {
        if (isOpen) {
          it.el.style.opacity = '1';
          it.el.style.pointerEvents = 'auto';
          it.el.style.transform = `translate(${it.x}px, ${it.y}px) scale(1)`;
          it.el.style.transitionDelay = `${idx * 0.04}s`;
        } else {
          it.el.style.opacity = '0';
          it.el.style.pointerEvents = 'none';
          it.el.style.transform = 'translate(0, 0) scale(0.3)';
          it.el.style.transitionDelay = '0s';
        }
      });
    };
    hub.addEventListener('click', toggleRadial);
    stage.appendChild(wrap);
    restartFn = toggleRadial;

  } else if (id.includes('sidebar') || id === 'animated-sidebar') {
    const shell = document.createElement('div');
    shell.style.cssText = 'width:190px; height:105px; border-radius:10px; background:#10131A; border:1px solid #262D3D; display:flex; overflow:hidden; cursor:pointer;';
    shell.innerHTML = `
      <div class="sb-nav" style="width:110px; height:100%; background:#151A24; border-right:1px solid #262D3D; padding:6px; display:flex; flex-direction:column; gap:4px; transition:width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); box-sizing:border-box; position:relative;">
        <div class="sb-toggle-btn" style="display:flex; align-items:center; justify-content:space-between; padding:3px 6px; border-radius:6px; background:#1F2636; color:${accent}; font-size:10px; font-weight:800;">
          <span class="sb-lbl" style="transition:opacity 0.2s; white-space:nowrap; overflow:hidden;">SIDEBAR</span>
          <span>◀</span>
        </div>
        <div class="sb-item active" data-name="Home" style="display:flex; align-items:center; gap:6px; padding:4px 6px; border-radius:6px; background:${accent}22; color:${accent}; font-size:10px; font-weight:700;">
          <span>🏠</span><span class="sb-lbl" style="white-space:nowrap; overflow:hidden;">Home</span>
        </div>
        <div class="sb-item" data-name="Stats" style="display:flex; align-items:center; gap:6px; padding:4px 6px; border-radius:6px; color:#A0AEC0; font-size:10px; font-weight:600;">
          <span>📊</span><span class="sb-lbl" style="white-space:nowrap; overflow:hidden;">Stats</span>
        </div>
        <div class="sb-item" data-name="Config" style="display:flex; align-items:center; gap:6px; padding:4px 6px; border-radius:6px; color:#A0AEC0; font-size:10px; font-weight:600;">
          <span>⚙️</span><span class="sb-lbl" style="white-space:nowrap; overflow:hidden;">Config</span>
        </div>
      </div>
      <div class="sb-content" style="flex:1; padding:10px; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;">
        <div class="sb-title" style="font-size:11px; font-weight:800; color:#FFF;">Home View</div>
        <div style="font-size:8px; color:var(--text-muted); margin-top:2px;">Tap to toggle</div>
      </div>
    `;
    let collapsed = false;
    const sbNav = shell.querySelector('.sb-nav');
    const toggle = () => {
      collapsed = !collapsed;
      sbNav.style.width = collapsed ? '36px' : '110px';
      shell.querySelector('.sb-toggle-btn span:last-child').textContent = collapsed ? '▶' : '◀';
      shell.querySelectorAll('.sb-lbl').forEach(l => {
        l.style.opacity = collapsed ? '0' : '1';
        l.style.width = collapsed ? '0' : 'auto';
      });
    };
    shell.querySelector('.sb-toggle-btn').addEventListener('click', (e) => { e.stopPropagation(); toggle(); });
    shell.addEventListener('click', toggle);
    stage.appendChild(shell);
    restartFn = toggle;

  } else if (id.includes('pill-tab') || id === 'pill-tab-switcher') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-direction:column; align-items:center; gap:10px;';
    wrap.innerHTML = `
      <div class="pill-bar" style="position:relative; width:180px; height:34px; border-radius:99px; background:#141720; border:1px solid #272D3D; display:flex; padding:3px; box-sizing:border-box;">
        <div class="active-pill" style="position:absolute; top:3px; bottom:3px; width:56px; border-radius:99px; background:${accent}; left:3px; transition:transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow:0 0 10px ${accent}66;"></div>
        <div class="pt-item active" data-idx="0" style="flex:1; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; color:#08090B; position:relative; z-index:2; cursor:pointer;">Design</div>
        <div class="pt-item" data-idx="1" style="flex:1; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; color:#FFF; position:relative; z-index:2; cursor:pointer;">Code</div>
        <div class="pt-item" data-idx="2" style="flex:1; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; color:#FFF; position:relative; z-index:2; cursor:pointer;">Motion</div>
      </div>
      <div class="pill-panel" style="width:170px; padding:6px; border-radius:8px; background:#151922; border:1px solid #232836; text-align:center; font-size:9px; color:${accent}; font-family:var(--font-mono); font-weight:700;">
        Design: 120 FPS Curves
      </div>
    `;
    const pill = wrap.querySelector('.active-pill');
    const panel = wrap.querySelector('.pill-panel');
    const labels = ['Design: 120 FPS Curves', 'Code: Flutter 3.24', 'Motion: Spring Mass 1.0'];
    const tabs = wrap.querySelectorAll('.pt-item');
    let currentIdx = 0;
    const setTab = (idx) => {
      currentIdx = idx;
      pill.style.transform = `translateX(${idx * 58}px)`;
      tabs.forEach((t, i) => { t.style.color = (i === idx) ? '#08090B' : '#FFF'; });
      panel.textContent = labels[idx];
    };
    tabs.forEach((t, i) => t.addEventListener('click', () => setTab(i)));
    stage.appendChild(wrap);
    restartFn = () => setTab((currentIdx + 1) % 3);

  } else if (id.includes('breadcrumb') || id === 'breadcrumb-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-direction:column; align-items:center; gap:8px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="bc-row" style="display:flex; align-items:center; gap:5px; font-size:11px; font-family:var(--font-mono); font-weight:700; background:#141720; padding:8px 12px; border-radius:8px; border:1px solid #272E3F;">
        <span class="bc-node b1" style="color:var(--text-muted); opacity:0; transform:translateX(-10px); transition:all 0.3s ease;">App</span>
        <span class="bc-slash s1" style="color:#4B5563; opacity:0; transition:all 0.3s ease 0.08s;">›</span>
        <span class="bc-node b2" style="color:var(--text-muted); opacity:0; transform:translateX(-10px); transition:all 0.3s ease 0.14s;">Motion</span>
        <span class="bc-slash s2" style="color:#4B5563; opacity:0; transition:all 0.3s ease 0.20s;">›</span>
        <span class="bc-node b3 active" style="color:${accent}; opacity:0; transform:translateX(-10px); transition:all 0.3s ease 0.26s; display:flex; align-items:center; gap:4px;">
          <span style="width:6px; height:6px; border-radius:50%; background:${accent}; box-shadow:0 0 6px ${accent};"></span>120 FPS
        </span>
      </div>
      <div style="font-size:8px; color:var(--text-muted);">Tap to replay cascade</div>
    `;
    const playReveal = () => {
      const els = wrap.querySelectorAll('.bc-node, .bc-slash');
      els.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateX(-10px)'; });
      setTimeout(() => { els.forEach(el => { el.style.opacity = '1'; el.style.transform = 'translateX(0)'; }); }, 40);
    };
    playReveal();
    wrap.addEventListener('click', playReveal);
    stage.appendChild(wrap);
    restartFn = playReveal;

  } else if (id.includes('dock') || id === 'floating-dock') {
    const dock = document.createElement('div');
    dock.className = 'dn-floating-dock-widget';
    dock.style.cursor = 'pointer';
    dock.innerHTML = `<div class="dn-dock-icon">⚡</div><div class="dn-dock-icon">🎨</div><div class="dn-dock-icon" style="background:${accent}; color:#08090B;">🚀</div><div class="dn-dock-icon">✨</div><div class="dn-dock-icon">⚙️</div>`;
    stage.appendChild(dock);
    restartFn = () => { dock.style.transform = 'scale(1.1)'; setTimeout(() => dock.style.transform = 'none', 200); };

  } else if (id.includes('hamburger') || id === 'morphing-hamburger') {
    const ham = document.createElement('div');
    ham.style.cssText = 'width:36px; height:28px; display:flex; flex-direction:column; justify-content:space-between; cursor:pointer; padding:2px;';
    ham.innerHTML = `<div style="height:3.5px; background:${accent}; border-radius:2px; transition:transform 0.3s ease;"></div><div style="height:3.5px; background:${accent}; border-radius:2px; transition:opacity 0.2s ease;"></div><div style="height:3.5px; background:${accent}; border-radius:2px; transition:transform 0.3s ease;"></div>`;
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
    restartFn = () => ham.click();

  } else if (id.includes('spring-fab') || id === 'spring-fab') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:80px; height:105px; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; cursor:pointer;';
    wrap.innerHTML = `
      <div class="fab-menu" style="display:flex; flex-direction:column; gap:6px; margin-bottom:8px; opacity:0; pointer-events:none; transform:translateY(16px); transition:all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <div style="width:28px; height:28px; border-radius:50%; background:#1C2333; border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; font-size:12px; color:#FFF;">📷</div>
        <div style="width:28px; height:28px; border-radius:50%; background:#1C2333; border:1px solid #42E8F5; display:flex; align-items:center; justify-content:center; font-size:12px; color:#FFF;">⭐</div>
      </div>
      <div class="fab-btn" style="width:42px; height:42px; border-radius:50%; background:${accent}; color:#08090B; display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:900; box-shadow:0 0 16px ${accent}66; transition:transform 0.3s;">
        +
      </div>
    `;
    let open = false;
    const fab = wrap.querySelector('.fab-btn');
    const menu = wrap.querySelector('.fab-menu');
    const toggleFab = () => {
      open = !open;
      fab.style.transform = open ? 'rotate(45deg) scale(1.1)' : 'none';
      menu.style.opacity = open ? '1' : '0';
      menu.style.pointerEvents = open ? 'auto' : 'none';
      menu.style.transform = open ? 'translateY(0)' : 'translateY(16px)';
    };
    wrap.addEventListener('click', toggleFab);
    stage.appendChild(wrap);
    restartFn = toggleFab;

  } else if (id.includes('fluid-tab') || id === 'fluid-tab-bar') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:42px; border-radius:99px; background:#141722; border:1px solid #282E3D; display:flex; align-items:center; padding:3px; box-sizing:border-box; cursor:pointer;';
    wrap.innerHTML = `
      <div class="ft-indicator" style="position:absolute; top:3px; bottom:3px; width:48px; border-radius:99px; background:${accent}; left:3px; transition:transform 0.35s cubic-bezier(0.34, 1.8, 0.64, 1); box-shadow:0 0 12px ${accent}66;"></div>
      <div class="ft-tab active" data-idx="0" style="flex:1; display:flex; align-items:center; justify-content:center; font-size:13px; position:relative; z-index:2; color:#08090B;">🏠</div>
      <div class="ft-tab" data-idx="1" style="flex:1; display:flex; align-items:center; justify-content:center; font-size:13px; position:relative; z-index:2; color:#FFF;">🔍</div>
      <div class="ft-tab" data-idx="2" style="flex:1; display:flex; align-items:center; justify-content:center; font-size:13px; position:relative; z-index:2; color:#FFF;">⚙️</div>
    `;
    const ind = wrap.querySelector('.ft-indicator');
    const tabs = wrap.querySelectorAll('.ft-tab');
    let activeIdx = 0;
    const setTab = (idx) => {
      activeIdx = idx;
      ind.style.transform = `translateX(${idx * 55}px)`;
      tabs.forEach((t, i) => { t.style.color = (i === idx) ? '#08090B' : '#FFF'; });
    };
    tabs.forEach((t, i) => t.addEventListener('click', () => setTab(i)));
    stage.appendChild(wrap);
    restartFn = () => setTab((activeIdx + 1) % 3);

  } else if (id.includes('expanding') || id === 'expanding-menu') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:120px; height:80px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="hub-btn" style="width:40px; height:40px; border-radius:50%; background:${accent}; color:#08090B; display:flex; align-items:center; justify-content:center; font-weight:800; cursor:pointer; z-index:2; box-shadow:0 0 15px ${accent}66; transition:transform 0.3s;">⚡</div>
      <div class="item-1" style="position:absolute; width:28px; height:28px; border-radius:50%; background:#202533; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:12px; transition:all 0.3s ease;">★</div>
      <div class="item-2" style="position:absolute; width:28px; height:28px; border-radius:50%; background:#202533; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:12px; transition:all 0.3s ease;">✦</div>
      <div class="item-3" style="position:absolute; width:28px; height:28px; border-radius:50%; background:#202533; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:12px; transition:all 0.3s ease;">🚀</div>
    `;
    let isOpen = false;
    const hub = wrap.querySelector('.hub-btn');
    const [i1, i2, i3] = [wrap.querySelector('.item-1'), wrap.querySelector('.item-2'), wrap.querySelector('.item-3')];
    hub.addEventListener('click', () => {
      isOpen = !isOpen;
      hub.style.transform = isOpen ? 'rotate(45deg)' : 'none';
      i1.style.transform = isOpen ? 'translate(-42px, 0)' : 'none';
      i2.style.transform = isOpen ? 'translate(0, -38px)' : 'none';
      i3.style.transform = isOpen ? 'translate(42px, 0)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => hub.click();

  } else {
    // Mobile Bottom Nav with Gliding Pill
    const nav = document.createElement('div');
    nav.className = 'dn-mobile-nav-widget';
    nav.style.cssText = 'position:relative; width:180px; height:40px; border-radius:99px; background:#141722; border:1px solid #282E3D; display:flex; align-items:center; padding:3px; cursor:pointer;';
    nav.innerHTML = `
      <div class="dn-mobile-nav-pill" style="position:absolute; top:3px; bottom:3px; width:38px; border-radius:99px; border:1px solid ${accent}; background:${accent}22; left:8px; transition:left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);"></div>
      <div class="dn-mobile-nav-item active" data-idx="0" style="flex:1; text-align:center; position:relative; z-index:2; font-size:13px;">⚡</div>
      <div class="dn-mobile-nav-item" data-idx="1" style="flex:1; text-align:center; position:relative; z-index:2; font-size:13px;">★</div>
      <div class="dn-mobile-nav-item" data-idx="2" style="flex:1; text-align:center; position:relative; z-index:2; font-size:13px;">✦</div>
      <div class="dn-mobile-nav-item" data-idx="3" style="flex:1; text-align:center; position:relative; z-index:2; font-size:13px;">👤</div>
    `;
    const pill = nav.querySelector('.dn-mobile-nav-pill');
    nav.querySelectorAll('.dn-mobile-nav-item').forEach((item, idx) => {
      item.addEventListener('click', () => {
        pill.style.left = `${8 + idx * 42}px`;
      });
    });
    stage.appendChild(nav);
    restartFn = () => {
      const cur = parseInt(pill.style.left || '8', 10);
      pill.style.left = (cur === 8) ? '50px' : '8px';
    };
  }

  return { restart: restartFn, destroy: destroyFn };
}
