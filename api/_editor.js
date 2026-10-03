// Shared helpers for the KRITS Research editor desk. Files starting with "_"
// are not exposed as routes by Vercel.
//
// Needs two environment variables in Vercel (Production):
//   EDITOR_PASSWORD  the password for the editor desk
//   GITHUB_TOKEN     a fine-grained GitHub token for this repository only,
//                    with "Contents: Read and write"
import { createHmac, createHash, timingSafeEqual } from 'node:crypto';

const COOKIE = 'krits_editor';
const SESSION_DAYS = 7;

const OWNER = process.env.VERCEL_GIT_REPO_OWNER || 'krishnavsarawgi';
const REPO = process.env.VERCEL_GIT_REPO_SLUG || 'krits-website';
const BRANCH = 'main';
export const PAPERS_PATH = 'src/data/papers.json';

const password = () => process.env.EDITOR_PASSWORD || '';
const key = () => createHash('sha256').update(`krits-editor:${password()}`).digest();
const sign = (value) => createHmac('sha256', key()).update(value).digest('base64url');

export const editorConfigured = () => password().length > 0 && Boolean(process.env.GITHUB_TOKEN);

export function passwordMatches(attempt) {
  if (!password() || typeof attempt !== 'string') return false;
  const a = createHash('sha256').update(attempt).digest();
  const b = createHash('sha256').update(password()).digest();
  return timingSafeEqual(a, b);
}

export function sessionCookie() {
  const expires = Date.now() + SESSION_DAYS * 86400000;
  const value = `${expires}.${sign(String(expires))}`;
  return `${COOKIE}=${value}; Path=/api; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_DAYS * 86400}`;
}

export const clearedCookie = () => `${COOKIE}=; Path=/api; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

export function isEditor(req) {
  if (!password()) return false;
  const raw = (req.headers.cookie || '').split(/;\s*/).find((c) => c.startsWith(`${COOKIE}=`));
  if (!raw) return false;
  const [expires, mac] = raw.slice(COOKIE.length + 1).split('.');
  if (!expires || !mac || Number(expires) < Date.now()) return false;
  const expected = Buffer.from(sign(expires));
  const given = Buffer.from(mac);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

// Every editor action is a same-origin JSON POST from a signed-in editor.
export function guard(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed.' });
    return false;
  }
  if (!editorConfigured()) {
    res.status(503).json({ error: 'The editor desk is not set up yet.' });
    return false;
  }
  if (!isEditor(req)) {
    res.status(401).json({ error: 'Please sign in again.' });
    return false;
  }
  return true;
}

async function gh(path, options = {}) {
  const r = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.body && { 'Content-Type': 'application/json' }),
    },
  });
  if (!r.ok) {
    const detail = await r.text();
    throw new Error(`GitHub ${r.status} on ${path}: ${detail.slice(0, 200)}`);
  }
  return r.json();
}

// The published list as it is right now on GitHub (not the deployed copy,
// which can be a minute behind).
export async function readPapers() {
  const ref = await gh(`/git/ref/heads/${BRANCH}`);
  const file = await gh(`/contents/${PAPERS_PATH}?ref=${ref.object.sha}`);
  const papers = JSON.parse(Buffer.from(file.content, 'base64').toString('utf8'));
  return { papers, head: ref.object.sha };
}

// One commit that writes and/or deletes files. `files` maps repo paths to
// { base64 } or { text } contents, or null to delete. Fails if main moved on
// since `head` was read, so two edits can't overwrite each other.
export async function commit(head, files, message) {
  const base = await gh(`/git/commits/${head}`);
  const tree = [];
  for (const [path, content] of Object.entries(files)) {
    if (content === null) {
      tree.push({ path, mode: '100644', type: 'blob', sha: null });
      continue;
    }
    const blob = await gh('/git/blobs', {
      method: 'POST',
      body: JSON.stringify(
        content.base64 !== undefined ? { content: content.base64, encoding: 'base64' } : { content: content.text, encoding: 'utf-8' },
      ),
    });
    tree.push({ path, mode: '100644', type: 'blob', sha: blob.sha });
  }
  const newTree = await gh('/git/trees', { method: 'POST', body: JSON.stringify({ base_tree: base.tree.sha, tree }) });
  const created = await gh('/git/commits', {
    method: 'POST',
    body: JSON.stringify({ message, tree: newTree.sha, parents: [head] }),
  });
  await gh(`/git/refs/heads/${BRANCH}`, { method: 'PATCH', body: JSON.stringify({ sha: created.sha, force: false }) });
  return created.sha;
}

export const papersFile = (papers) => ({ text: `${JSON.stringify(papers, null, 2)}\n` });

export const pause = (ms) => new Promise((r) => setTimeout(r, ms));
