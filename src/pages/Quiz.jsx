import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Flag, Play, RotateCcw, Shuffle } from 'lucide-react';
import quizzes, { quizBySlug, QUIZ_CATEGORIES, normalize } from '../data/quizzes/index.js';
import { loadBest, saveBest } from '../data/scores.js';
import useTitle from '../components/useTitle.js';

const clock = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

// When a typed answer is also the start of a longer answer ("Electron" vs
// "Electron neutrino"), wait this long for more typing before accepting it.
const PREFIX_WAIT_MS = 900;

function verdict(pct) {
  if (pct === 100) return 'Perfect score. Flawless.';
  if (pct >= 80) return 'Excellent — nearly all of them.';
  if (pct >= 50) return 'Solid effort. Review the misses and go again.';
  if (pct > 0) return 'A start! Read up and try again.';
  return 'Tough one. Check the answers and have another go.';
}

function Player({ quiz }) {
  const n = quiz.items.length;
  const [status, setStatus] = useState('ready'); // ready | playing | done
  const [found, setFound] = useState(() => new Set());
  const [timeLeft, setTimeLeft] = useState(quiz.time);
  const [input, setInput] = useState('');
  const [flashIdx, setFlashIdx] = useState(null);
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);
  const pending = useRef(null);
  const foundRef = useRef(found);
  foundRef.current = found;

  const finish = useCallback(
    (finalFound) => {
      clearTimeout(pending.current);
      setInput('');
      setStatus('done');
      const score = finalFound.size;
      const prev = loadBest()[quiz.slug];
      const isBest = saveBest(quiz.slug, score, n);
      setResult({ score, isBest: isBest && !!prev, prev });
    },
    [quiz.slug, n],
  );

  // Countdown.
  useEffect(() => {
    if (status !== 'playing') return;
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [status]);
  useEffect(() => {
    if (status === 'playing' && timeLeft <= 0) finish(foundRef.current);
  }, [timeLeft, status, finish]);

  const accept = (idx) => {
    clearTimeout(pending.current);
    const next = new Set(foundRef.current).add(idx);
    setFound(next);
    setInput('');
    setFlashIdx(idx);
    if (next.size === n) finish(next);
  };

  // Index of the first unanswered item accepting this text, or -1.
  const matchIndex = (text, have) => quiz.items.findIndex((it, i) => !have.has(i) && it.accepts.includes(text));

  const onChange = (value) => {
    setInput(value);
    clearTimeout(pending.current);
    const t = normalize(value);
    if (!t) return;
    const idx = matchIndex(t, foundRef.current);
    if (idx < 0) return;
    const longer = quiz.items.some(
      (it, i) => !foundRef.current.has(i) && i !== idx && it.accepts.some((a) => a.length > t.length && a.startsWith(t)),
    );
    if (!longer) return accept(idx);
    pending.current = setTimeout(() => {
      const again = matchIndex(normalize(inputRef.current?.value || ''), foundRef.current);
      if (again === idx) accept(idx);
    }, PREFIX_WAIT_MS);
  };

  const onKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    const idx = matchIndex(normalize(input), foundRef.current);
    if (idx >= 0) accept(idx);
  };

  const start = () => {
    setFound(new Set());
    setTimeLeft(quiz.time);
    setInput('');
    setResult(null);
    setFlashIdx(null);
    setStatus('playing');
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const score = found.size;
  const pct = Math.round((score / n) * 100);
  const best = useMemo(() => loadBest()[quiz.slug], [quiz.slug, status]);
  const sameCat = quizzes.filter((q) => q.cat === quiz.cat);
  const nextQuiz = sameCat[(sameCat.indexOf(quiz) + 1) % sameCat.length];

  const cellState = (i) => (found.has(i) ? 'hit' : status === 'done' ? 'miss' : 'blank');
  const answerText = (i, it) => (cellState(i) === 'blank' ? '' : it.answer);
  const answerClass = (i) =>
    cellState(i) === 'hit' ? 'font-bold' : cellState(i) === 'miss' ? 'font-bold text-[var(--stamp)]' : '';

  return (
    <>
      {/* Control bar */}
      <div className="sticky top-[58px] z-40 -mx-4 px-4 py-3 bg-[var(--paper)] border-b-2 border-[var(--ink)]">
        <div className="sheet p-3 md:p-4 flex flex-wrap items-center gap-3 md:gap-5">
          <label className="flex-1 min-w-[200px]">
            <span className="sr-only">Enter answer</span>
            <input
              ref={inputRef}
              value={input}
              disabled={status !== 'playing'}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder={status === 'playing' ? 'Type an answer…' : status === 'done' ? 'Quiz over' : 'Press Start to begin'}
              className="w-full bg-white/70 border-2 border-[var(--ink)] px-3 py-2.5 text-lg outline-none focus:border-[var(--blueprint)] disabled:opacity-60"
            />
          </label>
          <div className="flex items-center gap-5 font-stencil text-2xl tracking-wider">
            <span title="Score">{score}<span className="text-[var(--ink-soft)]">/{n}</span></span>
            <span title="Time left" className={status === 'playing' && timeLeft <= 15 ? 'text-[var(--stamp)]' : ''}>{clock(Math.max(0, timeLeft))}</span>
          </div>
          {status === 'playing' ? (
            <button onClick={() => finish(foundRef.current)} className="btn bg-[var(--card)] !py-2.5 hover:bg-[var(--rust)]">
              <Flag className="w-4 h-4" /> Give up
            </button>
          ) : (
            <button onClick={start} className="btn btn-safety !py-2.5">
              {status === 'done' ? <><RotateCcw className="w-4 h-4" /> Play again</> : <><Play className="w-4 h-4 fill-current" /> Start</>}
            </button>
          )}
        </div>
      </div>

      {status === 'done' && result && (
        <div className="blueprint border-2 border-[var(--ink)] shadow-[6px_6px_0_var(--ink)] p-6 md:p-8 mt-8 flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-[.2em] uppercase opacity-80">Final score</p>
            <p className="font-stencil text-5xl md:text-6xl mt-1">{result.score}/{n} <span className="text-3xl opacity-80">· {pct}%</span></p>
            <p className="font-type text-lg mt-2">{verdict(pct)}</p>
            {result.isBest && <p className="mt-2 text-sm font-bold tracking-[.1em] uppercase">★ New personal best (was {result.prev.score}/{n})</p>}
            {!result.isBest && result.prev && <p className="mt-2 text-sm opacity-80">Your best: {result.prev.score}/{n}</p>}
            {result.score < n && <p className="mt-2 text-sm opacity-90">Missed answers are shown in red below.</p>}
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={start} className="btn btn-safety"><RotateCcw className="w-4 h-4" /> Play again</button>
            <Link to={`/quizzes/${nextQuiz.slug}`} className="btn btn-ghost"><Shuffle className="w-4 h-4" /> Next quiz</Link>
          </div>
        </div>
      )}

      {/* Answer board */}
      <div className="mt-8">
        {quiz.mode === 'clue' ? (
          <div className={`grid gap-x-8 ${n > 10 ? 'md:grid-cols-2' : ''}`}>
            {[0, 1].map((col) => {
              const half = n > 10 ? Math.ceil(n / 2) : n;
              const rows = quiz.items.map((it, i) => [it, i]).slice(col * half, (col + 1) * half);
              if (!rows.length) return null;
              return (
                <table key={col} className="w-full border-2 border-[var(--ink)] bg-[var(--card)] mb-6 md:mb-0 self-start">
                  <thead>
                    <tr className="bg-[var(--ink)] text-[var(--paper)] text-xs tracking-[.15em] uppercase">
                      <th className="text-left px-3 py-2 w-1/2">{quiz.clueLabel}</th>
                      <th className="text-left px-3 py-2">{quiz.answerLabel}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(([it, i]) => (
                      <tr key={i} className={`border-t border-[var(--rule)] ${flashIdx === i ? 'flash' : ''}`}>
                        <td className="px-3 py-2 align-top text-[15px]">{it.clue}</td>
                        <td className={`px-3 py-2 align-top border-l border-[var(--rule)] ${answerClass(i)}`}>{answerText(i, it)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {quiz.items.map((it, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 border-2 border-[var(--ink)] bg-[var(--card)] px-3 py-3 min-h-[52px] ${flashIdx === i ? 'flash' : ''}`}
              >
                <span className="text-xs text-[var(--ink-soft)] w-5 shrink-0">{i + 1}</span>
                <span className={answerClass(i)}>{answerText(i, it)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {status === 'ready' && best && (
        <p className="mt-6 text-sm text-[var(--ink-soft)]">Your best on this quiz: {best.score}/{best.total}.</p>
      )}
    </>
  );
}

export default function Quiz() {
  const { slug } = useParams();
  const quiz = quizBySlug[slug];
  useTitle(quiz && `${quiz.title} Quiz`);

  if (!quiz) {
    return (
      <div className="max-w-3xl mx-auto px-4 mt-16 text-center">
        <h1 className="font-stencil text-4xl mb-4">QUIZ NOT FOUND</h1>
        <Link to="/quizzes" className="btn btn-safety">All quizzes</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <header className="mt-8 md:mt-10 mb-6">
        <Link to="/quizzes" className="text-xs font-bold tracking-[.15em] uppercase hover:underline">← All quizzes</Link>
        <div className="flex items-center gap-3 mt-4">
          <span className="tag">{QUIZ_CATEGORIES[quiz.cat].toUpperCase()}</span>
          <span className="text-xs tracking-[.15em] uppercase text-[var(--ink-soft)]">
            {quiz.items.length} answers · {clock(quiz.time)}
          </span>
        </div>
        <h1 className="font-stencil text-4xl md:text-5xl tracking-wide uppercase mt-3">{quiz.title}</h1>
        <p className="mt-2 text-lg">{quiz.desc}</p>
        <p className="mt-1 text-sm text-[var(--ink-soft)]">
          Answers fill in automatically as you type them — no need to press Enter. Spelling counts; common alternatives are accepted.
        </p>
      </header>
      {/* key resets all game state when moving between quizzes */}
      <Player key={quiz.slug} quiz={quiz} />
    </div>
  );
}
