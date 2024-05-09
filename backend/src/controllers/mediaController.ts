import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import MediaRepository from '../repositories/mediaRepository';
import { handleError, getCorsHeaders } from '../utils/controllerUtils';
import parser from 'lambda-multipart-parser-v2';

const bucketName = process.env.BUCKET_NAME || '';
const mediaRepository = new MediaRepository(bucketName);

export const upload: APIGatewayProxyHandler = async (event, _context) => {
    try {
        if (!event.body || !event.isBase64Encoded) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'INVALID_REQUEST_BODY' }),
            };
        }

        const data = await extractFile(event);

        const filename = `image_${Date.now()}.jpg`;

        await mediaRepository.upload(filename, data.content, data.contentType);

        return {
            statusCode: 200,
            body: JSON.stringify({ filename }),
            headers: {
                'Content-Type': 'application/json',
                ...getCorsHeaders(),
            }
        };
    } catch (error) {
        return handleError(error as Error);
    }
};

export const view: APIGatewayProxyHandler = async (event, _context) => {
    try {
        const filename = event.pathParameters?.filename;

        if (!filename) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'INVALID_REQUEST_BODY' }),
            };
        }

        const signedUrl = await mediaRepository.getSignedUrl(filename);

        return {
            statusCode: 200,
            body: JSON.stringify({ url: signedUrl }),
            headers: {
                'Content-Type': 'application/json',
                ...getCorsHeaders(),
            }
        };
    } catch (error) {
        return handleError(error as Error);
    }
};

async function extractFile(event: APIGatewayProxyEvent) {
    const parsed = await parser.parse(event);
    const file = parsed.files[0];
    return file;
}
