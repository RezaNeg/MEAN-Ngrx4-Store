import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { CartService } from '../services/cart.service';
import { Product } from '../models/product';
import { OrderLine } from './../models/order-line';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private products: OrderLine[];

  constructor(
    private cartService: CartService,
    public toastr: ToastsManager,
  ) {
  }

  ngOnInit() {
    this.loadProducts();
    console.log("CART: ", this.products)
  }

  loadProducts(): void {
    this.products = this.cartService.getItems();
  }

  removeItem(orderLine: OrderLine): void {
    this.cartService.delete(orderLine.product);
    this.products = this.cartService.getItems();

    this.toastr.success('is removed from your cart', orderLine.product.name + ' ', {toastLife: 1000});
  }

  getProducts(): OrderLine[] {
    return this.products;
  }

  contains(orderLine: OrderLine): boolean {
    return this.cartService.contains(orderLine.product);
  }

}