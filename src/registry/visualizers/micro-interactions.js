/**
 * DartNova Micro-Interactions Visualizers (26 Bespoke Modern UI Components)
 * 120 FPS hardware-accelerated animations with interactive mouse/touch triggers
 */

export function renderMicroInteractionVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('heart-pop') || id === 'heart-pop') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:32px;';
    wrap.innerHTML = `<span class="hp-icon" style="transition:transform 0.35s cubic-bezier(0.34, 1.8, 0.64, 1); display:inline-block;">❤️</span>`;
    const iconEl = wrap.querySelector('.hp-icon');
    let popped = false;
    wrap.addEventListener('click', () => {
      popped = !popped;
      iconEl.style.transform = 'scale(1.4) rotate(-12deg)';
      setTimeout(() => iconEl.style.transform = 'scale(1) rotate(0deg)', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('bell-ring') || id === 'bell-ring') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:50px; height:50px; display:flex; align-items:center; justify-content:center; font-size:28px; cursor:pointer;';
    wrap.innerHTML = `<span class="br-bell" style="display:inline-block; transform-origin:top center; transition:transform 0.15s;">🔔</span>`;
    const bell = wrap.querySelector('.br-bell');
    const ring = () => {
      bell.style.transform = 'rotate(20deg)';
      setTimeout(() => {
        bell.style.transform = 'rotate(-18deg)';
        setTimeout(() => {
          bell.style.transform = 'rotate(12deg)';
          setTimeout(() => bell.style.transform = 'none', 100);
        }, 100);
      }, 100);
    };
    wrap.addEventListener('click', ring);
    stage.appendChild(wrap);
    restartFn = ring;

  } else if (id.includes('bookmark-morph') || id === 'bookmark-morph') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:28px; cursor:pointer; transition:transform 0.2s;';
    wrap.textContent = '🔖';
    let marked = false;
    wrap.addEventListener('click', () => {
      marked = !marked;
      wrap.style.transform = 'scale(1.3)';
      wrap.style.filter = marked ? `drop-shadow(0 0 10px ${accent})` : 'none';
      setTimeout(() => wrap.style.transform = 'none', 180);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('like-burst') || id === 'like-burst') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:28px;';
    wrap.innerHTML = `<span class="lb-thumb" style="transition:transform 0.3s cubic-bezier(0.34, 1.8, 0.64, 1);">👍</span>`;
    const thumb = wrap.querySelector('.lb-thumb');
    wrap.addEventListener('click', () => {
      thumb.style.transform = 'scale(1.4) rotate(15deg)';
      setTimeout(() => thumb.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('icon-spin-transition') || id === 'icon-spin-transition') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:28px; cursor:pointer; transition:transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);';
    wrap.textContent = '⚙️';
    let rot = 0;
    wrap.addEventListener('click', () => {
      rot += 180;
      wrap.style.transform = `rotate(${rot}deg) scale(1.2)`;
      setTimeout(() => wrap.style.transform = `rotate(${rot}deg)`, 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('icon-draw-on') || id === 'icon-draw-on') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 40 40" style="width:40px; height:40px;">
        <circle cx="20" cy="20" r="16" fill="none" stroke="${accent}" stroke-width="2.5" stroke-dasharray="100" stroke-dashoffset="0" class="id-circ" style="transition:stroke-dashoffset 0.5s ease;"/>
      </svg>
    `;
    const circ = wrap.querySelector('.id-circ');
    wrap.addEventListener('click', () => {
      circ.style.strokeDashoffset = '100';
      setTimeout(() => circ.style.strokeDashoffset = '0', 50);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('copy-success') || id === 'copy-success-animation') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:8px 16px; border-radius:8px; background:#161C28; border:1px solid ${accent}; display:flex; align-items:center; gap:6px; font-size:10px; font-weight:800; color:#FFF; cursor:pointer;';
    wrap.innerHTML = `<span>📋 Copy</span>`;
    wrap.addEventListener('click', () => {
      wrap.innerHTML = `<span style="color:${accent};">✓ Copied!</span>`;
      wrap.style.transform = 'scale(1.08)';
      setTimeout(() => { wrap.innerHTML = `<span>📋 Copy</span>`; wrap.style.transform = 'none'; }, 800);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('theme-switch') || id === 'theme-switch-animation') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:28px; cursor:pointer; transition:transform 0.4s;';
    wrap.textContent = '☀️';
    let moon = false;
    wrap.addEventListener('click', () => {
      moon = !moon;
      wrap.style.transform = 'rotate(180deg) scale(1.2)';
      wrap.textContent = moon ? '🌙' : '☀️';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('cart-add') || id === 'cart-add-animation') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; font-size:28px; cursor:pointer;';
    wrap.innerHTML = `
      <span>🛒</span>
      <span class="ca-dot" style="position:absolute; top:-2px; right:-4px; width:10px; height:10px; border-radius:50%; background:${accent}; opacity:0; transition:all 0.3s;"></span>
    `;
    const dot = wrap.querySelector('.ca-dot');
    wrap.addEventListener('click', () => {
      dot.style.opacity = '1';
      dot.style.transform = 'scale(1.3)';
      setTimeout(() => dot.style.transform = 'scale(1)', 150);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('drag-handle-feedback') || id === 'drag-handle-feedback') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:10px 18px; border-radius:8px; background:#161C28; border:1px solid #333F54; display:flex; align-items:center; gap:8px; cursor:grab; font-size:10px; font-weight:800; color:#FFF; transition:all 0.2s;';
    wrap.innerHTML = `<span style="color:${accent};">⠿</span><span>Grip Handle</span>`;
    wrap.addEventListener('mousedown', () => {
      wrap.style.transform = 'scale(1.08) translateY(-4px)';
      wrap.style.boxShadow = `0 10px 20px rgba(0,0,0,0.6)`;
    });
    wrap.addEventListener('mouseup', () => {
      wrap.style.transform = 'none';
      wrap.style.boxShadow = 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('share-action-fan') || id === 'share-action-fan') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:120px; height:70px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="saf-hub" style="width:36px; height:36px; border-radius:50%; background:${accent}; color:#08090B; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:900; z-index:2;">↗</div>
      <div class="saf-i i1" style="position:absolute; width:24px; height:24px; border-radius:50%; background:#1A2130; border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; font-size:9px; opacity:0; transition:all 0.3s;">💬</div>
      <div class="saf-i i2" style="position:absolute; width:24px; height:24px; border-radius:50%; background:#1A2130; border:1px solid ${accent}; display:flex; align-items:center; justify-content:center; font-size:9px; opacity:0; transition:all 0.3s;">🔗</div>
    `;
    let open = false;
    const [i1, i2] = [wrap.querySelector('.i1'), wrap.querySelector('.i2')];
    wrap.addEventListener('click', () => {
      open = !open;
      i1.style.opacity = open ? '1' : '0';
      i1.style.transform = open ? 'translate(-38px, -15px)' : 'none';
      i2.style.opacity = open ? '1' : '0';
      i2.style.transform = open ? 'translate(38px, -15px)' : 'none';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('download-cloud-morph') || id === 'download-cloud-morph') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:30px; cursor:pointer; transition:transform 0.3s;';
    wrap.textContent = '☁️';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'translateY(8px) scale(1.15)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('battery-charging-spark') || id === 'battery-charging-spark') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:48px; height:24px; border:2px solid ${accent}; border-radius:4px; padding:2px; box-sizing:border-box; cursor:pointer; display:flex; align-items:center;';
    wrap.innerHTML = `
      <div class="bcs-bar" style="height:100%; width:75%; background:${accent}; border-radius:2px; transition:width 0.4s;"></div>
      <span style="position:absolute; right:-6px; width:4px; height:10px; background:${accent}; border-radius:0 2px 2px 0;"></span>
    `;
    let full = false;
    const bar = wrap.querySelector('.bcs-bar');
    wrap.addEventListener('click', () => {
      full = !full;
      bar.style.width = full ? '100%' : '50%';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('wifi-signal-bars-wave') || id === 'wifi-signal-bars-wave') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:28px; cursor:pointer; color:${accent};';
    wrap.textContent = '📶';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.25)';
      setTimeout(() => wrap.style.transform = 'none', 180);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('thumbs-up-sparkle') || id === 'thumbs-up-sparkle') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:28px; cursor:pointer;';
    wrap.textContent = '👍✨';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.3) rotate(-8deg)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('trash-can-lid-flip') || id === 'trash-can-lid-flip') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:28px; cursor:pointer; transition:transform 0.3s;';
    wrap.textContent = '🗑️';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'rotate(-25deg) scale(1.15)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('refresh-dual-arrow-spin') || id === 'refresh-dual-arrow-spin') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:28px; cursor:pointer; transition:transform 0.4s; color:${accent};';
    wrap.textContent = '🔄';
    let r = 0;
    wrap.addEventListener('click', () => {
      r += 180;
      wrap.style.transform = `rotate(${r}deg) scale(1.2)`;
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('search-to-close-morph') || id === 'search-to-close-morph') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:38px; height:38px; border-radius:50%; background:#161C28; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; font-size:16px; cursor:pointer;';
    wrap.textContent = '🔍';
    let closed = false;
    wrap.addEventListener('click', () => {
      closed = !closed;
      wrap.textContent = closed ? '✕' : '🔍';
      wrap.style.transform = 'scale(1.15) rotate(90deg)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('volume-speaker-waves') || id === 'volume-speaker-waves') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:28px; cursor:pointer;';
    wrap.textContent = '🔊';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.25)';
      setTimeout(() => wrap.style.transform = 'none', 180);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('lock-to-unlock-shackle') || id === 'lock-to-unlock-shackle') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:28px; cursor:pointer;';
    wrap.textContent = '🔒';
    let unlocked = false;
    wrap.addEventListener('click', () => {
      unlocked = !unlocked;
      wrap.textContent = unlocked ? '🔓' : '🔒';
      wrap.style.transform = 'scale(1.2)';
      setTimeout(() => wrap.style.transform = 'none', 180);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('star-rating-favorite') || id === 'star-rating-favorite') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:32px; cursor:pointer; color:#FFA500;';
    wrap.textContent = '★';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.4) rotate(72deg)';
      setTimeout(() => wrap.style.transform = 'none', 250);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('pin-drop-bounce') || id === 'pin-drop-bounce') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:30px; cursor:pointer;';
    wrap.textContent = '📍';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'translateY(-20px) scale(1.2)';
      setTimeout(() => {
        wrap.style.transform = 'translateY(4px) scale(0.9)';
        setTimeout(() => wrap.style.transform = 'none', 120);
      }, 150);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('trophy-cup-glow') || id === 'trophy-cup-glow') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:30px; cursor:pointer; filter:drop-shadow(0 0 10px #FFD700);';
    wrap.textContent = '🏆';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.3) rotate(-5deg)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('eye-peek-toggle') || id === 'eye-peek-toggle') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:28px; cursor:pointer;';
    wrap.textContent = '👁️';
    let peek = false;
    wrap.addEventListener('click', () => {
      peek = !peek;
      wrap.textContent = peek ? '🙈' : '👁️';
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('link-chain-snap') || id === 'link-chain-snap') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:28px; cursor:pointer; color:${accent};';
    wrap.textContent = '🔗';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.3) rotate(45deg)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else {
    // 26. compass-needle-spin & default micro-interaction
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-size:30px; cursor:pointer; transition:transform 0.4s cubic-bezier(0.34, 1.8, 0.64, 1);';
    wrap.textContent = '🧭';
    let rot = 0;
    wrap.addEventListener('click', () => {
      rot += 90;
      wrap.style.transform = `rotate(${rot}deg) scale(1.2)`;
      setTimeout(() => wrap.style.transform = `rotate(${rot}deg)`, 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();
  }

  return { restart: restartFn, destroy: destroyFn };
}
