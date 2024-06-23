import {NextFunction, Request, Response} from "express";
import ArticleService from "../services/ArticleService";
import {isValidFilterOptions} from "../utils/validateFilterOptions/validateFilterOptions";
import {ArticleSortField, SortOrder} from "../database/models/ArticleSchema";
import ApiError from "../exceptions/errors";
import {ArticleType} from "../const/constants";

class ArticleController {
  static async createArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        title,
        subtitle,
        img,
        type,
        user_id,
        content
      } = req.body

      const articleDto = await ArticleService.createArticle({
        title: title,
        subtitle: subtitle,
        img: img,
        type: type,
        user_id: Number(user_id),
        content: content
      })

      return res.status(200).json(articleDto)
    } catch (err) {
      next(err)
    }
  }

  static async getAllArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, sort, order, search = "", type } = req.query;
      const isValidSort = isValidFilterOptions(sort, ArticleSortField)
      const isValidOrder = isValidFilterOptions(order, SortOrder)
      const isValidType = isValidFilterOptions(type, ArticleType)

      if (!isValidSort || !isValidOrder || !isValidType){
        throw ApiError.BadRequest(`Filter options is incorrect!`)
      }

      const {
        searchingArticles,
        hasMore
      } = await ArticleService.getAllArticles(
        Number(page),
        Number(limit),
        sort,
        order,
        String(search),
        type
      )

      return res.status(200).json({searchingArticles, hasMore})
    } catch (err) {
      next(err)
    }
  }

  static async getArticleById(req: Request, res: Response, next: NextFunction) {
    try {
      const articleId = Number(req.params.articleId);

      const searchingArticle = await ArticleService.getArticleById(articleId)

      return res.status(200).json(searchingArticle)
    } catch (err) {
      next(err)
    }
  }

  static async getArticleComments(req: Request, res: Response, next: NextFunction) {
    try {
      const articleId = Number(req.params.articleId);

      const searchingComments = await ArticleService.getArticleComments(articleId)

      return res.status(200).json(searchingComments)
    } catch (err) {
      next(err)
    }
  }

  static async createArticleComments(req: Request, res: Response, next: NextFunction) {
    try {
      const articleId = Number(req.params.articleId);
      const {userId, commentText} = req.body

      const {
        articleComment: articleCommentDto
      } = await ArticleService.createArticleComments(articleId, userId, commentText)

      return res.status(200).json(articleCommentDto)
    } catch (err) {
      next(err)
    }
  }

  static async getArticleRating(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, articleId } = req.query;

      const articleRating = await ArticleService.getArticleRating(Number(articleId), Number(userId))

      console.log(articleRating)

      return res.status(200).json(articleRating)
    } catch (err) {
      next(err)
    }
  }

  static async rateArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        userId,
        articleId,
        rate,
        feedback
      } = req.body

      const rateArticle = await ArticleService.rateArticle(Number(articleId), Number(userId), Number(rate), feedback)

      console.log(rateArticle)

      return res.status(200).json(rateArticle)
    } catch (err) {
      next(err)
    }
  }
}

export default ArticleController;