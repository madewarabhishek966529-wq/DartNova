/**
 * DartNova Navigation & Menus Visualizers (26 Bespoke Modern UI Components)
 */

export function renderNavigationVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('radial-menu') || id === 'radial-menu') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:150px; height:110px; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div class="hub-btn" style="width:40px; height:40px; border-radius:50%; background:${accent}; color:#08090B; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:800; cursor:pointer; z-index:3; box-shadow:0 0 18px ${accent}66; transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">🧭</div>
      <div class="radial-item r-1" style="position:absolute; width:28px; height:28px; border-radius:50%; background:#1C212D; border:1px solid ${accent}; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:12px; cursor:pointer; opacity:0; pointer-events:none; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); z-index:2;">🔍</div>
      <div class="radial-item r-2" style="position:absolute; width:28px; height:28px; border-radius:50%; background:#1C212D; border:1px solid #42E8F5; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:12px; cursor:pointer; opacity:0; pointer-events:none; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); z-index:2;">⭐</div>
      <div class="radial-item r-3" style="position:absolute; width:28px; height:28px; border-radius:50%; background:#1C212D; border:1px solid #9B7CFF; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:12px; cursor:pointer; opacity:0; pointer-events:none; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); z-index:2;">📤</div>
      <div class="radial-item r-4" style="position:absolute; width:28px; height:28px; border-radius:50%; background:#1C212D; border:1px solid #FFA500; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:12px; cursor:pointer; opacity:0; pointer-events:none; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); z-index:2;">⚙️</div>
    `;
    let isOpen = false;
    const hub = wrap.querySelector('.hub-btn');
    const items = [
      { el: wrap.querySelector('.r-1'), x: -44, y: 0 },
      { el: wrap.querySelector('.r-2'), x: -28, y: -38 },
      { el: wrap.querySelector('.r-3'), x: 28, y: -38 },
      { el: wrap.querySelector('.r-4'), x: 44, y: 0 }
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
      <div class="sb-nav" style="width:110px; height:100%; background:#151A24; border-right:1px solid #262D3D; padding:6px; display:flex; flex-direction:column; gap:4px; box-sizing:border-box;">
        <div style="font-size:9px; font-weight:800; color:${accent};">NAVIGATION</div>
        <div style="padding:4px 6px; border-radius:4px; background:${accent}22; color:${accent}; font-size:9px; font-weight:700;">🏠 Dashboard</div>
        <div style="padding:4px 6px; border-radius:4px; color:#A0AEC0; font-size:9px;">⚙️ Settings</div>
      </div>
      <div style="flex:1; padding:8px; display:flex; align-items:center; justify-content:center; font-size:10px; color:var(--text-muted);">Canvas Area</div>
    `;
    stage.appendChild(shell);
    restartFn = () => { shell.style.transform = 'scale(1.05)'; setTimeout(() => shell.style.transform = 'none', 180); };

  } else if (id.includes('pill-tab') || id === 'pill-tab-switcher') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:4px; border-radius:99px; background:#141824; border:1px solid #29344A; display:flex; gap:4px; cursor:pointer;';
    wrap.innerHTML = `
      <span class="pt-pill" style="padding:6px 14px; border-radius:99px; background:${accent}; color:#08090B; font-weight:800; font-size:10px;">Motion</span>
      <span style="padding:6px 14px; border-radius:99px; color:#A0AEC0; font-weight:700; font-size:10px;">Assets</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('breadcrumb') || id === 'breadcrumb-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; gap:6px; font-size:11px; font-weight:800; cursor:pointer;';
    wrap.innerHTML = `<span style="color:var(--text-muted);">Home</span><span style="color:${accent};">›</span><span style="color:var(--text-muted);">Library</span><span style="color:${accent};">›</span><span style="color:${accent};">Motion</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('hamburger') || id === 'morphing-hamburger') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:44px; height:44px; border-radius:10px; background:#151A24; border:1px solid #29344A; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:5px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="h-line l1" style="width:20px; height:2px; background:${accent}; transition:all 0.3s;"></div>
      <div class="h-line l2" style="width:20px; height:2px; background:${accent}; transition:all 0.3s;"></div>
      <div class="h-line l3" style="width:20px; height:2px; background:${accent}; transition:all 0.3s;"></div>
    `;
    let open = false;
    const [l1, l2, l3] = [wrap.querySelector('.l1'), wrap.querySelector('.l2'), wrap.querySelector('.l3')];
    wrap.addEventListener('click', () => {
      open = !open;
      l1.style.transform = open ? 'translateY(7px) rotate(45deg)' : 'none';
      l2.style.opacity = open ? '0' : '1';
      l3.style.transform = open ? 'translateY(-7px) rotate(-45deg)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('elastic-bottom') || id === 'elastic-bottom-bar') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:38px; border-radius:12px; background:#121622; border:1px solid #283144; display:flex; align-items:center; justify-content:space-around; cursor:pointer;';
    wrap.innerHTML = `<span style="font-size:14px; color:${accent};">⚡</span><span style="font-size:14px; color:#A0AEC0;">🧭</span><span style="font-size:14px; color:#A0AEC0;">👤</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('floating-dock') || id === 'floating-dock') {
    const dock = document.createElement('div');
    dock.style.cssText = 'padding:6px 12px; border-radius:99px; background:rgba(20,24,36,0.85); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.15); display:flex; gap:8px; cursor:pointer;';
    dock.innerHTML = `<span style="font-size:18px;">🏠</span><span style="font-size:18px; transform:scale(1.25); color:${accent};">🧭</span><span style="font-size:18px;">📊</span><span style="font-size:18px;">⚙️</span>`;
    stage.appendChild(dock);
    restartFn = () => { dock.style.transform = 'scale(1.15)'; setTimeout(() => dock.style.transform = 'none', 180); };

  } else if (id.includes('pie-menu') || id === 'pie-menu-wheel') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `width:70px; height:70px; border-radius:50%; border:2px dashed ${accent}; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:12px; font-weight:800; color:${accent};`;
    wrap.textContent = '8-PIE';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'rotate(45deg) scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else {
    // Default Tab Bar
    const nav = document.createElement('div');
    nav.style.cssText = 'position:relative; width:170px; height:38px; border-radius:99px; background:#141722; border:1px solid #282E3D; display:flex; align-items:center; justify-content:space-around; cursor:pointer;';
    nav.innerHTML = `<span style="color:${accent}; font-weight:800; font-size:13px;">★</span><span style="color:#FFF; font-size:13px;">✦</span><span style="color:#FFF; font-size:13px;">⚙️</span>`;
    stage.appendChild(nav);
    restartFn = () => { nav.style.transform = 'scale(1.08)'; setTimeout(() => nav.style.transform = 'none', 180); };
  }

  return { restart: restartFn, destroy: destroyFn };
}
