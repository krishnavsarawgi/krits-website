import React, { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { BookOpen, Home, Mail, Puzzle, User, Wrench } from 'lucide-react';
import NetworkBackground from './NetworkBackground.jsx';

export const EMAIL = 'krishnavsarawgi@gmail.com';
export const PHONE = '+91 9874038350';

const NAV = [
  ['Explainers', '/explainers'],
  ['Quizzes', '/quizzes'],
  ['Kits', '/kits'],
  ['About', '/kits#founder'],
];

// Bottom tab bar on phones, in place of a hamburger menu.
const TABS = [
  ['Home', '/', Home],
  ['Explainers', '/explainers', BookOpen],
  ['Quizzes', '/quizzes', Puzzle],
  ['Kits', '/kits', Wrench],
  ['About', '/kits#founder', User],
];

function TabBar() {
  const { pathname, hash } = useLocation();
  const isActive = (to) => {
    const [path, frag] = to.split('#');
    if (frag) return pathname === path && hash === `#${frag}`;
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path) && !(path === '/kits' && hash === '#founder');
  };
  return (
    <nav className="tabbar md:hidden" aria-label="Sections">
      {TABS.map(([label, to, Icon]) => (
        <Link key={to} to={to} className={isActive(to) ? 'active' : ''} aria-current={isActive(to) ? 'page' : undefined}>
          <Icon className="w-5 h-5" strokeWidth={isActive(to) ? 2.4 : 1.8} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}

// Scroll to the top on page change, or to the #hash target if there is one.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  const linkClass = ({ isActive }) =>
    `hover:text-[var(--safety)] underline-offset-4 ${isActive ? 'underline decoration-2' : 'hover:underline'}`;

  return (
    <div className="app-shell min-h-screen flex flex-col">
      <ScrollManager />
      <NetworkBackground />
      <nav className="topbar sticky top-0 z-50 bg-[var(--paper)] border-b-2 border-[var(--rule)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-stencil text-2xl tracking-[.3em] text-[var(--ink)]">KRITS</Link>
          <div className="hidden md:flex gap-7 text-xs font-bold tracking-[.15em] uppercase">
            {NAV.map(([label, to]) =>
              to.includes('#') ? (
                <Link key={to} to={to} className="hover:text-[var(--safety)] hover:underline underline-offset-4">
                  {label}
                </Link>
              ) : (
                <NavLink key={to} to={to} className={linkClass}>
                  {label}
                </NavLink>
              ),
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t-2 border-dashed border-[var(--rule)] mt-16 md:mt-24">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="kraft font-stencil w-14 h-14 rounded-full border-2 border-[var(--ink)] grid place-items-center text-sm tracking-wider">
              KRITS
            </span>
            <div className="text-xs tracking-[.15em] leading-relaxed">
              <p className="font-bold">KRITS — SCIENCE, EXPLAINED AND TESTED</p>
              <p className="text-[var(--ink-soft)]">EST. 2024 · © {new Date().getFullYear()} · VIDEOS BELONG TO THEIR CREATORS</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-xs font-bold tracking-[.15em] uppercase">
            <Link to="/explainers" className="hover:underline py-3">Explainers</Link>
            <Link to="/quizzes" className="hover:underline py-3">Quizzes</Link>
            <Link to="/kits" className="hover:underline py-3">Kits</Link>
            <a href={`mailto:${EMAIL}`} aria-label="Email" className="paper w-11 h-11 grid place-items-center border-2 border-[var(--ink)] bg-[var(--card)] hover:bg-[var(--safety)]">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
      <TabBar />
    </div>
  );
}
