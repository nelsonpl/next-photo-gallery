import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import * as parseMultipart from 'parse-multipart';

const BUCKET = process.env.BUCKET_NAME;

const s3 = new AWS.S3();

export const handler: APIGatewayProxyHandler = async (event, context) => {
  try {
    const { filename, data } = extractFile(event);

    await s3.putObject({ Bucket: BUCKET!, Key: filename, ACL: 'public-read', Body: data }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ link: `https://${BUCKET}.s3.amazonaws.com/${filename}` })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erro ao salvar a img" })
    };
  }
};

function extractFile(event: any) {
  const boundary = parseMultipart.getBoundary(event.headers['content-type']);
  const parts = parseMultipart.Parse(Buffer.from(event.body, 'base64'), boundary);
  const [{ filename, data }] = parts;

  return { filename, data };
}
