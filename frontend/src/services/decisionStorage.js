/**
 * decisionStorage.js
 * Client-side persistence and analytics engine for DecisionHub.
 * Manages user votes, user-created decisions, view/reach metrics, and outcome calculations.
 */

const VOTES_KEY = 'dh_user_votes';
const CREATED_KEY = 'dh_created_decisions';
const ANALYTICS_KEY = 'dh_decision_analytics';

// Default static decisions with full poll options & engagement metrics
const STATIC_DECISIONS = [
  {
    id: 1,
    title: 'Choose Q3 Product Roadmap',
    description: 'Determine primary product features and milestones for Q3 2026.',
    status: 'OPEN',
    createdBy: { id: 'usr_sarah', name: 'Sarah Connor', email: 'sarah@example.com' },
    createdAt: '2026-07-28T10:00:00Z',
    views: 48,
    reach: 120,
    votesCount: 14,
    poll: {
      id: 1,
      question: 'Which feature should take highest priority for Q3?',
      options: [
        { id: 1, optionText: 'AI Smart Analytics & Insights', voteCount: 8 },
        { id: 2, optionText: 'Real-time Live Collaboration Canvas', voteCount: 4 },
        { id: 3, optionText: 'Automated Export & PDF Reports', voteCount: 2 },
      ],
    },
  },
  {
    id: 2,
    title: 'Select New Team Lead',
    description: 'Internal election for engineering pod lead position.',
    status: 'CLOSED',
    createdBy: { id: 'usr_admin', name: 'Alex Rivera', email: 'alex@example.com' },
    createdAt: '2026-07-15T09:30:00Z',
    views: 82,
    reach: 195,
    votesCount: 28,
    poll: {
      id: 2,
      question: 'Who should be the team lead for the Cloud Infra pod?',
      options: [
        { id: 1, optionText: 'Elena Rostova (Principal DevOps)', voteCount: 18 },
        { id: 2, optionText: 'Marcus Chen (Senior Architect)', voteCount: 10 },
      ],
    },
  },
  {
    id: 3,
    title: 'Tech Stack Upgrade to React 19',
    description: 'Evaluation of migrating frontend micro-services to React 19 compiler and Vite 5.',
    status: 'OPEN',
    createdBy: { id: 'usr_dev', name: 'David Miller', email: 'david@example.com' },
    createdAt: '2026-08-01T14:15:00Z',
    views: 35,
    reach: 90,
    votesCount: 9,
    poll: {
      id: 3,
      question: 'Should we migrate all client apps to React 19 in sprint 42?',
      options: [
        { id: 1, optionText: 'Yes, proceed with migration immediately', voteCount: 6 },
        { id: 2, optionText: 'Wait until Q4 LTS release', voteCount: 3 },
      ],
    },
  },
  {
    id: 4,
    title: 'Q4 Marketing Campaign Strategy',
    description: 'Selecting primary acquisition channel and content theme for Q4 launch.',
    status: 'OPEN',
    createdBy: { id: 'usr_mkt', name: 'Jessica Taylor', email: 'jessica@example.com' },
    createdAt: '2026-08-03T11:00:00Z',
    views: 64,
    reach: 160,
    votesCount: 19,
    poll: {
      id: 4,
      question: 'Which marketing channel should receive 60% of budget?',
      options: [
        { id: 1, optionText: 'Developer Conferences & Hackathons', voteCount: 11 },
        { id: 2, optionText: 'Targeted LinkedIn & Tech Podcast Ads', voteCount: 5 },
        { id: 3, optionText: 'Influencer Keynote Sponsorships', voteCount: 3 },
      ],
    },
  },
  {
    id: 5,
    title: 'Office Relocation & Hybrid Work Policy',
    description: 'Company-wide survey on remote flexibility and new hub location preferences.',
    status: 'OPEN',
    createdBy: { id: 'usr_hr', name: 'Rachel Green', email: 'rachel@example.com' },
    createdAt: '2026-08-04T08:45:00Z',
    views: 110,
    reach: 280,
    votesCount: 32,
    poll: {
      id: 5,
      question: 'What is your preferred hybrid workplace configuration?',
      options: [
        { id: 1, optionText: 'Flexible 2-days in-office / 3-days remote', voteCount: 20 },
        { id: 2, optionText: 'Full remote with quarterly in-person summits', voteCount: 9 },
        { id: 3, optionText: 'Fixed 4-days in-office', voteCount: 3 },
      ],
    },
  },
];

function getSafeStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setSafeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[decisionStorage] Failed to save to localStorage for key: ${key}`, err);
  }
}

/**
 * Get all user votes as an array or map
 */
export function getAllUserVotes() {
  return getSafeStorage(VOTES_KEY, {});
}

/**
 * Record a user's vote on a decision
 */
export function recordUserVote({ decisionId, optionId, optionText, decisionTitle, pollQuestion, userEmail, options = [] }) {
  const votes = getAllUserVotes();
  const normalizedId = String(decisionId);

  const voteRecord = {
    decisionId: normalizedId,
    optionId: Number(optionId),
    optionText: optionText || 'Selected Choice',
    decisionTitle: decisionTitle || `Decision #${decisionId}`,
    pollQuestion: pollQuestion || 'Active Question',
    votedAt: new Date().toISOString(),
    userEmail: userEmail || 'user@example.com',
  };

  votes[normalizedId] = voteRecord;
  setSafeStorage(VOTES_KEY, votes);

  // Update option counts in created decisions if applicable
  const created = getCreatedDecisions();
  const foundIdx = created.findIndex((d) => String(d.id) === normalizedId);
  if (foundIdx !== -1) {
    const dec = created[foundIdx];
    if (dec.poll && Array.isArray(dec.poll.options)) {
      dec.poll.options = dec.poll.options.map((opt) => {
        if (Number(opt.id) === Number(optionId)) {
          return { ...opt, voteCount: (opt.voteCount || 0) + 1 };
        }
        return opt;
      });
      dec.votesCount = (dec.votesCount || 0) + 1;
      created[foundIdx] = dec;
      setSafeStorage(CREATED_KEY, created);
    }
  }

  // Update analytics metrics
  incrementMetrics(normalizedId, { votes: 1 });

  return voteRecord;
}

/**
 * Check if current user has voted on a decision
 */
export function hasUserVoted(decisionId) {
  const votes = getAllUserVotes();
  return Boolean(votes[String(decisionId)]);
}

/**
 * Get specific user vote for a decision
 */
export function getUserVoteForDecision(decisionId) {
  const votes = getAllUserVotes();
  return votes[String(decisionId)] || null;
}

/**
 * Compute the outcome (Won / Leading vs Lost / Trailing) of a voted decision
 */
export function computeDecisionOutcome(decision, userVote) {
  if (!decision || !decision.poll || !decision.poll.options) {
    return {
      status: 'UNKNOWN',
      isWinning: false,
      badgeLabel: 'Pending',
      badgeColor: 'text-muted bg-surface-alt border-border',
      winningOption: null,
      userOption: null,
      totalVotes: 0,
      userVotePct: 0,
      winningVotePct: 0,
    };
  }

  const options = decision.poll.options;
  const totalVotes = options.reduce((sum, o) => sum + (o.voteCount || 0), 0);

  // Find max vote count
  let maxVotes = -1;
  let leader = null;
  options.forEach((opt) => {
    if ((opt.voteCount || 0) > maxVotes) {
      maxVotes = opt.voteCount || 0;
      leader = opt;
    }
  });

  const userChosenOpt = options.find((o) => Number(o.id) === Number(userVote?.optionId)) || {
    id: userVote?.optionId,
    optionText: userVote?.optionText || 'Your Choice',
    voteCount: 0,
  };

  const userVotesCount = userChosenOpt.voteCount || 0;
  const isLeader = leader && Number(leader.id) === Number(userChosenOpt.id) && userVotesCount > 0;
  const isClosed = decision.status === 'CLOSED' || decision.status === 'Completed';

  const userVotePct = totalVotes > 0 ? Math.round((userVotesCount / totalVotes) * 100) : 0;
  const winningVotePct = totalVotes > 0 && leader ? Math.round((leader.voteCount / totalVotes) * 100) : 0;

  let outcomeStatus = 'TRAILING';
  let badgeLabel = 'Trailing';
  let badgeColor = 'text-amber-600 bg-amber-500/10 border-amber-500/30';

  if (isClosed) {
    if (isLeader) {
      outcomeStatus = 'WON';
      badgeLabel = 'Won Decision';
      badgeColor = 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30';
    } else {
      outcomeStatus = 'LOST';
      badgeLabel = 'Lost Decision';
      badgeColor = 'text-rose-600 bg-rose-500/10 border-rose-500/30';
    }
  } else {
    if (isLeader) {
      outcomeStatus = 'LEADING';
      badgeLabel = 'Choice Leading';
      badgeColor = 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30';
    } else {
      outcomeStatus = 'TRAILING';
      badgeLabel = 'Choice Trailing';
      badgeColor = 'text-amber-600 bg-amber-500/10 border-amber-500/30';
    }
  }

  return {
    status: outcomeStatus,
    isWinning: isLeader,
    isClosed,
    badgeLabel,
    badgeColor,
    winningOption: leader,
    userOption: userChosenOpt,
    totalVotes,
    userVotePct,
    winningVotePct,
  };
}

/**
 * Get all voted decisions for Analysis page
 */
export function getVotedDecisionsList(userEmail) {
  const votes = getAllUserVotes();
  const allDecisions = getAllDecisionsMerged();
  const results = [];

  Object.entries(votes).forEach(([decId, vote]) => {
    // Find decision data
    let dec = allDecisions.find((d) => String(d.id) === String(decId));

    if (!dec) {
      // Fallback synthetic decision from vote record
      dec = {
        id: decId,
        title: vote.decisionTitle || `Decision #${decId}`,
        description: 'Voted decision summary',
        status: 'OPEN',
        createdAt: vote.votedAt,
        views: 25,
        reach: 60,
        votesCount: 5,
        poll: {
          id: decId,
          question: vote.pollQuestion || 'What is your choice?',
          options: [
            { id: vote.optionId, optionText: vote.optionText, voteCount: 3 },
            { id: vote.optionId + 100, optionText: 'Other Option', voteCount: 2 },
          ],
        },
      };
    }

    const outcome = computeDecisionOutcome(dec, vote);
    results.push({
      ...dec,
      userVote: vote,
      outcome,
    });
  });

  // Sort by voted timestamp descending
  return results.sort((a, b) => new Date(b.userVote.votedAt) - new Date(a.userVote.votedAt));
}

/**
 * Save user created decision
 */
export function saveCreatedDecision(decisionData, currentUser) {
  const list = getCreatedDecisions();
  const newId = Date.now();

  const options = Array.isArray(decisionData.pollOptions)
    ? decisionData.pollOptions.map((text, idx) => ({
        id: idx + 1,
        optionText: text,
        voteCount: 0,
      }))
    : [];

  const newDecision = {
    id: newId,
    title: decisionData.title,
    description: decisionData.description || '',
    status: decisionData.status || 'OPEN',
    visibility: decisionData.visibility || 'PUBLIC',
    createdAt: new Date().toISOString(),
    createdBy: {
      id: currentUser?.id || 'usr_current',
      name: currentUser?.name || 'Current User',
      email: currentUser?.email || 'user@example.com',
    },
    views: Math.floor(Math.random() * 8) + 12, // Initial realistic views
    reach: Math.floor(Math.random() * 20) + 35, // Initial realistic reach
    votesCount: 0,
    poll: decisionData.pollQuestion?.trim()
      ? {
          id: newId,
          question: decisionData.pollQuestion.trim(),
          options,
        }
      : null,
  };

  list.unshift(newDecision);
  setSafeStorage(CREATED_KEY, list);
  return newDecision;
}

/**
 * Get all decisions created by current user
 */
export function getCreatedDecisions(userEmail) {
  const raw = getSafeStorage(CREATED_KEY, []);
  if (!userEmail) return raw;
  return raw.filter((d) => !d.createdBy?.email || d.createdBy.email.toLowerCase() === userEmail.toLowerCase());
}

/**
 * Merge static + created decisions
 */
export function getAllDecisionsMerged() {
  const created = getSafeStorage(CREATED_KEY, []);
  const votes = getAllUserVotes();

  // Inject any recorded user votes into static decisions if present
  const staticWithVotes = STATIC_DECISIONS.map((item) => {
    const userVote = votes[String(item.id)];
    if (!userVote || !item.poll) return item;

    // Clone poll and add user's vote if not already counted
    const updatedOptions = item.poll.options.map((opt) => {
      if (Number(opt.id) === Number(userVote.optionId)) {
        return { ...opt, voteCount: (opt.voteCount || 0) + 1 };
      }
      return opt;
    });

    return {
      ...item,
      votesCount: (item.votesCount || 0) + 1,
      poll: {
        ...item.poll,
        options: updatedOptions,
      },
    };
  });

  return [...created, ...staticWithVotes];
}

/**
 * Fetch a decision by ID with full poll options
 */
export function getStoredDecisionById(id) {
  const all = getAllDecisionsMerged();
  const found = all.find((d) => String(d.id) === String(id));
  if (found) {
    // Increment view count
    incrementMetrics(String(id), { views: 1, reach: 2 });
    return found;
  }
  return null;
}

/**
 * Increment engagement metrics (views, reach, votes)
 */
export function incrementMetrics(decisionId, { views = 0, reach = 0, votes = 0 }) {
  const analytics = getSafeStorage(ANALYTICS_KEY, {});
  const current = analytics[decisionId] || { views: 0, reach: 0, votesCount: 0 };

  analytics[decisionId] = {
    views: (current.views || 0) + views,
    reach: (current.reach || 0) + reach,
    votesCount: (current.votesCount || 0) + votes,
  };
  setSafeStorage(ANALYTICS_KEY, analytics);
}

/**
 * Get aggregate Creator KPIs for the Analytics page
 */
export function getCreatorAnalytics(userEmail) {
  const created = getCreatedDecisions(userEmail);
  const totalDecisions = created.length;
  const totalViews = created.reduce((sum, d) => sum + (d.views || 0), 0);
  const totalReach = created.reduce((sum, d) => sum + (d.reach || Math.round(d.views * 2.5) || 0), 0);
  const totalVotes = created.reduce((sum, d) => sum + (d.votesCount || 0), 0);
  const activeDecisions = created.filter((d) => d.status === 'OPEN').length;
  const closedDecisions = created.filter((d) => d.status === 'CLOSED').length;

  const conversionRate = totalViews > 0 ? Math.round((totalVotes / totalViews) * 100) : 0;
  const avgVotesPerPoll = totalDecisions > 0 ? (totalVotes / totalDecisions).toFixed(1) : '0.0';

  return {
    totalDecisions,
    totalViews,
    totalReach,
    totalVotes,
    activeDecisions,
    closedDecisions,
    conversionRate,
    avgVotesPerPoll,
    decisions: created,
  };
}
