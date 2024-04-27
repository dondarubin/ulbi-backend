import ApiError from "../exceptions/errors";
import {
  ArticleContentType,
  ArticleSchema,
  ContentCodeAvjSchema,
  ContentImageAvjSchema,
  ContentTextAvjSchema
} from "../database/models/ArticleSchema";
import ArticleRepository from "../repositories/articleRepository";
import ArticleDto from "../dtos/articleDto";
import {ArticleType} from "../const/constants";
import {ajv} from "../index";
import userRepository from "../repositories/userRepository";

class ArticleService {
  static async createArticle(article: ArticleSchema) {
    const userFromDb = await userRepository.getUserDataById(article.user_id)

    if (!userFromDb) {
      throw ApiError.BadRequest(`User with user_id: ${article.user_id} not found!`)
    }

    if (!article.title || !article.subtitle || !article.img || !article.type || !article.content) {
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

  static async getArticleById(articleId: number) {
    const articleData = await ArticleRepository.getArticleById(articleId)

    if (!articleData) {
      throw ApiError.BadRequest(`Article with article_id = '${articleId}' not found!`)
    }

    return {article: articleData}
  }
}

export default ArticleService