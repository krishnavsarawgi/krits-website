import chemistry from './chemistry.js';
import physics from './physics.js';
import spaceEarth from './space-earth.js';
import lifePeople from './life-people.js';

export const QUIZ_CATEGORIES = {
  chemistry: 'Chemistry',
  physics: 'Physics',
  space: 'Space',
  earth: 'Earth',
  life: 'Life & Body',
  general: 'Scientists & Fields',
};

// British/American spellings and symbols that should count as the same answer.
const SPELLINGS = [
  [/aluminum/g, 'aluminium'],
  [/sulph/g, 'sulf'],
  [/cesium/g, 'caesium'],
  [/color/g, 'colour'],
  [/vapor/g, 'vapour'],
  [/meter/g, 'metre'],
  [/liter/g, 'litre'],
  [/hemo/g, 'haemo'],
  [/anemia/g, 'anaemia'],
  [/esoph/g, 'oesoph'],
  [/(^|[^o])estrogen/g, '$1oestrogen'],
  [/paleo/g, 'palaeo'],
  [/ization/g, 'isation'],
  [/center/g, 'centre'],
];
const SUB = '₀₁₂₃₄₅₆₇₈₉';
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';

export function normalize(s) {
  let t = s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[₀-₉]/g, (c) => SUB.indexOf(c))
    .replace(/[⁰¹²³⁴-⁹]/g, (c) => SUP.indexOf(c))
    .replace(/&/g, ' and ')
    .trim()
    .replace(/^the\s+/, '');
  for (const [re, to] of SPELLINGS) t = t.replace(re, to);
  return t.replace(/[^a-z0-9]/g, '');
}

const NOT_SURNAMES = new Set(['brothers', 'mission', 'orbiter']);

function parse(quiz) {
  const items = quiz.lines
    .trim()
    .split('\n')
    .map((line) => line.split(' | ').map((x) => x.trim()))
    .map((parts) => {
      const [clue, answer, ...aliases] = quiz.mode === 'clue' ? parts : [null, ...parts];
      const accepts = new Set([answer, ...aliases].map(normalize));
      if (quiz.lastName) {
        const last = answer.split(/\s+/).pop();
        if (!/^\d+$/.test(last) && !NOT_SURNAMES.has(last.toLowerCase())) accepts.add(normalize(last));
      }
      return { clue, answer, accepts: [...accepts] };
    });
  return { ...quiz, items };
}

const quizzes = [...chemistry, ...physics, ...spaceEarth, ...lifePeople].map(parse);

export default quizzes;
export const quizBySlug = Object.fromEntries(quizzes.map((q) => [q.slug, q]));
