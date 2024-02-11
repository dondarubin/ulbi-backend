CREATE TABLE Users
(
    user_id   SERIAL PRIMARY KEY,
    username  VARCHAR(50) NOT NULL,
    password  VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP   NOT NULL DEFAULT now() -- Should not be set manually
);

CREATE TABLE Token
(
    token_id      SERIAL PRIMARY KEY,
    user_id       INTEGER     NOT NULL,
    refresh_token VARCHAR(50) NOT NULL,
    timestamp     TIMESTAMP   NOT NULL DEFAULT now(), -- Should not be set manually
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
            REFERENCES users (user_id)
);
