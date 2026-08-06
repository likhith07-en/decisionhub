import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const spring = {
  type: 'spring',
  stiffness: 180,
  damping: 18,
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const { login, loginWithGoogle, user, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setFormError('');
    clearError();

    if (!email || !password) {
      setFormError('Please enter both email and password.');
      return;
    }

    try {
      setIsSubmitting(true);
      await login(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setFormError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSubmit = async () => {
    setFormError('');
    clearError();

    try {
      setIsSubmitting(true);
      await loginWithGoogle();
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setFormError(err.message || 'Google sign-in failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeError = formError || error;

  return (
    <div className="min-h-screen bg-background px-4 py-6 text-primary md:px-6 md:py-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-surface shadow-[0_24px_70px_rgba(15,23,42,0.12)] md:grid-cols-2">
        <section className="relative hidden overflow-hidden px-8 py-10 md:flex md:flex-col md:justify-between lg:px-12 lg:py-12" style={{ background: 'var(--hero-gradient)' }}>
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              animate={{
                x: isFocused ? 16 : 0,
                y: isFocused ? -12 : 0,
                scale: isFocused ? 1.06 : 1,
              }}
              transition={spring}
              className="absolute left-8 top-10 h-32 w-32 rounded-full blur-3xl"
              style={{ backgroundColor: 'var(--primary-soft)', opacity: 0.5 }}
            />
            <motion.div
              animate={{
                x: isFocused ? -18 : 0,
                y: isFocused ? 10 : 0,
                scale: isFocused ? 1.08 : 1,
              }}
              transition={spring}
              className="absolute bottom-16 right-12 h-40 w-40 rounded-full blur-3xl"
              style={{ backgroundColor: 'var(--primary-soft)', opacity: 0.4 }}
            />
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
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
              <h1 className="text-2xl font-black tracking-tight text-text-primary">DecisionHub</h1>
              <p className="text-sm text-muted">Decide together</p>
            </div>
          </div>

          <div className="relative z-10 max-w-md">
            <h2 className="text-5xl font-black tracking-tight text-primary lg:text-6xl">
              Better decisions, together.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-muted">
              Create polls, compare options, and decide as a group with a shared workspace.
            </p>
          </div>

          <div className="relative z-10 flex items-end justify-center">
            <svg viewBox="0 0 520 360" className="h-auto w-full max-w-[30rem] drop-shadow-md" aria-hidden="true">
              <defs>
                <linearGradient id="sceneWash" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f7fbff" />
                  <stop offset="55%" stopColor="#eef4ff" />
                  <stop offset="100%" stopColor="#e8f2ff" />
                </linearGradient>
                <linearGradient id="orbBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.08" />
                </linearGradient>
                <linearGradient id="laptopBody" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="screenInner" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#111827" />
                </linearGradient>
                <linearGradient id="screenGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="skinWarm" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fde2c8" />
                  <stop offset="100%" stopColor="#f2b98c" />
                </linearGradient>
                <linearGradient id="hairDark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1f2937" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="clothBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#0f172a" floodOpacity="0.12" />
                </filter>
                <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="0" stdDeviation="16" floodColor="#60a5fa" floodOpacity="0.32" />
                </filter>
              </defs>

              <rect x="34" y="38" width="452" height="264" rx="46" fill="url(#sceneWash)" opacity="0.72" />
              <motion.ellipse
                cx="150"
                cy="86"
                rx="62"
                ry="38"
                animate={{ scale: isFocused ? [1, 1.08, 1] : 1, opacity: isFocused ? 0.6 : 0.35 }}
                transition={isFocused ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : spring}
                fill="url(#orbBlue)"
                filter="url(#glow)"
              />
              <motion.circle
                cx="396"
                cy="82"
                r="52"
                animate={{ y: isFocused ? -6 : 0, scale: isFocused ? 1.05 : 1 }}
                transition={spring}
                fill="#bfdbfe"
                opacity="0.22"
              />
              <motion.circle
                cx="92"
                cy="250"
                r="28"
                animate={{ y: isFocused ? -8 : 0, opacity: isFocused ? 0.65 : 0.35 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                fill="#dbeafe"
              />

              <AnimatePresence>
                {isFocused && (
                  <motion.polygon
                    initial={{ opacity: 0, scaleY: 0.5 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0.5 }}
                    transition={{ duration: 0.28 }}
                    points="260,126 172,228 348,228"
                    fill="url(#screenGlow)"
                    style={{ originY: 1, filter: 'url(#glow)' }}
                  />
                )}
              </AnimatePresence>

              <motion.g
                id="laptop"
                animate={{ y: isFocused ? -5 : 0, scale: isFocused ? 1.02 : 1 }}
                transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                filter="url(#softShadow)"
              >
                <rect x="154" y="132" width="112" height="78" rx="18" fill="url(#laptopBody)" />
                <rect x="161" y="139" width="98" height="64" rx="12" fill="url(#screenInner)" />
                <rect x="171" y="150" width="46" height="4" rx="2" fill="#93c5fd" opacity="0.9" />
                <rect x="171" y="160" width="70" height="4" rx="2" fill="#86efac" opacity="0.72" />
                <rect x="171" y="170" width="52" height="4" rx="2" fill="#fde68a" opacity="0.72" />
                <path d="M128 212C144 206 170 203 260 203C350 203 376 206 392 212L386 224H134Z" fill="#d1d5db" />
                <path d="M180 212H340C345 212 349 216 349 221V224H171V221C171 216 175 212 180 212Z" fill="#94a3b8" opacity="0.88" />
              </motion.g>

              <motion.g
                id="person-left"
                animate={{ x: isFocused ? 10 : 0, rotate: isFocused ? 2.8 : 0, y: isFocused ? -2 : 0 }}
                transition={spring}
                whileHover={{ scale: 1.03, y: -4 }}
                style={{ originX: '100px', originY: '252px' }}
                className="cursor-pointer"
              >
                <path d="M65 276C65 232 84 198 118 198C152 198 171 232 171 276C171 281 167 285 162 285H74C69 285 65 281 65 276Z" fill="#1e3a8a" opacity="0.98" />
                <path d="M88 202C95 193 106 188 118 188C130 188 141 193 148 202L148 217H88Z" fill="#c7d2fe" opacity="0.9" />
                <circle cx="118" cy="158" r="25" fill="url(#skinWarm)" />
                <path d="M95 160C95 136 113 123 131 126C144 128 154 138 156 150C158 160 155 167 150 171C146 160 140 152 131 149C121 146 108 147 95 160Z" fill="url(#hairDark)" />
                <path d="M101 158C109 151 117 148 126 149" stroke="#334155" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.75" />
              </motion.g>

              <motion.g
                id="person-center"
                animate={{ y: isFocused ? [-2, 2, -2] : 0, rotate: isFocused ? -1.1 : 0 }}
                transition={isFocused ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : spring}
                whileHover={{ scale: 1.03, y: -4 }}
                style={{ originX: '200px', originY: '272px' }}
                className="cursor-pointer"
              >
                <path d="M173 276C173 223 194 186 260 186C326 186 347 223 347 276C347 281 343 285 338 285H182C177 285 173 281 173 276Z" fill="url(#clothBlue)" />
                <path d="M223 189C231 177 244 171 260 171C276 171 289 177 297 189L297 209H223Z" fill="#dbeafe" opacity="0.95" />
                <circle cx="260" cy="146" r="29" fill="url(#skinWarm)" />
                <path d="M233 149C234 126 249 114 268 114C288 114 304 128 308 151C309 163 306 171 302 176C297 168 290 161 280 157C270 153 247 152 233 149Z" fill="url(#hairDark)" />
                <ellipse cx="250" cy="146" rx="7" ry="4" fill="#0f172a" opacity="0.8" />
                <ellipse cx="271" cy="146" rx="7" ry="4" fill="#0f172a" opacity="0.8" />
                <path d="M251 155C255 158 265 158 269 155" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </motion.g>

              <motion.g
                id="person-right"
                animate={{ x: isFocused ? -10 : 0, rotate: isFocused ? -2.8 : 0, y: isFocused ? -2 : 0 }}
                transition={spring}
                whileHover={{ scale: 1.03, y: -4 }}
                style={{ originX: '300px', originY: '252px' }}
                className="cursor-pointer"
              >
                <path d="M351 276C351 232 332 198 298 198C264 198 245 232 245 276C245 281 249 285 254 285H342C347 285 351 281 351 276Z" fill="#2563eb" opacity="0.98" />
                <path d="M302 202C295 193 284 188 272 188C260 188 249 193 242 202L242 217H302Z" fill="#fde68a" opacity="0.92" />
                <circle cx="286" cy="158" r="25" fill="url(#skinWarm)" />
                <path d="M262 160C262 136 280 123 298 126C311 128 321 138 323 150C325 160 322 167 317 171C313 160 307 152 298 149C288 146 275 147 262 160Z" fill="#7c2d12" />
                <path d="M270 158C278 151 286 148 295 149" stroke="#92400e" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85" />
              </motion.g>
            </svg>
          </div>
        </section>

        <section className="flex items-center justify-center bg-surface px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-black tracking-tight text-text-primary">Welcome back</h2>
              <p className="mt-2 text-sm text-muted">Sign in to continue to your dashboard</p>
            </div>

            {activeError && (
              <div className="mb-6 flex items-center gap-3 rounded-2xl p-4 text-sm" style={{ backgroundColor: 'var(--error-bg)', border: '1px solid var(--error-border)', color: 'var(--error-text)' }}>
                <svg className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--error-text)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{activeError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-muted">
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
                  className="app-input px-4 py-3"
                  required
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label htmlFor="password" className="block text-xs font-bold uppercase tracking-[0.2em] text-muted">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-xs font-semibold text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="••••••••"
                  className="app-input px-4 py-3"
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3.5 font-bold text-white shadow-app transition hover:bg-primary-hover disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Log In</span>
                )}
              </motion.button>

              <div className="flex items-center gap-4 py-2 text-sm text-secondary">
                <span className="h-px flex-1 bg-surface-alt" />
                <span>or</span>
                <span className="h-px flex-1 bg-surface-alt" />
              </div>

              <button
                type="button"
                onClick={handleGoogleSubmit}
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-border-default bg-surface px-4 py-3 font-semibold text-muted transition hover:bg-surface-alt disabled:opacity-70"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface text-sm font-black text-red-500 shadow-sm ring-1 ring-default">
                  G
                </span>
                Sign in with Google
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-secondary">
              Don&apos;t have an account? <Link to="/signup" className="font-bold text-primary hover:underline">Sign up</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
