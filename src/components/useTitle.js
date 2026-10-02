import { useEffect } from 'react';

export default function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — KRITS` : 'KRITS — Science, Explained';
  }, [title]);
}
