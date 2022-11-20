import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import QueueRepository from './queueRepository';

export default class SqsQueueRepository extends QueueRepository {
  constructor(private readonly sqsClient: SQSClient, private readonly sqsUrl: string) {
    super();
  }

  async send<T>(message: T): Promise<void> {
    const params = new SendMessageCommand({
      QueueUrl: this.sqsUrl,
      MessageBody: JSON.stringify(message),
    });

    await this.sqsClient.send(params);
  }
}
