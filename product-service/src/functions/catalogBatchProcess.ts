import { ProductService } from '@libs/services/productsService';
import Ajv from 'ajv';
import { SQSEvent, SQSHandler } from 'aws-lambda';
import { ProductRequest, ProductRequestSchema } from 'src/dto/product';

const validateProduct = (new Ajv()).compile(ProductRequestSchema);

const catalogBatchProcess = (productService: ProductService): SQSHandler => async (event: SQSEvent)=> {
  try {
    console.log(`Incoming event: ${ JSON.stringify(event) }`);

    const products = event.Records.reduce((acc, record) => {
      let productRequest: unknown;

      try {
        productRequest = JSON.parse(record.body) as ProductRequest;
      } catch(err) {
        productRequest = {};
      }

      if (!validateProduct(productRequest)) {
        return acc;
      }

      return [...acc, productRequest as ProductRequest];
    }, [] as ProductRequest[]);

    if (!products.length) {
      console.log('There are no valid products in the request');
    }

    await Promise.all(products.map((product) => productService.createProduct(product)));

    console.log('Products are created successfully');
  } catch (err) {
    console.log('Error occurred while processing request ', err);
  }
};

export default catalogBatchProcess;
