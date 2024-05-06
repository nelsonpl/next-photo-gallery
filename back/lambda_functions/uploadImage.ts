import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import parser from 'lambda-multipart-parser-v2';

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.BUCKET_NAME || '';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  try {
    const data = await extractFile(event);

    if (!data) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Arquivo não encontrado" })
      };
    }

    const filename = `${Date.now()}-${data.filename}`;

    await s3.putObject({
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: data.content,
      ContentType: data.contentType,
      ACL: 'public-read'
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ imageUrl: `https://${BUCKET_NAME}.s3.amazonaws.com/${filename}` }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erro ao salvar a img" })
    };
  }
};

async function extractFile(event: APIGatewayProxyEvent) {
  const parsed = await parser.parse(event);
  const file = parsed.files[0];
  return file;
}
