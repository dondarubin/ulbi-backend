import {ArticleType} from "../../const/constants";

export interface ArticleSchema {
  title: string,
  subtitle: string,
  img: string,
  type: ArticleType[],
  user_id: number
}

export interface ArticleSchemaResponse extends ArticleSchema{
  article_id: number;
  createdat: string
}

