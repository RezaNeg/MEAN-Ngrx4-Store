import { Component, OnInit, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Product } from '../models/product'
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public quantity;
  @Input() product: Product;

  constructor(
    private cartService: CartService,
    public toastr: ToastsManager,
  ) { }

  ngOnInit() {
  }

  addToCart(): void {
    this.cartService.add(this.product);
    this.toastr.success('is added to your cart', this.product.name +'!', {toastLife: 1000} );
    this.quantity = this.cartService.getTotalQtyInCart();
    console.log ("total of : ", this.quantity)
  }
}
