import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Timer, ListChecks } from 'lucide-react';
import articles from '../data/articles/index.js';
import quizzes, { QUIZ_CATEGORIES } from '../data/quizzes/index.js';
import { pickOfTheDay } from '../data/related.js';
import { Rivet, AtomBlueprint, CarBlueprint, SectionHeader } from '../components/Blueprint.jsx';
import { ArticleCard, today } from '../components/News.jsx';
import useTitle from '../components/useTitle.js';

export default function Home() {
  useTitle();
  const lead = useMemo(() => pickOfTheDay(articles, 'lead'), []);
  const briefs = useMemo(() => {
    const picks = ['chemistry', 'space', 'life'].map((c) => pickOfTheDay(articles.filter((a) => a.cat === c && a !== lead), `home-${c}`));
    return picks;
  }, [lead]);
  const daily = useMemo(() => pickOfTheDay(quizzes, 'quiz'), []);
  const featuredQuizzes = useMemo(() => {
    const cats = Object.keys(QUIZ_CATEGORIES);
    return cats.map((c) => pickOfTheDay(quizzes.filter((q) => q.cat === c && q !== daily), `home-${c}`)).slice(0, 6);
  }, [daily]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero */}
      <section className="blueprint relative mt-6 md:mt-10 border-2 border-[var(--ink)] px-5 py-10 sm:px-6 sm:py-14 md:px-14 md:py-20 overflow-hidden">
        <Rivet className="top-3 left-3" />
        <Rivet className="top-3 right-3" />
        <Rivet className="bottom-3 left-3" />
        <Rivet className="bottom-3 right-3" />
        <div className="absolute right-6 md:right-14 top-1/2 -translate-y-1/2 w-[340px] opacity-30 hidden lg:block pointer-events-none">
          <AtomBlueprint />
        </div>
        <div className="relative max-w-2xl">
          <h1 className="inline-block font-stencil text-5xl sm:text-6xl md:text-8xl tracking-[.2em] sm:tracking-[.25em] border-2 border-current px-4 sm:px-6 py-2 bg-white/5">KRITS</h1>
          <p className="font-type text-2xl md:text-4xl mt-6 sm:mt-8 leading-tight">Science, explained.<br />Then tested.</p>
          <p className="max-w-xl mt-5 leading-relaxed opacity-90">
            {articles.length} short explainers on physics, chemistry, space, Earth and life, each paired with the best video on
            the topic, and {quizzes.length} type-the-answer quizzes to see what stuck.
          </p>
          <div className="cta-row flex flex-wrap gap-3 sm:gap-4 mt-8 sm:mt-10">
            <Link to="/explainers" className="btn btn-safety">Read the explainers</Link>
            <Link to="/quizzes" className="btn btn-ghost">Take a quiz</Link>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="blueprint grid grid-cols-3 border-2 border-t-0 border-[var(--ink)] shadow-[6px_6px_0_var(--shadow)]">
        {[
          [articles.length, 'Explainers'],
          [quizzes.length, 'Quizzes'],
          [quizzes.reduce((n, q) => n + q.items.length, 0), 'Answers to find'],
        ].map(([num, label], i) => (
          <div key={label} className={`text-center py-6 px-2 ${i ? 'border-l-2 border-white/20' : ''}`}>
            <p className="font-stencil text-3xl md:text-5xl">{num}</p>
            <p className="mt-1 text-[10px] md:text-xs tracking-[.2em] uppercase opacity-90">{label}</p>
          </div>
        ))}
      </section>

      {/* Today's paper */}
      <section className="pt-16 md:pt-24">
        <SectionHeader number="01" title="Today’s front page" subtitle="A fresh lead story every day. Read the article, then watch the video." />
        <div className="newsprint px-4 md:px-8 py-6">
          <div className="flex flex-wrap items-end justify-between gap-2 border-b-[3px] border-double border-[var(--ink)] pb-2 mb-6">
            <Link to="/explainers" className="font-masthead text-3xl md:text-5xl leading-none hover:opacity-70">The KRITS Explainer</Link>
            <span className="text-[10px] md:text-xs tracking-[.15em] uppercase">{today()}</span>
          </div>
          <div className="grid md:grid-cols-[2fr_1fr] gap-8">
            <ArticleCard a={lead} size="lg" />
            <div className="md:border-l md:pl-8 border-[color-mix(in_oklch,var(--ink)_25%,transparent)] space-y-6">
              {briefs.map((a) => (
                <div key={a.slug} className="pb-6 border-b border-dashed border-[var(--rule)] last:border-0">
                  <ArticleCard a={a} size="sm" />
                </div>
              ))}
              <Link to="/explainers" className="btn btn-safety w-full justify-center">Read all {articles.length} →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quizzes */}
      <section className="pt-16 md:pt-24">
        <SectionHeader number="02" title="The quiz room" subtitle="Type answers against the clock. Every correct one fills in instantly." />
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
          <div className="blueprint border-2 border-[var(--ink)] shadow-[6px_6px_0_var(--shadow)] p-6 flex flex-col">
            <span className="tag self-start">QUIZ OF THE DAY</span>
            <h3 className="font-stencil text-3xl uppercase mt-4 leading-tight">{daily.title}</h3>
            <p className="mt-2 opacity-90 flex-1">{daily.desc}</p>
            <div className="flex gap-4 mt-4 text-xs font-bold tracking-[.1em] uppercase opacity-90">
              <span className="flex items-center gap-1"><ListChecks className="w-3.5 h-3.5" /> {daily.items.length} answers</span>
              <span className="flex items-center gap-1"><Timer className="w-3.5 h-3.5" /> {Math.round(daily.time / 60) || 1} min</span>
            </div>
            <Link to={`/quizzes/${daily.slug}`} className="btn btn-safety mt-6 self-start">Play now</Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {featuredQuizzes.map((q) => (
              <Link key={q.slug} to={`/quizzes/${q.slug}`} className="sheet press p-4 pt-6 group hover:bg-[var(--safety)] transition-colors">
                <p className="text-[10px] font-bold tracking-[.2em] uppercase text-[var(--ink-soft)]">{QUIZ_CATEGORIES[q.cat]}</p>
                <p className="font-stencil text-lg uppercase leading-tight mt-1">{q.title}</p>
                <p className="text-xs mt-1">{q.items.length} answers · {Math.round(q.time / 60) || 1} min</p>
              </Link>
            ))}
          </div>
        </div>
        <p className="mt-8 text-center">
          <Link to="/quizzes" className="text-sm font-bold tracking-[.15em] uppercase underline underline-offset-4">Browse all {quizzes.length} quizzes →</Link>
        </p>
      </section>

      {/* Kits */}
      <section className="pt-16 md:pt-24">
        <SectionHeader number="03" title="Build it with your hands" subtitle="KRITS started as DIY engineering kits — and still makes them." />
        <div className="sheet p-6 md:p-10 grid md:grid-cols-[1fr_1.2fr] gap-10 items-center">
          <div className="blueprint border-2 border-[var(--ink)] aspect-[4/3] p-6">
            <CarBlueprint />
          </div>
          <div className="space-y-4 leading-relaxed">
            <p>
              Reading about science is a start. Building something that actually rolls is better. KRITS assembles Meccano-style
              construction kits by hand and donates them to NGOs and schools, so more children get to do engineering, not just
              read about it.
            </p>
            <p>45 kits delivered so far to children at Ek Prayas, with a crane kit in design.</p>
            <div className="cta-row flex flex-wrap gap-3 sm:gap-4 pt-2">
              <Link to="/kits" className="btn btn-safety">See the kits</Link>
              <Link to="/kits#founder" className="btn bg-[var(--card)] hover:bg-[var(--kraft)]">Meet the founder</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
