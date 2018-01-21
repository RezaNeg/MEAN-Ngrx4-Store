import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { ErrorResponse } from '../models/error-response';
import { Message } from './../models/message';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private errorMsg: Message;
  private products: Product[] = null;
  isFinished: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.forEach(param => {
      let id = parseInt(param['id']);
      this.categoryService.getCategory(id)
          .subscribe(data => {
              if (data){
                console.log("DATA for details: ", data)
                  this.products = data.category;
                  this.isFinished = true;
                  console.log ("PRODs of this category: ", this.products)
                  }
          });
    })
  }

  handleError(error: ErrorResponse){
    this.errorMsg = new Message("negative", "Ooops...", error.message );
  }

  getProducts() {
    return this.products;
  }

  getErrorMsg(): Message {
    return this.errorMsg;
  }

} 
