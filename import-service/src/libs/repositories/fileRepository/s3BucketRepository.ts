import { CopyObjectCommand, DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import csvParser from 'csv-parser';
import { Readable } from 'stream';

import FileRepository from './fileRepository';

class S3BucketRepository extends FileRepository{
  private static readonly UPLOADED_FOLDER = 'uploaded';
  private static readonly PARSED_FOLDER = 'parsed';
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

    const readableStream = getObjectOutput.Body as Readable | null;

    if (!readableStream) {
      return Promise.reject(`No file was found with name - ${fileName}`);
    }

    const fileData = [];

    return new Promise<T[]>((resolve, reject) => {
      readableStream
        .pipe(csvParser())
        .on('error', reject)
        .on('data', (item) => fileData.push(item))
        .on('end', () => resolve(fileData));
    });
  }

  public async copyFile(fileName: string): Promise<void> {
    console.log('Starting copying file');

    const params = {
      Bucket: S3BucketRepository.BUCKET_NAME,
      CopySource: `${S3BucketRepository.BUCKET_NAME}/${fileName}`,
      Key: fileName.replace(S3BucketRepository.UPLOADED_FOLDER, S3BucketRepository.PARSED_FOLDER),
    };

    const copyCommand = new CopyObjectCommand(params);

    await this.s3Client.send(copyCommand);

    console.log('FILE COPIED : ', params.CopySource, params.Key);
  }

  public async deleteFile(fileName: string): Promise<void> {
    console.log('Starting deleting file.');

    const params = {
      Bucket: S3BucketRepository.BUCKET_NAME,
      Key: fileName,
    };

    const command = new DeleteObjectCommand(params);

    await this.s3Client.send(command);

    console.log('FILE deleted : ', params.Bucket, params.Key);
  }

  public async moveFile(fileName: string): Promise<void> {
    await this.copyFile(fileName);
    await this.deleteFile(fileName);
  }
}

export default S3BucketRepository;
