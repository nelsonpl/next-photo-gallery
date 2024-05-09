import { getCorsHeaders, handleError, validateRequestBody }  from '../src/utils/controllerUtils';

describe('getCorsHeaders', () => {
  it('should return CORS headers with wildcard origin', () => {
    const headers = getCorsHeaders();
    expect(headers).toEqual({
      'Access-Control-Allow-Origin': '*'
    });
  });
});

describe('handleError', () => {
  it('should return response object with status code 500 and error message', () => {
    const error = new Error('Test error');
    const response = handleError(error);
    expect(response).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: 'INTERNAL_SERVER_ERROR' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  });
});

describe('validateRequestBody', () => {
  it('should return true if all required fields are present in the request body', () => {
    const requestBody = {
      name: 'John',
      age: 30,
      email: 'john@example.com'
    };
    const requiredFields = ['name', 'age', 'email'];
    const isValid = validateRequestBody(requestBody, requiredFields);
    expect(isValid).toBe(true);
  });

  it('should return false if any required field is missing in the request body', () => {
    const requestBody = {
      name: 'John',
      age: 30
    };
    const requiredFields = ['name', 'age', 'email'];
    const isValid = validateRequestBody(requestBody, requiredFields);
    expect(isValid).toBe(false);
  });
});
