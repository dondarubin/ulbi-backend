UPDATE tokens
SET refresh_token = ${refresh_token}
WHERE user_id = ${user_id} AND finger_print = ${finger_print.hash}