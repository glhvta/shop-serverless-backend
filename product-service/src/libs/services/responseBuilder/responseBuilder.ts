import { StatusCode } from '@libs/constants/statusCode';

interface ResponseInterface {
    statusCode: number
    headers: Record<string, string>,
    body: string
}

const defaultHeaders = {
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
};

const errorResponse = ( errorMessage: string, statusCode = StatusCode.ServerError ): ResponseInterface => {
    return {
        statusCode,
        headers: {
            ...defaultHeaders,
        },
        body: JSON.stringify( { message: errorMessage }),
    };
};

const successResponse = ( body: string, statusCode = StatusCode.SuccessResponse): ResponseInterface => {
    return {
        statusCode,
        headers: {
            ...defaultHeaders,
        },
        body,
    };
};

export { errorResponse, successResponse, ResponseInterface };