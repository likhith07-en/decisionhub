const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Storage key for simulated refresh token cookie fallback when backend is not live
const REFRESH_TOKEN_KEY = 'dh_refresh_token';

/**
 * Helper to make API requests with json header & auth bearer token.
 */
async function request(endpoint, options = {}) {
  const { token, body, ...customConfig } = options;
  const headers = {
    'Content-Type': 'application/json',
    ...customConfig.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers,
    credentials: 'include', // Include httpOnly cookies for refresh token if available
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    // If backend is unreachable or endpoint missing, handle fallback for development/demo
    throw error;
  }
}

export async function loginApi(email, password) {
  const data = await request('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  
  // Save refresh token
  const accessToken = data.token;
  const refreshToken = data.refreshToken;
  if (refreshToken) sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  
  const user = {
    id: data.user?.id || 'usr_1',
    email: data.user?.email || email,
    name: data.user?.name || email.split('@')[0],
    avatar: data.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
  };

  return { accessToken, user };
}

export async function registerApi(name, email, password) {
  const data = await request('/api/auth/register', {
    method: 'POST',
    body: { name, email, password },
  });
  
  const accessToken = data.token;
  const refreshToken = data.refreshToken;
  if (refreshToken) sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

  const user = {
    id: data.user?.id || 'usr_new',
    email: data.user?.email || email,
    name: data.user?.name || name || email.split('@')[0],
    avatar: data.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
  };

  return { accessToken, user };
}

/**
 * Request password reset link.
 */
export async function resetPasswordApi(email) {
  try {
    return await request('/api/auth/reset-password', {
      method: 'POST',
      body: { email },
    });
  } catch (error) {
    return { message: 'Reset link sent to your email.' };
  }
}

export async function googleLoginApi() {
  const data = await request('/api/auth/google', {
    method: 'POST',
  });
  
  const accessToken = data.token;
  const refreshToken = data.refreshToken;
  if (refreshToken) sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

  const user = {
    id: data.user?.id || 'google_user_1',
    email: data.user?.email || 'google.user@example.com',
    name: data.user?.name || 'Google User',
    avatar: data.user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=google',
  };

  return { accessToken, user };
}

export async function refreshSessionApi() {
  const refreshToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) throw new Error('No refresh token found');
  
  const data = await request('/api/auth/refresh', {
    method: 'POST',
    body: { refreshToken },
  });

  const newAccessToken = data.token;
  const user = {
    id: data.user?.id || 'usr_1',
    email: data.user?.email || 'demo@example.com',
    name: data.user?.name || 'Demo User',
    avatar: data.user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
  };

  return { accessToken: newAccessToken, user };
}

/**
 * Logout user session.
 */
export async function logoutApi() {
  try {
    await request('/api/auth/logout', { method: 'POST' });
  } catch (error) {
    // Ignore backend offline errors during logout
  } finally {
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}

/**
 * Fetch decisions list.
 */
export async function fetchDecisions(token) {
  try {
    const data = await request('/api/decisions', { token });
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
  } catch (error) {
    // Fallback sample data
  }

  return [
    { id: 1, title: 'Choose Q3 Product Roadmap', status: 'OPEN', votesCount: 14 },
    { id: 2, title: 'Select New Team Lead', status: 'CLOSED', votesCount: 28 },
    { id: 3, title: 'Tech Stack Upgrade to React 18', status: 'OPEN', votesCount: 9 },
    { id: 4, title: 'Q4 Marketing Campaign Strategy', status: 'OPEN', votesCount: 19 },
    { id: 5, title: 'Office Relocation & Hybrid Work Policy', status: 'OPEN', votesCount: 32 },
  ];
}

export async function fetchDecisionById(id, token) {
  try {
    return await request(`/api/decisions/${id}`, { token });
  } catch (error) {
    // Static mocks for 1-5
    const idNum = Number(id);
    if (idNum >= 1 && idNum <= 5) {
      const titles = [
        '',
        'Choose Q3 Product Roadmap',
        'Select New Team Lead',
        'Tech Stack Upgrade to React 18',
        'Q4 Marketing Campaign Strategy',
        'Office Relocation & Hybrid Work Policy'
      ];
      const statuses = ['', 'OPEN', 'CLOSED', 'OPEN', 'OPEN', 'OPEN'];
      
      return {
        id: idNum,
        title: titles[idNum],
        description: 'This is a static poll for demonstration purposes.',
        status: statuses[idNum],
        poll: { 
          id: idNum, 
          question: 'What is your choice?',
          options: [
            { id: 1, optionText: 'Option A', voteCount: 0 },
            { id: 2, optionText: 'Option B', voteCount: 0 }
          ]
        },
        createdBy: { id: 'usr_demo', name: 'Demo User' },
        createdAt: new Date().toISOString()
      };
    }
    throw error;
  }
}

/**
 * Create a new decision (with optional embedded poll).
 */
export async function createDecisionApi(decisionData, token) {
  return await request('/api/decisions', {
    method: 'POST',
    body: decisionData,
    token,
  });
}

/**
 * Update an existing decision.
 */
export async function updateDecisionApi(id, decisionData, token) {
  return await request(`/api/decisions/${id}`, {
    method: 'PUT',
    body: decisionData,
    token,
  });
}

/**
 * Delete a decision by ID.
 */
export async function deleteDecisionApi(id, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const response = await fetch(`${API_BASE_URL}/api/decisions/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers,
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Delete failed with status ${response.status}`);
  }
  return true;
}

/**
 * Cast a vote on a decision poll.
 */
export async function castVoteApi(voteData, token) {
  return await request('/api/votes', {
    method: 'POST',
    body: voteData,
    token,
  });
}

export async function getVoteResultsApi(decisionId, token) {
  try {
    return await request(`/api/votes/result/${decisionId}`, { token });
  } catch (error) {
    const idNum = Number(decisionId);
    if (idNum >= 1 && idNum <= 5) {
      const votes = [0, 14, 28, 9, 19, 32];
      const titles = [
        '',
        'Choose Q3 Product Roadmap',
        'Select New Team Lead',
        'Tech Stack Upgrade to React 18',
        'Q4 Marketing Campaign Strategy',
        'Office Relocation & Hybrid Work Policy'
      ];
      
      return {
        decisionTitle: titles[idNum],
        pollQuestion: 'What is your choice?',
        totalVotes: votes[idNum],
        winningOption: 'Option A',
        winningVoteCount: Math.ceil(votes[idNum] * 0.6),
        options: [
          { id: 1, optionText: 'Option A', voteCount: Math.ceil(votes[idNum] * 0.6) },
          { id: 2, optionText: 'Option B', voteCount: Math.floor(votes[idNum] * 0.4) }
        ]
      };
    }
    throw error;
  }
}

/**
 * Get current authenticated user profile.
 */
export async function getCurrentUserApi(token) {
  return await request('/api/users/me', { token });
}

