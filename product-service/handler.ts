import { JewelleryProductService } from '@libs/services/jewelleryProductService';
import * as handlers from './src/functions';

const productService = new JewelleryProductService();

const getProductsList = handlers.getProductsList(productService);
const getProductById = handlers.getProductById(productService);

export { getProductsList, getProductById };
