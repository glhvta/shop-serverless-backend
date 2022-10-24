/* eslint-disable @typescript-eslint/unbound-method */
import { Context, SQSEvent, SQSHandler } from 'aws-lambda';

import getCatalogBatchProcessHandler from '@functions/catalogBatchProcess';
import { JewelleryProductService } from '@libs/services/jewelleryProductService';
import { ProductService } from '@libs/services/productsService';
import MockDatabaseClient from '@libs/services/database/mockDatabaseClient';
import { ProductNotificationService } from '@libs/services/notificationService';
import MockProductNotificationService from '@libs/services/notificationService/mockProductNotificationService';
import MockNotificationRepository from '@libs/repositories/notificationRepository/mockNotificationRepository';

const products = [
  { 
    description: 'Short Product Description',
    price: 23,
    title: 'Product1',
    image: 'http://image-url1.jpg',
    count: 1,
  },
  { 
    description: 'Short Product Description',
    price: 23,
    title: 'Product2',
    image: 'http://image-url2.jpg',
    count: 2,
  },
];

describe('catalogBatchProcess spec', () => {
  let productService: ProductService;
  let notificationService: ProductNotificationService;
  let mockEvent: SQSEvent;
    
  let catalogBatchProcess: SQSHandler;

  beforeEach(() => {
    productService = new JewelleryProductService(new MockDatabaseClient());

    const notificationRepository = new MockNotificationRepository();
    notificationService = new MockProductNotificationService(notificationRepository);

    productService.createProduct = jest.fn();
    notificationService.sendNotification = jest.fn();

    catalogBatchProcess = getCatalogBatchProcessHandler(productService, notificationService);

    const sqsMockEvent = {
      Records: products.map((product) => ({ 
        body: JSON.stringify(product),
      })),
    } as SQSEvent;

    mockEvent = sqsMockEvent;
  });

  afterEach(() => jest.clearAllMocks());

  it('should create products provided in sqs event', async () => {
    await catalogBatchProcess(mockEvent, {} as Context, () => void undefined);

    expect(productService.createProduct).toHaveBeenCalledWith(products[0]);
    expect(productService.createProduct).toHaveBeenCalledWith(products[1]);
  });

  it('should not create products if they are not valid in sqs event', async () => {
    const mockEvent = {
      Records: [{ body: JSON.stringify({ title: '' }) }],
    } as SQSEvent;
    await catalogBatchProcess(mockEvent, {} as Context, () => void undefined);

    expect(productService.createProduct).toHaveBeenCalledTimes(0);
  });

  it('should send notification for created products', async () => {
    await catalogBatchProcess(mockEvent, {} as Context, () => void undefined);

    expect(notificationService.sendNotification).toHaveBeenCalledTimes(2);
    expect(notificationService.sendNotification).toHaveBeenCalledWith({
      subject: MockProductNotificationService.SUBJECT,
      message: MockProductNotificationService.MESSAGE,
    });
  });

  it('should not send notification id product creation failed', async () => {
    jest
      .spyOn(productService, 'createProduct')
      .mockImplementation(async () => Promise.reject('Error'));
    await catalogBatchProcess(mockEvent, {} as Context, () => void undefined);

    expect(notificationService.sendNotification).toHaveBeenCalledTimes(0);
  });
});
