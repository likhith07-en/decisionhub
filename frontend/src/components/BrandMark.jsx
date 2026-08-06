import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function BrandMark({ className = '' }) {
  return (
    <Link to="/login" className={`inline-flex ${className}`} aria-label="Go back to login">
      <motion.div
        layoutId="decisionhub-mark"
        className="flex items-center gap-3"
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
      >
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-default text-primary backdrop-blur-xl shadow-app"
          style={{ backgroundColor: 'color-mix(in srgb, var(--surface) 80%, transparent)' }}
        >
          <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
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
        <div>
          <p className="text-lg font-black tracking-tight text-text-primary">DecisionHub</p>
          <p className="text-sm text-muted">Decide together</p>
        </div>
      </motion.div>
    </Link>
  );
}
