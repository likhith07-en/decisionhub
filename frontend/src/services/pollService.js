import api from './api';

export const pollService = {
  createPoll: async (pollData) => {
    const response = await api.post('/polls', pollData);
    return response.data;
  },

  getAllPolls: async () => {
    const response = await api.get('/polls');
    return response.data;
  },

  getPollByDecisionId: async (decisionId) => {
    const response = await api.get(`/polls/decision/${decisionId}`);
    return response.data;
  },
};
