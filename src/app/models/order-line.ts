import { Product } from './product';

export interface OrderLine {
    id?: String;
    product?: Product;
    quantity?: number;
    unitPrice?: number;
    subTotal?: number;
  }
  