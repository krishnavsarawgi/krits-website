import React, { useState } from 'react';
import { Check, Share2 } from 'lucide-react';

// Opens the phone's share sheet where there is one, otherwise copies the
// message and link to the clipboard.
export default function ShareButton({ title, text, path, label = 'Share', className = 'btn btn-ghost' }) {
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}${path}`;

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (e) {
        if (e.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this link:', url);
    }
  };

  return (
    <button type="button" onClick={share} className={className}>
      {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />} {copied ? 'Copied!' : label}
    </button>
  );
}
