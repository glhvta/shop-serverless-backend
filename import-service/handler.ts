import { S3 } from '@aws-sdk/client-s3';
import { S3BucketRepository } from '@libs/repositories/fileRepository';
import FileImportService from '@libs/services/importService/fileImportService';
import * as handlers from './src/functions';

const { SERVICE_REGION, BUCKET_NAME } = process.env;

const s3Client = new S3({ region: SERVICE_REGION });

const s3BucketRepository = new S3BucketRepository(s3Client, BUCKET_NAME);
const importService = new FileImportService(s3BucketRepository);

const importProductsFile = handlers.importProductsFile(importService);
const importFileParser = handlers.importFileParser(importService);

export { importProductsFile, importFileParser };
