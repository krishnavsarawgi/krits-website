import quizzes, { quizBySlug } from './quizzes/index.js';

// Article → the quiz that best tests it. Articles not listed get a quiz from their own subject.
const ARTICLE_QUIZ = {
  'periodic-table': 'elements-1-20',
  'isotopes': 'elements-1-20',
  'electron-orbitals': 'element-symbols',
  'noble-gases': 'noble-gases',
  'alkali-metals': 'alkali-metals',
  'acids-and-bases': 'acids',
  'chromatography': 'lab-equipment',
  'chemical-reactions-conservation-of-mass': 'chemical-formulas',
  'combustion': 'chemical-formulas',
  'haber-process': 'chemical-formulas',
  'kinetic-theory': 'states-and-changes',
  'plasma': 'states-and-changes',
  'crystals': 'mohs-hardness-scale',
  'carbon-allotropes': 'mohs-hardness-scale',
  'newtons-laws-of-motion': 'physics-equations',
  'mass-energy-equivalence': 'physics-equations',
  'gas-laws': 'physics-equations',
  'hookes-law-elasticity': 'physics-equations',
  'momentum': 'physics-equations',
  'electromagnetic-spectrum': 'electromagnetic-spectrum',
  'refraction-and-rainbows': 'colours-of-the-rainbow',
  'how-we-see-colour': 'colours-of-the-rainbow',
  'standard-model': 'standard-model-particles',
  'higgs-boson': 'standard-model-particles',
  'neutrinos': 'standard-model-particles',
  'atomic-models': 'name-the-particle',
  'antimatter': 'name-the-particle',
  'speed-of-light': 'physical-constants',
  'electric-current-ohms-law': 'si-derived-units',
  'work-and-power': 'what-does-it-measure',
  'magnetism': 'units-named-after-scientists',
  'electromagnetic-induction': 'units-named-after-scientists',
  'semiconductors-and-transistors': 'inventors',
  'solar-system-planets': 'planets',
  'moon-phases-and-eclipses': 'phases-of-the-moon',
  'life-cycle-of-stars': 'brightest-stars',
  'the-sun': 'brightest-stars',
  'supernovae': 'brightest-stars',
  'layers-of-the-earth': 'layers-of-earth-and-sky',
  'rock-cycle': 'name-the-rock',
  'greenhouse-effect': 'greenhouse-gases',
  'climate-change': 'greenhouse-gases',
  'ozone-layer': 'greenhouse-gases',
  'water-cycle': 'cloud-types',
  'lightning': 'cloud-types',
  'cells': 'cell-organelles',
  'dna': 'dna-bases',
  'the-heart-and-circulation': 'blood-and-heart',
  'neurons-and-the-brain': 'organs-of-the-body',
  'immune-system-vaccines': 'medical-pioneers',
  'antibiotics': 'medical-pioneers',
  'viruses-vs-bacteria': 'medical-pioneers',
  'genetics-inheritance': 'great-discoveries',
  'evolution-natural-selection': 'great-discoveries',
  'big-bang': 'great-discoveries',
  'black-holes': 'great-discoveries',
  'general-relativity': 'great-discoveries',
  'special-relativity': 'great-discoveries',
  'wave-particle-duality': 'great-discoveries',
  'quantum-superposition': 'great-discoveries',
  'uncertainty-principle': 'great-discoveries',
};

// Fallback quizzes per subject when an article has no specific match above.
const SUBJECT_QUIZZES = {
  physics: ['physics-equations', 'great-discoveries', 'name-the-particle', 'physical-constants', 'si-derived-units', 'units-named-after-scientists'],
  chemistry: ['element-symbols', 'chemical-formulas', 'element-clues', 'common-chemical-names', 'elements-1-20'],
  space: ['planets', 'planet-clues', 'moons-of-the-solar-system', 'space-firsts', 'brightest-stars'],
  earth: ['layers-of-earth-and-sky', 'name-the-rock', 'cloud-types', 'greenhouse-gases'],
  life: ['organs-of-the-body', 'cell-organelles', 'medical-pioneers', 'hormones', 'body-by-numbers'],
};

function hash(s) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

export function quizForArticle(a) {
  if (ARTICLE_QUIZ[a.slug]) return quizBySlug[ARTICLE_QUIZ[a.slug]];
  const pool = SUBJECT_QUIZZES[a.cat] || quizzes.map((q) => q.slug);
  return quizBySlug[pool[hash(a.slug) % pool.length]];
}

// Same pick for everyone all day, different tomorrow.
export function pickOfTheDay(list, salt = '') {
  const d = new Date();
  return list[hash(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}${salt}`) % list.length];
}
