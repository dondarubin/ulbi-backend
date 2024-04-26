SELECT articletypes.article_type_name
FROM articletypes
         JOIN articletyperelation ON articletyperelation.article_type_id = articletypes.article_type_id
WHERE articletyperelation.article_id = ${articleId}