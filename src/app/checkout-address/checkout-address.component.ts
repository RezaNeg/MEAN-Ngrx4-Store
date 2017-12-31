import { Component, OnInit, Input } from '@angular/core';

import { Address } from './../models/address';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css']
})
export class CheckoutAddressComponent implements OnInit {

  // @Input() form: any;
  @Input() address: Address;

  constructor() { }

  ngOnInit() {
    this.setAddress(this.address);
  }

  setAddress(address: Address): void {
    this.address = {
      ...address,
    };
  }
}
