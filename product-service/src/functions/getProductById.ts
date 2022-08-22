import { APIGatewayEvent } from 'aws-lambda';

import { ProductService } from '@libs/services/productsService';
import { errorResponse, successResponse } from '@libs/services/responseBuilder';
import { StatusCode } from '@libs/constants/statusCode';

const getProductById = (productService: ProductService) => async (event: APIGatewayEvent) => {
  try {
    console.log(`Incoming event: ${ JSON.stringify(event) }`);

    const { productId } = event.pathParameters;

    if (!productId) {
      return errorResponse('Product id is not provided', StatusCode.BadRequest);
    }

    const product = await productService.getProductById(productId);

    console.log(`Received product with id: ${productId}: ${ JSON.stringify(product) }`);
    
    if (!product) {
      return errorResponse(`Product with id ${productId} was not found`, StatusCode.NotFound);
    }

    return successResponse(JSON.stringify(product));
  } catch (err) {
    return errorResponse('Server error in fetching product by id');
  }
};

export default getProductById;