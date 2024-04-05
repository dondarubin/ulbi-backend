INSERT INTO profiles (user_id, username)
VALUES (${user_id}, ${username})
RETURNING *