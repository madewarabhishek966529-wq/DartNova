/**
 * DartNova Media & Visual Storytelling Visualizers (26 Bespoke Modern UI Components)
 * 120 FPS hardware-accelerated animations with interactive mouse/touch triggers
 */

export function renderMediaVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('avatar-group') || id === 'avatar-group') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:34px; height:34px; border-radius:50%; background:${accent}; border:2px solid #10131A; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:900; color:#08090B;">A</div>
      <div style="width:34px; height:34px; border-radius:50%; background:#42E8F5; border:2px solid #10131A; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:900; color:#08090B; margin-left:-10px;">B</div>
      <div style="width:34px; height:34px; border-radius:50%; background:#9B7CFF; border:2px solid #10131A; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:900; color:#FFF; margin-left:-10px;">C</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('image-zoom-reveal') || id === 'image-zoom-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:150px; height:90px; border-radius:10px; overflow:hidden; border:1px solid #282E3D; cursor:pointer;';
    wrap.innerHTML = `
      <div class="izr-bg" style="width:100%; height:100%; background:linear-gradient(135deg, #FF6B6B, ${accent}); transition:transform 0.4s ease; display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:12px;">Zoom Photo</div>
    `;
    const bg = wrap.querySelector('.izr-bg');
    wrap.addEventListener('mouseenter', () => { bg.style.transform = 'scale(1.2)'; });
    wrap.addEventListener('mouseleave', () => { bg.style.transform = 'none'; });
    stage.appendChild(wrap);
    restartFn = () => { bg.style.transform = 'scale(1.25)'; setTimeout(() => bg.style.transform = 'none', 300); };

  } else if (id.includes('ken-burns') || id === 'ken-burns-image') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:150px; height:90px; border-radius:10px; overflow:hidden; border:1px solid #282E3D; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:100%; height:100%; background:linear-gradient(45deg, #1A2130, #2C3852); display:flex; flex-direction:column; align-items:center; justify-content:center; animation:dnFloatLevitate 4s infinite alternate;">
        <span style="font-size:20px;">🌄</span>
        <span style="font-size:8px; color:#FFF; font-weight:800; margin-top:2px;">Ken Burns Pan</span>
      </div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('comparison-slider') || id === 'image-comparison-slider') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:150px; height:90px; border-radius:10px; overflow:hidden; border:1px solid #282E3D; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; inset:0; background:#181F2E; display:flex; align-items:center; justify-content:flex-end; padding-right:12px; color:var(--text-muted); font-size:9px; font-weight:800;">AFTER</div>
      <div class="cs-before" style="position:absolute; inset:0; width:50%; background:${accent}44; border-right:2px solid ${accent}; display:flex; align-items:center; padding-left:12px; color:#FFF; font-size:9px; font-weight:800; transition:width 0.3s;">BEFORE</div>
    `;
    let expanded = false;
    const bef = wrap.querySelector('.cs-before');
    wrap.addEventListener('click', () => {
      expanded = !expanded;
      bef.style.width = expanded ? '80%' : '35%';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('diagonal-image-reveal') || id === 'diagonal-image-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:150px; height:90px; border-radius:10px; overflow:hidden; border:1px solid #282E3D; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div style="font-size:10px; font-weight:900; color:#FFF;">Diagonal Reveal</div>
      <div class="dir-mask" style="position:absolute; inset:0; background:${accent}; clip-path:polygon(0 0, 100% 0, 0 100%); transition:transform 0.4s ease; opacity:0.6;"></div>
    `;
    let opened = false;
    const mask = wrap.querySelector('.dir-mask');
    wrap.addEventListener('click', () => {
      opened = !opened;
      mask.style.transform = opened ? 'translate(-100%, -100%)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('blur-to-sharp') || id === 'image-blur-to-sharp') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:150px; height:90px; border-radius:10px; background:linear-gradient(135deg, #1F2738, #34435F); border:1.5px solid ${accent}; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; transition:filter 0.4s;';
    wrap.innerHTML = `<span style="font-size:20px;">🖼️</span><span style="font-size:8px; font-weight:800; color:#FFF;">Tap Blur / Sharp</span>`;
    let blurred = false;
    wrap.addEventListener('click', () => {
      blurred = !blurred;
      wrap.style.filter = blurred ? 'blur(6px)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('image-mask-transition') || id === 'image-mask-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:150px; height:90px; border-radius:10px; background:#141926; border:1px solid #282E3D; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:70px; height:70px; background:${accent}; clip-path:polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%); display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:10px;">MASK</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15) rotate(15deg)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('circular-image-reveal') || id === 'circular-image-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:70px; height:70px; border-radius:50%; border:2px solid ${accent}; display:flex; align-items:center; justify-content:center; cursor:pointer; overflow:hidden; background:#1C2436;';
    wrap.innerHTML = `<span style="font-size:24px;">📸</span>`;
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.3) rotate(20deg)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('masonry-grid-entrance') || id === 'masonry-grid-entrance') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:6px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:40px; height:60px; border-radius:4px; background:#1C2333; border:1px solid ${accent};"></div>
      <div style="width:40px; height:45px; border-radius:4px; background:#1C2333; border:1px solid #42E8F5;"></div>
      <div style="width:40px; height:70px; border-radius:4px; background:#1C2333; border:1px solid #9B7CFF;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('video-thumbnail-hover') || id === 'video-thumbnail-hover') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:150px; height:90px; border-radius:10px; background:#121622; border:1px solid #282E3D; display:flex; align-items:center; justify-content:center; cursor:pointer; overflow:hidden;';
    wrap.innerHTML = `
      <div class="vth-btn" style="width:36px; height:36px; border-radius:50%; background:${accent}; display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:14px; transition:transform 0.3s;">▶</div>
    `;
    const btn = wrap.querySelector('.vth-btn');
    wrap.addEventListener('mouseenter', () => { btn.style.transform = 'scale(1.3)'; });
    wrap.addEventListener('mouseleave', () => { btn.style.transform = 'none'; });
    stage.appendChild(wrap);
    restartFn = () => { btn.style.transform = 'scale(1.4)'; setTimeout(() => btn.style.transform = 'none', 250); };

  } else if (id.includes('glitch-photo-distort') || id === 'glitch-photo-distort') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:150px; height:90px; border-radius:10px; background:#0F121A; border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:900; font-size:11px; cursor:pointer; text-shadow:2px 0 #FF4B72, -2px 0 #42E8F5;';
    wrap.textContent = 'PHOTO GLITCH';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'skewX(15deg) scale(1.05)';
      setTimeout(() => { wrap.style.transform = 'skewX(-10deg)'; setTimeout(() => wrap.style.transform = 'none', 80); }, 80);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('lens-flare-panorama') || id === 'lens-flare-panorama') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:150px; height:90px; border-radius:10px; background:#0D111A; border:1px solid #282E3D; overflow:hidden; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div class="lf-ray" style="position:absolute; width:120px; height:120px; border-radius:50%; background:radial-gradient(circle, #FFF 0%, ${accent} 40%, transparent 70%); opacity:0.6; transition:transform 0.4s;"></div>
      <span style="position:relative; z-index:1; font-size:9px; font-weight:800; color:#FFF;">Lens Flare</span>
    `;
    const ray = wrap.querySelector('.lf-ray');
    wrap.addEventListener('click', () => {
      ray.style.transform = 'translateX(40px) scale(1.3)';
      setTimeout(() => ray.style.transform = 'none', 300);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('polaroid-scatter-desk') || id === 'polaroid-scatter-desk') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:80px; height:95px; background:#FFF; border-radius:4px; padding:6px 6px 16px; box-sizing:border-box; transform:rotate(-6deg); cursor:pointer; box-shadow:0 8px 18px rgba(0,0,0,0.5); display:flex; flex-direction:column; align-items:center;';
    wrap.innerHTML = `
      <div style="width:100%; height:60px; background:#181F2E; border-radius:2px; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:12px;">📷</div>
      <span style="font-size:7px; font-weight:900; color:#08090B; margin-top:4px;">Polaroid '26</span>
    `;
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'rotate(8deg) scale(1.15)';
      setTimeout(() => wrap.style.transform = 'rotate(-6deg)', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('film-strip-reel') || id === 'film-strip-reel') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:4px; padding:4px 6px; background:#0B0E14; border:1px solid #282E3D; border-radius:6px; cursor:pointer;';
    for (let i = 0; i < 3; i++) {
      wrap.innerHTML += `<div style="width:36px; height:45px; background:#1C2436; border:1px solid ${accent}; border-radius:2px;"></div>`;
    }
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('duotone-color-shift') || id === 'duotone-color-shift') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:140px; height:85px; border-radius:8px; background:linear-gradient(135deg, #FF4B72, #42E8F5); display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:900; font-size:11px; cursor:pointer;';
    wrap.textContent = 'DUOTONE';
    wrap.addEventListener('click', () => {
      wrap.style.background = 'linear-gradient(135deg, ' + accent + ', #9B7CFF)';
      setTimeout(() => { wrap.style.background = 'linear-gradient(135deg, #FF4B72, #42E8F5)'; }, 600);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('hover-silhouette-reveal') || id === 'hover-silhouette-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:140px; height:85px; border-radius:8px; overflow:hidden; background:#161C28; border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `<span style="font-size:24px;">🎭 Silhouette</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('spotlight-magnifier-lens') || id === 'spotlight-magnifier-lens') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:150px; height:90px; border-radius:10px; background:#11151F; border:1px solid #282E3D; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="font-size:9px; color:#FFF;">Macro Details</div>
      <div class="sml-lens" style="position:absolute; width:40px; height:40px; border-radius:50%; border:2px solid ${accent}; background:${accent}22; box-shadow:0 0 16px ${accent}66; pointer-events:none;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('card-stack-gallery') || id === 'card-stack-gallery') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:120px; height:80px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; width:90px; height:60px; border-radius:6px; background:#141926; border:1px solid #283144; transform:rotate(-8deg);"></div>
      <div style="position:absolute; width:90px; height:60px; border-radius:6px; background:#1A2132; border:1.5px solid ${accent}; transform:rotate(4deg); display:flex; align-items:center; justify-content:center; color:#FFF; font-size:8px; font-weight:800;">Top Photo</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15) rotate(10deg)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('split-image-curtain') || id === 'split-image-curtain') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:140px; height:85px; border-radius:8px; overflow:hidden; border:1px solid #282E3D; cursor:pointer; display:flex;';
    wrap.innerHTML = `
      <div class="sic-l" style="flex:1; background:#1C2436; border-right:1px solid ${accent}; transition:transform 0.3s;"></div>
      <div class="sic-r" style="flex:1; background:#1C2436; transition:transform 0.3s;"></div>
    `;
    let open = false;
    const [cL, cR] = [wrap.querySelector('.sic-l'), wrap.querySelector('.sic-r')];
    wrap.addEventListener('click', () => {
      open = !open;
      cL.style.transform = open ? 'translateX(-30px)' : 'none';
      cR.style.transform = open ? 'translateX(30px)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('dynamic-blur-reflection') || id === 'dynamic-blur-reflection') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:120px; height:70px; border-radius:8px; background:linear-gradient(135deg, ${accent}, #42E8F5); display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:10px; cursor:pointer; box-shadow:0 14px 28px ${accent}66;';
    wrap.textContent = 'Glow Reflection';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'translateY(-6px) scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('audio-visualizer-artwork') || id === 'audio-visualizer-artwork') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:130px; height:80px; border-radius:8px; background:#141824; border:1px solid ${accent}; display:flex; align-items:flex-end; justify-content:center; gap:4px; padding-bottom:10px; box-sizing:border-box; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:4px; height:20px; background:${accent}; border-radius:2px;"></div>
      <div style="width:4px; height:45px; background:${accent}; border-radius:2px;"></div>
      <div style="width:4px; height:30px; background:${accent}; border-radius:2px;"></div>
      <div style="width:4px; height:50px; background:${accent}; border-radius:2px;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('kaleidoscopic-photo') || id === 'kaleidoscopic-photo') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:65px; height:65px; border-radius:50%; background:conic-gradient(${accent}, #42E8F5, #FF4B72, ${accent}); cursor:pointer;';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'rotate(180deg) scale(1.2)';
      setTimeout(() => wrap.style.transform = 'none', 250);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('brush-stroke-reveal') || id === 'brush-stroke-reveal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:10px 18px; border-radius:6px; background:#181F2E; border:1.5px solid ${accent}; font-weight:900; color:#FFF; font-size:10px; cursor:pointer;';
    wrap.textContent = 'Brush Reveal 🖌️';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('pixel-grid-photo-mosaic') || id === 'pixel-grid-photo-mosaic') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:grid; grid-template-columns:repeat(4, 15px); gap:3px; cursor:pointer;';
    for (let i = 0; i < 12; i++) {
      const b = document.createElement('div');
      b.style.cssText = `width:15px; height:15px; border-radius:2px; background:${i % 2 === 0 ? accent : '#1F2738'};`;
      wrap.appendChild(b);
    }
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('3d-parallax-photo-layer') || id === '3d-parallax-photo-layer') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:140px; height:85px; border-radius:8px; background:#151A26; border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:800; font-size:9px; cursor:pointer;';
    wrap.textContent = 'Parallax 3D Layer';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08) translateY(-4px)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else {
    // 26. video-play-button-pulse & default media
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:50px; height:50px; border-radius:50%; background:${accent}; display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:18px; cursor:pointer; box-shadow:0 0 20px ${accent}66;';
    wrap.textContent = '▶';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.3) rotate(15deg)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();
  }

  return { restart: restartFn, destroy: destroyFn };
}
