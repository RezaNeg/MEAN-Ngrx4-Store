import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart: Cart[];
  private selectedShippingCost: number = 0;
  private subtotal: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.loadcart();
    this.calculateSubTotal();
  }

  loadcart(): void {
    this.cart = this.cartService.getItems();
  }

  getcart(): Cart[] {
    return this.cart;
  }

  setcart(cart: Cart[]): void {
    this.cart = cart;
  }

  total(): number {
    return this.cartService.getTotalPrice();
  }

  getTotalWithShipping(): number {
    return this.total() + this.selectedShippingCost;
  }

  calculateSubTotal(): number {
    this.subtotal = this.cartService.getTotalPrice();
    return this.subtotal;
  }

  setShippingCost(price: number) {
    this.selectedShippingCost = price;
  }

}
