import { ProductNotificationService } from '.';
import { Notification } from './notificationService';

export default class MockProductNotificationService extends ProductNotificationService {
  static SUBJECT = 'mock-subject';
  static MESSAGE = 'mock-message';

  public sendNotification(): Promise<void> {
    return Promise.resolve();
  }

  public buildNotification(): Notification {
    return {
      subject: MockProductNotificationService.SUBJECT,
      message: MockProductNotificationService.MESSAGE,
    };
  }
}
