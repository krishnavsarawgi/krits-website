import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { CATEGORIES } from '../data/articles/index.js';

export const thumbUrl = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const watchUrl = (id) => `https://www.youtube.com/watch?v=${id}`;

export function today() {
  return new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

// Lead image of an article: the video thumbnail, which swaps for the player on click.
export function VideoFigure({ video }) {
  const [playing, setPlaying] = useState(false);
  if (!video) return null;
  return (
    <figure>
      <div className="relative aspect-video bg-black border border-[var(--ink)] overflow-hidden">
        {playing ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button onClick={() => setPlaying(true)} className="group absolute inset-0 w-full h-full" aria-label={`Play: ${video.title}`}>
            <img src={thumbUrl(video.id)} alt="" className="w-full h-full object-cover" />
            <span className="absolute inset-0 grid place-items-center bg-black/10 group-hover:bg-black/0 transition-colors">
              <span className="flex items-center gap-2 bg-[var(--safety)] text-[var(--ink)] border-2 border-[var(--ink)] shadow-[4px_4px_0_var(--ink)] px-4 py-2 text-xs font-bold tracking-[.15em] uppercase group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <Play className="w-4 h-4 fill-current" /> Watch the explainer
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)] font-serif-body italic">
        <span className="not-italic font-bold tracking-[.12em] text-[var(--ink)]">WATCH · </span>
        “{video.title}” — {video.channel}.{' '}
        <a href={watchUrl(video.id)} target="_blank" rel="noreferrer" className="underline underline-offset-2 not-italic">
          Open on YouTube ↗
        </a>
      </figcaption>
    </figure>
  );
}

export function Thumb({ video, className = '' }) {
  if (!video) return null;
  return (
    <div className={`relative aspect-video overflow-hidden border border-[var(--ink)] bg-black ${className}`}>
      <img src={thumbUrl(video.id)} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
      <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 bg-[var(--ink)] text-[var(--paper)] text-[10px] font-bold tracking-wider px-1.5 py-0.5">
        <Play className="w-2.5 h-2.5 fill-current" /> VIDEO
      </span>
    </div>
  );
}

export function Kicker({ cat }) {
  return <p className="kicker">{CATEGORIES[cat]?.label}</p>;
}

export function ArticleCard({ a, size = 'md' }) {
  const big = size === 'lg';
  return (
    <Link to={`/explainers/${a.slug}`} className="group block">
      {size !== 'sm' && <Thumb video={a.video} className="mb-3" />}
      <Kicker cat={a.cat} />
      <h3
        className={`font-news font-bold leading-tight mt-1 group-hover:underline decoration-1 underline-offset-4 ${
          big ? 'text-3xl md:text-5xl font-black' : size === 'sm' ? 'text-lg' : 'text-xl'
        }`}
      >
        {a.title}
      </h3>
      {size !== 'sm' && (
        <p className={`font-serif-body mt-2 text-[var(--ink-soft)] leading-snug ${big ? 'text-lg md:text-xl italic' : 'text-[15px]'}`}>{a.dek}</p>
      )}
      <p className="mt-2 text-[11px] tracking-[.12em] uppercase text-[var(--ink-soft)]">{a.readMins} min read</p>
    </Link>
  );
}
