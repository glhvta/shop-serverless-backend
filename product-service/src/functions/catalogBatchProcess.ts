import { ProductNotificationService } from '@libs/services/notificationService';
import { ProductService } from '@libs/services/productsService';
import Ajv from 'ajv';
import { SQSEvent, SQSHandler } from 'aws-lambda';
import { ProductRequest, ProductRequestSchema } from '../dto/product';

const validateProduct = (new Ajv()).compile(ProductRequestSchema);

const catalogBatchProcess = (productService: ProductService, notificationService: ProductNotificationService): SQSHandler => async (event: SQSEvent)=> {
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

      return;
    }

    await Promise.all(products.map(async(product) => {
      try {
        console.log('Creating product ', product);

        const createdProduct = await productService.createProduct(product);

        console.log('Product was created', createdProduct);

        console.log('Sending notification about product creation');

        const notification = notificationService.buildNotification(createdProduct);

        await notificationService.sendNotification(notification);

        console.log('Notification was successfully sent ', notification);
      } catch(e) {
        console.log('Error while product creation: ', e);
      }
    }));
  } catch (err) {
    console.log('Error occurred while processing request ', err);
  }
};

export default catalogBatchProcess;
