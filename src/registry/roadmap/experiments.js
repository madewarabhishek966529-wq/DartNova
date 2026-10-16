import { createRoadmapComponent } from '../visualizer.js';

export const roadmapExperiments = [
  createRoadmapComponent({
    id: 'particle-explosion',
    name: 'Multi-Color Particle Blast',
    category: 'experiments',
    icon: '💥',
    difficulty: 'advanced',
    tags: ['experiments', 'particles', 'explosion', 'physics'],
    description: 'Radial explosion of 60 physics-driven particles with gravity and drag.'
  }),
  createRoadmapComponent({
    id: 'text-to-particle',
    name: 'Text-to-Particle Dispersal',
    category: 'experiments',
    icon: '💨',
    difficulty: 'advanced',
    tags: ['experiments', 'text', 'particles', 'disperse'],
    description: 'Letter glyphs exploding into hundreds of tiny floating dust motes.'
  }),
  createRoadmapComponent({
    id: 'svg-path-drawing',
    name: 'Procedural Path Tracer',
    category: 'experiments',
    icon: '⚡',
    difficulty: 'intermediate',
    tags: ['experiments', 'svg', 'path', 'trace'],
    description: 'High-voltage lightning bolt SVG path drawn with glow trail.'
  }),
  createRoadmapComponent({
    id: 'morphing-svg-shapes',
    name: 'Geometric Shape Morph',
    category: 'experiments',
    icon: '📐',
    difficulty: 'advanced',
    tags: ['experiments', 'morph', 'shapes', 'svg'],
    description: 'Cubic bezier spline morphing between circle, star, polygon, and triangle.'
  }),
  createRoadmapComponent({
    id: 'liquid-metal-effect',
    name: 'Liquid Metal Mercury',
    category: 'experiments',
    icon: '🪙',
    difficulty: 'advanced',
    tags: ['experiments', 'liquid', 'metal', 'chrome'],
    description: 'Chrome liquid reflection behaving like liquid mercury under cursor gravity.'
  }),
  createRoadmapComponent({
    id: 'magnetic-cursor-field',
    name: 'Magnetic Compass Field',
    category: 'experiments',
    icon: '🧲',
    difficulty: 'advanced',
    tags: ['experiments', 'magnetic', 'field', 'vectors'],
    description: 'Grid of vector needles deflecting to track cursor coordinates across viewport.'
  }),
  createRoadmapComponent({
    id: 'waveform-visualizer',
    name: 'Real-Time Audio Spectrum',
    category: 'experiments',
    icon: '🎚️',
    difficulty: 'advanced',
    tags: ['experiments', 'audio', 'waveform', 'frequency'],
    description: 'Real-time procedural audio spectrum analyzer with glowing vertical frequency bars.'
  }),
  createRoadmapComponent({
    id: 'animated-logo-reveal',
    name: 'DartNova Lightning Reveal',
    category: 'experiments',
    icon: '⚡',
    difficulty: 'intermediate',
    tags: ['experiments', 'logo', 'brand', 'reveal'],
    description: 'DartNova lightning bolt drawing its path with radial neon halo explosion.'
  }),
  createRoadmapComponent({
    id: 'confetti-celebration',
    name: 'Two-Cannon Confetti Blast',
    category: 'experiments',
    icon: '🎉',
    difficulty: 'intermediate',
    tags: ['experiments', 'confetti', 'party', 'celebration'],
    description: 'Two-cannon confetti blast with physical rotation, fluttering, and gravity drag.'
  }),
  createRoadmapComponent({
    id: 'gravity-cloth-mesh',
    name: 'Verlet Cloth Mesh Physics',
    category: 'experiments',
    icon: '🧶',
    difficulty: 'advanced',
    tags: ['experiments', 'cloth', 'verlet', 'physics'],
    description: 'Interactive 2D cloth sheet responding to cursor tugs and tearing under stress.'
  }),
  createRoadmapComponent({
    id: 'boids-flocking-simulation',
    name: 'Autonomous Boid Flocking',
    category: 'experiments',
    icon: '🕊️',
    difficulty: 'advanced',
    tags: ['experiments', 'boids', 'flocking', 'swarm'],
    description: 'Swarm of autonomous bird agents exhibiting emergent cohesion and separation.'
  }),
  createRoadmapComponent({
    id: 'fireworks-sky-display',
    name: 'Cascading Willow Fireworks',
    category: 'experiments',
    icon: '🎆',
    difficulty: 'advanced',
    tags: ['experiments', 'fireworks', 'sparks', 'sky'],
    description: 'Multi-stage mortar rockets exploding into weeping willow gold sparks.'
  }),
  createRoadmapComponent({
    id: 'chaos-pendulum-fractal',
    name: 'Chaotic Double Pendulum',
    category: 'experiments',
    icon: '🕰️',
    difficulty: 'advanced',
    tags: ['experiments', 'pendulum', 'chaos', 'physics'],
    description: 'Double pendulum joints tracing non-repeating chaotic mathematical trajectories.'
  }),
  createRoadmapComponent({
    id: 'gravitational-attractor',
    name: 'Lorenz Butterfly Attractor',
    category: 'experiments',
    icon: '🌌',
    difficulty: 'advanced',
    tags: ['experiments', 'lorenz', 'attractor', 'math'],
    description: 'Differential equation system drawing the famous 3D butterfly strange attractor.'
  }),
  createRoadmapComponent({
    id: 'sound-frequency-mandala',
    name: 'Acoustic Sacred Mandala',
    category: 'experiments',
    icon: '🪷',
    difficulty: 'advanced',
    tags: ['experiments', 'mandala', 'cymatics', 'audio'],
    description: 'Harmonic cymatic geometry breathing in symmetrical kaleidoscopic petals.'
  }),
  createRoadmapComponent({
    id: 'ferrofluid-spike-magnet',
    name: 'Ferrofluid Magnetic Spikes',
    category: 'experiments',
    icon: '🦔',
    difficulty: 'advanced',
    tags: ['experiments', 'ferrofluid', 'magnetic', 'spikes'],
    description: 'Dark liquid gathering into sharp geometric spikes around cursor magnet.'
  }),
  createRoadmapComponent({
    id: 'raymarched-metaball-swarm',
    name: 'Raymarched Organic Metaballs',
    category: 'experiments',
    icon: '🫧',
    difficulty: 'advanced',
    tags: ['experiments', 'metaball', 'raymarch', 'organic'],
    description: 'Glossy liquid spheres coalescing smoothly with surface tension blend.'
  }),
  createRoadmapComponent({
    id: 'smoke-ring-vortex',
    name: 'Toroidal Smoke Vortex Cannon',
    category: 'experiments',
    icon: '💨',
    difficulty: 'advanced',
    tags: ['experiments', 'vortex', 'toroid', 'smoke'],
    description: 'Toroidal smoke vortex rings propelling forward and expanding.'
  }),
  createRoadmapComponent({
    id: 'slime-mold-physarum',
    name: 'Physarum Slime Mold Network',
    category: 'experiments',
    icon: '🦠',
    difficulty: 'advanced',
    tags: ['experiments', 'physarum', 'slime', 'agent'],
    description: 'Chemotactic agent trails connecting food nodes like intelligent fungal networks.'
  }),
  createRoadmapComponent({
    id: 'aurora-borealis-canvas',
    name: 'Atmospheric Aurora Sheets',
    category: 'experiments',
    icon: '🌌',
    difficulty: 'advanced',
    tags: ['experiments', 'aurora', 'borealis', 'atmospheric'],
    description: 'Curtains of green and magenta solar plasma dancing across night sky.'
  }),
  createRoadmapComponent({
    id: 'kinetic-typography-spiral',
    name: 'Kinetic 3D Typography Vortex',
    category: 'experiments',
    icon: '🌀',
    difficulty: 'advanced',
    tags: ['experiments', 'typography', 'vortex', 'spiral'],
    description: 'Words revolving down an infinite conical funnel into the vanishing point.'
  }),
  createRoadmapComponent({
    id: 'light-prism-refraction',
    name: 'Light Beam Glass Prism',
    category: 'experiments',
    icon: '🌈',
    difficulty: 'advanced',
    tags: ['experiments', 'prism', 'light', 'refraction'],
    description: 'White optical laser separating into rainbow spectral wavelengths through prism.'
  }),
  createRoadmapComponent({
    id: 'fractal-tree-growth',
    name: 'Recursive Fractal Tree Growth',
    category: 'experiments',
    icon: '🌳',
    difficulty: 'advanced',
    tags: ['experiments', 'fractal', 'tree', 'recursive'],
    description: 'L-system mathematical fractal tree branching and blooming dynamically.'
  }),
  createRoadmapComponent({
    id: 'wave-interference-pool',
    name: 'Dual-Point Wave Interference',
    category: 'experiments',
    icon: '🌊',
    difficulty: 'advanced',
    tags: ['experiments', 'wave', 'interference', 'physics'],
    description: 'Two ripple sources generating constructive and destructive interference moiré.'
  }),
  createRoadmapComponent({
    id: 'procedural-lightning-arc',
    name: 'High-Voltage Lightning Bolt',
    category: 'experiments',
    icon: '⚡',
    difficulty: 'advanced',
    tags: ['experiments', 'lightning', 'plasma', 'electric'],
    description: 'Jagged fractal electric plasma discharge arcing to mouse coordinates.'
  })
];
