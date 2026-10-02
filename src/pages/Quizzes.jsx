import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Timer, ListChecks, Trophy } from 'lucide-react';
import quizzes, { QUIZ_CATEGORIES } from '../data/quizzes/index.js';
import { pickOfTheDay } from '../data/related.js';
import { loadBest } from '../data/scores.js';
import { Rivet, AtomBlueprint } from '../components/Blueprint.jsx';
import useTitle from '../components/useTitle.js';

const mins = (s) => (s < 60 ? `${s}s` : `${Math.round(s / 60)} min`);

function QuizCard({ q, best }) {
  const pct = best ? Math.round((best.score / best.total) * 100) : null;
  return (
    <Link to={`/quizzes/${q.slug}`} className="sheet group flex flex-col p-5 pt-7 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--ink)] transition-all">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[10px] font-bold tracking-[.2em] uppercase text-[var(--ink-soft)]">{QUIZ_CATEGORIES[q.cat]}</span>
        {pct !== null && (
          <span className={`text-[10px] font-bold tracking-[.12em] px-1.5 py-0.5 border-2 border-[var(--ink)] ${pct === 100 ? 'bg-[var(--safety)]' : 'bg-[var(--card)]'}`}>
            BEST {pct}%
          </span>
        )}
      </div>
      <h3 className="font-stencil text-xl tracking-wide uppercase leading-tight group-hover:text-[var(--blueprint)]">{q.title}</h3>
      <p className="text-sm mt-2 leading-snug flex-1">{q.desc}</p>
      <div className="flex gap-4 mt-4 pt-3 border-t-2 border-dashed border-[var(--rule)] text-xs font-bold tracking-[.1em] uppercase">
        <span className="flex items-center gap-1"><ListChecks className="w-3.5 h-3.5" /> {q.items.length}</span>
        <span className="flex items-center gap-1"><Timer className="w-3.5 h-3.5" /> {mins(q.time)}</span>
      </div>
    </Link>
  );
}

export default function Quizzes() {
  const [cat, setCat] = useState('all');
  useTitle('Science Quizzes');
  const [query, setQuery] = useState('');
  const best = useMemo(loadBest, []);
  const daily = useMemo(() => pickOfTheDay(quizzes, 'quiz'), []);
  const played = Object.keys(best).length;
  const perfect = Object.values(best).filter((b) => b.score === b.total).length;

  const list = quizzes.filter(
    (q) =>
      (cat === 'all' || q.cat === cat) &&
      (!query.trim() || `${q.title} ${q.desc}`.toLowerCase().includes(query.trim().toLowerCase())),
  );

  return (
    <div className="max-w-6xl mx-auto px-4">
      <section className="blueprint relative mt-6 md:mt-10 border-2 border-[var(--ink)] px-6 py-10 md:px-12 md:py-14 overflow-hidden">
        <Rivet className="top-3 left-3" />
        <Rivet className="top-3 right-3" />
        <Rivet className="bottom-3 left-3" />
        <Rivet className="bottom-3 right-3" />
        <div className="absolute -right-10 -bottom-10 w-72 opacity-20 hidden md:block pointer-events-none">
          <AtomBlueprint />
        </div>
        <div className="relative grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <p className="text-xs font-bold tracking-[.25em] uppercase opacity-80">The quiz room</p>
            <h1 className="font-stencil text-5xl md:text-7xl tracking-wider mt-2">QUIZZES</h1>
            <p className="font-type text-xl md:text-2xl mt-4">Type the answers. Beat the clock.</p>
            <p className="mt-3 max-w-lg opacity-90 leading-relaxed">
              {quizzes.length} science quizzes and {quizzes.reduce((n, q) => n + q.items.length, 0)} answers. Start a quiz, type
              what you know, and every correct answer fills in the moment you type it.
            </p>
            {played > 0 && (
              <p className="mt-4 flex items-center gap-2 text-sm font-bold tracking-[.1em] uppercase">
                <Trophy className="w-4 h-4" /> You’ve played {played} · {perfect} perfect
              </p>
            )}
          </div>
          <div className="paper bg-[var(--card)] text-[var(--ink)] border-2 border-[var(--ink)] shadow-[6px_6px_0_var(--ink)] p-5">
            <span className="tag">QUIZ OF THE DAY</span>
            <h2 className="font-stencil text-2xl uppercase mt-3 leading-tight">{daily.title}</h2>
            <p className="text-sm mt-1">{daily.desc}</p>
            <Link to={`/quizzes/${daily.slug}`} className="btn btn-safety mt-4">Play now</Link>
          </div>
        </div>
      </section>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-12 mb-8">
        <div className="flex flex-wrap gap-2">
          {[['all', 'All'], ...Object.entries(QUIZ_CATEGORIES)].map(([k, label]) => (
            <button
              key={k}
              onClick={() => setCat(k)}
              className={`text-xs font-bold tracking-[.12em] uppercase px-3 py-1.5 border-2 border-[var(--ink)] ${
                cat === k ? 'bg-[var(--ink)] text-[var(--paper)]' : 'paper bg-[var(--card)] hover:bg-[var(--safety)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 border-b-2 border-[var(--ink)] md:w-64">
          <Search className="w-4 h-4 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a quiz…"
            className="bg-transparent outline-none py-1.5 w-full text-sm"
          />
        </label>
      </div>

      {list.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((q) => (
            <QuizCard key={q.slug} q={q} best={best[q.slug]} />
          ))}
        </div>
      ) : (
        <p className="text-center py-16">No quizzes match that search.</p>
      )}
    </div>
  );
}
