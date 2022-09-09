import { v4 as uuidv4 } from 'uuid';

import { ProductService } from '@libs/services/productsService';
import { Product } from 'src/types/api-types';
import DataBaseClient from '../database/databaseClient';
import { ProductRequest } from 'src/dto/product';

class JewelleryProductService implements ProductService {
  private readonly DATABASE_TABLE = 'products-table-tatsiana-helakhava';

  private databaseClient: DataBaseClient;

  constructor(databaseClient: DataBaseClient) {
    this.databaseClient = databaseClient;
  }

  async getProductById(id: string): Promise<Product> {
    return await this.databaseClient.getById(this.DATABASE_TABLE, id);
  }

  async getProductsList(): Promise<Product[]> {
    return await this.databaseClient.getAll(this.DATABASE_TABLE);
  }

  async createProduct (productRequest: ProductRequest): Promise<Product> {
    const product: Product = {
      id: uuidv4(),
      ...productRequest,
    };

    return await this.databaseClient.insert(this.DATABASE_TABLE, product);
  }
}

export default JewelleryProductService;
