// Journal settings shared by the site, the build script and the editor API.
export const JOURNAL = {
  name: 'KRITS Research',
  tagline: 'A journal of original student science',
  volume: 1,
  year: 2026,
  editor: 'Krishnav Sarawgi',
  editorEmail: 'krishnavsarawgi@gmail.com',
  licence: 'CC BY 4.0',
};

export const ARTICLE_TYPES = {
  research: 'Original Research',
  review: 'Review',
  short: 'Short Communication',
};

export const SUBJECTS = {
  physics: 'Physics',
  chemistry: 'Chemistry',
  biology: 'Biology & Medicine',
  earth: 'Earth & Environment',
  space: 'Astronomy & Space',
  engineering: 'Engineering & Technology',
  maths: 'Mathematics & Computing',
};

// Largest PDF the editor desk can publish. Vercel functions accept request
// bodies up to 4.5 MB, and the file is sent base64-encoded (a third larger).
export const MAX_PDF_MB = 3;
