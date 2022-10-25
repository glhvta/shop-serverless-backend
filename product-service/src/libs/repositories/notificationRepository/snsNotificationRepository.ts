import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import NotificationRepository, { Attribute } from './notificationRepository';

export default class SnsNotificationRepository extends NotificationRepository {
  constructor(private readonly snsClient: SNSClient, private readonly snsArn: string) {
    super();
  }

  async send(message: string | undefined, subject: string | undefined, attributes?: Record<string, Attribute>): Promise<void> {
    const params = new PublishCommand({
      Subject: subject,
      Message: message,
      TopicArn: this.snsArn,
      MessageAttributes: attributes,
    });

    await this.snsClient.send(params);
  }
}
