import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenCheck, FileSearch, FilePen, MessageSquareText, Search, Send, Unlock, BadgeCheck, Link2, IndianRupee } from 'lucide-react';
import papers, { JOURNAL, ARTICLE_TYPES, SUBJECTS, formatDate } from '../data/research.js';
import { Rivet, SectionHeader } from '../components/Blueprint.jsx';
import useTitle from '../components/useTitle.js';

const STEPS = [
  { icon: Send, title: 'Submit', text: 'Email your paper to the editor as one PDF. Only the editor can publish to the journal.' },
  { icon: FileSearch, title: 'Editorial check', text: 'The editor checks scope, originality and plagiarism, and that the methods are described clearly enough to repeat.' },
  { icon: MessageSquareText, title: 'Review', text: 'The paper is read closely, sometimes with help from a subject teacher or specialist. You get written comments.' },
  { icon: FilePen, title: 'Revise', text: 'You answer the comments and send a revised version. Most accepted papers go through at least one round.' },
  { icon: BookOpenCheck, title: 'Publish', text: 'Accepted papers get a permanent page, an article ID, a ready-made citation and a downloadable PDF.' },
];

const PERKS = [
  { icon: IndianRupee, title: 'No fees', text: 'Free to submit, free to publish.' },
  { icon: Unlock, title: 'Open access', text: `Free to read, licensed ${JOURNAL.licence}.` },
  { icon: Link2, title: 'Permanent link', text: 'Every paper keeps the same URL and ID.' },
  { icon: BadgeCheck, title: 'Editor-reviewed', text: 'Nothing is published without review.' },
];

export function authorLine(p) {
  return p.authors.map((a) => a.name).join(', ');
}

function PaperRow({ p, lead }) {
  return (
    <article className="py-6 border-b border-[var(--rule)] last:border-0">
      <p className="kicker">
        {ARTICLE_TYPES[p.type]} · {SUBJECTS[p.subject]}
      </p>
      <h3 className={`font-news font-bold leading-snug mt-1.5 ${lead ? 'text-2xl md:text-4xl font-black leading-tight' : 'text-xl md:text-2xl'}`}>
        <Link to={`/research/${p.id}`} className="hover:underline underline-offset-4 decoration-1">{p.title}</Link>
      </h3>
      <p className="font-serif-body mt-2">
        {authorLine(p)}
        {p.authors[0]?.affiliation && <span className="text-[var(--ink-soft)]"> · {p.authors[0].affiliation}</span>}
      </p>
      <p className={`font-serif-body text-[var(--ink-soft)] mt-2 leading-relaxed ${lead ? 'text-base md:text-lg line-clamp-4' : 'text-[15px] line-clamp-3'}`}>{p.abstract}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <Link to={`/research/${p.id}`} className={lead ? 'btn btn-safety !py-2.5' : 'text-xs font-bold tracking-[.15em] uppercase underline underline-offset-4 py-2'}>
          Read the paper →
        </Link>
        {p.pdf && (
          <a href={p.pdf} target="_blank" rel="noreferrer" className="text-xs font-bold tracking-[.15em] uppercase underline underline-offset-4 py-2">
            PDF
          </a>
        )}
        <span className="text-[11px] tracking-[.12em] uppercase text-[var(--ink-soft)]">
          {formatDate(p.published)} · ID {p.id}
        </span>
      </div>
    </article>
  );
}

export default function Research() {
  useTitle('Research');
  const [subject, setSubject] = useState('all');
  const [query, setQuery] = useState('');
  const sorted = useMemo(() => [...papers].sort((a, b) => b.published.localeCompare(a.published)), []);
  const list = sorted.filter((p) => {
    const q = query.trim().toLowerCase();
    const text = `${p.title} ${p.abstract} ${authorLine(p)} ${(p.keywords || []).join(' ')}`.toLowerCase();
    return (subject === 'all' || p.subject === subject) && (!q || text.includes(q));
  });

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Masthead and table of contents first, so readers land on the papers. */}
      <section id="papers" className="newsprint mt-6 md:mt-10 px-4 md:px-10 py-6 md:py-8">
        <header>
          <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] md:text-xs tracking-[.15em] uppercase border-b border-[var(--ink)] pb-2">
            <span>Vol. {JOURNAL.volume} · {JOURNAL.year}</span>
            <span className="hidden sm:inline">Open access · Editor-reviewed</span>
            <span>{papers.length} {papers.length === 1 ? 'paper' : 'papers'}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 py-5 md:py-6">
            <div>
              <h1 className="font-news font-black text-4xl sm:text-5xl md:text-6xl leading-none">{JOURNAL.name}</h1>
              <p className="font-news italic text-lg md:text-xl mt-2 text-[var(--ink-soft)]">{JOURNAL.tagline}</p>
            </div>
            <Link to="/research/submit" className="btn btn-safety shrink-0 justify-center">Submit a paper</Link>
          </div>
          <div className="rule-double" />
        </header>

        {papers.length > 3 && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-3 border-b border-[var(--ink)]">
            <div className="swipe-row flex md:flex-wrap gap-x-5 gap-y-2 overflow-x-auto md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0 text-xs font-bold tracking-[.15em] uppercase">
              {[['all', 'All subjects'], ...Object.entries(SUBJECTS)].map(([k, label]) => (
                <button
                  key={k}
                  onClick={() => setSubject(k)}
                  className={`shrink-0 whitespace-nowrap py-2.5 md:py-0 underline-offset-4 ${subject === k ? 'underline decoration-2 text-[var(--stamp)]' : 'hover:underline'}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 border-b-2 border-[var(--ink)] md:w-64 shrink-0">
              <Search className="w-4 h-4 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search titles, authors, keywords…"
                className="bg-transparent outline-none py-2.5 md:py-1.5 w-full text-sm font-serif-body"
              />
            </label>
          </div>
        )}

        {list.length ? (
          <div>
            <p className="text-xs font-bold tracking-[.2em] uppercase pt-5">Latest papers</p>
            {list.map((p, i) => <PaperRow key={p.id} p={p} lead={i === 0 && subject === 'all' && !query.trim()} />)}
          </div>
        ) : papers.length ? (
          <p className="font-serif-body italic py-12 text-center">No papers match that search.</p>
        ) : (
          <div className="py-14 md:py-20 text-center max-w-lg mx-auto">
            <p className="kicker">Volume {JOURNAL.volume} · In preparation</p>
            <h3 className="font-news font-black text-3xl md:text-4xl mt-3 leading-tight">The first issue is being assembled.</h3>
            <p className="font-serif-body text-[var(--ink-soft)] mt-4 leading-relaxed">
              Papers will appear here as they are reviewed and accepted. Got an experiment, a data set or an idea you've
              tested? Yours could be one of the first.
            </p>
            <Link to="/research/submit" className="btn btn-safety mt-8">Submit a paper</Link>
          </div>
        )}
      </section>

      {/* Call for papers */}
      <section className="pt-16 md:pt-24">
        <SectionHeader number="01" title="Publish with us" subtitle="Original experiments, observations and analyses by students." />
        <div className="blueprint relative border-2 border-[var(--ink)] px-5 py-8 sm:px-6 md:px-12 md:py-12 overflow-hidden">
          <Rivet className="top-3 left-3" />
          <Rivet className="top-3 right-3" />
          <Rivet className="bottom-3 left-3" />
          <Rivet className="bottom-3 right-3" />
          <div className="relative grid lg:grid-cols-[1.5fr_1fr] gap-10 items-center">
            <div>
              <p className="font-news italic text-2xl md:text-3xl leading-snug">Your experiment deserves a permanent, citable home.</p>
              <p className="max-w-xl mt-4 leading-relaxed opacity-90">
                Every submission is read by the editor, and only accepted papers are published here, each with a permanent
                link and a citation you can put on your CV.
              </p>
              <div className="cta-row flex flex-wrap gap-3 sm:gap-4 mt-8">
                <Link to="/research/submit" className="btn btn-safety">Submit a paper</Link>
                <Link to="/research/submit#guidelines" className="btn btn-ghost">Author guidelines</Link>
              </div>
            </div>
            <div className="paper bg-[var(--card)] border-2 border-[var(--ink)] shadow-[6px_6px_0_var(--shadow)] p-5 md:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="tag">CALL FOR PAPERS</span>
                <span className="flex items-center gap-1.5 text-xs font-bold tracking-[.15em] uppercase">
                  <span className="w-2 h-2 rounded-full bg-[oklch(62%_.17_150)] shadow-[0_0_0_3px_oklch(62%_.17_150/.25)]" /> Open
                </span>
              </div>
              <h2 className="font-news font-bold text-2xl mt-4 leading-tight">Volume {JOURNAL.volume} ({JOURNAL.year})</h2>
              <p className="font-serif-body text-[15px] mt-2 text-[var(--ink-soft)]">
                Accepting original research, reviews and short communications in:
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-sm font-serif-body">
                {Object.values(SUBJECTS).map((s) => (
                  <li key={s} className="before:content-['▪'] before:mr-1.5 before:text-[var(--stamp)]">{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="blueprint grid grid-cols-2 md:grid-cols-4 border-2 border-t-0 border-[var(--ink)] shadow-[6px_6px_0_var(--shadow)]">
          {PERKS.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className={`p-4 md:p-6 ${i % 2 ? 'border-l-2' : ''} ${i > 1 ? 'border-t-2 md:border-t-0' : ''} ${i === 2 ? 'md:border-l-2' : ''} border-white/15`}>
              <Icon className="w-5 h-5 text-[var(--safety)]" />
              <p className="font-bold text-sm tracking-[.12em] uppercase mt-2">{title}</p>
              <p className="text-xs md:text-sm mt-1 opacity-85 leading-snug">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="pt-16 md:pt-24">
        <SectionHeader number="02" title="From submission to publication" subtitle="How a paper makes it into the journal." />
        <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="sheet p-5 pt-7 flex flex-col">
              <div className="flex items-center gap-3">
                <span className="blueprint w-10 h-10 grid place-items-center border-2 border-[var(--ink)] shrink-0">
                  <Icon className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-[10px] tracking-[.2em] text-[var(--ink-soft)]">STAGE 0{i + 1}</p>
                  <h3 className="font-stencil text-lg uppercase leading-none mt-0.5">{title}</h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed mt-3">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Scope & editorial */}
      <section className="pt-16 md:pt-24">
        <SectionHeader number="03" title="Scope & editorial board" />
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
          <div className="newsprint px-5 md:px-8 py-6 md:py-8">
            <p className="kicker">What we publish</p>
            <dl className="mt-4 divide-y divide-[var(--rule)]">
              {[
                ['Original Research', 'A new experiment, survey, model or analysis, with methods, results and discussion. Up to 5,000 words.'],
                ['Review', 'A careful summary of what is known about a question, built on cited sources. Up to 4,000 words.'],
                ['Short Communication', 'One clear finding or observation, written up briefly. Up to 1,500 words.'],
              ].map(([t, d]) => (
                <div key={t} className="py-4 first:pt-0 last:pb-0">
                  <dt className="font-news font-bold text-xl">{t}</dt>
                  <dd className="font-serif-body text-[15px] text-[var(--ink-soft)] mt-1 leading-relaxed">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="sheet p-5 md:p-8 pt-8">
            <p className="text-[10px] font-bold tracking-[.2em] uppercase text-[var(--ink-soft)]">Editor-in-chief</p>
            <p className="font-news font-bold text-2xl mt-1">{JOURNAL.editor}</p>
            <p className="font-serif-body text-[15px] text-[var(--ink-soft)]">The Doon School, Dehradun</p>
            <p className="font-serif-body text-[15px] mt-4 leading-relaxed">
              The editor makes the final decision on every submission. Papers outside the editor's expertise are read with help
              from subject teachers and specialists.
            </p>
            <Link to="/research/submit" className="btn btn-safety mt-6 w-full justify-center">Submit a paper</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
