import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import NotificationRepository from './notificationRepository';

export default class SnsNotificationRepository extends NotificationRepository {
  constructor(private readonly snsClient: SNSClient, private readonly snsArn: string) {
    super();
  }

  async send(message: string | undefined, subject: string | undefined): Promise<void> {
    const params = new PublishCommand({
      Subject: subject,
      Message: message,
      TopicArn: this.snsArn,
    });

    await this.snsClient.send(params);
  }
}
