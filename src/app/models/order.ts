import { OrderLine } from './order-line';
import { ShippingMethod } from './shipping-method';
import { User } from './user';
import { Payment } from './payment';


export class Order {
  id: number;
  total: number;
  status?: number;
  user?: User;
  userId: number;
  shippingMethod?: ShippingMethod;
  shippingMethodId?: number;
  items?: OrderLine[];
  payment?:Payment;
  updatedAt: String;
  createdAt: String;

  constructor(order: any) { //TODO change any to Order
    this.id = order.id;
    this.total = order.total;
    this.status = order.status ? order.status : null;
    this.user = order.user ? order.User : null;
    this.userId = order.userId; //TODO delete
    this.shippingMethod = order.shippingMethod;
    this.shippingMethodId = order.shippingMethodId; //TODO delete
    this.items = order.items ? order.items : [];
    this.payment = order.payment ? order.payment : null;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
  }

  public calculateSubTotal(): number {
    return this.items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
  }

}