// GET -> whether this browser is signed in to the editor desk. While the desk
// isn't set up, also says which settings are missing (names only, no values).
import { editorConfigured, isEditor } from './_editor.js';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const configured = editorConfigured();
  const missing = ['EDITOR_PASSWORD', 'GITHUB_TOKEN'].filter((name) => !process.env[name]);
  return res.status(200).json({ configured, editor: configured && isEditor(req), ...(!configured && { missing }) });
}
