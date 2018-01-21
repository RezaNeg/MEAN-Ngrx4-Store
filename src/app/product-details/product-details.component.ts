import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/category.service';

import { Product } from '../models/product';
import { Category }from '../models/category';
import { ErrorResponse } from './../models/error-response';
import { Message } from './../models/message';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: Product;
  public category: Category;
  private qty: number = 0;
  private errorMsg: Message;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private toastr: ToastsManager,
    private location: Location,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.route.params.forEach(
      param => {
        let id = parseInt(param['id']);
        this.productService.getProduct(id)
          .subscribe(
            data => {
              if (data){
                console.log("DATA for details: ", data)
                  this.product = data['product'];
                  console.log ("PROD: ", this.product)
                  // Load the category
                  this.getProductCategory(this.product.categoryId);
                  this.qty = this.cartService.getQuantity(this.product);
                  }
              },
            err => {this.handleError(err)});
      })
  }

  handleError(error: ErrorResponse) {
    this.errorMsg = new Message("negative", "Ooops...", error.message );
  }

  addToCart(): void {
    this.cartService.add(this.product);
    this.qty = this.cartService.getQuantity(this.product);
    this.toastr.success('is added to your cart', this.product.name +'!', {toastLife: 1000});
  }

  getProductCategory(id: number): void {
    console.log("ID for param: ", id);
    if (this.category == null && id !== null) {
      this.categoryService.getCategory(id)
        .subscribe(data => {
          // TODO because of changing categoryService in BackEnd
          this.category = data['category']
          console.log("DATA for CAT: ", data['category'])
          });
        
    }
  }

}
