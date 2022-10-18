import { CopyObjectCommand, DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import csvParser from 'csv-parser';
import { Readable } from 'stream';

import FileRepository from './fileRepository';

class S3BucketRepository extends FileRepository{
  private static readonly UPLOADED_FOLDER = 'uploaded';
  private static readonly PARSED_FOLDER = 'parsed';

  constructor(private readonly s3Client: S3, private readonly bucketName: string) {
    super();
  }

  public getFileSignedUrl(fileName: string): Promise<string> {
    const params = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: `${S3BucketRepository.UPLOADED_FOLDER}/${fileName}`,
    });
  
    return getSignedUrl(this.s3Client, params);
  }

  public async getFile<T>(fileName: string): Promise<T[]> {
    const params = new GetObjectCommand({
      Bucket: this.bucketName,
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
    const params = {
      Bucket: this.bucketName,
      CopySource: `${this.bucketName}/${fileName}`,
      Key: fileName.replace(S3BucketRepository.UPLOADED_FOLDER, S3BucketRepository.PARSED_FOLDER),
    };

    const copyCommand = new CopyObjectCommand(params);

    await this.s3Client.send(copyCommand);
  }

  public async deleteFile(fileName: string): Promise<void> {
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
    };

    const command = new DeleteObjectCommand(params);

    await this.s3Client.send(command);
  }

  public async moveFile(fileName: string): Promise<void> {
    await this.copyFile(fileName);
    await this.deleteFile(fileName);
  }
}

export default S3BucketRepository;
