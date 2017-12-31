import { OrderLine } from './order-line';
import { ShippingMethod } from './shipping-method';
import { User } from './user';

export class Order {
  id: number;
  total: number;
  status?: number;
  user?: User;
  user_id: number;
  shippingMethod?: ShippingMethod;
  shipping_method_id?: number;
  items?: OrderLine[];
  updatedAt: String;
  createdAt: String;

  constructor(order: any) {
    this.id = order.id;
    this.total = order.total;
    this.user = order.user;
    this.user_id = order.user_id;
    this.shippingMethod = order.shippingMethod;
    this.shipping_method_id = order.shipping_method_id;
    this.items = order.items;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
  }

  public calculateSubTotal(): number {
    return this.items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
  }

}
