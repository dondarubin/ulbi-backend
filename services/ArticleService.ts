import ApiError from "../exceptions/errors";
import {
  ArticleContentType,
  ArticleSchema,
  ContentCodeAvjSchema,
  ContentImageAvjSchema,
  ContentTextAvjSchema
} from "../database/models/ArticleSchema";
import ArticleRepository from "../repositories/articleRepository";
import {ArticleType} from "../const/constants";
import {ajv} from "../index";
import userRepository from "../repositories/userRepository";
import UserRepository from "../repositories/userRepository";
import ArticleDto from "../dtos/articleDto";

class ArticleService {
  static async createArticle(article: ArticleSchema) {
    const userFromDb = await userRepository.getUserDataById(article.user_id)

    if (!userFromDb) {
      throw ApiError.BadRequest(`User with user_id: ${article.user_id} not found!`)
    }

    if (!article.title || !article.subtitle || !article.img || !article.type || !article.content || article.content.length === 0) {
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

    const articleId = createdArticle.article_id;

    const articleDto = new ArticleDto(createdArticle)

    const validateContentText = ajv.compile(ContentTextAvjSchema);
    const validateContentImage = ajv.compile(ContentImageAvjSchema);
    const validateContentCode = ajv.compile(ContentCodeAvjSchema);

    for (const currentContent of article.content) {
      switch (currentContent.type) {
        case ArticleContentType.TEXT:
          const isValidText = validateContentText(currentContent);

          if (!isValidText) {
            console.log(validateContentText.errors)
            throw ApiError.BadRequest(`Error validation article text!`)
          }

          const createdTextContent = await ArticleRepository.createArticleContentText(articleId, currentContent);

          if (!createdTextContent) {
            throw ApiError.BadRequest("Create article content text error!");
          }

          break;

        case ArticleContentType.IMAGE:
          const isValidImage = validateContentImage(currentContent);

          if (!isValidImage) {
            console.log(validateContentImage.errors)
            throw ApiError.BadRequest(`Error validation article image!`)
          }

          const createdImageContent = await ArticleRepository.createArticleContentImage(articleId, currentContent);

          if (!createdImageContent) {
            throw ApiError.BadRequest("Create article content image error!");
          }

          break;

        case ArticleContentType.CODE:
          const isValidCode = validateContentCode(currentContent);

          if (!isValidCode) {
            console.log(validateContentCode.errors)
            throw ApiError.BadRequest(`Error validation article code!`)
          }

          const createdCodeContent = await ArticleRepository.createArticleContentCode(articleId, currentContent);

          if (!createdCodeContent) {
            throw ApiError.BadRequest("Create article content code error!");
          }

          break;
      }
    }

    return {article: articleDto}
  }

  static async getAllArticles(page: number, limit: number) {
    let articleData = await ArticleRepository.getAllArticles(page, limit)

    if (!articleData) {
      throw ApiError.BadRequest(`Articles not found!`)
    }

    return {searchingArticles: articleData.articlesDataSummary, hasMore: articleData.hasMore}
  }

  static async getArticleById(articleId: number) {
    const articleData = await ArticleRepository.getArticleById(articleId)

    if (!articleData) {
      throw ApiError.BadRequest(`Article with article_id = '${articleId}' not found!`)
    }

    return articleData
  }

  static async getArticleComments(articleId: number) {
    const articleCommentsData = await ArticleRepository.getArticleComments(articleId)

    if (!articleCommentsData) {
      throw ApiError.BadRequest(`Article comments with article_id = '${articleId}' not found!`)
    }

    return articleCommentsData
  }

  static async createArticleComments(articleId: number, userId: number, commentText: string) {
    const userFromDb = await UserRepository.getUserDataById(userId);

    if (!userFromDb) {
      throw ApiError.BadRequest(`User with user_id = '${userId}' not found!`)
    }

    const articleCommentsData = await ArticleRepository.createArticleComments(articleId, userId, commentText)

    if (!articleCommentsData) {
      throw ApiError.BadRequest(`Create comment to article with article_id = '${articleId}' error!`)
    }

    return {articleComment: articleCommentsData}
  }
}

export default ArticleService