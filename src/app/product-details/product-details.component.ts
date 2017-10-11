import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'rxjs/add/operator/switchMap';

import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

import { Product } from '../models/product';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: Product;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private toastr: ToastsManager,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.forEach(param => {
      let id = parseInt(param['id']);
      this.productService.getProduct(id)
          .subscribe(data => {
              if (data){
                console.log("DATA for details: ", data)
                  this.product = data['product'];
                  
                  }
          });
  })

    // this.route.params
    //   .switchMap((params: Params) => this.productService.getProduct(params['id']))
    //   .subscribe(data => {
    //     console.log("DATA for details: ", data)
    //     this.product = data['product']
    //   });
  }

  addToCart(): void {
    this.cartService.add(this.product);
    this.toastr.success('The product was added to your cart', 'Added!');
  }

}
