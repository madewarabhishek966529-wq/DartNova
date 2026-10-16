/**
 * DartNova Images & Media Visualizers (10 Bespoke Modern UI Components)
 */

export function renderMediaVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('avatar-group') || id === 'avatar-group') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; cursor:pointer;';
    const avatars = [
      { name: 'Alex', bg: '#FF6B6B', icon: 'AR' },
      { name: 'Sarah', bg: '#4ECDC4', icon: 'SL' },
      { name: 'Kenji', bg: accent, icon: 'KM' },
      { name: 'Maya', bg: '#9B7CFF', icon: 'MN' }
    ];
    wrap.innerHTML = avatars.map((a, i) => `
      <div class="av-item a-${i}" style="position:relative; width:34px; height:34px; border-radius:50%; background:${a.bg}; color:#08090B; font-weight:800; font-size:12px; display:flex; align-items:center; justify-content:center; border:2px solid #111318; margin-left:${i === 0 ? '0' : '-10px'}; transition:transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), margin 0.3s ease; box-shadow:0 4px 10px rgba(0,0,0,0.5);">
        ${a.icon}
      </div>
    `).join('') + `<div style="margin-left:8px; font-size:10px; font-weight:700; color:#FFF;">+14 more</div>`;
    let expanded = false;
    const toggleAvatars = () => {
      expanded = !expanded;
      wrap.querySelectorAll('.av-item').forEach((item, i) => {
        item.style.marginLeft = (i === 0) ? '0' : (expanded ? '4px' : '-10px');
        item.style.transform = expanded ? 'translateY(-4px) scale(1.1)' : 'none';
      });
    };
    wrap.addEventListener('click', toggleAvatars);
    stage.appendChild(wrap);
    restartFn = toggleAvatars;

  } else if (id.includes('zoom-reveal') || id === 'image-zoom-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:100px; border-radius:10px; overflow:hidden; border:1px solid #282E3D; background:#12151E; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div class="zr-img" style="position:absolute; inset:0; background:linear-gradient(135deg, #1C2436, #2E1A47, ${accent}44); display:flex; flex-direction:column; align-items:center; justify-content:center; transform:scale(1.3); transition:transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);">
        <span style="font-size:26px;">🏔️</span>
        <span style="font-size:9px; font-weight:800; color:#FFF; margin-top:4px;">Mountain Ridge</span>
      </div>
      <div style="position:absolute; bottom:6px; font-size:8px; color:var(--text-muted); background:rgba(0,0,0,0.6); padding:2px 6px; border-radius:3px;">Tap Zoom Reveal</div>
    `;
    let zoomed = false;
    const img = wrap.querySelector('.zr-img');
    const toggleZoom = () => {
      zoomed = !zoomed;
      img.style.transform = zoomed ? 'scale(1)' : 'scale(1.3)';
    };
    wrap.addEventListener('click', toggleZoom);
    stage.appendChild(wrap);
    restartFn = toggleZoom;

  } else if (id.includes('ken-burns') || id === 'ken-burns-image') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:100px; border-radius:10px; overflow:hidden; border:1px solid #282E3D; background:#10131B; cursor:pointer;';
    wrap.innerHTML = `
      <div class="kb-canvas" style="position:absolute; inset:-20px; background:radial-gradient(circle at 70% 30%, ${accent}33 0%, transparent 60%), linear-gradient(135deg, #162035, #261633); display:flex; align-items:center; justify-content:center; transition:transform 0.8s ease-out;">
        <span style="font-size:32px;">🌌</span>
      </div>
      <div style="position:absolute; bottom:6px; left:8px; right:8px; display:flex; justify-content:space-between; font-size:8px; font-weight:800; color:#FFF; background:rgba(0,0,0,0.6); padding:4px 6px; border-radius:4px; backdrop-filter:blur(4px);">
        <span>Ken Burns Motion</span><span style="color:${accent};">PAN & ZOOM</span>
      </div>
    `;
    let panned = false;
    const canvas = wrap.querySelector('.kb-canvas');
    const togglePan = () => {
      panned = !panned;
      canvas.style.transform = panned ? 'scale(1.2) translate(-10px, 8px)' : 'none';
    };
    wrap.addEventListener('click', togglePan);
    stage.appendChild(wrap);
    restartFn = togglePan;

  } else if (id.includes('comparison') || id === 'image-comparison-slider') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:100px; border-radius:10px; overflow:hidden; border:1px solid #282E3D; cursor:ew-resize;';
    wrap.innerHTML = `
      <div style="position:absolute; inset:0; background:#161D2A; display:flex; flex-direction:column; align-items:center; justify-content:center; color:var(--text-muted); font-size:9px; font-weight:700;">
        <span style="font-size:20px; filter:grayscale(1);">🎨</span><span>RAW DRAFT</span>
      </div>
      <div class="cs-clip" style="position:absolute; inset:0; width:50%; background:linear-gradient(135deg, #1C2333, #221828); border-right:2px solid ${accent}; display:flex; flex-direction:column; align-items:center; justify-content:center; color:${accent}; font-size:9px; font-weight:800; overflow:hidden;">
        <span style="font-size:20px;">🎨</span><span>GRADED 120 FPS</span>
      </div>
      <div class="cs-handle" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:18px; height:18px; border-radius:50%; background:${accent}; color:#08090B; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:900; box-shadow:0 0 10px ${accent};">
        ↔
      </div>
    `;
    const clip = wrap.querySelector('.cs-clip');
    const handle = wrap.querySelector('.cs-handle');
    wrap.addEventListener('mousemove', (e) => {
      const r = wrap.getBoundingClientRect();
      const pct = Math.max(10, Math.min(90, ((e.clientX - r.left) / r.width) * 100));
      clip.style.width = `${pct}%`;
      handle.style.left = `${pct}%`;
    });
    stage.appendChild(wrap);
    restartFn = () => { clip.style.width = '75%'; handle.style.left = '75%'; setTimeout(() => { clip.style.width = '50%'; handle.style.left = '50%'; }, 350); };

  } else if (id.includes('diagonal-image') || id === 'diagonal-image-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:100px; border-radius:10px; overflow:hidden; border:1px solid #282E3D; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; inset:0; background:#121620; display:flex; align-items:center; justify-content:center; font-size:24px;">📸</div>
      <div class="dir-shutter" style="position:absolute; inset:0; background:#0B0D12; clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%); transition:clip-path 0.45s cubic-bezier(0.2, 0.8, 0.2, 1); display:flex; align-items:center; justify-content:center; color:${accent}; font-size:9px; font-weight:800;">
        Angled Shutter Closed
      </div>
    `;
    let opened = false;
    const shutter = wrap.querySelector('.dir-shutter');
    const toggleShutter = () => {
      opened = !opened;
      shutter.style.clipPath = opened ? 'polygon(0 0, 0 0, 0 100%, 0 100%)' : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
    };
    wrap.addEventListener('click', toggleShutter);
    stage.appendChild(wrap);
    restartFn = toggleShutter;

  } else if (id.includes('blur-to-sharp') || id === 'image-blur-to-sharp') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:100px; border-radius:10px; overflow:hidden; border:1px solid #282E3D; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div class="bts-photo" style="position:absolute; inset:0; background:linear-gradient(135deg, #FF6B6B, ${accent}); filter:blur(10px); transition:filter 0.5s ease; display:flex; align-items:center; justify-content:center; font-size:32px;">🌺</div>
      <div style="position:relative; z-index:2; font-size:9px; font-weight:800; color:#FFF; background:rgba(0,0,0,0.65); padding:4px 8px; border-radius:4px;">Focus Pull</div>
    `;
    let sharp = false;
    const photo = wrap.querySelector('.bts-photo');
    const toggleFocus = () => {
      sharp = !sharp;
      photo.style.filter = sharp ? 'blur(0px)' : 'blur(10px)';
    };
    wrap.addEventListener('click', toggleFocus);
    stage.appendChild(wrap);
    restartFn = toggleFocus;

  } else if (id.includes('mask-transition') || id === 'image-mask-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:100px; border-radius:10px; overflow:hidden; border:1px solid #282E3D; background:#101319; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div class="mask-box" style="width:50px; height:50px; background:linear-gradient(135deg, ${accent}, #42E8F5); clip-path:polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); transition:all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1); display:flex; align-items:center; justify-content:center; font-size:18px;">💎</div>
      <div style="position:absolute; bottom:6px; font-size:8px; color:var(--text-muted);">Geometric Diamond Mask</div>
    `;
    let expanded = false;
    const box = wrap.querySelector('.mask-box');
    const toggleMask = () => {
      expanded = !expanded;
      box.style.width = expanded ? '100%' : '50px';
      box.style.height = expanded ? '100%' : '50px';
      box.style.clipPath = expanded ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
    };
    wrap.addEventListener('click', toggleMask);
    stage.appendChild(wrap);
    restartFn = toggleMask;

  } else if (id.includes('circular-image') || id === 'circular-image-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:100px; border-radius:10px; overflow:hidden; border:1px solid #282E3D; background:#101319; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; inset:0; background:#121622; display:flex; align-items:center; justify-content:center; font-size:9px; color:var(--text-muted);">Aperture Closed</div>
      <div class="cir-layer" style="position:absolute; inset:0; background:linear-gradient(135deg, #1C263A, #2A1B36); border:1px solid ${accent}; clip-path:circle(0% at 50% 50%); transition:clip-path 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px;">
        <span style="font-size:24px;">📷</span>
        <span style="font-size:9px; font-weight:800; color:${accent};">Iris Aperture Open</span>
      </div>
    `;
    let open = false;
    const layer = wrap.querySelector('.cir-layer');
    const toggleIris = () => {
      open = !open;
      layer.style.clipPath = open ? 'circle(120% at 50% 50%)' : 'circle(0% at 50% 50%)';
    };
    wrap.addEventListener('click', toggleIris);
    stage.appendChild(wrap);
    restartFn = toggleIris;

  } else if (id.includes('masonry') || id === 'masonry-grid-entrance') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:5px; width:160px; height:90px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="flex:1; display:flex; flex-direction:column; gap:5px;">
        <div class="mg-t t1" style="height:50px; background:#19202E; border-radius:6px; border:1px solid ${accent}66; transition:transform 0.3s;"></div>
        <div class="mg-t t2" style="height:35px; background:#151A24; border-radius:6px; transition:transform 0.3s;"></div>
      </div>
      <div style="flex:1; display:flex; flex-direction:column; gap:5px;">
        <div class="mg-t t3" style="height:35px; background:#151A24; border-radius:6px; transition:transform 0.3s;"></div>
        <div class="mg-t t4" style="height:50px; background:#1E1C2B; border:1px solid #42E8F566; border-radius:6px; transition:transform 0.3s;"></div>
      </div>
    `;
    const pulseTiles = () => {
      wrap.querySelectorAll('.mg-t').forEach((t, i) => {
        setTimeout(() => {
          t.style.transform = 'scale(0.92)';
          setTimeout(() => t.style.transform = 'none', 140);
        }, i * 60);
      });
    };
    wrap.addEventListener('click', pulseTiles);
    stage.appendChild(wrap);
    restartFn = pulseTiles;

  } else {
    // Video Thumbnail Hover
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:100px; border-radius:10px; overflow:hidden; border:1px solid #282E3D; background:#11151F; cursor:pointer; display:flex; flex-direction:column; justify-content:space-between; padding:8px; box-sizing:border-box; transition:transform 0.25s ease;';
    wrap.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:8px; font-weight:800; background:rgba(0,0,0,0.6); color:#FFF; padding:2px 4px; border-radius:3px;">4K 120 FPS</span>
        <span style="font-size:8px; color:${accent}; font-weight:700;">12:45</span>
      </div>
      <div class="v-play" style="align-self:center; width:30px; height:30px; border-radius:50%; background:${accent}; color:#08090B; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:900; box-shadow:0 0 14px ${accent}66; transition:transform 0.2s;">▶</div>
      <div style="height:3px; background:#2A3245; border-radius:2px; overflow:hidden;">
        <div class="v-bar" style="width:40%; height:100%; background:${accent}; transition:width 0.4s ease;"></div>
      </div>
    `;
    const play = wrap.querySelector('.v-play');
    const bar = wrap.querySelector('.v-bar');
    wrap.addEventListener('mouseenter', () => {
      wrap.style.transform = 'scale(1.04)';
      play.style.transform = 'scale(1.15)';
      bar.style.width = '80%';
    });
    wrap.addEventListener('mouseleave', () => {
      wrap.style.transform = 'none';
      play.style.transform = 'none';
      bar.style.width = '40%';
    });
    stage.appendChild(wrap);
    restartFn = () => { play.style.transform = 'scale(1.25)'; setTimeout(() => play.style.transform = 'none', 180); };
  }

  return { restart: restartFn, destroy: destroyFn };
}
