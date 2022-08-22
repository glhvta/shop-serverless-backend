import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import { ProductService } from '@libs/services/productsService';
import { 
  badRequestErrorResponse, 
  notFoundErrorResponse, 
  serverErrorResponse, 
  successResponse,
} from '@libs/services/responseBuilder';

const getProductById = (productService: ProductService) => async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log(`Incoming event: ${ JSON.stringify(event) }`);

    const { productId } = event.pathParameters;

    if (!productId) {
      return badRequestErrorResponse('Product id is not provided');
    }

    const product = await productService.getProductById(productId);

    console.log(`Received product with id: ${productId}: ${ JSON.stringify(product) }`);
    
    if (!product) {
      return notFoundErrorResponse(`Product with id ${productId} was not found`);
    }

    return successResponse(product);
  } catch (err) {
    return serverErrorResponse('Server error in fetching product by id');
  }
};

export default getProductById;