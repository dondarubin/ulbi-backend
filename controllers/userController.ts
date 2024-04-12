import {NextFunction, Request, Response} from "express";
import UserService from "../services/UserService";
import {COOKIE_SETTINGS} from "../const/constants";
import ApiError from "../exceptions/errors";
import {validationResult} from "express-validator";
import userService from "../services/UserService";
import {postgres} from "../index";
import ProfileService from "../services/ProfileService";


class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Validation error", errors.array()))
    }

    const {fingerprint} = req

    if (fingerprint) {
      try {
        const {username, password} = req.body

        const {
          user: userDto,
          accessToken,
          refreshToken,
          accessTokenExpiration
        } = await UserService.register(username, password, fingerprint)

        const {
          profile: profileDto
        } = await ProfileService.createProfile(userDto.userName)

        res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

        return res.status(200).json({
          user: userDto,
          accessToken,
          accessTokenExpiration,
          profile: profileDto
        })
      } catch (err) {
        next(err)
      }
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Validation error", errors.array()))
    }

    const {fingerprint} = req

    if (fingerprint) {
      try {
        const {username, password} = req.body

        const {
          user: userDto,
          accessToken,
          refreshToken,
          accessTokenExpiration
        } = await UserService.login(username, password, fingerprint)

        res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

        return res.status(200).json({user: userDto, accessToken, accessTokenExpiration})
      } catch (err) {
        next(err)
      }
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const currentRefreshToken = req.cookies.refreshToken

      const deletedToken = await userService.logout(currentRefreshToken)

      res.clearCookie("refreshToken")

      return res.status(200).json({deletedToken: deletedToken})
    } catch (err) {
      next(err)
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    const {fingerprint} = req

    if (fingerprint) {
      try {
        const currentRefreshToken = req.cookies.refreshToken

        const {
          user: userDto,
          accessToken,
          accessTokenExpiration,
          refreshToken
        } = await userService.refresh(currentRefreshToken, fingerprint)

        res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

        return res.status(200).json({
          user: userDto,
          accessToken,
          accessTokenExpiration
        })
      } catch (err) {
        next(err)
      }
    }
  }

  // TODO удалить как разберусь с jwt
  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await postgres.getAllUsers()
      return res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  }
}

export default UserController;
