import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Cart } from '../models/cart';

@Injectable()
export class CartService {
  private items: Cart[] = [];
  public totalPrice: number

  constructor() { }

  add(product: Product): void {
    if (this.contains(product)) {
      this.items.map(item => {
        if (item.product.id === product.id) {
          item.quantity += 1;
        }
        return item;
      });
    }
    else {
      this.items.push(new Cart(product, 1));
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

  getItems(): Cart[] {
    return this.items;
  }

  getTotalPrice(): number {
    this.totalPrice = this.items.reduce((sum, item) => {
      return sum + item.product.price;
    }, 0);
    return Number(this.totalPrice.toFixed(2));
  }

  getItem(product: Product): Cart {
    return this.items.find(item => item.product.id === product.id);
  }

}
