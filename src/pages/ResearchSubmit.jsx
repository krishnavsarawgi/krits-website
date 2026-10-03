import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Copy, Lock, Mail } from 'lucide-react';
import { JOURNAL, ARTICLE_TYPES, SUBJECTS } from '../data/research.js';
import { EMAIL } from '../components/Layout.jsx';
import useTitle from '../components/useTitle.js';

const ABSTRACT_MAX = 250;

const DECLARATIONS = [
  ['original', 'This is my own original work (and my co-authors’). Every source and idea from others is cited.'],
  ['unpublished', 'It has not been published elsewhere and is not under review at another journal.'],
  ['ai', 'Any use of AI tools in the research or writing is described in the manuscript.'],
  ['licence', `If accepted, KRITS may publish it openly under ${JOURNAL.licence}, with me credited as author.`],
  ['guardian', 'If I am under 18, a parent or guardian knows I am submitting this.'],
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
    title: 'Preparing the manuscript',
    body: [
      'Send a Google Doc, Word file or PDF. Include a title page with every author’s full name, school or institution, and the corresponding author’s email.',
      `Start with an abstract of no more than ${ABSTRACT_MAX} words and 3–6 keywords.`,
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
      'Say clearly how any AI tools were used. AI cannot be listed as an author.',
    ],
  },
  {
    id: 'review',
    title: 'Review and decisions',
    body: [
      'Submissions go privately to the editor. Nothing is published automatically and nothing you send appears on the site unless it is accepted.',
      'The editor reads every paper, sometimes with a subject teacher or specialist, and replies by email with one of: accept, revise, or decline, with reasons.',
      'Accepted papers are published with an article ID, a permanent link and a citation. Authors keep the copyright.',
    ],
  },
];

const blank = {
  name: '',
  email: '',
  institution: '',
  role: '',
  coauthors: '',
  title: '',
  type: 'research',
  subject: '',
  abstract: '',
  keywords: '',
  link: '',
  notes: '',
};

const words = (s) => (s.trim() ? s.trim().split(/\s+/).length : 0);

function Field({ label, hint, required, children }) {
  return (
    <label className="block">
      <span className="text-xs font-bold tracking-[.2em] uppercase">
        {label}
        {required && <span className="text-[var(--stamp)]"> *</span>}
      </span>
      {children}
      {hint && <span className="block mt-1.5 text-xs text-[var(--ink-soft)] leading-snug">{hint}</span>}
    </label>
  );
}

export default function ResearchSubmit() {
  useTitle('Submit Research');
  const [f, setF] = useState(blank);
  const [declared, setDeclared] = useState([]);
  const [sent, setSent] = useState(null);
  const [copied, setCopied] = useState(false);
  const set = (k) => (e) => setF((prev) => ({ ...prev, [k]: e.target.value }));
  const abstractWords = words(f.abstract);
  const allDeclared = DECLARATIONS.every(([k]) => declared.includes(k));

  const submit = (e) => {
    e.preventDefault();
    if (abstractWords > ABSTRACT_MAX || !allDeclared) return;
    const subject = `${JOURNAL.name} submission: ${f.title}`;
    const body = [
      `${JOURNAL.name.toUpperCase()} — MANUSCRIPT SUBMISSION`,
      '',
      `Title: ${f.title}`,
      `Article type: ${ARTICLE_TYPES[f.type]}`,
      `Subject: ${SUBJECTS[f.subject]}`,
      '',
      `Corresponding author: ${f.name}`,
      `Email: ${f.email}`,
      `School / institution: ${f.institution}`,
      `Position: ${f.role || '—'}`,
      `Co-authors: ${f.coauthors.trim() || 'None'}`,
      '',
      `Abstract (${abstractWords} words):`,
      f.abstract.trim(),
      '',
      `Keywords: ${f.keywords}`,
      `Manuscript: ${f.link.trim() || 'Attached to this email'}`,
      '',
      'Declarations (all confirmed):',
      ...DECLARATIONS.map(([, text]) => `[x] ${text}`),
      ...(f.notes.trim() ? ['', 'Note to the editor:', f.notes.trim()] : []),
    ].join('\n');
    setSent({ subject, body });
    setCopied(false);
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`To: ${EMAIL}\nSubject: ${sent.subject}\n\n${sent.body}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <header className="mt-8 md:mt-10">
        <Link to="/research" className="inline-block py-2 text-xs font-bold tracking-[.15em] uppercase hover:underline">← {JOURNAL.name}</Link>
        <h1 className="font-news font-black text-4xl md:text-6xl leading-tight mt-2">Submit a paper</h1>
        <p className="max-w-2xl mt-3 text-lg leading-relaxed text-[var(--ink-soft)]">
          Read the guidelines, fill in the form and send. Your submission goes privately to the editor by email. Nothing
          appears on the site unless it is reviewed and accepted.
        </p>
      </header>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 mt-8 md:mt-10 items-start">
        {sent ? (
          <div className="sheet p-6 md:p-10 pt-9">
            <span className="stamp">READY TO SEND</span>
            <h2 className="font-news font-black text-3xl mt-5">Almost done — press send.</h2>
            <p className="font-serif-body mt-3 leading-relaxed">
              Your email app should have opened with the submission filled in, addressed to the editor.
              {f.link.trim() ? ' ' : ' Attach your manuscript file, then '}
              Send it from there. You’ll get a reply by email.
            </p>
            <p className="font-serif-body mt-3 leading-relaxed text-[var(--ink-soft)]">
              Email app didn’t open? Copy the submission and email it to{' '}
              <a href={`mailto:${EMAIL}`} className="underline font-bold text-[var(--ink)] break-all">{EMAIL}</a>.
            </p>
            <div className="cta-row flex flex-wrap gap-3 mt-6">
              <button type="button" onClick={copy} className="btn btn-safety">
                {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy submission</>}
              </button>
              <button type="button" onClick={() => setSent(null)} className="btn bg-[var(--card)]">Edit submission</button>
            </div>
            <pre className="mt-6 p-4 kraft border-2 border-[var(--ink)] text-xs whitespace-pre-wrap break-words max-h-80 overflow-auto">{sent.body}</pre>
          </div>
        ) : (
          <form onSubmit={submit} className="sheet p-5 md:p-10 pt-8">
            <fieldset>
              <legend className="kicker mb-5">1 · Corresponding author</legend>
              <div className="grid md:grid-cols-2 gap-6">
                <Field label="Full name" required>
                  <input className="field" value={f.name} onChange={set('name')} required autoComplete="name" />
                </Field>
                <Field label="Email" required hint="Decisions and comments are sent here.">
                  <input type="email" className="field" value={f.email} onChange={set('email')} required autoComplete="email" />
                </Field>
                <Field label="School / institution" required>
                  <input className="field" value={f.institution} onChange={set('institution')} required autoComplete="organization" />
                </Field>
                <Field label="Position" hint="e.g. Grade 11 student, undergraduate, teacher">
                  <input className="field" value={f.role} onChange={set('role')} />
                </Field>
              </div>
              <div className="mt-6">
                <Field label="Co-authors" hint="One per line: full name — school. Leave blank if you worked alone.">
                  <textarea rows={2} className="field resize-y" value={f.coauthors} onChange={set('coauthors')} />
                </Field>
              </div>
            </fieldset>

            <fieldset className="mt-10">
              <legend className="kicker mb-5">2 · Manuscript</legend>
              <div className="space-y-6">
                <Field label="Title" required>
                  <input className="field font-news text-lg" value={f.title} onChange={set('title')} required />
                </Field>
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Article type" required>
                    <select className="field" value={f.type} onChange={set('type')} required>
                      {Object.entries(ARTICLE_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </Field>
                  <Field label="Subject" required>
                    <select className="field" value={f.subject} onChange={set('subject')} required>
                      <option value="" disabled>Choose a subject…</option>
                      {Object.entries(SUBJECTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Abstract" required>
                  <textarea rows={7} className="mt-2 w-full kraft border-2 border-[var(--ink)] p-3 outline-none focus:border-[var(--blueprint)] font-serif-body leading-relaxed" value={f.abstract} onChange={set('abstract')} required />
                  <span className={`block mt-1 text-xs text-right ${abstractWords > ABSTRACT_MAX ? 'text-[var(--stamp)] font-bold' : 'text-[var(--ink-soft)]'}`}>
                    {abstractWords} / {ABSTRACT_MAX} words
                  </span>
                </Field>
                <Field label="Keywords" required hint="3–6, separated by commas.">
                  <input className="field" value={f.keywords} onChange={set('keywords')} required />
                </Field>
                <Field label="Link to manuscript" hint="A Google Docs / Drive or OneDrive link that anyone with the link can view. Or leave blank and attach the file to the email.">
                  <input type="url" inputMode="url" className="field" value={f.link} onChange={set('link')} placeholder="https://" />
                </Field>
                <Field label="Note to the editor">
                  <textarea rows={2} className="field resize-y" value={f.notes} onChange={set('notes')} />
                </Field>
              </div>
            </fieldset>

            <fieldset className="mt-10 border-2 border-dashed border-[var(--rule)] p-4 md:p-5">
              <legend className="kicker px-2">3 · Declarations</legend>
              <div className="space-y-2">
                {DECLARATIONS.map(([k, text]) => (
                  <label key={k} className="flex items-start gap-3 cursor-pointer py-1.5 text-[15px] leading-snug">
                    <input
                      type="checkbox"
                      checked={declared.includes(k)}
                      onChange={() => setDeclared((d) => (d.includes(k) ? d.filter((x) => x !== k) : [...d, k]))}
                      className="w-5 h-5 mt-0.5 shrink-0 accent-[var(--blueprint)]"
                      required
                    />
                    {text}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button type="submit" disabled={abstractWords > ABSTRACT_MAX} className="btn btn-safety w-full sm:w-auto justify-center disabled:opacity-50">
                <Mail className="w-4 h-4" /> Send to the editor
              </button>
              <p className="flex items-center gap-1.5 text-xs text-[var(--ink-soft)]">
                <Lock className="w-3.5 h-3.5 shrink-0" /> Sent privately to the editor by email. Never posted publicly.
              </p>
            </div>
          </form>
        )}

        <aside className="newsprint px-5 py-6 lg:sticky lg:top-24">
          <p className="kicker">At a glance</p>
          <dl className="mt-3 text-sm divide-y divide-[var(--rule)]">
            {[
              ['Fees', 'None'],
              ['Access', `Open, ${JOURNAL.licence}`],
              ['Abstract', `≤ ${ABSTRACT_MAX} words`],
              ['Research', '≤ 5,000 words'],
              ['Review', '≤ 4,000 words'],
              ['Short comm.', '≤ 1,500 words'],
              ['Format', 'Google Doc, Word or PDF'],
              ['Citations', 'APA style'],
              ['Decision', 'By email from the editor'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2">
                <dt className="text-[var(--ink-soft)] uppercase tracking-[.12em] text-[11px] pt-0.5">{k}</dt>
                <dd className="font-bold text-right">{v}</dd>
              </div>
            ))}
          </dl>
          <a href="#guidelines" className="block mt-4 text-xs font-bold tracking-[.15em] uppercase underline underline-offset-4 py-2">Full author guidelines ↓</a>
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
