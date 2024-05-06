import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event, context) => {
    try {
        const limit = parseInt(event.queryStringParameters?.limit || '20', 10);

        const params: AWS.DynamoDB.DocumentClient.ScanInput = {
            TableName: 'nelson-photo-gallery-table',
            Limit: limit,
        };

        const data = await dynamoDB.scan(params).promise();

        let nextStartKey;
        if (data.LastEvaluatedKey) {
            nextStartKey = encodeURIComponent(JSON.stringify(data.LastEvaluatedKey));
        }

        const paramsCount: AWS.DynamoDB.DocumentClient.ScanInput = {
            TableName: 'nelson-photo-gallery-table',
            Select: 'COUNT'
        };

        const dataCount = await dynamoDB.scan(paramsCount).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                photos: data.Items,
                count: dataCount.Count,
                nextStartKey
            })
        };
    } catch (error) {
        console.error('Erro ao listar as fotos:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Erro ao listar as fotos' })
        };
    }
};
