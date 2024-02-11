import {NextFunction, Request, Response} from "express";

interface IUserController {
  register(req: Request, res: Response, next: NextFunction): Promise<void>
  login(req: Request, res: Response, next: NextFunction): Promise<void>
  logout(req: Request, res: Response, next: NextFunction): Promise<void>
  refresh(req: Request, res: Response, next: NextFunction): Promise<void>
}

class UserController implements IUserController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (e) {

    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (e) {

    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (e) {

    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(["123", "456"])
    } catch (e) {

    }
  }
}

export const userController = new UserController();
