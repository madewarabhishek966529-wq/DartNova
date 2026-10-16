/**
 * DartNova Icons & Micro-Interactions Visualizers (10 Bespoke Modern UI Components)
 */

export function renderMicroInteractionVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('heart-pop') || id === 'heart-pop') {
    const heart = document.createElement('div');
    heart.className = 'dn-heart-pop-widget';
    heart.style.cssText = 'font-size:36px; cursor:pointer; transition:transform 0.2s;';
    heart.textContent = '❤️';
    heart.addEventListener('click', () => {
      heart.style.transform = 'scale(1.4) rotate(-12deg)';
      setTimeout(() => {
        heart.style.transform = 'scale(0.85) rotate(6deg)';
        setTimeout(() => { heart.style.transform = 'scale(1)'; }, 140);
      }, 150);
    });
    stage.appendChild(heart);
    restartFn = () => heart.click();

  } else if (id.includes('bell') || id === 'bell-ring') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:44px; height:44px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="b-bell" style="font-size:28px; transform-origin:top center; transition:transform 0.1s;">🔔</div>
      <div class="b-badge" style="position:absolute; top:4px; right:4px; width:10px; height:10px; border-radius:50%; background:${accent}; border:2px solid #111318; box-shadow:0 0 8px ${accent};"></div>
    `;
    const bell = wrap.querySelector('.b-bell');
    const ring = () => {
      bell.style.transform = 'rotate(22deg)';
      setTimeout(() => { bell.style.transform = 'rotate(-18deg)'; }, 80);
      setTimeout(() => { bell.style.transform = 'rotate(12deg)'; }, 160);
      setTimeout(() => { bell.style.transform = 'rotate(-8deg)'; }, 240);
      setTimeout(() => { bell.style.transform = 'none'; }, 320);
    };
    wrap.addEventListener('click', ring);
    stage.appendChild(wrap);
    restartFn = ring;

  } else if (id.includes('bookmark') || id === 'bookmark-morph') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:40px; height:48px; cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 24 30" style="width:100%; height:100%;">
        <path class="bm-path" d="M 4 2 L 20 2 L 20 28 L 12 21 L 4 28 Z" fill="none" stroke="${accent}" stroke-width="2.5" style="transition:all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);"/>
      </svg>
    `;
    let saved = false;
    const path = wrap.querySelector('.bm-path');
    const toggleBookmark = () => {
      saved = !saved;
      path.setAttribute('fill', saved ? accent : 'none');
      wrap.style.transform = 'scale(1.2)';
      setTimeout(() => wrap.style.transform = 'none', 180);
    };
    wrap.addEventListener('click', toggleBookmark);
    stage.appendChild(wrap);
    restartFn = toggleBookmark;

  } else if (id.includes('like-burst') || id === 'like-burst') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `<span class="lb-heart" style="font-size:32px; transition:transform 0.2s;">🤍</span>`;
    let liked = false;
    const heart = wrap.querySelector('.lb-heart');
    const burst = () => {
      liked = !liked;
      heart.textContent = liked ? '💖' : '🤍';
      heart.style.transform = 'scale(1.35)';
      setTimeout(() => heart.style.transform = 'none', 200);
      if (liked) {
        for (let i = 0; i < 8; i++) {
          const dot = document.createElement('div');
          const angle = (i / 8) * Math.PI * 2;
          const dist = 24;
          dot.style.cssText = `position:absolute; width:4px; height:4px; border-radius:50%; background:${accent}; top:50%; left:50%; pointer-events:none; transition:all 0.35s ease-out; box-shadow:0 0 6px ${accent};`;
          wrap.appendChild(dot);
          setTimeout(() => {
            dot.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
            dot.style.opacity = '0';
          }, 10);
          setTimeout(() => dot.remove(), 400);
        }
      }
    };
    wrap.addEventListener('click', burst);
    stage.appendChild(wrap);
    restartFn = burst;

  } else if (id.includes('spin-transition') || id === 'icon-spin-transition') {
    const btn = document.createElement('div');
    btn.style.cssText = `width:44px; height:44px; border-radius:50%; background:#161B26; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; font-size:20px; color:${accent}; cursor:pointer; transition:transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);`;
    btn.textContent = '↻';
    let rot = 0;
    const spin = () => {
      rot += 360;
      btn.style.transform = `rotate(${rot}deg) scale(1.15)`;
      setTimeout(() => btn.style.transform = `rotate(${rot}deg) scale(1)`, 250);
    };
    btn.addEventListener('click', spin);
    stage.appendChild(btn);
    restartFn = spin;

  } else if (id.includes('draw-on') || id === 'icon-draw-on') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:44px; height:44px; cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 24 24" style="width:100%; height:100%;">
        <polygon class="do-star" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="none" stroke="${accent}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="100" stroke-dashoffset="0" style="transition:stroke-dashoffset 0.6s ease; filter:drop-shadow(0 0 6px ${accent});"/>
      </svg>
    `;
    const star = wrap.querySelector('.do-star');
    const redraw = () => {
      star.style.strokeDashoffset = '100';
      setTimeout(() => { star.style.strokeDashoffset = '0'; }, 40);
    };
    wrap.addEventListener('click', redraw);
    stage.appendChild(wrap);
    restartFn = redraw;

  } else if (id.includes('copy-success') || id === 'copy-success-animation') {
    const btn = document.createElement('div');
    btn.style.cssText = `padding:8px 14px; border-radius:8px; background:#161B26; border:1px solid #323A4E; display:flex; align-items:center; gap:6px; cursor:pointer; transition:all 0.25s;`;
    btn.innerHTML = `<span class="cp-icon">📋</span><span class="cp-text" style="font-size:10px; font-weight:700; color:#FFF;">Copy Code</span>`;
    let copied = false;
    const toggleCopy = () => {
      copied = true;
      btn.style.borderColor = accent;
      btn.querySelector('.cp-icon').textContent = '✓';
      btn.querySelector('.cp-icon').style.color = accent;
      btn.querySelector('.cp-text').textContent = 'Copied!';
      btn.querySelector('.cp-text').style.color = accent;
      setTimeout(() => {
        copied = false;
        btn.style.borderColor = '#323A4E';
        btn.querySelector('.cp-icon').textContent = '📋';
        btn.querySelector('.cp-icon').style.color = '#FFF';
        btn.querySelector('.cp-text').textContent = 'Copy Code';
        btn.querySelector('.cp-text').style.color = '#FFF';
      }, 1200);
    };
    btn.addEventListener('click', toggleCopy);
    stage.appendChild(btn);
    restartFn = toggleCopy;

  } else if (id.includes('theme-switch') || id === 'theme-switch-animation') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:48px; height:28px; border-radius:14px; background:#181F2E; border:1.5px solid #333F56; cursor:pointer; display:flex; align-items:center; padding:2px; box-sizing:border-box; transition:all 0.3s;';
    wrap.innerHTML = `
      <div class="ts-thumb" style="width:20px; height:20px; border-radius:50%; background:${accent}; display:flex; align-items:center; justify-content:center; font-size:11px; transition:transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
        ☀️
      </div>
    `;
    let isDark = false;
    const thumb = wrap.querySelector('.ts-thumb');
    const toggleTheme = () => {
      isDark = !isDark;
      if (isDark) {
        thumb.style.transform = 'translateX(20px)';
        thumb.textContent = '🌙';
        thumb.style.background = '#42E8F5';
        wrap.style.borderColor = '#42E8F5';
      } else {
        thumb.style.transform = 'none';
        thumb.textContent = '☀️';
        thumb.style.background = accent;
        wrap.style.borderColor = '#333F56';
      }
    };
    wrap.addEventListener('click', toggleTheme);
    stage.appendChild(wrap);
    restartFn = toggleTheme;

  } else if (id.includes('cart-add') || id === 'cart-add-animation') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:120px; height:50px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="ca-dot" style="position:absolute; width:8px; height:8px; border-radius:50%; background:${accent}; opacity:0; left:25px; top:12px; pointer-events:none;"></div>
      <div class="ca-cart" style="padding:8px 14px; border-radius:8px; background:#161B26; border:1px solid ${accent}; color:#FFF; font-size:10px; font-weight:800; display:flex; align-items:center; gap:6px;">
        <span>🛒</span><span>Add to Cart</span>
      </div>
    `;
    const dot = wrap.querySelector('.ca-dot');
    const cart = wrap.querySelector('.ca-cart');
    const fly = () => {
      dot.style.opacity = '1';
      dot.style.transition = 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
      dot.style.transform = 'translate(45px, 6px) scale(0.6)';
      setTimeout(() => {
        dot.style.opacity = '0';
        dot.style.transition = 'none';
        dot.style.transform = 'none';
        cart.style.transform = 'scale(1.15)';
        setTimeout(() => cart.style.transform = 'none', 140);
      }, 420);
    };
    wrap.addEventListener('click', fly);
    stage.appendChild(wrap);
    restartFn = fly;

  } else {
    // Drag Handle Feedback
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:10px 14px; border-radius:8px; background:#161A24; border:1px solid #282E3D; display:flex; align-items:center; gap:8px; cursor:grab;';
    wrap.innerHTML = `
      <div class="dh-dots" style="display:grid; grid-template-columns:repeat(2, 4px); gap:3px;">
        <span style="width:4px; height:4px; border-radius:50%; background:#4B5568;"></span>
        <span style="width:4px; height:4px; border-radius:50%; background:#4B5568;"></span>
        <span style="width:4px; height:4px; border-radius:50%; background:#4B5568;"></span>
        <span style="width:4px; height:4px; border-radius:50%; background:#4B5568;"></span>
        <span style="width:4px; height:4px; border-radius:50%; background:#4B5568;"></span>
        <span style="width:4px; height:4px; border-radius:50%; background:#4B5568;"></span>
      </div>
      <span style="font-size:10px; font-weight:700; color:#FFF;">Drag Grip Reorder</span>
    `;
    const dots = wrap.querySelectorAll('.dh-dots span');
    wrap.addEventListener('mousedown', () => {
      dots.forEach(d => { d.style.background = accent; d.style.transform = 'scale(1.4)'; });
    });
    wrap.addEventListener('mouseup', () => {
      dots.forEach(d => { d.style.background = '#4B5568'; d.style.transform = 'none'; });
    });
    stage.appendChild(wrap);
    restartFn = () => {
      dots.forEach(d => { d.style.background = accent; });
      setTimeout(() => dots.forEach(d => { d.style.background = '#4B5568'; }), 300);
    };
  }

  return { restart: restartFn, destroy: destroyFn };
}
