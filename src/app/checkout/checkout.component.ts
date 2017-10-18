import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/rx';

import { Cart } from '../models/cart';
import { Customer } from '../models/customer';
import { Product } from '../models/product';
import { ShippingMethod } from './../models/shipping-method';
import { OrderLine } from './../models/order-line';

import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';
import { CustomerService } from '../services/customer.service';
import { ShippingService } from '../services/shipping.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart: Cart[];
  private shippingMethod : ShippingMethod[];
  private selectedShippingMethod: ShippingMethod;
  private subtotal: number = 0;
  private form = {};

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private customerService: CustomerService,
    private shippingService: ShippingService
  ) { }

  ngOnInit() {
    this.loadcart();
    this.loadShippingMethod();
    this.calculateSubTotal();
    console.log("SHIPPING METHODS: ", this.shippingMethod)
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
  
    this.customerService.create(inputCustomer).map(res => 
      this.checkoutService.createOrder(
        res.user_id,
        this.total()))
        .subscribe(data => {
          console.log(data.subscribe(x => console.log(x)));
    });

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

  calculateSubTotal(): number {
    this.subtotal = this.cartService.getTotalPrice();
    return this.subtotal;
  }

  loadShippingMethod(): void {
    this.shippingService.getAllShipping()
      .subscribe(data => {
        this.shippingMethod = data["shipping_methods"]
        // console.log("Shipping methods from server: ", data)
      });
      
  }
  
  getShippingMethod(): ShippingMethod[] {
    return this.shippingMethod;
  }

}
