// KRITS Research: published papers.
//
// Submissions arrive privately by email and never appear on the site by
// themselves. A paper is only published once it is added to this list and
// pushed to the repository, so only someone with push access can publish.
//
// To publish an accepted paper, copy this shape into the list below:
//
// {
//   id: '2026-001',                 // also the URL: /research/2026-001
//   type: 'research',               // a key of ARTICLE_TYPES
//   subject: 'physics',             // a key of SUBJECTS
//   title: 'Paper title',
//   authors: [{ name: 'Full Name', affiliation: 'School, City' }],
//   received: '2026-10-01',
//   accepted: '2026-10-20',
//   published: '2026-11-01',
//   abstract: 'One paragraph, 250 words at most.',
//   keywords: ['keyword', 'another'],
//   body: `## Introduction
//
// Paragraphs separated by blank lines. "## " starts a section heading.`,
//   references: ['Author, A. (2020). Title. Journal, 1(2), 3–4.'],
//   pdf: '/research/2026-001.pdf',  // optional: put the file in public/research/
// },

export const JOURNAL = {
  name: 'KRITS Research',
  tagline: 'A journal of original student science',
  volume: 1,
  year: 2026,
  editor: 'Krishnav Sarawgi',
  licence: 'CC BY 4.0',
};

export const ARTICLE_TYPES = {
  research: 'Original Research',
  review: 'Review',
  short: 'Short Communication',
};

export const SUBJECTS = {
  physics: 'Physics',
  chemistry: 'Chemistry',
  biology: 'Biology & Medicine',
  earth: 'Earth & Environment',
  space: 'Astronomy & Space',
  engineering: 'Engineering & Technology',
  maths: 'Mathematics & Computing',
};

const papers = [];

export default papers;
export const paperById = Object.fromEntries(papers.map((p) => [p.id, p]));

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

// APA-style citation.
export function citation(p, site = 'https://www.krits.net') {
  const names = p.authors.map(({ name }) => {
    const parts = name.trim().split(/\s+/);
    const last = parts.pop();
    return `${last}, ${parts.map((n) => `${n[0]}.`).join(' ')}`.trim();
  });
  const authors = names.length > 1 ? `${names.slice(0, -1).join(', ')}, & ${names.at(-1)}` : names[0];
  return `${authors} (${p.published.slice(0, 4)}). ${p.title}. ${JOURNAL.name}, ${JOURNAL.volume}, ${p.id}. ${site}/research/${p.id}`;
}
