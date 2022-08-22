export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string, 
}

export interface ProductService {
  getProductById: (id: string) => Promise<Product>,
  getProductsList: () => Promise<Product[]>,
}