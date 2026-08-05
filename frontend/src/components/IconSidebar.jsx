import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../theme/useTheme';

/**
 * IconSidebar — slim control rail pinned to the right edge.
 * It hosts quick actions for theme switching, preferences, and help.
 */

const sidebarItems = [
  {
    id: 'notifications',
    label: 'Notifications',
    hasNotif: true,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    id: 'theme',
    label: 'Toggle Theme',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'help',
    label: 'Help & Info',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 15, scale: 0.8 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export default function IconSidebar() {
  const { theme, uiMode, setUiMode, cycleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState('settings');

  const openPanel = (panelId) => {
    setActivePanel(panelId);
    setIsOpen(true);
  };

  const closePanel = () => setIsOpen(false);

  return (
    <>
    <motion.aside
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed right-0 top-0 z-30 hidden h-screen w-[60px] flex-col items-center justify-center gap-3 border-l border-slate-200/40 bg-white/40 py-4 backdrop-blur-xl sm:flex"
    >
      {/* DecisionHub micro-logo at top */}
      <motion.div
        variants={itemVariants}
        className="mb-auto mt-3 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 text-primary"
      >
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
      </motion.div>

      {/* Icon buttons - centered */}
      <div className="flex flex-col items-center gap-2">
        {sidebarItems.map((item) => (
          <motion.button
            key={item.id}
            variants={itemVariants}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (item.id === 'theme') {
                cycleTheme();
                return;
              }
              openPanel(item.id);
            }}
            className={`icon-sidebar-btn ${item.hasNotif ? 'notif-pulse notif-dot' : ''}`}
            title={item.label}
            aria-label={item.label}
          >
            {item.icon}
          </motion.button>
        ))}
      </div>

      {/* Spacer to keep icons centered */}
      <div className="mt-auto mb-3" />
    </motion.aside>

    {isOpen && (
      <div className="fixed inset-0 z-40 bg-slate-900/25 backdrop-blur-sm" onClick={closePanel} />
    )}

    <motion.aside
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: isOpen ? 0 : 320, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="fixed right-0 top-0 z-50 h-screen w-[320px] border-l p-5 shadow-2xl backdrop-blur-xl"
      style={{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface)', color: 'var(--app-text)' }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--app-muted)' }}>Quick tools</p>
          <h3 className="text-lg font-black" style={{ color: 'var(--app-text)' }}>
            {activePanel === 'settings' ? 'Preferences' : activePanel === 'help' ? 'Help & Info' : 'Notifications'}
          </h3>
        </div>
        <button onClick={closePanel} className="rounded-xl p-2" style={{ color: 'var(--app-muted)' }} aria-label="Close panel">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {activePanel === 'settings' ? (
          <>
            <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface-alt)' }}>
              <p className="text-sm font-semibold" style={{ color: 'var(--app-text)' }}>Theme</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {['default', 'light', 'dark'].map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setPreferences({ theme })}
                    className={`rounded-xl border px-3 py-2 text-sm font-semibold ${preferences.theme === theme ? 'border-primary bg-primary-soft text-primary-hover' : ''}`}
                    style={preferences.theme === theme ? { borderColor: 'var(--app-accent)', backgroundColor: 'var(--app-accent-soft)', color: 'var(--app-accent)' } : { borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface)', color: 'var(--app-text)' }}
                  >
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface-alt)' }}>
              <p className="text-sm font-semibold" style={{ color: 'var(--app-text)' }}>Font</p>
              <div className="mt-3 space-y-3">
                <label className="block text-sm" style={{ color: 'var(--app-muted)' }}>
                  <span className="mb-1 block">Family</span>
                  <select
                    value={preferences.fontFamily}
                    onChange={(e) => setPreferences({ fontFamily: e.target.value })}
                    className="w-full rounded-xl border px-3 py-2 text-sm"
                    style={{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface)', color: 'var(--app-text)' }}
                  >
                    {['Inter', 'Poppins', 'Roboto', 'Space Grotesk'].map((font) => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm" style={{ color: 'var(--app-muted)' }}>
                  <span className="mb-1 block">Size</span>
                  <select
                    value={preferences.fontSize}
                    onChange={(e) => setPreferences({ fontSize: e.target.value })}
                    className="w-full rounded-xl border px-3 py-2 text-sm"
                    style={{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface)', color: 'var(--app-text)' }}
                  >
                    <option value="sm">Small</option>
                    <option value="md">Medium</option>
                    <option value="lg">Large</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface-alt)' }}>
              <p className="text-sm font-semibold" style={{ color: 'var(--app-text)' }}>UI Mode</p>
              <p className="text-xs text-secondary">Contrast and accent tone for buttons, highlights, and hero elements.</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {['black', 'green', 'saffron', 'royal'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setUiMode(mode)}
                    className={`h-8 w-8 rounded-full shadow-sm transition-transform hover:scale-110 ${uiMode === mode ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                    style={preferences.uiMode === mode ? { borderColor: 'var(--app-accent)', backgroundColor: 'var(--app-accent-soft)', color: 'var(--app-accent)' } : { borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface)', color: 'var(--app-text)' }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : activePanel === 'help' ? (
          <div className="space-y-4">
            <div className="rounded-2xl border p-4 text-sm" style={{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface-alt)', color: 'var(--app-muted)' }}>
              <p className="font-semibold" style={{ color: 'var(--app-text)' }}>Need help?</p>
              <p className="mt-2">Access support resources and policy pages directly from this panel.</p>
            </div>

            <div className="rounded-2xl border border-default bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Quick links</p>
              <div className="mt-4 space-y-3">
                <Link
                  to="/contact-support"
                  className="block rounded-2xl border border-default bg-surface px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary-soft hover:bg-primary-soft"
                  onClick={closePanel}
                >
                  Contact Support
                </Link>
                <Link
                  to="/privacy-policy"
                  className="block rounded-2xl border border-default bg-surface px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary-soft hover:bg-primary-soft"
                  onClick={closePanel}
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms-conditions"
                  className="block rounded-2xl border border-default bg-surface px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary-soft hover:bg-primary-soft"
                  onClick={closePanel}
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border p-4 text-sm" style={{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface-alt)', color: 'var(--app-muted)' }}>
            <p className="font-semibold" style={{ color: 'var(--app-text)' }}>Notifications</p>
            <p className="mt-2">No new alerts right now. This area is ready for future backend-driven notifications.</p>
          </div>
        )}
      </div>
    </motion.aside>
    </>
  );
}
