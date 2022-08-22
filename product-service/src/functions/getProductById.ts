import { APIGatewayEvent } from 'aws-lambda';
import { ProductService } from '@libs/services/productsService';
import { errorResponse, successResponse } from '@libs/services/responseBuilder';

const getProductById = (productService: ProductService) => async (event: APIGatewayEvent) => {
  try {
    console.log(`Incoming event: ${ JSON.stringify(event) }`);

    const { productId } = event.pathParameters;

    if (!productId) {
      return errorResponse('Product id is not provided', 400);
    }

    const product = await productService.getProductById(productId);

    console.log(`Received product with id: ${productId}: ${ JSON.stringify(product) }`);
    
    if (!product) {
      return errorResponse(`Product with id ${productId} was not found`, 404);
    }

    return successResponse(JSON.stringify(product));
  } catch (err) {
    return errorResponse('Server error in fetching product by id');
  }
};

export default getProductById;