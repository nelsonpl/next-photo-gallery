import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.BUCKET_NAME || '';

export const getSignedUrl = async (imageName: string) => {
  const params: AWS.S3.GetObjectRequest = {
    Bucket: BUCKET_NAME,
    Key: imageName,
  };

  const signedUrl = await s3.getSignedUrlPromise('getObject', params);

  return signedUrl;
};
