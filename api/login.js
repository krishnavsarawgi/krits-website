// POST { password } -> sets the editor session cookie.
import { clearedCookie, editorConfigured, passwordMatches, pause, sessionCookie } from './_editor.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  if (!editorConfigured()) return res.status(503).json({ error: 'The editor desk is not set up yet.' });
  if (!passwordMatches(req.body?.password)) {
    await pause(1500); // slows down password guessing
    res.setHeader('Set-Cookie', clearedCookie());
    return res.status(401).json({ error: 'That password isn’t right.' });
  }
  res.setHeader('Set-Cookie', sessionCookie());
  return res.status(200).json({ editor: true });
}
