import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { OrderLine } from '../models/order-line';

@Injectable()
export class CartService {
  private items: OrderLine[] = [];
  public totalPrice: number

  constructor() { }

  add(product: Product): void {
    if (this.contains(product)) {
      this.items.map(item => {
        if (item.product.id === product.id) {
          item.quantity += 1;
          item.subTotal += item.product.price;
        }
        // return item;
      });
    }
    else {
      this.items.push(new OrderLine(product, 1));
    }
  }

  contains(product: Product): boolean {
    return this.items.filter(item => item.product.id === product.id).length > 0;
  }

  delete(product: Product): void {
    this.items = this.items.filter(item => item.product.id !== product.id);
  }

  clear(): void {
    this.items = [];
  }

  getItems(): OrderLine[] {
    return this.items;
  }

  getTotalPrice(): number {
    this.totalPrice = this.items.reduce((sum, item) => {
      // console.log("CART ITEM: ", this.items)
      return sum + item.product.price * item.quantity;
    }, 0);
    return Number(this.totalPrice.toFixed(2));
  }

  getItem(product: Product): OrderLine {
    return this.items.find(item => item.product.id === product.id);
  }

  getQuantity(product:Product): number{
    
    return ((this.items.find(item => item.product.id === product.id) == undefined) ? 0
      :this.items.find(item => item.product.id === product.id).quantity)   
  }
}
