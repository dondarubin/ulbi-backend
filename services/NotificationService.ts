import ApiError from "../exceptions/errors";
import NotificationRepository from "../repositories/NotificationRepository";

class NotificationService {
  static async getNotifications(user_id: number) {
    const notifications = await NotificationRepository.getNotifications(user_id)

    // if (!notifications) {
    //   throw ApiError.BadRequest(`Get notifications error!`)
    // }

    return notifications
  }
}

export default NotificationService