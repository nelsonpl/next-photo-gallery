import { S3 } from 'aws-sdk';
import IMediaRepository from '../interfaces/mediaRepository';

class MediaRepository implements IMediaRepository {
  private readonly s3: S3;
  private readonly bucketName: string;

  constructor(bucketName: string) {
    this.s3 = new S3();
    this.bucketName = bucketName;
  }

  async upload(filename: string, data: Buffer, contentType: string): Promise<void> {
    await this.s3
      .upload({
        Bucket: this.bucketName,
        Key: filename,
        Body: data,
        ContentType: contentType,
      })
      .promise();
  }

  async getSignedUrl(filename: string): Promise<string> {
    const params: S3.GetObjectRequest = {
      Bucket: this.bucketName,
      Key: filename,
    };

    return await this.s3.getSignedUrlPromise('getObject', params);
  }
}

export default MediaRepository;
