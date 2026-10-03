// GET -> whether this browser is signed in to the editor desk.
import { editorConfigured, isEditor } from './_editor.js';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ configured: editorConfigured(), editor: editorConfigured() && isEditor(req) });
}
