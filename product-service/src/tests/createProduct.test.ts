import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import getCreateProductHandler from '@functions/createProduct';
import { JewelleryProductService } from '@libs/services/jewelleryProductService';
import { ProductService } from '@libs/services/productsService';
import { badRequestErrorResponse, serverErrorResponse, successResponse } from '@libs/services/responseBuilder';
import MockDatabaseClient from '@libs/services/database/mockDatabaseClient';

describe('getProductsList spec', () => {
  let productService: ProductService;
  let mockEvent: APIGatewayProxyEvent;
    
  let createProduct: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;

  beforeEach(() => {
    productService = new JewelleryProductService(new MockDatabaseClient());

    createProduct = getCreateProductHandler(productService);

    const dummyMockEvent: Partial<APIGatewayProxyEvent> = {
      path: '/products',
      pathParameters: {},
      body: JSON.stringify({}),
      httpMethod: 'POST ',
    };

    mockEvent = dummyMockEvent as APIGatewayProxyEvent;
  });

  afterEach(() => jest.clearAllMocks());


  it('should return bad request error if product is not provided', async () => {
    const actual = await createProduct(mockEvent);

    expect(actual).toEqual(badRequestErrorResponse('Invalid product data'));
  });

  it('should return bad request error if product does not contain all fields', async () => {
    mockEvent.body = JSON.stringify({
      title: 'Product2',
      image: 'url',
    });

    const actual = await createProduct(mockEvent);

    expect(actual).toEqual(badRequestErrorResponse('Invalid product data'));
  });

  it('should return bad request error if product schema is not correct', async () => {
    mockEvent.body = JSON.stringify({
      description: 'Short Product Description',
      id: '7567ec4b-b10c-48c5-9445-fc73c48a80a2',
      price: '23', // should be number
      title: 'Product2',
      image: 'url',
      count: 1,
    });

    const actual = await createProduct(mockEvent);

    expect(actual).toEqual(badRequestErrorResponse('Invalid product data'));
  });

  it('should return server error if product service fails to createProduct', async () => {
    jest
      .spyOn(productService, 'createProduct')
      .mockImplementation(async () => Promise.reject('Error'));

    mockEvent.body = JSON.stringify({
      description: 'Short Product Description',
      price: 23,
      title: 'Product2',
      image: 'url',
      count: 1,
    });

    const actual = await createProduct(mockEvent);

    expect(actual).toEqual(serverErrorResponse('Server error in creating a product'));
  });

  it('should return success response when products service return data', async () => {
    const mockProductRequest = {
      description: 'Short Product Description',
      price: 23,
      title: 'Product2',
      image: 'url',
      count: 1,
    };

    const product = { ...mockProductRequest, id: '7567ec4b-b10c-48c5-9445-fc73c48a80a2' };

    jest
      .spyOn(productService, 'createProduct')
      .mockImplementation(async () => Promise.resolve(product));
    
    mockEvent.body = JSON.stringify(mockProductRequest);

    const actual = await createProduct(mockEvent);

    expect(actual).toEqual(successResponse(product));
  });
});
