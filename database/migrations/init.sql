CREATE TABLE Users
(
    user_id         SERIAL PRIMARY KEY,
    username        VARCHAR(20) UNIQUE NOT NULL,
    hashed_password VARCHAR(100)       NOT NULL,
--     role      SMALLINT           NOT NULL,
    timestamp       TIMESTAMP          NOT NULL DEFAULT now() -- Should not be set manually
);

CREATE TABLE Tokens
(
    token_id      SERIAL PRIMARY KEY,
    user_id       INT UNIQUE   NOT NULL REFERENCES Users (user_id) ON DELETE CASCADE,
    refresh_token VARCHAR(400) NOT NULL,
    finger_print  VARCHAR(50)  NOT NULL,
    timestamp     TIMESTAMP    NOT NULL DEFAULT now() -- Should not be set manually
);

CREATE TABLE Profiles
(
    profile_id SERIAL PRIMARY KEY,
    user_id    INT UNIQUE  NOT NULL REFERENCES Users (user_id) ON DELETE CASCADE,
    firstname  VARCHAR(50),
    lastname   VARCHAR(50),
    age        SMALLINT,
    currency   VARCHAR(50),
    country    VARCHAR(50),
    city       VARCHAR(50),
    username   VARCHAR(20) UNIQUE NOT NULL REFERENCES Users (username) ON DELETE CASCADE,
    avatar     VARCHAR(400)
);



SELECT *
FROM Users;
SELECT *
FROM Tokens;

SELECT *
FROM users
WHERE username = 'Mama';

INSERT INTO users (username, hashed_password)
VALUES ('Papa', '12333')
RETURNING *
