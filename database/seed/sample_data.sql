-- Seed Data for DecisionHub (matches official schema.sql)

-- 1. Categories
INSERT INTO categories (id, name) VALUES
(1, 'Career'),
(2, 'Education'),
(3, 'Technology'),
(4, 'Travel'),
(5, 'Finance'),
(6, 'Lifestyle');

-- 2. Users (Roles: USER / MODERATOR / ADMIN)
INSERT INTO users (id, email, password_hash, full_name, role, provider) VALUES
(1, 'admin@decisionhub.com', '$2a$10$hash_admin', 'Admin Principal', 'ADMIN', 'LOCAL'),
(2, 'sarah@decisionhub.com', '$2a$10$hash_sarah', 'Sarah Moderator', 'MODERATOR', 'LOCAL'),
(3, 'alex@example.com', '$2a$10$hash_alex', 'Alex Developer', 'USER', 'LOCAL');

-- 3. User Profiles
INSERT INTO user_profiles (user_id, bio, avatar_url) VALUES
(1, 'Platform administrator', NULL),
(3, 'Software developer exploring career options', NULL);

-- 4. Communities
INSERT INTO communities (id, name, category_id, description, created_by, visibility) VALUES
(1, 'Tech Leaders', 3, 'Community for software architecture and tech decisions.', 1, 'PUBLIC'),
(2, 'Career Advice', 1, 'Community focused on career path decisions.', 2, 'PUBLIC');

-- 5. Community Members
INSERT INTO community_members (community_id, user_id, role) VALUES
(1, 1, 'OWNER'),
(1, 3, 'MEMBER'),
(2, 2, 'OWNER'),
(2, 3, 'MEMBER');

-- 6. Example Decisions (MBA vs Job, iPhone vs Samsung, Goa vs Bali, Startup vs Corporate Job, Remote vs Office Work)
INSERT INTO decisions (id, owner_id, title, description, visibility, category_id, community_id) VALUES
(1, 3, 'MBA vs Job', 'Should I pursue an MBA abroad or accept a senior engineering position?', 'PUBLIC', 1, 2),
(2, 3, 'iPhone vs Samsung', 'Choosing between iPhone 15 Pro vs Samsung Galaxy S24 Ultra.', 'PUBLIC', 3, 1),
(3, 2, 'Goa vs Bali', 'Best vacation destination for a 7-day tropical retreat.', 'PUBLIC', 4, NULL),
(4, 3, 'Startup vs Corporate Job', 'Join an early-stage startup as employee #5 or stay in Big Tech?', 'PUBLIC', 1, 2),
(5, 2, 'Remote vs Office Work', 'Evaluate hybrid remote flexibility vs on-site collaboration.', 'PUBLIC', 6, NULL);

-- 7. Decision Options
INSERT INTO decision_options (id, decision_id, label, description) VALUES
(1, 1, 'MBA', 'Pursue an MBA abroad at a top-tier university'),
(2, 1, 'Job', 'Accept the senior engineering position immediately'),

(3, 2, 'iPhone 15 Pro', 'Apple flagship with A17 Pro chip and titanium design'),
(4, 2, 'Samsung Galaxy S24 Ultra', 'Samsung flagship with S Pen and AI features'),

(5, 3, 'Goa', 'Beaches, nightlife, and affordable domestic travel'),
(6, 3, 'Bali', 'Scenic rice terraces, temples, and international experience'),

(7, 4, 'Startup', 'Join early-stage startup as employee #5'),
(8, 4, 'Corporate Job', 'Stay at Big Tech with stable salary and benefits'),

(9, 5, 'Remote Work', 'Fully remote with flexible schedule'),
(10, 5, 'Office Work', 'On-site collaboration with team');

-- 8. Comparison Factors
INSERT INTO comparison_factors (id, decision_id, name) VALUES
(1, 1, 'Cost'),
(2, 1, 'Risk'),
(3, 1, 'Time'),
(4, 1, 'Career Growth'),
(5, 2, 'Cost'),
(6, 2, 'Features'),
(7, 2, 'Ecosystem');

-- 9. Option Scores (1-10 scale)
INSERT INTO option_scores (option_id, factor_id, score) VALUES
(1, 1, 9),   -- MBA: Cost = 9 (expensive)
(1, 2, 7),   -- MBA: Risk = 7
(1, 3, 8),   -- MBA: Time = 8 (2 years)
(1, 4, 9),   -- MBA: Career Growth = 9
(2, 1, 2),   -- Job: Cost = 2 (earns money)
(2, 2, 3),   -- Job: Risk = 3
(2, 3, 2),   -- Job: Time = 2 (immediate)
(2, 4, 7);   -- Job: Career Growth = 7

-- 10. Polls
INSERT INTO polls (id, decision_id, poll_type, is_anonymous, ends_at) VALUES
(1, 1, 'SINGLE', false, '2026-09-01 00:00:00'),
(2, 2, 'SINGLE', false, '2026-09-15 00:00:00');

-- 11. Poll Options
INSERT INTO poll_options (id, poll_id, option_id) VALUES
(1, 1, 1),   -- Poll 1: MBA
(2, 1, 2),   -- Poll 1: Job
(3, 2, 3),   -- Poll 2: iPhone
(4, 2, 4);   -- Poll 2: Samsung

-- 12. Votes
INSERT INTO votes (poll_id, poll_option_id, voter_id, voted_at) VALUES
(1, 1, 2, NOW()),   -- Sarah voted MBA
(1, 2, 3, NOW()),   -- Alex voted Job
(2, 3, 3, NOW());   -- Alex voted iPhone

-- 13. Comments (with threaded reply)
INSERT INTO comments (id, decision_id, author_id, parent_id, content) VALUES
(1, 1, 2, NULL, 'An MBA gives you a strong global network and leadership skills.'),
(2, 1, 3, 1, 'True, but 2 years of lost income is a big trade-off.'),
(3, 2, 3, NULL, 'iPhone ecosystem integration is unmatched.');

-- 14. Notifications
INSERT INTO notifications (user_id, type, message) VALUES
(3, 'NEW_VOTE', 'Sarah voted on your MBA vs Job decision.'),
(2, 'NEW_COMMENT', 'Alex replied to your comment on MBA vs Job.');

-- 15. Moderation Flags
INSERT INTO moderation_flags (target_type, target_id, reported_by, reason) VALUES
('COMMENT', 3, 2, 'Testing moderation flag functionality.');
