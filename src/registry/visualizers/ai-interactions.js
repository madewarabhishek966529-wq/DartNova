/**
 * DartNova Generative & Agentic AI Visualizers (26 Bespoke Modern UI Components)
 * 120 FPS hardware-accelerated animations with interactive mouse/touch triggers
 */

export function renderAiInteractionVisualizer(id, name, icon, accent, duration, stage) {
  let restartFn = () => {};
  let destroyFn = () => {};

  if (id.includes('voice-orb') || id === 'voice-orb-pulsar') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:80px; height:80px; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `
      <div class="vo-glow" style="position:absolute; inset:0; border-radius:50%; background:radial-gradient(circle, ${accent}88 0%, #42E8F544 50%, transparent 70%); filter:blur(10px); animation:dnPulseGlow 2s infinite ease-in-out;"></div>
      <div class="vo-core" style="position:relative; width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg, ${accent}, #42E8F5); box-shadow:0 0 20px ${accent}; display:flex; align-items:center; justify-content:center; color:#08090B; font-weight:900; font-size:18px;">✨</div>
    `;
    const core = wrap.querySelector('.vo-core');
    wrap.addEventListener('click', () => {
      core.style.transform = 'scale(1.3) rotate(30deg)';
      setTimeout(() => core.style.transform = 'none', 250);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('thinking-dots') || id === 'thinking-dots-wave') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:8px; align-items:center; padding:12px 20px; border-radius:99px; background:#141824; border:1px solid #283246; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:8px; height:8px; border-radius:50%; background:${accent}; animation:dnFloatLevitate 0.8s infinite alternate; animation-delay:0s;"></div>
      <div style="width:8px; height:8px; border-radius:50%; background:${accent}; animation:dnFloatLevitate 0.8s infinite alternate; animation-delay:0.2s;"></div>
      <div style="width:8px; height:8px; border-radius:50%; background:${accent}; animation:dnFloatLevitate 0.8s infinite alternate; animation-delay:0.4s;"></div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('waveform-speech') || id === 'waveform-speech-streamer') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; gap:4px; height:45px; cursor:pointer;';
    for (let i = 0; i < 7; i++) {
      const bar = document.createElement('div');
      bar.style.cssText = `width:4px; height:${20 + (i % 3) * 12}px; border-radius:2px; background:${i % 2 === 0 ? accent : '#42E8F5'}; animation:dnFloatLevitate 0.6s infinite alternate; animation-delay:${i * 0.1}s;`;
      wrap.appendChild(bar);
    }
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('prompt-input') || id === 'prompt-input-morph') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; height:40px; border-radius:99px; background:#141824; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:space-between; padding:0 12px; box-sizing:border-box; cursor:pointer; font-size:9px; color:#FFF;';
    wrap.innerHTML = `<span>Ask DartNova AI...</span><span style="color:${accent}; font-weight:900;">➔</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('streaming-token') || id === 'streaming-token-cascade') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; padding:8px 10px; border-radius:8px; background:#131722; border:1px solid ${accent}; font-family:var(--font-mono); font-size:9px; color:#FFF; cursor:pointer;';
    wrap.innerHTML = `<span>Widget build(...)</span><span style="display:inline-block; width:6px; height:11px; background:${accent}; margin-left:3px; animation:dnPulseGlow 0.8s infinite;"></span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.06)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('context-pill') || id === 'context-pill-radar') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:6px 14px; border-radius:99px; background:#141926; border:1px solid ${accent}; display:flex; align-items:center; gap:8px; cursor:pointer; font-size:9px; font-weight:800; color:#FFF;';
    wrap.innerHTML = `<span style="color:${accent};">●</span><span>Context: 128k Tokens</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('agentic-step') || id === 'agentic-step-progress') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; display:flex; flex-direction:column; gap:4px; font-size:8px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="color:${accent}; font-weight:900;">✓ Step 1: Synthesize Flutter Code</div>
      <div style="color:#42E8F5; font-weight:800;">⚙ Step 2: Validate 120 FPS...</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.06)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('sparkle-ai') || id === 'sparkle-ai-badge') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:8px 16px; border-radius:8px; background:linear-gradient(135deg, ${accent}22, #42E8F522); border:1.5px solid ${accent}; display:flex; align-items:center; gap:6px; color:#FFF; font-weight:900; font-size:10px; cursor:pointer; box-shadow:0 0 16px ${accent}44;';
    wrap.innerHTML = `<span>✨ AI Intelligence</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15) rotate(2deg)'; setTimeout(() => wrap.style.transform = 'none', 200); };

  } else if (id.includes('neural-synapse') || id === 'neural-synapse-network') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:140px; height:70px; cursor:pointer;';
    wrap.innerHTML = `
      <svg viewBox="0 0 140 70" style="width:100%; height:100%;">
        <line x1="20" y1="35" x2="70" y2="20" stroke="${accent}" stroke-width="1.5"/>
        <line x1="20" y1="35" x2="70" y2="50" stroke="${accent}" stroke-width="1.5"/>
        <line x1="70" y1="20" x2="120" y2="35" stroke="#42E8F5" stroke-width="1.5"/>
        <line x1="70" y1="50" x2="120" y2="35" stroke="#42E8F5" stroke-width="1.5"/>
        <circle cx="20" cy="35" r="4" fill="${accent}"/>
        <circle cx="70" cy="20" r="4" fill="${accent}"/>
        <circle cx="70" cy="50" r="4" fill="${accent}"/>
        <circle cx="120" cy="35" r="5" fill="#42E8F5"/>
      </svg>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.1)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('voice-listening-ring') || id === 'voice-listening-ring') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:65px; height:65px; border-radius:50%; border:2px solid ${accent}; display:flex; align-items:center; justify-content:center; cursor:pointer;';
    wrap.innerHTML = `<span style="font-size:22px;">🎙️</span>`;
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.25)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('llm-reasoning-tree') || id === 'llm-reasoning-tree') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; font-size:8px; color:#FFF; display:flex; flex-direction:column; gap:3px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="font-weight:900; color:${accent};">● Root Hypothesis</div>
      <div style="padding-left:12px; color:#A0AEC0;">├─ Branch A: Fast Path (98%)</div>
      <div style="padding-left:12px; color:#A0AEC0;">└─ Branch B: Deep Search</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.06)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('multimodal-attachment') || id === 'multimodal-attachment-drop') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:150px; height:65px; border-radius:8px; border:1.5px dashed ${accent}; background:#141926; display:flex; align-items:center; justify-content:center; gap:6px; cursor:pointer; font-size:9px; font-weight:800; color:#FFF;';
    wrap.innerHTML = `<span style="color:${accent};">📎</span><span>Drop Context</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('sentiment-spectrum') || id === 'sentiment-spectrum-pulse') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:150px; height:34px; border-radius:99px; background:linear-gradient(90deg, #48BB78, ${accent}, #F56565); display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:900; color:#08090B; cursor:pointer;';
    wrap.textContent = 'Sentiment: Positive 94%';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('code-diff-synthesizer') || id === 'code-diff-synthesizer') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:160px; padding:6px; border-radius:6px; background:#0B0E14; border:1px solid #282E3D; font-family:var(--font-mono); font-size:8px; cursor:pointer;';
    wrap.innerHTML = `<div style="color:#FF4B72;">- const oldRate = 60;</div><div style="color:${accent};">+ const frameRate = 120;</div>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.06)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('ai-persona-avatar-switch') || id === 'ai-persona-avatar-switch') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; gap:8px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="width:34px; height:34px; border-radius:50%; background:${accent}; color:#08090B; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:16px;">🤖</div>
      <span style="font-size:9px; font-weight:800; color:#FFF;">Coder Persona</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('context-window-gauge') || id === 'context-window-gauge') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; width:55px; height:55px; border-radius:50%; border:3px solid ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:900; font-size:9px; font-family:var(--font-mono); cursor:pointer;';
    wrap.textContent = '82k';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('prompt-template-builder') || id === 'prompt-template-builder') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-wrap:wrap; gap:4px; width:150px; cursor:pointer;';
    wrap.innerHTML = `
      <span style="padding:2px 6px; border-radius:4px; background:${accent}33; border:1px solid ${accent}; font-size:8px; color:${accent}; font-weight:800;">[System]</span>
      <span style="padding:2px 6px; border-radius:4px; background:#1C2436; font-size:8px; color:#FFF;">[Context]</span>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('soundwave-voice-mic') || id === 'soundwave-voice-mic') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:44px; height:44px; border-radius:50%; background:#181F2E; border:1.5px solid ${accent}; display:flex; align-items:center; justify-content:center; font-size:18px; cursor:pointer; box-shadow:0 0 16px ${accent}44;';
    wrap.textContent = '🎙️';
    wrap.addEventListener('click', () => {
      wrap.style.transform = 'scale(1.3)';
      setTimeout(() => wrap.style.transform = 'none', 200);
    });
    stage.appendChild(wrap);
    restartFn = () => wrap.click();

  } else if (id.includes('agent-tool-execution-pill') || id === 'agent-tool-execution-pill') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:6px 12px; border-radius:99px; background:#161D2B; border:1px solid ${accent}; display:flex; align-items:center; gap:6px; cursor:pointer; font-size:9px; font-weight:800; color:#FFF;';
    wrap.innerHTML = `<span style="color:${accent};">⚡</span><span>Tool: flutter_build()</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('memory-retrieval-cascade') || id === 'memory-retrieval-cascade') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:150px; padding:6px; border-radius:6px; background:#131824; border:1px solid ${accent}; font-size:8px; color:#FFF; cursor:pointer;';
    wrap.innerHTML = `<div style="color:${accent}; font-weight:800;">RAG Memory Match</div><div style="color:var(--text-muted); margin-top:2px;">cosine_sim: 0.984</div>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('dynamic-thought-bubble') || id === 'dynamic-thought-bubble') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:8px 12px; border-radius:12px; background:#181F2E; border:1px solid ${accent}; font-size:8px; font-weight:800; color:#FFF; cursor:pointer;';
    wrap.innerHTML = `<span>Thinking: optimizing frame budget...</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('confidence-score-dial') || id === 'confidence-score-dial') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:55px; height:55px; border-radius:50%; border:3px solid ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:900; font-size:10px; font-family:var(--font-mono); cursor:pointer;';
    wrap.textContent = '99.4%';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.15)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('speech-to-text-streamer') || id === 'speech-to-text-streamer') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:150px; padding:6px; border-radius:6px; background:#131824; border:1px solid #283144; font-size:8px; color:#FFF; cursor:pointer;';
    wrap.innerHTML = `<span>"Create a modern 120 FPS card..."</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.06)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('agent-decision-matrix') || id === 'agent-decision-matrix') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:150px; display:flex; gap:4px; cursor:pointer;';
    wrap.innerHTML = `
      <div style="flex:1; padding:4px; border-radius:4px; background:#181F2E; border:1px solid ${accent}; font-size:7px; color:${accent}; text-align:center;">Agent A (64%)</div>
      <div style="flex:1; padding:4px; border-radius:4px; background:#181F2E; font-size:7px; color:#FFF; text-align:center;">Agent B (36%)</div>
    `;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else if (id.includes('citation-source-card') || id === 'citation-source-card') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:6px 10px; border-radius:6px; background:#161D2B; border:1px solid ${accent}; display:flex; align-items:center; gap:6px; cursor:pointer; font-size:8px; font-weight:800; color:#FFF;';
    wrap.innerHTML = `<span style="color:${accent};">🌐</span><span>api.flutter.dev/docs</span>`;
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.08)'; setTimeout(() => wrap.style.transform = 'none', 180); };

  } else {
    // 26. voice-waveform-sphere & default AI
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:60px; height:60px; border-radius:50%; border:2px dashed ${accent}; display:flex; align-items:center; justify-content:center; color:${accent}; font-weight:900; font-size:10px; cursor:pointer; animation:dnOrbitRotate 4s linear infinite;';
    wrap.textContent = 'AI SPHERE';
    stage.appendChild(wrap);
    restartFn = () => { wrap.style.transform = 'scale(1.2)'; setTimeout(() => wrap.style.transform = 'none', 180); };
  }

  return { restart: restartFn, destroy: destroyFn };
}
