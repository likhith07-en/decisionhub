import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchDecisionById, castVoteApi, getVoteResultsApi } from '../api/axiosClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import IconSidebar from '../components/IconSidebar';
import PollCard from '../components/PollCard';
import ResultChart from '../components/ResultChart';
import Loader from '../components/Loader';

export default function VotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuth();

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
    if (!selectedOptionId) return;
    setError(null);
    setSubmitting(true);

    try {
      await castVoteApi({ decisionId: Number(id), optionId: selectedOptionId }, accessToken);
      setSuccessMsg('Your vote has been recorded!');
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
    <div className="page-shell flex flex-col sm:pr-[60px]">
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
                <Link
                  to={`/decisions/${id}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Decision
                </Link>

                {/* Page title */}
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-primary">Cast Your Vote</h1>
                  <p className="mt-1 text-secondary">{decision.title}</p>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                    <svg className="h-5 w-5 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                {/* Success */}
                {successMsg && (
                  <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50 p-4 text-sm text-green-700">
                    <svg className="h-5 w-5 shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{successMsg}</span>
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
