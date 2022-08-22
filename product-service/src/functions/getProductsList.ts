import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import { ProductService } from '@libs/services/productsService';
import { serverErrorResponse, successResponse } from '@libs/services/responseBuilder';

const getProductsList = (productService: ProductService) => async(event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log(`Incoming event: ${ JSON.stringify(event) }`);

    const products = await productService.getProductsList();

    console.log(`Product list: ${ JSON.stringify(products) }`);

    return successResponse(JSON.stringify(products));
  } catch (err) {
    console.log('Error occurred while fetching products');

    return serverErrorResponse('Server error in fetching products');
  }
};

export default getProductsList;