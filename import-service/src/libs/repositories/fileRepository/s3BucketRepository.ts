import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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
}

export default S3BucketRepository;
