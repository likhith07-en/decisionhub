import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { createDecisionApi } from '../api/axiosClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import IconSidebar from '../components/IconSidebar';

export default function CreateDecision() {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('OPEN');
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleAddOption = () => {
    if (pollOptions.length < 8) {
      setPollOptions([...pollOptions, '']);
    }
  };

  const handleOptionChange = (index, value) => {
    const updated = [...pollOptions];
    updated[index] = value;
    setPollOptions(updated);
  };

  const handleRemoveOption = (index) => {
    if (pollOptions.length <= 2) {
      setError('A poll must have at least 2 options.');
      return;
    }
    setError('');
    setPollOptions(pollOptions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedOptions = pollOptions.map((o) => o.trim()).filter(Boolean);
    if (pollQuestion.trim() && trimmedOptions.length < 2) {
      setError('Please provide at least 2 poll options.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        status,
        pollQuestion: pollQuestion.trim() || null,
        pollOptions: pollQuestion.trim() ? trimmedOptions : null,
      };

      const created = await createDecisionApi(payload, accessToken);
      navigate(`/decisions/${created.id}`);
    } catch (err) {
      setError(err.message || 'Failed to create decision. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100';
  const labelClass = 'mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-600';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col sm:pr-[60px]">
      <Navbar />
      <IconSidebar />
      <div className="flex flex-1">
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 max-w-3xl w-full mx-auto px-6 py-8">
            {/* Back link */}
            <Link
              to="/dashboard"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Link>

            <div className="mb-8">
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Create Decision</h1>
              <p className="mt-1 text-slate-500">Define your decision and attach an optional voting poll.</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                <svg className="h-5 w-5 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Decision Info Card */}
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                <div>
                  <label className={labelClass}>Decision Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Choose Database Architecture for Q4"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Description</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Explain the background, constraints, and goal of this decision..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Initial Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={inputClass}
                  >
                    <option value="OPEN">OPEN — Accepting Votes</option>
                    <option value="CLOSED">CLOSED — View Only</option>
                  </select>
                </div>
              </div>

              {/* Poll Card */}
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                <div>
                  <h2 className="text-lg font-black tracking-tight text-slate-900">Attach Poll</h2>
                  <p className="mt-1 text-sm text-slate-500">Optional. Add a structured voting poll to this decision.</p>
                </div>

                <div>
                  <label className={labelClass}>Poll Question</label>
                  <input
                    type="text"
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                    placeholder="e.g. Which database should we adopt?"
                    className={inputClass}
                  />
                </div>

                {pollQuestion.trim() && (
                  <div className="space-y-3">
                    <label className={labelClass}>Poll Options</label>
                    {pollOptions.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          required
                          value={opt}
                          onChange={(e) => handleOptionChange(idx, e.target.value)}
                          placeholder={`Option ${idx + 1}`}
                          className={`${inputClass} flex-1`}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(idx)}
                          className="rounded-xl border border-slate-200 bg-white p-2 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}

                    {pollOptions.length < 8 && (
                      <button
                        type="button"
                        onClick={handleAddOption}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add another option
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <span>Publish Decision</span>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
