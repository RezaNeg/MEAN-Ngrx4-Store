import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Order } from '../models/order';
import { ShippingStatus } from '../models/shipping-status';

import { CheckoutService } from '../services/checkout.service';
import { OrderService } from './../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() order: Order
  private isFinished : boolean = false
  private ShippingStatus: typeof ShippingStatus = ShippingStatus
  private subTotal: any
  

  constructor(
    private route: ActivatedRoute,
    private checkoutService: CheckoutService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.getOrder();
  }


  getOrder(): void {
    this.route.params.forEach(param => {
      let id = parseInt(param['id']);
      this.checkoutService.getOrder(id)
          .subscribe(data => {
              if (data){
                console.log("Orders for details: ", data)
                this.order = data['order']
                console.log ("ORDER: ", this.order)
                //TODO no need to orderService as it might be taken from checkout service directly
                this.orderService.loadOrderItems(id)
                .subscribe(data => {
                  if (data){
                    console.log("ORDER items: ", data)
                    //TODO add all date to order not just .items
                    this.order.items = data['items']
                    console.log ("Order with Items: ", this.order)
                    this.subTotal = this.calculateSubTotal()
                  }
                })
                this.isFinished = true;
                console.log("ORDER ::: ", this.order)
              }
          });
    })
  }

  calculateSubTotal(){
    return this.order.items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
  }
}

