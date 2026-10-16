import { createRoadmapComponent } from '../visualizer.js';

export const roadmapTransitions = [
  createRoadmapComponent({
    id: 'fade-through-transition',
    name: 'Fade Through Transition',
    category: 'transitions',
    icon: '🔀',
    difficulty: 'beginner',
    tags: ['transitions', 'fade', 'route', 'material'],
    description: 'Material Design cross-fade where outgoing element scales down and fades out before incoming element appears.'
  }),
  createRoadmapComponent({
    id: 'shared-axis-transition',
    name: 'Shared Axis Transition',
    category: 'transitions',
    icon: '↔️',
    difficulty: 'intermediate',
    tags: ['transitions', 'shared-axis', 'slide', 'fade'],
    description: 'Coordinated translation along X, Y, or Z axis establishing spatial relationship between screens.'
  }),
  createRoadmapComponent({
    id: 'hero-image-transition',
    name: 'Hero Image Transition',
    category: 'transitions',
    icon: '🦸',
    difficulty: 'intermediate',
    tags: ['transitions', 'hero', 'morph', 'shared'],
    description: 'Seamless bounding box expansion flying an image thumbnail from grid into full-bleed header.'
  }),
  createRoadmapComponent({
    id: 'cube-transition-3d',
    name: '3D Cube Page Turn',
    category: 'transitions',
    icon: '🎲',
    difficulty: 'advanced',
    tags: ['transitions', 'cube', '3d', 'rotation'],
    description: 'Pages mapping onto adjacent faces of a 3D revolving cube rotating around Y-axis.'
  }),
  createRoadmapComponent({
    id: 'diagonal-wipe',
    name: 'Diagonal Wipe Transition',
    category: 'transitions',
    icon: '📐',
    difficulty: 'intermediate',
    tags: ['transitions', 'diagonal', 'wipe', 'mask'],
    description: 'Angled linear mask boundary wiping across the viewport to unveil next screen.'
  }),
  createRoadmapComponent({
    id: 'zoom-page-transition',
    name: 'Zoom Page Transition',
    category: 'transitions',
    icon: '🔍',
    difficulty: 'beginner',
    tags: ['transitions', 'zoom', 'scale', 'depth'],
    description: 'Deep focal camera zoom scaling outgoing route up into oblivion while destination scales up from center.'
  }),
  createRoadmapComponent({
    id: 'slide-fade-route',
    name: 'Slide and Fade Route',
    category: 'transitions',
    icon: '➡️',
    difficulty: 'beginner',
    tags: ['transitions', 'slide', 'fade', 'smooth'],
    description: 'Crisp horizontal slide offset synchronized with opacity ramp for fluid navigation.'
  }),
  createRoadmapComponent({
    id: 'morphing-container-transition',
    name: 'Morphing Container Transition',
    category: 'transitions',
    icon: '📦',
    difficulty: 'advanced',
    tags: ['transitions', 'morph', 'container', 'expand'],
    description: 'Compact card bounding box fluidly morphing into a full-screen modal scaffold.'
  }),
  createRoadmapComponent({
    id: 'liquid-page-transition',
    name: 'Liquid Page Transition',
    category: 'transitions',
    icon: '🌊',
    difficulty: 'advanced',
    tags: ['transitions', 'liquid', 'wave', 'cloth'],
    description: 'Organic viscous wave curve sweeping across viewport to reveal underlying page layer.'
  }),
  createRoadmapComponent({
    id: 'curtain-split-transition',
    name: 'Curtain Split Transition',
    category: 'transitions',
    icon: '🎭',
    difficulty: 'intermediate',
    tags: ['transitions', 'curtain', 'split', 'theatrical'],
    description: 'Center vertical seam parting laterally outward to reveal incoming route content.'
  }),
  createRoadmapComponent({
    id: 'iris-circle-transition',
    name: 'Iris Circle Transition',
    category: 'transitions',
    icon: '👁️',
    difficulty: 'intermediate',
    tags: ['transitions', 'iris', 'circle', 'aperture'],
    description: 'Camera lens aperture circle expanding radially outwards from click coordinate.'
  }),
  createRoadmapComponent({
    id: 'shutter-blind-transition',
    name: 'Shutter Blind Transition',
    category: 'transitions',
    icon: '🪟',
    difficulty: 'intermediate',
    tags: ['transitions', 'shutter', 'blinds', 'slats'],
    description: 'Horizontal Venetian blind slats rotating 180 degrees in unison to reveal next screen.'
  }),
  createRoadmapComponent({
    id: 'origami-fold-transition',
    name: 'Origami Fold Transition',
    category: 'transitions',
    icon: '🦢',
    difficulty: 'advanced',
    tags: ['transitions', 'origami', 'fold', '3d'],
    description: 'Geometric paper plane folding along 45-degree diagonal crease lines.'
  }),
  createRoadmapComponent({
    id: 'pixelate-dissolve-transition',
    name: 'Pixelate Dissolve Transition',
    category: 'transitions',
    icon: '👾',
    difficulty: 'advanced',
    tags: ['transitions', 'pixelate', 'dissolve', 'retro'],
    description: 'Screen resolving into coarse mosaic pixels before re-clustering into next layout.'
  }),
  createRoadmapComponent({
    id: 'circular-mask-wipe',
    name: 'Circular Mask Wipe',
    category: 'transitions',
    icon: '⭕',
    difficulty: 'beginner',
    tags: ['transitions', 'circular', 'mask', 'wipe'],
    description: 'Growing circular clip mask revealing destination page from focal action origin.'
  }),
  createRoadmapComponent({
    id: 'flip-page-book',
    name: 'Flip Page Book Turn',
    category: 'transitions',
    icon: '📖',
    difficulty: 'advanced',
    tags: ['transitions', 'book', 'page', 'curl'],
    description: 'Realistic book page turning with physical curl geometry and realistic spine shadow.'
  }),
  createRoadmapComponent({
    id: 'push-slide-parallax',
    name: 'Push Slide Parallax',
    category: 'transitions',
    icon: '↔️',
    difficulty: 'intermediate',
    tags: ['transitions', 'push', 'parallax', 'slide'],
    description: 'Incoming view pushes outgoing view offscreen with distinct speed multipliers for depth.'
  }),
  createRoadmapComponent({
    id: 'vertical-accordion-wipe',
    name: 'Vertical Accordion Wipe',
    category: 'transitions',
    icon: '🪜',
    difficulty: 'intermediate',
    tags: ['transitions', 'accordion', 'vertical', 'slats'],
    description: 'Vertical accordion compression collapsing current screen while expanding destination.'
  }),
  createRoadmapComponent({
    id: 'kaleidoscope-transition',
    name: 'Kaleidoscope Transition',
    category: 'transitions',
    icon: '🔮',
    difficulty: 'advanced',
    tags: ['transitions', 'kaleidoscope', 'mirror', 'symmetry'],
    description: 'Symmetrical mirrored facets rotating dynamically during screen transition.'
  }),
  createRoadmapComponent({
    id: 'burn-through-transition',
    name: 'Burn Through Transition',
    category: 'transitions',
    icon: '🔥',
    difficulty: 'advanced',
    tags: ['transitions', 'burn', 'ember', 'fire'],
    description: 'Incandescent embers eating away at screen surface to expose underlying route.'
  }),
  createRoadmapComponent({
    id: 'glitch-tear-transition',
    name: 'Glitch Tear Transition',
    category: 'transitions',
    icon: '⚡',
    difficulty: 'intermediate',
    tags: ['transitions', 'glitch', 'tear', 'cyber'],
    description: 'Horizontal screen tearing with transient RGB channel splitting.'
  }),
  createRoadmapComponent({
    id: 'vortex-spin-transition',
    name: 'Vortex Spin Transition',
    category: 'transitions',
    icon: '🌀',
    difficulty: 'advanced',
    tags: ['transitions', 'vortex', 'spin', 'whirlpool'],
    description: 'Centripetal whirlpool rotation sucking current view into focal point.'
  }),
  createRoadmapComponent({
    id: 'card-shuffle-transition',
    name: 'Card Shuffle Transition',
    category: 'transitions',
    icon: '🃏',
    difficulty: 'intermediate',
    tags: ['transitions', 'cards', 'shuffle', 'deck'],
    description: 'Routes behaving like cards in a deck sliding over each other with tilt.'
  }),
  createRoadmapComponent({
    id: 'elastic-scale-transition',
    name: 'Elastic Scale Transition',
    category: 'transitions',
    icon: '🎾',
    difficulty: 'beginner',
    tags: ['transitions', 'elastic', 'scale', 'spring'],
    description: 'Page pops into view with spring overshoot before damping to rest.'
  }),
  createRoadmapComponent({
    id: 'tunnel-dive-transition',
    name: 'Tunnel Dive Transition',
    category: 'transitions',
    icon: '🕳️',
    difficulty: 'advanced',
    tags: ['transitions', 'tunnel', 'dive', 'zoom'],
    description: 'Camera dives through infinite perspective tunnel straight into new route.'
  })
];
