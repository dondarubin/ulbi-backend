CREATE TABLE Users
(
    user_id   SERIAL PRIMARY KEY,
    username  VARCHAR(50) UNIQUE NOT NULL,
    password  VARCHAR(150)        NOT NULL,
--     role      SMALLINT           NOT NULL,
    timestamp TIMESTAMP          NOT NULL DEFAULT now() -- Should not be set manually
);

CREATE TABLE Tokens
(
    token_id      SERIAL PRIMARY KEY,
    user_id       INT          NOT NULL REFERENCES Users (user_id) ON DELETE CASCADE,
    refresh_token VARCHAR(400) NOT NULL,
    finger_print  VARCHAR(50)  NOT NULL,
    timestamp     TIMESTAMP    NOT NULL DEFAULT now() -- Should not be set manually
);




SELECT * FROM Users;
SELECT * FROM Tokens;

SELECT *
FROM users
WHERE username = 'Mama';

INSERT INTO users (username, password)
VALUES ('Papa', '12333')
RETURNING *
