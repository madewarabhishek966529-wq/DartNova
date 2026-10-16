import { createRoadmapComponent } from '../visualizer.js';

export const roadmapCards = [
  createRoadmapComponent({
    id: 'cursor-follow-card',
    name: 'Cursor-Follow Card',
    category: 'cards',
    icon: '🎯',
    difficulty: 'intermediate',
    tags: ['cards', 'cursor', 'follow', 'spotlight'],
    description: 'Dynamic illumination spotlight that follows cursor coordinates with soft radial diffusion.'
  }),
  createRoadmapComponent({
    id: 'glassmorphism-card',
    name: 'Glassmorphism Card',
    category: 'cards',
    icon: '🪟',
    difficulty: 'intermediate',
    tags: ['cards', 'glass', 'blur', 'frosted'],
    description: 'Frosted acrylic surface utilizing BackdropFilter blur and specular border highlighting.'
  }),
  createRoadmapComponent({
    id: 'holographic-card',
    name: 'Holographic Card',
    category: 'cards',
    icon: '💿',
    difficulty: 'advanced',
    tags: ['cards', 'hologram', 'rainbow', 'foil'],
    description: 'Iridescent holographic foil with shifting rainbow color gradients responsive to pointer angle.'
  }),
  createRoadmapComponent({
    id: 'spotlight-card',
    name: 'Spotlight Card',
    category: 'cards',
    icon: '🔦',
    difficulty: 'intermediate',
    tags: ['cards', 'spotlight', 'radial', 'hover'],
    description: 'Subtle high-contrast spotlight revealing hidden micro-details and textures under cursor.'
  }),
  createRoadmapComponent({
    id: 'floating-card',
    name: 'Floating Elevation Card',
    category: 'cards',
    icon: '☁️',
    difficulty: 'beginner',
    tags: ['cards', 'float', 'elevation', 'shadow'],
    description: 'Gentle vertical levitation animation paired with dynamic soft shadow expansion.'
  }),
  createRoadmapComponent({
    id: 'flip-profile-card',
    name: 'Flip Profile Card',
    category: 'cards',
    icon: '🔄',
    difficulty: 'intermediate',
    tags: ['cards', 'flip', '3d', 'profile'],
    description: 'Full 180-degree 3D flip card alternating between profile avatar and detailed specifications.'
  }),
  createRoadmapComponent({
    id: 'expandable-card',
    name: 'Expandable Card',
    category: 'cards',
    icon: '📐',
    difficulty: 'intermediate',
    tags: ['cards', 'expand', 'accordion', 'size'],
    description: 'Smooth height and width interpolation unlocking secondary controls and deep content.'
  }),
  createRoadmapComponent({
    id: 'isometric-layer-card',
    name: 'Isometric Layer Card',
    category: 'cards',
    icon: '📐',
    difficulty: 'advanced',
    tags: ['cards', 'isometric', 'layers', 'depth'],
    description: 'Card body splits into 3 floating isometric planes with staggered vertical separation on hover.'
  }),
  createRoadmapComponent({
    id: 'frosted-glass-card',
    name: 'Frosted Glass Card',
    category: 'cards',
    icon: '❄️',
    difficulty: 'intermediate',
    tags: ['cards', 'frosted', 'acrylic', 'blur'],
    description: 'Deep Gaussian backdrop refraction coupled with dynamic translucent border luminance.'
  }),
  createRoadmapComponent({
    id: 'glitch-reveal-card',
    name: 'Glitch Reveal Card',
    category: 'cards',
    icon: '⚡',
    difficulty: 'advanced',
    tags: ['cards', 'glitch', 'cyberpunk', 'scanline'],
    description: 'Cybernetic card with momentary horizontal scanline slices revealing hidden metadata.'
  }),
  createRoadmapComponent({
    id: 'depth-perspective-card',
    name: 'Depth Perspective Card',
    category: 'cards',
    icon: '🪟',
    difficulty: 'intermediate',
    tags: ['cards', 'perspective', 'matrix4', 'tilt'],
    description: 'Matrix4 3D transform applying pitch and roll rotation proportional to pointer position.'
  }),
  createRoadmapComponent({
    id: 'accordion-fold-card',
    name: 'Accordion Fold Card',
    category: 'cards',
    icon: '🪗',
    difficulty: 'intermediate',
    tags: ['cards', 'accordion', 'fold', 'vertical'],
    description: 'Multi-tiered vertical card that unfolds its lower compartments like an accordion bellows.'
  }),
  createRoadmapComponent({
    id: 'mesh-gradient-card',
    name: 'Mesh Gradient Card',
    category: 'cards',
    icon: '🎨',
    difficulty: 'intermediate',
    tags: ['cards', 'gradient', 'mesh', 'colors'],
    description: 'Multi-point organic mesh gradient flowing smoothly underneath translucent card typography.'
  }),
  createRoadmapComponent({
    id: 'swipeable-stack-card',
    name: 'Swipeable Stack Card',
    category: 'cards',
    icon: '🗂️',
    difficulty: 'intermediate',
    tags: ['cards', 'swipe', 'stack', 'toss'],
    description: 'Interactive card deck where the topmost card can be dragged, rotated, and dismissed.'
  }),
  createRoadmapComponent({
    id: 'neon-outline-card',
    name: 'Neon Outline Card',
    category: 'cards',
    icon: '💡',
    difficulty: 'beginner',
    tags: ['cards', 'neon', 'glow', 'border'],
    description: 'Electroluminescent neon glow pulse wrapping the outer boundary of dark glass surface.'
  }),
  createRoadmapComponent({
    id: 'shimmer-sheen-card',
    name: 'Shimmer Sheen Card',
    category: 'cards',
    icon: '🌟',
    difficulty: 'beginner',
    tags: ['cards', 'shimmer', 'sheen', 'specular'],
    description: 'High-speed diagonal specular light beam gliding continuously across glossy card face.'
  }),
  createRoadmapComponent({
    id: 'magnifier-zoom-card',
    name: 'Magnifier Zoom Card',
    category: 'cards',
    icon: '🔍',
    difficulty: 'advanced',
    tags: ['cards', 'magnifier', 'zoom', 'lens'],
    description: 'Virtual optical loupe magnifying card typography and graphics under cursor locus.'
  }),
  createRoadmapComponent({
    id: 'parchment-peel-card',
    name: 'Parchment Peel Card',
    category: 'cards',
    icon: '📜',
    difficulty: 'intermediate',
    tags: ['cards', 'peel', 'curl', 'paper'],
    description: 'Corner curling animation with simulated paper drop shadow revealing underside info.'
  }),
  createRoadmapComponent({
    id: 'kinetic-tilt-card',
    name: 'Kinetic Tilt Card',
    category: 'cards',
    icon: '🛹',
    difficulty: 'intermediate',
    tags: ['cards', 'kinetic', 'inertia', 'spring'],
    description: 'Inertial spring physics card with heavy mass damping settling gently after drag releases.'
  }),
  createRoadmapComponent({
    id: 'border-trail-card',
    name: 'Border Trail Card',
    category: 'cards',
    icon: '🏃',
    difficulty: 'intermediate',
    tags: ['cards', 'comet', 'trail', 'laser'],
    description: 'Blazing neon light particle tracing the rounded rectangle perimeter in infinite loop.'
  }),
  createRoadmapComponent({
    id: 'reveal-drawer-card',
    name: 'Reveal Drawer Card',
    category: 'cards',
    icon: '🗄️',
    difficulty: 'intermediate',
    tags: ['cards', 'drawer', 'reveal', 'slide'],
    description: 'Hidden lower utility tray that glides downward smoothly upon cursor engagement.'
  }),
  createRoadmapComponent({
    id: 'cuboid-flip-card',
    name: 'Cuboid Flip Card',
    category: 'cards',
    icon: '🎲',
    difficulty: 'advanced',
    tags: ['cards', 'cuboid', '3d', 'roll'],
    description: '3D cuboid block rolling 90 degrees around Y-axis to expose alternative data facet.'
  }),
  createRoadmapComponent({
    id: 'liquid-portal-card',
    name: 'Liquid Portal Card',
    category: 'cards',
    icon: '🌀',
    difficulty: 'advanced',
    tags: ['cards', 'portal', 'liquid', 'vortex'],
    description: 'Swirling circular chromatic liquid vortex expanding inside the center of card body.'
  })
];
