import {postgres} from "../index";
import {
  ArticleCodeContent, ArticleCodeContentResponse, ArticleContent,
  ArticleImageContent, ArticleImageContentResponse,
  ArticleSchema,
  ArticleSchemaResponse,
  ArticleTextContent, ArticleTextContentResponse
} from "../database/models/ArticleSchema";

class ArticleRepository {
  static async createArticle(article: ArticleSchema) {
    const response = await postgres.createArticle(article)

    if (!response.length) {
      return null
    }

    return response[0] as ArticleSchemaResponse
  }

  static async createArticleContentText(article_id: number, currentContent: ArticleTextContent) {
    const articleContentTextResponse = await postgres.createArticleContentText(article_id, currentContent)

    if (!articleContentTextResponse.length) {
      return null
    }

    return articleContentTextResponse[0] as ArticleTextContentResponse
  }

  static async createArticleContentImage(article_id: number, currentContent: ArticleImageContent) {
    const articleContentCodeResponse = await postgres.createArticleContentImage(article_id, currentContent)

    if (!articleContentCodeResponse.length) {
      return null
    }

    return articleContentCodeResponse[0] as ArticleImageContentResponse
  }

  static async createArticleContentCode(article_id: number, currentContent: ArticleCodeContent) {
    const articleContentCodeResponse = await postgres.createArticleContentCode(article_id, currentContent)

    if (!articleContentCodeResponse.length) {
      return null
    }

    return articleContentCodeResponse[0] as ArticleCodeContentResponse
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


    const articleContentResponse = await postgres.getArticleContentById(searchingArticle.article_id)

    if (!articleContentResponse.length) {
      return null
    }

    const articleContentSummary: ArticleContent[] = [];

    articleContentResponse.map((currentContent) => {
      articleContentSummary.push(JSON.parse(currentContent.article_content_details))
    })

    return {
      ...searchingArticle,
      createdat: formattedDate,
      content: articleContentSummary
    }
  }
}

export default ArticleRepository;