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
  const fullName = typeof name === 'object' && name !== null ? (name.fullName || name.name) : name;
  const userEmail = typeof name === 'object' && name !== null ? name.email : email;
  const userPassword = typeof name === 'object' && name !== null ? name.password : password;

  const data = await request('/api/auth/register', {
    method: 'POST',
    body: { fullName, name: fullName, email: userEmail, password: userPassword },
  });
  
  const accessToken = data.token;
  const refreshToken = data.refreshToken;
  if (refreshToken) sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

  const user = {
    id: data.user?.id || 'usr_new',
    email: data.user?.email || userEmail,
    name: data.user?.fullName || data.user?.name || fullName || userEmail.split('@')[0],
    avatar: data.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userEmail)}`,
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

import {
  getAllDecisionsMerged,
  getStoredDecisionById,
  saveCreatedDecision,
  recordUserVote,
  hasUserVoted,
  getUserVoteForDecision,
} from '../services/decisionStorage';

/**
 * Fetch decisions list (merging backend + local created decisions).
 */
export async function fetchDecisions(token) {
  let backendDecisions = [];
  try {
    const data = await request('/api/decisions', { token });
    if (Array.isArray(data) && data.length > 0) {
      backendDecisions = data.map((d) => ({
        id: d.id,
        title: d.title,
        description: d.description,
        status: d.visibility === 'PRIVATE' ? 'CLOSED' : 'OPEN',
        votesCount: d.polls?.[0]?.options?.reduce((s, o) => s + (o.voteCount || 0), 0) || 0,
        optionsCount: d.polls?.[0]?.options?.length || (d.polls?.[0]?.optionLabels?.length) || 0,
        createdBy: d.owner ? { id: d.owner.id, name: d.owner.name, email: d.owner.email } : { id: 'usr_demo', name: 'Demo User' },
        createdAt: d.createdAt || new Date().toISOString(),
        poll: d.polls?.[0]
          ? {
              id: d.polls[0].id,
              question: d.polls[0].question || d.title,
              options: d.polls[0].options?.map((o, idx) => ({
                id: o.id || idx + 1,
                optionText: o.label || o.optionText || `Option ${idx + 1}`,
                voteCount: o.voteCount || 0,
              })) || [],
            }
          : null,
      }));
    }
  } catch (error) {
    // Backend offline or fallback
  }

  const merged = getAllDecisionsMerged();
  if (backendDecisions.length > 0) {
    // Merge unique by ID
    const map = new Map();
    merged.forEach((item) => map.set(String(item.id), item));
    backendDecisions.forEach((item) => {
      if (!map.has(String(item.id))) map.set(String(item.id), item);
    });
    return Array.from(map.values());
  }

  return merged;
}

export async function fetchDecisionById(id, token) {
  // First check local stored decisions (with exact question & options)
  const local = getStoredDecisionById(id);
  if (local) {
    return local;
  }

  try {
    const d = await request(`/api/decisions/${id}`, { token });
    if (d) {
      return {
        id: d.id,
        title: d.title,
        description: d.description,
        status: d.visibility === 'PRIVATE' ? 'CLOSED' : 'OPEN',
        createdBy: d.owner ? { id: d.owner.id, name: d.owner.name, email: d.owner.email } : { id: 'usr_demo', name: 'Demo User' },
        createdAt: d.createdAt || new Date().toISOString(),
        views: 24,
        reach: 55,
        votesCount: d.polls?.[0]?.options?.reduce((s, o) => s + (o.voteCount || 0), 0) || 0,
        poll: d.polls?.[0]
          ? {
              id: d.polls[0].id,
              question: d.polls[0].question || d.title,
              options: d.polls[0].options?.map((o, idx) => ({
                id: o.id || idx + 1,
                optionText: o.label || o.optionText || `Option ${idx + 1}`,
                voteCount: o.voteCount || 0,
              })) || [],
            }
          : null,
      };
    }
  } catch (error) {
    // Fallback if not found in backend
  }

  const fallback = getStoredDecisionById(id);
  if (fallback) return fallback;

  throw new Error(`Decision #${id} not found.`);
}

/**
 * Create a new decision (with optional embedded poll).
 */
export async function createDecisionApi(decisionData, token, currentUser) {
  // Save to persistent storage first
  const saved = saveCreatedDecision(decisionData, currentUser);

  // Send to backend in compatible format
  try {
    const backendPayload = {
      title: decisionData.title,
      description: decisionData.description,
      visibility: decisionData.status === 'CLOSED' ? 'PRIVATE' : 'PUBLIC',
      pollType: decisionData.pollQuestion ? 'SINGLE_CHOICE' : null,
      isAnonymous: false,
      optionLabels: decisionData.pollOptions || [],
    };
    await request('/api/decisions', {
      method: 'POST',
      body: backendPayload,
      token,
    });
  } catch (err) {
    // Log backend offline warning, client-side decision is already persisted
    console.warn('[createDecisionApi] Backend request failed, stored locally:', err);
  }

  return saved;
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
  try {
    await fetch(`${API_BASE_URL}/api/decisions/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers,
    });
  } catch (e) {
    // Ignore backend offline
  }
  return true;
}

/**
 * Cast a vote on a decision poll.
 */
export async function castVoteApi(voteData, token, extraData = {}) {
  // Record vote in persistent storage
  recordUserVote({
    decisionId: voteData.decisionId,
    optionId: voteData.optionId,
    optionText: extraData.optionText,
    decisionTitle: extraData.decisionTitle,
    pollQuestion: extraData.pollQuestion,
    userEmail: extraData.userEmail,
  });

  try {
    await request('/api/votes', {
      method: 'POST',
      body: { decisionId: voteData.decisionId, optionId: voteData.optionId },
      token,
    });
  } catch (err) {
    console.warn('[castVoteApi] Backend vote sync skipped, saved locally:', err);
  }

  return { success: true };
}

export async function getVoteResultsApi(decisionId, token) {
  const dec = getStoredDecisionById(decisionId);
  if (dec && dec.poll && Array.isArray(dec.poll.options)) {
    const totalVotes = dec.poll.options.reduce((s, o) => s + (o.voteCount || 0), 0);
    let winningOption = dec.poll.options[0]?.optionText || 'Option A';
    let winningVoteCount = dec.poll.options[0]?.voteCount || 0;

    dec.poll.options.forEach((opt) => {
      if ((opt.voteCount || 0) > winningVoteCount) {
        winningVoteCount = opt.voteCount || 0;
        winningOption = opt.optionText;
      }
    });

    return {
      decisionTitle: dec.title,
      pollQuestion: dec.poll.question || dec.title,
      totalVotes,
      winningOption,
      winningVoteCount,
      options: dec.poll.options,
    };
  }

  try {
    return await request(`/api/votes/result/${decisionId}`, { token });
  } catch (error) {
    return {
      decisionTitle: `Decision #${decisionId}`,
      pollQuestion: 'What is your choice?',
      totalVotes: 0,
      winningOption: '',
      winningVoteCount: 0,
      options: [],
    };
  }
}

/**
 * Get current authenticated user profile.
 */
export async function getCurrentUserApi(token) {
  return await request('/api/users/me', { token });
}


