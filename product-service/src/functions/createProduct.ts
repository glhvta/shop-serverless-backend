import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import Ajv from 'ajv';

import { ProductService } from '@libs/services/productsService';
import { badRequestErrorResponse, serverErrorResponse, successResponse } from '@libs/services/responseBuilder';
import { ProductRequestSchema, ProductRequest } from '../dto/product';

const validateProduct = (new Ajv()).compile(ProductRequestSchema);

const createProduct = (productService: ProductService) => async(event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log(`Incoming event: ${ JSON.stringify(event) }`);

    let productRequest: ProductRequest;

    try {
      productRequest = JSON.parse(event.body) as ProductRequest;
      
      if (!validateProduct(productRequest)) {
        throw new Error();
      }
    } catch(err) {
      return badRequestErrorResponse('Invalid product data');
    }

    const product = await productService.createProduct(productRequest);

    console.log(`Product was successfully created: ${ JSON.stringify(product) }`);

    return successResponse(product);
  } catch (err) {
    console.log('Error occurred while creating a product ', err);

    return serverErrorResponse('Server error in creating a product');
  }
};

export default createProduct;
