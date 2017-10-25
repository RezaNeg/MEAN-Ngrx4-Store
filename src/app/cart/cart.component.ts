import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { CartService } from '../services/cart.service';
import { Product } from '../models/product';
import { Cart } from '../models/cart';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private products: Cart[];

  constructor(
    private cartService: CartService,
    public toastr: ToastsManager,
  ) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = this.cartService.getItems();
  }

  removeItem(cart: Cart): void {
    this.cartService.delete(cart.product);
    this.products = this.cartService.getItems();

    this.toastr.success('is removed from your cart', cart.product.name + ' ', {toastLife: 1000});
  }

}