import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

const s3 = new AWS.S3();

export const handler: APIGatewayProxyHandler = async (event, context) => {
  console.log('event', event);
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Corpo da requisição está vazio' }),
      };
    }

    const body = JSON.parse(event.body);
    const imageData = body.imageData;

    const imageBuffer = Buffer.from(imageData, 'base64');

    const imageName = `${Date.now()}.png`;
    const bucketName = process.env.BUCKET_NAME;

    if (!bucketName) {
      throw new Error('Variável de ambiente BUCKET_NAME não definida');
    }

    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucketName,
      Key: imageName,
      Body: imageBuffer,
      ContentType: 'image/png',
    };

    const uploadResult = await s3.upload(params).promise();

    const imageUrl = uploadResult.Location;

    console.log('return', {
      statusCode: 200,
      body: JSON.stringify({ imageUrl }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ imageUrl }),
    };
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao fazer upload da imagem' }),
    };
  }
};
