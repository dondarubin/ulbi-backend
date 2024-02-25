import {NextFunction, Request, Response} from "express";
import ApiError from "../exceptions/errors";
import tokenService from "../services/TokenService";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError())
    }

    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken){
      return next(ApiError.UnauthorizedError())
    }

    // TODO изменить название
    const data = await tokenService.validateAccessToken(accessToken)
    console.log(data)
    if (!data){
      return next(ApiError.UnauthorizedError())
    }

    // @ts-ignore
    req.user = data
    next()
  } catch (err) {
    return next(ApiError.UnauthorizedError())
  }
}