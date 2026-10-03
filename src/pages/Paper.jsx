import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, Copy, FileDown } from 'lucide-react';
import { paperById, JOURNAL, ARTICLE_TYPES, SUBJECTS, formatDate, citation } from '../data/research.js';
import ShareButton from '../components/Share.jsx';
import useTitle from '../components/useTitle.js';

// Same text format as the explainers: blank lines between paragraphs, "## " for headings.
function Body({ text }) {
  return (
    <div className="article-body font-serif-body text-[17px]">
      {text.split(/\n\s*\n/).map((b, i) => {
        const t = b.trim();
        return t.startsWith('## ') ? <h2 key={i}>{t.slice(3)}</h2> : <p key={i}>{t}</p>;
      })}
    </div>
  );
}

function CiteBox({ p }) {
  const [copied, setCopied] = useState(false);
  const text = citation(p, window.location.origin);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this citation:', text);
    }
  };
  return (
    <div className="sheet p-5 pt-7">
      <p className="text-[10px] font-bold tracking-[.2em] uppercase text-[var(--ink-soft)]">Cite this article</p>
      <p className="font-serif-body text-sm leading-relaxed mt-2 break-words">{text}</p>
      <button type="button" onClick={copy} className="mt-3 flex items-center gap-1.5 py-2 text-xs font-bold tracking-[.15em] uppercase hover:underline">
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copied ? 'Copied' : 'Copy citation'}
      </button>
    </div>
  );
}

export default function Paper() {
  const { id } = useParams();
  const p = paperById[id];
  useTitle(p?.title || 'Paper not found');

  if (!p) {
    return (
      <div className="max-w-3xl mx-auto px-4 mt-16 text-center">
        <h1 className="font-news font-black text-4xl mb-4">Paper not found</h1>
        <Link to="/research" className="btn btn-safety">Back to {JOURNAL.name}</Link>
      </div>
    );
  }

  // Number each distinct affiliation, as journals do.
  const affiliations = [...new Set(p.authors.map((a) => a.affiliation).filter(Boolean))];

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6 md:mt-10">
      <article className="newsprint px-4 md:px-12 py-6 md:py-10">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--ink)] pb-2 mb-8">
          <Link to="/research" className="font-news font-black text-xl md:text-2xl leading-none hover:opacity-70">{JOURNAL.name}</Link>
          <span className="text-[10px] md:text-xs tracking-[.15em] uppercase">
            Vol. {JOURNAL.volume} · Article {p.id}
          </span>
        </div>

        <header className="max-w-4xl">
          <p className="kicker">
            {ARTICLE_TYPES[p.type]} · {SUBJECTS[p.subject]} · Open access
          </p>
          <h1 className="font-news font-black text-3xl sm:text-4xl md:text-5xl leading-[1.1] mt-3">{p.title}</h1>
          <p className="font-serif-body text-lg mt-5">
            {p.authors.map((a, i) => (
              <span key={a.name}>
                {a.name}
                {a.affiliation && <sup className="ml-0.5">{affiliations.indexOf(a.affiliation) + 1}</sup>}
                {i < p.authors.length - 1 && ', '}
              </span>
            ))}
          </p>
          <ol className="mt-2 text-sm font-serif-body text-[var(--ink-soft)] space-y-0.5">
            {affiliations.map((a, i) => (
              <li key={a}>
                <sup>{i + 1}</sup> {a}
              </li>
            ))}
          </ol>
        </header>

        <dl className="flex flex-wrap gap-x-8 gap-y-2 border-y border-[var(--ink)] py-3 mt-6 mb-8 text-xs tracking-[.12em] uppercase">
          {[
            ['Received', p.received],
            ['Accepted', p.accepted],
            ['Published', p.published],
          ]
            .filter(([, d]) => d)
            .map(([k, d]) => (
              <div key={k}>
                <dt className="text-[var(--ink-soft)]">{k}</dt>
                <dd className="font-bold mt-0.5">{formatDate(d)}</dd>
              </div>
            ))}
        </dl>

        <div className="grid lg:grid-cols-[1fr_300px] gap-10">
          <div className="min-w-0">
            <section className="border-l-4 border-[var(--blueprint)] bg-[color-mix(in_oklch,var(--blueprint)_6%,transparent)] px-5 py-4">
              <h2 className="text-xs font-bold tracking-[.2em] uppercase">Abstract</h2>
              <p className="font-serif-body text-[17px] leading-relaxed mt-2">{p.abstract}</p>
              {p.keywords?.length > 0 && (
                <p className="mt-4 text-sm font-serif-body">
                  <span className="font-bold not-italic">Keywords: </span>
                  {p.keywords.join(' · ')}
                </p>
              )}
            </section>

            {p.body && (
              <div className="mt-10">
                <Body text={p.body} />
              </div>
            )}

            {p.references?.length > 0 && (
              <section className="mt-10 pt-6 border-t-[3px] border-double border-[var(--ink)]">
                <h2 className="text-xs font-bold tracking-[.2em] uppercase">References</h2>
                <ol className="mt-4 space-y-2 font-serif-body text-[15px] leading-relaxed list-decimal pl-6 marker:text-[var(--ink-soft)]">
                  {p.references.map((r) => <li key={r} className="break-words">{r}</li>)}
                </ol>
              </section>
            )}
          </div>

          <aside className="space-y-6 lg:border-l lg:pl-8 border-[color-mix(in_oklch,var(--ink)_25%,transparent)]">
            {p.pdf && (
              <a href={p.pdf} target="_blank" rel="noreferrer" className="btn btn-safety w-full justify-center">
                <FileDown className="w-4 h-4" /> Download PDF
              </a>
            )}
            <CiteBox p={p} />
            <div className="text-sm font-serif-body space-y-3">
              <p>
                <span className="text-[10px] font-bold tracking-[.2em] uppercase text-[var(--ink-soft)] block">Licence</span>
                Published open access under {JOURNAL.licence}. Authors keep the copyright.
              </p>
              <p>
                <span className="text-[10px] font-bold tracking-[.2em] uppercase text-[var(--ink-soft)] block">Review</span>
                Reviewed and accepted by the editor of {JOURNAL.name}.
              </p>
            </div>
            <ShareButton
              title={p.title}
              text={`${p.title} — ${JOURNAL.name}`}
              path={`/research/${p.id}`}
              label="Share this paper"
              className="btn bg-[var(--card)] w-full justify-center"
            />
            <Link to="/research/submit" className="block text-xs font-bold tracking-[.15em] uppercase underline underline-offset-4 py-2">
              Submit your own research →
            </Link>
          </aside>
        </div>
      </article>
    </div>
  );
}
