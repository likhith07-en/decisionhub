import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

export default function PageTransition({ children }) {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      setShowLoader(false);
      return undefined;
    }

    setShowLoader(true);
    const timer = window.setTimeout(() => setShowLoader(false), 500);
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
              transition={{ duration: 0.2 }}
              className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(248,250,252,0.92))]"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: [0.92, 1.02, 0.98, 1], opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/70 bg-white/70 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
              >
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.06, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative"
                >
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.75, 1], boxShadow: ['0 0 0 rgba(59,130,246,0.12)', '0 0 32px rgba(59,130,246,0.18)', '0 0 0 rgba(59,130,246,0.12)'] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-blue-500 via-cyan-400 to-white"
                  >
                    <svg viewBox="0 0 48 48" className="h-8 w-8 text-white" aria-hidden="true">
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
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
