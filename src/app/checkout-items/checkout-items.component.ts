import { Component, OnInit, Input } from '@angular/core';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-checkout-items',
  templateUrl: './checkout-items.component.html',
  styleUrls: ['./checkout-items.component.css']
})
export class CheckoutItemsComponent implements OnInit {
  @Input() items: Cart[];
  @Input() shippingCost: number;
  @Input() subtotal: number;
  @Input() grandTotal: number;

  constructor() { }

  ngOnInit() {

  }

}
