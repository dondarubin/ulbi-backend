import {ArticleSchemaResponse} from "../database/models/ArticleSchema";

class ArticleDto {
  title: string
  user_id: number

  constructor(article: ArticleSchemaResponse) {
    this.title = article.title
    this.user_id = article.user_id
  }
}

export default ArticleDto