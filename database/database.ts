import {IEnvironmentService} from "../services/environmentService";
import postgres, {Row, RowList} from "postgres";
import {FingerprintResult} from "express-fingerprint";
import {TokenSchema} from "./models/tokenSchema";

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

  // public async updateTokenData(user_id: number, new_refresh_token: string, finger_print: FingerprintResult) {
  //   return this.database`
  //       UPDATE tokens
  //       SET refresh_token = ${new_refresh_token}
  //       WHERE user_id = ${user_id} AND finger_print = ${finger_print.hash}
  //   `
  // }
}


