import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/rx';

import { Cart } from '../models/cart';
import { Customer } from '../models/customer';
import { Product } from '../models/product';

import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart: Cart[];
  private selectedShippingCost: number = 0;
  private subtotal: number = 0;
  private form = {};
  private temp: any;

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.loadcart();
    this.calculateSubTotal();
  }
  onSubmit() {
    // TODO: fields should be fetched from the form instead of hardcoded
    const inputCustomer: Customer = {
      phone: "phone",
      country: "country",
      zip: "zip",
      address: "address",
      lastname: "lastname",
      firstname: "firstname",
    }

  //   ngOnInit() {
  //     this.userService.getUser()
  //         .do(u => this.user = u) //.do just invokes the function. does not manipulate the stream, return value is ignored.
  //         .flatMap(u => this.userService.getPreferences(u.username))
  //         .subscribe(p => this.preferences = p);
  // }

  
    this.customerService.create(inputCustomer).map(res => 
      this.checkoutService.createOrder(
        res.user_id,
        this.total()))
        .subscribe(data => {
          console.log(data.subscribe(x => console.log(x)));
    });

    // this.customerService.create(inputCustomer).map(res => 
    //   this.checkoutService.createOrder(
    //     res.data,
    //     this.cart,
    //     this.total())

    // ).subscribe(data => {
    //   console.log(data);
    // });
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
