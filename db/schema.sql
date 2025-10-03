CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    bio TEXT,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (email, password_hash) VALUES
('jonas@mail.com', '$2b$12$KIXQ6E0tJHW2hj0Z9qe6ruM95/VG/qjNkUhgCR0moLAwGBk/90Vd6'),
('lars@mail.com', '$2b$12$KIXQ6E0tJHW2hj0Z9qe6ruzAqNJkh.DlcJ9JIba3mRhkHXy.3CxZK');

INSERT INTO profiles (user_id, first_name, last_name) VALUES
(1, 'Jonas', 'B'),
(2, 'Lars', 'F');
