import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import articles, { CATEGORIES } from '../data/articles/index.js';
import { pickOfTheDay } from '../data/related.js';
import { ArticleCard, today } from '../components/News.jsx';
import useTitle from '../components/useTitle.js';

function Masthead() {
  return (
    <header className="text-center">
      <div className="flex flex-wrap justify-between gap-2 text-[10px] md:text-xs tracking-[.15em] uppercase border-b border-[var(--ink)] pb-2">
        <span>Vol. I · No. {articles.length}</span>
        <span className="hidden sm:inline">{today()}</span>
        <span>Free edition</span>
      </div>
      <h1 className="font-masthead text-5xl sm:text-7xl md:text-8xl leading-none py-5">The KRITS Explainer</h1>
      <p className="font-serif-body italic text-[var(--ink-soft)] pb-4 text-sm md:text-base">
        All the science that’s fit to print — physics, chemistry, space, Earth and life, explained.
      </p>
      <div className="rule-double" />
    </header>
  );
}

export default function Explainers() {
  const [params, setParams] = useSearchParams();
  useTitle('Science Explainers');
  const cat = params.get('section') || 'all';
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter(
      (a) =>
        (cat === 'all' || a.cat === cat) &&
        (!q || `${a.title} ${a.dek} ${a.body}`.toLowerCase().includes(q)),
    );
  }, [cat, query]);

  const frontPage = cat === 'all' && !query.trim();
  const lead = useMemo(() => pickOfTheDay(articles, 'lead'), []);
  const sidebar = useMemo(
    () => Object.keys(CATEGORIES).map((c) => pickOfTheDay(articles.filter((a) => a.cat === c && a !== lead), c)),
    [lead],
  );

  const setSection = (c) => {
    setQuery('');
    setParams(c === 'all' ? {} : { section: c });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6 md:mt-10">
      <div className="newsprint px-4 md:px-10 py-6 md:py-8">
        <Masthead />

        {/* Section bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-3 border-b border-[var(--ink)]">
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold tracking-[.15em] uppercase">
            {[['all', 'Front page'], ...Object.entries(CATEGORIES).map(([k, v]) => [k, v.label])].map(([k, label]) => (
              <button
                key={k}
                onClick={() => setSection(k)}
                className={`underline-offset-4 ${cat === k ? 'underline decoration-2 text-[var(--stamp)]' : 'hover:underline'}`}
              >
                {label}
                {k !== 'all' && <span className="ml-1 font-normal text-[var(--ink-soft)]">{articles.filter((a) => a.cat === k).length}</span>}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 border-b-2 border-[var(--ink)] md:w-64">
            <Search className="w-4 h-4 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 100+ explainers…"
              className="bg-transparent outline-none py-1.5 w-full text-sm font-serif-body"
            />
          </label>
        </div>

        {frontPage ? (
          <>
            {/* Lead story + briefs */}
            <section className="grid md:grid-cols-[2fr_1fr] gap-8 py-8 border-b border-[var(--ink)]">
              <ArticleCard a={lead} size="lg" />
              <div className="md:border-l md:pl-8 border-[color-mix(in_oklch,var(--ink)_25%,transparent)] space-y-5">
                <p className="text-xs font-bold tracking-[.2em] uppercase border-b border-[var(--ink)] pb-1">In this edition</p>
                {sidebar.map((a) => (
                  <div key={a.slug} className="pb-5 border-b border-dashed border-[var(--rule)] last:border-0">
                    <ArticleCard a={a} size="sm" />
                  </div>
                ))}
              </div>
            </section>

            {Object.entries(CATEGORIES).map(([k, v]) => {
              const list = articles.filter((a) => a.cat === k && a !== lead);
              return (
                <section key={k} className="py-8 border-b border-[var(--ink)] last:border-0">
                  <div className="flex items-baseline justify-between gap-4 mb-6">
                    <h2 className="font-news font-black text-3xl md:text-4xl">{v.label}</h2>
                    <button onClick={() => setSection(k)} className="text-xs font-bold tracking-[.15em] uppercase hover:underline">
                      All {list.length + (lead.cat === k ? 1 : 0)} →
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
                    {list.slice(0, 8).map((a) => (
                      <ArticleCard key={a.slug} a={a} />
                    ))}
                  </div>
                </section>
              );
            })}

            {/* Full index, like the back page of a paper */}
            <section className="py-8">
              <h2 className="font-news font-black text-3xl md:text-4xl mb-1">The Index</h2>
              <p className="font-serif-body italic text-[var(--ink-soft)] mb-6">Every explainer in this edition, A to Z by section.</p>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 [column-rule:1px_solid_color-mix(in_oklch,var(--ink)_20%,transparent)]">
                {Object.entries(CATEGORIES).map(([k, v]) => (
                  <div key={k} className="break-inside-avoid mb-6">
                    <p className="kicker mb-2">{v.label}</p>
                    <ul className="space-y-1.5 font-serif-body text-[15px] leading-snug">
                      {articles
                        .filter((a) => a.cat === k)
                        .sort((x, y) => x.title.localeCompare(y.title))
                        .map((a) => (
                          <li key={a.slug}>
                            <Link to={`/explainers/${a.slug}`} className="hover:underline underline-offset-2">{a.title}</Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="py-8">
            <p className="text-xs tracking-[.15em] uppercase text-[var(--ink-soft)] mb-6">
              {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
              {cat !== 'all' && ` · ${CATEGORIES[cat].desk}`}
              {query.trim() && ` matching “${query.trim()}”`}
            </p>
            {filtered.length ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {filtered.map((a) => (
                  <ArticleCard key={a.slug} a={a} />
                ))}
              </div>
            ) : (
              <p className="font-serif-body italic py-10 text-center">
                No stories found. Try another word, or{' '}
                <button onClick={() => setSection('all')} className="underline">return to the front page</button>.
              </p>
            )}
          </section>
        )}
      </div>

      <p className="text-center text-xs tracking-[.15em] uppercase text-[var(--ink-soft)] mt-8">
        Read it, then prove it —{' '}
        <Link to="/quizzes" className="underline font-bold text-[var(--ink)]">take a science quiz</Link>
      </p>
    </div>
  );
}
