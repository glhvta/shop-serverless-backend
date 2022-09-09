import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import createProductByIdHandler from '@functions/getProductById';
import { JewelleryProductService } from '@libs/services/jewelleryProductService';
import { ProductService } from '@libs/services/productsService';
import { badRequestErrorResponse, notFoundErrorResponse, serverErrorResponse, successResponse } from '@libs/services/responseBuilder';
import MockDatabaseClient from '@libs/services/database/mockDatabaseClient';

describe('getProductsList spec', () => {
  let productService: ProductService;
  let mockEvent: APIGatewayProxyEvent;
    
  let getProductById: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;

  const mockProduct = {
    description: 'Short Product Description',
    id: '7567ec4b-b10c-48c5-9445-fc73c48a80a2',
    price: 23,
    title: 'Product2',
    image: 'url',
    count: 1,
  };

  beforeEach(() => {
    productService = new JewelleryProductService(new MockDatabaseClient());

    getProductById = createProductByIdHandler(productService);

    const dummyMockEvent: Partial<APIGatewayProxyEvent> = {
      path: '/products/{productId}',
      pathParameters: {},

    };

    mockEvent = dummyMockEvent as APIGatewayProxyEvent;
  });

  afterEach(() => jest.clearAllMocks());


  it('should return bad request error if productId is not provided', async () => {
    const actual = await getProductById(mockEvent);

    expect(actual).toEqual(badRequestErrorResponse('Product id is not provided'));
  });

  it('should return not found request error if product was not found by provided id', async () => {
    jest
      .spyOn(productService, 'getProductById')
      .mockImplementation(() => undefined);

    mockEvent.pathParameters = { productId: 'random' };
        
    const actual = await getProductById(mockEvent);

    expect(actual).toEqual(notFoundErrorResponse('Product with id random was not found'));
  });

  it('should return server error if product service fails to get product by id', async () => {
    jest
      .spyOn(productService, 'getProductById')
      .mockImplementation(async () => Promise.reject('Error'));

    mockEvent.pathParameters = { productId: 'value' };

    const actual = await getProductById(mockEvent);

    expect(actual).toEqual(serverErrorResponse('Server error in fetching product by id'));
  });

  it('should return success response when products service return data', async () => {
    jest
      .spyOn(productService, 'getProductById')
      .mockImplementation(async () => Promise.resolve(mockProduct));

    mockEvent.pathParameters = { productId: mockProduct.id };

    const actual = await getProductById(mockEvent);

    expect(actual).toEqual(successResponse(mockProduct));
  });
});
