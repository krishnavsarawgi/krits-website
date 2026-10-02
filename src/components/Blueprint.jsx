import React from 'react';

export function SectionHeader({ number, title, subtitle }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="tag">SEC. {number}</span>
        <div className="flex-1 border-t-2 border-dashed border-[var(--rule)]" />
      </div>
      <h2 className="font-stencil text-4xl md:text-5xl tracking-wide text-[var(--ink)] uppercase">{title}</h2>
      {subtitle && <p className="mt-2 text-[var(--ink-soft)]">{subtitle}</p>}
    </div>
  );
}

export function Rivet({ className = '' }) {
  return <span className={`absolute w-2 h-2 rounded-full border border-current opacity-60 ${className}`} />;
}

// Simple line drawing of the flagship car kit, drawn as a blueprint.
export function CarBlueprint() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="40" y="70" width="240" height="22" />
      {Array.from({ length: 15 }).map((_, i) => (
        <circle key={i} cx={52 + i * 15.5} cy="81" r="3" />
      ))}
      <rect x="70" y="48" width="140" height="22" />
      {Array.from({ length: 9 }).map((_, i) => (
        <circle key={i} cx={82 + i * 15} cy="59" r="3" />
      ))}
      <line x1="60" y1="120" x2="260" y2="120" strokeDasharray="4 4" />
      {[85, 235].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="120" r="26" />
          <circle cx={cx} cy="120" r="18" />
          <circle cx={cx} cy="120" r="4" />
          {[0, 60, 120].map((a) => (
            <line
              key={a}
              x1={cx + 18 * Math.cos((a * Math.PI) / 180)}
              y1={120 + 18 * Math.sin((a * Math.PI) / 180)}
              x2={cx - 18 * Math.cos((a * Math.PI) / 180)}
              y2={120 - 18 * Math.sin((a * Math.PI) / 180)}
            />
          ))}
        </g>
      ))}
      <line x1="40" y1="165" x2="280" y2="165" strokeWidth="1" />
      <line x1="40" y1="160" x2="40" y2="170" strokeWidth="1" />
      <line x1="280" y1="160" x2="280" y2="170" strokeWidth="1" />
      <text x="160" y="160" textAnchor="middle" fontSize="9" fill="currentColor" stroke="none" fontFamily="Courier Prime">
        240 mm
      </text>
    </svg>
  );
}

// Lifting arm for the crane kit.
export function CraneBlueprint() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="110" y="140" width="100" height="18" />
      <line x1="160" y1="140" x2="160" y2="50" />
      <line x1="150" y1="140" x2="150" y2="55" />
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={i} x1="150" y1={135 - i * 14} x2="160" y2={128 - i * 14} />
      ))}
      <line x1="150" y1="50" x2="270" y2="30" />
      <line x1="150" y1="58" x2="270" y2="38" />
      <line x1="150" y1="50" x2="90" y2="62" />
      <rect x="70" y="58" width="22" height="18" />
      <circle cx="155" cy="54" r="7" />
      <line x1="262" y1="36" x2="262" y2="100" strokeDasharray="3 3" />
      <path d="M255 100 h14 v10 q-7 10 -14 0 z" />
      <text x="200" y="125" fontSize="9" fill="currentColor" stroke="none" fontFamily="Courier Prime">
        PROTOTYPE
      </text>
    </svg>
  );
}

// An atom drawn blueprint-style, used as the explainer/quiz motif.
export function AtomBlueprint() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="100" cy="100" r="9" />
      <circle cx="100" cy="100" r="3" fill="currentColor" />
      {[0, 60, 120].map((a) => (
        <ellipse key={a} cx="100" cy="100" rx="80" ry="28" transform={`rotate(${a} 100 100)`} />
      ))}
      <circle cx="180" cy="100" r="4" fill="currentColor" />
      <circle cx="60" cy="31" r="4" fill="currentColor" />
      <circle cx="60" cy="169" r="4" fill="currentColor" />
      <circle cx="100" cy="100" r="95" strokeDasharray="2 6" strokeWidth="1" />
    </svg>
  );
}
