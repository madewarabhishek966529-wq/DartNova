import { createRoadmapComponent } from '../visualizer.js';

export const roadmapShaders = [
  createRoadmapComponent({
    id: 'glsl-fluid-smoke',
    name: 'GLSL Fluid Smoke Shader',
    category: 'shaders',
    icon: '💨',
    difficulty: 'advanced',
    tags: ['shaders', 'fluid', 'smoke', 'glsl', 'impeller'],
    description: 'Real-time Navier-Stokes fluid smoke simulation rendered via custom FragmentProgram shader.'
  }),
  createRoadmapComponent({
    id: 'crt-scanline-display',
    name: 'CRT Scanline Display',
    category: 'shaders',
    icon: '📺',
    difficulty: 'intermediate',
    tags: ['shaders', 'crt', 'scanline', 'retro', 'glitch'],
    description: 'Vintage cathode ray tube raster scanlines, RGB chromatic aberration, and phosphorescent phosphor glow.'
  }),
  createRoadmapComponent({
    id: 'iridescent-glass-refraction',
    name: 'Iridescent Glass Refraction',
    category: 'shaders',
    icon: '💎',
    difficulty: 'advanced',
    tags: ['shaders', 'glass', 'iridescent', 'refraction', 'specular'],
    description: 'Optical light dispersion through frosted glass with spectral rainbow caustic fringes.'
  }),
  createRoadmapComponent({
    id: 'matrix-rain-terminal',
    name: 'Matrix Rain Terminal',
    category: 'shaders',
    icon: '🟢',
    difficulty: 'intermediate',
    tags: ['shaders', 'matrix', 'terminal', 'cyberpunk', 'code'],
    description: 'Digital glyph streams falling vertically at staggered velocities with phosphorescent head pulses.'
  }),
  createRoadmapComponent({
    id: 'vortex-tunnel',
    name: 'Vortex Tunnel 3D',
    category: 'shaders',
    icon: '🌀',
    difficulty: 'advanced',
    tags: ['shaders', 'vortex', 'tunnel', 'impeller', 'depth'],
    description: 'Procedural spiral wormhole with rotating orbital rings and infinite focal depth illusion.'
  }),
  createRoadmapComponent({
    id: 'plasma-energy-field',
    name: 'Plasma Energy Field',
    category: 'shaders',
    icon: '⚡',
    difficulty: 'advanced',
    tags: ['shaders', 'plasma', 'energy', 'sine', 'aurora'],
    description: 'Multi-harmonic sine wave plasma synthesized entirely in GPU fragment shader registers at 120 FPS.'
  }),
  createRoadmapComponent({
    id: 'dissolve-burn-shader',
    name: 'Noise Dissolve Burn Shader',
    category: 'shaders',
    icon: '🔥',
    difficulty: 'advanced',
    tags: ['shaders', 'dissolve', 'burn', 'noise', 'perlin'],
    description: 'Simplex noise threshold mask with incandescent burning ember edges dissolving widget geometry.'
  }),
  createRoadmapComponent({
    id: 'caustics-water-reflection',
    name: 'Water Caustics Reflection',
    category: 'shaders',
    icon: '🌊',
    difficulty: 'advanced',
    tags: ['shaders', 'water', 'caustics', 'refraction', 'ocean'],
    description: 'Procedural Voronoi water mesh refracting ambient light beams beneath aquatic ripple surface.'
  }),
  createRoadmapComponent({
    id: 'heat-distortion-wave',
    name: 'Heat Distortion Wave',
    category: 'shaders',
    icon: '♨️',
    difficulty: 'intermediate',
    tags: ['shaders', 'heat', 'distortion', 'mirage', 'haze'],
    description: 'High-temperature atmospheric refraction displacing pixels vertically with turbulent phase offset.'
  }),
  createRoadmapComponent({
    id: 'neon-laser-wireframe',
    name: 'Neon Laser Wireframe',
    category: 'shaders',
    icon: '📐',
    difficulty: 'advanced',
    tags: ['shaders', 'wireframe', 'laser', 'neon', 'perspective'],
    description: 'Volumetric perspective grid bathed in ultraviolet laser light with glowing gridline pulses.'
  }),
  createRoadmapComponent({
    id: 'raymarched-black-hole',
    name: 'Gravitational Black Hole Lensing',
    category: 'shaders',
    icon: '🕳️',
    difficulty: 'advanced',
    tags: ['shaders', 'black-hole', 'raymarch', 'gravity', 'space'],
    description: 'General relativistic gravitational lensing bending background starlight around event horizon.'
  }),
  createRoadmapComponent({
    id: 'holographic-foil-iridescence',
    name: 'Holographic Foil Iridescence',
    category: 'shaders',
    icon: '💿',
    difficulty: 'advanced',
    tags: ['shaders', 'hologram', 'foil', 'iridescence', 'specular'],
    description: 'Micro-groove diffraction grating scattering incident light into rainbow spectral sheen.'
  }),
  createRoadmapComponent({
    id: 'vaporwave-retro-sun',
    name: 'Vaporwave Neon Horizon Sun',
    category: 'shaders',
    icon: '🌅',
    difficulty: 'intermediate',
    tags: ['shaders', 'vaporwave', 'sun', 'retro', 'synthwave'],
    description: 'Segmented horizontal blinds slicing through glowing synthwave sun on purple sky.'
  }),
  createRoadmapComponent({
    id: 'pixel-sorting-glitch',
    name: 'Luminance Pixel Sorting Glitch',
    category: 'shaders',
    icon: '📺',
    difficulty: 'advanced',
    tags: ['shaders', 'pixel-sorting', 'glitch', 'cyberpunk'],
    description: 'GPU fragment threshold sorting neighboring pixels by brightness into falling digital streaks.'
  }),
  createRoadmapComponent({
    id: 'glassmorphic-blur-refractor',
    name: 'Optical Glassmorphism Refractor',
    category: 'shaders',
    icon: '🪟',
    difficulty: 'advanced',
    tags: ['shaders', 'glassmorphism', 'blur', 'refraction'],
    description: 'Physical Snell law refraction distorting backdrop elements beneath beveled frosted glass.'
  }),
  createRoadmapComponent({
    id: 'liquid-mercury-blob',
    name: 'Liquid Mercury Viscosity',
    category: 'shaders',
    icon: '🪙',
    difficulty: 'advanced',
    tags: ['shaders', 'mercury', 'chrome', 'liquid', 'metal'],
    description: 'Viscous chrome metallic surface reflecting panoramic sky with high specular highlights.'
  }),
  createRoadmapComponent({
    id: 'frosted-ice-frosting',
    name: 'Crystalline Ice Frosting',
    category: 'shaders',
    icon: '❄️',
    difficulty: 'advanced',
    tags: ['shaders', 'ice', 'frost', 'crystal', 'winter'],
    description: 'Procedural dendrite crystal growth freezing across widget boundary with icy refraction.'
  }),
  createRoadmapComponent({
    id: 'cyberpunk-scanline-hud',
    name: 'Tactical HUD Scanline Shader',
    category: 'shaders',
    icon: '🥽',
    difficulty: 'intermediate',
    tags: ['shaders', 'hud', 'scanline', 'cyberpunk', 'military'],
    description: 'Green night-vision military viewfinder with digital telemetry overlay and noise grain.'
  }),
  createRoadmapComponent({
    id: 'voronoi-water-ripples',
    name: 'Voronoi Liquid Wave Pool',
    category: 'shaders',
    icon: '💧',
    difficulty: 'advanced',
    tags: ['shaders', 'water', 'voronoi', 'ripples', 'caustics'],
    description: 'Moving Voronoi distance fields creating sunlit underwater swimming pool caustics.'
  }),
  createRoadmapComponent({
    id: 'fire-ember-convection',
    name: 'Volumetric Fire & Ember Smoke',
    category: 'shaders',
    icon: '🔥',
    difficulty: 'advanced',
    tags: ['shaders', 'fire', 'flame', 'embers', 'particles'],
    description: 'Perlin noise turbulence driving incandescent flame tongues and glowing rising sparks.'
  }),
  createRoadmapComponent({
    id: 'aurora-spectral-bands',
    name: 'Spectral Aurora Ribbon Shader',
    category: 'shaders',
    icon: '🌌',
    difficulty: 'advanced',
    tags: ['shaders', 'aurora', 'spectral', 'ribbon', 'sky'],
    description: 'Harmonic sine curtains waving in upper ionosphere with green and purple gradients.'
  }),
  createRoadmapComponent({
    id: 'crt-color-aberration',
    name: 'CRT Barrel Distortion & RGB Aberration',
    category: 'shaders',
    icon: '📻',
    difficulty: 'intermediate',
    tags: ['shaders', 'crt', 'aberration', 'barrel', 'retro'],
    description: 'Convex glass tube curvature displacing red and blue color channels towards screen corners.'
  }),
  createRoadmapComponent({
    id: 'neon-contour-topography',
    name: 'Fluorescent Contour Topography',
    category: 'shaders',
    icon: '🗺️',
    difficulty: 'advanced',
    tags: ['shaders', 'contour', 'topography', 'neon', 'wireframe'],
    description: 'Equal-elevation contour isolines scrolling across undulating digital terrain.'
  }),
  createRoadmapComponent({
    id: 'speed-line-anime-burst',
    name: 'Anime Action Speed Lines',
    category: 'shaders',
    icon: '⚡',
    difficulty: 'intermediate',
    tags: ['shaders', 'speedlines', 'anime', 'manga', 'radial'],
    description: 'Intense high-velocity radial speed line streaks radiating outward from focal origin.'
  }),
  createRoadmapComponent({
    id: 'metallic-flow-sheen',
    name: 'Brushed Titanium Sheen',
    category: 'shaders',
    icon: '🛡️',
    difficulty: 'intermediate',
    tags: ['shaders', 'metallic', 'titanium', 'sheen', 'specular'],
    description: 'Anisotropic specular highlight beam sweeping across finely brushed gunmetal plate.'
  }),
  createRoadmapComponent({
    id: 'dither-halftone-dots',
    name: 'Retro Newspaper Halftone Dither',
    category: 'shaders',
    icon: '📰',
    difficulty: 'intermediate',
    tags: ['shaders', 'halftone', 'dither', 'retro', 'print'],
    description: 'Rotated CMYK dot rosette matrix modulating circle diameters to render tonal imagery.'
  })
];
