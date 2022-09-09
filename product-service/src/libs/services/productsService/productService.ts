import { ProductRequest } from 'src/dto/product';
import { Product } from 'src/types/api-types';

export interface ProductService {
  getProductById: (id: string) => Promise<Product>,
  getProductsList: () => Promise<Product[]>,
  createProduct: (product: ProductRequest) => Promise<Product>,
}
