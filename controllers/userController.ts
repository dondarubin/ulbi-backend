import {NextFunction, Request, Response} from "express";
import UserService from "../services/userService";
import {COOKIE_SETTINGS} from "../const/constants";


class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    const {username, password} = req.body
    const {fingerprint} = req

    if (fingerprint) {
      try {

        const {
          accessToken,
          refreshToken,
          accessTokenExpiration
        } = await UserService.register(username, password, fingerprint)

        res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

        return res.status(200).json({accessToken, accessTokenExpiration})
      } catch (err) {
        console.log(err)
        throw new Error("Что то не так в контройлере")
      }
    }

  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (e) {

    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (e) {

    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
    res.json(["123", 567])
    } catch (e) {

    }
  }
}

export default UserController;
