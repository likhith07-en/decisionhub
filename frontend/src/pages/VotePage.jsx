import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchDecisionById, castVoteApi, getVoteResultsApi } from '../api/axiosClient';
import { getUserVoteForDecision } from '../services/decisionStorage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import IconSidebar from '../components/IconSidebar';
import PollCard from '../components/PollCard';
import ResultChart from '../components/ResultChart';
import Loader from '../components/Loader';

export default function VotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, accessToken } = useAuth();

  const [decision, setDecision] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const dec = await fetchDecisionById(id, accessToken);
      setDecision(dec);

      // Check if user has already voted
      const existingVote = getUserVoteForDecision(id);
      if (existingVote) {
        setSelectedOptionId(existingVote.optionId);
        setHasVoted(true);
      }

      try {
        const res = await getVoteResultsApi(id, accessToken);
        setResults(res);
      } catch {
        /* results optional */
      }
    } catch {
      setError('Could not load decision or poll details.');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async () => {
    if (!selectedOptionId || !decision) return;
    setError(null);
    setSubmitting(true);

    const selectedOption = decision.poll?.options?.find(
      (opt) => Number(opt.id) === Number(selectedOptionId)
    );
    const optionText = selectedOption ? selectedOption.optionText : 'Selected Choice';

    try {
      await castVoteApi(
        { decisionId: Number(id), optionId: Number(selectedOptionId) },
        accessToken,
        {
          optionText,
          decisionTitle: decision.title,
          pollQuestion: decision.poll?.question || decision.title,
          userEmail: user?.email || 'user@example.com',
        }
      );

      setSuccessMsg('Your vote has been recorded! Added to your Decision Analysis.');
      setHasVoted(true);

      const updatedResults = await getVoteResultsApi(id, accessToken);
      setResults(updatedResults);
    } catch (err) {
      if (err.message?.includes('already voted') || err.message?.includes('409')) {
        setError('You have already voted on this decision.');
        setHasVoted(true);
      } else {
        setError(err.message || 'Failed to submit vote. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-shell min-h-screen flex flex-col sm:pr-[60px]">
      <Navbar />
      <IconSidebar />
      <div className="flex flex-1">
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 max-w-3xl w-full mx-auto px-6 py-8">
            {loading ? (
              <Loader message="Preparing voting session..." />
            ) : !decision ? (
              <div className="rounded-2xl border border-dashed border-default p-12 text-center">
                <p className="mb-4 text-secondary">Decision not found.</p>
                <Link to="/dashboard" className="text-sm font-bold text-primary hover:underline">Return to Dashboard</Link>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Back link */}
                <div className="flex items-center justify-between">
                  <Link
                    to={`/decisions/${id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Decision Details
                  </Link>

                  {hasVoted && (
                    <Link
                      to="/analysis"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-500 hover:text-white"
                    >
                      📊 View Outcome in Analysis →
                    </Link>
                  )}
                </div>

                {/* Page title */}
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-primary">Cast Your Vote</h1>
                  <p className="mt-1 text-secondary">{decision.title}</p>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-3 rounded-2xl p-4 text-sm" style={{ backgroundColor: 'var(--error-bg)', border: '1px solid var(--error-border)', color: 'var(--error-text)' }}>
                    <svg className="h-5 w-5 shrink-0" style={{ color: 'var(--error-text)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                {/* Success */}
                {successMsg && (
                  <div className="flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-800">
                    <div className="flex items-center gap-3">
                      <svg className="h-5 w-5 shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{successMsg}</span>
                    </div>
                    <Link
                      to="/analysis"
                      className="font-bold underline hover:opacity-80"
                    >
                      Open Analysis Page
                    </Link>
                  </div>
                )}

                {/* Poll */}
                <PollCard
                  poll={decision.poll}
                  decisionId={decision.id}
                  selectedOptionId={selectedOptionId}
                  onSelectOption={(optId) => setSelectedOptionId(optId)}
                  onVote={handleVote}
                  isSubmitting={submitting}
                  hasVoted={hasVoted}
                />

                {/* Results */}
                {decision.status === 'CLOSED' ? (
                  <div className="mt-6 rounded-2xl border border-default bg-background p-6 text-center shadow-sm">
                    <p className="text-sm font-semibold text-secondary">
                      Info is no more public, contact admin/ poll creator ({decision.createdBy?.name || 'respective user'})
                    </p>
                  </div>
                ) : (
                  results && <ResultChart results={results} />
                )}
              </div>
            )}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

