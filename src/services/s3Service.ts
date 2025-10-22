import AWS from 'aws-sdk';
import { env } from '../config/env';

AWS.config.update({
  accessKeyId: env.aws.accessKeyId,
  secretAccessKey: env.aws.secretAccessKey,
  region: env.aws.region,
});

const s3 = new AWS.S3();

export class S3Service {
  async uploadFile(file: Buffer, key: string, contentType: string): Promise<string> {
    const params = {
      Bucket: env.aws.s3Bucket,
      Key: key,
      Body: file,
      ContentType: contentType,
    };

    const result = await s3.upload(params).promise();
    return result.Location;
  }

  async deleteFile(key: string): Promise<void> {
    const params = {
      Bucket: env.aws.s3Bucket,
      Key: key,
    };

    await s3.deleteObject(params).promise();
  }

  async getSignedUrl(key: string, expires: number = 3600): Promise<string> {
    const params = {
      Bucket: env.aws.s3Bucket,
      Key: key,
      Expires: expires,
    };

    return s3.getSignedUrlPromise('getObject', params);
  }
}
