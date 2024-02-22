import userRepository from "../repositories/userRepository";
import bcrypt from "bcryptjs"
import TokenService from "./tokenService";
import TokenRepository from "../repositories/tokenRepository";
import {FingerprintResult} from "express-fingerprint";
import {ACCESS_TOKEN_EXPIRATION} from "../const/constants";

class UserService {
  static async register(username: string, password: string, fingerprint: FingerprintResult) {
    const userData = await userRepository.getUserData(username)

    if (userData) {
      throw new Error(`❌ User with username = ${username} is exists!`)
    }

    const hashedPassword = bcrypt.hashSync(password, 8)
    const {user_id} = await userRepository.createUser(username, hashedPassword)

    const payload = {user_id, username, password}
    const accessToken = await TokenService.generateAccessToken(payload)
    const refreshToken = await TokenService.generateRefreshToken(payload)

    await TokenRepository.createRefreshSession(user_id, refreshToken, fingerprint)

    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION
    }
  }
}

export default UserService