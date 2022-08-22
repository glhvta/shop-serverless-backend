import { JewelleryProductService } from '@libs/services/productsService';
import * as handlers from './src/functions';

const productService = new JewelleryProductService();

const getProductsList = handlers.getProductsList(productService);

export { getProductsList };