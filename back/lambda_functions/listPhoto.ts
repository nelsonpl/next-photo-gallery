import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';

export const handler: APIGatewayProxyHandler = async (event, context) => {
    try {
        const pageSize = 20;
        const queryParams = event.queryStringParameters || {};
        let exclusiveStartKey = queryParams.lastEvaluatedKey ? JSON.parse(queryParams.lastEvaluatedKey) : null;

        const params: AWS.DynamoDB.DocumentClient.ScanInput = {
            TableName: TABLE_NAME,
            Limit: pageSize,
            ExclusiveStartKey: exclusiveStartKey
        };

        const data = await dynamoDB.scan(params).promise();

        let lastEvaluatedKey = null;
        if (data.LastEvaluatedKey) {
            lastEvaluatedKey = encodeURIComponent(JSON.stringify(data.LastEvaluatedKey));
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                photos: data.Items || [],
                lastEvaluatedKey
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
