import { COMPONENTS } from '../src/registry/components.js';
import fs from 'fs';
import path from 'path';

const visDir = './src/registry/visualizers';
const catToFile = {
  buttons: 'buttons.js',
  cards: 'cards.js',
  text: 'text.js',
  loaders: 'loaders.js',
  navigation: 'navigation.js',
  transitions: 'transitions.js',
  overlays: 'overlays.js',
  gestures: 'gestures.js',
  backgrounds: 'backgrounds.js',
  'three-d': 'three-d.js',
  media: 'media.js',
  charts: 'charts.js',
  forms: 'forms.js',
  lists: 'lists.js',
  'micro-interactions': 'micro-interactions.js',
  experiments: 'experiments.js',
  shaders: 'shaders.js',
  'ai-interactions': 'ai-interactions.js'
};

const fileContents = {};
for (const [cat, fileName] of Object.entries(catToFile)) {
  fileContents[fileName] = fs.readFileSync(path.join(visDir, fileName), 'utf8');
}

const audit = {};
for (const c of COMPONENTS) {
  const fileName = catToFile[c.category];
  const content = fileContents[fileName] || '';
  const hasBranch = content.includes(`'${c.id}'`) || 
                    content.includes(`"${c.id}"`) || 
                    content.includes(`includes('${c.id.split('-')[0]}'`) ||
                    content.includes(c.id);
  
  audit[c.category] = audit[c.category] || { total: 0, bespoke: 0, missing: [] };
  audit[c.category].total++;
  if (hasBranch) {
    audit[c.category].bespoke++;
  } else {
    audit[c.category].missing.push({ id: c.id, name: c.name });
  }
}

console.log('--- COMPONENT VISUALIZER COVERAGE REPORT ---');
let totalMissing = 0;
for (const [cat, res] of Object.entries(audit)) {
  console.log(`${cat.padEnd(20)}: ${res.bespoke}/${res.total} bespoke | Missing: ${res.missing.length}`);
  totalMissing += res.missing.length;
}
console.log(`TOTAL MISSING BESPOKE VISUALIZERS: ${totalMissing}`);

console.log('\n--- DETAILED BREAKDOWN OF MISSING COMPONENTS ---');
for (const [cat, res] of Object.entries(audit)) {
  if (res.missing.length > 0) {
    console.log(`\n[${cat.toUpperCase()}] (${res.missing.length} missing):`);
    res.missing.forEach((m, idx) => {
      console.log(`  ${idx + 1}. [${m.id}] "${m.name}"`);
    });
  }
}
