import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../services/search.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})

export class SearchBoxComponent implements OnInit {
  @Output() searchEmitter: EventEmitter<any> = new EventEmitter<any>();

  private isFinished: boolean = false;
  term = new FormControl();
  items: Product[];

  constructor(
    private searchService: SearchService
  ) {
  }

  ngOnInit() {
    this.handleTermChanges();
  }

  handleTermChanges(): void {
    this.term.valueChanges
      .debounceTime(1000)
      .distinctUntilChanged()
      .switchMap(term => {
        this.isFinished = false;
        return this.searchService.search(term).finally(() => {
          this.isFinished = true
        })
      })
      .subscribe(items => {
        console.log("ITEMS from search: ", items)
        this.items = items.products
      });
  }

  close(): void {
    this.searchEmitter.emit({ action: 'close' });
  }

  onSubmit(): void {
    this.searchEmitter.emit({ action: 'search', data: this.term.value });
  }
}