INSERT INTO tokens (user_id, refresh_token, finger_print)
VALUES (${userId}, ${refreshToken}, ${finger_print.hash})
RETURNING *