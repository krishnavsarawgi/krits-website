// KRITS Research: published papers.
//
// Papers are published from the editor desk (/research/submit), which only
// opens with the editor password. Publishing commits the PDF to
// public/research/ and the paper's details to papers.json, and Vercel
// redeploys. Nothing anyone else sends ever reaches this list.
import papersData from './papers.json' with { type: 'json' };

export { JOURNAL, ARTICLE_TYPES, SUBJECTS } from './research-config.js';
import { JOURNAL } from './research-config.js';

const papers = papersData;

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
