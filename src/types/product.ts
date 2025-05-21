export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number; // If exists, product is on promotion
  imageUrl: string;
  categories: string[];
  stock: number;
  featured?: boolean;
}

export type CartItem = {
  product: Product;
  quantity: number;
};