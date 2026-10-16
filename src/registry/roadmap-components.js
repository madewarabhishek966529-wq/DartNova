/**
 * DartNova Motion Catalog Manifest
 * Modular architecture uniting 18 category sub-modules.
 * Each category contains 26 components (468 components total),
 * equipped with full interactive live previews, reactive parameter controls, and Flutter code.
 */

import { roadmapButtons } from './roadmap/buttons.js';
import { roadmapCards } from './roadmap/cards.js';
import { roadmapText } from './roadmap/text.js';
import { roadmapLoaders } from './roadmap/loaders.js';
import { roadmapNavigation } from './roadmap/navigation.js';
import { roadmapTransitions } from './roadmap/transitions.js';
import { roadmapOverlays } from './roadmap/overlays.js';
import { roadmapGestures } from './roadmap/gestures.js';
import { roadmapBackgrounds } from './roadmap/backgrounds.js';
import { roadmapThreeD } from './roadmap/three-d.js';
import { roadmapMedia } from './roadmap/media.js';
import { roadmapCharts } from './roadmap/charts.js';
import { roadmapForms } from './roadmap/forms.js';
import { roadmapLists } from './roadmap/lists.js';
import { roadmapMicroInteractions } from './roadmap/micro-interactions.js';
import { roadmapExperiments } from './roadmap/experiments.js';
import { roadmapShaders } from './roadmap/shaders.js';
import { roadmapAiInteractions } from './roadmap/ai-interactions.js';

export const ROADMAP_COMPONENTS = [
  ...roadmapButtons,
  ...roadmapCards,
  ...roadmapText,
  ...roadmapLoaders,
  ...roadmapNavigation,
  ...roadmapTransitions,
  ...roadmapOverlays,
  ...roadmapGestures,
  ...roadmapBackgrounds,
  ...roadmapThreeD,
  ...roadmapMedia,
  ...roadmapCharts,
  ...roadmapForms,
  ...roadmapLists,
  ...roadmapMicroInteractions,
  ...roadmapExperiments,
  ...roadmapShaders,
  ...roadmapAiInteractions
];
