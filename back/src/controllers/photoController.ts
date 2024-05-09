import { APIGatewayProxyHandler } from 'aws-lambda';
import PhotoRepository from '../repositories/photoRepository';
import PhotoService from '../services/photoService';
import { handleError, validateRequestBody, getCorsHeaders }  from '../utils/controllerUtils';

const photoRepository = new PhotoRepository();
const photoService = new PhotoService(photoRepository);

export const save: APIGatewayProxyHandler = async (event, _context) => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'PAYLOAD_ERROR' }),
            };
        }

        const requestBody = JSON.parse(event.body);

        const requiredFields = ['title', 'description', 'filename'];
        if (!validateRequestBody(requestBody, requiredFields)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'INVALID_REQUEST_BODY' }),
            };
        }

        const newItem = await photoService.save(requestBody.title, requestBody.description, requestBody.filename);

        return {
            statusCode: 200,
            body: JSON.stringify(newItem),
            headers: {
                'Content-Type': 'application/json',
                ...getCorsHeaders(),
            }
        };
    } catch (error) {
        return handleError(error as Error);
    }
};

export const list: APIGatewayProxyHandler = async (event, _context) => {
    try {
        const pageSize = 20;
        const queryParams = event.queryStringParameters || {};
        let exclusiveStartKey = queryParams.lastEvaluatedKey ? JSON.parse(queryParams.lastEvaluatedKey) : null;

        const result = await photoService.list(pageSize, exclusiveStartKey);

        return {
            statusCode: 200,
            body: JSON.stringify(result),
            headers: {
                'Content-Type': 'application/json',
                ...getCorsHeaders(),
            }
        };
    } catch (error) {
        return handleError(error as Error);
    }
};

export const del: APIGatewayProxyHandler = async (event, _context) => {
    try {
        const photoId = event.pathParameters?.photoId;

        if (!photoId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'PAYLOAD_ERROR' }),
            };
        }

        await photoService.delete(photoId);

        return {
            statusCode: 204,
            body: JSON.stringify({ message: 'OK' }),
            headers: {
                ...getCorsHeaders(),
            }
        };
    } catch (error) {
        return handleError(error as Error);
    }
};

