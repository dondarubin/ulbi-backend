import {NextFunction, Request, Response} from "express";
import ArticleService from "../services/ArticleService";

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
      const limit = req.query.limit;
      const page = req.query.page;
      const {searchingArticles, hasMore} = await ArticleService.getAllArticles(Number(page), Number(limit))

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
}

export default ArticleController;