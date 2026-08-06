import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../theme/useTheme';

/**
 * Navbar — collapsible horizontal navbar with premium glassmorphic design.
 * Can be toggled via a hamburger icon that persists when collapsed.
 */
export default function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const { theme, uiMode } = useTheme();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `text-sm font-medium transition-all duration-200 px-3 py-1.5 rounded-xl ${
      isActive(path) ? 'font-semibold' : ''
    }`;

  return (
    <>
      {/* Floating hamburger button when navbar is collapsed */}
      <AnimatePresence>
        {isCollapsed && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={() => setIsCollapsed(false)}
            className="fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-2xl border border-border-default bg-surface/80 text-muted shadow-app backdrop-blur-xl transition-all duration-200 hover:border-primary-soft hover:bg-primary-soft hover:text-primary hover:scale-105"
            aria-label="Show navbar"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main navbar */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-0 z-20 border-b border-border-default backdrop-blur-xl"
            style={{ backgroundColor: 'color-mix(in srgb, var(--surface) 82%, transparent)', color: 'var(--text-primary)' }}
          >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
              {/* Left: hamburger + sidebar toggle + logo */}
              <div className="flex items-center gap-2">
                {/* Collapse navbar button */}
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-muted transition-all duration-200 hover:text-text-primary"
                  aria-label="Hide navbar"
                  title="Hide navbar"
                >
                  <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                <Link to="/dashboard" className="flex items-center gap-2.5 ml-1">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-app">
                    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
                      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5">
                        <circle cx="10" cy="24" r="4" fill="currentColor" stroke="none" />
                        <circle cx="24" cy="10" r="4" fill="currentColor" stroke="none" />
                        <circle cx="38" cy="24" r="4" fill="currentColor" stroke="none" />
                        <circle cx="24" cy="38" r="4" fill="currentColor" stroke="none" />
                        <path d="M13 21L21 13" />
                        <path d="M27 13L35 21" />
                        <path d="M13 27L21 35" />
                        <path d="M27 35L35 27" />
                      </g>
                    </svg>
                  </div>
                  <span className="text-lg font-black tracking-tight text-text-primary">DecisionHub</span>
                </Link>
              </div>

              {/* Centre: nav links (desktop) */}
              <nav className="hidden items-center gap-1 md:flex">
                <Link
                  to="/dashboard"
                  className={navLinkClass('/dashboard')}
                  style={isActive('/dashboard') ? { color: 'var(--primary)', backgroundColor: 'var(--primary-soft)' } : { color: 'var(--text-secondary)' }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/analysis"
                  className={navLinkClass('/analysis')}
                  style={isActive('/analysis') ? { color: 'var(--primary)', backgroundColor: 'var(--primary-soft)' } : { color: 'var(--text-secondary)' }}
                >
                  Analysis
                </Link>
                <Link
                  to="/analytics"
                  className={navLinkClass('/analytics')}
                  style={isActive('/analytics') ? { color: 'var(--primary)', backgroundColor: 'var(--primary-soft)' } : { color: 'var(--text-secondary)' }}
                >
                  Analytics
                </Link>
                <Link
                  to="/decisions/create"
                  className={navLinkClass('/decisions/create')}
                  style={isActive('/decisions/create') ? { color: 'var(--primary)', backgroundColor: 'var(--primary-soft)' } : { color: 'var(--text-secondary)' }}
                >
                  Create
                </Link>
                <Link
                  to="/profile"
                  className={navLinkClass('/profile')}
                  style={isActive('/profile') ? { color: 'var(--primary)', backgroundColor: 'var(--primary-soft)' } : { color: 'var(--text-secondary)' }}
                >
                  Profile
                </Link>
              </nav>

              {/* Right: user + logout */}
              <div className="flex items-center gap-3">
                <div
                  className="hidden rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] sm:block"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--primary-soft)', color: 'var(--primary)' }}
                >
                  {theme} · {uiMode}
                </div>

                <div className="flex items-center gap-2.5">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name || user.email}
                      className="h-8 w-8 rounded-full bg-primary-soft"
                      style={{ boxShadow: '0 0 0 2px var(--primary-soft)' }}
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold leading-tight text-text-primary">{user?.name || 'User'}</p>
                    <p className="text-xs leading-tight text-muted">{user?.email}</p>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="rounded-xl border border-border-default px-3 py-1.5 text-xs font-bold bg-surface text-muted backdrop-blur-sm transition-all duration-200 hover:bg-surface-alt hover:text-text-primary"
                >
                  Log Out
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
}
