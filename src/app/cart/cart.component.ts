import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  private cart: OrderLine[];
  private cartEmpty: boolean;
  private totalPrice: number = 0;
  private quantity: Array<number> = [];
  public totalQuantity: number = 0;

  constructor(
    private cartService: CartService,
    public toastr: ToastsManager,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.loadcart();
    console.log("CART: ", this.cart)
  }

  loadcart(): void {
    this.cart = this.cartService.getItems();
    (this.cart.length >0) ? (this.cartEmpty = false) : (this.cartEmpty = true);
    this.totalPrice = this.cartService.getTotalPrice();
    this.getTotalQuantity()
  }

  removeItem(orderLine: OrderLine): void {
    this.cartService.delete(orderLine.product);
    this.loadcart();

    this.toastr.success('is removed from your cart', orderLine.product.name + ' ', {toastLife: 1000});
  }

  getcart(): OrderLine[] {
    return this.cart;
  }

  contains(orderLine: OrderLine): boolean {
    return this.cartService.contains(orderLine.product);
  }

  checkout(){
    this.router.navigate(['/checkout']);
  }

  updateCart(cartItem){
    cartItem.subTotal = cartItem.quantity * cartItem.product.price
    this.totalPrice = this.cartService.getTotalPrice();
    this.getTotalQuantity()
  }

  getTotalQuantity(){
    this.quantity=  this.cart.map(x => x["quantity"])
    this.totalQuantity = this.quantity.reduce((prev, cur) => {
      return prev + cur
    }, 0)

  }
}