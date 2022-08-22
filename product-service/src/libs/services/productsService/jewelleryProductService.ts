import { Product, ProductService } from './types';
import productsData from './products-mock';

class JewelleryProductService implements ProductService {
  async getProductById(): Promise<Product> {
    return Promise.resolve(productsData[0]);
  }

  async getProductsList(): Promise<Product[]> {
    return Promise.reject(productsData);
  }
}

export default JewelleryProductService;