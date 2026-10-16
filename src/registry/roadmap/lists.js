import { createRoadmapComponent } from '../visualizer.js';

export const roadmapLists = [
  createRoadmapComponent({
    id: 'staggered-list-entrance',
    name: 'Staggered List Entrance',
    category: 'lists',
    icon: '📋',
    difficulty: 'beginner',
    tags: ['lists', 'stagger', 'entrance', 'cascade'],
    description: 'List items cascading into view with incremental delay and upward translation.'
  }),
  createRoadmapComponent({
    id: 'animated-grid-entrance',
    name: 'Staggered Grid Cascade',
    category: 'lists',
    icon: '🧱',
    difficulty: 'intermediate',
    tags: ['lists', 'grid', 'stagger', 'matrix'],
    description: '2D grid cells popping in diagonally from top-left with elastic spring scale.'
  }),
  createRoadmapComponent({
    id: 'expandable-list-item',
    name: 'Expandable Accordion Row',
    category: 'lists',
    icon: '🪗',
    difficulty: 'intermediate',
    tags: ['lists', 'accordion', 'expand', 'row'],
    description: 'List tile expanding its vertical bounding box smoothly to reveal nested sub-items.'
  }),
  createRoadmapComponent({
    id: 'drag-reorder-list',
    name: 'Reorderable List Row',
    category: 'lists',
    icon: '↕️',
    difficulty: 'advanced',
    tags: ['lists', 'drag', 'reorder', 'sort'],
    description: 'Long-press drag reordering with elevation shadow and slot displacement.'
  }),
  createRoadmapComponent({
    id: 'swipeable-list-row',
    name: 'Swipe-to-Dismiss Row',
    category: 'lists',
    icon: '↔️',
    difficulty: 'intermediate',
    tags: ['lists', 'swipe', 'dismiss', 'delete'],
    description: 'Row translating horizontally under gesture and ejecting with spring collapse.'
  }),
  createRoadmapComponent({
    id: 'animated-search-results',
    name: 'Search Result Highlight',
    category: 'lists',
    icon: '🔍',
    difficulty: 'beginner',
    tags: ['lists', 'search', 'results', 'filter'],
    description: 'List rows filtering dynamically with highlighted matching character spans.'
  }),
  createRoadmapComponent({
    id: 'filter-chip-transition',
    name: 'Filter Chip Bar',
    category: 'lists',
    icon: '🏷️',
    difficulty: 'beginner',
    tags: ['lists', 'chips', 'filter', 'tags'],
    description: 'Horizontal scrollable chips with animated selection checks and color fills.'
  }),
  createRoadmapComponent({
    id: 'list-item-morph',
    name: 'Row-to-Detail Expansion',
    category: 'lists',
    icon: '📐',
    difficulty: 'advanced',
    tags: ['lists', 'morph', 'detail', 'expand'],
    description: 'Compact list tile morphing smoothly into full-screen hero detail scaffold.'
  }),
  createRoadmapComponent({
    id: 'infinite-scroll-reveal',
    name: 'Infinite Stream Skeleton',
    category: 'lists',
    icon: '♾️',
    difficulty: 'intermediate',
    tags: ['lists', 'infinite', 'stream', 'skeleton'],
    description: 'Skeleton shimmer placeholder swapping instantly with incoming loaded cards.'
  }),
  createRoadmapComponent({
    id: 'animated-empty-state',
    name: 'Animated Empty State Box',
    category: 'lists',
    icon: '📦',
    difficulty: 'beginner',
    tags: ['lists', 'empty', 'state', 'illustration'],
    description: 'Floating empty box illustration with gentle bobbing levitation loop.'
  }),
  createRoadmapComponent({
    id: 'accordion-chevron-list',
    name: 'Accordion FAQ Chevron List',
    category: 'lists',
    icon: '🪗',
    difficulty: 'beginner',
    tags: ['lists', 'faq', 'accordion', 'chevron'],
    description: 'FAQ row expanding content height with rotating chevron arrow indicator.'
  }),
  createRoadmapComponent({
    id: 'virtualized-infinite-stream',
    name: 'Virtualized Infinite Feed',
    category: 'lists',
    icon: '🌊',
    difficulty: 'advanced',
    tags: ['lists', 'virtualized', 'feed', 'stream'],
    description: 'Ultra-high-performance virtualized list recycling offscreen rows seamlessly.'
  }),
  createRoadmapComponent({
    id: 'carousel-card-deck-list',
    name: 'Horizontal Card Deck List',
    category: 'lists',
    icon: '🗃️',
    difficulty: 'intermediate',
    tags: ['lists', 'carousel', 'cards', 'horizontal'],
    description: 'Horizontal card list scaling active item to full size while dimming neighbors.'
  }),
  createRoadmapComponent({
    id: 'nested-tree-hierarchy-list',
    name: 'Nested Folder Tree List',
    category: 'lists',
    icon: '🌳',
    difficulty: 'intermediate',
    tags: ['lists', 'tree', 'hierarchy', 'folders'],
    description: 'Collapsible folder branches connected by vertical dashed line guides.'
  }),
  createRoadmapComponent({
    id: 'selection-checkbox-list',
    name: 'Bulk Selection Checklist',
    category: 'lists',
    icon: '☑️',
    difficulty: 'beginner',
    tags: ['lists', 'bulk', 'selection', 'checkbox'],
    description: 'Multiple selection mode popping animated floating action bottom bar.'
  }),
  createRoadmapComponent({
    id: 'swipe-to-archive-row',
    name: 'Swipe-to-Archive Drawer Row',
    category: 'lists',
    icon: '📦',
    difficulty: 'intermediate',
    tags: ['lists', 'swipe', 'archive', 'drawer'],
    description: 'Swiping row revealing colorful archive tray and ejecting row from list.'
  }),
  createRoadmapComponent({
    id: 'masonry-cascade-feed',
    name: 'Pinterest Masonry Grid',
    category: 'lists',
    icon: '🧱',
    difficulty: 'intermediate',
    tags: ['lists', 'masonry', 'pinterest', 'feed'],
    description: 'Multi-column staggered grid layout packing variable height cards tightly.'
  }),
  createRoadmapComponent({
    id: 'notification-inbox-list',
    name: 'Notification Inbox List',
    category: 'lists',
    icon: '📬',
    difficulty: 'beginner',
    tags: ['lists', 'notifications', 'inbox', 'unread'],
    description: 'List rows featuring unread blue dot indicators that pop and vanish on click.'
  }),
  createRoadmapComponent({
    id: 'contact-avatar-directory',
    name: 'Alphabetical Scrubber List',
    category: 'lists',
    icon: '👥',
    difficulty: 'intermediate',
    tags: ['lists', 'directory', 'scrubber', 'alphabet'],
    description: 'Vertical letter index scrubber snapping instantly to matching contact groups.'
  }),
  createRoadmapComponent({
    id: 'pill-badge-table-list',
    name: 'Data Table Status Rows',
    category: 'lists',
    icon: '🏷️',
    difficulty: 'beginner',
    tags: ['lists', 'table', 'status', 'badge'],
    description: 'Tabular data row with colorful status badges and illuminated hover bar.'
  }),
  createRoadmapComponent({
    id: 'pull-to-refresh-list',
    name: 'Elastic Pulley Refresh List',
    category: 'lists',
    icon: '🔄',
    difficulty: 'intermediate',
    tags: ['lists', 'pull', 'refresh', 'pulley'],
    description: 'Stretching rubber cord indicator popping spinner on reaching pull threshold.'
  }),
  createRoadmapComponent({
    id: 'timeline-milestone-list',
    name: 'Vertical Roadmap Timeline',
    category: 'lists',
    icon: '⏳',
    difficulty: 'intermediate',
    tags: ['lists', 'timeline', 'milestones', 'roadmap'],
    description: 'Vertical progression track with glowing waypoint nodes and pulse lines.'
  }),
  createRoadmapComponent({
    id: 'shuffled-rank-leaderboard',
    name: 'Real-Time Rank Leaderboard',
    category: 'lists',
    icon: '🏆',
    difficulty: 'advanced',
    tags: ['lists', 'leaderboard', 'rank', 'shuffle'],
    description: 'Leaderboard rows gliding smoothly between positions when score changes.'
  }),
  createRoadmapComponent({
    id: 'chat-bubble-thread',
    name: 'Conversational Chat Feed',
    category: 'lists',
    icon: '💬',
    difficulty: 'intermediate',
    tags: ['lists', 'chat', 'feed', 'bubbles'],
    description: 'Incoming and outgoing speech bubbles popping with spring origin bounce.'
  }),
  createRoadmapComponent({
    id: 'filterable-catalog-grid',
    name: 'FLIP Layout Filter Grid',
    category: 'lists',
    icon: '🎛️',
    difficulty: 'advanced',
    tags: ['lists', 'flip', 'filter', 'grid'],
    description: 'Grid tiles translating smoothly to their new positions during category filtering.'
  }),
  createRoadmapComponent({
    id: 'collapsible-section-headers',
    name: 'Sticky Header Section Groups',
    category: 'lists',
    icon: '📑',
    difficulty: 'beginner',
    tags: ['lists', 'sticky', 'headers', 'groups'],
    description: 'Section headers locking to top of list viewport until pushed by next header.'
  })
];
