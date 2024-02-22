import {UserSchema} from "../database/models/userSchema";
import {NextFunction} from "express";
import jwt from 'jsonwebtoken'
import {environmentService} from "../index";
import tokenRepository from "../repositories/tokenRepository";
import UserDto from "../dtos/userDto";

class TokenService {
  static async generateAccessToken(payload: UserDto) {
    return jwt.sign(
      payload,
      environmentService.get("ACCESS_TOKEN_SECRET"),
      {expiresIn: "30m"}
    )
  }

  static async generateRefreshToken(payload: UserDto) {
    return jwt.sign(
      payload,
      environmentService.get("REFRESH_TOKEN_SECRET"),
      {expiresIn: "15d"}
    )
  }

  static async validateAccessToken(access_token: string) {
    try {
      const isValidAccessToken = jwt.verify(access_token, environmentService.get("ACCESS_TOKEN_SECRET"))
      return isValidAccessToken
    } catch (err) {
      return null
    }
  }

  static async validateRefreshToken(refresh_token: string) {
    try {
      const isValidRefreshToken = jwt.verify(refresh_token, environmentService.get("REFRESH_TOKEN_SECRET"))
      return isValidRefreshToken
    } catch (err) {
      return null
    }
  }

  // static async checkAccess(req: Request, _: any, next: NextFunction) {
  // }
}

export default TokenService
