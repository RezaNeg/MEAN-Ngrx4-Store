import { Product } from './product';

export class Cart {
  product: Product;
  quantity: number;

  constructor(product: Product, quantity = 1) {
    this.product = product;
    this.quantity = quantity;
  }
}
