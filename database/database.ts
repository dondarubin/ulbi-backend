import {IEnvironmentService} from "../services/environmentService";
import postgres, {Row, RowList} from "postgres";
import {FingerprintResult} from "express-fingerprint";
import {TokenSchema} from "./models/tokenSchema";
import {ProfileSchema} from "./models/profileSchema";
import {UserSchema} from "./models/userSchema";
import {ArticleSchema} from "./models/ArticleSchema";

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

  public async getProfileById(profile_id: number) {
    return this.database`
        SELECT *
        FROM profiles
        WHERE profile_id = ${profile_id}
    `
  }

  public async updateProfile(profile_id: number, profileFormData: ProfileSchema) {
    return this.database`
        UPDATE profiles
        SET firstname = ${profileFormData.firstname || ''},
            lastname  = ${profileFormData.lastname || ''},
            age       = ${profileFormData.age || 0},
            currency  = ${profileFormData.currency || ''},
            country   = ${profileFormData.country || ''},
            city      = ${profileFormData.city || ''},
            avatar    = ${profileFormData.avatar || ''}
        WHERE profile_id = ${profile_id}
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
}


