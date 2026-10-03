import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { upload } from '@vercel/blob/client';
import { Check, FileText, Lock, UploadCloud, X } from 'lucide-react';
import { JOURNAL, SUBJECTS } from '../data/research.js';
import { EMAIL } from '../components/Layout.jsx';
import useTitle from '../components/useTitle.js';

const MAX_MB = 20;
const ABSTRACT_MAX = 250;

// Everything the editor needs has to be inside the PDF.
const CHECKLIST = [
  'Title of the paper',
  'Every author’s full name and school or institution',
  'An email address the editor can reply to',
  `Abstract (≤ ${ABSTRACT_MAX} words) and 3–6 keywords`,
  'The full paper, with figures, tables and references',
  'A line confirming it is your own original work, not published elsewhere, with any AI use described',
];

const GUIDELINES = [
  {
    id: 'scope',
    title: 'Scope',
    body: [
      `${JOURNAL.name} publishes original science by school and early university students: experiments, field observations, surveys, simulations, data analyses and careful reviews.`,
      `Subjects: ${Object.values(SUBJECTS).join(', ')}.`,
    ],
  },
  {
    id: 'types',
    title: 'Article types',
    body: [
      'Original Research: up to 5,000 words. Introduction, Methods, Results, Discussion, Conclusion.',
      'Review: up to 4,000 words. A critical summary of existing work on one question, built on cited sources.',
      'Short Communication: up to 1,500 words. One clear finding, briefly reported.',
      'Word limits exclude the abstract, references, figure captions and tables.',
    ],
  },
  {
    id: 'format',
    title: 'Preparing the PDF',
    body: [
      `Submit one PDF, up to ${MAX_MB} MB. It must contain everything: a title page, the abstract, the full paper and references.`,
      'On the title page, give every author’s full name and school or institution, and an email address for the corresponding author.',
      'Number every figure and table, give each a caption, and refer to it in the text. Use SI units.',
      'Cite sources in the text and list them at the end in APA style. Wikipedia is not an acceptable final source.',
    ],
  },
  {
    id: 'ethics',
    title: 'Ethics and originality',
    body: [
      'Every submission is checked for plagiarism. Copied text, made-up data or images that aren’t yours lead to rejection.',
      'Research involving people (surveys, interviews, measurements) needs their informed consent, and a parent’s consent for anyone under 18. Do not include names or anything that identifies participants.',
      'No experiments that harm animals, and nothing dangerous. Describe the safety precautions you took.',
      'Say clearly how any AI tools were used. AI cannot be listed as an author. If you are under 18, a parent or guardian should know you are submitting.',
    ],
  },
  {
    id: 'review',
    title: 'Review and decisions',
    body: [
      'Your PDF is stored privately and only the editor can open it. Nothing is published automatically and nothing you send appears on the site unless it is accepted.',
      'The editor reads every paper, sometimes with a subject teacher or specialist, and replies to the email in your PDF with one of: accept, revise, or decline, with reasons.',
      `Accepted papers are published open access under ${JOURNAL.licence}, with an article ID, a permanent link and a citation. Authors keep the copyright.`,
    ],
  },
];

const sizeLabel = (b) => (b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`);

// "My Paper (final).pdf" -> "my-paper-final.pdf"
const safeName = (name) =>
  `${name.replace(/\.pdf$/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'paper'}.pdf`;

const isPdf = (file) => file.type === 'application/pdf' || /\.pdf$/i.test(file.name);

function PdfUpload() {
  const input = useRef(null);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | uploading | done | error
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [fallback, setFallback] = useState(false);

  const choose = (f) => {
    setError('');
    setFallback(false);
    if (!f) return;
    if (!isPdf(f)) return setError('Please choose a PDF file.');
    if (f.size > MAX_MB * 1024 * 1024) return setError(`That file is ${sizeLabel(f.size)}. The limit is ${MAX_MB} MB.`);
    setFile(f);
  };

  const submit = async () => {
    if (!file) return;
    setStatus('uploading');
    setProgress(0);
    setError('');
    try {
      const stamp = new Date().toISOString().slice(0, 10);
      await upload(`submissions/${stamp}-${safeName(file.name)}`, file, {
        access: 'private',
        contentType: 'application/pdf',
        handleUploadUrl: '/api/upload',
        onUploadProgress: ({ percentage }) => setProgress(Math.round(percentage)),
      });
      setStatus('done');
    } catch (e) {
      setStatus('error');
      setFallback(true);
      setError('The upload didn’t go through.');
    }
  };

  if (status === 'done') {
    return (
      <div className="sheet p-6 md:p-10 pt-9">
        <span className="stamp">RECEIVED</span>
        <h2 className="font-news font-black text-3xl md:text-4xl mt-5">Thank you. Your paper is with the editor.</h2>
        <p className="font-serif-body text-lg mt-3 leading-relaxed">
          <strong>{file.name}</strong> was uploaded privately. The editor will reply to the email address in your PDF.
        </p>
        <button
          type="button"
          onClick={() => { setFile(null); setStatus('idle'); }}
          className="btn bg-[var(--card)] mt-6"
        >
          Submit another paper
        </button>
      </div>
    );
  }

  return (
    <div className="sheet p-5 md:p-10 pt-8">
      <p className="kicker">Your paper, as one PDF</p>

      {file ? (
        <div className="mt-4 flex items-center gap-4 border-2 border-[var(--ink)] bg-white/60 p-4">
          <FileText className="w-9 h-9 shrink-0 text-[var(--stamp)]" />
          <div className="min-w-0 flex-1">
            <p className="font-bold truncate">{file.name}</p>
            <p className="text-xs text-[var(--ink-soft)] mt-0.5">PDF · {sizeLabel(file.size)}</p>
          </div>
          {status !== 'uploading' && (
            <button type="button" onClick={() => setFile(null)} aria-label="Remove file" className="w-11 h-11 grid place-items-center hover:bg-[var(--kraft)]">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => input.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); choose(e.dataTransfer.files[0]); }}
          className={`mt-4 w-full border-2 border-dashed px-6 py-12 md:py-16 grid place-items-center text-center transition-colors ${
            dragging ? 'border-[var(--blueprint)] bg-[color-mix(in_oklch,var(--blueprint)_8%,transparent)]' : 'border-[var(--ink)] hover:bg-[var(--kraft)]'
          }`}
        >
          <UploadCloud className="w-10 h-10" strokeWidth={1.5} />
          <span className="font-news font-bold text-xl md:text-2xl mt-3">
            <span className="hidden md:inline">Drop your PDF here, or </span>
            <span className="underline underline-offset-4">choose a file</span>
          </span>
          <span className="text-xs tracking-[.12em] uppercase text-[var(--ink-soft)] mt-2">PDF only · up to {MAX_MB} MB</span>
        </button>
      )}
      <input ref={input} type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => { choose(e.target.files[0]); e.target.value = ''; }} />

      {status === 'uploading' && (
        <div className="mt-4" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-2 border border-[var(--ink)] bg-white/60">
            <div className="h-full bg-[var(--safety)] transition-[width]" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs mt-1.5 text-[var(--ink-soft)]">Uploading… {progress}%</p>
        </div>
      )}

      {error && <p className="mt-4 text-sm font-bold text-[var(--stamp)]">{error}</p>}
      {fallback && (
        <div className="mt-3 border-2 border-dashed border-[var(--rule)] p-4 text-sm leading-relaxed">
          You can still submit: email the PDF to{' '}
          <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(`${JOURNAL.name} submission`)}`} className="underline font-bold break-all">{EMAIL}</a>{' '}
          with the subject “{JOURNAL.name} submission”.
        </div>
      )}

      <button
        type="button"
        onClick={submit}
        disabled={!file || status === 'uploading'}
        className="btn btn-safety w-full justify-center mt-6 disabled:opacity-50 disabled:pointer-events-none"
      >
        {status === 'uploading' ? 'Uploading…' : <><Check className="w-4 h-4" /> Submit paper</>}
      </button>
      <p className="mt-4 flex items-start gap-1.5 text-xs text-[var(--ink-soft)] leading-snug">
        <Lock className="w-3.5 h-3.5 shrink-0 mt-px" />
        <span>
          Stored privately; only the editor can open it. By submitting you confirm the paper is your own original work and
          follows the <a href="#guidelines" className="underline">author guidelines</a>.
        </span>
      </p>
    </div>
  );
}

export default function ResearchSubmit() {
  useTitle('Submit Research');

  return (
    <div className="max-w-6xl mx-auto px-4">
      <header className="mt-8 md:mt-10">
        <Link to="/research" className="inline-block py-2 text-xs font-bold tracking-[.15em] uppercase hover:underline">← {JOURNAL.name}</Link>
        <h1 className="font-news font-black text-4xl md:text-6xl leading-tight mt-2">Submit a paper</h1>
        <p className="max-w-2xl mt-3 text-lg leading-relaxed text-[var(--ink-soft)]">
          Upload one PDF with everything in it. It goes privately to the editor, and nothing appears on the site unless it is
          reviewed and accepted.
        </p>
      </header>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 mt-8 md:mt-10 items-start">
        <PdfUpload />

        <aside className="newsprint px-5 py-6 lg:sticky lg:top-24">
          <p className="kicker">Your PDF must include</p>
          <ul className="mt-4 space-y-3 font-serif-body text-[15px] leading-snug">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex gap-2.5">
                <Check className="w-4 h-4 shrink-0 mt-0.5 text-[var(--stamp)]" />
                {item}
              </li>
            ))}
          </ul>
          <a href="#guidelines" className="block mt-5 text-xs font-bold tracking-[.15em] uppercase underline underline-offset-4 py-2">Full author guidelines ↓</a>
        </aside>
      </div>

      <section id="guidelines" className="pt-16 md:pt-24 scroll-mt-20">
        <div className="newsprint px-5 md:px-12 py-8 md:py-12">
          <p className="kicker">{JOURNAL.name}</p>
          <h2 className="font-news font-black text-3xl md:text-5xl mt-2">Author guidelines</h2>
          <div className="swipe-row flex md:flex-wrap gap-2 overflow-x-auto md:overflow-visible -mx-5 px-5 md:mx-0 md:px-0 mt-6 pb-6 border-b border-[var(--ink)]">
            {GUIDELINES.map((g, i) => (
              <a key={g.id} href={`#g-${g.id}`} className="shrink-0 whitespace-nowrap text-xs font-bold tracking-[.12em] uppercase px-3 py-2 border-2 border-[var(--ink)] hover:bg-[var(--safety)]">
                {i + 1}. {g.title}
              </a>
            ))}
          </div>
          <div className="mt-8 md:columns-2 md:gap-12 [column-rule:1px_solid_color-mix(in_oklch,var(--ink)_20%,transparent)]">
            {GUIDELINES.map((g, i) => (
              <section key={g.id} id={`g-${g.id}`} className="break-inside-avoid mb-8 scroll-mt-20">
                <h3 className="font-news font-bold text-2xl">
                  <span className="text-[var(--stamp)]">{i + 1}.</span> {g.title}
                </h3>
                <ul className="mt-3 space-y-2.5 font-serif-body text-[16px] leading-relaxed">
                  {g.body.map((t) => (
                    <li key={t} className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[.7em] before:w-1.5 before:h-1.5 before:bg-[var(--ink)]">{t}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
