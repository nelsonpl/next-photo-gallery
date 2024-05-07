import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.BUCKET_NAME || '';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  try {
    const imageName = event.queryStringParameters?.imageName;
    if (!imageName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'PAYLOAD_ERROR' }),
      };
    }

    const params: AWS.S3.GetObjectRequest = {
      Bucket: BUCKET_NAME,
      Key: imageName,
    };

    const signedUrl = await s3.getSignedUrlPromise('getObject', params);

    return {
      statusCode: 200,
      body: JSON.stringify({ imageUrl: signedUrl }),
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'INTERNAL_ERROR' }),
    };
  }
};
