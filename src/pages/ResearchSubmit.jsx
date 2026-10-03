import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, FileText, KeyRound, LogOut, Mail, Plus, Trash2, UploadCloud, X } from 'lucide-react';
import papers, { JOURNAL, ARTICLE_TYPES, SUBJECTS, formatDate } from '../data/research.js';
import { MAX_PDF_MB } from '../data/research-config.js';
import useTitle from '../components/useTitle.js';

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
      'Send one PDF that contains everything: a title page, the abstract, the full paper and references.',
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
      'Papers are sent privately to the editor by email. Only the editor can publish, and nothing appears on the site unless it is accepted.',
      'The editor reads every paper, sometimes with a subject teacher or specialist, and replies by email with one of: accept, revise, or decline, with reasons.',
      `Accepted papers are published open access under ${JOURNAL.licence}, with an article ID, a permanent link and a citation. Authors keep the copyright.`,
    ],
  },
];

const mailto = `mailto:${JOURNAL.editorEmail}?subject=${encodeURIComponent(`${JOURNAL.name} submission: [your paper title]`)}&body=${encodeURIComponent(
  'Dear Editor,\n\nPlease find my paper attached as a PDF for consideration in KRITS Research.\n\nTitle:\nAuthor(s) and school:\nArticle type (Original Research / Review / Short Communication):\nSubject:\n\nI confirm this is my own original work, not published elsewhere, and any AI use is described in the paper.\n\nThank you,\n',
)}`;

const sizeLabel = (b) => (b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`);
const words = (s) => (s.trim() ? s.trim().split(/\s+/).length : 0);

async function api(path, body) {
  const r = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(body ?? {}),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || 'Something went wrong. Try again.');
  return data;
}

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = () => reject(new Error('Couldn’t read that file.'));
    reader.readAsDataURL(file);
  });

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

/* ---------- Public view: send by email, plus the editor's sign-in ---------- */

function SubmitByEmail() {
  return (
    <div className="sheet p-6 md:p-10 pt-9">
      <p className="kicker">How to submit</p>
      <h2 className="font-news font-black text-3xl md:text-4xl mt-2 leading-tight">Email your paper to the editor as one PDF.</h2>
      <p className="font-serif-body text-lg mt-3 leading-relaxed text-[var(--ink-soft)]">
        Submissions are by email only. The editor reads every paper and replies to you directly. Only the editor can publish
        to {JOURNAL.name}.
      </p>
      <a
        href={`mailto:${JOURNAL.editorEmail}`}
        className="mt-6 flex items-center gap-3 border-2 border-[var(--ink)] bg-white/60 p-4 hover:bg-[var(--kraft)]"
      >
        <Mail className="w-6 h-6 shrink-0 text-[var(--stamp)]" />
        <span className="font-bold text-lg break-all">{JOURNAL.editorEmail}</span>
      </a>
      <div className="cta-row flex flex-wrap gap-3 mt-6">
        <a href={mailto} className="btn btn-safety"><Mail className="w-4 h-4" /> Email your paper</a>
        <a href="#guidelines" className="btn bg-[var(--card)]">Read the guidelines</a>
      </div>
      <p className="mt-4 text-xs text-[var(--ink-soft)]">Attach the PDF before you press send.</p>
    </div>
  );
}

function EditorSignIn({ configured, onSignedIn }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await api('/api/login', { password });
      setPassword('');
      onSignedIn();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="newsprint px-5 py-6">
      <p className="kicker flex items-center gap-1.5"><KeyRound className="w-3.5 h-3.5" /> The Editorial Desk</p>
      <p className="font-serif-body text-[15px] mt-2 text-[var(--ink-soft)] leading-snug">Editor sign-in, for publishing accepted papers.</p>
      <label className="block mt-4">
        <span className="sr-only">Editor password</span>
        <input
          type="password"
          className="field"
          placeholder="Editor password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {error && <p className="mt-3 text-sm font-bold text-[var(--stamp)]">{error}</p>}
      {configured === false && <p className="mt-3 text-xs text-[var(--ink-soft)]">Editor sign-in isn’t set up yet.</p>}
      <button type="submit" disabled={busy} className="btn bg-[var(--card)] w-full justify-center mt-4 disabled:opacity-60">
        {busy ? 'Checking…' : 'Enter the desk →'}
      </button>
    </form>
  );
}

/* ---------- Editor view: publish and unpublish ---------- */

const blank = { title: '', type: 'research', subject: '', abstract: '', keywords: '', received: '', accepted: '' };

function PublishForm({ onPublished, onSignedOut }) {
  const input = useRef(null);
  const [f, setF] = useState(blank);
  const [authors, setAuthors] = useState([{ name: '', affiliation: '' }]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF((prev) => ({ ...prev, [k]: e.target.value }));
  const setAuthor = (i, k) => (e) => setAuthors((list) => list.map((a, j) => (j === i ? { ...a, [k]: e.target.value } : a)));

  const choose = (picked) => {
    setError('');
    if (!picked) return;
    if (!(picked.type === 'application/pdf' || /\.pdf$/i.test(picked.name))) return setError('Choose a PDF file.');
    if (picked.size > MAX_PDF_MB * 1024 * 1024) return setError(`That PDF is ${sizeLabel(picked.size)}. The limit is ${MAX_PDF_MB} MB, so compress it first.`);
    setFile(picked);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return setError('Attach the PDF.');
    setBusy(true);
    setError('');
    try {
      const { paper } = await api('/api/publish', { ...f, authors, pdf: await toBase64(file) });
      setF(blank);
      setAuthors([{ name: '', affiliation: '' }]);
      setFile(null);
      onPublished(paper);
    } catch (err) {
      if (/sign in/i.test(err.message)) onSignedOut();
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="sheet p-5 md:p-10 pt-8">
      <p className="kicker">Publish a paper</p>

      <div className="mt-4">
        {file ? (
          <div className="flex items-center gap-4 border-2 border-[var(--ink)] bg-white/60 p-4">
            <FileText className="w-9 h-9 shrink-0 text-[var(--stamp)]" />
            <div className="min-w-0 flex-1">
              <p className="font-bold truncate">{file.name}</p>
              <p className="text-xs text-[var(--ink-soft)] mt-0.5">PDF · {sizeLabel(file.size)}</p>
            </div>
            <button type="button" onClick={() => setFile(null)} aria-label="Remove file" className="w-11 h-11 grid place-items-center hover:bg-[var(--kraft)]">
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => input.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); choose(e.dataTransfer.files[0]); }}
            className="w-full border-2 border-dashed border-[var(--ink)] px-6 py-10 grid place-items-center text-center hover:bg-[var(--kraft)]"
          >
            <UploadCloud className="w-9 h-9" strokeWidth={1.5} />
            <span className="font-news font-bold text-xl mt-2">The paper’s PDF</span>
            <span className="text-xs tracking-[.12em] uppercase text-[var(--ink-soft)] mt-1">Drop it here or choose · up to {MAX_PDF_MB} MB</span>
          </button>
        )}
        <input ref={input} type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => { choose(e.target.files[0]); e.target.value = ''; }} />
      </div>

      <div className="space-y-6 mt-8">
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
              <option value="" disabled>Choose…</option>
              {Object.entries(SUBJECTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </Field>
        </div>

        <fieldset>
          <legend className="text-xs font-bold tracking-[.2em] uppercase">Authors <span className="text-[var(--stamp)]">*</span></legend>
          <div className="space-y-4 mt-2">
            {authors.map((a, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_1fr_auto] gap-x-4 gap-y-2 items-end">
                <input className="field" placeholder="Full name" value={a.name} onChange={setAuthor(i, 'name')} required={i === 0} />
                <input className="field col-start-1 md:col-start-auto" placeholder="School / institution" value={a.affiliation} onChange={setAuthor(i, 'affiliation')} />
                {authors.length > 1 ? (
                  <button type="button" onClick={() => setAuthors((list) => list.filter((_, j) => j !== i))} aria-label="Remove author" className="row-start-1 col-start-2 md:row-start-auto md:col-start-auto w-11 h-11 grid place-items-center hover:bg-[var(--kraft)]">
                    <X className="w-4 h-4" />
                  </button>
                ) : <span className="hidden md:block w-11" />}
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setAuthors((list) => [...list, { name: '', affiliation: '' }])} className="mt-3 flex items-center gap-1.5 py-2 text-xs font-bold tracking-[.15em] uppercase hover:underline">
            <Plus className="w-3.5 h-3.5" /> Add author
          </button>
        </fieldset>

        <Field label="Abstract" required>
          <textarea rows={6} className="mt-2 w-full kraft border-2 border-[var(--ink)] p-3 outline-none focus:border-[var(--blueprint)] font-serif-body leading-relaxed" value={f.abstract} onChange={set('abstract')} required />
          <span className={`block mt-1 text-xs text-right ${words(f.abstract) > ABSTRACT_MAX ? 'text-[var(--stamp)] font-bold' : 'text-[var(--ink-soft)]'}`}>
            {words(f.abstract)} / {ABSTRACT_MAX} words
          </span>
        </Field>
        <Field label="Keywords" hint="Separated by commas.">
          <input className="field" value={f.keywords} onChange={set('keywords')} />
        </Field>
        <div className="grid grid-cols-2 gap-6">
          <Field label="Received">
            <input type="date" className="field" value={f.received} onChange={set('received')} />
          </Field>
          <Field label="Accepted">
            <input type="date" className="field" value={f.accepted} onChange={set('accepted')} />
          </Field>
        </div>
      </div>

      {error && <p className="mt-6 text-sm font-bold text-[var(--stamp)]">{error}</p>}
      <button type="submit" disabled={busy} className="btn btn-safety w-full justify-center mt-6 disabled:opacity-60">
        {busy ? 'Publishing…' : <><Check className="w-4 h-4" /> Publish to {JOURNAL.name}</>}
      </button>
      <p className="mt-3 text-xs text-[var(--ink-soft)]">Publishing goes live on the site in about a minute. Today’s date is used as the publication date.</p>
    </form>
  );
}

function Desk({ onSignOut }) {
  const [justPublished, setJustPublished] = useState([]);
  const [removed, setRemoved] = useState([]);
  const [notice, setNotice] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const live = [...papers, ...justPublished].filter((p) => !removed.includes(p.id)).sort((a, b) => b.id.localeCompare(a.id));
  const pending = new Set(justPublished.map((p) => p.id));

  const unpublish = async (p) => {
    if (!window.confirm(`Unpublish ${p.id}, “${p.title}”? Its page and PDF will be taken off the site.`)) return;
    setBusyId(p.id);
    try {
      await api('/api/unpublish', { id: p.id });
      setRemoved((r) => [...r, p.id]);
      setNotice({ text: `${p.id} unpublished. It disappears from the site in about a minute.` });
    } catch (err) {
      setNotice({ text: err.message, error: true });
    } finally {
      setBusyId(null);
    }
  };

  const signOut = async () => {
    await api('/api/logout').catch(() => {});
    onSignOut();
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mt-8 md:mt-10">
        <div>
          <Link to="/research" className="inline-block py-2 text-xs font-bold tracking-[.15em] uppercase hover:underline">← {JOURNAL.name}</Link>
          <h1 className="font-news font-black text-4xl md:text-6xl leading-tight mt-2">The Editorial Desk</h1>
          <p className="mt-2 text-[var(--ink-soft)]">Signed in as editor. Only you can see this page.</p>
        </div>
        <button type="button" onClick={signOut} className="btn btn-ghost"><LogOut className="w-4 h-4" /> Sign out</button>
      </div>

      {notice && (
        <div className={`mt-6 border-2 p-4 ${notice.error ? 'border-[var(--stamp)] text-[var(--stamp)] bg-[var(--card)]' : 'paper bg-[var(--card)] border-[var(--ink)]'}`}>
          {notice.text}
          {notice.link && <> <Link to={notice.link} className="underline font-bold">{notice.link}</Link></>}
        </div>
      )}

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 mt-8 items-start">
        <PublishForm
          onPublished={(paper) => {
            setJustPublished((list) => [...list, paper]);
            setNotice({ text: `Published as ${paper.id}. It will be live in about a minute at`, link: `/research/${paper.id}` });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSignedOut={onSignOut}
        />
        <aside className="newsprint px-5 py-6">
          <p className="kicker">Published papers</p>
          {live.length ? (
            <ul className="mt-2 divide-y divide-[var(--rule)]">
              {live.map((p) => (
                <li key={p.id} className="py-3 flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] tracking-[.12em] uppercase text-[var(--ink-soft)]">
                      {p.id} · {pending.has(p.id) ? 'going live…' : formatDate(p.published)}
                    </p>
                    <Link to={`/research/${p.id}`} className="font-news font-bold leading-snug hover:underline block mt-0.5">{p.title}</Link>
                  </div>
                  <button
                    type="button"
                    onClick={() => unpublish(p)}
                    disabled={busyId === p.id}
                    aria-label={`Unpublish ${p.id}`}
                    className="w-10 h-10 shrink-0 grid place-items-center hover:bg-[var(--kraft)] text-[var(--stamp)] disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-serif-body text-[15px] text-[var(--ink-soft)] mt-3">Nothing published yet.</p>
          )}
        </aside>
      </div>
    </>
  );
}

/* ---------- Page ---------- */

export default function ResearchSubmit() {
  useTitle('Submit Research');
  const [session, setSession] = useState({ checked: false, configured: null, editor: false });

  const refresh = () =>
    fetch('/api/session', { credentials: 'same-origin' })
      .then((r) => (r.ok ? r.json() : { configured: false, editor: false }))
      .catch(() => ({ configured: false, editor: false }))
      .then((s) => setSession({ checked: true, configured: s.configured, editor: s.editor }));

  // Re-check when the tab comes back into focus, so a page left open while the
  // desk was being set up doesn't keep showing an old answer.
  useEffect(() => {
    refresh();
    window.addEventListener('focus', refresh);
    return () => window.removeEventListener('focus', refresh);
  }, []);

  if (session.editor) {
    return (
      <div className="max-w-6xl mx-auto px-4">
        <Desk onSignOut={() => setSession((s) => ({ ...s, editor: false }))} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <header className="mt-8 md:mt-10">
        <Link to="/research" className="inline-block py-2 text-xs font-bold tracking-[.15em] uppercase hover:underline">← {JOURNAL.name}</Link>
        <h1 className="font-news font-black text-4xl md:text-6xl leading-tight mt-2">Submit a paper</h1>
        <p className="max-w-2xl mt-3 text-lg leading-relaxed text-[var(--ink-soft)]">
          Send your paper to the editor as one PDF with everything in it. Nothing appears on the site unless it is reviewed
          and accepted.
        </p>
      </header>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 mt-8 md:mt-10 items-start">
        <SubmitByEmail />
        <div className="space-y-8">
          <aside className="newsprint px-5 py-6">
            <p className="kicker">Your PDF must include</p>
            <ul className="mt-4 space-y-3 font-serif-body text-[15px] leading-snug">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check className="w-4 h-4 shrink-0 mt-0.5 text-[var(--stamp)]" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
          <EditorSignIn configured={session.configured} onSignedIn={refresh} />
        </div>
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
