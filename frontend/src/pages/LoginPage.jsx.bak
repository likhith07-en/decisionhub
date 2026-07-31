import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const spring = {
  type: 'spring',
  stiffness: 180,
  damping: 18,
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 md:px-6 md:py-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)] md:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)] px-8 py-10 md:flex md:flex-col md:justify-between lg:px-12 lg:py-12">
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              animate={{
                x: isFocused ? 16 : 0,
                y: isFocused ? -12 : 0,
                scale: isFocused ? 1.06 : 1,
              }}
              transition={spring}
              className="absolute left-8 top-10 h-32 w-32 rounded-full bg-blue-200/30 blur-3xl"
            />
            <motion.div
              animate={{
                x: isFocused ? -18 : 0,
                y: isFocused ? 10 : 0,
                scale: isFocused ? 1.08 : 1,
              }}
              transition={spring}
              className="absolute bottom-16 right-12 h-40 w-40 rounded-full bg-blue-300/20 blur-3xl"
            />
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-700">
              <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
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
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900">DecisionHub</h1>
              <p className="text-sm text-slate-500">Decide together</p>
            </div>
          </div>

          <div className="relative z-10 max-w-md">
            <h2 className="text-5xl font-black tracking-tight text-slate-900 lg:text-6xl">
              Better decisions, together.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-500">
              Create polls, compare options, and decide as a group with a shared workspace.
            </p>
          </div>

          <div className="relative z-10 flex items-end justify-center">
            <svg viewBox="0 0 520 360" className="h-auto w-full max-w-[30rem] drop-shadow-md" aria-hidden="true">
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
                <linearGradient id="hairDark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="skinWarm" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbd5b5" />
                  <stop offset="100%" stopColor="#f4b991" />
                </linearGradient>
                <linearGradient id="blueCloth" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0f172a" floodOpacity="0.12" />
                </filter>
                <filter id="innerGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#60a5fa" floodOpacity="0.45" />
                </filter>
              </defs>

              <rect x="40" y="46" width="440" height="250" rx="40" fill="url(#sceneWash)" opacity="0.55" />
              <circle cx="124" cy="90" r="44" fill="#bfdbfe" opacity="0.32" />
              <circle cx="396" cy="74" r="56" fill="#93c5fd" opacity="0.18" />

              <AnimatePresence>
                {isFocused && (
                  <motion.polygon
                    initial={{ opacity: 0, scaleY: 0.4 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0.4 }}
                    transition={{ duration: 0.32 }}
                    points="260,126 170,224 350,224"
                    fill="url(#screenGlow)"
                    style={{ originY: 1, filter: 'url(#innerGlow)' }}
                  />
                )}
              </AnimatePresence>

              <motion.g
                id="laptop"
                animate={{ y: isFocused ? -4 : 0, scale: isFocused ? 1.02 : 1 }}
                transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                filter="url(#softShadow)"
              >
                <rect x="151" y="131" width="118" height="82" rx="14" fill="url(#laptopBody)" />
                <rect x="157" y="137" width="106" height="70" rx="10" fill="#0f172a" />
                <rect x="164" y="146" width="42" height="4" rx="2" fill="#60a5fa" opacity="0.9" />
                <rect x="164" y="156" width="70" height="4" rx="2" fill="#34d399" opacity="0.75" />
                <rect x="164" y="166" width="52" height="4" rx="2" fill="#fbbf24" opacity="0.75" />
                <path d="M132 216C146 210 171 207 260 207C349 207 374 210 388 216L382 226H138Z" fill="#cbd5e1" />
                <path d="M180 216H340C344 216 347 219 347 223V225H173V223C173 219 176 216 180 216Z" fill="#94a3b8" opacity="0.85" />
              </motion.g>

              <motion.g
                id="person-left"
                animate={{ x: isFocused ? 10 : 0, rotate: isFocused ? 3.5 : 0, y: isFocused ? -2 : 0 }}
                transition={spring}
                whileHover={{ scale: 1.03, y: -4 }}
                style={{ originX: '95px', originY: '250px' }}
                className="cursor-pointer"
              >
                <path d="M63 274C63 228 81 193 118 193C155 193 173 228 173 274C173 279 168 284 163 284H73C68 284 63 279 63 274Z" fill="#1e3a8a" />
                <path d="M89 196C95 187 107 182 118 182C130 182 141 187 147 196L147 214H89Z" fill="#c7d2fe" opacity="0.85" />
                <circle cx="118" cy="155" r="26" fill="url(#skinWarm)" />
                <path d="M94 157C94 131 114 117 134 121C146 123 155 133 157 145C159 155 155 161 150 166C146 156 141 148 131 145C121 142 109 143 94 157Z" fill="url(#hairDark)" />
                <path d="M102 152C110 145 117 142 126 143" stroke="#334155" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />
                <path d="M98 166C104 169 112 171 118 171C124 171 132 169 138 166" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.25" />
              </motion.g>

              <motion.g
                id="person-center"
                animate={{ y: isFocused ? [-2, 2, -2] : 0, rotate: isFocused ? -1.2 : 0 }}
                transition={isFocused ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } : spring}
                whileHover={{ scale: 1.03, y: -4 }}
                style={{ originX: '200px', originY: '270px' }}
                className="cursor-pointer"
              >
                <path d="M173 274C173 220 192 184 260 184C328 184 347 220 347 274C347 280 342 285 336 285H184C178 285 173 280 173 274Z" fill="url(#blueCloth)" />
                <path d="M222 186C230 175 243 170 260 170C277 170 290 175 298 186L298 208H222Z" fill="#dbeafe" opacity="0.95" />
                <circle cx="260" cy="144" r="30" fill="url(#skinWarm)" />
                <path d="M232 148C233 124 249 111 269 111C290 111 307 126 310 150C311 161 307 171 303 176C298 167 291 160 281 156C270 151 247 151 232 148Z" fill="url(#hairDark)" />
                <ellipse cx="249" cy="145" rx="7" ry="4" fill="#0f172a" opacity="0.85" />
                <ellipse cx="272" cy="145" rx="7" ry="4" fill="#0f172a" opacity="0.85" />
                <path d="M251 154C255 157 265 157 269 154" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M248 161C253 164 267 164 272 161" stroke="#bfdbfe" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
              </motion.g>

              <motion.g
                id="person-right"
                animate={{ x: isFocused ? -10 : 0, rotate: isFocused ? -3.5 : 0, y: isFocused ? -2 : 0 }}
                transition={spring}
                whileHover={{ scale: 1.03, y: -4 }}
                style={{ originX: '305px', originY: '250px' }}
                className="cursor-pointer"
              >
                <path d="M347 274C347 228 329 193 292 193C255 193 237 228 237 274C237 279 242 284 247 284H337C342 284 347 279 347 274Z" fill="#2563eb" />
                <path d="M314 196C308 187 296 182 285 182C273 182 262 187 256 196L256 214H314Z" fill="#fde68a" opacity="0.9" />
                <circle cx="285" cy="155" r="26" fill="url(#skinWarm)" />
                <path d="M260 158C260 131 280 117 300 121C312 123 321 133 323 145C325 155 321 161 316 166C312 156 307 148 297 145C287 142 275 143 260 158Z" fill="#7c2d12" />
                <path d="M271 152C279 145 286 142 295 143" stroke="#92400e" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
              </motion.g>
            </svg>
          </div>
        </section>

        <section className="flex items-center justify-center bg-white px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-black tracking-tight text-slate-900">Welcome back</h2>
              <p className="mt-2 text-sm text-slate-500">Sign in to continue to your dashboard</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="demo@example.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  required
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label htmlFor="password" className="block text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
                    Password
                  </label>
                  <a href="#forgot" className="text-xs font-semibold text-blue-600">
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-2xl bg-blue-600 px-4 py-3.5 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
              >
                Log In
              </motion.button>

              <div className="flex items-center gap-4 py-2 text-sm text-slate-400">
                <span className="h-px flex-1 bg-slate-200" />
                <span>or</span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-sm font-black text-red-500 shadow-sm ring-1 ring-slate-200">
                  G
                </span>
                Sign in with Google
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Don&apos;t have an account? <Link to="/dashboard" className="font-bold text-blue-600">Sign up</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}