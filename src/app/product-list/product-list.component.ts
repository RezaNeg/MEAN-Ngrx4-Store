import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product'


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  errorMessage: string;
  @Input() products: Product[];

  constructor() { }

  ngOnInit() {
  }

}
