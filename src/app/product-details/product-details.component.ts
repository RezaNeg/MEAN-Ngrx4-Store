import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'rxjs/add/operator/switchMap';

import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/category.service';

import { Product } from '../models/product';
import { Category }from '../models/category';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: Product;
  public category: Category;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private toastr: ToastsManager,
    private location: Location,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.route.params.forEach(param => {
      let id = parseInt(param['id']);
      this.productService.getProduct(id)
          .subscribe(data => {
              if (data){
                console.log("DATA for details: ", data)
                  this.product = data['product'];
                  console.log ("PROD: ", this.product)
                  // Load the category
                  this.getProductCategory(this.product.cat_id);
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
    this.toastr.success('is added to your cart', this.product.name +'!', {toastLife: 1000});
  }

  getProductCategory(id: number): void {
    console.log("ID for param: ", id);
    if (this.category == null && id !== null) {
      this.categoryService.getCategory(id)
        .subscribe(data => {
          this.category = data['category']
          console.log("DATA for CAT: ", data['category'])
          });
        
    }
  }

}
