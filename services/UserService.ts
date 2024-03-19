import userRepository from "../repositories/userRepository";
import bcrypt from "bcryptjs"
import TokenService from "./TokenService";
import TokenRepository from "../repositories/tokenRepository";
import {FingerprintResult} from "express-fingerprint";
import {ACCESS_TOKEN_EXPIRATION} from "../const/constants";
import ApiError from "../exceptions/errors";
import tokenRepository from "../repositories/tokenRepository";
import UserDto from "../dtos/userDto";
import tokenService from "./TokenService";
import {UserSchema} from "../database/models/userSchema";

class UserService {
  static async register(username: string, password: string, finger_print: FingerprintResult) {
    const userDataFromDB = await userRepository.getUserDataByUsername(username)

    if (userDataFromDB) {
      throw ApiError.BadRequest(`User with username = '${username}' is exists!`)
    }

    const hashedPassword = bcrypt.hashSync(password, 8)
    const newUser = await userRepository.createUser(username, hashedPassword)

    const userDto = new UserDto(newUser)
    const accessToken = await TokenService.generateAccessToken({...userDto})
    const refreshToken = await TokenService.generateRefreshToken({...userDto})

    await TokenRepository.createRefreshSession({
      user_id: userDto.userId,
      refresh_token: refreshToken,
      finger_print: finger_print,
    })

    return {
      user: userDto,
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION
    }
  }


  static async login(username: string, password: string, finger_print: FingerprintResult) {
    const userDataFromDB = await userRepository.getUserDataByUsername(username)

    if (!userDataFromDB) {
      throw ApiError.BadRequest(`User with username = '${username}' not found!`)
    }

    const isValidPassword = bcrypt.compareSync(password, userDataFromDB.hashed_password)

    if (!isValidPassword) {
      throw ApiError.BadRequest(`Invalid password`)
    }

    // // Массив сессий
    // const refreshTokensArray = await TokenRepository.getRefreshSessionData(userDataFromDB.user_id)
    //
    // // Если пользователь заходит со старого устройства
    // const a = refreshTokensArray.map(async (session) => {
    //   if (session.finger_print === fingerprint) {
    //     const userDto = new UserDto(userDataFromDB)
    //
    //     const accessToken = await TokenService.generateAccessToken({...userDto})
    //     const refreshToken = await TokenService.generateRefreshToken({...userDto})
    //
    //     await TokenRepository.updateRefreshSessionData(userDataFromDB.user_id, refreshToken, fingerprint)
    //
    //     return {
    //       accessToken,
    //       refreshToken,
    //     }
    //   }
    // })
    //
    // // Если пользователь заходит с нового устройства и
    // // если у пользователя больше чем 3 активные сессии,
    // // удаляем самую первую запись и добавляем новую
    // if (refreshTokensArray.length > 3) {
    //   await TokenRepository.deleteRefreshSession(refreshTokensArray[0].refresh_token)
    // }

    const userDto = new UserDto(userDataFromDB)
    const accessToken = await TokenService.generateAccessToken({...userDto})
    const refreshToken = await TokenService.generateRefreshToken({...userDto})

    await TokenRepository.createRefreshSession({
      user_id: userDto.userId,
      refresh_token: refreshToken,
      finger_print: finger_print,
    })

    return {
      user: userDto,
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION
    }
  }


  static async logout(refresh_token: string) {
    const deletedToken = await tokenRepository.deleteRefreshSession(refresh_token)
    return deletedToken
  }


  static async refresh(refresh_token: string, finger_print: FingerprintResult) {
    if (!refresh_token) {
      throw ApiError.UnauthorizedError()
    }

    const isValidRefreshToken = await tokenService.validateRefreshToken(refresh_token)
    const refreshTokenFromDB = await tokenRepository.getRefreshSessionDataByRefreshToken(refresh_token)

    if (!isValidRefreshToken || !refreshTokenFromDB) {
      throw ApiError.UnauthorizedError()
    }

    const userDataFromDB = await userRepository.getUserDataById(isValidRefreshToken.userId)

    // TODO добавил просто так, если что то сломается удалить и вернуть строку:
    // const userDto = new UserDto(userDataFromDB as UserSchema)
    if (!userDataFromDB) {
      throw ApiError.BadRequest(`User not found!`)
    }

    const userDto = new UserDto(userDataFromDB)
    const accessToken = await TokenService.generateAccessToken({...userDto})
    const refreshToken = await TokenService.generateRefreshToken({...userDto})

    await TokenRepository.createRefreshSession({
      user_id: userDto.userId,
      refresh_token: refreshToken,
      finger_print: finger_print,
    })

    return {
      user: userDto,
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION
    }
  }

}

export default UserService