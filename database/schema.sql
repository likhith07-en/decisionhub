-- 06. Database Design — DecisionHub
-- Exact Official Specification Schema (Normalized to 3NF)

DROP DATABASE IF EXISTS decisionhub_db;
CREATE DATABASE decisionhub_db;
USE decisionhub_db;

-- 1. categories
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- 2. users
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'USER',           -- USER / MODERATOR / ADMIN
    provider VARCHAR(20) DEFAULT 'LOCAL',       -- LOCAL / GOOGLE
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- 3. user_profiles
CREATE TABLE user_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    bio TEXT,
    avatar_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. user_interests
CREATE TABLE user_interests (
    user_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, category_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- 5. communities
CREATE TABLE communities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category_id BIGINT,
    description TEXT,
    created_by BIGINT,
    visibility VARCHAR(10) DEFAULT 'PUBLIC',    -- PUBLIC / PRIVATE
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- 6. community_members
CREATE TABLE community_members (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    community_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    role VARCHAR(20) DEFAULT 'MEMBER',          -- OWNER / ADMIN / MEMBER / MODERATOR
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (community_id, user_id),
    FOREIGN KEY (community_id) REFERENCES communities(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 7. decisions
CREATE TABLE decisions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    owner_id BIGINT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    visibility VARCHAR(10) DEFAULT 'PUBLIC',    -- PUBLIC / PRIVATE
    category_id BIGINT,
    community_id BIGINT NULL,                   -- NULL for general decisions, FK to communities for group decisions
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (community_id) REFERENCES communities(id) ON DELETE SET NULL
);

-- 8. decision_options
CREATE TABLE decision_options (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    decision_id BIGINT NOT NULL,
    label VARCHAR(150) NOT NULL,
    description TEXT,
    FOREIGN KEY (decision_id) REFERENCES decisions(id) ON DELETE CASCADE
);

-- 9. comparison_factors
CREATE TABLE comparison_factors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    decision_id BIGINT NOT NULL,
    name VARCHAR(50) NOT NULL,                  -- Cost, Risk, Time, etc.
    FOREIGN KEY (decision_id) REFERENCES decisions(id) ON DELETE CASCADE
);

-- 10. option_scores
CREATE TABLE option_scores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    option_id BIGINT NOT NULL,
    factor_id BIGINT NOT NULL,
    score INT CHECK (score BETWEEN 1 AND 10),
    FOREIGN KEY (option_id) REFERENCES decision_options(id) ON DELETE CASCADE,
    FOREIGN KEY (factor_id) REFERENCES comparison_factors(id) ON DELETE CASCADE
);

-- 11. polls
CREATE TABLE polls (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    decision_id BIGINT NOT NULL,
    poll_type VARCHAR(20) DEFAULT 'SINGLE',     -- SINGLE / MULTI / RATING
    is_anonymous BOOLEAN DEFAULT FALSE,
    ends_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (decision_id) REFERENCES decisions(id) ON DELETE CASCADE
);

-- 12. poll_options
CREATE TABLE poll_options (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    poll_id BIGINT NOT NULL,
    option_id BIGINT NOT NULL,
    FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE,
    FOREIGN KEY (option_id) REFERENCES decision_options(id) ON DELETE CASCADE
);

-- 13. votes
CREATE TABLE votes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    poll_id BIGINT NOT NULL,
    poll_option_id BIGINT NOT NULL,
    voter_id BIGINT NULL,                       -- nullable if anonymous
    rating INT DEFAULT NULL,                    -- used only for RATING polls
    voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (poll_id, voter_id),                 -- prevents duplicate votes
    FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE,
    FOREIGN KEY (poll_option_id) REFERENCES poll_options(id) ON DELETE CASCADE,
    FOREIGN KEY (voter_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 14. comments
CREATE TABLE comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    decision_id BIGINT NOT NULL,
    author_id BIGINT NOT NULL,
    parent_id BIGINT NULL,                      -- nullable, self-referencing
    content VARCHAR(2000) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_flagged BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (decision_id) REFERENCES decisions(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- 15. notifications
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    type VARCHAR(30) NOT NULL,                  -- NEW_COMMENT / NEW_VOTE / etc.
    message VARCHAR(255) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 16. moderation_flags
CREATE TABLE moderation_flags (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    target_type VARCHAR(20) NOT NULL,           -- COMMENT / DECISION
    target_id BIGINT NOT NULL,
    reported_by BIGINT NOT NULL,
    reason VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',       -- PENDING / RESOLVED
    FOREIGN KEY (reported_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_decisions_owner ON decisions(owner_id);
CREATE INDEX idx_decisions_category ON decisions(category_id);
CREATE INDEX idx_decisions_community ON decisions(community_id);
CREATE INDEX idx_votes_poll ON votes(poll_id);
CREATE INDEX idx_votes_voter ON votes(voter_id);
CREATE INDEX idx_comments_decision ON comments(decision_id);
CREATE INDEX idx_comments_parent ON comments(parent_id);
CREATE INDEX idx_communities_created_by ON communities(created_by);
CREATE INDEX idx_communities_visibility ON communities(visibility);
CREATE INDEX idx_community_members ON community_members(community_id, user_id);
CREATE INDEX idx_community_members_user ON community_members(user_id);

-- --------------------------------------------------------
-- 17. decision_impressions (Analytics: View & Reach Tracking)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS decision_impressions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    decision_id BIGINT NOT NULL,
    user_id BIGINT NULL,                            -- NULL for anonymous visitors
    ip_hash VARCHAR(64) NULL,                       -- Hashed IP for anonymous reach tracking
    type VARCHAR(20) NOT NULL DEFAULT 'VIEW',       -- 'VIEW' or 'REACH'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_impression_type CHECK (type IN ('VIEW', 'REACH')),
    FOREIGN KEY (decision_id) REFERENCES decisions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes on decision_impressions
CREATE INDEX idx_impressions_decision ON decision_impressions (decision_id);
CREATE INDEX idx_impressions_type ON decision_impressions (decision_id, type);
