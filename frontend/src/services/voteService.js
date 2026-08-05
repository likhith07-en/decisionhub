import api from './api';

export const voteService = {
  castVote: async (voteData) => {
    const response = await api.post('/votes', voteData);
    return response.data;
  },

  getVoteResults: async (decisionId) => {
    const response = await api.get(`/votes/result/${decisionId}`);
    return response.data;
  },
};
