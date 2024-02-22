import {UserSchema} from "../database/models/userSchema";
import {NextFunction} from "express";
import jwt from 'jsonwebtoken'
import {environmentService} from "../index";
import tokenRepository from "../repositories/tokenRepository";

class TokenService {

  static async generateAccessToken(payload: UserSchema) {
    return jwt.sign(
      payload,
      environmentService.get("ACCESS_TOKEN_SECRET"),
      {expiresIn: "30m"}
    )
  }

  static async generateRefreshToken(payload: UserSchema) {
    return jwt.sign(
      payload,
      environmentService.get("REFRESH_TOKEN_SECRET"),
      {expiresIn: "15d"}
    )
  }

  static async checkAccess(req: Request, _: any, next: NextFunction) {
  }
}

export default TokenService
