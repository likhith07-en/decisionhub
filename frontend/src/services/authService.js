import api from './api';

export const authService = {
  register: async (data) => {
    const response = await api.post('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('decisionhub_token', response.data.token);
      localStorage.setItem('decisionhub_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('decisionhub_token', response.data.token);
      localStorage.setItem('decisionhub_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('decisionhub_token');
    localStorage.removeItem('decisionhub_user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('decisionhub_user');
    return userStr ? JSON.parse(userStr) : null;
  },
};
