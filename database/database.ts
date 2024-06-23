import {IEnvironmentService} from "../services/environmentService";
import postgres, {Row, RowList} from "postgres";
import {TokenSchema} from "./models/tokenSchema";
import {ProfileSchema} from "./models/profileSchema";
import {
  ArticleCodeContent,
  ArticleContentType,
  ArticleImageContent,
  ArticleSchema,
  ArticleSortField,
  ArticleTextContent,
  SortOrder
} from "./models/ArticleSchema";
import {ArticleType} from "../const/constants";
import {ChatCompletionMessageParam} from "openai/src/resources/chat/completions";

interface IDatabase {
  createNewUser(username: string, password: string): Promise<RowList<Row[]>>,

  getUserDataByUsername(username: string): Promise<RowList<Row[]>>,

  // createRefreshSession(username: string): Promise<RowList<Row[]>>,
  // deleteRefreshSession(username: string): Promise<RowList<Row[]>>,
  // getTokenData(username: string): Promise<RowList<Row[]>>,
}

export class Postgres implements IDatabase {
  private readonly database: postgres.Sql;

  constructor(private readonly environmentService: IEnvironmentService) {
    this.database = postgres({
      port: Number(this.environmentService.get("POSTGRES_PORT")),
      username: this.environmentService.get(("POSTGRES_USERNAME")),
      password: this.environmentService.get(("POSTGRES_PASSWORD"))
    })
  }

  // USER
  public async createNewUser(username: string, hashedPassword: string) {
    return this.database`
        INSERT INTO Users (username, hashed_password)
        VALUES (${username}, ${hashedPassword})
        RETURNING *
    `
  }

  public async getAllUsers() {
    return this.database`
        SELECT *
        FROM Users
    `
  }

  public async getUserDataByUsername(username: string) {
    return this.database`
        SELECT *
        FROM Users
        WHERE username = ${username}
    `
  }

  public async getUserDataById(user_id: number) {
    return this.database`
        SELECT *
        FROM Users
        WHERE user_id = ${user_id}
    `
  }

  // TOKEN
  public async createRefreshSession(refreshToken: TokenSchema) {
    return this.database`
        INSERT INTO Tokens (user_id, refresh_token, finger_print)
        VALUES (${refreshToken.user_id},
                ${refreshToken.refresh_token},
                ${refreshToken.finger_print.hash})
        RETURNING *
    `
  }

  public async deleteRefreshSession(refresh_token: string) {
    return this.database`
        DELETE
        FROM Tokens
        WHERE refresh_token = ${refresh_token}
        RETURNING refresh_token
    `
  }

  public async getTokenDataByUserId(user_id: number) {
    return this.database`
        SELECT *
        FROM Tokens
        WHERE (user_id = ${user_id})
    `
  }

  public async getTokenDataByRefreshToken(refresh_token: string) {
    return this.database`
        SELECT *
        FROM Tokens
        WHERE (refresh_token = ${refresh_token})
    `
  }

  public async updateTokenData(refreshTokenObject: TokenSchema) {
    return this.database`
        UPDATE tokens
        SET refresh_token = ${refreshTokenObject.refresh_token},
            finger_print  = ${refreshTokenObject.finger_print.hash},
            timestamp     = CURRENT_TIMESTAMP
        WHERE user_id = ${refreshTokenObject.user_id}
        RETURNING *
    `
  }

  // PROFILE
  public async createProfileFromRegistration(username: string) {
    return this.database`
        INSERT INTO profiles (username)
        VALUES (${username})
        RETURNING *
    `
  }

  public async getProfileById(user_id: number) {
    return this.database`
        SELECT p.profile_id,
               p.firstname,
               p.lastname,
               p.age,
               p.currency,
               p.country,
               p.city,
               p.username,
               p.avatar
        FROM Users u
                 JOIN
             Profiles p ON p.username = u.username
        WHERE u.user_id = ${user_id}
    `
  }

  public async updateProfile(user_id: number, profileFormData: ProfileSchema) {
    return this.database`
        UPDATE profiles
        SET firstname = ${profileFormData.firstname || ''},
            lastname  = ${profileFormData.lastname || ''},
            age       = ${profileFormData.age || 0},
            currency  = ${profileFormData.currency || ''},
            country   = ${profileFormData.country || ''},
            city      = ${profileFormData.city || ''},
            avatar    = ${profileFormData.avatar || ''}
        FROM users
        WHERE users.username = profiles.username
          AND users.user_id = ${user_id}
        RETURNING *
    `
  }

  // ARTICLE
  public async createArticle(article: ArticleSchema) {
    return this.database`
        INSERT INTO articles (user_id, title, subtitle, img, type)
        VALUES (${article.user_id},
                ${article.title},
                ${article.subtitle},
                ${article.img},
                ${article.type})
        RETURNING *
    `
  }

  public async getArticleById(articleId: number) {
    return this.database`
        SELECT *
        FROM articles
        WHERE article_id = ${articleId}
    `
  }

  public async createArticleContentText(article_id: number, currentContent: ArticleTextContent) {
    return this.database`
        INSERT INTO articlecontents (article_id, article_content_type, article_content_details)
        VALUES (${article_id},
                ${ArticleContentType.TEXT},
                ${JSON.stringify(currentContent)})
        RETURNING *
    `
  }

  public async createArticleContentImage(article_id: number, currentContent: ArticleImageContent) {
    return this.database`
        INSERT INTO articlecontents (article_id, article_content_type, article_content_details)
        VALUES (${article_id},
                ${ArticleContentType.IMAGE},
                ${JSON.stringify(currentContent)})
        RETURNING *
    `
  }

  public async createArticleContentCode(article_id: number, currentContent: ArticleCodeContent) {
    return this.database`
        INSERT INTO articlecontents (article_id, article_content_type, article_content_details)
        VALUES (${article_id},
                ${ArticleContentType.CODE},
                ${JSON.stringify(currentContent)})
        RETURNING *
    `
  }

  public async getAllArticles(
    limit: number,
    offset: number,
    sort: ArticleSortField,
    order: SortOrder,
    search: string,
    type: string
  ) {
    const searchFilter = `%${search}%`;
    const orderDirection = order.toUpperCase()
    const orderBy = sort === 'created_at' ? 'a.created_at' : (sort === 'views' ? 'a.views' : 'a.title');

    if (type === ArticleType.ALL) {
      return this.database`
          SELECT a.article_id,
                 a.user_id,
                 a.title,
                 a.subtitle,
                 a.img,
                 a.views,
                 a.created_at,
                 a.type,
                 u.username,
                 p.avatar
          FROM Articles a
                   INNER JOIN
               Users u ON a.user_id = u.user_id
                   INNER JOIN
               Profiles p ON u.username = p.username
          WHERE (a.title ILIKE ${searchFilter} OR a.subtitle ILIKE ${searchFilter})
          ORDER BY ${this.database(orderBy)} ${this.database.unsafe(orderDirection)}
          LIMIT ${limit} OFFSET ${offset}
      `
    } else {
      return this.database`
          SELECT a.article_id,
                 a.user_id,
                 a.title,
                 a.subtitle,
                 a.img,
                 a.views,
                 a.created_at,
                 a.type,
                 u.username,
                 p.avatar
          FROM Articles a
                   INNER JOIN
               Users u ON a.user_id = u.user_id
                   INNER JOIN
               Profiles p ON u.username = p.username
          WHERE (a.title ILIKE ${searchFilter} OR a.subtitle ILIKE ${searchFilter})
            AND ${type} = ANY (a.type)
          ORDER BY ${this.database(orderBy)} ${this.database.unsafe(orderDirection)}
          LIMIT ${limit} OFFSET ${offset}
      `
    }
  }

  public async getArticleContentById(article_id: number) {
    return this.database`
        SELECT article_content_details
        FROM articlecontents
        WHERE article_id = ${article_id}
        ORDER BY created_at
    `
  }

  public async getArticleRating(article_id: number, user_id: number) {
    return this.database`
        SELECT *
        FROM articlerating
        WHERE article_id = ${article_id} AND user_id = ${user_id}
    `
  }

  public async rateArticle(article_id: number, user_id: number, rate: number, feedback?: string) {
    return this.database`
       INSERT INTO articlerating (user_id, article_id, rate, feedback) 
       VALUES (${user_id},
               ${article_id},
               ${rate},
               ${feedback ?? null})
       RETURNING *
    `
  }

  // COMMENT
  public async getArticleComments(article_id: number) {
    return this.database`
        SELECT c.comment_id,
               c.text,
               c.article_id,
               u.username,
               u.user_id,
               p.avatar
        FROM comments c
                 JOIN users u on u.user_id = c.user_id
                 JOIN profiles p on u.username = p.username
        WHERE article_id = ${article_id}
    `
  }

  public async createArticleComments(articleId: number, userId: number, commentText: string) {
    return this.database`
        INSERT INTO comments (text, article_id, user_id)
        VALUES (${commentText},
                ${articleId},
                ${userId})
        RETURNING *
    `
  }

  //   GPT
  public async getGptUserHistory(user_id: number) {
    return this.database`
        SELECT *
        FROM gpthistory
        WHERE user_id = ${user_id}
        ORDER BY created_at
    `
  }

  public async addValueToGptHistory(user_id: number, message: ChatCompletionMessageParam) {
    return this.database`
        INSERT INTO gpthistory (user_id, role, content)
        VALUES (${user_id},
                ${message.role},
                ${JSON.stringify(message.content)})
        RETURNING *
    `
  }

  // public async addValueToGptHistory(data: requestGptData) {
  //   return this.database`
  //       INSERT INTO gpthistory (user_id, role, content)
  //       VALUES (${data.user_id},
  //               ${data.role},
  //               ${data.content})
  //       RETURNING *
  //   `
  // }

  // Notifications
  public async getNotifications(user_id: number) {
    return this.database`
        SELECT *
        FROM notifications
        WHERE user_id = ${user_id}
        ORDER BY notification_id
    `
  }
}


