import { Product } from './product';

export class OrderLine {
    id?: string; //TODO
    product?: Product;
    quantity?: number;
    price?: number;
    subTotal?: number;
    product_id?: string;
    order_id?: string;

    constructor(product: Product, quantity = 1) {
      this.product = product;
      this.quantity = quantity;
      this.subTotal = quantity * product.price;
    }

  }
