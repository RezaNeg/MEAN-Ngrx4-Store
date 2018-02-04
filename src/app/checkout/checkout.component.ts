// import { element } from 'protractor';

import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
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
import { Payment } from '../models/payment';

import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';
import { ShippingService } from '../services/shipping.service';
import { UserService } from './../services/user.service';
import { AddressService } from './../services/address.service';
import { OrderService } from './../services/order.service';
import { PaymentService } from '../services/payment.service';

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
  private addressLoaded: boolean = false;
  private updatedAddressId: string = null;
  private payments: Payment[];
  private selectedPayment: Payment;


  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private addressService: AddressService,
    private shippingService: ShippingService,
    private userService: UserService,
    private orderService: OrderService,
    private paymentService: PaymentService,
    public toastr: ToastsManager
  ) { }

  ngOnInit() {
    this.loadcart();
    this.loadShippingMethod();
    this.calculateSubTotal();
    this.loadUserAndAddress();
    this.loadPayments();
  }
  onCheckoutSubmit(checkoutForm: NgForm) {
    console.log("Form comp: ", this.addressComponent.address)
    if (this.user){
      // TODO: form validation must be added
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

        this.createOrder(this.user.id, this.calculateGrandTotal(), this.selectedShippingMethod.id, this.selectedPayment.id)
        .subscribe(order => {
          // TODO adding if order exist
          console.log("created order: ", order)
          
          let orderId = order.order.id
          this.orderCreated = true
          this.createOrUpdateAddress(inputAddress)
            .subscribe(address => {
              console.log("created address: ", address)
              this.user.addressId = address.id
              this.updatedAddressId = address.id
              console.log("updated USER address: ", this.user)
              this.userService.updateUser(this.user)
                .subscribe(() => {
                  // creating orderlines in the DB
                  this.cart.forEach(element => {
                    console.log("element of cart: ", element)
                    this.orderService.createOrderItem(element.quantity, element.product.price, element.product.id, orderId)
                      .subscribe(orderItem =>{
                        // Check if orderline is created successfully in Backend!
                      })
                  });
                  //remove items from cart after checkout!
                  this.cartService.clear()
                })
              }
            ); 
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

  onSelectPaymentMethod(payment: Payment) {
    console.log("PAYMENT: ", payment)
    this.selectedPayment = payment;
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
      .subscribe((data) => {
          this.user = data.user
          if (this.updatedAddressId !== null){
            this.user.addressId = this.updatedAddressId
          }
          if (this.user.addressId !== null) {
            console.log("new address ID: ", this.user.addressId)
            this.addressService.loadAddress(this.user.addressId)
              .subscribe(
                data => {
                  console.log("Loaded address for current User", data)
                  this.address = data.address
                  this.addressLoaded = true
                  }
                )
            }else{ console.log("the User has no Address property!!!!")}
        }
      )
    this.isFinished = true
  }

  createOrUpdateAddress(address: Address) {
    return this.addressService.createOrUpdate(address)
  }
  
  createOrder(userId, total, shippingMethodId, paymentMethodId) {
    return this.checkoutService.createOrder( userId, total, shippingMethodId, paymentMethodId)
  }
  
  loadPayments(){
    this.paymentService.getActivePayments()
      .subscribe(payments => this.payments = payments)
  }


}

