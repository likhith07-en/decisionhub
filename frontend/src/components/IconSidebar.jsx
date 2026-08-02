import { motion } from 'framer-motion';

/**
 * IconSidebar — slim, always-visible vertical sidebar pinned to the right edge.
 * Contains icon-only buttons for notifications, theme toggle, settings, and help.
 * Internal functionality will be added later — these are UI placeholders.
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
  return (
    <motion.aside
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed right-0 top-0 z-30 hidden h-screen w-[60px] flex-col items-center justify-center gap-3 border-l border-slate-200/40 bg-white/40 py-4 backdrop-blur-xl sm:flex"
    >
      {/* DecisionHub micro-logo at top */}
      <motion.div
        variants={itemVariants}
        className="mb-auto mt-3 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 text-blue-600"
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
  );
}
