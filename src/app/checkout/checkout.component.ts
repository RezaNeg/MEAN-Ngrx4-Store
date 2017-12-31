
import { Component, OnInit, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/rx';
import { NgForm } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { CheckoutAddressComponent } from '../checkout-address/checkout-address.component';

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
import { OrderService } from './../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild(CheckoutAddressComponent) addressComponent: CheckoutAddressComponent;

  cart: OrderLine[];
  private shippingMethod : ShippingMethod[];
  private selectedShippingMethod: ShippingMethod;
  private subtotal: number = 0;
  private form = {};
  private user : User;
  private isFinished = false;
  private orderCreated = false;
  private address : Address;
  private totalPrice: number = 0;


  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private addressService: AddressService,
    private shippingService: ShippingService,
    private userService: UserService,
    private orderService: OrderService,
    public toastr: ToastsManager
  ) { }

  ngOnInit() {
    this.loadcart();
    this.loadShippingMethod();
    this.calculateSubTotal();
    this.loadUserAndAddress();
    // this.loadAddress();
  }
  onCheckoutSubmit(checkoutForm: NgForm) {
    console.log("Form comp: ", this.addressComponent.address)
    if (this.user && !this.user.address){
      // TODO: form validity must be added
      if (checkoutForm.valid) {
        console.log('submitting...', checkoutForm);
        const inputAddress: Address = this.addressComponent.address
        console.log("input address: ", inputAddress)
        // {
        //   street: checkoutForm.value.street,
        //   city: checkoutForm.value.city,
        //   state: checkoutForm.value.state,
        //   country: checkoutForm.value.country,
        //   zip: checkoutForm.value.zip,
        //   phone: checkoutForm.value.phone
        // }
        console.log("THIS USER: ", this.user)

        this.createOrder(this.user.id, this.calculateGrandTotal(), this.selectedShippingMethod.id)
        .concatMap(res1 => this.createAddress(inputAddress))
        .subscribe(res2 => {
          this.orderCreated = true
          console.log("ADDRESS RES2 : ", res2)
          this.user.address_id = res2.id
          console.log("updated USER address: ", this.user)
          this.userService.updateUser(this.user)
            .subscribe(res3 => {
              //remove items from cart after checkout!
              this.cartService.clear()
            })
          }
        );    
      }
    }else{
      this.toastr.error("You must login first!", "ERROR", { lifetime: 1 });
      console.log("You must login first!")
    }
  }

  loadcart(): void {
    this.cart = this.cartService.getItems();
  }

  getcart(): OrderLine[] {
    return this.cart;
  }

  setcart(cart: OrderLine[]): void {
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

  calculateGrandTotal(): number{
    
    return ((this.selectedShippingMethod ? this.selectedShippingMethod.price : 0) + this.subtotal);
  }

  loadUserAndAddress(): void {
    if (!this.userService.isLoggedIn()) {
      this.isFinished = true;
      return null;
    }
    this.userService.getProfile()
      .subscribe(
        data => {
          console.log("USER: ", data.user)
          this.user = data.user
          console.log("this user: ", this.user)
          // if ("Address" in this.user) {
          if (this.user.address_id !== null) {
            this.addressService.loadUserAddress(this.user.address_id)
              .subscribe(
                data => {
                  console.log("Loaded address for current User", data)
                  this.address = data.address
                  }
                )
            }else{ console.log("the User has no Address property!!!!")}
        }
      )
    this.isFinished = true
  }

  createAddress(address: Address) {
    return this.addressService.createOrUpdate(address)
  }
  
  createOrder(userId, total, shippingMethodId) {
    return this.checkoutService.createOrder( userId, total, shippingMethodId)
  }
  


}

