import {postgres} from "../../index";
import {ArticleContent, ArticleSchemaResponse} from "../../database/models/ArticleSchema";

export async function collectArticleData(searchingArticle: ArticleSchemaResponse): Promise<(ArticleSchemaResponse | [])>{
  const rowDate = new Date(searchingArticle.created_at)
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  }).format(rowDate);

  const articleContentResponse = await postgres.getArticleContentById(searchingArticle.article_id)

  if (!articleContentResponse.length) {
    return []
  }

  const articleContentSummary: ArticleContent[] = [];

  articleContentResponse.map((currentContent) => {
    articleContentSummary.push(JSON.parse(currentContent.article_content_details))
  })

  return {
    ...searchingArticle,
    created_at: formattedDate,
    content: articleContentSummary
  }
}