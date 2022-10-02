import { GetObjectCommand, PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import csvParser from 'csv-parser';
import { Readable } from 'stream';

import FileRepository from './fileRepository';

class S3BucketRepository extends FileRepository{
  private static readonly UPLOADED_FOLDER = 'uploaded';
  private static readonly BUCKET_NAME = 'import-service-bucket-tatsiana-helakhava';

  constructor(private readonly s3Client: S3) {
    super();
  }

  public getFileSignedUrl(fileName: string): Promise<string> {
    const params = new PutObjectCommand({
      Bucket: S3BucketRepository.BUCKET_NAME,
      Key: `${S3BucketRepository.UPLOADED_FOLDER}/${fileName}`,
    });
  
    return getSignedUrl(this.s3Client, params);
  }

  public async getFile<T>(fileName: string): Promise<T[]> {
    const params = new GetObjectCommand({
      Bucket: S3BucketRepository.BUCKET_NAME,
      Key: fileName,
    });

    const getObjectOutput = await this.s3Client.send(params);

    const readableStream = getObjectOutput.Body as Readable;

    const fileData = [];

    return new Promise<T[]>((resolve, reject) => {
      readableStream
        .pipe(csvParser())
        .on('error', reject)
        .on('data', (item) => fileData.push(item))
        .on('end', () => resolve(fileData));
    });
  }
}

export default S3BucketRepository;
