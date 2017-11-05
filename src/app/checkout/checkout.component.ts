
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/rx';
import { NgForm } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


import { Cart } from '../models/cart';
import { User } from '../models/user';
import { Address } from '../models/address';
import { Product } from '../models/product';
import { ShippingMethod } from '../models/shipping-method';
import { OrderLine } from '../models/order-line';

import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';
import { ShippingService } from '../services/shipping.service';
import { UserService } from './../services/user.service';
import { AddressService } from './../services/address.service';

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
  private user : User;
  private isFinished = false;
  private orderCreated = false;
  private address : Address;


  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private addressService: AddressService,
    private shippingService: ShippingService,
    private userService: UserService,
    public toastr: ToastsManager
  ) { }

  ngOnInit() {
    this.loadcart();
    this.loadShippingMethod();
    this.calculateSubTotal();
    this.loadUser();

  }
  onCheckoutSubmit(checkoutForm: NgForm) {
    if (this.user){
      if (checkoutForm.valid) {
        console.log('submitting...', checkoutForm);
        const inputAddress: Address = {
          street: checkoutForm.value.street,
          city: checkoutForm.value.city,
          state: checkoutForm.value.state,
          country: checkoutForm.value.country,
          zip: checkoutForm.value.zip,
          phone: checkoutForm.value.phone,
          user_id: this.user.id
        }
        console.log("THIS USER: ", this.user)

        this.addressService.create(inputAddress)
        .map(res => 
          this.checkoutService.createOrder( this.user.id,
                                            this.total(), 
                                            this.selectedShippingMethod))
            .subscribe(data => {console.log(data.subscribe(x => console.log(x)));
              // then create orderlines in server database based on order_id and user_id
        })
      
      }
    }else{
      this.toastr.error("You must login first!", "ERROR", { lifetime: 1 });
      console.log("You must login first!")
    }
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
    console.log("SUBTOT: ", this.subtotal)
    return this.subtotal;
  }

  loadShippingMethod(): void {
    this.shippingService.getAllShipping()
      .subscribe(data => {
        this.shippingMethod = data["shipping_methods"]
        this.selectedShippingMethod = this.shippingMethod[0]
        console.log("Selected SHIPPING METHOD: ", this.selectedShippingMethod)
        console.log("Shipping methods from server: ", data["shipping_methods"])
      });
      
  }
  
  getShippingMethod(): ShippingMethod[] {
    return this.shippingMethod;
  }

  setSelectedShippingMethod(shipping: ShippingMethod) {
    console.log("SHIPPING: ", shipping)
    this.selectedShippingMethod = shipping;
  }

  loadUser(): void {
    if (!this.userService.isLoggedIn()) {
      this.isFinished = true;
      return null;
    }
    this.userService.getProfile()
      .subscribe(
        data => {
          console.log("USER: ", data.user)
          this.user = data.user
        }
      )
    this.isFinished = true
  }
    


}
