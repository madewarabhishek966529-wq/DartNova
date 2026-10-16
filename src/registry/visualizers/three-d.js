/**
 * DartNova 3D & Perspective Visualizers (10 Bespoke Modern UI Components)
 */

export function renderThreeDVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('diagonal-carousel') || id === 'diagonal-carousel') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:600px; position:relative; width:170px; height:105px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="dc-card c3" style="position:absolute; width:65px; height:45px; border-radius:6px; background:#141722; border:1px solid #282E3D; transform:rotateX(20deg) rotateY(-30deg) translate3d(35px, -20px, -40px); opacity:0.6; display:flex; align-items:center; justify-content:center; font-size:8px; color:var(--text-muted); transition:transform 0.4s ease;">03</div>
      <div class="dc-card c2" style="position:absolute; width:75px; height:50px; border-radius:8px; background:#181E2C; border:1px solid ${accent}88; transform:rotateX(20deg) rotateY(-30deg) translate3d(0px, 0px, 0px); z-index:2; display:flex; flex-direction:column; align-items:center; justify-content:center; font-size:9px; font-weight:800; color:#FFF; box-shadow:0 10px 20px rgba(0,0,0,0.5); transition:transform 0.4s ease;">
        <span>Card 02</span><span style="font-size:7px; color:${accent};">Active</span>
      </div>
      <div class="dc-card c1" style="position:absolute; width:65px; height:45px; border-radius:6px; background:#141722; border:1px solid #282E3D; transform:rotateX(20deg) rotateY(-30deg) translate3d(-35px, 20px, 40px); opacity:0.6; display:flex; align-items:center; justify-content:center; font-size:8px; color:var(--text-muted); transition:transform 0.4s ease;">01</div>
    `;
    let shift = false;
    const cycle = () => {
      shift = !shift;
      const c2 = wrap.querySelector('.c2');
      c2.style.transform = shift ? 'rotateX(20deg) rotateY(-30deg) translate3d(15px, -10px, 20px) scale(1.08)' : 'rotateX(20deg) rotateY(-30deg) translate3d(0px, 0px, 0px)';
    };
    wrap.addEventListener('click', cycle);
    stage.appendChild(wrap);
    restartFn = cycle;

  } else if (id.includes('flip-tile') || id === 'flip-tile-3d') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:500px; display:grid; grid-template-columns:1fr 1fr; gap:6px; width:130px; height:80px; cursor:pointer;';
    for (let i = 0; i < 4; i++) {
      const tile = document.createElement('div');
      tile.style.cssText = 'position:relative; width:100%; height:100%; transform-style:preserve-3d; transition:transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);';
      tile.innerHTML = `
        <div style="position:absolute; inset:0; backface-visibility:hidden; background:#161922; border:1px solid #282E3D; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; color:#FFF;">${['⚡','★','◆','▲'][i]}</div>
        <div style="position:absolute; inset:0; backface-visibility:hidden; background:#181F2E; border:1px solid ${accent}; border-radius:6px; transform:rotateY(180deg); display:flex; align-items:center; justify-content:center; font-size:8px; font-weight:800; color:${accent};">120</div>
      `;
      wrap.appendChild(tile);
    }
    let flipped = false;
    const flipAll = () => {
      flipped = !flipped;
      wrap.querySelectorAll('div[style*="preserve-3d"]').forEach((t, i) => {
        setTimeout(() => {
          t.style.transform = flipped ? 'rotateY(180deg)' : 'rotateY(0)';
        }, i * 70);
      });
    };
    wrap.addEventListener('click', flipAll);
    stage.appendChild(wrap);
    restartFn = flipAll;

  } else if (id.includes('rotating-cube') || id === 'rotating-cube-3d') {
    const stageBox = document.createElement('div');
    stageBox.className = 'dn-cube-stage';
    stageBox.style.cssText = 'perspective:600px; width:70px; height:70px; cursor:pointer;';
    stageBox.innerHTML = `
      <div class="dn-3d-cube" style="width:100%; height:100%; position:relative; transform-style:preserve-3d; animation:dnCubeRotate 6s linear infinite;">
        <div class="dn-cube-face front" style="position:absolute; width:60px; height:60px; background:rgba(17,19,24,0.85); border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:800; transform:rotateY(0deg) translateZ(30px);">⚡</div>
        <div class="dn-cube-face back" style="position:absolute; width:60px; height:60px; background:rgba(17,19,24,0.85); border:1.5px solid #42E8F5; display:flex; align-items:center; justify-content:center; color:#42E8F5; font-weight:800; transform:rotateY(180deg) translateZ(30px);">✦</div>
        <div class="dn-cube-face right" style="position:absolute; width:60px; height:60px; background:rgba(17,19,24,0.85); border:1.5px solid #9B7CFF; display:flex; align-items:center; justify-content:center; color:#9B7CFF; font-weight:800; transform:rotateY(90deg) translateZ(30px);">★</div>
        <div class="dn-cube-face left" style="position:absolute; width:60px; height:60px; background:rgba(17,19,24,0.85); border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:800; transform:rotateY(-90deg) translateZ(30px);">▲</div>
        <div class="dn-cube-face top" style="position:absolute; width:60px; height:60px; background:rgba(17,19,24,0.85); border:1.5px solid #42E8F5; display:flex; align-items:center; justify-content:center; color:#42E8F5; font-weight:800; transform:rotateX(90deg) translateZ(30px);">●</div>
        <div class="dn-cube-face bottom" style="position:absolute; width:60px; height:60px; background:rgba(17,19,24,0.85); border:1.5px solid #9B7CFF; display:flex; align-items:center; justify-content:center; color:#9B7CFF; font-weight:800; transform:rotateX(-90deg) translateZ(30px);">■</div>
      </div>
    `;
    stage.appendChild(stageBox);
    restartFn = () => { stageBox.style.transform = 'scale(1.2)'; setTimeout(() => stageBox.style.transform = 'none', 200); };

  } else if (id.includes('parallax-depth') || id === 'parallax-depth-card') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:500px; width:160px; height:100px; position:relative; overflow:hidden; border-radius:10px; background:#121622; border:1px solid #282E3D; cursor:pointer; display:flex; align-items:center; justify-content:center;';
    wrap.innerHTML = `
      <div class="p-bg" style="position:absolute; width:180px; height:120px; background:radial-gradient(circle, ${accent}33 0%, transparent 70%); transition:transform 0.15s ease-out;"></div>
      <div class="p-mid" style="position:absolute; width:45px; height:45px; border-radius:50%; background:linear-gradient(135deg, ${accent}, #42E8F5); opacity:0.8; transition:transform 0.15s ease-out; box-shadow:0 0 16px ${accent}66;"></div>
      <div class="p-fg" style="position:relative; z-index:2; font-size:11px; font-weight:800; color:#FFF; transition:transform 0.15s ease-out; text-shadow:0 2px 8px rgba(0,0,0,0.8);">DEPTH PARALLAX</div>
    `;
    wrap.addEventListener('mousemove', (e) => {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      wrap.querySelector('.p-bg').style.transform = `translate(${x * 12}px, ${y * 12}px)`;
      wrap.querySelector('.p-mid').style.transform = `translate(${x * 24}px, ${y * 24}px)`;
      wrap.querySelector('.p-fg').style.transform = `translate(${x * 36}px, ${y * 36}px)`;
    });
    wrap.addEventListener('mouseleave', () => {
      wrap.querySelector('.p-bg').style.transform = 'none';
      wrap.querySelector('.p-mid').style.transform = 'none';
      wrap.querySelector('.p-fg').style.transform = 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.05)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('perspective-image') || id === 'perspective-image-tilt') {
    const card = document.createElement('div');
    card.style.cssText = `width:160px; height:95px; border-radius:10px; background:linear-gradient(135deg, #1A1F2C, #131722); border:1px solid ${accent}77; display:flex; flex-direction:column; justify-content:space-between; padding:10px; box-sizing:border-box; box-shadow:0 12px 24px rgba(0,0,0,0.5); cursor:pointer; transition:transform 0.15s ease-out;`;
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:9px; font-weight:800; color:${accent};">GYROSCOPE TILT</span>
        <span style="font-size:10px;">📐</span>
      </div>
      <div style="font-size:10px; font-weight:700; color:#FFF;">3D Viewport Normal</div>
      <div style="font-size:8px; color:var(--text-muted);">Interactive Pointer Angle</div>
    `;
    stage.addEventListener('mousemove', (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(400px) rotateY(${x * 26}deg) rotateX(${-y * 26}deg) scale(1.04)`;
    });
    stage.addEventListener('mouseleave', () => { card.style.transform = 'none'; });
    stage.appendChild(card);
    restartFn = () => { card.style.transform = 'perspective(400px) rotateY(18deg) scale(1.05)'; setTimeout(() => card.style.transform = 'none', 260); };

  } else if (id.includes('orbiting-elements') || id === 'orbiting-elements') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:120px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; width:30px; height:30px; border-radius:50%; background:linear-gradient(135deg, ${accent}, #42E8F5); box-shadow:0 0 16px ${accent}; z-index:2;"></div>
      <div class="orb-ring" style="position:absolute; width:90px; height:34px; border-radius:50%; border:1.5px solid ${accent}88; transform:rotate(-25deg); animation:dnBorderBeam 4s linear infinite;">
        <div style="position:absolute; top:-4px; left:50%; width:8px; height:8px; border-radius:50%; background:#FFF; box-shadow:0 0 8px #FFF;"></div>
      </div>
      <div class="orb-ring-2" style="position:absolute; width:105px; height:40px; border-radius:50%; border:1px dashed #42E8F566; transform:rotate(35deg); animation:dnOrbitReverse 5s linear infinite;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('product-showcase') || id === 'rotating-product-showcase') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:500px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="prod-card" style="width:80px; height:55px; border-radius:8px; background:linear-gradient(135deg, #1C2333, #151A24); border:1px solid ${accent}; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; box-shadow:0 8px 16px rgba(0,0,0,0.5); transform:rotateY(-20deg); transition:transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <span style="font-size:16px;">👟</span>
        <span style="font-size:8px; font-weight:800; color:#FFF;">DartNova One</span>
      </div>
      <div class="prod-base" style="width:90px; height:12px; border-radius:50%; background:#19202E; border:1px solid #2F384C;"></div>
      <div style="font-size:8px; font-weight:800; color:${accent}; font-family:var(--font-mono);">360° TURNTABLE</div>
    `;
    let spun = false;
    const card = wrap.querySelector('.prod-card');
    const spin = () => {
      spun = !spun;
      card.style.transform = spun ? 'rotateY(160deg)' : 'rotateY(-20deg)';
    };
    wrap.addEventListener('click', spin);
    stage.appendChild(wrap);
    restartFn = spin;

  } else if (id.includes('layered-stack') || id === 'layered-stack-3d') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:600px; position:relative; width:150px; height:95px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="ls-3" style="position:absolute; width:90px; height:50px; border-radius:8px; background:#111520; border:1px solid #282E3D; transform:rotateX(55deg) rotateZ(-35deg) translateZ(-20px); transition:transform 0.35s ease;">
        <span style="position:absolute; bottom:4px; left:6px; font-size:7px; color:var(--text-muted);">Database</span>
      </div>
      <div class="ls-2" style="position:absolute; width:90px; height:50px; border-radius:8px; background:#181F2E; border:1px solid #38455D; transform:rotateX(55deg) rotateZ(-35deg) translateZ(0px); transition:transform 0.35s ease;">
        <span style="position:absolute; bottom:4px; left:6px; font-size:7px; color:#42E8F5;">Logic</span>
      </div>
      <div class="ls-1" style="position:absolute; width:90px; height:50px; border-radius:8px; background:#1D2638; border:1.5px solid ${accent}; transform:rotateX(55deg) rotateZ(-35deg) translateZ(20px); box-shadow:0 8px 16px rgba(0,0,0,0.5); transition:transform 0.35s ease;">
        <span style="position:absolute; bottom:4px; left:6px; font-size:7px; font-weight:800; color:${accent};">UI Surface</span>
      </div>
    `;
    let exploded = false;
    const toggleExplode = () => {
      exploded = !exploded;
      wrap.querySelector('.ls-3').style.transform = exploded ? 'rotateX(55deg) rotateZ(-35deg) translateZ(-35px)' : 'rotateX(55deg) rotateZ(-35deg) translateZ(-20px)';
      wrap.querySelector('.ls-1').style.transform = exploded ? 'rotateX(55deg) rotateZ(-35deg) translateZ(40px)' : 'rotateX(55deg) rotateZ(-35deg) translateZ(20px)';
    };
    wrap.addEventListener('click', toggleExplode);
    stage.appendChild(wrap);
    restartFn = toggleExplode;

  } else if (id.includes('perspective-text') || id === 'perspective-text') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:350px; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="pt-title" style="font-size:26px; font-weight:900; font-family:var(--font-display); letter-spacing:3px; color:${accent}; transform:rotateX(40deg); transform-origin:bottom center; text-shadow:0 4px 12px ${accent}55, 0 8px 0 #182030; transition:transform 0.3s ease;">
        HORIZON
      </div>
      <div style="font-size:8px; color:var(--text-muted); margin-top:6px; font-family:var(--font-mono);">Extruded 3D Vanishing Point</div>
    `;
    const title = wrap.querySelector('.pt-title');
    wrap.addEventListener('mouseenter', () => title.style.transform = 'rotateX(20deg) scale(1.08)');
    wrap.addEventListener('mouseleave', () => title.style.transform = 'rotateX(40deg)');
    stage.appendChild(wrap);
    restartFn = () => { title.style.transform = 'rotateX(15deg)'; setTimeout(() => title.style.transform = 'rotateX(40deg)', 240); };

  } else {
    // Interactive Globe
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:80px; height:80px; border-radius:50%; background:#0B0E14; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; overflow:hidden; box-shadow:0 0 20px ${accent}44; cursor:pointer;';
    wrap.innerHTML = `
      <div class="globe-lat1" style="position:absolute; width:100%; height:40px; border-radius:50%; border:1px solid ${accent}55; top:20px;"></div>
      <div class="globe-lon1" style="position:absolute; height:100%; width:40px; border-radius:50%; border:1px solid ${accent}55; left:20px;"></div>
      <div style="font-size:20px; z-index:2;">🌐</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'rotate(360deg)'; setTimeout(() => wrap.style.transform = 'none', 400); };
  }

  return { restart: restartFn, destroy: destroyFn };
}
