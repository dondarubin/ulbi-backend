import {postgres} from "../index";
import {ArticleSchema, ArticleSchemaResponse} from "../database/models/ArticleSchema";

class ArticleRepository {
  static async createArticle(article: ArticleSchema) {
    const response = await postgres.createArticle(article)

    if (!response.length) {
      return null
    }

    return response[0] as ArticleSchemaResponse
  }

  static async getArticleById(articleId: number) {
    const articleResponse = await postgres.getArticleById(articleId)

    if (!articleResponse.length) {
      return null
    }

    const searchingArticle = articleResponse[0] as ArticleSchemaResponse

    const rowDate = new Date(searchingArticle.createdat)
    const formattedDate = new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    }).format(rowDate);

    return {
      ...searchingArticle,
      createdat: formattedDate,
    }
  }
}

export default ArticleRepository;