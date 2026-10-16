/**
 * DartNova Forms & Feedback Visualizers (10 Bespoke Modern UI Components)
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
    wrap.className = 'dn-checkmark-widget';
    wrap.style.cursor = 'pointer';
    wrap.innerHTML = `
      <svg viewBox="0 0 48 48" style="width:48px; height:48px;">
        <circle class="dn-checkmark-circle" cx="24" cy="24" r="20" style="stroke:${accent}; stroke-width:3; fill:none; stroke-dasharray:150; animation:dnCheckDraw 0.8s ease-out;"></circle>
        <path class="dn-checkmark-stem" d="M14 24 L21 31 L34 17" style="stroke:${accent}; stroke-width:3.5; stroke-linecap:round; fill:none; stroke-dasharray:48; animation:dnCheckDraw 0.6s ease-out 0.2s both;"></path>
      </svg>
      <div style="font-size:9px; font-weight:800; color:${accent}; margin-top:4px;">Verified Clean</div>
    `;
    const redraw = () => {
      wrap.style.transform = 'scale(1.2)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    };
    wrap.addEventListener('click', redraw);
    stage.appendChild(wrap);
    restartFn = redraw;

  } else if (id.includes('error-shake') || id === 'error-shake-input') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; display:flex; flex-direction:column; gap:4px; cursor:pointer;';
    wrap.innerHTML = `
      <div class="es-box" style="height:36px; border-radius:8px; border:1.5px solid #FF4B72; background:#181318; display:flex; align-items:center; justify-content:space-between; padding:0 10px; box-sizing:border-box; color:#FF4B72; font-size:11px; font-weight:700;">
        <span>invalid_token</span><span>⚠️</span>
      </div>
      <div style="font-size:8px; color:#FF4B72; font-weight:700; padding-left:4px;">Error: Token mismatch</div>
    `;
    const box = wrap.querySelector('.es-box');
    const shake = () => {
      box.style.transform = 'translateX(-8px)';
      setTimeout(() => { box.style.transform = 'translateX(8px)'; }, 60);
      setTimeout(() => { box.style.transform = 'translateX(-6px)'; }, 120);
      setTimeout(() => { box.style.transform = 'translateX(6px)'; }, 180);
      setTimeout(() => { box.style.transform = 'none'; }, 240);
    };
    wrap.addEventListener('click', shake);
    stage.appendChild(wrap);
    restartFn = shake;

  } else if (id.includes('password-strength') || id === 'password-strength-meter') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; display:flex; flex-direction:column; gap:6px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="height:34px; border-radius:8px; background:#141722; border:1px solid #282E3D; display:flex; align-items:center; padding:0 10px; font-size:11px; color:#FFF;">
        ••••••••••••
      </div>
      <div style="display:flex; gap:3px;">
        <div class="ps-seg s1" style="flex:1; height:4px; border-radius:2px; background:${accent};"></div>
        <div class="ps-seg s2" style="flex:1; height:4px; border-radius:2px; background:${accent};"></div>
        <div class="ps-seg s3" style="flex:1; height:4px; border-radius:2px; background:${accent};"></div>
        <div class="ps-seg s4" style="flex:1; height:4px; border-radius:2px; background:${accent};"></div>
      </div>
      <div class="ps-lbl" style="font-size:8px; font-weight:800; color:${accent}; display:flex; justify-content:space-between;">
        <span>STRENGTH: IRONCLAD</span><span>100%</span>
      </div>
    `;
    let strong = true;
    const segs = wrap.querySelectorAll('.ps-seg');
    const lbl = wrap.querySelector('.ps-lbl');
    const toggleStrength = () => {
      strong = !strong;
      if (strong) {
        segs.forEach(s => s.style.background = accent);
        lbl.innerHTML = `<span>STRENGTH: IRONCLAD</span><span>100%</span>`;
        lbl.style.color = accent;
      } else {
        segs[0].style.background = '#FF4B72';
        segs[1].style.background = '#FF4B72';
        segs[2].style.background = '#282E3D';
        segs[3].style.background = '#282E3D';
        lbl.innerHTML = `<span>STRENGTH: WEAK</span><span>40%</span>`;
        lbl.style.color = '#FF4B72';
      }
    };
    wrap.addEventListener('click', toggleStrength);
    stage.appendChild(wrap);
    restartFn = toggleStrength;

  } else if (id.includes('otp') || id === 'otp-input-animation') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:8px; cursor:pointer;';
    const digits = ['8', '2', '', ''];
    wrap.innerHTML = digits.map((d, i) => `
      <div class="otp-cell c-${i}" style="width:32px; height:40px; border-radius:8px; background:#161A26; border:1.5px solid ${i === 2 ? accent : (d ? accent + '88' : '#282E3D')}; display:flex; align-items:center; justify-content:center; font-family:var(--font-mono); font-size:16px; font-weight:800; color:#FFF; box-shadow:${i === 2 ? `0 0 12px ${accent}44` : 'none'};">
        ${d || (i === 2 ? `<span style="animation:dnPulseGlow 1s infinite; color:${accent};">|</span>` : '')}
      </div>
    `).join('');
    let full = false;
    const toggleOtp = () => {
      full = !full;
      const c2 = wrap.querySelector('.c-2');
      const c3 = wrap.querySelector('.c-3');
      if (full) {
        c2.textContent = '9';
        c2.style.borderColor = accent;
        c3.textContent = '4';
        c3.style.borderColor = accent;
      } else {
        c2.innerHTML = `<span style="animation:dnPulseGlow 1s infinite; color:${accent};">|</span>`;
        c2.style.borderColor = accent;
        c3.textContent = '';
        c3.style.borderColor = '#282E3D';
      }
    };
    wrap.addEventListener('click', toggleOtp);
    stage.appendChild(wrap);
    restartFn = toggleOtp;

  } else if (id.includes('checkbox') || id === 'checkbox-draw-animation') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; gap:8px; cursor:pointer; padding:6px 10px; border-radius:8px; background:#141722; border:1px solid #282E3D;';
    wrap.innerHTML = `
      <div class="cb-box" style="width:20px; height:20px; border-radius:5px; background:${accent}; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">
        <svg viewBox="0 0 24 24" style="width:14px; height:14px;">
          <path class="cb-check" d="M4 12 L9 17 L20 6" fill="none" stroke="#08090B" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span style="font-size:10px; font-weight:700; color:#FFF;">Enable 120 FPS Motion</span>
    `;
    let checked = true;
    const box = wrap.querySelector('.cb-box');
    const check = wrap.querySelector('.cb-check');
    const toggleCheck = () => {
      checked = !checked;
      if (checked) {
        box.style.background = accent;
        box.style.borderColor = accent;
        check.style.display = 'block';
      } else {
        box.style.background = 'transparent';
        box.style.borderColor = '#4A5568';
        check.style.display = 'none';
      }
    };
    wrap.addEventListener('click', toggleCheck);
    stage.appendChild(wrap);
    restartFn = toggleCheck;

  } else if (id.includes('radio') || id === 'radio-ripple') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; gap:8px; cursor:pointer; padding:6px 10px; border-radius:8px; background:#141722; border:1px solid #282E3D;';
    wrap.innerHTML = `
      <div class="rr-ring" style="position:relative; width:20px; height:20px; border-radius:50%; border:2px solid ${accent}; display:flex; align-items:center; justify-content:center;">
        <div class="rr-dot" style="width:10px; height:10px; border-radius:50%; background:${accent}; transition:transform 0.2s;"></div>
        <div class="rr-wave" style="position:absolute; inset:-4px; border-radius:50%; border:2px solid ${accent}; opacity:0; pointer-events:none;"></div>
      </div>
      <span style="font-size:10px; font-weight:700; color:#FFF;">Primary Route Preset</span>
    `;
    const dot = wrap.querySelector('.rr-dot');
    const wave = wrap.querySelector('.rr-wave');
    const ripple = () => {
      dot.style.transform = 'scale(0.3)';
      setTimeout(() => {
        dot.style.transform = 'scale(1)';
        wave.style.transition = 'all 0.4s ease-out';
        wave.style.transform = 'scale(1.8)';
        wave.style.opacity = '0.8';
        setTimeout(() => {
          wave.style.transition = 'none';
          wave.style.transform = 'scale(1)';
          wave.style.opacity = '0';
        }, 420);
      }, 100);
    };
    wrap.addEventListener('click', ripple);
    stage.appendChild(wrap);
    restartFn = ripple;

  } else if (id.includes('toggle') || id === 'toggle-morph') {
    const toggle = document.createElement('div');
    toggle.className = 'dn-toggle-widget active';
    toggle.style.cssText = `width:46px; height:26px; border-radius:13px; background:${accent}; border:2px solid ${accent}; position:relative; cursor:pointer; transition:all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);`;
    toggle.innerHTML = `<div class="dn-toggle-thumb" style="position:absolute; top:2px; right:2px; width:18px; height:18px; border-radius:50%; background:#08090B; transition:transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);"></div>`;
    let active = true;
    const thumb = toggle.querySelector('.dn-toggle-thumb');
    const switchToggle = () => {
      active = !active;
      if (active) {
        toggle.style.background = accent;
        toggle.style.borderColor = accent;
        thumb.style.transform = 'translateX(0)';
      } else {
        toggle.style.background = '#282E3D';
        toggle.style.borderColor = '#282E3D';
        thumb.style.transform = 'translateX(-20px)';
      }
    };
    toggle.addEventListener('click', switchToggle);
    stage.appendChild(toggle);
    restartFn = switchToggle;

  } else {
    // Form Step Transition
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:160px; height:90px; border-radius:10px; background:#12151D; border:1px solid #282E3D; overflow:hidden; cursor:pointer; display:flex; flex-direction:column; justify-content:space-between; padding:8px 10px; box-sizing:border-box;';
    wrap.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="st-num" style="font-size:9px; font-weight:800; color:${accent}; font-family:var(--font-mono);">STEP 01 / 03</span>
        <span style="font-size:8px; color:var(--text-muted);">Wizard</span>
      </div>
      <div class="st-content" style="font-size:10px; font-weight:800; color:#FFF; transition:all 0.3s;">
        Personal Profile
      </div>
      <div style="display:flex; gap:3px;">
        <div class="st-bar b1" style="flex:1; height:3px; border-radius:2px; background:${accent};"></div>
        <div class="st-bar b2" style="flex:1; height:3px; border-radius:2px; background:#2A3245;"></div>
        <div class="st-bar b3" style="flex:1; height:3px; border-radius:2px; background:#2A3245;"></div>
      </div>
    `;
    let step = 1;
    const num = wrap.querySelector('.st-num');
    const content = wrap.querySelector('.st-content');
    const b2 = wrap.querySelector('.b2');
    const b3 = wrap.querySelector('.b3');
    const nextStep = () => {
      step = (step % 3) + 1;
      num.textContent = `STEP 0${step} / 03`;
      if (step === 1) {
        content.textContent = 'Personal Profile';
        b2.style.background = '#2A3245';
        b3.style.background = '#2A3245';
      } else if (step === 2) {
        content.textContent = 'Billing & Payment';
        b2.style.background = accent;
        b3.style.background = '#2A3245';
      } else {
        content.textContent = 'Confirmation Done';
        b2.style.background = accent;
        b3.style.background = accent;
      }
    };
    wrap.addEventListener('click', nextStep);
    stage.appendChild(wrap);
    restartFn = nextStep;
  }

  return { restart: restartFn, destroy: destroyFn };
}
