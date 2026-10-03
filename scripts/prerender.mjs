// Runs after `vite build`. Writes a copy of index.html for every page with
// its own title, description and link-preview tags (WhatsApp, Instagram,
// X and search crawlers don't run JavaScript), plus sitemap.xml.
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const SITE = 'https://www.krits.net';
const DEFAULT_IMAGE = { url: `${SITE}/og-image.png`, width: 1200, height: 1200 };
const dist = new URL('../dist/', import.meta.url);

const articleFiles = ['mechanics', 'modern', 'waves-energy', 'chemistry-1', 'chemistry-2', 'space', 'earth', 'life'];
const videos = JSON.parse(await readFile(new URL('../src/data/videos.json', import.meta.url), 'utf8'));
const articles = [];
for (const f of articleFiles) {
  const { default: list } = await import(`../src/data/articles/${f}.js`);
  articles.push(...list);
}
const { default: quizzes } = await import('../src/data/quizzes/index.js');
const { default: papers, JOURNAL } = await import('../src/data/research.js');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const clip = (s, n = 160) => (s.length <= n ? s : `${s.slice(0, n - 1).replace(/\s+\S*$/, '')}…`);
const clock = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

const pages = [
  { path: '/', priority: 1.0 },
  {
    path: '/explainers',
    title: 'Science Explainers — KRITS',
    description: `${articles.length} short, clear explainers on physics, chemistry, space, Earth and life science, each paired with the best video on the topic.`,
    priority: 0.9,
  },
  {
    path: '/quizzes',
    title: 'Science Quizzes — KRITS',
    description: `${quizzes.length} free type-the-answer science quizzes: elements, particles, planets, the human body and more. Beat the clock.`,
    priority: 0.9,
  },
  {
    path: '/kits',
    title: 'DIY STEM Kits — KRITS',
    description: 'KRITS hand-assembles Meccano-style engineering kits and donates them to NGOs and schools so more children get to build something real.',
    priority: 0.7,
  },
  {
    path: '/research',
    title: `${JOURNAL.name} — ${JOURNAL.tagline}`,
    description: 'An open-access, editor-reviewed journal of original science by students. Free to submit, free to read. Submit your research.',
    priority: 0.8,
  },
  {
    path: '/research/submit',
    title: `Submit a Paper — ${JOURNAL.name}`,
    description: 'Author guidelines and submission form for KRITS Research: original research, reviews and short communications by students.',
    priority: 0.6,
  },
  ...papers.map((p) => ({
    path: `/research/${p.id}`,
    title: `${p.title} — ${JOURNAL.name}`,
    description: clip(p.abstract),
    type: 'article',
    priority: 0.8,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline: p.title,
      abstract: p.abstract,
      author: p.authors.map((a) => ({ '@type': 'Person', name: a.name, ...(a.affiliation && { affiliation: a.affiliation }) })),
      datePublished: p.published,
      keywords: (p.keywords || []).join(', '),
      isPartOf: { '@type': 'Periodical', name: JOURNAL.name },
      license: 'https://creativecommons.org/licenses/by/4.0/',
      mainEntityOfPage: `${SITE}/research/${p.id}`,
    },
  })),
  ...articles.map((a) => {
    const video = videos[a.slug];
    return {
      path: `/explainers/${a.slug}`,
      title: `${a.title} — KRITS`,
      description: clip(a.dek),
      image: video ? { url: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`, width: 480, height: 360 } : null,
      type: 'article',
      priority: 0.8,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: a.title,
        description: a.dek,
        author: { '@type': 'Organization', name: 'KRITS Science Desk' },
        publisher: { '@type': 'Organization', name: 'KRITS', logo: { '@type': 'ImageObject', url: `${SITE}/icon-512.png` } },
        mainEntityOfPage: `${SITE}/explainers/${a.slug}`,
        ...(video && { image: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg` }),
      },
    };
  }),
  ...quizzes.map((q) => ({
    path: `/quizzes/${q.slug}`,
    title: `${q.title} Quiz — KRITS`,
    description: clip(`${q.desc} ${q.items.length} answers, ${clock(q.time)} on the clock. Free science quiz — how many can you get?`),
    priority: 0.8,
  })),
];

function setTag(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`prerender: tag not found: ${pattern}`);
  return html.replace(pattern, replacement);
}

function render(template, p) {
  let html = template;
  const image = p.image || DEFAULT_IMAGE;
  const url = `${SITE}${p.path === '/' ? '/' : p.path}`;
  if (p.title) {
    html = setTag(html, /<title>[^<]*<\/title>/, `<title>${esc(p.title)}</title>`);
    html = setTag(html, /(<meta property="og:title" content=")[^"]*/, `$1${esc(p.title)}`);
    html = setTag(html, /(<meta name="twitter:title" content=")[^"]*/, `$1${esc(p.title)}`);
  }
  if (p.description) {
    html = setTag(html, /(<meta name="description" content=")[^"]*/, `$1${esc(p.description)}`);
    html = setTag(html, /(<meta property="og:description" content=")[^"]*/, `$1${esc(p.description)}`);
    html = setTag(html, /(<meta name="twitter:description" content=")[^"]*/, `$1${esc(p.description)}`);
  }
  html = setTag(html, /(<meta property="og:url" content=")[^"]*/, `$1${url}`);
  html = setTag(html, /(<meta property="og:image" content=")[^"]*/, `$1${image.url}`);
  html = setTag(html, /(<meta property="og:image:width" content=")[^"]*/, `$1${image.width}`);
  html = setTag(html, /(<meta property="og:image:height" content=")[^"]*/, `$1${image.height}`);
  html = setTag(html, /(<meta name="twitter:image" content=")[^"]*/, `$1${image.url}`);
  if (p.type) html = setTag(html, /(<meta property="og:type" content=")[^"]*/, `$1${p.type}`);
  if (p.image) html = setTag(html, /\s*<meta property="og:image:alt" content="[^"]*" \/>/, '');
  const head = [`<link rel="canonical" href="${url}" />`];
  if (p.jsonLd) head.push(`<script type="application/ld+json">${JSON.stringify(p.jsonLd).replace(/</g, '\\u003c')}</script>`);
  return html.replace('</head>', `    ${head.join('\n    ')}\n  </head>`);
}

const template = await readFile(new URL('index.html', dist), 'utf8');
for (const p of pages) {
  // /explainers/black-holes -> explainers/black-holes.html, served without
  // the extension by Vercel's cleanUrls.
  const file = new URL(p.path === '/' ? 'index.html' : `.${p.path}.html`, dist);
  await mkdir(new URL('.', file), { recursive: true });
  await writeFile(file, render(template, p));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${SITE}${p.path}</loc><priority>${p.priority.toFixed(1)}</priority></url>`).join('\n')}
</urlset>
`;
await writeFile(new URL('sitemap.xml', dist), sitemap);
console.log(`prerender: ${pages.length} pages + sitemap.xml`);
