// Vercel function that authorises KRITS Research PDF uploads.
// The browser uploads the file straight to Vercel Blob; this route only hands
// out a short-lived token, and only for one PDF under submissions/.
// Files are stored privately: they can't be opened without the store's token,
// so only the site owner can read them (Vercel dashboard → Storage → Blob).
import { handleUpload } from '@vercel/blob/client';

const MAX_BYTES = 20 * 1024 * 1024;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(503).json({ error: 'Uploads are not set up yet.' });
  }
  try {
    const result = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        if (!/^submissions\/[\w.-]{1,120}\.pdf$/i.test(pathname)) throw new Error('Only a single PDF can be submitted.');
        return {
          allowedContentTypes: ['application/pdf'],
          maximumSizeInBytes: MAX_BYTES,
          addRandomSuffix: true,
          allowOverwrite: false,
          validUntil: Date.now() + 10 * 60 * 1000,
        };
      },
    });
    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({ error: e.message || 'Upload failed.' });
  }
}
