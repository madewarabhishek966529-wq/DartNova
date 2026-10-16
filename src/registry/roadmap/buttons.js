import { createRoadmapComponent } from '../visualizer.js';

export const roadmapButtons = [
  createRoadmapComponent({
    id: 'liquid-fill-button',
    name: 'Liquid Fill Button',
    category: 'buttons',
    icon: '🌊',
    difficulty: 'intermediate',
    tags: ['button', 'liquid', 'wave', 'interactive'],
    description: 'Dynamic fluid wave that fills the button container geometry upon hover or tap.'
  }),
  createRoadmapComponent({
    id: 'shimmer-button',
    name: 'Shimmer Button',
    category: 'buttons',
    icon: '✨',
    difficulty: 'beginner',
    tags: ['button', 'shimmer', 'shine', 'glow'],
    description: 'High-speed iridescent light beam sweeping across button surface with specular highlights.'
  }),
  createRoadmapComponent({
    id: 'elastic-bounce-button',
    name: 'Elastic Bounce Button',
    category: 'buttons',
    icon: '🏀',
    difficulty: 'intermediate',
    tags: ['button', 'elastic', 'bounce', 'spring'],
    description: 'Bouncy spring reaction simulating physical elastic material with natural overshoot damping.'
  }),
  createRoadmapComponent({
    id: 'border-beam-button',
    name: 'Border Beam Button',
    category: 'buttons',
    icon: '⚡',
    difficulty: 'intermediate',
    tags: ['button', 'border', 'beam', 'laser'],
    description: 'Luminous light particle that travels continuously along the perimeter border of the button.'
  }),
  createRoadmapComponent({
    id: 'gradient-shift-button',
    name: 'Gradient Shift Button',
    category: 'buttons',
    icon: '🌈',
    difficulty: 'beginner',
    tags: ['button', 'gradient', 'shift', 'colors'],
    description: 'Smooth multi-stop linear gradient that shifts continuously along angles on user interaction.'
  }),
  createRoadmapComponent({
    id: 'particle-burst-button',
    name: 'Particle Burst Button',
    category: 'buttons',
    icon: '💥',
    difficulty: 'advanced',
    tags: ['button', 'particles', 'burst', 'celebration'],
    description: 'Radial explosion of multi-colored particles bursting outwards when the button is clicked.'
  }),
  createRoadmapComponent({
    id: 'cyber-glitch-button',
    name: 'Cyber Glitch Button',
    category: 'buttons',
    icon: '👾',
    difficulty: 'intermediate',
    tags: ['button', 'glitch', 'cyberpunk', 'rgb'],
    description: 'High-frequency horizontal slice displacement and RGB channel split jitter on interaction.'
  }),
  createRoadmapComponent({
    id: 'ripple-pulse-button',
    name: 'Ripple Pulse Button',
    category: 'buttons',
    icon: '🔘',
    difficulty: 'beginner',
    tags: ['button', 'ripple', 'pulse', 'water'],
    description: 'Concentric circular waves radiating outwards from touch coordinates with smooth decay.'
  }),
  createRoadmapComponent({
    id: 'gravity-tilt-button',
    name: 'Gravity Tilt Button',
    category: 'buttons',
    icon: '🕹️',
    difficulty: 'intermediate',
    tags: ['button', '3d', 'tilt', 'perspective'],
    description: '3D perspective plane pitch and roll tilting dynamically towards cursor position.'
  }),
  createRoadmapComponent({
    id: 'morphing-pill-button',
    name: 'Morphing Pill Button',
    category: 'buttons',
    icon: '💊',
    difficulty: 'advanced',
    tags: ['button', 'morph', 'loader', 'spinner'],
    description: 'Elongated pill button that morphs into a circular progress spinner on action dispatch.'
  }),
  createRoadmapComponent({
    id: 'corner-bracket-button',
    name: 'Corner Bracket Button',
    category: 'buttons',
    icon: '🔲',
    difficulty: 'beginner',
    tags: ['button', 'brackets', 'tech', 'scifi'],
    description: 'Targeting reticle brackets sliding inwards from the four corners to frame text on hover.'
  }),
  createRoadmapComponent({
    id: 'slide-arrow-button',
    name: 'Slide Arrow Button',
    category: 'buttons',
    icon: '🏹',
    difficulty: 'beginner',
    tags: ['button', 'arrow', 'chevron', 'slide'],
    description: 'Directional chevron sliding forward with an elastic spring snap when hovered.'
  }),
  createRoadmapComponent({
    id: 'confetti-blast-button',
    name: 'Confetti Blast Button',
    category: 'buttons',
    icon: '🎊',
    difficulty: 'intermediate',
    tags: ['button', 'confetti', 'party', 'blast'],
    description: 'Eruption of multi-colored geometric confetti squares with realistic gravity and rotation.'
  }),
  createRoadmapComponent({
    id: 'jelly-squeeze-button',
    name: 'Jelly Squeeze Button',
    category: 'buttons',
    icon: '🍮',
    difficulty: 'intermediate',
    tags: ['button', 'jelly', 'squash', 'stretch'],
    description: 'Squash and stretch gelatin dynamics compressing on press and wobbling to a rest.'
  }),
  createRoadmapComponent({
    id: 'outline-draw-button',
    name: 'Outline Draw Button',
    category: 'buttons',
    icon: '✏️',
    difficulty: 'intermediate',
    tags: ['button', 'outline', 'stroke', 'svg'],
    description: 'Continuous vector outline stroke drawn dynamically around the button perimeter.'
  }),
  createRoadmapComponent({
    id: 'floating-halo-button',
    name: 'Floating Halo Button',
    category: 'buttons',
    icon: '😇',
    difficulty: 'intermediate',
    tags: ['button', 'halo', 'glow', 'levitate'],
    description: 'Breathing multi-chromatic neon halo suspended beneath an elevated floating button.'
  }),
  createRoadmapComponent({
    id: 'radar-sweep-button',
    name: 'Radar Sweep Button',
    category: 'buttons',
    icon: '🧭',
    difficulty: 'intermediate',
    tags: ['button', 'radar', 'sweep', 'conic'],
    description: 'Conic gradient radar beam scanning 360 degrees across button face with phosphor trail.'
  }),
  createRoadmapComponent({
    id: 'segmented-toggle-button',
    name: 'Segmented Toggle Button',
    category: 'buttons',
    icon: '🎚️',
    difficulty: 'beginner',
    tags: ['button', 'toggle', 'segmented', 'switch'],
    description: 'Sliding pill capsule indicator gliding between active segment states with haptic feedback.'
  }),
  createRoadmapComponent({
    id: 'split-reveal-button',
    name: 'Split Reveal Button',
    category: 'buttons',
    icon: '✂️',
    difficulty: 'intermediate',
    tags: ['button', 'split', 'reveal', 'curtain'],
    description: 'Button surface splits vertically in half on hover, revealing an underlying action icon.'
  }),
  createRoadmapComponent({
    id: 'audio-click-button',
    name: 'Audio Click Button',
    category: 'buttons',
    icon: '🔊',
    difficulty: 'advanced',
    tags: ['button', 'audio', 'sound', 'frequency'],
    description: 'Miniature reactive equalizer bars embedded in button face jumping to click transients.'
  }),
  createRoadmapComponent({
    id: 'laser-scan-button',
    name: 'Laser Scan Button',
    category: 'buttons',
    icon: '🚨',
    difficulty: 'intermediate',
    tags: ['button', 'laser', 'scan', 'beam'],
    description: 'Horizontal neon laser line sweeping continuously up and down across button surface.'
  }),
  createRoadmapComponent({
    id: 'firefly-swarm-button',
    name: 'Firefly Swarm Button',
    category: 'buttons',
    icon: '🪲',
    difficulty: 'advanced',
    tags: ['button', 'firefly', 'particles', 'swarm'],
    description: 'Orbiting luminous micro-particles buzzing around button borders in organic flight paths.'
  })
];
