import NotificationRepository from './notificationRepository';

export default class MockNotificationRepository extends NotificationRepository {
  async send(): Promise<void> {
    return Promise.resolve();
  }
}
