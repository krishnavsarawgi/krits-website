// Best quiz scores, kept in this browser only.
const KEY = 'krits-quiz-best';

export function loadBest() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

// Returns true when this score beats the stored one.
export function saveBest(slug, score, total) {
  const all = loadBest();
  const prev = all[slug];
  if (prev && prev.score >= score) return false;
  all[slug] = { score, total };
  try {
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    // Storage blocked (private mode etc.) — the quiz still works.
  }
  return true;
}
