/**
 * DartNova 3D Perspectives & Isometric Visualizers (26 Bespoke Modern UI Components)
 * 120 FPS hardware-accelerated animations with interactive mouse/touch triggers
 */

export function renderThreeDVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('rotating-cube-3d') || id === 'rotating-cube-3d') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:400px; width:120px; height:120px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="cube-mesh" style="width:50px; height:50px; position:relative; transform-style:preserve-3d; animation:dnCubeRotate 6s linear infinite;">
        <div style="position:absolute; inset:0; border:1.5px solid ${accent}; background:${accent}18; transform:translateZ(25px);"></div>
        <div style="position:absolute; inset:0; border:1.5px solid ${accent}; background:${accent}18; transform:rotateY(180deg) translateZ(25px);"></div>
        <div style="position:absolute; inset:0; border:1.5px solid ${accent}; background:${accent}18; transform:rotateY(-90deg) translateZ(25px);"></div>
        <div style="position:absolute; inset:0; border:1.5px solid ${accent}; background:${accent}18; transform:rotateY(90deg) translateZ(25px);"></div>
        <div style="position:absolute; inset:0; border:1.5px solid ${accent}; background:${accent}18; transform:rotateX(90deg) translateZ(25px);"></div>
        <div style="position:absolute; inset:0; border:1.5px solid ${accent}; background:${accent}18; transform:rotateX(-90deg) translateZ(25px);"></div>
      </div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('flip-tile') || id === 'flip-tile-3d') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:400px; width:100px; height:80px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="ft-card" style="width:100%; height:100%; border-radius:10px; background:#161C28; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:10px; font-weight:800; transition:transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);">
        Flip Front
      </div>
    `;
    let flipped = false;
    const card = wrap.querySelector('.ft-card');
    wrap.addEventListener('click', () => {
      flipped = !flipped;
      card.style.transform = flipped ? 'rotateY(180deg)' : 'none';
      card.textContent = flipped ? 'Back ⚡' : 'Flip Front';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('diagonal-carousel') || id === 'diagonal-carousel') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'transform:rotate(-15deg); display:flex; gap:8px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:50px; height:60px; border-radius:6px; background:#181F2E; border:1px solid ${accent};"></div>
      <div style="width:50px; height:60px; border-radius:6px; background:#181F2E; border:1px solid #42E8F5; transform:scale(1.1);"></div>
      <div style="width:50px; height:60px; border-radius:6px; background:#181F2E; border:1px solid #9B7CFF;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'rotate(-15deg) scale(1.1)'; setTimeout(() => wrap.style.transform = 'rotate(-15deg)', 180); };

  } else if (id.includes('parallax-depth-card') || id === 'parallax-depth-card') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:400px; width:150px; height:90px; border-radius:10px; background:#141824; border:1px solid ${accent}; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 10px 24px rgba(0,0,0,0.5);';
    wrap.innerHTML = `
      <div class="pdc-fg" style="font-size:11px; font-weight:900; color:#FFF; transition:transform 0.2s;">Parallax Depth</div>
      <div style="font-size:8px; color:${accent}; margin-top:2px;">Layer Offset Z</div>
    `;
    const fg = wrap.querySelector('.pdc-fg');
    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left - 75) * 0.2;
      fg.style.transform = `translateX(${x}px)`;
    });
    wrap.addEventListener('mouseleave', () => { fg.style.transform = 'none'; });
    stage.appendChild(wrap);
    restartFn = () => { fg.style.transform = 'translateX(10px)'; setTimeout(() => fg.style.transform = 'none', 200); };

  } else if (id.includes('perspective-image-tilt') || id === 'perspective-image-tilt') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:400px; width:140px; height:85px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="pit-box" style="width:100%; height:100%; border-radius:8px; background:linear-gradient(135deg, #1C2436, #2B354C); border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:9px; font-weight:800; transition:transform 0.2s;">
        Tilt Surface
      </div>
    `;
    const box = wrap.querySelector('.pit-box');
    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      box.style.transform = `rotateY(${x * 30}deg) rotateX(${-y * 30}deg)`;
    });
    wrap.addEventListener('mouseleave', () => { box.style.transform = 'none'; });
    stage.appendChild(wrap);
    restartFn = () => { box.style.transform = 'rotateY(20deg)'; setTimeout(() => box.style.transform = 'none', 200); };

  } else if (id.includes('orbiting-elements') || id === 'orbiting-elements') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:90px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:34px; height:34px; border-radius:50%; background:${accent}; color:#08090B; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:12px; z-index:2;">DN</div>
      <div class="oe-ring" style="position:absolute; width:80px; height:80px; border-radius:50%; border:1.5px dashed ${accent}; animation:dnOrbitRotate 5s linear infinite;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('rotating-product-showcase') || id === 'rotating-product-showcase') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-direction:column; align-items:center; gap:6px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="font-size:28px; animation:dnFloatLevitate 1.5s infinite alternate;">👟</div>
      <div style="width:70px; height:8px; border-radius:50%; background:radial-gradient(circle, ${accent}66, transparent);"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('layered-stack-3d') || id === 'layered-stack-3d') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:130px; height:85px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; width:90px; height:55px; border-radius:6px; background:#121622; border:1px solid #283144; transform:translateY(-10px) scale(0.9);"></div>
      <div style="position:absolute; width:100px; height:60px; border-radius:6px; background:#161C28; border:1px solid #333F54; transform:translateY(-5px) scale(0.95);"></div>
      <div style="position:absolute; width:110px; height:65px; border-radius:6px; background:#1C2333; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:9px; font-weight:800;">Top Layer</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('perspective-text') || id === 'perspective-text') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:300px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="font-size:16px; font-weight:900; color:${accent}; transform:rotateX(25deg); text-shadow:0 4px 12px ${accent}66;">DARTNOVA 3D</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('interactive-globe') || id === 'interactive-globe') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:65px; height:65px; border-radius:50%; border:2px solid ${accent}; display:flex; align-items:center; justify-content:center; font-size:24px; cursor:pointer;';
    wrap.textContent = '🌐';
    let rot = 0;
    wrap.addEventListener('click', () => {
      rot += 90;
      wrap.style.transform = `rotate(${rot}deg) scale(1.15)`;
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('3d-torus-donut') || id === '3d-torus-donut') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:60px; height:60px; border-radius:50%; border:10px solid ${accent}; cursor:pointer; box-shadow:0 0 16px ${accent}66;';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2) rotate(45deg)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('floating-isometric-islands') || id === 'floating-isometric-islands') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'transform:rotate(-20deg) skewX(20deg); width:80px; height:60px; border-radius:8px; background:#1C2333; border:2px solid ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:8px; font-weight:800; cursor:pointer;';
    wrap.textContent = 'ISO ISLAND';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'rotate(-20deg) skewX(20deg) translateY(-8px)'; setTimeout(() => wrap.style.transform = 'rotate(-20deg) skewX(20deg)', 200); };

  } else if (id.includes('dna-helix-3d') || id === 'dna-helix-3d') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:6px; align-items:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:4px; height:35px; background:${accent}; border-radius:2px; animation:dnFloatLevitate 1s infinite alternate;"></div>
      <div style="width:4px; height:45px; background:#42E8F5; border-radius:2px; animation:dnFloatLevitate 1.2s infinite alternate;"></div>
      <div style="width:4px; height:35px; background:${accent}; border-radius:2px; animation:dnFloatLevitate 1.4s infinite alternate;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('pyramid-prism-scatter') || id === 'pyramid-prism-scatter') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:0; height:0; border-left:30px solid transparent; border-right:30px solid transparent; border-bottom:50px solid ${accent}; cursor:pointer; filter:drop-shadow(0 0 12px ${accent});';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'rotate(360deg) scale(1.1)';
      setTimeout(() => wrap.style.transform = 'none', 300);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('card-carousel-cylinder') || id === 'card-carousel-cylinder') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:400px; display:flex; gap:6px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:40px; height:55px; border-radius:4px; background:#181F2E; border:1px solid #333F54; transform:rotateY(30deg);"></div>
      <div style="width:45px; height:60px; border-radius:4px; background:#1C2333; border:1.5px solid ${accent};"></div>
      <div style="width:40px; height:55px; border-radius:4px; background:#181F2E; border:1px solid #333F54; transform:rotateY(-30deg);"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('3d-depth-shadow-box') || id === '3d-depth-shadow-box') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:130px; height:75px; border-radius:8px; background:#141824; border:1px solid #283144; box-shadow:inset 0 0 16px rgba(0,0,0,0.8), 0 10px 24px rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; color:#FFF; font-size:9px; font-weight:800; cursor:pointer;';
    wrap.innerHTML = `<span style="color:${accent};">Shadow Box 3D</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('wireframe-sphere-3d') || id === 'wireframe-sphere-3d') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:60px; height:60px; border-radius:50%; border:2px dashed ${accent}; display:flex; align-items:center; justify-content:center; cursor:pointer; animation:dnOrbitRotate 4s linear infinite;';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('isometric-room-builder') || id === 'isometric-room-builder') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:120px; height:80px; border-radius:8px; background:#141926; border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:9px; font-weight:800; cursor:pointer;';
    wrap.textContent = 'ISO ROOM 3D';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('interactive-rubiks-cube') || id === 'interactive-rubiks-cube') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:grid; grid-template-columns:repeat(2, 20px); gap:3px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:20px; height:20px; background:${accent}; border-radius:2px;"></div>
      <div style="width:20px; height:20px; background:#FF4B72; border-radius:2px;"></div>
      <div style="width:20px; height:20px; background:#42E8F5; border-radius:2px;"></div>
      <div style="width:20px; height:20px; background:#FFA500; border-radius:2px;"></div>
    `;
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'rotate(90deg) scale(1.15)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('3d-coin-flip') || id === '3d-coin-flip') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:50px; height:50px; border-radius:50%; background:linear-gradient(135deg, #FFD700, #FFA500); border:2px solid #FFF; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:16px; color:#08090B; cursor:pointer; box-shadow:0 0 16px rgba(255,215,0,0.5);';
    wrap.textContent = '$';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'rotateY(360deg) scale(1.2)';
      setTimeout(() => wrap.style.transform = 'none', 350);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('3d-portal-ring') || id === '3d-portal-ring') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:65px; height:65px; border-radius:50%; border:3px solid ${accent}; box-shadow:inset 0 0 14px ${accent}, 0 0 20px ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:900; font-size:10px; cursor:pointer;';
    wrap.textContent = 'PORTAL';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('isometric-bar-chart-3d') || id === 'isometric-bar-chart-3d') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:flex-end; gap:6px; transform:rotate(-15deg) skewX(15deg); cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:12px; height:30px; background:${accent}; border-radius:2px;"></div>
      <div style="width:12px; height:50px; background:#42E8F5; border-radius:2px;"></div>
      <div style="width:12px; height:40px; background:${accent}; border-radius:2px;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'rotate(-15deg) skewX(15deg) scale(1.1)'; setTimeout(() => wrap.style.transform = 'rotate(-15deg) skewX(15deg)', 180); };

  } else if (id.includes('3d-book-flip') || id === '3d-book-flip') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:400px; width:110px; height:75px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="bf-cover" style="width:100%; height:100%; border-radius:4px; background:#1C2333; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; color:#FFF; font-size:9px; font-weight:800; transform-origin:left center; transition:transform 0.5s;">
        Book Cover 📖
      </div>
    `;
    let open = false;
    const cover = wrap.querySelector('.bf-cover');
    wrap.addEventListener('click', () => {
      open = !open;
      cover.style.transform = open ? 'rotateY(-130deg)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('polyhedron-gem-crystal') || id === 'polyhedron-gem-crystal') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:32px; cursor:pointer; filter:drop-shadow(0 0 12px ${accent});';
    wrap.textContent = '💎';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.3) rotate(15deg)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('floating-credit-card-3d') || id === 'floating-credit-card-3d') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:140px; height:85px; border-radius:10px; background:linear-gradient(135deg, #1C2433, #2D3952); border:1.5px solid ${accent}; padding:8px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; cursor:pointer; box-shadow:0 10px 24px rgba(0,0,0,0.6);';
    wrap.innerHTML = `
      <span style="font-size:8px; color:${accent}; font-weight:900;">PLATINUM 3D</span>
      <span style="font-size:10px; color:#FFF; font-family:var(--font-mono);">•••• 9988</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08) translateY(-4px)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else {
    // 26. 3d-compass-gyroscope & default 3D
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:70px; height:70px; border-radius:50%; border:2px solid ${accent}; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:22px;';
    wrap.textContent = '🧭';
    let rot = 0;
    wrap.addEventListener('click', () => {
      rot += 60;
      wrap.style.transform = `rotate(${rot}deg) scale(1.15)`;
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();
  }

  return { restart: restartFn, destroy: destroyFn };
}
