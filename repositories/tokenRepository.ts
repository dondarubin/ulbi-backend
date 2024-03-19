import {postgres} from "../index";
import {TokenSchema} from "../database/models/tokenSchema";

class TokenRepository {
  static async createRefreshSession(refreshTokenObject: TokenSchema) {
    const tokenDataFromDB = await postgres.getTokenDataByUserId(refreshTokenObject.user_id)

    if (tokenDataFromDB.length) {
      const updatedTokenDataFromDB = await postgres.updateTokenData(refreshTokenObject)
      return updatedTokenDataFromDB
    }

    const createdTokenDataDB = await postgres.createRefreshSession(refreshTokenObject)
    return createdTokenDataDB
  }


  static async deleteRefreshSession(refresh_token: string) {
    const deletedTokenDataDB = await postgres.deleteRefreshSession(refresh_token)
    return deletedTokenDataDB
  }


  static async getRefreshSessionDataByRefreshToken(refresh_token: string) {
    const refreshTokenDataFromDB = await postgres.getTokenDataByRefreshToken(refresh_token)

    if (!refreshTokenDataFromDB.length) {
      return null
    }

    return refreshTokenDataFromDB[0] as TokenSchema
  }


  // static async getRefreshSessionData(user_id: number) {
  //   const tokenDataFromDB = await postgres.getTokenData(user_id)
  //   return tokenDataFromDB
  // }

  // static async updateRefreshSessionData(
  //   user_id: number,
  //   new_refresh_token: string,
  //   finger_print: FingerprintResult
  // ) {
  //   const updatedTokenDataFromDB = await postgres.updateTokenData(
  //     user_id,
  //     new_refresh_token,
  //     finger_print
  //   )
  //   return updatedTokenDataFromDB
  // }
}

export default TokenRepository;