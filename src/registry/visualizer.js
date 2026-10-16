/**
 * DartNova Motion Visualizer Engine
 * High-performance interactive visualizer for all 16 motion design library categories.
 * Provides 120fps micro-animations, real-time reactive prop binding, touch/mouse interactivity,
 * and robust fail-safe rendering without null canvas crashes.
 */

import { renderButtonVisualizer } from './visualizers/buttons.js';
import { renderCardVisualizer } from './visualizers/cards.js';
import { renderTextVisualizer } from './visualizers/text.js';
import { renderLoaderVisualizer } from './visualizers/loaders.js';
import { renderNavigationVisualizer } from './visualizers/navigation.js';
import { renderTransitionVisualizer } from './visualizers/transitions.js';
import { renderOverlayVisualizer } from './visualizers/overlays.js';
import { renderGestureVisualizer } from './visualizers/gestures.js';
import { renderBackgroundVisualizer } from './visualizers/backgrounds.js';
import { renderThreeDVisualizer } from './visualizers/three-d.js';
import { renderMediaVisualizer } from './visualizers/media.js';
import { renderChartVisualizer } from './visualizers/charts.js';
import { renderFormVisualizer } from './visualizers/forms.js';
import { renderListVisualizer } from './visualizers/lists.js';
import { renderMicroInteractionVisualizer } from './visualizers/micro-interactions.js';
import { renderExperimentVisualizer } from './visualizers/experiments.js';

export function createMotionVisualizer(id, category, name, icon, props) {
  const accent = props.accentColor || '#C5FF35';
  const duration = props.duration || 350;
  const stage = document.createElement('div');
  stage.className = 'dn-motion-stage';
  stage.style.position = 'relative';
  stage.style.width = '100%';
  stage.style.height = '100%';
  stage.style.display = 'flex';
  stage.style.flexDirection = 'column';
  stage.style.alignItems = 'center';
  stage.style.justifyContent = 'center';
  stage.style.overflow = 'hidden';
  stage.style.padding = '12px';
  stage.style.boxSizing = 'border-box';
  stage.style.userSelect = 'none';

  const categoryHandlers = {
    buttons: renderButtonVisualizer,
    cards: renderCardVisualizer,
    text: renderTextVisualizer,
    typography: renderTextVisualizer,
    loaders: renderLoaderVisualizer,
    navigation: renderNavigationVisualizer,
    transitions: renderTransitionVisualizer,
    overlays: renderOverlayVisualizer,
    gestures: renderGestureVisualizer,
    backgrounds: renderBackgroundVisualizer,
    'three-d': renderThreeDVisualizer,
    media: renderMediaVisualizer,
    charts: renderChartVisualizer,
    forms: renderFormVisualizer,
    lists: renderListVisualizer,
    'micro-interactions': renderMicroInteractionVisualizer,
    experiments: renderExperimentVisualizer
  };

  const handler = categoryHandlers[category] || renderExperimentVisualizer;
  const lifecycle = handler(id, name, icon, accent, duration, stage) || {};

  return {
    element: stage,
    restart: lifecycle.restart || (() => {}),
    destroy: lifecycle.destroy || (() => {})
  };
}

export function createRoadmapComponent({
  id,
  name,
  category,
  description,
  tags = [],
  difficulty = 'intermediate',
  icon = '⚡',
  widgetName,
  badge = 'Live Demo',
  notes = 'Designed using core Flutter AnimationController and CustomPainter.'
}) {
  const wName = widgetName || name.replace(/[^a-zA-Z0-9]/g, '');

  return {
    id,
    name,
    category,
    badge,
    status: 'complete',
    difficulty,
    dependencies: [],
    tags: [category, ...tags],
    description,
    defaultProps: {
      duration: 350,
      accentColor: '#C5FF35'
    },
    controls: [
      { type: 'slider', label: 'Duration (ms)', prop: 'duration', min: 100, max: 1000, step: 50, unit: 'ms' },
      { type: 'color', label: 'Accent Color', prop: 'accentColor' }
    ],
    render: (container, props) => {
      container.innerHTML = '';
      const visualizer = createMotionVisualizer(id, category, name, icon, props || {});
      container.appendChild(visualizer.element);

      return {
        restart: visualizer.restart,
        destroy: visualizer.destroy
      };
    },
    flutterSnippet: `${wName}(
  duration: const Duration(milliseconds: 350),
  accentColor: const Color(0xFFC5FF35),
  onAction: () {
    debugPrint('${name} triggered');
  },
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

/// DartNova: ${name}
/// Category: ${category}
/// ${description}
class ${wName} extends StatefulWidget {
  final Duration duration;
  final Color accentColor;
  final VoidCallback? onAction;

  const ${wName}({
    super.key,
    this.duration = const Duration(milliseconds: 350),
    this.accentColor = const Color(0xFFC5FF35),
    this.onAction,
  });

  @override
  State<${wName}> createState() => _${wName}State();
}

class _${wName}State extends State<${wName}> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: widget.duration,
    );
    _animation = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeOutCubic,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _trigger() {
    if (_controller.isCompleted) {
      _controller.reverse();
    } else {
      _controller.forward();
    }
    widget.onAction?.call();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _trigger,
      child: AnimatedBuilder(
        animation: _animation,
        builder: (context, child) {
          return Container(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
            decoration: BoxDecoration(
              color: const Color(0xFF111318),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: widget.accentColor.withValues(alpha: 0.3 + 0.7 * _animation.value),
              ),
              boxShadow: [
                BoxShadow(
                  color: widget.accentColor.withValues(alpha: 0.25 * _animation.value),
                  blurRadius: 16 * _animation.value,
                ),
              ],
            ),
            child: Text(
              '${name}',
              style: const TextStyle(
                color: Color(0xFFF5F7FA),
                fontWeight: FontWeight.w600,
                fontSize: 14,
              ),
            ),
          );
        },
      ),
    );
  }
}
`,
    params: [
      { name: 'duration', type: 'Duration', defaultVal: 'const Duration(milliseconds: 350)', description: 'Animation transition duration' },
      { name: 'accentColor', type: 'Color', defaultVal: 'const Color(0xFFC5FF35)', description: 'Primary interactive accent color' }
    ],
    notes
  };
}
