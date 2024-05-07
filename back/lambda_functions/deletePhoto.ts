import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const TABLE_NAME = process.env.TABLE_NAME || '';
const BUCKET_NAME = process.env.BUCKET_NAME || '';

export const handler: APIGatewayProxyHandler = async (event, context): Promise<any> => {
    try {

        if (!event.pathParameters || !event.pathParameters.photoId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'PHOTO_ID_REQUIRED' }),
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

        if (!Item || !Item.filename) {
            throw new Error('Photo not found');
        }

        const s3Params: AWS.S3.DeleteObjectRequest = {
            Bucket: BUCKET_NAME,
            Key: Item.filename
        };

        await s3.deleteObject(s3Params).promise();

        const deleteParams: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
            TableName: TABLE_NAME,
            Key: {
                photoId
            }
        };

        await dynamoDB.delete(deleteParams).promise();


    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'INTERNAL_ERROR' }),
        };
    }
};
