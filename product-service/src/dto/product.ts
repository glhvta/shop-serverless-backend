export const ProductRequestSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    image: { type: 'string' },
    count: { type: 'number' },
  },
  required: ['title', 'description', 'price', 'image', 'count'],
  additionalProperties: false,
};

export interface ProductRequest {
  title: string;
  description: string;
  price: number;
  image: string, 
  count: number,
}
