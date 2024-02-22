import {NextFunction, Request, Response} from "express";
import ApiError from "../exceptions/errors";
import tokenService from "../services/TokenService";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError())
    }

    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken){
      return next(ApiError.UnauthorizedError())
    }

    // TODO
    const data = tokenService.validateAccessToken(accessToken)

    if (!data){
      return next(ApiError.UnauthorizedError())
    }

    res.status(200).json(111)
    next()
  } catch (err) {
    return next(ApiError.UnauthorizedError())
  }
}