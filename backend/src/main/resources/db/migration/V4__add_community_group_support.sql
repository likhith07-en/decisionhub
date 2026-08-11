-- V4: Add Community Group Support & Group-Specific Decisions
-- Compatible with MySQL 8.0 / PostgreSQL
-- Extends communities, community_members, and decisions tables

-- --------------------------------------------------------
-- 1. EXTEND communities TABLE
-- Add visibility, created_at, and updated_at columns
-- --------------------------------------------------------
SET @col_exists = (
    SELECT COUNT(*) 
    FROM information_schema.COLUMNS 
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'communities'
      AND COLUMN_NAME = 'visibility'
);

SET @sql = IF(
    @col_exists = 0,
    'ALTER TABLE communities ADD COLUMN visibility VARCHAR(10) DEFAULT ''PUBLIC'', ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    'SELECT ''Column visibility already exists in communities, skipping.'''
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Indexes for communities
SET @idx_exists = (
    SELECT COUNT(*) FROM information_schema.STATISTICS 
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'communities' AND INDEX_NAME = 'idx_communities_created_by'
);
SET @sql = IF(@idx_exists = 0, 'CREATE INDEX idx_communities_created_by ON communities(created_by)', 'SELECT 1');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @idx_exists = (
    SELECT COUNT(*) FROM information_schema.STATISTICS 
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'communities' AND INDEX_NAME = 'idx_communities_visibility'
);
SET @sql = IF(@idx_exists = 0, 'CREATE INDEX idx_communities_visibility ON communities(visibility)', 'SELECT 1');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;


-- --------------------------------------------------------
-- 2. EXTEND community_members TABLE
-- Add joined_at column and user lookup index
-- --------------------------------------------------------
SET @col_exists = (
    SELECT COUNT(*) 
    FROM information_schema.COLUMNS 
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'community_members'
      AND COLUMN_NAME = 'joined_at'
);

SET @sql = IF(
    @col_exists = 0,
    'ALTER TABLE community_members ADD COLUMN joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    'SELECT ''Column joined_at already exists in community_members, skipping.'''
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Index for user membership lookups
SET @idx_exists = (
    SELECT COUNT(*) FROM information_schema.STATISTICS 
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'community_members' AND INDEX_NAME = 'idx_community_members_user'
);
SET @sql = IF(@idx_exists = 0, 'CREATE INDEX idx_community_members_user ON community_members(user_id)', 'SELECT 1');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;


-- --------------------------------------------------------
-- 3. EXTEND decisions TABLE
-- Add community_id FK column for group-specific decisions/polls
-- --------------------------------------------------------
SET @col_exists = (
    SELECT COUNT(*) 
    FROM information_schema.COLUMNS 
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'decisions'
      AND COLUMN_NAME = 'community_id'
);

SET @sql = IF(
    @col_exists = 0,
    'ALTER TABLE decisions ADD COLUMN community_id BIGINT NULL, ADD CONSTRAINT fk_decisions_community FOREIGN KEY (community_id) REFERENCES communities(id) ON DELETE SET NULL',
    'SELECT ''Column community_id already exists in decisions, skipping.'''
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Index for community decision queries
SET @idx_exists = (
    SELECT COUNT(*) FROM information_schema.STATISTICS 
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'decisions' AND INDEX_NAME = 'idx_decisions_community'
);
SET @sql = IF(@idx_exists = 0, 'CREATE INDEX idx_decisions_community ON decisions(community_id)', 'SELECT 1');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
