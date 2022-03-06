CREATE DATABASE bookstore_db;

-- installs the extension to enable uuid_generate_v4()
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\c bookstore_db; -- connect to the database in psql
\dt -- show tables
-- changing password
ALTER USER user_name WITH PASSWORD 'new_password';

CREATE TABLE IF NOT EXISTS users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name varchar(255) NOT NULL,
    user_email varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL
);

-- use single quotes for string literals
INSERT INTO users (user_name, user_email, user_password) VALUES ('admin', 'admin@bookstore.com', 'admin'); 

-- "\x on" sets expanded view with better readability

SELECT * FROM users;