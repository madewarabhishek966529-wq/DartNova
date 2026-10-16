/**
 * DartNova Navigation & Menus Visualizers (26 Bespoke Modern UI Components)
 * 120 FPS hardware-accelerated animations with interactive mouse/touch triggers
 */

export function renderNavigationVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('radial-menu') || id === 'radial-menu') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:120px; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div class="hub-btn" style="width:42px; height:42px; border-radius:50%; background:${accent}; color:#08090B; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:800; cursor:pointer; z-index:3; box-shadow:0 0 20px ${accent}66; transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">🧭</div>
      <div class="radial-item r-1" style="position:absolute; width:30px; height:30px; border-radius:50%; background:#1C212D; border:1.5px solid ${accent}; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:13px; cursor:pointer; opacity:0; pointer-events:none; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); z-index:2;">🔍</div>
      <div class="radial-item r-2" style="position:absolute; width:30px; height:30px; border-radius:50%; background:#1C212D; border:1.5px solid #42E8F5; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:13px; cursor:pointer; opacity:0; pointer-events:none; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); z-index:2;">⭐</div>
      <div class="radial-item r-3" style="position:absolute; width:30px; height:30px; border-radius:50%; background:#1C212D; border:1.5px solid #9B7CFF; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:13px; cursor:pointer; opacity:0; pointer-events:none; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); z-index:2;">📤</div>
      <div class="radial-item r-4" style="position:absolute; width:30px; height:30px; border-radius:50%; background:#1C212D; border:1.5px solid #FFA500; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:13px; cursor:pointer; opacity:0; pointer-events:none; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); z-index:2;">⚙️</div>
    `;
    let isOpen = false;
    const hub = wrap.querySelector('.hub-btn');
    const items = [
      { el: wrap.querySelector('.r-1'), x: -48, y: 0 },
      { el: wrap.querySelector('.r-2'), x: -30, y: -42 },
      { el: wrap.querySelector('.r-3'), x: 30, y: -42 },
      { el: wrap.querySelector('.r-4'), x: 48, y: 0 }
    ];
    const toggleRadial = () => {
      isOpen = !isOpen;
      hub.style.transform = isOpen ? 'rotate(45deg) scale(1.12)' : 'none';
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

  } else if (id.includes('spring-fab') || id === 'spring-fab') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:150px; height:120px; display:flex; align-items:flex-end; justify-content:center; padding-bottom:8px;';
    wrap.innerHTML = `
      <div class="sfab-stack" style="position:absolute; bottom:56px; display:flex; flex-direction:column; gap:8px; align-items:center; opacity:0; pointer-events:none; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); transform:translateY(16px);">
        <div style="width:32px; height:32px; border-radius:50%; background:#1E2536; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:12px; cursor:pointer;">📁</div>
        <div style="width:32px; height:32px; border-radius:50%; background:#1E2536; border:1.5px solid #42E8F5; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:12px; cursor:pointer;">✏️</div>
      </div>
      <button class="sfab-main" style="width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg, ${accent}, #42E8F5); border:none; color:#08090B; font-size:22px; font-weight:900; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 0 18px ${accent}66; transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);">+</button>
    `;
    let open = false;
    const btn = wrap.querySelector('.sfab-main');
    const stack = wrap.querySelector('.sfab-stack');
    const toggle = () => {
      open = !open;
      btn.style.transform = open ? 'rotate(45deg) scale(1.1)' : 'none';
      stack.style.opacity = open ? '1' : '0';
      stack.style.pointerEvents = open ? 'auto' : 'none';
      stack.style.transform = open ? 'translateY(0)' : 'translateY(16px)';
    };
    btn.addEventListener('click', toggle);
    stage.appendChild(wrap);
    restartFn = toggle;

  } else if (id.includes('fluid-tab-bar') || id === 'fluid-tab-bar') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:180px; height:44px; border-radius:99px; background:#12151E; border:1px solid #283042; display:flex; align-items:center; padding:4px; box-sizing:border-box; cursor:pointer;';
    wrap.innerHTML = `
      <div class="fluid-pill" style="position:absolute; width:52px; height:36px; border-radius:99px; background:${accent}; transition:all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); left:4px; z-index:1;"></div>
      <div style="position:relative; z-index:2; flex:1; text-align:center; font-size:11px; font-weight:800; color:#08090B; transition:color 0.2s;" class="ftab-item t1">Feed</div>
      <div style="position:relative; z-index:2; flex:1; text-align:center; font-size:11px; font-weight:800; color:#A0AEC0; transition:color 0.2s;" class="ftab-item t2">Search</div>
      <div style="position:relative; z-index:2; flex:1; text-align:center; font-size:11px; font-weight:800; color:#A0AEC0; transition:color 0.2s;" class="ftab-item t3">Profile</div>
    `;
    let active = 0;
    const pill = wrap.querySelector('.fluid-pill');
    const items = [wrap.querySelector('.t1'), wrap.querySelector('.t2'), wrap.querySelector('.t3')];
    const selectTab = (idx) => {
      active = idx;
      pill.style.left = `${4 + idx * 58}px`;
      items.forEach((it, i) => {
        it.style.color = i === active ? '#08090B' : '#A0AEC0';
      });
    };
    items.forEach((it, i) => it.addEventListener('click', () => selectTab(i)));
    stage.appendChild(wrap);
    restartFn = () => selectTab((active + 1) % 3);

  } else if (id.includes('animated-bottom-nav') || id === 'animated-bottom-nav') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:185px; height:46px; border-radius:14px; background:#141724; border:1px solid #293246; display:flex; align-items:center; justify-content:space-around; cursor:pointer;';
    wrap.innerHTML = `
      <div class="bnav-icon act" style="display:flex; flex-direction:column; align-items:center; gap:2px; color:${accent}; font-weight:800; font-size:14px; transform:translateY(-4px); transition:all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <span>🏠</span>
        <span style="width:4px; height:4px; border-radius:50%; background:${accent};"></span>
      </div>
      <div class="bnav-icon" style="display:flex; flex-direction:column; align-items:center; gap:2px; color:#718096; font-size:14px; transition:all 0.3s;">
        <span>🔍</span>
      </div>
      <div class="bnav-icon" style="display:flex; flex-direction:column; align-items:center; gap:2px; color:#718096; font-size:14px; transition:all 0.3s;">
        <span>🔔</span>
      </div>
      <div class="bnav-icon" style="display:flex; flex-direction:column; align-items:center; gap:2px; color:#718096; font-size:14px; transition:all 0.3s;">
        <span>👤</span>
      </div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('floating-dock') || id === 'floating-dock') {
    const dock = document.createElement('div');
    dock.style.cssText = 'padding:8px 14px; border-radius:99px; background:rgba(20,24,36,0.85); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.15); display:flex; gap:10px; cursor:pointer; box-shadow:0 10px 25px rgba(0,0,0,0.5);';
    dock.innerHTML = `
      <span class="dk-i" style="font-size:18px; transition:transform 0.2s;">🏠</span>
      <span class="dk-i" style="font-size:18px; transition:transform 0.2s; transform:scale(1.35); color:${accent};">🧭</span>
      <span class="dk-i" style="font-size:18px; transition:transform 0.2s;">📊</span>
      <span class="dk-i" style="font-size:18px; transition:transform 0.2s;">⚙️</span>
    `;
    const icons = dock.querySelectorAll('.dk-i');
    icons.forEach(ic => {
      ic.addEventListener('mouseenter', () => { ic.style.transform = 'scale(1.5) translateY(-4px)'; });
      ic.addEventListener('mouseleave', () => { ic.style.transform = 'none'; });
    });
    stage.appendChild(dock);
    restartFn = () => { dock.style.transform = 'scale(1.12)'; setTimeout(() => dock.style.transform = 'none', 180); };

  } else if (id.includes('expanding-menu') || id === 'expanding-menu') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:150px; height:110px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="exp-card" style="width:120px; height:40px; border-radius:12px; background:#151A26; border:1.5px solid ${accent}; display:flex; flex-direction:column; overflow:hidden; transition:height 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow:0 8px 20px rgba(0,0,0,0.4);">
        <div style="height:40px; display:flex; align-items:center; justify-content:space-between; padding:0 12px; color:#FFF; font-weight:800; font-size:11px;">
          <span>Quick Actions</span><span style="color:${accent};">⚡</span>
        </div>
        <div style="padding:4px 12px; display:flex; flex-direction:column; gap:4px; font-size:9px; color:#A0AEC0;">
          <div>• Export Code</div><div>• Live Preview</div><div>• Share Link</div>
        </div>
      </div>
    `;
    let opened = false;
    const card = wrap.querySelector('.exp-card');
    const toggle = () => {
      opened = !opened;
      card.style.height = opened ? '94px' : '40px';
    };
    wrap.addEventListener('click', toggle);
    stage.appendChild(wrap);
    restartFn = toggle;

  } else if (id.includes('morphing-hamburger') || id === 'morphing-hamburger') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:46px; height:46px; border-radius:12px; background:#151A24; border:1px solid #29344A; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:5px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="h-line l1" style="width:22px; height:2.5px; background:${accent}; border-radius:2px; transition:all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);"></div>
      <div class="h-line l2" style="width:22px; height:2.5px; background:${accent}; border-radius:2px; transition:all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);"></div>
      <div class="h-line l3" style="width:22px; height:2.5px; background:${accent}; border-radius:2px; transition:all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);"></div>
    `;
    let open = false;
    const [l1, l2, l3] = [wrap.querySelector('.l1'), wrap.querySelector('.l2'), wrap.querySelector('.l3')];
    const toggle = () => {
      open = !open;
      l1.style.transform = open ? 'translateY(7.5px) rotate(45deg)' : 'none';
      l2.style.opacity = open ? '0' : '1';
      l3.style.transform = open ? 'translateY(-7.5px) rotate(-45deg)' : 'none';
    };
    wrap.addEventListener('click', toggle);
    stage.appendChild(wrap);
    restartFn = toggle;

  } else if (id.includes('animated-sidebar') || id === 'animated-sidebar') {
    const shell = document.createElement('div');
    shell.style.cssText = 'width:190px; height:105px; border-radius:10px; background:#10131A; border:1px solid #262D3D; display:flex; overflow:hidden; cursor:pointer;';
    shell.innerHTML = `
      <div class="sb-nav" style="width:110px; height:100%; background:#151A24; border-right:1px solid #262D3D; padding:6px; display:flex; flex-direction:column; gap:4px; box-sizing:border-box; transition:transform 0.3s ease;">
        <div style="font-size:9px; font-weight:800; color:${accent};">WORKSPACE</div>
        <div style="padding:4px 6px; border-radius:4px; background:${accent}22; color:${accent}; font-size:9px; font-weight:700;">🏠 Overview</div>
        <div style="padding:4px 6px; border-radius:4px; color:#A0AEC0; font-size:9px;">📦 Registry</div>
        <div style="padding:4px 6px; border-radius:4px; color:#A0AEC0; font-size:9px;">⚙️ Settings</div>
      </div>
      <div style="flex:1; padding:8px; display:flex; align-items:center; justify-content:center; font-size:9px; color:var(--text-muted);">Main Content</div>
    `;
    let collapsed = false;
    const nav = shell.querySelector('.sb-nav');
    shell.addEventListener('click', () => {
      collapsed = !collapsed;
      nav.style.transform = collapsed ? 'translateX(-80px)' : 'none';
    });
    stage.appendChild(shell);
    restartFn = () => shell.click();

  } else if (id.includes('pill-tab-switcher') || id === 'pill-tab-switcher') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:4px; border-radius:99px; background:#141824; border:1px solid #29344A; display:flex; gap:4px; cursor:pointer;';
    wrap.innerHTML = `
      <span class="pt-pill1" style="padding:6px 14px; border-radius:99px; background:${accent}; color:#08090B; font-weight:800; font-size:10px; transition:all 0.3s;">Motion</span>
      <span class="pt-pill2" style="padding:6px 14px; border-radius:99px; color:#A0AEC0; font-weight:700; font-size:10px; transition:all 0.3s;">Assets</span>
    `;
    let toggle = false;
    const [p1, p2] = [wrap.querySelector('.pt-pill1'), wrap.querySelector('.pt-pill2')];
    wrap.addEventListener('click', () => {
      toggle = !toggle;
      p1.style.background = toggle ? 'transparent' : accent;
      p1.style.color = toggle ? '#A0AEC0' : '#08090B';
      p2.style.background = toggle ? accent : 'transparent';
      p2.style.color = toggle ? '#08090B' : '#A0AEC0';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('breadcrumb-reveal') || id === 'breadcrumb-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; gap:6px; font-size:11px; font-weight:800; cursor:pointer;';
    wrap.innerHTML = `
      <span style="color:var(--text-muted); transition:color 0.2s;">Home</span>
      <span style="color:${accent};">›</span>
      <span style="color:var(--text-muted); transition:color 0.2s;">Library</span>
      <span style="color:${accent};">›</span>
      <span style="color:${accent}; font-weight:900;">Motion</span>
    `;
    wrap.addEventListener('mouseenter', () => { wrap.style.transform = 'scale(1.06)'; });
    wrap.addEventListener('mouseleave', () => { wrap.style.transform = 'none'; });
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.12)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('elastic-bottom-bar') || id === 'elastic-bottom-bar') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:170px; height:42px; border-radius:12px; background:#121622; border:1px solid #283144; display:flex; align-items:center; justify-content:space-around; cursor:pointer;';
    wrap.innerHTML = `
      <span class="eb-i" style="font-size:16px; color:${accent}; transform:translateY(-6px); transition:all 0.35s cubic-bezier(0.34, 1.8, 0.64, 1);">⚡</span>
      <span class="eb-i" style="font-size:16px; color:#A0AEC0; transition:all 0.35s;">🧭</span>
      <span class="eb-i" style="font-size:16px; color:#A0AEC0; transition:all 0.35s;">👤</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('circular-speed-dial') || id === 'circular-speed-dial') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:130px; height:120px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="csd-center" style="width:42px; height:42px; border-radius:50%; background:${accent}; color:#08090B; display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:900; z-index:2; box-shadow:0 0 16px ${accent}66; transition:transform 0.3s;">⚙️</div>
      <div class="csd-orb o1" style="position:absolute; width:26px; height:26px; border-radius:50%; background:#171C28; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; font-size:11px; transform:rotate(0deg) translate(46px) rotate(0deg); transition:transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);">★</div>
      <div class="csd-orb o2" style="position:absolute; width:26px; height:26px; border-radius:50%; background:#171C28; border:1.5px solid #42E8F5; display:flex; align-items:center; justify-content:center; font-size:11px; transform:rotate(120deg) translate(46px) rotate(-120deg); transition:transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);">♥</div>
      <div class="csd-orb o3" style="position:absolute; width:26px; height:26px; border-radius:50%; background:#171C28; border:1.5px solid #9B7CFF; display:flex; align-items:center; justify-content:center; font-size:11px; transform:rotate(240deg) translate(46px) rotate(-240deg); transition:transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);">▲</div>
    `;
    let rotated = false;
    wrap.addEventListener('click', () => {
      rotated = !rotated;
      wrap.style.transform = rotated ? 'rotate(60deg)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('magic-indicator-nav') || id === 'magic-indicator-nav') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:180px; height:46px; border-radius:12px; background:#121622; border:1px solid #2A3346; display:flex; align-items:center; justify-content:space-around; cursor:pointer;';
    wrap.innerHTML = `
      <div class="magic-blob" style="position:absolute; width:34px; height:34px; border-radius:50%; background:${accent}; top:-12px; left:22px; transition:all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow:0 0 16px ${accent}66; z-index:1; display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:14px;">★</div>
      <div style="flex:1; text-align:center; z-index:2; font-size:14px; color:#FFF;">🏠</div>
      <div style="flex:1; text-align:center; z-index:2; font-size:14px; color:#718096;">⚡</div>
      <div style="flex:1; text-align:center; z-index:2; font-size:14px; color:#718096;">👤</div>
    `;
    let slot = 0;
    const blob = wrap.querySelector('.magic-blob');
    const step = () => {
      slot = (slot + 1) % 3;
      blob.style.left = `${22 + slot * 60}px`;
    };
    wrap.addEventListener('click', step);
    stage.appendChild(wrap);
    restartFn = step;

  } else if (id.includes('bubble-tab-nav') || id === 'bubble-tab-nav') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:180px; height:44px; border-radius:99px; background:#151A26; border:1px solid #2B3448; display:flex; align-items:center; justify-content:space-around; cursor:pointer;';
    wrap.innerHTML = `
      <div class="btab-b" style="padding:6px 14px; border-radius:99px; background:${accent}22; border:1.5px solid ${accent}; color:${accent}; font-weight:800; font-size:11px; display:flex; align-items:center; gap:4px; transform:scale(1.08);">
        <span>💬</span><span>Chat</span>
      </div>
      <span style="font-size:14px; color:#718096;">🔔</span>
      <span style="font-size:14px; color:#718096;">⚙️</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('mega-menu-cascade') || id === 'mega-menu-cascade') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:180px; height:110px; border-radius:10px; background:#11151E; border:1px solid #262E3E; overflow:hidden; cursor:pointer; padding:8px; box-sizing:border-box;';
    wrap.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; font-size:10px; font-weight:800; color:#FFF; border-bottom:1px solid #262E3E; padding-bottom:4px;">
        <span style="color:${accent};">Explore Modules</span><span>▾</span>
      </div>
      <div class="mm-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-top:8px;">
        <div style="background:#161C28; padding:4px 6px; border-radius:6px; font-size:8px; color:#FFF; border:1px solid ${accent}44;">🚀 Shaders</div>
        <div style="background:#161C28; padding:4px 6px; border-radius:6px; font-size:8px; color:#FFF;">💡 3D Views</div>
        <div style="background:#161C28; padding:4px 6px; border-radius:6px; font-size:8px; color:#FFF;">📊 Charts</div>
        <div style="background:#161C28; padding:4px 6px; border-radius:6px; font-size:8px; color:#FFF;">🤖 AI Flow</div>
      </div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.05)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('bottom-sheet-nav') || id === 'bottom-sheet-nav') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:180px; height:105px; border-radius:12px; background:#10131A; border:1px solid #262D3D; overflow:hidden; display:flex; flex-direction:column; justify-content:flex-end; cursor:pointer;';
    wrap.innerHTML = `
      <div style="flex:1; display:flex; align-items:center; justify-content:center; font-size:9px; color:var(--text-muted);">Tap to slide nav sheet</div>
      <div class="bs-sheet" style="background:#171C28; border-top:2px solid ${accent}; border-radius:10px 10px 0 0; padding:8px; display:flex; justify-content:space-around; align-items:center; transform:translateY(0); transition:transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <span style="font-size:12px; color:${accent}; font-weight:800;">🧭 Nav</span>
        <span style="font-size:12px; color:#A0AEC0;">📁 Files</span>
        <span style="font-size:12px; color:#A0AEC0;">⚙️ Config</span>
      </div>
    `;
    let open = true;
    const sheet = wrap.querySelector('.bs-sheet');
    wrap.addEventListener('click', () => {
      open = !open;
      sheet.style.transform = open ? 'translateY(0)' : 'translateY(60%)';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('carousel-indicator-nav') || id === 'carousel-indicator-nav') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; gap:8px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="ci-dot" style="width:24px; height:8px; border-radius:99px; background:${accent}; box-shadow:0 0 10px ${accent}66; transition:all 0.3s;"></div>
      <div class="ci-dot" style="width:8px; height:8px; border-radius:50%; background:#2A3346; transition:all 0.3s;"></div>
      <div class="ci-dot" style="width:8px; height:8px; border-radius:50%; background:#2A3346; transition:all 0.3s;"></div>
      <div class="ci-dot" style="width:8px; height:8px; border-radius:50%; background:#2A3346; transition:all 0.3s;"></div>
    `;
    let active = 0;
    const dots = wrap.querySelectorAll('.ci-dot');
    const cycle = () => {
      active = (active + 1) % 4;
      dots.forEach((d, i) => {
        if (i === active) {
          d.style.width = '24px';
          d.style.borderRadius = '99px';
          d.style.background = accent;
          d.style.boxShadow = `0 0 10px ${accent}66`;
        } else {
          d.style.width = '8px';
          d.style.borderRadius = '50%';
          d.style.background = '#2A3346';
          d.style.boxShadow = 'none';
        }
      });
    };
    wrap.addEventListener('click', cycle);
    stage.appendChild(wrap);
    restartFn = cycle;

  } else if (id.includes('drawer-morph-nav') || id === 'drawer-morph-nav') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:400px; width:180px; height:105px; border-radius:10px; background:#0E1118; border:1px solid #262D3E; overflow:hidden; display:flex; cursor:pointer;';
    wrap.innerHTML = `
      <div class="dm-pane" style="width:100px; height:100%; background:#161B27; border-right:1px solid ${accent}44; padding:8px; box-sizing:border-box; transform-origin:left center; transform:rotateY(-25deg); transition:transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <div style="font-size:9px; font-weight:800; color:${accent};">FOLDED 3D</div>
        <div style="font-size:8px; color:#A0AEC0; margin-top:4px;">• Perspective</div>
        <div style="font-size:8px; color:#A0AEC0;">• Depth Fold</div>
      </div>
      <div style="flex:1; display:flex; align-items:center; justify-content:center; font-size:9px; color:var(--text-muted);">Tap Unfold</div>
    `;
    let flat = false;
    const pane = wrap.querySelector('.dm-pane');
    wrap.addEventListener('click', () => {
      flat = !flat;
      pane.style.transform = flat ? 'rotateY(0deg)' : 'rotateY(-25deg)';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('floating-pill-dock') || id === 'floating-pill-dock') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:6px 16px; border-radius:99px; background:rgba(18,22,34,0.9); border:1.5px solid ${accent}; display:flex; align-items:center; gap:12px; cursor:pointer; box-shadow:0 0 16px ${accent}44;';
    wrap.innerHTML = `
      <span style="font-size:14px; color:${accent};">⚡</span>
      <span style="font-size:12px; font-weight:800; color:#FFF;">Pill Dock</span>
      <span style="font-size:14px; color:#A0AEC0;">🔔</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('segmented-control-nav') || id === 'segmented-control-nav') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:180px; height:38px; border-radius:8px; background:#121622; border:1px solid #273144; display:flex; padding:3px; box-sizing:border-box; cursor:pointer;';
    wrap.innerHTML = `
      <div class="seg-ind" style="position:absolute; width:56px; height:30px; border-radius:6px; background:#1E2536; border:1px solid ${accent}; transition:transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); left:3px; top:3px;"></div>
      <div style="position:relative; z-index:2; flex:1; text-align:center; font-size:10px; font-weight:800; color:#FFF; line-height:30px;" class="sc-i1">Day</div>
      <div style="position:relative; z-index:2; flex:1; text-align:center; font-size:10px; font-weight:800; color:#A0AEC0; line-height:30px;" class="sc-i2">Week</div>
      <div style="position:relative; z-index:2; flex:1; text-align:center; font-size:10px; font-weight:800; color:#A0AEC0; line-height:30px;" class="sc-i3">Month</div>
    `;
    let sel = 0;
    const ind = wrap.querySelector('.seg-ind');
    const step = () => {
      sel = (sel + 1) % 3;
      ind.style.transform = `translateX(${sel * 58}px)`;
    };
    wrap.addEventListener('click', step);
    stage.appendChild(wrap);
    restartFn = step;

  } else if (id.includes('staggered-tree-nav') || id === 'staggered-tree-nav') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:180px; height:105px; border-radius:10px; background:#11151F; border:1px solid #273144; padding:8px; box-sizing:border-box; display:flex; flex-direction:column; gap:4px; font-size:9px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="font-weight:800; color:${accent};">📁 Root / Design System</div>
      <div style="padding-left:12px; color:#FFF; border-left:1.5px dashed ${accent};">└ 📂 Components</div>
      <div style="padding-left:24px; color:#A0AEC0; border-left:1.5px dashed ${accent};">└ 📄 Buttons.dart</div>
      <div style="padding-left:24px; color:#A0AEC0; border-left:1.5px dashed ${accent};">└ 📄 Shaders.frag</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.05)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('sticky-header-morph') || id === 'sticky-header-morph') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:180px; height:105px; border-radius:10px; background:#10131A; border:1px solid #262D3D; overflow:hidden; cursor:pointer;';
    wrap.innerHTML = `
      <div class="shm-bar" style="position:absolute; top:0; left:0; right:0; height:38px; background:#171C28; border-bottom:1.5px solid ${accent}; display:flex; align-items:center; justify-content:space-between; padding:0 10px; transition:height 0.3s;">
        <span style="font-size:10px; font-weight:800; color:#FFF;">DartNova</span>
        <span style="font-size:9px; color:${accent}; font-family:var(--font-mono);">120 FPS</span>
      </div>
      <div style="margin-top:46px; padding:8px; font-size:8px; color:var(--text-muted); text-align:center;">Tap to morph header height</div>
    `;
    let collapsed = false;
    const bar = wrap.querySelector('.shm-bar');
    wrap.addEventListener('click', () => {
      collapsed = !collapsed;
      bar.style.height = collapsed ? '26px' : '38px';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('magnetic-menu-item') || id === 'magnetic-menu-item') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:10px 22px; border-radius:10px; background:#151A24; border:1.5px solid ${accent}; color:#FFF; font-size:12px; font-weight:800; cursor:pointer; transition:transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow:0 0 16px ${accent}44;';
    wrap.innerHTML = `<span style="color:${accent};">🧲</span> Magnetic Link`;
    wrap.addEventListener('mouseenter', () => { wrap.style.transform = 'translate(6px, -4px) scale(1.1)'; });
    wrap.addEventListener('mouseleave', () => { wrap.style.transform = 'none'; });
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'translate(8px, -6px) scale(1.12)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('corner-fab-menu') || id === 'corner-fab-menu') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:140px; height:110px; border-radius:10px; background:#10131A; border:1px solid #262D3D; overflow:hidden; cursor:pointer;';
    wrap.innerHTML = `
      <div class="cfm-btn" style="position:absolute; bottom:-10px; right:-10px; width:50px; height:50px; border-radius:50%; background:${accent}; display:flex; align-items:center; justify-content:center; color:#08090B; font-size:18px; font-weight:900; z-index:2; transition:transform 0.3s;">★</div>
      <div class="cfm-item" style="position:absolute; bottom:46px; right:12px; width:26px; height:26px; border-radius:50%; background:#1A202E; border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; font-size:11px; opacity:0; transition:all 0.3s;">⚡</div>
      <div class="cfm-item2" style="position:absolute; bottom:12px; right:46px; width:26px; height:26px; border-radius:50%; background:#1A202E; border:1px solid #42E8F5; display:flex; align-items:center; justify-content:center; font-size:11px; opacity:0; transition:all 0.3s;">🔍</div>
    `;
    let open = false;
    const [b, i1, i2] = [wrap.querySelector('.cfm-btn'), wrap.querySelector('.cfm-item'), wrap.querySelector('.cfm-item2')];
    wrap.addEventListener('click', () => {
      open = !open;
      b.style.transform = open ? 'rotate(45deg)' : 'none';
      i1.style.opacity = open ? '1' : '0';
      i2.style.opacity = open ? '1' : '0';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('slide-indicator-tabs') || id === 'slide-indicator-tabs') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:180px; height:36px; display:flex; border-bottom:1.5px solid #283042; cursor:pointer;';
    wrap.innerHTML = `
      <div class="sit-bar" style="position:absolute; bottom:-1.5px; left:0; width:60px; height:2px; background:${accent}; box-shadow:0 0 10px ${accent}; transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);"></div>
      <div style="flex:1; text-align:center; font-size:11px; font-weight:800; color:#FFF; line-height:34px;">All</div>
      <div style="flex:1; text-align:center; font-size:11px; font-weight:800; color:#A0AEC0; line-height:34px;">Live</div>
      <div style="flex:1; text-align:center; font-size:11px; font-weight:800; color:#A0AEC0; line-height:34px;">Docs</div>
    `;
    let tab = 0;
    const bar = wrap.querySelector('.sit-bar');
    const step = () => {
      tab = (tab + 1) % 3;
      bar.style.transform = `translateX(${tab * 60}px)`;
    };
    wrap.addEventListener('click', step);
    stage.appendChild(wrap);
    restartFn = step;

  } else {
    // 26. pie-menu-wheel & default radial wheel
    const wrap = document.createElement('div');
    wrap.style.cssText = `position:relative; width:76px; height:76px; border-radius:50%; border:2px dashed ${accent}; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:11px; font-weight:900; color:${accent}; box-shadow:0 0 14px ${accent}44; transition:transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);`;
    wrap.innerHTML = `<span>8-PIE</span>`;
    let deg = 0;
    wrap.addEventListener('click', () => {
      deg += 45;
      wrap.style.transform = `rotate(${deg}deg) scale(1.12)`;
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();
  }

  return { restart: restartFn, destroy: destroyFn };
}
