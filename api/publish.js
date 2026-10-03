// POST (editor only) { title, type, subject, authors, abstract, keywords,
// received?, accepted?, pdf: base64 } -> commits the PDF and the paper's
// details to the repository, which redeploys the site with the paper on it.
import { ARTICLE_TYPES, SUBJECTS, MAX_PDF_MB } from '../src/data/research-config.js';
import { PAPERS_PATH, commit, guard, papersFile, readPapers } from './_editor.js';

const text = (v, max) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '');
const isDate = (v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));

function validate(body) {
  const title = text(body.title, 300);
  const abstract = text(body.abstract, 4000);
  const authors = (Array.isArray(body.authors) ? body.authors : [])
    .slice(0, 20)
    .map((a) => ({ name: text(a?.name, 120), affiliation: text(a?.affiliation, 200) }))
    .filter((a) => a.name)
    .map((a) => (a.affiliation ? a : { name: a.name }));
  const keywords = (Array.isArray(body.keywords) ? body.keywords : String(body.keywords || '').split(','))
    .map((k) => text(k, 60))
    .filter(Boolean)
    .slice(0, 10);
  if (!title) return 'Add the paper’s title.';
  if (!ARTICLE_TYPES[body.type]) return 'Choose an article type.';
  if (!SUBJECTS[body.subject]) return 'Choose a subject.';
  if (!authors.length) return 'Add at least one author.';
  if (!abstract) return 'Add the abstract.';
  if (String(body.abstract).length > 4000) return 'The abstract is too long. Keep it under about 600 words.';
  for (const k of ['received', 'accepted']) if (body[k] && !isDate(body[k])) return `The ${k} date isn’t valid.`;
  if (typeof body.pdf !== 'string' || !body.pdf) return 'Attach the PDF.';
  const pdf = Buffer.from(body.pdf, 'base64');
  if (pdf.subarray(0, 5).toString('latin1') !== '%PDF-') return 'That file isn’t a PDF.';
  if (pdf.length > MAX_PDF_MB * 1024 * 1024) return `The PDF must be ${MAX_PDF_MB} MB or smaller.`;
  return {
    paper: {
      type: body.type,
      subject: body.subject,
      title,
      authors,
      ...(isDate(body.received) && { received: body.received }),
      ...(isDate(body.accepted) && { accepted: body.accepted }),
      abstract,
      keywords,
    },
    pdf,
  };
}

export default async function handler(req, res) {
  if (!guard(req, res)) return;
  const checked = validate(req.body || {});
  if (typeof checked === 'string') return res.status(400).json({ error: checked });

  try {
    const { papers, head } = await readPapers();
    const today = new Date().toISOString().slice(0, 10);
    const year = today.slice(0, 4);
    const next = 1 + Math.max(0, ...papers.filter((p) => p.id.startsWith(`${year}-`)).map((p) => Number(p.id.slice(5)) || 0));
    const id = `${year}-${String(next).padStart(3, '0')}`;
    const paper = { id, ...checked.paper, published: today, pdf: `/research/${id}.pdf` };
    await commit(
      head,
      {
        [`public/research/${id}.pdf`]: { base64: checked.pdf.toString('base64') },
        [PAPERS_PATH]: papersFile([...papers, paper]),
      },
      `Publish research paper ${id}: ${paper.title}`,
    );
    return res.status(200).json({ paper });
  } catch (e) {
    console.error(e);
    return res.status(502).json({ error: 'Couldn’t save to GitHub. Check the GITHUB_TOKEN in Vercel, then try again.' });
  }
}
