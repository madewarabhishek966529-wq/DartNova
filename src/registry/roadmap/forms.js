import { createRoadmapComponent } from '../visualizer.js';

export const roadmapForms = [
  createRoadmapComponent({
    id: 'floating-label-input',
    name: 'Floating Label Text Field',
    category: 'forms',
    icon: '📝',
    difficulty: 'beginner',
    tags: ['forms', 'input', 'label', 'floating'],
    description: 'Material text field where placeholder ascends into a compact floating top label upon focus.'
  }),
  createRoadmapComponent({
    id: 'animated-focus-border',
    name: 'Animated Focus Border',
    category: 'forms',
    icon: '⚡',
    difficulty: 'intermediate',
    tags: ['forms', 'border', 'beam', 'focus'],
    description: 'Neon gradient border beam travelling along text input perimeter upon active focus.'
  }),
  createRoadmapComponent({
    id: 'success-checkmark',
    name: 'Animated Success Checkmark',
    category: 'forms',
    icon: '✅',
    difficulty: 'beginner',
    tags: ['forms', 'checkmark', 'success', 'svg'],
    description: 'Circular completion ring popping with an elastic spring-drawn checkmark stroke.'
  }),
  createRoadmapComponent({
    id: 'error-shake-input',
    name: 'Error Shake Feedback',
    category: 'forms',
    icon: '📳',
    difficulty: 'beginner',
    tags: ['forms', 'shake', 'error', 'validation'],
    description: 'Horizontal oscillation shake simulating physical rejection on invalid input validation.'
  }),
  createRoadmapComponent({
    id: 'password-strength-meter',
    name: 'Password Strength Indicator',
    category: 'forms',
    icon: '🔒',
    difficulty: 'intermediate',
    tags: ['forms', 'password', 'strength', 'progress'],
    description: 'Dynamic segmented color bar interpolating smoothly between red, amber, and green.'
  }),
  createRoadmapComponent({
    id: 'otp-input-animation',
    name: '6-Digit OTP Verification Box',
    category: 'forms',
    icon: '🔢',
    difficulty: 'intermediate',
    tags: ['forms', 'otp', 'verification', 'code'],
    description: 'Segmented individual PIN digit boxes with active blinking caret and auto-focus jump.'
  }),
  createRoadmapComponent({
    id: 'checkbox-draw-animation',
    name: 'Animated Checkbox Draw',
    category: 'forms',
    icon: '☑️',
    difficulty: 'beginner',
    tags: ['forms', 'checkbox', 'draw', 'svg'],
    description: 'Bespoke SVG check path drawing its stroke with elastic box scale on selection.'
  }),
  createRoadmapComponent({
    id: 'radio-ripple',
    name: 'Radio Button Ripple Wave',
    category: 'forms',
    icon: '🔘',
    difficulty: 'beginner',
    tags: ['forms', 'radio', 'ripple', 'select'],
    description: 'Concentric liquid ripple shockwave expanding outward when option is chosen.'
  }),
  createRoadmapComponent({
    id: 'toggle-morph',
    name: 'Morphing Switch Toggle',
    category: 'forms',
    icon: '🎚️',
    difficulty: 'beginner',
    tags: ['forms', 'switch', 'toggle', 'morph'],
    description: 'Smooth sliding thumb pill elongating during drag and snapping to state boundary.'
  }),
  createRoadmapComponent({
    id: 'form-step-transition',
    name: 'Multi-Step Form Wizard',
    category: 'forms',
    icon: '🪜',
    difficulty: 'intermediate',
    tags: ['forms', 'wizard', 'steps', 'carousel'],
    description: 'Horizontal slide transitions between form step sections with coordinated progress bar.'
  }),
  createRoadmapComponent({
    id: 'credit-card-input-morph',
    name: 'Interactive 3D Credit Card',
    category: 'forms',
    icon: '💳',
    difficulty: 'advanced',
    tags: ['forms', 'credit-card', 'payment', '3d'],
    description: 'Virtual credit card mirroring typed card number and flipping 180 degrees for CVV.'
  }),
  createRoadmapComponent({
    id: 'slider-tooltip-bubble',
    name: 'Floating Value Slider Bubble',
    category: 'forms',
    icon: '🎚️',
    difficulty: 'intermediate',
    tags: ['forms', 'slider', 'tooltip', 'bubble'],
    description: 'Interactive track thumb accompanied by a floating speech bubble displaying exact value.'
  }),
  createRoadmapComponent({
    id: 'multi-select-chip-cloud',
    name: 'Multi-Select Tag Cloud',
    category: 'forms',
    icon: '🏷️',
    difficulty: 'beginner',
    tags: ['forms', 'chips', 'tags', 'multi-select'],
    description: 'Selectable pill badges popping with scale spring when toggled active.'
  }),
  createRoadmapComponent({
    id: 'file-upload-drag-drop',
    name: 'Drag & Drop Upload Zone',
    category: 'forms',
    icon: '📤',
    difficulty: 'intermediate',
    tags: ['forms', 'upload', 'drag-drop', 'files'],
    description: 'Pulsing dashed perimeter highlighting file drop readiness with progress bar.'
  }),
  createRoadmapComponent({
    id: 'segmented-switch-pill',
    name: 'Sliding Segmented Form Pill',
    category: 'forms',
    icon: '💊',
    difficulty: 'beginner',
    tags: ['forms', 'segmented', 'pill', 'switch'],
    description: 'Sliding glass capsule selecting between form input modes with tactile click.'
  }),
  createRoadmapComponent({
    id: 'rating-star-burst',
    name: '5-Star Rating Burst',
    category: 'forms',
    icon: '⭐',
    difficulty: 'beginner',
    tags: ['forms', 'rating', 'stars', 'burst'],
    description: 'Five interactive stars bouncing sequentially with golden particle explosions.'
  }),
  createRoadmapComponent({
    id: 'inline-validation-badge',
    name: 'Inline Validation Shield',
    category: 'forms',
    icon: '🛡️',
    difficulty: 'beginner',
    tags: ['forms', 'validation', 'badge', 'status'],
    description: 'Dynamic icon badge transitioning between spinner, checkmark, and alert triangle.'
  }),
  createRoadmapComponent({
    id: 'dynamic-tag-input',
    name: 'Dynamic Keyword Tag Input',
    category: 'forms',
    icon: '🔖',
    difficulty: 'intermediate',
    tags: ['forms', 'tag', 'keyword', 'chips'],
    description: 'Typing keywords that wrap into colorful removable tag pills on Enter key.'
  }),
  createRoadmapComponent({
    id: 'password-reveal-eye',
    name: 'Password Reveal Eye Morph',
    category: 'forms',
    icon: '👁️',
    difficulty: 'beginner',
    tags: ['forms', 'eye', 'password', 'reveal'],
    description: 'Vector eye opening its pupil and crossing out with animated slash line.'
  }),
  createRoadmapComponent({
    id: 'color-picker-wheel',
    name: 'Chromatic Color Picker Wheel',
    category: 'forms',
    icon: '🎨',
    difficulty: 'advanced',
    tags: ['forms', 'color', 'picker', 'wheel'],
    description: 'Circular rainbow wheel with floating loupe thumb extracting exact hex color.'
  }),
  createRoadmapComponent({
    id: 'stepper-counter-button',
    name: 'Numeric Stepper Slide',
    category: 'forms',
    icon: '🔢',
    difficulty: 'beginner',
    tags: ['forms', 'stepper', 'counter', 'plus-minus'],
    description: 'Plus and minus buttons with numbers sliding vertically on value changes.'
  }),
  createRoadmapComponent({
    id: 'address-autocomplete-pill',
    name: 'Address Autocomplete Drop',
    category: 'forms',
    icon: '📍',
    difficulty: 'intermediate',
    tags: ['forms', 'autocomplete', 'address', 'pin'],
    description: 'Location search field dropping animated pin marker and sliding address list.'
  }),
  createRoadmapComponent({
    id: 'character-countdown-ring',
    name: 'Character Countdown Ring',
    category: 'forms',
    icon: '⭕',
    difficulty: 'beginner',
    tags: ['forms', 'countdown', 'counter', 'characters'],
    description: 'Miniature circular progress indicator depleting as text length approaches limit.'
  }),
  createRoadmapComponent({
    id: 'signature-pad-draw',
    name: 'Vector Signature Pad',
    category: 'forms',
    icon: '✍️',
    difficulty: 'advanced',
    tags: ['forms', 'signature', 'draw', 'canvas'],
    description: 'Smooth digital ink signature canvas with velocity-sensitive stroke thickness.'
  }),
  createRoadmapComponent({
    id: 'toggle-switch-emoji',
    name: 'Day/Night Emoji Switch',
    category: 'forms',
    icon: '☀️',
    difficulty: 'beginner',
    tags: ['forms', 'theme', 'switch', 'day-night'],
    description: 'Switch track morphing daytime smiling sun into sleeping crescent night moon.'
  }),
  createRoadmapComponent({
    id: 'submit-progress-button',
    name: 'Submit Progress Transformation',
    category: 'forms',
    icon: '🔄',
    difficulty: 'intermediate',
    tags: ['forms', 'submit', 'progress', 'button'],
    description: 'Wide button collapsing into spinner circle and finishing as checkmark.'
  })
];
