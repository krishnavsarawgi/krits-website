import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Timer } from 'lucide-react';
import articles, { bySlug, CATEGORIES } from '../data/articles/index.js';
import { quizForArticle } from '../data/related.js';
import { ArticleCard, VideoFigure, today } from '../components/News.jsx';
import useTitle from '../components/useTitle.js';
import ShareButton from '../components/Share.jsx';

// Body text uses blank lines between paragraphs and "## " for subheads.
function Body({ text, quote }) {
  const blocks = text.split(/\n\s*\n/).map((b) => b.trim());
  const middle = blocks.findIndex((b, i) => i > blocks.length / 2 && b.startsWith('## '));
  return (
    <div className="article-body news-columns font-serif-body text-[17px]">
      {blocks.map((b, i) => (
        <React.Fragment key={i}>
          {i === middle && quote && (
            <blockquote className="pull-quote my-6 py-4 border-y-2 border-[var(--ink)] font-news italic text-2xl leading-snug text-center">
              “{quote}”
            </blockquote>
          )}
          {b.startsWith('## ') ? <h2>{b.slice(3)}</h2> : <p>{b}</p>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Article() {
  const { slug } = useParams();
  const a = bySlug[slug];
  useTitle(a?.title);

  if (!a) {
    return (
      <div className="max-w-3xl mx-auto px-4 mt-16 text-center">
        <h1 className="font-news font-black text-4xl mb-4">Story not found</h1>
        <Link to="/explainers" className="btn btn-safety">Back to the front page</Link>
      </div>
    );
  }

  const sameDesk = articles.filter((x) => x.cat === a.cat);
  const i = sameDesk.indexOf(a);
  const prev = sameDesk[(i - 1 + sameDesk.length) % sameDesk.length];
  const next = sameDesk[(i + 1) % sameDesk.length];
  const more = [1, 2, 3, 4].map((k) => sameDesk[(i + k + 1) % sameDesk.length]).filter((x) => x !== a && x !== next);
  const quiz = quizForArticle(a);

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6 md:mt-10">
      <article className="newsprint px-4 md:px-12 py-6 md:py-10">
        {/* Paper header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--ink)] pb-2 mb-8">
          <Link to="/explainers" className="font-masthead text-2xl md:text-3xl leading-none hover:opacity-70">The KRITS Explainer</Link>
          <span className="text-[10px] md:text-xs tracking-[.15em] uppercase">{today()}</span>
        </div>

        <header className="max-w-4xl">
          <Link to={`/explainers?section=${a.cat}`} className="kicker hover:underline">{CATEGORIES[a.cat].desk}</Link>
          <h1 className="font-news font-black text-4xl sm:text-5xl md:text-6xl leading-[1.05] mt-3">{a.title}</h1>
          <p className="font-serif-body italic text-xl md:text-2xl text-[var(--ink-soft)] mt-4 leading-snug">{a.dek}</p>
        </header>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-y border-[var(--ink)] py-2 mt-6 mb-8 text-xs tracking-[.12em] uppercase">
          <span>By the <strong>KRITS Science Desk</strong></span>
          <span className="flex items-center gap-1"><Timer className="w-3.5 h-3.5" /> {a.readMins} min read</span>
          <ShareButton
            title={a.title}
            text={`${a.title} — ${a.dek}`}
            path={`/explainers/${a.slug}`}
            className="ml-auto flex items-center gap-1.5 py-2 font-bold tracking-[.12em] uppercase hover:underline"
          />
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-10">
          <div>
            <VideoFigure video={a.video} />
            <div className="mt-8">
              <Body text={a.body} quote={a.quote} />
            </div>
          </div>

          <aside className="space-y-8 lg:border-l lg:pl-8 border-[color-mix(in_oklch,var(--ink)_25%,transparent)]">
            <div className="blueprint border-2 border-[var(--ink)] p-5">
              <p className="text-[10px] font-bold tracking-[.2em] uppercase opacity-80">The key idea</p>
              <p className="font-type text-2xl mt-2 break-words">{a.key}</p>
            </div>

            {quiz && (
              <div className="sheet p-5 pt-7">
                <p className="text-[10px] font-bold tracking-[.2em] uppercase text-[var(--ink-soft)]">Test yourself</p>
                <p className="font-news font-bold text-xl leading-tight mt-1">{quiz.title}</p>
                <p className="text-sm mt-1 text-[var(--ink-soft)]">{quiz.items.length} answers · {Math.round(quiz.time / 60) || 1} min</p>
                <Link to={`/quizzes/${quiz.slug}`} className="btn btn-safety mt-4 !py-2 !px-4">Take the quiz</Link>
              </div>
            )}

            <div>
              <p className="text-xs font-bold tracking-[.2em] uppercase border-b border-[var(--ink)] pb-1 mb-4">More from the {CATEGORIES[a.cat].desk}</p>
              <div className="space-y-5">
                {more.map((x) => (
                  <div key={x.slug} className="pb-5 border-b border-dashed border-[var(--rule)] last:border-0">
                    <ArticleCard a={x} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <nav className="grid sm:grid-cols-2 gap-6 mt-12 pt-6 border-t-[3px] border-double border-[var(--ink)]">
          <Link to={`/explainers/${prev.slug}`} className="group">
            <p className="flex items-center gap-1 text-xs font-bold tracking-[.15em] uppercase"><ArrowLeft className="w-3.5 h-3.5" /> Previous</p>
            <p className="font-news font-bold text-lg leading-tight mt-1 group-hover:underline">{prev.title}</p>
          </Link>
          <Link to={`/explainers/${next.slug}`} className="group sm:text-right">
            <p className="flex items-center sm:justify-end gap-1 text-xs font-bold tracking-[.15em] uppercase">Next <ArrowRight className="w-3.5 h-3.5" /></p>
            <p className="font-news font-bold text-lg leading-tight mt-1 group-hover:underline">{next.title}</p>
          </Link>
        </nav>
      </article>
    </div>
  );
}
