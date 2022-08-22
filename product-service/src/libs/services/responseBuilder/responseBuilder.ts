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

const errorResponse = ( errorMessage: string, statusCode = 500 ): ResponseInterface => {
    return {
        statusCode,
        headers: {
            ...defaultHeaders,
        },
        body: JSON.stringify( { message: errorMessage }),
    };
};

const successResponse = ( body: string, statusCode = 200): ResponseInterface => {
    return {
        statusCode,
        headers: {
            ...defaultHeaders,
        },
        body,
    };
};

export { errorResponse, successResponse, ResponseInterface };