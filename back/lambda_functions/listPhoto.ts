import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';

export const handler: APIGatewayProxyHandler = async (event, context) => {
    try {

        const params: AWS.DynamoDB.DocumentClient.ScanInput = {
            TableName: TABLE_NAME,
        };

        const data = await dynamoDB.scan(params).promise();

        if (!data.Items) {
            return {
                statusCode: 200,
                body: JSON.stringify({ photos: [] }),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                photos: data.Items,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'INTERNAL_ERROR' })
        };
    }
};
