import { StatusCode } from '@libs/constants/statusCode';
import { badRequestErrorResponse, defaultHeaders, notFoundErrorResponse, serverErrorResponse, successResponse } from './responseBuilder';

describe('Response builder', () => {
  it('#badRequestErrorResponse', () => {
    expect(badRequestErrorResponse('Server does not process the request due client error')).toEqual({
      statusCode: StatusCode.BadRequest,
      headers: defaultHeaders, 
      body: '{"message":"Server does not process the request due client error"}',
    });
  });

  it('#notFoundErrorResponse', () => {
    expect(notFoundErrorResponse('The server can not find the requested resource')).toEqual({
      statusCode: StatusCode.NotFound,
      headers: defaultHeaders, 
      body: '{"message":"The server can not find the requested resource"}',
    });
  });

  it('#serverErrorResponse', () => {
    expect(serverErrorResponse('Server error')).toEqual({
      statusCode: StatusCode.ServerError,
      headers: defaultHeaders, 
      body: '{"message":"Server error"}',
    });
  });

  it('#successResponse', () => {
    expect(successResponse({ data: 'Success Response' })).toEqual({
      statusCode: StatusCode.SuccessResponse,
      headers: defaultHeaders, 
      body: '{"data":"Success Response"}',
    });
  });
});