-- V3: Add Decision Impressions & Analytics + Verify Vote Integrity
-- Compatible with MySQL 8.0
-- DO NOT DROP or ALTER any existing tables

-- --------------------------------------------------------
-- NEW TABLE: decision_impressions
-- Tracks reach and view events per decision (supports anonymous via ip_hash)
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

-- Performance Indexes on decision_impressions
CREATE INDEX idx_impressions_decision ON decision_impressions (decision_id);
CREATE INDEX idx_impressions_type ON decision_impressions (decision_id, type);

-- --------------------------------------------------------
-- VOTE INTEGRITY VERIFICATION
-- The UNIQUE constraint uq_user_poll_vote on votes(poll_id, voter_id)
-- already exists from V1__init_schema.sql as UNIQUE (poll_id, voter_id).
-- Re-applying below using IF NOT EXISTS pattern to safely enforce it.
-- --------------------------------------------------------

-- Safely add named unique constraint if it does not already exist
-- (MySQL 8.0: use ALTER TABLE ... ADD CONSTRAINT only if not present)
SET @constraint_exists = (
    SELECT COUNT(*) 
    FROM information_schema.TABLE_CONSTRAINTS 
    WHERE CONSTRAINT_SCHEMA = DATABASE()
      AND TABLE_NAME = 'votes'
      AND CONSTRAINT_NAME = 'uq_user_poll_vote'
      AND CONSTRAINT_TYPE = 'UNIQUE'
);

SET @sql = IF(
    @constraint_exists = 0,
    'ALTER TABLE votes ADD CONSTRAINT uq_user_poll_vote UNIQUE (poll_id, voter_id)',
    'SELECT ''Constraint uq_user_poll_vote already exists, skipping.'''
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
