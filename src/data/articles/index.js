import mechanics from './mechanics.js';
import modern from './modern.js';
import wavesEnergy from './waves-energy.js';
import chemistry1 from './chemistry-1.js';
import chemistry2 from './chemistry-2.js';
import space from './space.js';
import earth from './earth.js';
import life from './life.js';
import videos from '../videos.json';

export const CATEGORIES = {
  physics: { label: 'Physics', desk: 'Physics Desk' },
  chemistry: { label: 'Chemistry', desk: 'Chemistry Desk' },
  space: { label: 'Space', desk: 'Space & Astronomy Desk' },
  earth: { label: 'Earth', desk: 'Earth & Climate Desk' },
  life: { label: 'Life', desk: 'Life Sciences Desk' },
};

const articles = [...mechanics, ...modern, ...wavesEnergy, ...chemistry1, ...chemistry2, ...space, ...earth, ...life].map(
  (a) => ({
    ...a,
    video: videos[a.slug] || null,
    readMins: Math.max(2, Math.round(a.body.split(/\s+/).length / 220)),
  }),
);

export default articles;
export const bySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));
