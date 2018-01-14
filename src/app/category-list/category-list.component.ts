import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../services/category.service';

import { Category } from '../models/Category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  private errorMessage: string;
  private categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.loadCategories();
  }

  getCategories(): Category[] {
    return this.categories;
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      categories => this.categories = categories['categories'],
      error => this.errorMessage = <any>error
    );
  }

}
