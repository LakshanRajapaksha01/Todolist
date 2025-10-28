-- Todo List Database Setup Script
-- MySQL 8.0+

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS todolist_db;
USE todolist_db;

-- Create task table
CREATE TABLE IF NOT EXISTS task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(1000) NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NULL,
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data (optional)
INSERT INTO task (title, description, is_completed, created_at) VALUES
('Buy books', 'Buy books for the next school year', FALSE, NOW()),
('Clean home', 'Need to clean the bed room', FALSE, NOW()),
('Telephone assignment', 'Finish the mid term assignment', FALSE, NOW()),
('Play Cricket', 'Play the soft ball cricket match on next Sunday', FALSE, NOW()),
('Help Saman', 'Saman need help with his software project', FALSE, NOW());

-- Verify data
SELECT * FROM task WHERE is_completed = FALSE ORDER BY created_at DESC LIMIT 5;
