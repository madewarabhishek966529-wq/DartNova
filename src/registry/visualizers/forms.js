/**
 * DartNova Forms & Feedback Visualizers (26 Bespoke Modern UI Components)
 * 120 FPS hardware-accelerated animations with interactive mouse/touch triggers
 */

export function renderFormVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('floating-label') || id === 'floating-label-input') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; padding-top:10px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="fl-label" style="position:absolute; top:18px; left:12px; font-size:11px; color:var(--text-muted); transition:all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1); pointer-events:none; background:#141722; padding:0 4px;">Email Address</div>
      <div class="fl-box" style="width:100%; height:36px; border-radius:8px; border:1.5px solid #282E3D; background:#141722; display:flex; align-items:center; padding:0 12px; box-sizing:border-box; transition:border-color 0.25s;">
        <span class="fl-val" style="font-size:11px; color:#FFF; font-family:var(--font-mono); opacity:0; transition:opacity 0.2s;">alex@flutter.dev</span>
      </div>
    `;
    let active = false;
    const label = wrap.querySelector('.fl-label');
    const box = wrap.querySelector('.fl-box');
    const val = wrap.querySelector('.fl-val');
    const toggleFocus = () => {
      active = !active;
      if (active) {
        label.style.top = '3px';
        label.style.fontSize = '8px';
        label.style.color = accent;
        label.style.fontWeight = '800';
        box.style.borderColor = accent;
        val.style.opacity = '1';
      } else {
        label.style.top = '18px';
        label.style.fontSize = '11px';
        label.style.color = 'var(--text-muted)';
        label.style.fontWeight = '400';
        box.style.borderColor = '#282E3D';
        val.style.opacity = '0';
      }
    };
    wrap.addEventListener('click', toggleFocus);
    stage.appendChild(wrap);
    restartFn = toggleFocus;

  } else if (id.includes('focus-border') || id === 'animated-focus-border') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:38px; border-radius:8px; overflow:hidden; padding:2px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="afb-beam" style="position:absolute; width:180px; height:180px; background:conic-gradient(transparent, ${accent}, transparent 40%); animation:dnBorderBeam 3s linear infinite;"></div>
      <div style="position:relative; z-index:1; width:100%; height:100%; background:#131620; border-radius:6px; display:flex; align-items:center; justify-content:space-between; padding:0 10px; box-sizing:border-box; font-size:10px; color:#FFF;">
        <span>Search Query...</span><span style="color:${accent};">⌘K</span>
      </div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.06)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('checkmark') || id === 'success-checkmark') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-direction:column; align-items:center; gap:6px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="sc-circ" style="width:44px; height:44px; border-radius:50%; background:#151A24; border:2px solid ${accent}; display:flex; align-items:center; justify-content:center; box-shadow:0 0 16px ${accent}44; transition:transform 0.4s cubic-bezier(0.34, 1.8, 0.64, 1);">
        <span style="font-size:22px; color:${accent}; font-weight:900;">✓</span>
      </div>
      <span style="font-size:9px; font-weight:800; color:#FFF;">Success Check</span>
    `;
    const circ = wrap.querySelector('.sc-circ');
    wrap.addEventListener('click', () => {
      circ.style.transform = 'scale(1.35) rotate(15deg)';
      setTimeout(() => circ.style.transform = 'none', 250);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('error-shake') || id === 'error-shake-input') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:38px; border-radius:8px; border:1.5px solid #FF4B72; background:#181318; display:flex; align-items:center; justify-content:space-between; padding:0 12px; box-sizing:border-box; color:#FF4B72; font-size:10px; font-weight:800; cursor:pointer; box-shadow:0 0 14px rgba(255,75,114,0.3);';
    wrap.innerHTML = `<span>Invalid Format</span><span>⚠️</span>`;
    const shake = () => {
      wrap.style.transform = 'translateX(-8px)';
      setTimeout(() => {
        wrap.style.transform = 'translateX(8px)';
        setTimeout(() => {
          wrap.style.transform = 'translateX(-4px)';
          setTimeout(() => wrap.style.transform = 'none', 60);
        }, 60);
      }, 60);
    };
    wrap.addEventListener('click', shake);
    stage.appendChild(wrap);
    restartFn = shake;

  } else if (id.includes('password-strength') || id === 'password-strength-meter') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; display:flex; flex-direction:column; gap:6px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="height:34px; border-radius:6px; background:#141722; border:1px solid #282E3D; display:flex; align-items:center; padding:0 10px; font-size:11px; color:#FFF; font-family:var(--font-mono);">••••••••••••</div>
      <div style="display:flex; gap:4px; height:4px;">
        <div class="ps-b b1" style="flex:1; border-radius:2px; background:${accent};"></div>
        <div class="ps-b b2" style="flex:1; border-radius:2px; background:${accent};"></div>
        <div class="ps-b b3" style="flex:1; border-radius:2px; background:${accent};"></div>
        <div class="ps-b b4" style="flex:1; border-radius:2px; background:#2A3142;"></div>
      </div>
      <div style="font-size:8px; color:${accent}; font-weight:800; text-align:right;">Strong Security</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.05)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('otp-input') || id === 'otp-input-animation') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:8px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:32px; height:38px; border-radius:6px; border:1.5px solid ${accent}; background:#151A26; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:900; font-size:14px;">4</div>
      <div style="width:32px; height:38px; border-radius:6px; border:1.5px solid ${accent}; background:#151A26; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:900; font-size:14px;">8</div>
      <div style="width:32px; height:38px; border-radius:6px; border:1px solid #333F54; background:#151A26; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:900; font-size:14px;">•</div>
      <div style="width:32px; height:38px; border-radius:6px; border:1px solid #333F54; background:#151A26; display:flex; align-items:center; justify-content:center; color:#FFF; font-weight:900; font-size:14px;">•</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('checkbox-draw') || id === 'checkbox-draw-animation') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; gap:8px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="cbd-box" style="width:24px; height:24px; border-radius:6px; background:${accent}; display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:14px; box-shadow:0 0 12px ${accent}66; transition:all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">✓</div>
      <span style="font-size:10px; font-weight:800; color:#FFF;">Vector Checkbox</span>
    `;
    let chk = true;
    const box = wrap.querySelector('.cbd-box');
    wrap.addEventListener('click', () => {
      chk = !chk;
      box.style.background = chk ? accent : 'transparent';
      box.style.borderColor = chk ? accent : '#4A5568';
      box.style.border = chk ? 'none' : '2px solid #4A5568';
      box.textContent = chk ? '✓' : '';
      box.style.transform = chk ? 'scale(1.15)' : 'scale(0.9)';
      setTimeout(() => box.style.transform = 'scale(1)', 150);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('radio-ripple') || id === 'radio-ripple') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; gap:8px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:relative; width:22px; height:22px; border-radius:50%; border:2px solid ${accent}; display:flex; align-items:center; justify-content:center;">
        <div class="rr-dot" style="width:10px; height:10px; border-radius:50%; background:${accent}; transition:transform 0.3s cubic-bezier(0.34, 1.8, 0.64, 1);"></div>
      </div>
      <span style="font-size:10px; font-weight:800; color:#FFF;">Radio Ripple</span>
    `;
    let selected = true;
    const dot = wrap.querySelector('.rr-dot');
    wrap.addEventListener('click', () => {
      selected = !selected;
      dot.style.transform = selected ? 'scale(1)' : 'scale(0)';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('toggle-morph') || id === 'toggle-morph') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:52px; height:28px; border-radius:99px; background:#181F2E; border:1.5px solid ${accent}; cursor:pointer; padding:2px; box-sizing:border-box;';
    wrap.innerHTML = `
      <div class="tm-knob" style="width:20px; height:20px; border-radius:50%; background:${accent}; transition:transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); transform:translateX(24px);"></div>
    `;
    let on = true;
    const knob = wrap.querySelector('.tm-knob');
    wrap.addEventListener('click', () => {
      on = !on;
      knob.style.transform = on ? 'translateX(24px)' : 'translateX(0)';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('form-step-transition') || id === 'form-step-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; display:flex; flex-direction:column; gap:8px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:9px; font-weight:800; color:${accent}; font-family:var(--font-mono);">STEP 02/03</span>
        <span style="font-size:8px; color:var(--text-muted);">66%</span>
      </div>
      <div style="height:6px; border-radius:3px; background:#181F2C; overflow:hidden;">
        <div class="fst-bar" style="width:66%; height:100%; background:${accent}; transition:width 0.4s ease;"></div>
      </div>
    `;
    let step = 2;
    const bar = wrap.querySelector('.fst-bar');
    wrap.addEventListener('click', () => {
      step = (step % 3) + 1;
      bar.style.width = `${step * 33.3}%`;
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('credit-card-input-morph') || id === 'credit-card-input-morph') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'perspective:400px; width:150px; height:90px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="cc-card" style="width:100%; height:100%; border-radius:10px; background:linear-gradient(135deg, #1C2333, #2B354C); border:1.5px solid ${accent}; padding:8px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; transition:transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow:0 8px 18px rgba(0,0,0,0.5);">
        <div style="display:flex; justify-content:space-between; font-size:8px; color:${accent}; font-weight:800;"><span>DARTNOVA</span><span>CHIP ⚡</span></div>
        <div style="font-size:10px; font-family:var(--font-mono); color:#FFF; letter-spacing:1px;">4532 •••• 8821</div>
        <div style="display:flex; justify-content:space-between; font-size:7px; color:var(--text-muted);"><span>ALEX RIVERA</span><span>12/28</span></div>
      </div>
    `;
    let flipped = false;
    const card = wrap.querySelector('.cc-card');
    wrap.addEventListener('click', () => {
      flipped = !flipped;
      card.style.transform = flipped ? 'rotateY(180deg)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('slider-tooltip-bubble') || id === 'slider-tooltip-bubble') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:50px; display:flex; flex-direction:column; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="st-bubble" style="position:absolute; top:0; left:90px; padding:2px 6px; border-radius:4px; background:${accent}; color:#08090B; font-weight:900; font-size:8px; transform:translateX(-50%); transition:left 0.3s;">75%</div>
      <div style="height:6px; border-radius:3px; background:#1C2333; position:relative; overflow:hidden;">
        <div class="st-track" style="width:75%; height:100%; background:${accent}; transition:width 0.3s;"></div>
      </div>
    `;
    let pct = 75;
    const [b, tr] = [wrap.querySelector('.st-bubble'), wrap.querySelector('.st-track')];
    wrap.addEventListener('click', () => {
      pct = pct === 75 ? 40 : 75;
      b.style.left = `${(pct / 100) * 160}px`;
      b.textContent = `${pct}%`;
      tr.style.width = `${pct}%`;
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('multi-select-chip-cloud') || id === 'multi-select-chip-cloud') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-wrap:wrap; gap:6px; width:160px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="msc-chip" style="padding:4px 8px; border-radius:99px; background:${accent}; color:#08090B; font-size:8px; font-weight:800;">✓ Motion</div>
      <div class="msc-chip" style="padding:4px 8px; border-radius:99px; background:#181F2C; border:1px solid #333F54; color:#FFF; font-size:8px; font-weight:800;">+ Shaders</div>
      <div class="msc-chip" style="padding:4px 8px; border-radius:99px; background:#181F2C; border:1px solid #333F54; color:#FFF; font-size:8px; font-weight:800;">+ 3D Audio</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('file-upload-drag-drop') || id === 'file-upload-drag-drop') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:150px; height:80px; border-radius:10px; border:2px dashed ${accent}; background:#121622; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; cursor:pointer;';
    wrap.innerHTML = `
      <span style="font-size:18px;">☁️</span>
      <span style="font-size:8px; font-weight:800; color:#FFF;">Drop Dart file</span>
      <span style="font-size:7px; color:${accent};">120 FPS Validated</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('segmented-switch-pill') || id === 'segmented-switch-pill') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:150px; height:34px; border-radius:8px; background:#131722; border:1px solid #283246; display:flex; padding:2px; box-sizing:border-box; cursor:pointer;';
    wrap.innerHTML = `
      <div class="ssp-pill" style="position:absolute; width:72px; height:28px; border-radius:6px; background:${accent}; transition:transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);"></div>
      <div style="position:relative; z-index:2; flex:1; text-align:center; font-size:9px; font-weight:900; color:#08090B; line-height:28px;">Standard</div>
      <div style="position:relative; z-index:2; flex:1; text-align:center; font-size:9px; font-weight:900; color:#FFF; line-height:28px;">Pro 120</div>
    `;
    let pro = false;
    const pill = wrap.querySelector('.ssp-pill');
    wrap.addEventListener('click', () => {
      pro = !pro;
      pill.style.transform = pro ? 'translateX(74px)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('rating-star-burst') || id === 'rating-star-burst') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:6px; cursor:pointer; font-size:16px; color:#FFA500;';
    wrap.innerHTML = `<span>★</span><span>★</span><span>★</span><span>★</span><span style="opacity:0.4;">★</span>`;
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.2) rotate(3deg)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('inline-validation-badge') || id === 'inline-validation-badge') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:6px 14px; border-radius:99px; background:#132219; border:1.5px solid ${accent}; display:flex; align-items:center; gap:6px; cursor:pointer;';
    wrap.innerHTML = `
      <span style="font-size:12px; color:${accent}; font-weight:900;">✓</span>
      <span style="font-size:9px; font-weight:800; color:#FFF;">Valid Dart Identifier</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('dynamic-tag-input') || id === 'dynamic-tag-input') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; padding:6px; border-radius:8px; background:#141824; border:1px solid #283144; display:flex; flex-wrap:wrap; gap:4px; cursor:pointer;';
    wrap.innerHTML = `
      <span style="padding:2px 6px; border-radius:4px; background:${accent}33; border:1px solid ${accent}; font-size:8px; font-weight:800; color:${accent};">#flutter ✕</span>
      <span style="padding:2px 6px; border-radius:4px; background:${accent}33; border:1px solid ${accent}; font-size:8px; font-weight:800; color:${accent};">#shader ✕</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('password-reveal-eye') || id === 'password-reveal-eye') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:36px; border-radius:8px; background:#141722; border:1px solid #282E3D; display:flex; align-items:center; justify-content:space-between; padding:0 10px; box-sizing:border-box; cursor:pointer;';
    wrap.innerHTML = `
      <span class="pre-text" style="font-size:11px; color:#FFF; font-family:var(--font-mono);">••••••••</span>
      <span class="pre-eye" style="font-size:12px; color:${accent};">👁️</span>
    `;
    let shown = false;
    const [txt, eye] = [wrap.querySelector('.pre-text'), wrap.querySelector('.pre-eye')];
    wrap.addEventListener('click', () => {
      shown = !shown;
      txt.textContent = shown ? 'Flutter120!' : '••••••••';
      eye.textContent = shown ? '🔒' : '👁️';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('color-picker-wheel') || id === 'color-picker-wheel') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:60px; height:60px; border-radius:50%; background:conic-gradient(red, yellow, lime, aqua, blue, magenta, red); cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 0 16px rgba(0,0,0,0.5);';
    wrap.innerHTML = `<div style="width:20px; height:20px; border-radius:50%; background:#FFF; border:2px solid #000;"></div>`;
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'rotate(90deg) scale(1.15)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('stepper-counter-button') || id === 'stepper-counter-button') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; border-radius:8px; background:#141824; border:1.5px solid ${accent}; overflow:hidden; cursor:pointer;';
    wrap.innerHTML = `
      <button style="padding:6px 12px; background:none; border:none; color:${accent}; font-weight:900; font-size:14px; cursor:pointer;">-</button>
      <span class="sc-cnt" style="padding:0 8px; font-size:11px; font-weight:900; color:#FFF; font-family:var(--font-mono);">04</span>
      <button style="padding:6px 12px; background:none; border:none; color:${accent}; font-weight:900; font-size:14px; cursor:pointer;">+</button>
    `;
    let count = 4;
    const cnt = wrap.querySelector('.sc-cnt');
    wrap.addEventListener('click', () => {
      count++;
      cnt.textContent = count < 10 ? `0${count}` : `${count}`;
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('address-autocomplete-pill') || id === 'address-autocomplete-pill') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; padding:8px 10px; border-radius:8px; background:#151A26; border:1px solid ${accent}; display:flex; align-items:center; gap:6px; cursor:pointer; font-size:9px; font-weight:800; color:#FFF;';
    wrap.innerHTML = `<span style="color:${accent};">📍</span><span>77 Market St, SF</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('character-countdown-ring') || id === 'character-countdown-ring') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:50px; height:50px; border-radius:50%; border:3px solid ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:900; font-size:11px; cursor:pointer;';
    wrap.textContent = '280';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.2) rotate(15deg)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('signature-pad-draw') || id === 'signature-pad-draw') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:75px; border-radius:8px; background:#10131A; border:1.5px dashed ${accent}; display:flex; align-items:center; justify-content:center; cursor:pointer; position:relative;';
    wrap.innerHTML = `
      <span style="font-size:24px; color:${accent}; font-family:cursive;">DartNova ✨</span>
    `;
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.06)';
      setTimeout(() => wrap.style.transform = 'none', 180);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('toggle-switch-emoji') || id === 'toggle-switch-emoji') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:56px; height:30px; border-radius:99px; background:#161C28; border:1.5px solid ${accent}; display:flex; align-items:center; padding:2px; box-sizing:border-box; cursor:pointer;';
    wrap.innerHTML = `
      <div class="tse-knob" style="width:22px; height:22px; border-radius:50%; background:${accent}; display:flex; align-items:center; justify-content:center; font-size:12px; transition:transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">☀️</div>
    `;
    let night = false;
    const knob = wrap.querySelector('.tse-knob');
    wrap.addEventListener('click', () => {
      night = !night;
      knob.style.transform = night ? 'translateX(26px)' : 'none';
      knob.textContent = night ? '🌙' : '☀️';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else {
    // 26. submit-progress-button & default form button
    const btn = document.createElement('button');
    btn.style.cssText = `padding:10px 22px; border-radius:8px; background:${accent}; border:none; color:#08090B; font-weight:900; font-size:11px; cursor:pointer; transition:all 0.3s; box-shadow:0 0 16px ${accent}44;`;
    btn.textContent = 'Submit Code ➔';
    btn.addEventListener('click', () => {
      btn.textContent = 'Processing...';
      btn.style.opacity = '0.7';
      setTimeout(() => {
        btn.textContent = '✓ Complete';
        btn.style.opacity = '1';
        setTimeout(() => { btn.textContent = 'Submit Code ➔'; }, 800);
      }, 400);
    });
    stage.appendChild(btn);
    restartFn = () => btn.click();
  }

  return { restart: restartFn, destroy: destroyFn };
}
