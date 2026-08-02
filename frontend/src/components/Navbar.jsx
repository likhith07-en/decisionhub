import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

/**
 * Navbar — collapsible horizontal navbar with premium glassmorphic design.
 * Can be toggled via a hamburger icon that persists when collapsed.
 */
export default function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `text-sm font-medium transition-all duration-200 px-3 py-1.5 rounded-xl ${
      isActive(path)
        ? 'text-blue-600 font-semibold bg-blue-50'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
            className="fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200/60 bg-white/80 text-slate-600 shadow-lg shadow-slate-200/40 backdrop-blur-xl transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
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
            className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl"
          >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
              {/* Left: hamburger + sidebar toggle + logo */}
              <div className="flex items-center gap-2">
                {/* Collapse navbar button */}
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Hide navbar"
                  title="Hide navbar"
                >
                  <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                {/* Sidebar toggle (for left nav sidebar) */}
                {onToggleSidebar && (
                  <button
                    onClick={onToggleSidebar}
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Toggle sidebar"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h12M3 17h18" />
                    </svg>
                  </button>
                )}

                <Link to="/dashboard" className="flex items-center gap-2.5 ml-1">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md shadow-blue-200/50">
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
                  <span className="text-lg font-black tracking-tight text-slate-900">DecisionHub</span>
                </Link>
              </div>

              {/* Centre: nav links (desktop) */}
              <nav className="hidden items-center gap-1 md:flex">
                <Link to="/dashboard" className={navLinkClass('/dashboard')}>Dashboard</Link>
                <Link to="/decisions/create" className={navLinkClass('/decisions/create')}>Create</Link>
                <Link to="/profile" className={navLinkClass('/profile')}>Profile</Link>
              </nav>

              {/* Right: user + logout */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2.5">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name || user.email}
                      className="h-8 w-8 rounded-full bg-blue-100 ring-2 ring-blue-500/20"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-bold text-white">
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-slate-900 leading-tight">{user?.name || 'User'}</p>
                    <p className="text-xs text-slate-400 leading-tight">{user?.email}</p>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="rounded-xl border border-slate-200/60 bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-600 backdrop-blur-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
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
