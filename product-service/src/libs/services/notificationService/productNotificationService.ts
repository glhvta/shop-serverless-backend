import NotificationRepository, { AttributeType } from '@libs/repositories/notificationRepository/notificationRepository';
import { Product } from 'src/types/api-types';
import NotificationService, { Notification } from './notificationService';

export default class ProductNotificationService extends NotificationService<Product> {
  constructor(private readonly notificationRepository: NotificationRepository) {
    super();
  }

  async sendNotification(notification: Notification): Promise<void> {
    await this.notificationRepository.send(notification.message, notification.subject, notification.attributes);
  }

  public buildNotification(data: Product): Notification {
    return {
      subject: 'Hooray! New product was created',
      message: `
        Take a first look at the new product:
        
        Title: ${data.title}
        Description: ${data.description}
        Price: ${data.price}$
      `,
      attributes: {
        price: {
          DataType: AttributeType.Number,
          StringValue: String(data.price),
        },
      },
    };
  }
}
