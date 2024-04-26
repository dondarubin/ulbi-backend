DELETE
FROM tokens
WHERE refresh_token = ${refreshToken}
RETURNING refresh_token