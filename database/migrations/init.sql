CREATE TYPE UserRoles AS ENUM ('USER', 'ADMIN', 'MANAGER');

CREATE TABLE Users
(
    user_id         SERIAL PRIMARY KEY,
    username        VARCHAR(20) UNIQUE NOT NULL,
    hashed_password VARCHAR(100)       NOT NULL,
    roles           UserRoles[]        NOT NULL DEFAULT ARRAY ['USER']::UserRoles[],
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

-- TODO сделать такие типы и настроить добавление в таблицу по этим типам
-- CREATE TYPE ProfileCountryTypes AS ENUM ('IT', 'Economy', 'Business');
-- CREATE TYPE ProfileCurrencyTypes AS ENUM ('IT', 'Economy', 'Business');

CREATE TABLE Profiles
(
    profile_id SERIAL PRIMARY KEY,
    firstname  VARCHAR(50) DEFAULT '',
    lastname   VARCHAR(50) DEFAULT '',
    age        SMALLINT    DEFAULT 0,
    currency   VARCHAR(5)  DEFAULT 'USD',
    country    VARCHAR(50) DEFAULT 'United States',
    city       VARCHAR(50) DEFAULT '',
    username   VARCHAR(20) UNIQUE NOT NULL REFERENCES Users (username) ON DELETE CASCADE,
    avatar     TEXT        DEFAULT ''
);

CREATE TYPE ArticleTypes AS ENUM ('IT', 'Economy', 'Business');

CREATE TYPE ArticleContentTypes AS ENUM ('TEXT', 'IMAGE', 'CODE');

CREATE TABLE Articles
(
    article_id SERIAL PRIMARY KEY,
    user_id    INT            NOT NULL REFERENCES Users (user_id) ON DELETE CASCADE,
    title      VARCHAR(100)   NOT NULL,
    subtitle   VARCHAR(100)   NOT NULL,
    img        TEXT           NOT NULL,
    views      INT            NOT NULL DEFAULT 0,
    created_at TIMESTAMP      NOT NULL DEFAULT now(),
    type       ArticleTypes[] NOT NULL
);

CREATE TABLE ArticleContents
(
    article_content_id      SERIAL PRIMARY KEY,
    article_id              INT                 NOT NULL REFERENCES Articles (article_id) ON DELETE CASCADE,
    article_content_type    ArticleContentTypes NOT NULL,
    article_content_details TEXT                NOT NULL
);

CREATE TABLE Comments
(
    comment_id SERIAL PRIMARY KEY,
    text       VARCHAR(500) NOT NULL,
    article_id INT          NOT NULL REFERENCES Articles (article_id) ON DELETE CASCADE,
    user_id    INT          NOT NULL REFERENCES Users (user_id) ON DELETE CASCADE
);
