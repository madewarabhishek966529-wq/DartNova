import { createRoadmapComponent } from '../visualizer.js';

export const roadmapCharts = [
  createRoadmapComponent({
    id: 'animated-line-chart',
    name: 'Animated Spline Line Chart',
    category: 'charts',
    icon: '📈',
    difficulty: 'advanced',
    tags: ['charts', 'line', 'spline', 'bezier'],
    description: 'Hardware CustomPainter cubic spline drawing sequentially from left to right.'
  }),
  createRoadmapComponent({
    id: 'growing-bar-chart',
    name: 'Staggered Bar Chart',
    category: 'charts',
    icon: '📊',
    difficulty: 'intermediate',
    tags: ['charts', 'bars', 'stagger', 'growth'],
    description: 'Categorical vertical metric columns growing with elastic spring overshoot.'
  }),
  createRoadmapComponent({
    id: 'donut-chart-reveal',
    name: 'Donut Segment Reveal',
    category: 'charts',
    icon: '🍩',
    difficulty: 'intermediate',
    tags: ['charts', 'donut', 'pie', 'radial'],
    description: 'Concentric ring wedges sweeping clockwise with sweep-gradient borders.'
  }),
  createRoadmapComponent({
    id: 'radial-statistics',
    name: 'Multi-Ring Activity Tracker',
    category: 'charts',
    icon: '🎯',
    difficulty: 'intermediate',
    tags: ['charts', 'rings', 'activity', 'health'],
    description: 'Apple Health-style concentric progress rings with round caps.'
  }),
  createRoadmapComponent({
    id: 'animated-area-chart',
    name: 'Gradient Fill Area Chart',
    category: 'charts',
    icon: '📉',
    difficulty: 'advanced',
    tags: ['charts', 'area', 'gradient', 'curves'],
    description: 'Continuous spline line with a translucent glowing linear gradient fill.'
  }),
  createRoadmapComponent({
    id: 'number-flip-counter',
    name: 'Mechanical Number Flip',
    category: 'charts',
    icon: '🔢',
    difficulty: 'intermediate',
    tags: ['charts', 'counter', 'flip', 'ticker'],
    description: 'Airport departure board mechanical split-flap digits rolling to target value.'
  }),
  createRoadmapComponent({
    id: 'sparkline-reveal',
    name: 'Crypto Micro-Sparkline',
    category: 'charts',
    icon: '⚡',
    difficulty: 'beginner',
    tags: ['charts', 'sparkline', 'crypto', 'trend'],
    description: 'Ultra-compact trend sparkline drawing its path with animated glow point.'
  }),
  createRoadmapComponent({
    id: 'animated-heatmap',
    name: 'Matrix Activity Heatmap',
    category: 'charts',
    icon: '🟩',
    difficulty: 'intermediate',
    tags: ['charts', 'heatmap', 'github', 'grid'],
    description: 'GitHub contribution grid with tiles illuminating in cascading waves.'
  }),
  createRoadmapComponent({
    id: 'progress-dashboard-cards',
    name: 'KPI Metric Dashboard Pill',
    category: 'charts',
    icon: '🎛️',
    difficulty: 'beginner',
    tags: ['charts', 'kpi', 'dashboard', 'metric'],
    description: 'Card with animated percentage progress bar and differential arrow indicator.'
  }),
  createRoadmapComponent({
    id: 'radar-spider-chart',
    name: 'Polygonal Radar Spider Chart',
    category: 'charts',
    icon: '🕸️',
    difficulty: 'advanced',
    tags: ['charts', 'radar', 'spider', 'polygon'],
    description: 'Equi-angular multi-variable polygon expanding dynamically from center point.'
  }),
  createRoadmapComponent({
    id: 'stacked-waterfall-chart',
    name: 'Financial Waterfall Chart',
    category: 'charts',
    icon: '🌊',
    difficulty: 'intermediate',
    tags: ['charts', 'waterfall', 'financial', 'variance'],
    description: 'Floating positive and negative columns building cumulative metric totals.'
  }),
  createRoadmapComponent({
    id: 'candlestick-trading-chart',
    name: 'Live Candlestick Trading Graph',
    category: 'charts',
    icon: '🕯️',
    difficulty: 'advanced',
    tags: ['charts', 'candlestick', 'crypto', 'trading'],
    description: 'Real-time financial bars with green/red bodies and upper/lower volatility wicks.'
  }),
  createRoadmapComponent({
    id: 'bubble-scatter-chart',
    name: 'Physics Bubble Scatter Plot',
    category: 'charts',
    icon: '🫧',
    difficulty: 'advanced',
    tags: ['charts', 'scatter', 'bubble', 'packing'],
    description: 'Floating circular bubble nodes clustering together with collision physics.'
  }),
  createRoadmapComponent({
    id: 'semi-circle-speedometer',
    name: 'Semi-Circle Gauge Speedometer',
    category: 'charts',
    icon: '🏎️',
    difficulty: 'intermediate',
    tags: ['charts', 'speedometer', 'gauge', 'dial'],
    description: '180-degree automotive dial with glowing needle sweeping to live speed value.'
  }),
  createRoadmapComponent({
    id: 'step-line-chart',
    name: 'Discrete Step-Line Trajectory',
    category: 'charts',
    icon: '🪜',
    difficulty: 'intermediate',
    tags: ['charts', 'step', 'stairs', 'discrete'],
    description: 'Right-angled step graph connecting discrete milestone data thresholds.'
  }),
  createRoadmapComponent({
    id: 'radial-tree-map',
    name: 'Sunburst Radial Hierarchy',
    category: 'charts',
    icon: '🌳',
    difficulty: 'advanced',
    tags: ['charts', 'sunburst', 'hierarchy', 'tree'],
    description: 'Nested radial wedges displaying multi-level category data percentages.'
  }),
  createRoadmapComponent({
    id: 'live-ticker-sparkline',
    name: 'Real-Time Streaming Sparkline',
    category: 'charts',
    icon: '📈',
    difficulty: 'advanced',
    tags: ['charts', 'streaming', 'realtime', 'sparkline'],
    description: 'Infinite horizontally scrolling telemetry stream with live pulsing tip marker.'
  }),
  createRoadmapComponent({
    id: 'funnel-conversion-chart',
    name: 'Sales Funnel Conversion Bar',
    category: 'charts',
    icon: '🌪️',
    difficulty: 'intermediate',
    tags: ['charts', 'funnel', 'conversion', 'sales'],
    description: 'Trapezoidal multi-stage funnel tapering down with percentage drop-offs.'
  }),
  createRoadmapComponent({
    id: 'interactive-sankey-flow',
    name: 'Bezier Sankey Flow Ribbons',
    category: 'charts',
    icon: '🔀',
    difficulty: 'advanced',
    tags: ['charts', 'sankey', 'flow', 'bezier'],
    description: 'Fluid bezier flow channels distributing energy volume across network nodes.'
  }),
  createRoadmapComponent({
    id: 'gauge-cluster-dashboard',
    name: 'Tri-Gauge Digital Cluster',
    category: 'charts',
    icon: '🎛️',
    difficulty: 'intermediate',
    tags: ['charts', 'cluster', 'dashboard', 'instruments'],
    description: 'Three coordinated circular gauges displaying RPM, speed, and battery metrics.'
  }),
  createRoadmapComponent({
    id: 'multi-line-comparison',
    name: 'Dual-Series Line Comparison',
    category: 'charts',
    icon: '📉',
    difficulty: 'intermediate',
    tags: ['charts', 'comparison', 'dual', 'series'],
    description: 'Two contrasting colored splines racing together across time horizon.'
  }),
  createRoadmapComponent({
    id: 'polar-area-rose-chart',
    name: 'Nightingale Rose Chart',
    category: 'charts',
    icon: '🌹',
    difficulty: 'advanced',
    tags: ['charts', 'rose', 'polar', 'cyclical'],
    description: 'Cyclical polar coordinate sectors with variable radius petal areas.'
  }),
  createRoadmapComponent({
    id: 'bullet-metric-graph',
    name: 'Executive Bullet Graph',
    category: 'charts',
    icon: '🎯',
    difficulty: 'beginner',
    tags: ['charts', 'bullet', 'kpi', 'target'],
    description: 'Horizontal performance bar compared against target marker and rating zones.'
  }),
  createRoadmapComponent({
    id: 'dot-density-matrix',
    name: 'Dot Density Threshold Matrix',
    category: 'charts',
    icon: '🧮',
    difficulty: 'intermediate',
    tags: ['charts', 'dots', 'density', 'matrix'],
    description: '100-dot demographic cluster array with interactive value highlights.'
  }),
  createRoadmapComponent({
    id: 'circular-counter-dial',
    name: 'Concentric Percentage Wheel',
    category: 'charts',
    icon: '⏱️',
    difficulty: 'beginner',
    tags: ['charts', 'wheel', 'radial', 'percentage'],
    description: 'Concentric circular track drawing 360-degree perimeter to 100% completion.'
  })
];
