import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Package, Wrench, Boxes, HeartHandshake } from 'lucide-react';
import { SectionHeader, Rivet, CarBlueprint, CraneBlueprint } from '../components/Blueprint.jsx';
import { EMAIL, PHONE } from '../components/Layout.jsx';
import useTitle from '../components/useTitle.js';

const STEPS = [
  {
    icon: Package,
    title: 'Source components',
    text: 'Metal strips, shafts, wheels, brackets and fasteners bought in bulk from wholesale hardware markets.',
  },
  {
    icon: Wrench,
    title: 'Assemble by hand',
    text: 'Every part is counted, sorted and checked by hand so each kit builds cleanly the first time.',
  },
  {
    icon: Boxes,
    title: 'Package the kit',
    text: 'Sealed into a branded box with a printed, illustrated instruction booklet.',
  },
  {
    icon: HeartHandshake,
    title: 'Donate to partners',
    text: 'Delivered directly to partner NGOs and schools, with training on how to use the kits in class.',
  },
];

const KITS = [
  {
    no: '001',
    status: 'Flagship',
    name: 'The Car',
    text: 'A rolling four-wheel chassis built from perforated strips, axles and brackets. The first kit KRITS ever shipped.',
    specs: [
      ['Parts', '62 parts'],
      ['Skill', 'Beginner'],
      ['Age', '8–14'],
      ['Build', '45–70 min'],
    ],
    Drawing: CarBlueprint,
  },
  {
    no: '002',
    status: 'In design',
    name: 'The Crane',
    text: 'A pulley-driven lifting arm introducing gearing, leverage and load. Prototype stage.',
    specs: [
      ['Parts', '~80 parts'],
      ['Skill', 'Intermediate'],
      ['Age', '10–16'],
      ['Build', '90 min'],
    ],
    Drawing: CraneBlueprint,
  },
];

const INTERESTS = ['Donate materials', 'Donate funds', 'Volunteer to assemble kits', 'Partner as an NGO'];

function InvolvedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [picked, setPicked] = useState([]);

  const toggle = (item) =>
    setPicked((p) => (p.includes(item) ? p.filter((x) => x !== item) : [...p, item]));

  // No backend: open the visitor's mail app with the form pre-filled.
  const submit = (e) => {
    e.preventDefault();
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `I would like to: ${picked.join(', ') || '—'}`,
      '',
      notes,
    ].join('\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('KRITS — Get involved')}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={submit} className="sheet p-6 md:p-10">
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <label className="block">
          <span className="text-xs font-bold tracking-[.2em]">NAME</span>
          <input className="field" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className="block">
          <span className="text-xs font-bold tracking-[.2em]">EMAIL</span>
          <input type="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
      </div>

      <fieldset className="border-2 border-dashed border-[var(--rule)] p-4 mb-8">
        <legend className="px-2 text-xs font-bold tracking-[.2em]">I WOULD LIKE TO</legend>
        <div className="grid sm:grid-cols-2 gap-3">
          {INTERESTS.map((item) => (
            <label key={item} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={picked.includes(item)}
                onChange={() => toggle(item)}
                className="w-4 h-4 accent-[var(--blueprint)]"
              />
              {item}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block mb-8">
        <span className="text-xs font-bold tracking-[.2em]">NOTES</span>
        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-2 w-full kraft border-2 border-[var(--ink)] p-3 outline-none focus:border-[var(--blueprint)]"
        />
      </label>

      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="btn btn-safety">File requisition</button>
        <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 underline underline-offset-4">
          <Mail className="w-4 h-4" /> {EMAIL}
        </a>
        <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="flex items-center gap-2 underline underline-offset-4">
          <Phone className="w-4 h-4" /> {PHONE}
        </a>
      </div>
    </form>
  );
}

export default function Kits() {
  useTitle('DIY STEM Kits');
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero */}
        <section className="blueprint relative mt-6 md:mt-10 border-2 border-[var(--ink)] px-6 py-14 md:px-14 md:py-20 overflow-hidden">
          <Rivet className="top-3 left-3" />
          <Rivet className="top-3 right-3" />
          <Rivet className="bottom-3 left-3" />
          <Rivet className="bottom-3 right-3" />
          <div className="absolute right-6 bottom-4 w-[380px] opacity-25 hidden md:block pointer-events-none">
            <CarBlueprint />
          </div>
          <div className="relative">
            <h1 className="inline-block font-stencil text-6xl md:text-8xl tracking-[.25em] border-2 border-current px-6 py-2 bg-white/5">
              KRITS
            </h1>
            <p className="font-type text-2xl md:text-3xl mt-8">Building STEM access, one kit at a time.</p>
            <p className="max-w-xl mt-4 leading-relaxed opacity-90">
              We source, assemble and donate Meccano-style DIY construction kits to NGOs and schools — so more
              children get to build something real with their own hands.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <a href="#involved" className="btn btn-safety">Get involved</a>
              <a href="#kits" className="btn btn-ghost">See the kits</a>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="pt-24 scroll-mt-16">
          <SectionHeader number="02" title="About KRITS" />
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-5 leading-relaxed">
              <p>
                KRITS is a student-run STEM-education social enterprise. We build hands-on construction kits — nuts,
                bolts, perforated strips, axles and wheels — and put them into the hands of children who rarely get to
                touch engineering at all.
              </p>
              <p>
                Textbook science reaches most classrooms. Hands-on science does not. For underprivileged students, a lab
                period is often a diagram on a blackboard, and curiosity has nowhere to go once the bell rings.
              </p>
              <p>
                So we do the unglamorous work: sourcing components at wholesale, assembling and quality-checking kits by
                hand, writing simple illustrated booklets, and donating the finished kits to NGOs and schools that
                already know the children who need them.
              </p>
            </div>
            <figure className="sheet p-3">
              <div className="blueprint aspect-[4/3] p-6 border-2 border-[var(--ink)]">
                <CarBlueprint />
              </div>
              <figcaption className="text-xs tracking-[.15em] mt-3 px-1">FIG. 2.1 — KIT NO. 001, SIDE ELEVATION</figcaption>
            </figure>
          </div>
        </section>

        {/* Founder */}
        <section id="founder" className="pt-24 scroll-mt-16">
          <SectionHeader number="03" title="About the Founder" />
          <div className="sheet p-6 md:p-10 grid md:grid-cols-[280px_1fr] gap-10">
            <div className="kraft border-2 border-[var(--ink)] p-3 self-start rotate-[-1.5deg]">
              <img
                src="/founder.webp"
                alt="Krishnav Sarawgi speaking at a podium at The Doon School"
                className="w-full aspect-[4/5] object-cover object-[75%_center] border-2 border-[var(--ink)]"
              />
              <div className="mt-3 text-xs tracking-[.15em] leading-relaxed">
                <p className="font-bold">KRISHNAV SARAWGI</p>
                <p>FOUNDER / ASSEMBLER</p>
                <p className="text-[var(--ink-soft)]">ID 001</p>
              </div>
            </div>
            <div className="space-y-5 leading-relaxed">
              <h3 className="font-stencil text-3xl tracking-wide text-[var(--blueprint)]">Krishnav Sarawgi</h3>
              <p>
                Krishnav is a Grade 10 student at The Doon School, Dehradun, and the founder of KRITS. He started it
                after noticing how much of his own interest in engineering came from taking things apart — and how few
                children ever got that chance.
              </p>
              <p>
                What began as one box of metal strips bought from a wholesale market became a small, deliberate
                operation: design a kit, build it, test it on real kids, improve the booklet, repeat. Every kit that goes
                out has been assembled by hand.
              </p>
              <p>
                He hopes to study physics and aerospace engineering, and wants quality STEM education to reach every
                child, regardless of background.
              </p>
              <blockquote className="font-type text-lg border-l-4 border-[var(--rust)] pl-4">
                “If a child can build a car that actually rolls, engineering stops being a subject and starts being
                something they can do.”
              </blockquote>
              <div className="flex flex-wrap gap-3 pt-2 text-xs tracking-[.12em]">
                <span className="border-2 border-[var(--ink)] px-3 py-1">GRADE 10 · THE DOON SCHOOL</span>
                <span className="border-2 border-[var(--ink)] px-3 py-1">ASPIRES: PHYSICS & AEROSPACE</span>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="process" className="pt-24 scroll-mt-16">
          <SectionHeader number="04" title="How it works" subtitle="Assembly procedure — four steps, in order." />
          <div className="grid sm:grid-cols-2 gap-8">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="sheet p-6 pt-8">
                <div className="flex items-center gap-4 mb-3">
                  <span className="blueprint w-11 h-11 grid place-items-center border-2 border-[var(--ink)]">
                    <Icon className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-xs tracking-[.2em] text-[var(--ink-soft)]">STEP 0{i + 1}</p>
                    <h3 className="font-stencil text-xl tracking-wide uppercase">{title}</h3>
                  </div>
                </div>
                <p className="leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kits */}
        <section id="kits" className="pt-24 scroll-mt-16">
          <SectionHeader number="05" title="The Kits" subtitle="Catalogue of current and forthcoming builds." />
          <div className="grid md:grid-cols-2 gap-8">
            {KITS.map(({ no, status, name, text, specs, Drawing }) => (
              <article key={no} className="sheet flex flex-col">
                <div className="blueprint aspect-[16/9] p-6 border-b-2 border-[var(--ink)]">
                  <Drawing />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs tracking-[.2em] text-[var(--ink-soft)]">KIT NO. {no}</span>
                    <span className="text-xs font-bold tracking-[.15em] uppercase px-2 py-0.5 border-2 border-[var(--ink)] bg-[var(--rust)]">
                      {status}
                    </span>
                  </div>
                  <h3 className="font-stencil text-2xl tracking-wide uppercase mb-2">{name}</h3>
                  <p className="leading-relaxed mb-6">{text}</p>
                  <dl className="mt-auto grid grid-cols-2 sm:grid-cols-4 gap-3 border-t-2 border-dashed border-[var(--rule)] pt-4 text-sm">
                    {specs.map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-[10px] tracking-[.2em] text-[var(--ink-soft)] uppercase">{k}</dt>
                        <dd className="font-bold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section id="impact" className="pt-24 scroll-mt-16">
          <SectionHeader number="06" title="Impact" />
          <div className="blueprint grid sm:grid-cols-3 border-2 border-[var(--ink)] shadow-[6px_6px_0_var(--ink)]">
            {[
              ['45', 'Children reached'],
              ['01', 'Partner NGO — Ek Prayas'],
              ['45', 'Kits donated (Kit No. 001)'],
            ].map(([n, label], i) => (
              <div key={label} className={`text-center py-10 px-4 ${i ? 'sm:border-l-2 border-t-2 sm:border-t-0 border-white/20' : ''}`}>
                <p className="font-stencil text-6xl">{n}</p>
                <p className="mt-2 text-xs tracking-[.2em] uppercase opacity-90">{label}</p>
              </div>
            ))}
          </div>
          <div className="sheet mt-10 p-6 pt-8">
            <p className="text-xs tracking-[.2em] text-[var(--ink-soft)] mb-3">DISTRIBUTION LOGBOOK</p>
            <div className="border-t-2 border-dashed border-[var(--rule)] pt-4 flex flex-wrap items-center gap-4">
              <p className="font-type text-lg">Entry 001: Ek Prayas — 45 kits distributed.</p>
              <span className="stamp">DELIVERED</span>
            </div>
          </div>
        </section>

        {/* Get involved */}
        <section id="involved" className="pt-24 scroll-mt-16">
          <SectionHeader
            number="07"
            title="Get involved"
            subtitle="Partnering as an NGO or school, donating, or volunteering? Fill this in and we'll get back to you."
          />
          <InvolvedForm />
        </section>
      </div>
    </div>
  );
}
