import { Product } from './product';
import { Customer } from './customer';

export interface Order {
  _id: String;
  total: number;
  items: Product[],
  customer?: Customer // TODO: should not be optional
}
