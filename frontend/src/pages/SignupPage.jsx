import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import AuthPageShell from '../components/AuthPageShell';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const { register, loginWithGoogle, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    setFormError('');
    clearError();

    if (!name || !email || !password || !confirmPassword) {
      setFormError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setFormError('Password should be at least 6 characters long.');
      return;
    }

    try {
      setIsSubmitting(true);
      await register(name, email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setFormError(err.message || 'Registration failed. Please try again.');
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
      setFormError(err.message || 'Google sign-up failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeError = formError || error;

  return (
    <AuthPageShell
      title="Create your workspace"
      subtitle="Bring your team together with thoughtful polls and fast decisions."
      accentText="Start collaborating with elegance."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 transition hover:text-blue-700">
            Sign in
          </Link>
        </>
      }
    >
      {activeError && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          <svg className="h-5 w-5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{activeError}</span>
        </div>
      )}

      <form onSubmit={handleSignupSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
              Full name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ava Nguyen"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@company.com"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Re-enter password"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            required
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3.5 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Creating account...</span>
            </>
          ) : (
            <span>Create account</span>
          )}
        </motion.button>

        <div className="flex items-center gap-4 py-2 text-sm text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          <span>or</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSubmit}
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-70"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-sm font-black text-red-500 shadow-sm ring-1 ring-slate-200">
            G
          </span>
          Sign up with Google
        </button>
      </form>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
        <Link to="/login" className="font-semibold text-blue-600 transition hover:text-blue-700">
          Back to sign in
        </Link>
        <span className="text-slate-300">•</span>
        <Link to="/forgot-password" className="font-semibold text-blue-600 transition hover:text-blue-700">
          Reset password
        </Link>
      </div>
    </AuthPageShell>
  );
}
