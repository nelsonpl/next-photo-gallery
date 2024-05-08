import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';

export const handler: APIGatewayProxyHandler = async (event, context): Promise<any> => {
    try {

        if (!event.pathParameters || !event.pathParameters.photoId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'PHOTO_ID_REQUIRED' }),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            };
        }

        const photoId = event.pathParameters.photoId

        const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
            TableName: TABLE_NAME,
            Key: {
                photoId
            }
        };

        const { Item } = await dynamoDB.get(params).promise();

        if (!Item) {
            throw new Error('Photo not found');
        }

        const deleteParams: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
            TableName: TABLE_NAME,
            Key: {
                photoId
            }
        };

        await dynamoDB.delete(deleteParams).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'OK' }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };

    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'INTERNAL_ERROR' }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
    }
};
