import { S3 } from '@aws-sdk/client-s3';
import { SQSClient } from '@aws-sdk/client-sqs';

import { S3BucketRepository } from '@libs/repositories/fileRepository';
import { SqsQueueRepository } from '@libs/repositories/queueRepository';
import FileImportService from '@libs/services/importService/fileImportService';
import * as handlers from './src/functions';

const { SERVICE_REGION, BUCKET_NAME, SQS_URL } = process.env;

const s3Client = new S3({ region: SERVICE_REGION });
const sqsClient = new SQSClient({ region: SERVICE_REGION });

const queueRepository = new SqsQueueRepository(sqsClient, SQS_URL);

const s3BucketRepository = new S3BucketRepository(s3Client, BUCKET_NAME);
const importService = new FileImportService(s3BucketRepository, queueRepository);

const importProductsFile = handlers.importProductsFile(importService);
const importFileParser = handlers.importFileParser(importService);

export { importProductsFile, importFileParser };
