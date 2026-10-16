import { createRoadmapComponent } from '../visualizer.js';

export const roadmapOverlays = [
  createRoadmapComponent({
    id: 'spring-modal',
    name: 'Spring Modal Dialog',
    category: 'overlays',
    icon: '💬',
    difficulty: 'intermediate',
    tags: ['overlays', 'modal', 'dialog', 'spring'],
    description: 'Bouncy spring dialog with overshoot damping and blurred backdrop scrim.'
  }),
  createRoadmapComponent({
    id: 'bottom-sheet-slide',
    name: 'Bottom Sheet Slide',
    category: 'overlays',
    icon: '📑',
    difficulty: 'intermediate',
    tags: ['overlays', 'bottom-sheet', 'slide', 'drag'],
    description: 'Draggable bottom drawer with inertial snap points and modal barrier scrim.'
  }),
  createRoadmapComponent({
    id: 'expandable-bottom-sheet',
    name: 'Expandable Bottom Sheet',
    category: 'overlays',
    icon: '📂',
    difficulty: 'intermediate',
    tags: ['overlays', 'bottom-sheet', 'expand', 'dock'],
    description: 'Multi-stage bottom sheet expanding between peek height, half screen, and full viewport.'
  }),
  createRoadmapComponent({
    id: 'blur-backdrop-dialog',
    name: 'Blur Backdrop Dialog',
    category: 'overlays',
    icon: '🌫️',
    difficulty: 'beginner',
    tags: ['overlays', 'blur', 'dialog', 'glass'],
    description: 'High-contrast frosted glass dialog casting deep Gaussian blur across ambient background.'
  }),
  createRoadmapComponent({
    id: 'fullscreen-modal-reveal',
    name: 'Fullscreen Modal Reveal',
    category: 'overlays',
    icon: '🪟',
    difficulty: 'intermediate',
    tags: ['overlays', 'fullscreen', 'modal', 'reveal'],
    description: 'Full-bleed viewport takeover expanding outward from origin button coordinates.'
  }),
  createRoadmapComponent({
    id: 'toast-pop-in',
    name: 'Toast Notification Pop-In',
    category: 'overlays',
    icon: '🍞',
    difficulty: 'beginner',
    tags: ['overlays', 'toast', 'notification', 'pop'],
    description: 'Floating notification pill dropping in with elastic overshoot and auto-dismiss timer.'
  }),
  createRoadmapComponent({
    id: 'snackbar-slide',
    name: 'Snackbar Slide & Dismiss',
    category: 'overlays',
    icon: '🍫',
    difficulty: 'beginner',
    tags: ['overlays', 'snackbar', 'slide', 'dismiss'],
    description: 'Bottom status bar sliding upward with action button and swipe-to-dismiss gesture.'
  }),
  createRoadmapComponent({
    id: 'popover-morph',
    name: 'Popover Bubble Morph',
    category: 'overlays',
    icon: '🎈',
    difficulty: 'intermediate',
    tags: ['overlays', 'popover', 'bubble', 'morph'],
    description: 'Contextual popover anchoring to target with animated pointer triangle arrow.'
  }),
  createRoadmapComponent({
    id: 'notification-stack',
    name: 'Cascading Notification Stack',
    category: 'overlays',
    icon: '🗂️',
    difficulty: 'advanced',
    tags: ['overlays', 'notifications', 'stack', 'cards'],
    description: 'Layered notification deck with vertical offset and scale decay between queue items.'
  }),
  createRoadmapComponent({
    id: 'floating-action-sheet',
    name: 'Floating Action Sheet',
    category: 'overlays',
    icon: '📋',
    difficulty: 'intermediate',
    tags: ['overlays', 'action-sheet', 'ios', 'menu'],
    description: 'iOS style action sheet rising from lower boundary with rubber bounce damping.'
  }),
  createRoadmapComponent({
    id: 'spotlight-walkthrough',
    name: 'Spotlight Walkthrough Tour',
    category: 'overlays',
    icon: '🔦',
    difficulty: 'advanced',
    tags: ['overlays', 'spotlight', 'onboarding', 'tour'],
    description: 'Hole-punch circular spotlight cutting through dark scrim to guide user focus.'
  }),
  createRoadmapComponent({
    id: 'dropdown-bubble-menu',
    name: 'Dropdown Bubble Arrow Menu',
    category: 'overlays',
    icon: '💬',
    difficulty: 'beginner',
    tags: ['overlays', 'dropdown', 'bubble', 'anchor'],
    description: 'Speech bubble menu anchoring to button with smooth scale expansion from corner.'
  }),
  createRoadmapComponent({
    id: 'banner-alert-slide',
    name: 'Banner Alert Top Slide',
    category: 'overlays',
    icon: '📢',
    difficulty: 'beginner',
    tags: ['overlays', 'banner', 'alert', 'top'],
    description: 'Full-width urgent notification ribbon sliding down from top header edge.'
  }),
  createRoadmapComponent({
    id: 'magnetic-cursor-tooltip',
    name: 'Magnetic Cursor Tooltip',
    category: 'overlays',
    icon: '🏷️',
    difficulty: 'intermediate',
    tags: ['overlays', 'tooltip', 'cursor', 'magnetic'],
    description: 'Sleek black glass tooltip capsule tracking pointer with spring latency delay.'
  }),
  createRoadmapComponent({
    id: 'slide-panel-drawer',
    name: 'Slide-out Inspector Drawer',
    category: 'overlays',
    icon: '🗄️',
    difficulty: 'intermediate',
    tags: ['overlays', 'drawer', 'inspector', 'panel'],
    description: 'Right-side property inspector panel sliding in with shadow blur separation.'
  }),
  createRoadmapComponent({
    id: 'interactive-dialog-shake',
    name: 'Interactive Dialog Shake',
    category: 'overlays',
    icon: '📳',
    difficulty: 'beginner',
    tags: ['overlays', 'dialog', 'shake', 'error'],
    description: 'Modal window oscillating with rapid horizontal shake on validation error.'
  }),
  createRoadmapComponent({
    id: 'toast-stack-queue',
    name: 'Toast Stack Multi-Queue',
    category: 'overlays',
    icon: '🍞',
    difficulty: 'intermediate',
    tags: ['overlays', 'toast', 'queue', 'stack'],
    description: 'Sequential toasts stacking neatly on top of each other with auto-eviction.'
  }),
  createRoadmapComponent({
    id: 'radial-context-overlay',
    name: 'Radial Context Menu',
    category: 'overlays',
    icon: '⭕',
    difficulty: 'advanced',
    tags: ['overlays', 'radial', 'context', 'pie'],
    description: 'Circular radial options fan popping directly beneath right-click or long-press location.'
  }),
  createRoadmapComponent({
    id: 'blur-lightbox-gallery',
    name: 'Blur Lightbox Media View',
    category: 'overlays',
    icon: '🖼️',
    difficulty: 'intermediate',
    tags: ['overlays', 'lightbox', 'gallery', 'blur'],
    description: 'Media asset elevating to center viewport while backdrop blurs to darkness.'
  }),
  createRoadmapComponent({
    id: 'fab-speed-dial-overlay',
    name: 'Speed Dial Barrier Scrim',
    category: 'overlays',
    icon: '➕',
    difficulty: 'beginner',
    tags: ['overlays', 'scrim', 'speed-dial', 'barrier'],
    description: 'Translucent barrier dimming background while floating action sub-buttons deploy.'
  }),
  createRoadmapComponent({
    id: 'command-palette-modal',
    name: 'Command Palette Spotlight',
    category: 'overlays',
    icon: '⌨️',
    difficulty: 'advanced',
    tags: ['overlays', 'palette', 'spotlight', 'command'],
    description: 'Keyboard-first command search bar with instant autocomplete list and glass backdrop.'
  }),
  createRoadmapComponent({
    id: 'floating-pip-window',
    name: 'Picture-in-Picture Mini Overlay',
    category: 'overlays',
    icon: '📺',
    difficulty: 'intermediate',
    tags: ['overlays', 'pip', 'floating', 'video'],
    description: 'Draggable mini window docking smoothly to screen corners with magnetic attraction.'
  }),
  createRoadmapComponent({
    id: 'confetti-modal-burst',
    name: 'Confetti Modal Celebration',
    category: 'overlays',
    icon: '🎉',
    difficulty: 'intermediate',
    tags: ['overlays', 'confetti', 'celebration', 'modal'],
    description: 'Success confirmation dialog erupting with celebratory multi-color confetti.'
  }),
  createRoadmapComponent({
    id: 'peeking-drawer-tab',
    name: 'Peeking Drawer Edge Tab',
    category: 'overlays',
    icon: '📑',
    difficulty: 'beginner',
    tags: ['overlays', 'peeking', 'tab', 'drawer'],
    description: 'Miniature pill handle peeking from side of screen that unfolds into drawer.'
  }),
  createRoadmapComponent({
    id: 'bottom-snack-undo',
    name: 'Bottom Snack with Undo Ring',
    category: 'overlays',
    icon: '↩️',
    difficulty: 'intermediate',
    tags: ['overlays', 'snackbar', 'undo', 'timer'],
    description: 'Dismissible snackbar containing circular SVG progress timer for reversible actions.'
  })
];
