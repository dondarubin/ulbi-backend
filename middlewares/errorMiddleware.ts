// import {ApiError} from "../exceptions/errors";
// import {NextFunction} from "express";
//
// export function errorMiddleware(err: [], req: Request, res: Response, next: NextFunction) {
//   console.log(err);
//   if (err instanceof ApiError) {
//     return res.status(err.status).json({message: err.message, errors: err.errors})
//   }
//   return res.status(500).json({message: 'Непредвиденная ошибка'})
// }