import { createRoadmapComponent } from '../visualizer.js';

export const roadmapGestures = [
  createRoadmapComponent({
    id: 'rubber-band-drag',
    name: 'Rubber Band Drag',
    category: 'gestures',
    icon: '🧲',
    difficulty: 'intermediate',
    tags: ['gestures', 'drag', 'rubber-band', 'physics'],
    description: 'Logarithmic resistance damping dragging elements beyond viewport boundaries.'
  }),
  createRoadmapComponent({
    id: 'spring-drag-object',
    name: 'Spring-Physics Drag Object',
    category: 'gestures',
    icon: '🌀',
    difficulty: 'advanced',
    tags: ['gestures', 'spring', 'drag', 'friction'],
    description: 'Draggable element tethered to anchor with second-order spring dynamics.'
  }),
  createRoadmapComponent({
    id: 'swipe-carousel',
    name: 'Swipeable Carousel Deck',
    category: 'gestures',
    icon: '🎠',
    difficulty: 'intermediate',
    tags: ['gestures', 'carousel', 'swipe', 'cards'],
    description: 'Horizontal gesture carousel snapping to nearest card with velocity estimation.'
  }),
  createRoadmapComponent({
    id: 'pull-to-refresh',
    name: 'Elastic Pull-to-Refresh',
    category: 'gestures',
    icon: '🔄',
    difficulty: 'intermediate',
    tags: ['gestures', 'pull', 'refresh', 'elastic'],
    description: 'Elastic cord pulling downwards to reveal rotating progress indicator.'
  }),
  createRoadmapComponent({
    id: 'draggable-floating-widget',
    name: 'Draggable Floating Widget',
    category: 'gestures',
    icon: '🎈',
    difficulty: 'beginner',
    tags: ['gestures', 'floating', 'drag', 'dock'],
    description: 'Freeform draggable widget that snaps to nearest screen edge upon release.'
  }),
  createRoadmapComponent({
    id: 'inertial-scrolling',
    name: 'Inertial Momentum Scroll',
    category: 'gestures',
    icon: '🛹',
    difficulty: 'advanced',
    tags: ['gestures', 'scroll', 'momentum', 'inertia'],
    description: 'Smooth kinetic list scrolling with natural exponential friction decay.'
  }),
  createRoadmapComponent({
    id: 'elastic-overscroll',
    name: 'Elastic Overscroll Glow',
    category: 'gestures',
    icon: '🪀',
    difficulty: 'beginner',
    tags: ['gestures', 'overscroll', 'elastic', 'stretch'],
    description: 'Container stretching vertically when dragged past scroll limit with rubber bounce.'
  }),
  createRoadmapComponent({
    id: 'swipe-reveal-actions',
    name: 'Swipe-to-Reveal Actions',
    category: 'gestures',
    icon: '↔️',
    difficulty: 'intermediate',
    tags: ['gestures', 'swipe', 'actions', 'list'],
    description: 'List row swiping left or right to expose actionable delete and archive buttons.'
  }),
  createRoadmapComponent({
    id: 'gesture-driven-reveal',
    name: 'Gesture-Driven Reveal',
    category: 'gestures',
    icon: '👆',
    difficulty: 'intermediate',
    tags: ['gestures', 'pan', 'reveal', 'curtain'],
    description: 'Dragging curtain layer horizontally to interactively scrub between dual views.'
  }),
  createRoadmapComponent({
    id: 'pinch-to-zoom-target',
    name: 'Pinch to Zoom Target',
    category: 'gestures',
    icon: '🤏',
    difficulty: 'intermediate',
    tags: ['gestures', 'pinch', 'zoom', 'multitouch'],
    description: 'Two-finger multitouch gesture scaling image with clamped boundary bounds.'
  }),
  createRoadmapComponent({
    id: 'pan-tilt-surface',
    name: 'Pan Tilt 3D Surface',
    category: 'gestures',
    icon: '🎛️',
    difficulty: 'advanced',
    tags: ['gestures', 'pan', 'tilt', '3d'],
    description: 'Touch pan vector tilting card on 3D X/Y axes proportional to finger displacement.'
  }),
  createRoadmapComponent({
    id: 'flick-dismiss-card',
    name: 'Flick Dismiss Velocity Card',
    category: 'gestures',
    icon: '🤾',
    difficulty: 'intermediate',
    tags: ['gestures', 'flick', 'dismiss', 'velocity'],
    description: 'High-speed flick gesture ejecting card off screen with angular spin.'
  }),
  createRoadmapComponent({
    id: 'gyroscope-parallax',
    name: 'Gyroscope Tilt Parallax',
    category: 'gestures',
    icon: '📱',
    difficulty: 'advanced',
    tags: ['gestures', 'gyro', 'parallax', 'sensor'],
    description: 'Layers shifting depth parallax in response to device orientation angles.'
  }),
  createRoadmapComponent({
    id: 'long-press-radial-fill',
    name: 'Long Press Radial Fill',
    category: 'gestures',
    icon: '⏱️',
    difficulty: 'beginner',
    tags: ['gestures', 'long-press', 'radial', 'progress'],
    description: 'Concentric circular progress ring filling beneath finger until confirmation threshold.'
  }),
  createRoadmapComponent({
    id: 'double-tap-heart-burst',
    name: 'Double Tap Heart Burst',
    category: 'gestures',
    icon: '❤️',
    difficulty: 'beginner',
    tags: ['gestures', 'double-tap', 'heart', 'instagram'],
    description: 'Pulsing heart graphic popping up and fading on quick double tap.'
  }),
  createRoadmapComponent({
    id: 'drag-to-reorder-grid',
    name: 'Drag-to-Reorder Grid',
    category: 'gestures',
    icon: '🧱',
    difficulty: 'advanced',
    tags: ['gestures', 'reorder', 'grid', 'drag'],
    description: 'Grid item lifting up with elevated shadow and shifting adjacent tiles on hover.'
  }),
  createRoadmapComponent({
    id: 'radial-swipe-stepper',
    name: 'Radial Swipe Stepper',
    category: 'gestures',
    icon: '🔄',
    difficulty: 'intermediate',
    tags: ['gestures', 'radial', 'swipe', 'counter'],
    description: 'Dragging clockwise or counter-clockwise around circle to increment values.'
  }),
  createRoadmapComponent({
    id: 'stretch-pull-canvas',
    name: 'Stretch Pull Rubber Canvas',
    category: 'gestures',
    icon: '🏹',
    difficulty: 'advanced',
    tags: ['gestures', 'stretch', 'rubber', 'canvas'],
    description: 'Elastic mesh membrane deforming under touch like physical rubber fabric.'
  }),
  createRoadmapComponent({
    id: 'throw-and-catch-puck',
    name: 'Air Hockey Puck Physics',
    category: 'gestures',
    icon: '🏒',
    difficulty: 'advanced',
    tags: ['gestures', 'puck', 'bounce', 'friction'],
    description: 'Draggable circular puck launched with finger flick bouncing off container walls.'
  }),
  createRoadmapComponent({
    id: 'two-finger-rotate',
    name: 'Two Finger Multitouch Rotate',
    category: 'gestures',
    icon: '✌️',
    difficulty: 'intermediate',
    tags: ['gestures', 'rotate', 'multitouch', 'twist'],
    description: 'Rotating element continuously around Z-axis matching two-finger angle.'
  }),
  createRoadmapComponent({
    id: 'swipe-to-complete-slider',
    name: 'Swipe to Complete Slider',
    category: 'gestures',
    icon: '🏁',
    difficulty: 'intermediate',
    tags: ['gestures', 'slider', 'slide-to-unlock', 'confirm'],
    description: 'Thumb slider dragging horizontally across track to unlock action with haptic snap.'
  }),
  createRoadmapComponent({
    id: 'edge-swipe-back',
    name: 'Edge Swipe Back Navigation',
    category: 'gestures',
    icon: '⬅️',
    difficulty: 'intermediate',
    tags: ['gestures', 'edge-swipe', 'ios', 'back'],
    description: 'Swiping from left viewport bezel to reveal previous route underneath.'
  }),
  createRoadmapComponent({
    id: 'hold-to-confirm-button',
    name: 'Hold to Confirm Button',
    category: 'gestures',
    icon: '🛑',
    difficulty: 'beginner',
    tags: ['gestures', 'hold', 'confirm', 'progress'],
    description: 'Button filling with liquid progress over 1.5 seconds to prevent accidental actions.'
  }),
  createRoadmapComponent({
    id: 'joystick-controller',
    name: 'Virtual 2D Thumbstick',
    category: 'gestures',
    icon: '🕹️',
    difficulty: 'advanced',
    tags: ['gestures', 'joystick', 'thumbstick', 'gamepad'],
    description: 'Floating directional joystick returning to center with spring dampening.'
  }),
  createRoadmapComponent({
    id: 'swipe-to-favorite-dock',
    name: 'Swipe-to-Favorite Toss',
    category: 'gestures',
    icon: '⭐',
    difficulty: 'intermediate',
    tags: ['gestures', 'toss', 'favorite', 'dock'],
    description: 'Dragging card upward to deposit it into top favorites tray with star burst.'
  })
];
