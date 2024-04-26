insert into articles (title, subtitle, img, views, user_id)
values (${title}, ${subtitle}, ${img}, ${views}, ${user_id})
RETURNING *