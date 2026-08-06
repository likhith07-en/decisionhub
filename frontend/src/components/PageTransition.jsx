import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';

const transitionVariants = {
  initial: {
    opacity: 0,
    y: 18,
    scale: 0.985,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 1.01,
    filter: 'blur(6px)',
  },
};

const quotes = [
  'Great decisions start with great conversations...',
  'Bringing your team\'s ideas together...',
  'Your collaborative workspace is loading...',
  'Empowering smarter choices, one vote at a time...',
  'Where every voice matters in every decision...',
  'Building consensus, creating impact...',
  'Transform ideas into actionable decisions...',
  'Collaboration is the key to innovation...',
];

export default function PageTransition({ children }) {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [showLoader, setShowLoader] = useState(true);

  const quote = useMemo(
    () => quotes[Math.floor(Math.random() * quotes.length)],
    [location.pathname]
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setShowLoader(false);
      return undefined;
    }

    setShowLoader(true);
    const timer = window.setTimeout(() => setShowLoader(false), 2000);
    return () => window.clearTimeout(timer);
  }, [location.pathname, prefersReducedMotion]);

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={prefersReducedMotion ? false : transitionVariants.initial}
          animate={prefersReducedMotion ? false : transitionVariants.animate}
          exit={prefersReducedMotion ? false : transitionVariants.exit}
          transition={{
            duration: prefersReducedMotion ? 0.15 : 0.5,
            ease: [0.22, 1, 0.36, 1],
            type: 'tween',
          }}
          className="min-h-screen w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {!prefersReducedMotion && (
        <AnimatePresence>
          {showLoader && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center"
              style={{ background: 'var(--loader-bg)' }}
            >
              {/* Ambient floating orbs */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -20, 15, 0],
                    scale: [1, 1.2, 0.9, 1],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-[15%] top-[20%] h-48 w-48 rounded-full blur-3xl"
                  style={{ backgroundColor: 'var(--primary-soft)' }}
                />
                <motion.div
                  animate={{
                    x: [0, -25, 20, 0],
                    y: [0, 15, -25, 0],
                    scale: [1, 0.85, 1.15, 1],
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-[20%] right-[15%] h-56 w-56 rounded-full blur-3xl"
                  style={{ backgroundColor: 'var(--primary-soft)', opacity: 0.6 }}
                />
                <motion.div
                  animate={{
                    x: [0, 15, -15, 0],
                    y: [0, -10, 20, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-[50%] top-[60%] h-32 w-32 -translate-x-1/2 rounded-full blur-3xl"
                  style={{ backgroundColor: 'var(--primary-soft)', opacity: 0.5 }}
                />
              </div>

              {/* Main loader content */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center gap-6"
              >
                {/* Glassmorphic logo container */}
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: [0.95, 1.02, 0.98, 1] }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="flex h-28 w-28 items-center justify-center rounded-[2.2rem] border border-border-default backdrop-blur-2xl"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--surface) 60%, transparent)', boxShadow: 'var(--shadow)' }}
                >
                  {/* Spinning + color-shifting logo */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="relative"
                  >
                    <div className="logo-color-shift flex h-16 w-16 items-center justify-center rounded-[1.6rem] bg-primary shadow-app">
                      <svg viewBox="0 0 48 48" className="h-9 w-9 text-white" aria-hidden="true">
                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4">
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
                  </motion.div>
                </motion.div>

                {/* Brand name */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="text-center"
                >
                  <h2 className="text-xl font-black tracking-tight text-text-primary">
                    DecisionHub
                  </h2>
                </motion.div>

                {/* Buffer / Progress bar */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0.5 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="w-48 overflow-hidden rounded-full bg-surface-alt backdrop-blur-sm"
                  style={{ height: '4px' }}
                >
                  <div className="buffer-progress h-full w-full rounded-full" />
                </motion.div>

                {/* Motivational quote */}
                <motion.p
                  key={quote}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="max-w-xs text-center text-sm font-medium italic text-muted"
                >
                  "{quote}"
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
