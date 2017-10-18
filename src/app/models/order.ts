import { UserComponent } from './../user/user.component';
export class Order {
  id: number;
  total: number;
  user_id: number;
  shipping_method_id: number;
  updatedAt: String;
  createdAt: String;

  constructor(order: any) {
    this.id = order.id;
    this.total = order.total;
    this.user_id = order.user_id;
    this.shipping_method_id = order.shipping_method_id;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
  }
}
