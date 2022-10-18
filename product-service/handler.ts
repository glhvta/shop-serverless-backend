import DynamoDBCLient from '@libs/services/database/dynamoDBClient';
import { JewelleryProductService } from '@libs/services/jewelleryProductService';
import * as handlers from './src/functions';

const dynamoDbClient = new DynamoDBCLient();

const productService = new JewelleryProductService(dynamoDbClient);

const getProductsList = handlers.getProductsList(productService);
const getProductById = handlers.getProductById(productService);
const createProduct = handlers.createProduct(productService);
const catalogBatchProcess = handlers.catalogBatchProcess(productService);

export { getProductsList, getProductById, createProduct, catalogBatchProcess };
