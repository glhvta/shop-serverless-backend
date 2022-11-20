import { SNSClient } from '@aws-sdk/client-sns';
import { SnsNotificationRepository } from '@libs/repositories/notificationRepository';

import DynamoDBCLient from '@libs/services/database/dynamoDBClient';
import { JewelleryProductService } from '@libs/services/jewelleryProductService';
import { ProductNotificationService } from '@libs/services/notificationService';
import * as handlers from './src/functions';

const dynamoDbClient = new DynamoDBCLient();

const { SERVICE_REGION, SNS_ARN } = process.env;

const snsClient = new SNSClient({ region: SERVICE_REGION });
const snsRepository = new SnsNotificationRepository(snsClient, SNS_ARN);

const notificationRepository = new ProductNotificationService(snsRepository);

const productService = new JewelleryProductService(dynamoDbClient);

const getProductsList = handlers.getProductsList(productService);
const getProductById = handlers.getProductById(productService);
const createProduct = handlers.createProduct(productService);
const catalogBatchProcess = handlers.catalogBatchProcess(productService, notificationRepository);

export { getProductsList, getProductById, createProduct, catalogBatchProcess };
