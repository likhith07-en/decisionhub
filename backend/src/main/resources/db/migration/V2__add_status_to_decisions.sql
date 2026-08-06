-- V2: Add missing 'status' column to decisions table
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'OPEN';
