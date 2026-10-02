// Prints [{slug, q}] for every article, for the video lookup script.
const files = ['mechanics', 'modern', 'waves-energy', 'chemistry-1', 'chemistry-2', 'space', 'earth', 'life'];
const out = [];
for (const f of files) {
  const { default: list } = await import(`../src/data/articles/${f}.js`);
  for (const a of list) out.push({ slug: a.slug, q: a.q, title: a.title });
}
console.log(JSON.stringify(out));
