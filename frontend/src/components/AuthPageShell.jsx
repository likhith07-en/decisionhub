import { motion } from 'framer-motion';
import BrandMark from './BrandMark';

export default function AuthPageShell({ title, subtitle, children, footer, accentText }) {
  return (
    <div className="min-h-screen bg-background px-4 py-6 text-text-primary sm:px-6 lg:px-8">
      <div
        className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-border-default shadow-app backdrop-blur-xl md:grid-cols-[1.05fr_0.95fr]"
        style={{ backgroundColor: 'color-mix(in srgb, var(--surface) 80%, transparent)' }}
      >
        <section
          className="relative hidden overflow-hidden px-8 py-10 md:flex md:flex-col md:justify-between lg:px-12 lg:py-12"
          style={{ background: 'var(--hero-gradient)' }}
        >
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              animate={{ x: [0, 24, 0], y: [0, -12, 0], scale: [1, 1.04, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-8 top-10 h-32 w-32 rounded-full blur-3xl"
              style={{ backgroundColor: 'var(--primary-soft)', opacity: 0.5 }}
            />
            <motion.div
              animate={{ x: [0, -18, 0], y: [0, 14, 0], scale: [1, 1.06, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-16 right-12 h-40 w-40 rounded-full blur-3xl"
              style={{ backgroundColor: 'var(--primary-soft)', opacity: 0.4 }}
            />
          </div>

          <div className="relative z-10 flex items-center">
            <BrandMark />
          </div>

          <div className="relative z-10 max-w-lg">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl font-black tracking-tight text-text-primary lg:text-6xl"
            >
              {accentText}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-lg text-lg leading-8 text-muted"
            >
              Create polls, compare options, and decide as a group with a beautifully shared workspace.
            </motion.p>
          </div>

          <div className="relative z-10 flex items-end justify-center">
            <motion.svg
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              viewBox="0 0 520 360"
              className="h-auto w-full max-w-[30rem] drop-shadow-[0_20px_50px_rgba(59,130,246,0.16)]"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="sceneWash" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#eff6ff" />
                  <stop offset="100%" stopColor="#dbeafe" />
                </linearGradient>
                <linearGradient id="laptopBody" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="screenGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="blueCloth" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>
              <rect x="40" y="46" width="440" height="250" rx="40" fill="url(#sceneWash)" opacity="0.55" />
              <circle cx="124" cy="90" r="44" fill="#bfdbfe" opacity="0.32" />
              <circle cx="396" cy="74" r="56" fill="#93c5fd" opacity="0.18" />
              <rect x="151" y="131" width="118" height="82" rx="14" fill="url(#laptopBody)" />
              <rect x="157" y="137" width="106" height="70" rx="10" fill="#0f172a" />
              <rect x="164" y="146" width="42" height="4" rx="2" fill="#60a5fa" opacity="0.9" />
              <rect x="164" y="156" width="70" height="4" rx="2" fill="#34d399" opacity="0.75" />
              <rect x="164" y="166" width="52" height="4" rx="2" fill="#fbbf24" opacity="0.75" />
              <path d="M132 216C146 210 171 207 260 207C349 207 374 210 388 216L382 226H138Z" fill="#cbd5e1" />
              <path d="M180 216H340C344 216 347 219 347 223V225H173V223C173 219 176 216 180 216Z" fill="#94a3b8" opacity="0.85" />
              <path d="M173 274C173 220 192 184 260 184C328 184 347 220 347 274C347 280 342 285 336 285H184C178 285 173 280 173 274Z" fill="url(#blueCloth)" />
              <circle cx="260" cy="144" r="30" fill="#fbd5b5" />
              <path d="M232 148C233 124 249 111 269 111C290 111 307 126 310 150C311 161 307 171 303 176C298 167 291 160 281 156C270 151 247 151 232 148Z" fill="#0f172a" />
            </motion.svg>
          </div>
        </section>

        <section
          className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12"
          style={{ backgroundColor: 'color-mix(in srgb, var(--surface) 70%, transparent)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-black tracking-tight text-text-primary">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{subtitle}</p>
            </div>
            {children}
            {footer ? <div className="mt-6 text-center text-sm text-muted">{footer}</div> : null}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
