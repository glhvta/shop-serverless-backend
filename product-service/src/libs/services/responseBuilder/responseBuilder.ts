import { StatusCode } from '@libs/constants/statusCode';

interface ResponseInterface {
  statusCode: number
  headers: Record<string, string>,
  body: string
}

export const defaultHeaders = {
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Origin': '*',
};

const createResponse = (statusCode: StatusCode, dataProcessor?: (data: unknown) => unknown) => (data: unknown): ResponseInterface => ({
  statusCode,
  headers: {
    ...defaultHeaders,
  },
  body: JSON.stringify(dataProcessor ? dataProcessor(data) : data),
});

const createErrorResponse = (statusCode: StatusCode) => createResponse(
  statusCode, 
  (message: string) => ({ message })
);

export const badRequestErrorResponse = createErrorResponse(StatusCode.BadRequest);
export const notFoundErrorResponse = createErrorResponse(StatusCode.NotFound);
export const serverErrorResponse = createErrorResponse(StatusCode.ServerError);
export const successResponse = createResponse(StatusCode.SuccessResponse);
