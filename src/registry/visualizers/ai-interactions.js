/**
 * DartNova Smart AI & Voice Interactions Visualizers (10 Bespoke Modern UI Components)
 */

export function renderAiInteractionVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('voice-orb') || id === 'voice-orb-pulsar') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:90px; height:90px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="vo-pulse" style="position:absolute; width:70px; height:70px; border-radius:50%; background:radial-gradient(circle, ${accent}66 0%, transparent 70%); animation:dnPulseGlow 1.8s infinite alternate;"></div>
      <div class="vo-core" style="width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg, ${accent}, #42E8F5, #9B7CFF); box-shadow:0 0 20px ${accent}; transition:transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); display:flex; align-items:center; justify-content:center; font-size:16px;">
        ✨
      </div>
    `;
    const core = wrap.querySelector('.vo-core');
    let speaking = false;
    const toggleSpeak = () => {
      speaking = !speaking;
      core.style.transform = speaking ? 'scale(1.3) rotate(20deg)' : 'scale(1)';
    };
    wrap.addEventListener('click', toggleSpeak);
    stage.appendChild(wrap);
    restartFn = toggleSpeak;

  } else if (id.includes('thinking-dots') || id === 'thinking-dots-wave') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:10px 16px; border-radius:99px; background:#141824; border:1px solid #2B3448; display:flex; align-items:center; gap:8px; cursor:pointer;';
    wrap.innerHTML = `
      <span style="font-size:9px; font-weight:800; color:${accent}; font-family:var(--font-mono);">THINKING</span>
      <div style="display:flex; gap:4px;">
        <span class="td-dot d1" style="width:6px; height:6px; border-radius:50%; background:${accent}; animation:dnFloatLevitate 1s infinite alternate; animation-delay:0s;"></span>
        <span class="td-dot d2" style="width:6px; height:6px; border-radius:50%; background:#42E8F5; animation:dnFloatLevitate 1s infinite alternate; animation-delay:0.2s;"></span>
        <span class="td-dot d3" style="width:6px; height:6px; border-radius:50%; background:#9B7CFF; animation:dnFloatLevitate 1s infinite alternate; animation-delay:0.4s;"></span>
      </div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('speech-streamer') || id === 'waveform-speech-streamer') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; gap:3px; height:40px; cursor:pointer;';
    for (let i = 0; i < 16; i++) {
      const bar = document.createElement('div');
      bar.style.cssText = `width:3.5px; border-radius:2px; background:${i % 3 === 0 ? accent : (i % 3 === 1 ? '#42E8F5' : '#FFF')}; animation:dnEqBounce ${0.5 + (i % 5) * 0.15}s infinite alternate; animation-delay:${i * 0.05}s;`;
      wrap.appendChild(bar);
    }
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('prompt-input') || id === 'prompt-input-morph') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `position:relative; width:160px; height:36px; border-radius:99px; background:#161B26; border:1px solid ${accent}; display:flex; align-items:center; justify-content:space-between; padding:0 12px; box-sizing:border-box; cursor:pointer; box-shadow:0 0 14px ${accent}33; transition:all 0.3s;`;
    wrap.innerHTML = `
      <div style="display:flex; align-items:center; gap:6px;">
        <span style="color:${accent}; font-size:12px;">✦</span>
        <span style="font-size:9px; font-weight:700; color:#FFF;">Ask DartNova AI...</span>
      </div>
      <span style="font-size:10px; color:${accent}; font-weight:900;">➔</span>
    `;
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.06)';
      setTimeout(() => wrap.style.transform = 'none', 180);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('streaming-token') || id === 'streaming-token-cascade') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; padding:10px; border-radius:8px; background:#121622; border:1px solid #282E3D; font-family:var(--font-mono); font-size:9px; color:#FFF; line-height:1.4; cursor:pointer;';
    wrap.innerHTML = `
      <span style="color:${accent}; font-weight:800;">AI:</span>
      <span class="stc-stream">Compiling 120 FPS Impeller motion shader...</span>
      <span style="display:inline-block; width:6px; height:12px; background:${accent}; animation:dnPulseGlow 0.8s infinite; margin-left:2px;"></span>
    `;
    const stream = wrap.querySelector('.stc-stream');
    const text = 'Compiling 120 FPS Impeller motion shader...';
    let idx = 0;
    let timer = null;
    const playStream = () => {
      idx = 0;
      stream.textContent = '';
      clearInterval(timer);
      timer = setInterval(() => {
        if (idx < text.length) {
          stream.textContent += text[idx];
          idx++;
        } else {
          clearInterval(timer);
        }
      }, 40);
    };
    playStream();
    wrap.addEventListener('click', playStream);
    destroyFn = () => clearInterval(timer);
    stage.appendChild(wrap);
    restartFn = playStream;

  } else if (id.includes('context-pill') || id === 'context-pill-radar') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:150px; height:80px; border-radius:10px; background:#131824; border:1px solid #282E3D; overflow:hidden; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="cpr-sweep" style="position:absolute; width:120px; height:120px; border-radius:50%; background:conic-gradient(from 0deg, transparent 70%, ${accent}66 100%); animation:dnBorderBeam 3s linear infinite;"></div>
      <div style="position:relative; z-index:2; padding:4px 8px; border-radius:99px; background:#181F2E; border:1px solid ${accent}; font-size:8px; font-weight:800; color:${accent}; font-family:var(--font-mono);">
        SCANNING MEMORY 48K
      </div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.06)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('agentic-step') || id === 'agentic-step-progress') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-direction:column; gap:4px; width:160px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="padding:4px 8px; border-radius:4px; background:#181E2A; font-size:8px; color:#FFF; display:flex; justify-content:space-between; align-items:center;">
        <span>1. Parse User Intent</span><span style="color:${accent};">✓</span>
      </div>
      <div style="padding:4px 8px; border-radius:4px; background:#1E2638; border:1px solid ${accent}66; font-size:8px; color:${accent}; font-weight:800; display:flex; justify-content:space-between; align-items:center;">
        <span>2. Synthesize Motion Curve</span><span style="animation:dnPulseGlow 1s infinite;">●</span>
      </div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.05)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('sparkle-ai') || id === 'sparkle-ai-badge') {
    const wrap = document.createElement('div');
    wrap.style.cssText = `padding:8px 14px; border-radius:99px; background:linear-gradient(135deg, #181E2C, #251E33); border:1.5px solid ${accent}; display:flex; align-items:center; gap:6px; cursor:pointer; box-shadow:0 0 16px ${accent}44;`;
    wrap.innerHTML = `
      <span style="font-size:14px; animation:dnPulseGlow 1.4s infinite;">✨</span>
      <span style="font-size:10px; font-weight:800; color:#FFF;">DartNova AI Agent</span>
    `;
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.15) rotate(-3deg)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('neural-synapse') || id === 'neural-synapse-network') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:150px; height:80px; cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 140 70" style="width:100%; height:100%;">
        <line x1="20" y1="35" x2="70" y2="20" stroke="${accent}66" stroke-width="1.5"/>
        <line x1="20" y1="35" x2="70" y2="55" stroke="${accent}66" stroke-width="1.5"/>
        <line x1="70" y1="20" x2="120" y2="35" stroke="#42E8F566" stroke-width="1.5"/>
        <line x1="70" y1="55" x2="120" y2="35" stroke="#42E8F566" stroke-width="1.5"/>
        <circle cx="20" cy="35" r="5" fill="${accent}" style="filter:drop-shadow(0 0 6px ${accent});"/>
        <circle cx="70" cy="20" r="4.5" fill="#FFF"/>
        <circle cx="70" cy="55" r="4.5" fill="#FFF"/>
        <circle cx="120" cy="35" r="6" fill="#42E8F5" style="filter:drop-shadow(0 0 8px #42E8F5);"/>
      </svg>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else {
    // Voice Listening Ring
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:80px; height:80px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div style="position:absolute; width:65px; height:65px; border-radius:50%; border:1.5px solid ${accent}55; animation:dnPulseGlow 1.8s infinite;"></div>
      <div style="position:absolute; width:50px; height:50px; border-radius:50%; border:1.5px solid #42E8F577; animation:dnPulseGlow 1.2s infinite alternate;"></div>
      <div style="width:34px; height:34px; border-radius:50%; background:${accent}; display:flex; align-items:center; justify-content:center; font-size:14px; color:#08090B; font-weight:800; box-shadow:0 0 16px ${accent};">
        🎙️
      </div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2)'; setTimeout(() => wrap.style.transform = 'none', 200); };
  }

  return { restart: restartFn, destroy: destroyFn };
}
