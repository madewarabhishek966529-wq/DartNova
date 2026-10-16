import { createRoadmapComponent } from '../visualizer.js';

export const roadmapNavigation = [
  createRoadmapComponent({
    id: 'animated-bottom-nav',
    name: 'Animated Bottom Navigation',
    category: 'navigation',
    icon: '📱',
    difficulty: 'intermediate',
    tags: ['navigation', 'bottom-bar', 'tabs', 'icons'],
    description: 'Bouncing icon transitions and sliding active indicator pill for mobile viewports.'
  }),
  createRoadmapComponent({
    id: 'floating-dock',
    name: 'Mac OS Floating Dock',
    category: 'navigation',
    icon: '💻',
    difficulty: 'advanced',
    tags: ['navigation', 'dock', 'magnification', 'macos'],
    description: 'Proximity magnification algorithm scaling neighboring icons via Gaussian distance curve.'
  }),
  createRoadmapComponent({
    id: 'expanding-menu',
    name: 'Expanding Speed Dial',
    category: 'navigation',
    icon: '✨',
    difficulty: 'intermediate',
    tags: ['navigation', 'fab', 'speed-dial', 'radial'],
    description: 'FAB expanding into a staggered fan of secondary action triggers with rotation.'
  }),
  createRoadmapComponent({
    id: 'radial-menu',
    name: 'Radial Menu',
    category: 'navigation',
    icon: '⭕',
    difficulty: 'advanced',
    tags: ['navigation', 'radial', 'circular', 'pie'],
    description: '360-degree circular menu bursting from center origin with angular item positioning.'
  }),
  createRoadmapComponent({
    id: 'morphing-hamburger',
    name: 'Morphing Hamburger Icon',
    category: 'navigation',
    icon: '🍔',
    difficulty: 'beginner',
    tags: ['navigation', 'hamburger', 'morph', 'icon'],
    description: 'Triple horizontal lines morphing cleanly into an X close mark using transform rotation.'
  }),
  createRoadmapComponent({
    id: 'animated-sidebar',
    name: 'Animated Sidebar Drawer',
    category: 'navigation',
    icon: '🗄️',
    difficulty: 'intermediate',
    tags: ['navigation', 'sidebar', 'drawer', 'slide'],
    description: 'Smooth sliding lateral navigation panel with spring damping and backdrop scrim.'
  }),
  createRoadmapComponent({
    id: 'pill-tab-switcher',
    name: 'Pill Tab Switcher',
    category: 'navigation',
    icon: '💊',
    difficulty: 'beginner',
    tags: ['navigation', 'pill', 'tabs', 'slider'],
    description: 'Sliding rounded pill background interpolating smoothly between category tabs.'
  }),
  createRoadmapComponent({
    id: 'breadcrumb-reveal',
    name: 'Breadcrumb Path Reveal',
    category: 'navigation',
    icon: '🍞',
    difficulty: 'beginner',
    tags: ['navigation', 'breadcrumb', 'path', 'hierarchy'],
    description: 'Cascading hierarchical breadcrumb items revealing with chevron separators.'
  }),
  createRoadmapComponent({
    id: 'elastic-bottom-bar',
    name: 'Elastic Curve Bottom Bar',
    category: 'navigation',
    icon: '📱',
    difficulty: 'advanced',
    tags: ['navigation', 'elastic', 'curve', 'bottom-bar'],
    description: 'SVG curve dipping dynamically towards active navigation icon with liquid fluid feel.'
  }),
  createRoadmapComponent({
    id: 'circular-speed-dial',
    name: 'Circular Speed Dial',
    category: 'navigation',
    icon: '🧭',
    difficulty: 'intermediate',
    tags: ['navigation', 'speed-dial', 'arc', 'fab'],
    description: 'Floating button distributing circular micro-action pills along a 180-degree top arc.'
  }),
  createRoadmapComponent({
    id: 'magic-indicator-nav',
    name: 'Magic Indicator Nav',
    category: 'navigation',
    icon: '🪄',
    difficulty: 'advanced',
    tags: ['navigation', 'magic', 'indicator', 'morph'],
    description: 'Liquid active indicator shape-shifting its width and position between uneven tab labels.'
  }),
  createRoadmapComponent({
    id: 'bubble-tab-nav',
    name: 'Bubble Pop Tab Nav',
    category: 'navigation',
    icon: '🫧',
    difficulty: 'intermediate',
    tags: ['navigation', 'bubble', 'pop', 'tab'],
    description: 'Translucent bubble expanding with spring bounce to envelop the currently active icon.'
  }),
  createRoadmapComponent({
    id: 'mega-menu-cascade',
    name: 'Mega Menu Cascade',
    category: 'navigation',
    icon: '🗃️',
    difficulty: 'advanced',
    tags: ['navigation', 'mega-menu', 'cascade', 'dropdown'],
    description: 'Multi-column architectural category dropdown panel cascading into view with blur.'
  }),
  createRoadmapComponent({
    id: 'bottom-sheet-nav',
    name: 'Bottom Sheet Navigation',
    category: 'navigation',
    icon: '📑',
    difficulty: 'intermediate',
    tags: ['navigation', 'bottom-sheet', 'swipeable', 'mobile'],
    description: 'Expandable swipeable bottom drawer hosting rich nested multi-tab sub-navigation.'
  }),
  createRoadmapComponent({
    id: 'carousel-indicator-nav',
    name: 'Snake Carousel Indicator',
    category: 'navigation',
    icon: '🚥',
    difficulty: 'beginner',
    tags: ['navigation', 'carousel', 'indicator', 'dots'],
    description: 'Stretching snake pill tracking carousel slide position with elastic length deformation.'
  }),
  createRoadmapComponent({
    id: 'drawer-morph-nav',
    name: '3D Perspective Drawer Nav',
    category: 'navigation',
    icon: '🚪',
    difficulty: 'advanced',
    tags: ['navigation', 'drawer', '3d', 'perspective'],
    description: 'Side navigation panel that rotates and scales main content canvas into 3D background plane.'
  }),
  createRoadmapComponent({
    id: 'floating-pill-dock',
    name: 'Floating Pill Dock',
    category: 'navigation',
    icon: '🚤',
    difficulty: 'intermediate',
    tags: ['navigation', 'dock', 'pill', 'floating'],
    description: 'Compact floating glass pill housing core action icons with subtle proximity glow.'
  }),
  createRoadmapComponent({
    id: 'segmented-control-nav',
    name: 'iOS Segmented Control',
    category: 'navigation',
    icon: '🎛️',
    difficulty: 'beginner',
    tags: ['navigation', 'segmented', 'ios', 'control'],
    description: 'Tactile dual-state segmented switch with sliding frosted thumb and crisp tactile click.'
  }),
  createRoadmapComponent({
    id: 'staggered-tree-nav',
    name: 'Staggered Tree Hierarchy',
    category: 'navigation',
    icon: '🌲',
    difficulty: 'intermediate',
    tags: ['navigation', 'tree', 'hierarchy', 'folders'],
    description: 'Collapsible folder file tree with animated branch indent lines and chevron rotation.'
  }),
  createRoadmapComponent({
    id: 'sticky-header-morph',
    name: 'Sticky Header Morph Bar',
    category: 'navigation',
    icon: '📌',
    difficulty: 'intermediate',
    tags: ['navigation', 'sticky', 'header', 'scroll'],
    description: 'Volumetric hero banner shrinking dynamically into a sleek compact glass navigation bar on scroll.'
  }),
  createRoadmapComponent({
    id: 'magnetic-menu-item',
    name: 'Magnetic Menu Links',
    category: 'navigation',
    icon: '🧲',
    difficulty: 'intermediate',
    tags: ['navigation', 'magnetic', 'cursor', 'links'],
    description: 'Navigation link typography and bullet nodes gently tugged towards nearby cursor coordinates.'
  }),
  createRoadmapComponent({
    id: 'corner-fab-menu',
    name: 'Corner Anchor Speed Menu',
    category: 'navigation',
    icon: '↘️',
    difficulty: 'intermediate',
    tags: ['navigation', 'corner', 'fan', 'fab'],
    description: 'Bottom-right corner anchor radiating out a quarter-circle quadrant of contextual shortcuts.'
  }),
  createRoadmapComponent({
    id: 'slide-indicator-tabs',
    name: 'Sliding Underline Tabs',
    category: 'navigation',
    icon: '📑',
    difficulty: 'beginner',
    tags: ['navigation', 'underline', 'tabs', 'slider'],
    description: 'Continuous horizontal neon line gliding effortlessly under the active tab title.'
  }),
  createRoadmapComponent({
    id: 'pie-menu-wheel',
    name: '8-Sector Pie Menu Wheel',
    category: 'navigation',
    icon: '🥧',
    difficulty: 'advanced',
    tags: ['navigation', 'pie', 'wheel', 'radial'],
    description: 'Circular radial dial dividing 360-degree space into 8 clickable pie slice commands.'
  })
];
