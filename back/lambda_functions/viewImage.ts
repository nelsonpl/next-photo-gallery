import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

const s3 = new AWS.S3();

export const handler: APIGatewayProxyHandler = async (event, context) => {
  try {
    const imageName = event.queryStringParameters?.imageName;
    if (!imageName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Parâmetro "imageName" ausente na consulta da URL' }),
      };
    }

    const bucketName = 'nelson-images-2-bucket';

    const params: AWS.S3.GetObjectRequest = {
      Bucket: bucketName,
      Key: imageName,
    };

    const signedUrl = await s3.getSignedUrlPromise('getObject', params);

    return {
      statusCode: 200,
      body: JSON.stringify({ imageUrl: signedUrl }),
    };
  } catch (error) {
    console.error('Erro ao visualizar a imagem:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao visualizar a imagem' }),
    };
  }
};
