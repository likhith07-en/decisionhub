import React from 'react';

/**
 * Footer — light theme, matches original design system.
 */
const Footer = () => {
  return (
    <footer className="mt-auto border-t border-surface bg-surface py-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 text-xs text-muted">
        <div className="flex items-center gap-2">
          {/* DecisionHub logo mark */}
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary-soft text-primary">
            <svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden="true">
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
          <span className="font-semibold text-secondary">DecisionHub</span>
        </div>
        <p>© {new Date().getFullYear()} DecisionHub. All rights reserved.</p>
        <span className="hidden sm:block">Decide together.</span>
      </div>
    </footer>
  );
};

export default Footer;
