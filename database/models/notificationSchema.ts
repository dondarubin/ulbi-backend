export interface NotificationSchema {
  notification_id: number;
  user_id: number;
  title: string;
  description: string;
  href?: string;
}