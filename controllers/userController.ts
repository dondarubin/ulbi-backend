import {NextFunction, Request, Response} from "express";
import UserService from "../services/UserService";
import {COOKIE_SETTINGS} from "../const/constants";
import ApiError from "../exceptions/errors";
import {validationResult} from "express-validator";
import userService from "../services/UserService";


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
          accessToken,
          refreshToken,
          accessTokenExpiration
        } = await UserService.register(username, password, fingerprint)

        res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

        return res.status(200).json({accessToken, accessTokenExpiration})
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
          accessToken,
          refreshToken,
          accessTokenExpiration
        } = await UserService.login(username, password, fingerprint)

        res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

        return res.status(200).json({accessToken, accessTokenExpiration})
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

      return res.status(200).json(deletedToken)
    } catch (err) {
      next(err)
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    const {fingerprint} = req

    if (fingerprint) {
      try {
        const currentRefreshToken = req.cookies.refreshToken

        // TODO
        const data = await userService.refresh(currentRefreshToken, fingerprint)
        //
        // res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)
        //
        // return res.status(200).json({accessToken, accessTokenExpiration})
      } catch (err) {
        next(err)
      }
    }
  }
}

export default UserController;
