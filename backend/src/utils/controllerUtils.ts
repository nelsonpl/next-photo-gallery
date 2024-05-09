export const getCorsHeaders = () => ({
    'Access-Control-Allow-Origin': '*'
});

export const handleError = (error: Error) => {
    console.error(error);

    return {
        statusCode: 500,
        body: JSON.stringify({ message: 'INTERNAL_SERVER_ERROR' }),
        headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(),
        }
    };
}

export const validateRequestBody = (requestBody: any, requiredFields: string[]) => {
    return requiredFields.every(field => requestBody[field]);
}