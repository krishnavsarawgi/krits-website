// POST -> clears the editor session cookie.
import { clearedCookie } from './_editor.js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  res.setHeader('Set-Cookie', clearedCookie());
  return res.status(200).json({ editor: false });
}
