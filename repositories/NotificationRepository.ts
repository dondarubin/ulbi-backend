import {postgres} from "../index";
import {NotificationSchema} from "../database/models/notificationSchema";

class NotificationRepository {
  static async getNotifications(user_id: number) {
    const response = await postgres.getNotifications(user_id)

    const summary: NotificationSchema[] = []

    response.map((not) => {
      summary.push(not as NotificationSchema)
    })

    return summary
  }
}

export default NotificationRepository;