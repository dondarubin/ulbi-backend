insert into articles (user_id, title, subtitle, img, views, type)
values (${user_id}, ${title}, ${subtitle}, ${img}, ${views}, ${type})
RETURNING *