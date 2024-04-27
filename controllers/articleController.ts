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

  static async getArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const articleId = Number(req.params.articleId);

      const searchingArticle = await ArticleService.getArticleById(articleId)

      return res.status(200).json(searchingArticle)
    } catch (err) {
      next(err)
    }
  }
}

export default ArticleController;