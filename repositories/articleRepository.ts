import {postgres} from "../index";
import {
  ArticleCodeContent,
  ArticleCodeContentResponse, ArticleComment, ArticleCommentsSchema,
  ArticleContent,
  ArticleImageContent,
  ArticleImageContentResponse,
  ArticleSchema,
  ArticleSchemaResponse, ArticleSchemaWithAvatarResponse,
  ArticleTextContent,
  ArticleTextContentResponse
} from "../database/models/ArticleSchema";
import {collectArticleData} from "../utils/collectArticleData/collectArticleData";

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

  static async getAllArticles(page: number, limit: number) {
    const offset = (page - 1) * limit;
    // получаем на 1 больше, чем лимит, чтобы понять последняя это страница или нет
    const articleResponse = await postgres.getAllArticles(limit + 1, offset);

    if (!articleResponse.length) {
      return null;
    }

    const hasMore = articleResponse.length > limit; // есть ли еще данные
    const articlesToReturn = articleResponse.slice(0, limit); // возвращаем только требуемое количество статей

    const articlesDataPromises = articlesToReturn.map(article =>
      collectArticleData(article as ArticleSchemaWithAvatarResponse)
    );

    const articlesDataSummary = (await Promise.all(articlesDataPromises))
    .filter(currentArticleData => currentArticleData !== null);

    return {articlesDataSummary, hasMore}
  }

  static async getArticleById(articleId: number) {
    const articleResponse = await postgres.getArticleById(articleId)

    if (!articleResponse.length) {
      return null
    }

    const searchingArticle = articleResponse[0] as ArticleSchemaResponse

    const articleData = await collectArticleData(searchingArticle)

    if (!articleData) {
      return null
    }

    return articleData
  }

  static async getArticleComments(article_id: number) {
    const articleCommentsResponse = await postgres.getArticleComments(article_id)

    if (!articleCommentsResponse.length) {
      return null
    }

    const summary: ArticleCommentsSchema[] = []

    articleCommentsResponse.map((comment) => {
      summary.push(comment as ArticleCommentsSchema)
    })

    return summary
  }

  static async createArticleComments(articleId: number, userId: number, commentText: string) {
    const articleCommentsResponse = await postgres.createArticleComments(articleId, userId, commentText)

    if (!articleCommentsResponse.length) {
      return null
    }

    return articleCommentsResponse[0] as ArticleComment
  }
}

export default ArticleRepository;