import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decisionService } from '../services/decisionService';
import { PlusCircle, Trash2, ArrowLeft, Vote, Sparkles, Check } from 'lucide-react';

const CreateDecision = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('OPEN');
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['Option 1', 'Option 2']);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleAddOption = () => {
    setPollOptions([...pollOptions, `Option ${pollOptions.length + 1}`]);
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

    if (pollQuestion.trim() && pollOptions.filter(o => o.trim()).length < 2) {
      setError('Please provide at least 2 valid poll options.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        title,
        description,
        status,
        pollQuestion: pollQuestion.trim() ? pollQuestion : null,
        pollOptions: pollQuestion.trim() ? pollOptions.filter(o => o.trim()) : null,
      };

      const created = await decisionService.createDecision(payload);
      navigate(`/decisions/${created.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create decision.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center space-x-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </button>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-8">
        <div>
          <div className="flex items-center space-x-2 text-blue-400 mb-2">
            <Vote className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">Decision Setup</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Create New Decision</h1>
          <p className="text-sm text-slate-400 mt-1">
            Define your decision scope and attach a structured voting poll for team alignment.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Decision Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Choose Database Architecture for Q4 Migration"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Detailed Context & Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the background, constraints, and goal of this decision..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Initial Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="OPEN">OPEN - Accepting Votes</option>
                <option value="CLOSED">CLOSED - View Only</option>
              </select>
            </div>
          </div>

          <hr className="border-slate-800" />

          {/* Embedded Poll Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <h3 className="text-lg font-bold text-white">Attach Poll (Optional)</h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Poll Question
              </label>
              <input
                type="text"
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
                placeholder="e.g. Which database technology should we adopt?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {pollQuestion.trim() && (
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Poll Options
                </label>
                {pollOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="text"
                      required
                      value={opt}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      placeholder={`Option ${idx + 1}`}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(idx)}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddOption}
                  className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors pt-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Another Option</span>
                </button>
              </div>
            )}
          </div>

          <div className="pt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
            >
              {submitting ? 'Publishing...' : 'Publish Decision'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDecision;
