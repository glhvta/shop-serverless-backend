import { ProductService } from '@libs/services/productsService';
import { Product } from 'src/types/api-types';
import productsData from './products-mock';

class JewelleryProductService implements ProductService {
  async getProductById(id: string): Promise<Product> {
    const product = productsData.find((product) => product.id === id);

    return Promise.resolve(product);
  }

  async getProductsList(): Promise<Product[]> {
    return Promise.resolve(productsData);
  }
}

export default JewelleryProductService;
