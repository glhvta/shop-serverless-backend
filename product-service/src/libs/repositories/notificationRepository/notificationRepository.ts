export default abstract class NotificationRepository {
  public abstract send(message: string | undefined, subject: string | undefined): Promise<void>;
}
