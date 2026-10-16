import { createRoadmapComponent } from '../visualizer.js';

export const roadmapMedia = [
  createRoadmapComponent({
    id: 'image-zoom-reveal',
    name: 'Zoom Image Reveal',
    category: 'media',
    icon: '🔍',
    difficulty: 'beginner',
    tags: ['media', 'image', 'zoom', 'scale'],
    description: 'Image scale interpolation with smooth ease-out and container clipping.'
  }),
  createRoadmapComponent({
    id: 'ken-burns-image',
    name: 'Ken Burns Pan & Zoom',
    category: 'media',
    icon: '🎥',
    difficulty: 'intermediate',
    tags: ['media', 'ken-burns', 'pan', 'cinematic'],
    description: 'Slow documentary-style panning and zooming across photography.'
  }),
  createRoadmapComponent({
    id: 'image-comparison-slider',
    name: 'Before/After Comparison Slider',
    category: 'media',
    icon: '↔️',
    difficulty: 'intermediate',
    tags: ['media', 'slider', 'comparison', 'split'],
    description: 'Interactive draggable vertical divider scrubbing between two images.'
  }),
  createRoadmapComponent({
    id: 'diagonal-image-reveal',
    name: 'Diagonal Image Reveal',
    category: 'media',
    icon: '📐',
    difficulty: 'intermediate',
    tags: ['media', 'diagonal', 'wipe', 'mask'],
    description: 'Angular diagonal mask curtain sweeping across photographic frame.'
  }),
  createRoadmapComponent({
    id: 'image-blur-to-sharp',
    name: 'Progressive Blur-to-Sharp',
    category: 'media',
    icon: '👓',
    difficulty: 'beginner',
    tags: ['media', 'blur', 'sharp', 'progressive'],
    description: 'Defocused thumbnail resolving into high-definition clarity.'
  }),
  createRoadmapComponent({
    id: 'image-mask-transition',
    name: 'Shape Mask Transition',
    category: 'media',
    icon: '🎭',
    difficulty: 'advanced',
    tags: ['media', 'mask', 'svg', 'clip'],
    description: 'Dynamic SVG path morphing shape mask constraining media viewport.'
  }),
  createRoadmapComponent({
    id: 'circular-image-reveal',
    name: 'Circular Aperture Reveal',
    category: 'media',
    icon: '⭕',
    difficulty: 'beginner',
    tags: ['media', 'circular', 'reveal', 'aperture'],
    description: 'Expanding circle clipping path originating from image center.'
  }),
  createRoadmapComponent({
    id: 'masonry-grid-entrance',
    name: 'Staggered Masonry Cascade',
    category: 'media',
    icon: '🧱',
    difficulty: 'intermediate',
    tags: ['media', 'masonry', 'grid', 'stagger'],
    description: 'Heterogeneous image tiles cascading into place with staggered delays.'
  }),
  createRoadmapComponent({
    id: 'video-thumbnail-hover',
    name: 'Video Thumbnail Scrub',
    category: 'media',
    icon: '🎬',
    difficulty: 'intermediate',
    tags: ['media', 'video', 'thumbnail', 'hover'],
    description: 'Hover playback preview simulating animated GIF/video scrubbing.'
  }),
  createRoadmapComponent({
    id: 'glitch-photo-distort',
    name: 'Glitch Photo Distortion',
    category: 'media',
    icon: '📷',
    difficulty: 'advanced',
    tags: ['media', 'glitch', 'photo', 'rgb'],
    description: 'Editorial photograph with momentary chromatic distortion and slice shifts.'
  }),
  createRoadmapComponent({
    id: 'lens-flare-panorama',
    name: 'Lens Flare Cinematic Pan',
    category: 'media',
    icon: '🌅',
    difficulty: 'intermediate',
    tags: ['media', 'pan', 'lens-flare', 'cinematic'],
    description: 'Horizontal panoramic image pan featuring an anamorphic lens flare streak.'
  }),
  createRoadmapComponent({
    id: 'polaroid-scatter-desk',
    name: 'Polaroid Scatter Desk',
    category: 'media',
    icon: '📸',
    difficulty: 'intermediate',
    tags: ['media', 'polaroid', 'scatter', 'photo'],
    description: 'Instant film snapshots dropping onto desk with random rotation angles.'
  }),
  createRoadmapComponent({
    id: 'film-strip-reel',
    name: '35mm Film Strip Reel',
    category: 'media',
    icon: '🎞️',
    difficulty: 'intermediate',
    tags: ['media', 'film', 'reel', 'cinema'],
    description: 'Celluloid 35mm film strip with sprocket holes sliding smoothly on drag.'
  }),
  createRoadmapComponent({
    id: 'duotone-color-shift',
    name: 'Duotone Palette Shift',
    category: 'media',
    icon: '🎨',
    difficulty: 'beginner',
    tags: ['media', 'duotone', 'colors', 'filter'],
    description: 'Media asset transitioning between complementary duotone color grades.'
  }),
  createRoadmapComponent({
    id: 'hover-silhouette-reveal',
    name: 'Silhouette to Color Reveal',
    category: 'media',
    icon: '👤',
    difficulty: 'beginner',
    tags: ['media', 'silhouette', 'hover', 'portrait'],
    description: 'Mysterious dark silhouette bursting into full vivid color on cursor hover.'
  }),
  createRoadmapComponent({
    id: 'spotlight-magnifier-lens',
    name: 'Detail Magnifier Loupe',
    category: 'media',
    icon: '🔍',
    difficulty: 'advanced',
    tags: ['media', 'magnifier', 'loupe', 'zoom'],
    description: 'Circular magnifying loupe revealing high-resolution zoomed detail under mouse.'
  }),
  createRoadmapComponent({
    id: 'card-stack-gallery',
    name: 'Card Stack Media Deck',
    category: 'media',
    icon: '🗂️',
    difficulty: 'intermediate',
    tags: ['media', 'stack', 'gallery', 'deck'],
    description: 'Tinder-style photographic stack shuffling front card to back on swipe.'
  }),
  createRoadmapComponent({
    id: 'split-image-curtain',
    name: 'Split Vertical Slats Image',
    category: 'media',
    icon: '🪟',
    difficulty: 'intermediate',
    tags: ['media', 'split', 'slats', 'curtain'],
    description: 'Image divided into alternating vertical strips sliding apart on reveal.'
  }),
  createRoadmapComponent({
    id: 'dynamic-blur-reflection',
    name: 'Ambient Glass Floor Reflection',
    category: 'media',
    icon: '🪞',
    difficulty: 'beginner',
    tags: ['media', 'reflection', 'ambient', 'glow'],
    description: 'Vibrant colors of media artwork casting a matching ambient blur reflection.'
  }),
  createRoadmapComponent({
    id: 'audio-visualizer-artwork',
    name: 'Album Artwork Audio Ring',
    category: 'media',
    icon: '🎵',
    difficulty: 'advanced',
    tags: ['media', 'album', 'audio', 'waveform'],
    description: 'Circular album art framed by reactive frequency spectrum visualizer bars.'
  }),
  createRoadmapComponent({
    id: 'kaleidoscopic-photo',
    name: 'Kaleidoscopic Photo Mirror',
    category: 'media',
    icon: '🪞',
    difficulty: 'advanced',
    tags: ['media', 'kaleidoscope', 'mirror', 'photo'],
    description: 'Hexagonal reflection symmetry transforming standard photo into kaleidoscope.'
  }),
  createRoadmapComponent({
    id: 'brush-stroke-reveal',
    name: 'Artistic Watercolor Brush Reveal',
    category: 'media',
    icon: '🖌️',
    difficulty: 'advanced',
    tags: ['media', 'brush', 'watercolor', 'art'],
    description: 'Organic watercolor paint stroke sweeping across canvas to paint in picture.'
  }),
  createRoadmapComponent({
    id: 'pixel-grid-photo-mosaic',
    name: 'Pixel Mosaic Assembly',
    category: 'media',
    icon: '🔲',
    difficulty: 'intermediate',
    tags: ['media', 'pixel', 'mosaic', 'tiles'],
    description: 'Digital photo resolving into view from hundreds of staggered mosaic tiles.'
  }),
  createRoadmapComponent({
    id: '3d-parallax-photo-layer',
    name: 'Subject-Separation Parallax',
    category: 'media',
    icon: '🌄',
    difficulty: 'advanced',
    tags: ['media', 'parallax', 'depth', 'portrait'],
    description: 'Foreground portrait subject lifting off background scenery with dual parallax.'
  }),
  createRoadmapComponent({
    id: 'video-play-button-pulse',
    name: 'Luminescent Video Play Ring',
    category: 'media',
    icon: '▶️',
    difficulty: 'beginner',
    tags: ['media', 'play', 'video', 'pulse'],
    description: 'Pulsing circular play button radiating glowing shockwaves over thumbnail.'
  })
];
