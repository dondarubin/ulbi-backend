import {IEnvironmentService} from "../services/environmentService";
import postgres, {Row, RowList} from "postgres";
import {FingerprintResult} from "express-fingerprint";

interface IDatabase {
  getUserData(username: string): Promise<RowList<Row[]>>

  createNewUser(username: string, password: string): Promise<RowList<Row[]>>
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

  public async getUserData(username: string) {
    return this.database`
        SELECT *
        FROM users
        WHERE username = ${username}
    `
  }

  public async getTokenData(user_id: number) {
    return this.database`
        SELECT *
        FROM tokens
        WHERE (user_id = ${user_id})
    `
  }

  public async createNewUser(username: string, password: string) {
    return this.database`
        INSERT INTO users (username, password)
        VALUES (${username}, ${password})
        RETURNING *
    `
  }

  public async createRefreshSession(user_id: number, refresh_token: string, finger_print: FingerprintResult) {
    return this.database`
        INSERT INTO tokens (user_id, refresh_token, finger_print)
        VALUES (${user_id}, ${refresh_token}, ${finger_print.hash})
    `
  }


  // public async createNewUser(user: IDBUser) {
  //   await this.db`
  //       INSERT INTO Users (tg_id,
  //                          user_name,
  //                          user_surname,
  //                          user_age,
  //                          user_gender,
  //                          user_social_networks,
  //                          user_city,
  //                          profession,
  //                          experience,
  //                          description,
  //                          useful,
  //                          meeting_preferences)
  //       values (${user.tgUserId},
  //               ${user.name},
  //               ${user.surname},
  //               ${user.age},
  //               ${user.gender ? "М" : "Ж"},
  //               ${user.socialNetworks ? user.socialNetworks : null},
  //               ${user.city},
  //               ${user.profession},
  //               ${user.experience},
  //               ${user.description},
  //               ${user.useful},
  //               ${user.meetingPreferences ? user.meetingPreferences : null})`
  // }

  // public async addUserInterests(user: IDBUser) {
  //   await this.db`
  //       INSERT into usersinterests(user_id, interest_id)
  //       SELECT u.user_id, i.interest_id
  //       FROM Users u,
  //            interests i
  //       WHERE u.tg_id = ${user.tgUserId}
  //         AND i.interest_name IN ${this.db(user.listInterests)}
  //   `
  // }
}


