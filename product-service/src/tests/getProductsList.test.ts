import createProductListHandler from '@functions/getProductsList';
import { JewelleryProductService } from '@libs/services/jewelleryProductService';
import { ProductService } from '@libs/services/productsService';
import { serverErrorResponse, successResponse } from '@libs/services/responseBuilder';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

describe('getProductsList spec', () => {
  let productService: ProductService;
  let mockEvent: APIGatewayProxyEvent;

  let getProductList: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;

  beforeEach(() => {
    productService = new JewelleryProductService();

    getProductList = createProductListHandler(productService);
  });

  afterEach(() => jest.clearAllMocks());


  it('should return all available products', async () => {
    const actual = await getProductList(mockEvent);
    const expectedProductsList = await productService.getProductsList();

    expect(actual).toEqual(successResponse(expectedProductsList));
  });

  it('should return server error when product service request failed', async () => {
    jest
      .spyOn(productService, 'getProductsList')
      .mockImplementation(async () => Promise.reject('Error'));

    const actual = await getProductList(mockEvent);

    expect(actual).toEqual(serverErrorResponse('Server error in fetching products'));
  });
});