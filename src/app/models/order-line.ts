import { Product } from './product';

export class OrderLine {
    id?: string; //TODO
    product?: Product;
    quantity?: number;
    price?: number;
    subTotal?: number;
    productId?: string;
    orderId?: string;

    constructor(product: Product, quantity = 1) {
      this.product = product;
      this.quantity = quantity;
      this.subTotal = quantity * product.price;
    }

  }
