import {postgres} from "../index";
import {FingerprintResult} from "express-fingerprint";

class TokenRepository {
  static async getRefreshSession(refreshToken: string) {
  }

  static async createRefreshSession(user_id: number, refreshToken: string, fingerprint: FingerprintResult) {
    await postgres.createRefreshSession(user_id, refreshToken, fingerprint)
  }

  static async deleteRefreshSession(refreshToken: string) {
  }
}

export default TokenRepository;