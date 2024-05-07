import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { getSignedUrl } from '../utils/getSignedUrl';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';

export const handler: APIGatewayProxyHandler = async (event, context) => {
    try {

        const params: AWS.DynamoDB.DocumentClient.ScanInput = {
            TableName: TABLE_NAME,
        };

        const data = await dynamoDB.scan(params).promise();

        let nextStartKey;
        if (data.LastEvaluatedKey) {
            nextStartKey = encodeURIComponent(JSON.stringify(data.LastEvaluatedKey));
        }

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

        console.log('data.Items', data.Items)

        const photos = await Promise.all(data.Items.map(async (item) => {
            const imageUrl = await getSignedUrl({ key: item.filename, bucket: process.env.BUCKET_NAME || '' });
            return {
                ...item,
                imageUrl
            };
        }));

        console.log('photos', photos)

        return {
            statusCode: 200,
            body: JSON.stringify({
                photos,
                nextStartKey
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
