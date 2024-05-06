import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event, context) => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Corpo da requisição não fornecido' }),
            };
        }

        const { title, description, uploadAt, imageFileName } = JSON.parse(event.body);

        if (!title || !description || !uploadAt) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Campos obrigatórios não fornecidos' }),
            };
        }

        const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
            TableName: 'nelson-photo-gallery-table',
            Item: {
                photoId: context.awsRequestId,
                title,
                description,
                imageFileName,
                uploadAt
            },
        };

        await dynamoDB.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Metadados da foto salvos com sucesso' }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
    } catch (error) {
        console.error('Erro ao salvar os metadados da foto:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Erro ao salvar os metadados da foto' }),
        };
    }
};
