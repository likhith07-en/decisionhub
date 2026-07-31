import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AuthPageShell from '../components/AuthPageShell';
import { resetPasswordApi } from '../api/axiosClient';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleResetSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    if (!email) {
      setFormError('Please enter your email address.');
      return;
    }

    try {
      setIsSubmitting(true);
      await resetPasswordApi(email);
      setIsSubmitted(true);
    } catch (err) {
      setFormError(err.message || 'Failed to send reset link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPageShell
      title="Reset your password"
      subtitle="Enter your email and we’ll send a secure reset link to your inbox."
      accentText="A calm reset, built for clarity."
      footer={
        <>
          Remembered it?{' '}
          <Link to="/login" className="font-semibold text-blue-600 transition hover:text-blue-700">
            Back to login
          </Link>
        </>
      }
    >
      {formError && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          <svg className="h-5 w-5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{formError}</span>
        </div>
      )}

      {isSubmitted ? (
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Check your email</h3>
            <p className="mt-2 text-sm text-slate-500">
              We have sent password reset instructions to <span className="font-semibold text-slate-800">{email}</span>.
            </p>
          </div>
          <Link to="/login" className="block w-full rounded-2xl bg-blue-600 px-4 py-3.5 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">
            Return to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={handleResetSubmit} className="space-y-5">
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

          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3.5 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Sending instructions...</span>
              </>
            ) : (
              <span>Send reset link</span>
            )}
          </motion.button>
        </form>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
        <Link to="/login" className="font-semibold text-blue-600 transition hover:text-blue-700">
          Return to login
        </Link>
        <span className="text-slate-300">•</span>
        <Link to="/signup" className="font-semibold text-blue-600 transition hover:text-blue-700">
          Create account
        </Link>
      </div>
    </AuthPageShell>
  );
}
