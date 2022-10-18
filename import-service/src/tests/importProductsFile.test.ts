import { ImportService, MockImportService } from '@libs/services/importService';
import { badRequestErrorResponse, serverErrorResponse, successResponse } from '@libs/services/responseBuilder';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import createImportProductsFile from '../functions/importProductsFile';

describe('importProductsFile spec', () => {
  let importService: ImportService;
  let mockEvent: APIGatewayProxyEvent;

  let importProductsFile: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;

  beforeEach(() => {
    importService = new MockImportService();

    importProductsFile = createImportProductsFile(importService);

    const dummyMockEvent: Partial<APIGatewayProxyEvent> = {
      path: '/import',
      queryStringParameters: {
        name: 'file-name',
      },
    };

    mockEvent = dummyMockEvent as APIGatewayProxyEvent;
  });

  afterEach(() => jest.clearAllMocks());


  it('should return bad request error if file name was  not provided', async () => {
    mockEvent.queryStringParameters = {};

    const actual = await importProductsFile(mockEvent);

    expect(actual).toEqual(badRequestErrorResponse('File name was not provided'));
  });

  it('should return server error when import service request failed', async () => {
    jest
      .spyOn(importService, 'getSignedUrl')
      .mockImplementation(async () => Promise.reject('Error'));

    const actual = await importProductsFile(mockEvent);

    expect(actual).toEqual(serverErrorResponse('Server error occurred while creating singed url'));
  });

  it('should return signed url', async () => {
    const actual = await importProductsFile(mockEvent);

    expect(actual).toEqual(successResponse({ url: MockImportService.signedUrl }));
  });
});
