import {ArticleType} from "../../const/constants";

export enum ArticleContentType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  CODE = 'CODE'
}

export interface ArticleContentBase {
  type: ArticleContentType
}

export interface ArticleTextContent extends ArticleContentBase {
  type: ArticleContentType.TEXT;
  title?: string;
  paragraphs: string[];
}

export interface ArticleImageContent extends ArticleContentBase {
  type: ArticleContentType.IMAGE;
  imageUrl: string;
  imageCaption: string;
}

export interface ArticleCodeContent extends ArticleContentBase {
  type: ArticleContentType.CODE;
  code: string;
}

export type ArticleContent = ArticleTextContent | ArticleImageContent | ArticleCodeContent

export interface ArticleSchema {
  user_id: number;
  title: string;
  subtitle: string;
  img: string;
  type: ArticleType[];
  content: ArticleContent[]
}

export interface ArticleSchemaResponse extends ArticleSchema{
  article_id: number;
  createdat: string
}

export interface ArticleTextContentResponse{
  article_content_id: number;
  article_id: number;
  article_content_type: ArticleContentType.TEXT;
  article_content_details: ArticleTextContent;
}

export interface ArticleImageContentResponse{
  article_content_id: number;
  article_id: number;
  article_content_type: ArticleContentType.IMAGE;
  article_content_details: ArticleImageContent
}

export interface ArticleCodeContentResponse{
  article_content_id: number;
  article_id: number;
  article_content_type: ArticleContentType.CODE;
  article_content_details: ArticleCodeContent
}

export const ContentTextAvjSchema = {
  type: "object",
  properties: {
    type: {
      type: "string",
      const: "TEXT"
    },
    title: {
      type: "string"
    },
    paragraphs: {
      type: "array",
      items: {
        type: "string"
      },
      minItems: 1
    }
  },
  required: ["type", "paragraphs"],
  additionalProperties: false
}

export const ContentImageAvjSchema = {
  type: "object",
  properties: {
    type: {
      type: "string",
      const: "IMAGE"
    },
    imageUrl: {
      type: "string"
    },
    imageCaption: {
      type: "string",
    }
  },
  required: ["type", "imageUrl", "imageCaption"],
  additionalProperties: false
}

export const ContentCodeAvjSchema = {
  type: "object",
  properties: {
    type: {
      type: "string",
      const: "CODE"
    },
    code: {
      type: "string"
    }
  },
  required: ["type", "code"],
  additionalProperties: false
}

