import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { BooksService } from 'src/app/services/books/books.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-show-books',
  templateUrl: './show-books.component.html',
  styleUrls: ['./show-books.component.scss']
})
export class ShowBooksComponent implements OnInit {

  books: any = []
  queryField = new FormControl();

  pageEvent: PageEvent;
  length: number = 10
  pageSizeOptions: number[] = [1, 5, 10];
  pageSize: number;

  pageEventInit: PageEvent = {length: 5, pageIndex: 0, pageSize: 5, previousPageIndex: 0}
  constructor
  (
    private bookSvc: BooksService,
    private searchSvc: SearchService
  ){  }

  ngOnInit(): void {
    this.books = this.bookSvc.getBooks();
    this.changePage(this.pageEventInit)
    this.pageSize = this.pageEventInit.pageSize
  }

  onSearch(){
    this.books = this.searchSvc.onSearch(this.queryField.value);
  }

  changePage(pageEvent: PageEvent){
    this.books = this.bookSvc.getBooksPagination(pageEvent)
  }
}
