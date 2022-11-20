import { Attribute } from '@libs/repositories/notificationRepository';

export interface Notification {
  message?: string,
  subject?: string,
  attributes?: Record<string, Attribute>
}

export default abstract class NotificationService<T> {
  public abstract sendNotification(notification: Notification): Promise<void>;
  public abstract buildNotification(data: T): Notification;
}
