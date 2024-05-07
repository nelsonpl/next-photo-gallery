import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';
const BUCKET_NAME = process.env.BUCKET_NAME || '';

export const handler: APIGatewayProxyHandler = async (event, context) => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'PAYLOAD_ERROR' }),
            };
        }

        const decodedBody = Buffer.from(event.body, 'base64').toString();

        const requestBody = JSON.parse(decodedBody);

        const { title, description, uploadAt, imageFileName } = requestBody;

        if (!title || !description || !uploadAt) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'PAYLOAD_ERROR' }),
            };
        }


        const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
            TableName: TABLE_NAME,
            Item: {
                photoId: context.awsRequestId,
                title,
                description,
                imageUrl: `https://${BUCKET_NAME}.s3.amazonaws.com/${imageFileName}`,
                uploadAt
            },
        };

        await dynamoDB.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'OK' }),
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
