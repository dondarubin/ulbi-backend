import {NextFunction, Request, Response} from "express";
import NotificationService from "../services/NotificationService";

class NotificationController {
  static async getNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = Number(req.params.userId);

      const userNotifications = await NotificationService.getNotifications(user_id)

      return res.status(200).json(userNotifications)
    } catch (err) {
      next(err)
    }
  }
}

export default NotificationController;
