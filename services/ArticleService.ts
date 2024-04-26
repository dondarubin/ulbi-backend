import ApiError from "../exceptions/errors";
import {ArticleSchema} from "../database/models/ArticleSchema";
import ArticleRepository from "../repositories/articleRepository";
import ArticleDto from "../dtos/articleDto";
import {ArticleType} from "../const/constants";

class ArticleService {
  static async createArticle(article: ArticleSchema) {
    if (!article.title || !article.subtitle || !article.img || !article.type) {
      throw ApiError.BadRequest(`Article data isn't complete!`)
    }

    // Проверка значений массива на соответсвие с enum
    if (!article.type.every(type => Object.values(ArticleType).includes(type))) {
      throw ApiError.BadRequest(`Article types isn't wrong!`)
    }

    const createdArticle = await ArticleRepository.createArticle(article)

    if (!createdArticle) {
      throw ApiError.BadRequest("Create article error")
    }

    const articleDto = new ArticleDto(createdArticle)

    return {article: articleDto}
  }

  static async getArticleById(articleId: number) {
    const articleData = await ArticleRepository.getArticleById(articleId)

    if (!articleData) {
      throw ApiError.BadRequest(`Article with article_id = '${articleId}' not found!`)
    }

    return {article: articleData}
  }
}

export default ArticleService