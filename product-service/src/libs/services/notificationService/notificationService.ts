export interface Notification {
  message?: string,
  subject?: string,
}

export default abstract class NotificationService<T> {
  public abstract sendNotification(notification: Notification): Promise<void>;
  public abstract buildNotification(data: T): Notification;
}
