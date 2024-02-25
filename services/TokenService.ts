import jwt from 'jsonwebtoken'
import {environmentService} from "../index";
import UserDto from "../dtos/userDto";

class TokenService {
  // TODO изменить валидность токена на 30m | 30s
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
      // Возвращает вшитый в токен UserDto
      return isValidAccessToken as UserDto
    } catch (err) {
      return null
    }
  }

  static async validateRefreshToken(refresh_token: string) {
    try {
      const isValidRefreshToken = jwt.verify(refresh_token, environmentService.get("REFRESH_TOKEN_SECRET"))
      // Возвращает вшитый в токен UserDto
      return isValidRefreshToken as UserDto
    } catch (err) {
      return null
    }
  }
}

export default TokenService
