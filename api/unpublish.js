// POST (editor only) { id } -> removes a paper and its PDF from the site.
import { PAPERS_PATH, commit, guard, papersFile, readPapers } from './_editor.js';

export default async function handler(req, res) {
  if (!guard(req, res)) return;
  const id = String(req.body?.id || '');
  if (!/^\d{4}-\d{3}$/.test(id)) return res.status(400).json({ error: 'Unknown paper.' });
  try {
    const { papers, head } = await readPapers();
    const paper = papers.find((p) => p.id === id);
    if (!paper) return res.status(404).json({ error: 'That paper isn’t published.' });
    const files = { [PAPERS_PATH]: papersFile(papers.filter((p) => p.id !== id)) };
    if (paper.pdf?.startsWith('/research/')) files[`public${paper.pdf}`] = null;
    await commit(head, files, `Unpublish research paper ${id}: ${paper.title}`);
    return res.status(200).json({ id });
  } catch (e) {
    console.error(e);
    return res.status(502).json({ error: 'Couldn’t save to GitHub. Check the GITHUB_TOKEN in Vercel, then try again.' });
  }
}
