import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Order } from '../models/order';
import { ShippingStatus } from '../models/shipping-status';
import { CheckoutService } from '../services/checkout.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() order: Order;

  private ShippingStatus: typeof ShippingStatus = ShippingStatus

  constructor(
    private route: ActivatedRoute,
    private checkoutService: CheckoutService,
  ) { }

  ngOnInit() {
    this.fetchOrder();
  }

  fetchOrder(): void {
    this.route.params
      .switchMap((params: Params) => this.checkoutService.getOrder(params['id']))
      .subscribe(order => {
        if (order) {
          this.order = new Order(order)
        }
      });
  }

}
