CREATE TABLE IF NOT EXISTS decisions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO decisions (title, status) VALUES
('Choose a release platform', 'active'),
('Pick a design system', 'draft');
