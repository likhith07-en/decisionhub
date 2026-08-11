-- V2: Add missing 'status' column to decisions table
-- Compatible with MySQL 8.0 / PostgreSQL

SET @col_exists = (
    SELECT COUNT(*) 
    FROM information_schema.COLUMNS 
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'decisions'
      AND COLUMN_NAME = 'status'
);

SET @sql = IF(
    @col_exists = 0,
    'ALTER TABLE decisions ADD COLUMN status VARCHAR(20) DEFAULT ''OPEN''',
    'SELECT ''Column status already exists in decisions, skipping.'''
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
