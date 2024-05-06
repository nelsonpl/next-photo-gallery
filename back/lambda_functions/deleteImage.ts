import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.BUCKET_NAME || '';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Corpo da requisição está vazio' }),
      };
    }

    const body = JSON.parse(event.body);
    const base64Image = body.imageData;

    const imageBuffer = Buffer.from(base64Image, 'base64');

    const imageName = `${Date.now()}.png`;

    const params: AWS.S3.Types.PutObjectRequest = {
      Bucket: BUCKET_NAME,
      Key: imageName,
      Body: imageBuffer,
      ContentType: 'image/png',
    };

    const uploadResult = await s3.upload(params).promise();

    const imageUrl = uploadResult.Location;

    return {
      statusCode: 200,
      body: JSON.stringify({ imageUrl }),
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao fazer upload da imagem' }),
    };
  }
};
