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
}

export default TokenRepository;