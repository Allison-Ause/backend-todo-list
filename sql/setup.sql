
DROP TABLE IF EXISTS users, todos;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  password_hash VARCHAR NOT NULL
);

CREATE TABLE todos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT,
  item VARCHAR NOT NULL,
  bought BOOLEAN DEFAULT(false),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id)
);


INSERT INTO users (first_name, last_name, email, password_hash) VALUES
  ('Baba', 'Yaga', 'russian@witch.com', '$2b$10$ZWlOhOhipXorMYe07NlbyOqXR74MsTrEZZoanLXD5hgMvII4/BkOa');


INSERT INTO todos (user_id, item, bought) VALUES
  (1, 'pull baby teeth', false),
  (1, 'source raven talons', false),
  (1, 'extract the tears of a rake', false);

